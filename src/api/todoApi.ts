import type { Todo } from "../types/todo";

const BASE_URL = "http://localhost:4000";

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(title: string): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function toggleTodo(
  id: number,
  completed: boolean
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error("Failed to toggle todo");
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
}
