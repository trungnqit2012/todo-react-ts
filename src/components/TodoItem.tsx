import type { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow-sm">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, todo.completed)}
          className="h-4 w-4 accent-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
        />

        <span
          className={`text-sm ${
            todo.completed ? "line-through text-slate-400" : "text-slate-700"
          }`}
        >
          {todo.title}
        </span>
      </label>

      <button
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete todo: ${todo.title}`}
        className="text-slate-400 transition hover:text-red-500"
      >
        ✕
      </button>
    </li>
  );
}
