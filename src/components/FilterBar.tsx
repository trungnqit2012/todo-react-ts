import type { Filter } from "../types/filter";
import Tooltip from "./Tooltip";

type Props = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  remainingCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function FilterBar({
  filter,
  setFilter,
  remainingCount,
  onClearCompleted,
}: Props) {
  return (
    <div className="mb-4 flex items-center justify-between text-sm">
      {/* Left */}
      <span className="text-slate-500">
        {remainingCount} item{remainingCount !== 1 && "s"} left
      </span>

      {/* Filters */}
      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-md px-2 py-1 transition ${
              filter === f.value
                ? "bg-blue-500 text-white"
                : "text-slate-500 hover:bg-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Clear */}
      <Tooltip content="Clear completed todos">
        <button
          onClick={onClearCompleted}
          disabled={remainingCount === 0}
          aria-label="Clear completed todos"
          className="text-slate-400 transition hover:text-red-500 disabled:opacity-40"
        >
          Clear
        </button>
      </Tooltip>
    </div>
  );
}
