import { useEffect, useReducer } from "react";
import type { ReactNode } from "react";

import { TodoStateContext, TodoDispatchContext } from "./TodoContext";

import { todoReducer } from "../domain/todo/todo.reducer";
import type { TodoState } from "../domain/todo/todo.types";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function TodoProvider({ children }: { children: ReactNode }) {
  const [storedTodos, setStoredTodos] = useLocalStorage<TodoState["todos"]>(
    "todos",
    []
  );

  const [storedFilter, setStoredFilter] = useLocalStorage<TodoState["filter"]>(
    "filter",
    "all"
  );

  const [state, dispatch] = useReducer(todoReducer, {
    todos: storedTodos,
    filter: storedFilter,
  });

  useEffect(() => {
    setStoredTodos(state.todos);
  }, [state.todos, setStoredTodos]);

  useEffect(() => {
    setStoredFilter(state.filter);
  }, [state.filter, setStoredFilter]);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}
