"use client";

import type { ReactNode } from "react";

export function ScorePopup({
  points,
  color,
}: {
  points: number;
  color: string;
}) {
  return (
    <div
      className="absolute -top-1 right-2 font-arcade text-[9px] pointer-events-none"
      style={{
        color,
        animation: "scoreFloat 0.8s ease-out forwards",
        textShadow: `0 0 8px ${color}`,
      }}
    >
      +{points}
    </div>
  );
}

export function PixelDivider({
  color,
  style: s,
}: {
  color: string;
  style?: "dots" | "line" | "arrow";
}) {
  if (s === "line") {
    return (
      <div className="flex items-center gap-2 my-[18px]">
        <div className="flex-1 h-px" style={{ background: `${color}33` }} />
        <div
          className="w-1.5 h-1.5 rotate-45 opacity-60"
          style={{ background: color }}
        />
        <div className="flex-1 h-px" style={{ background: `${color}33` }} />
      </div>
    );
  }
  if (s === "arrow") {
    return (
      <div className="flex justify-center my-3.5 gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: `6px solid ${color}`,
              opacity: 0.3 + i * 0.25,
              animation: `dotPulse 1.4s ease-in-out infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="flex justify-center gap-1.5 my-4">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="w-1 h-1 rounded-full"
          style={{
            background: color,
            opacity: i === 3 ? 1 : 0.35,
            animation: `dotPulse 1.4s ease-in-out infinite ${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}

export function StatBar({
  label,
  value,
  max,
  color,
  dimColor,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  dimColor: string;
}) {
  const fill = Math.round((value / max) * 10);
  return (
    <div className="mb-2.5">
      <div className="flex justify-between mb-1">
        <span
          className="font-arcade text-[8px] tracking-[0.1em]"
          style={{ color: dimColor }}
        >
          {label}
        </span>
        <span className="font-arcade text-[9px]" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="flex gap-[3px]">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-sm transition-all duration-300"
            style={{
              background: i < fill ? color : `${color}15`,
              boxShadow: i < fill ? `0 0 4px ${color}66` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ArcadeBadge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="font-arcade text-[7px] text-black rounded-[3px] px-2 py-[3px] tracking-[0.08em] inline-block"
      style={{
        background: color,
        boxShadow: `0 0 8px ${color}66`,
      }}
    >
      {text}
    </span>
  );
}

export function ScanlineCard({
  color,
  children,
  glow,
}: {
  color: string;
  children: ReactNode;
  glow?: boolean;
}) {
  return (
    <div
      className="rounded-lg p-4 px-3.5 mb-4 bg-[#0a0a0a] relative overflow-hidden"
      style={{
        border: `1px solid ${color}44`,
        borderLeft: `3px solid ${color}`,
        boxShadow: glow
          ? `0 0 16px ${color}1a, inset 0 0 20px ${color}08`
          : "none",
      }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,255,255,0.01)_3px,rgba(255,255,255,0.01)_6px)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function LevelTag({ level, color }: { level: number; color: string }) {
  return (
    <div
      className="inline-flex items-center gap-1 font-arcade text-[7px] rounded-[4px] px-[7px] py-0.5 mb-2"
      style={{
        color,
        border: `1px solid ${color}44`,
      }}
    >
      <span className="opacity-60">LV</span>
      <span>{level}</span>
    </div>
  );
}

export function BulletPoint({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return (
    <div className="flex gap-2.5 mb-1.5 items-start">
      <div
        className="w-[5px] h-[5px] rounded-full mt-1.5 shrink-0"
        style={{
          background: color,
          boxShadow: `0 0 4px ${color}88`,
          animation: "dotPulse 2s ease-in-out infinite",
        }}
      />
      <div className="text-[#bbb] text-[9px] leading-[2] flex-1">
        {children}
      </div>
    </div>
  );
}
