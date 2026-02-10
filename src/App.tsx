import { TodoItem } from "./components/TodoItem";

import FilterBar from "./components/FilterBar";
import UndoToast from "./components/UndoToast";
import { useTodos } from "./hooks/useTodos";
import TodoInput from "./components/TodoInput";
import EmptyState from "./components/EmptyState";

function App() {
  const {
    todos,
    undoTodo,
    undoDelete,
    filter,
    setFilter,
    remainingCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <h1 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold text-slate-800">
          Todo App
          <span className="text-blue-500">📝</span>
        </h1>

        {/* Input */}
        <TodoInput onAdd={addTodo} />

        {/* Filter bar */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          remainingCount={remainingCount}
          onClearCompleted={clearCompleted}
        />

        {/* Todo list */}
        <ul className="space-y-2" role="list">
          {todos.length === 0 ? (
            <EmptyState />
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </ul>

        {/* Render toast  undoDelete*/}
        {undoTodo && <UndoToast message="Todo deleted" onUndo={undoDelete} />}
      </div>
    </div>
  );
}

export default App;
