"use client";

import { useEffect, useState } from "react";

export interface GuideNavItem {
  id: string;
  label: string;
}

export default function GuideSidebar({ items }: { items: GuideNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="sticky top-24 hidden w-56 shrink-0 lg:block">
      <ul className="space-y-1 border-l border-zinc-200 pl-4 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block py-1 transition-colors ${
                activeId === item.id
                  ? "font-medium text-indigo-600"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
