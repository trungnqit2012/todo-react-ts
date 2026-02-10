import * as api from "../api/todoApi";
import type { Todo } from "../types/todo";

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    return api.fetchTodos();
  },

  async create(title: string): Promise<Todo> {
    return api.createTodo(title);
  },

  async toggle(id: number, completed: boolean): Promise<void> {
    await api.toggleTodo(id, completed);
  },

  async remove(id: number): Promise<void> {
    await api.deleteTodo(id);
  },
};
