import type { ReactNode } from "react";

type Props = {
  content: string;
  children: ReactNode;
  id?: string;
};

export default function Tooltip({ content, children, id }: Props) {
  const tooltipId = id ?? `tooltip-${content.replace(/\s+/g, "-")}`;

  return (
    <span className="relative inline-flex group">
      {/* Trigger */}
      <span aria-describedby={tooltipId}>{children}</span>

      {/* Tooltip */}
      <span
        id={tooltipId}
        role="tooltip"
        className="
          pointer-events-none
          absolute -top-8 left-1/2 -translate-x-1/2
          whitespace-nowrap
          rounded bg-slate-800 px-2 py-1
          text-xs text-white
          opacity-0
          transition
          group-hover:opacity-100
          group-focus-within:opacity-100
        "
      >
        {content}
      </span>
    </span>
  );
}
