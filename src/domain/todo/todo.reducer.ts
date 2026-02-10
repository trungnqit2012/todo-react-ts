import type { Todo } from "../../types/todo";
import type { Filter } from "../../types/filter";
import type { TodoAction } from "./todo.actions";

export interface TodoState {
  todos: Todo[];
  filter: Filter;
}

export const initialState: TodoState = {
  todos: [],
  filter: "all",
};

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "SET_TODOS": {
      return {
        ...state,
        todos: action.payload.todos,
      };
    }

    case "ADD_TODO": {
      return {
        ...state,
        todos: [action.payload.todo, ...state.todos],
      };
    }

    case "TOGGLE_TODO": {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    }

    case "DELETE_TODO": {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }

    case "REPLACE_TODO": {
      const { tempId, todo } = action.payload;
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === tempId ? todo : t)),
      };
    }

    case "REMOVE_TODO": {
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload.id),
      };
    }

    case "CLEAR_COMPLETED": {
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    }

    case "SET_FILTER": {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }

    default:
      return state;
  }
}
