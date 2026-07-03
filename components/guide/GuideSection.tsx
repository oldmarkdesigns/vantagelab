import { ReactNode } from "react";

export default function GuideSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-zinc-200 py-10 first:pt-0 last:border-b-0">
      <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-700">
        {children}
      </div>
    </section>
  );
}
