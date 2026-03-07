"use client";

import Ghost from "../Ghost";
import type { ThemeMenuItem, ThemeConfig } from "@/types/theme";

export type MenuItemProps = ThemeMenuItem & {
  isEaten: boolean;
  onClick: () => void;
  floatDelay: number;
  theme: ThemeConfig;
};

export function MenuItem({
  label,
  subtitle,
  characterName,
  color,
  points,
  isEaten,
  onClick,
  floatDelay,
  theme,
}: MenuItemProps) {
  const c = theme.colors;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3.5 cursor-pointer relative transition-all duration-150 outline-none [-webkit-tap-highlight-color:transparent]"
      style={{
        background: isEaten ? `${color}08` : `${color}0d`,
        border: `2px solid ${color}`,
        borderRadius: 10,
        padding: "12px 14px",
        boxShadow: isEaten
          ? `0 0 4px ${color}33`
          : `0 0 12px ${color}44, inset 0 0 12px ${color}0d`,
      }}
    >
      <div
        className="shrink-0 transition-opacity duration-200"
        style={{
          animation: isEaten
            ? "none"
            : `ghostFloat ${1.6 + floatDelay * 0.4}s ease-in-out infinite`,
          animationDelay: `${floatDelay * 0.2}s`,
          opacity: isEaten ? 0.15 : 1,
        }}
      >
        <Ghost color={color} size={44} scared={isEaten} />
      </div>
      <div className="text-left flex-1 min-w-0">
        <div
          className="font-arcade text-[8px] tracking-[0.12em] mb-[5px]"
          style={{ color: c.textDim }}
        >
          {characterName}
        </div>
        <div
          className="font-arcade text-[12px] tracking-[0.06em] whitespace-nowrap overflow-hidden text-ellipsis"
          style={{
            color: isEaten ? `${color}55` : color,
            textShadow: isEaten ? "none" : `0 0 10px ${color}99`,
          }}
        >
          {label}
        </div>
        <div
          className="font-arcade text-[8px] tracking-[0.1em] mt-1"
          style={{ color: c.textDim }}
        >
          {subtitle}
        </div>
      </div>{" "}
      <div
        className="font-arcade text-[9px] shrink-0 text-right"
        style={{ color: c.score }}
      >
        {points}
        <br />
        <span className="text-[7px]" style={{ color: `${c.score}aa` }}>
          PTS
        </span>
      </div>
    </button>
  );
}
