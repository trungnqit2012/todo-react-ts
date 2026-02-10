import { useContext } from "react";
import { TodoStateContext, TodoDispatchContext } from "./TodoContext";

// 👉 chỉ lấy state
export function useTodoState() {
  const state = useContext(TodoStateContext);
  if (!state) {
    throw new Error("useTodoState must be used within TodoProvider");
  }
  return state;
}

// 👉 chỉ lấy dispatch
export function useTodoDispatch() {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) {
    throw new Error("useTodoDispatch must be used within TodoProvider");
  }
  return dispatch;
}
