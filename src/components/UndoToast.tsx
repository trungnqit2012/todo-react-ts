type Props = {
  message: string;
  onUndo: () => void;
};

export default function UndoToast({ message, onUndo }: Props) {
  return (
    <div
      role="alert"
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2
        flex items-center gap-4
        rounded-xl bg-slate-900 px-4 py-3
        text-sm text-white shadow-lg
      "
    >
      <span>{message}</span>
      <button
        onClick={onUndo}
        className="font-semibold text-blue-400 hover:underline"
      >
        Undo
      </button>
    </div>
  );
}
