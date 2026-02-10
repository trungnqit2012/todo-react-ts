import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTodoState, useTodoDispatch } from "../context/useTodoContext";
import type { Filter } from "../types/filter";
import type { Todo } from "../types/todo";
import { todoService } from "../services/todoService";

export function useTodos() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();

  // ===== load todos from service =====
  useEffect(() => {
    todoService
      .getTodos()
      .then((todos) =>
        dispatch({
          type: "SET_TODOS",
          payload: { todos },
        })
      )
      .catch(console.error);
  }, [dispatch]);

  // ===== derived state =====
  const filteredTodos = useMemo(() => {
    if (state.filter === "active") {
      return state.todos.filter((t) => !t.completed);
    }
    if (state.filter === "completed") {
      return state.todos.filter((t) => t.completed);
    }
    return state.todos;
  }, [state.todos, state.filter]);

  const remainingCount = useMemo(
    () => state.todos.filter((t) => !t.completed).length,
    [state.todos]
  );

  // ===== undo delete =====
  const undoTimeoutRef = useRef<number | null>(null);
  const [undoTodo, setUndoTodo] = useState<Todo | null>(null);

  // ===== actions =====

  // ✅ Optimistic ADD
  const addTodo = useCallback(
    async (title: string) => {
      if (!title.trim()) return;

      const tempId = -Date.now();
      const tempTodo: Todo = {
        id: tempId,
        title,
        completed: false,
      };

      dispatch({
        type: "ADD_TODO",
        payload: { todo: tempTodo },
      });

      try {
        const created = await todoService.create(title);

        dispatch({
          type: "REPLACE_TODO",
          payload: { tempId, todo: created },
        });
      } catch (err) {
        console.error("Failed to add todo:", err);

        dispatch({
          type: "REMOVE_TODO",
          payload: { id: tempId },
        });
      }
    },
    [dispatch]
  );

  // ✅ Optimistic TOGGLE
  const toggleTodo = useCallback(
    async (id: number, completed: boolean) => {
      dispatch({
        type: "TOGGLE_TODO",
        payload: { id },
      });

      try {
        await todoService.toggle(id, !completed);
      } catch (err) {
        console.error("Failed to toggle todo:", err);

        // rollback
        dispatch({
          type: "TOGGLE_TODO",
          payload: { id },
        });
      }
    },
    [dispatch]
  );

  // ✅ DELETE + UNDO
  const deleteTodo = useCallback(
    async (id: number) => {
      const todo = state.todos.find((t) => t.id === id);
      if (!todo) return;

      try {
        await todoService.remove(id);

        dispatch({
          type: "DELETE_TODO",
          payload: { id },
        });

        setUndoTodo(todo);

        undoTimeoutRef.current = window.setTimeout(() => {
          setUndoTodo(null);
          undoTimeoutRef.current = null;
        }, 4000);
      } catch (err) {
        console.error("Failed to delete todo:", err);
      }
    },
    [dispatch, state.todos]
  );

  // ✅ UNDO DELETE (re-create qua service)
  const undoDelete = useCallback(async () => {
    if (!undoTodo) return;

    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current);
      undoTimeoutRef.current = null;
    }

    try {
      const restored = await todoService.create(undoTodo.title);

      dispatch({
        type: "ADD_TODO",
        payload: { todo: restored },
      });
    } catch (err) {
      console.error("Failed to undo delete:", err);
    } finally {
      setUndoTodo(null);
    }
  }, [undoTodo, dispatch]);

  const clearCompleted = useCallback(() => {
    state.todos.filter((t) => t.completed).forEach((t) => deleteTodo(t.id));
  }, [state.todos, deleteTodo]);

  const setFilter = useCallback(
    (filter: Filter) => {
      dispatch({
        type: "SET_FILTER",
        payload: { filter },
      });
    },
    [dispatch]
  );

  return {
    todos: filteredTodos,
    filter: state.filter,
    remainingCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,

    // 👇 undo
    undoTodo,
    undoDelete,
  };
}
