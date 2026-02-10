import type { ReactNode } from "react";
import { TodoProvider } from "../context/TodoProvider";

export function wrapper({ children }: { children: ReactNode }) {
  return <TodoProvider>{children}</TodoProvider>;
}
