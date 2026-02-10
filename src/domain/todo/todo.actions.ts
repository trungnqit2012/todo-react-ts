import type { Todo } from "../../types/todo";
import type { Filter } from "../../types/filter";

export type TodoAction =
  | { type: "SET_TODOS"; payload: { todos: Todo[] } }
  | { type: "ADD_TODO"; payload: { todo: Todo } }
  | { type: "TOGGLE_TODO"; payload: { id: number } }
  | { type: "DELETE_TODO"; payload: { id: number } }
  | { type: "REPLACE_TODO"; payload: { tempId: number; todo: Todo } }
  | { type: "REMOVE_TODO"; payload: { id: number } }
  | { type: "CLEAR_COMPLETED" }
  | { type: "SET_FILTER"; payload: { filter: Filter } };
