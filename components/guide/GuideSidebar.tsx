"use client";

import { useEffect, useRef, useState } from "react";

export interface GuideNavItem {
  id: string;
  label: string;
}

// How long to ignore the scroll-driven observer after a manual click, so the
// tapped link stays highlighted through the smooth-scroll animation instead
// of flickering to whichever section happens to pass through the viewport.
const MANUAL_OVERRIDE_MS = 1000;

export default function GuideSidebar({ items }: { items: GuideNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const manualOverrideRef = useRef(false);
  const manualTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (manualOverrideRef.current) return;
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

  function handleLinkClick(id: string) {
    setActiveId(id);
    manualOverrideRef.current = true;
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      manualOverrideRef.current = false;
    }, MANUAL_OVERRIDE_MS);
  }

  return (
    <nav className="sticky top-28 hidden w-56 shrink-0 lg:block">
      <ul className="space-y-1 border-l border-zinc-200 pl-4 text-sm dark:border-zinc-800">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => handleLinkClick(item.id)}
              className={`block py-1 transition-colors ${
                activeId === item.id
                  ? "font-medium text-indigo-600 dark:text-indigo-400"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
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
