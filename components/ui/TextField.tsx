import { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export default function TextField({
  label,
  hint,
  id,
  className = "",
  ...props
}: TextFieldProps) {
  return (
    <label className="flex flex-col gap-1.5" htmlFor={id}>
      <span className="text-sm font-medium text-zinc-800">{label}</span>
      <input
        id={id}
        className={`rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${className}`}
        {...props}
      />
      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}
