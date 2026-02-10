import { createContext } from "react";
import type { TodoState } from "../domain/todo/todo.types";
import type { TodoAction } from "../domain/todo/todo.actions";

// State context
export const TodoStateContext = createContext<TodoState | undefined>(undefined);

// Dispatch context
export const TodoDispatchContext = createContext<
  React.Dispatch<TodoAction> | undefined
>(undefined);
