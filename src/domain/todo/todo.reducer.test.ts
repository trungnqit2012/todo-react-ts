import { describe, it, expect } from "vitest";
import { todoReducer, initialState } from "./todo.reducer";
import type { Todo } from "../../types/todo";

const mockTodo: Todo = {
  id: 1,
  title: "Learn testing",
  completed: false,
};

describe("todoReducer", () => {
  it("SET_TODOS", () => {
    const next = todoReducer(initialState, {
      type: "SET_TODOS",
      payload: { todos: [mockTodo] },
    });

    expect(next.todos).toHaveLength(1);
    expect(next.todos[0].title).toBe("Learn testing");
  });

  it("ADD_TODO", () => {
    const next = todoReducer(initialState, {
      type: "ADD_TODO",
      payload: { todo: mockTodo },
    });

    expect(next.todos[0]).toEqual(mockTodo);
  });

  it("TOGGLE_TODO", () => {
    const state = { ...initialState, todos: [mockTodo] };

    const next = todoReducer(state, {
      type: "TOGGLE_TODO",
      payload: { id: 1 },
    });

    expect(next.todos[0].completed).toBe(true);
  });

  it("DELETE_TODO", () => {
    const state = { ...initialState, todos: [mockTodo] };

    const next = todoReducer(state, {
      type: "DELETE_TODO",
      payload: { id: 1 },
    });

    expect(next.todos).toHaveLength(0);
  });

  it("REPLACE_TODO", () => {
    const tempTodo = { ...mockTodo, id: -1 };

    const state = { ...initialState, todos: [tempTodo] };

    const next = todoReducer(state, {
      type: "REPLACE_TODO",
      payload: { tempId: -1, todo: mockTodo },
    });

    expect(next.todos[0].id).toBe(1);
  });
});
