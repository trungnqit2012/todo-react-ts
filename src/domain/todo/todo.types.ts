import type { Filter } from "../../types/filter";
import type { Todo } from "../../types/todo";
export type TodoState = {
  todos: Todo[];
  filter: Filter;
};
