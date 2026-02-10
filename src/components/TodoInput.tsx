import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        value={value}
        placeholder="Nhập việc cần làm..."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus-visible:outline focus-visible:outline-blue-500"
      />

      <button
        onClick={handleAdd}
        disabled={!value.trim()}
        className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-blue-500"
      >
        Add
      </button>
    </div>
  );
}
