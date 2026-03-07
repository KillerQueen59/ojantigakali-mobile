"use client";

import type { ThemeConfig } from "@/types/theme";

export function MazeBorder({
  bottom = false,
  theme,
}: {
  bottom?: boolean;
  theme: ThemeConfig;
}) {
  const c = theme.colors;

  return (
    <div
      className="w-full max-w-[420px] py-2 px-1 flex items-center"
      style={{
        borderTop: bottom ? undefined : `3px solid ${c.wall}`,
        borderBottom: bottom ? `3px solid ${c.wall}` : undefined,
      }}
    >
      <div
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{
          background: c.dot,
          animation: `pelletBlink 0.6s step-end infinite${bottom ? " 0.3s" : ""}`,
          boxShadow: `0 0 6px ${c.dot}`,
        }}
      />
      <div className="flex-1 flex justify-evenly items-center px-1.5">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ background: c.dot }}
          />
        ))}
      </div>
      <div
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{
          background: c.dot,
          animation: `pelletBlink 0.6s step-end infinite ${bottom ? "0" : "0.3s"}`,
          boxShadow: `0 0 6px ${c.dot}`,
        }}
      />
    </div>
  );
}

export function PathDots({
  delay = 0,
  theme,
}: {
  delay?: number;
  theme: ThemeConfig;
}) {
  const c = theme.colors;

  return (
    <div className="flex justify-center items-center gap-[5px] py-[5px]">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="w-1 h-1 rounded-full"
          style={{
            background: c.dot,
            animation: `dotPulse 1.4s ease-in-out infinite`,
            animationDelay: `${delay + i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
