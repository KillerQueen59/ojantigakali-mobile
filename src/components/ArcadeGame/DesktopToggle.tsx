"use client";

import { useState, useEffect } from "react";
import type { ThemeConfig } from "@/types/theme";

export function DesktopToggle({ theme }: { theme: ThemeConfig }) {
  const c = theme.colors;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 500px)");
    setVisible(mq.matches);
    const handler = (e: MediaQueryListEvent) => setVisible(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://ojantigakali.com"
      className="fixed top-4 right-4 z-[10000] font-arcade text-[8px] bg-[rgba(0,0,0,0.85)] rounded-md no-underline tracking-[0.06em] flex items-center gap-2 transition-[box-shadow,transform] duration-200"
      style={{
        color: c.primary,
        border: `1px solid ${c.primary}`,
        padding: "10px 14px",
        boxShadow: `0 0 12px ${c.primary}44`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 20px ${c.primary}88`;
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 12px ${c.primary}44`;
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <span className="text-xs">🖥️</span>
      DESKTOP VERSION
    </a>
  );
}
