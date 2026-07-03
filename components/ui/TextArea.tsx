import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export default function TextArea({
  label,
  hint,
  id,
  rows = 4,
  className = "",
  ...props
}: TextAreaProps) {
  return (
    <label className="flex flex-col gap-1.5" htmlFor={id}>
      <span className="text-sm font-medium text-zinc-800">{label}</span>
      <textarea
        id={id}
        rows={rows}
        className={`resize-y rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${className}`}
        {...props}
      />
      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}
