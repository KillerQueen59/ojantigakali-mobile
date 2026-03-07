"use client";

import { useState, useEffect } from "react";
import Ghost from "../Ghost";
import PacMan from "../PacMan";
import type { ThemeConfig } from "@/types/theme";

export function FooterInteraction({ theme }: { theme: ThemeConfig }) {
  const [phase, setPhase] = useState<"idle" | "eating" | "resetting">("idle");
  const [eatIndex, setEatIndex] = useState(-1);
  const c = theme.colors;
  const characters = theme.footerCharacters;
  const trackWidth = 200;
  const gap = trackWidth / (characters.length + 1);
  const heroStartX = -10;
  const charX = (i: number) => gap * (i + 1) - 9;
  const heroTargetX = (i: number) => charX(i) - 4;

  const handleTap = () => {
    if (phase !== "idle") return;
    setPhase("eating");
    setEatIndex(-1);
  };

  useEffect(() => {
    if (phase === "eating") {
      const timers: ReturnType<typeof setTimeout>[] = [];
      characters.forEach((_, i) => {
        timers.push(setTimeout(() => setEatIndex(i), 350 * (i + 1)));
      });
      timers.push(
        setTimeout(
          () => {
            setPhase("resetting");
            setEatIndex(-1);
          },
          350 * (characters.length + 1),
        ),
      );
      return () => timers.forEach(clearTimeout);
    }
    if (phase === "resetting") {
      const t = setTimeout(() => setPhase("idle"), 600);
      return () => clearTimeout(t);
    }
  }, [phase, characters]);

  const heroX =
    phase === "idle"
      ? heroStartX
      : phase === "resetting"
        ? heroStartX
        : eatIndex < 0
          ? heroStartX
          : heroTargetX(eatIndex);

  const isMoving = phase === "eating";

  return (
    <div
      className={`mt-5 flex flex-col items-center gap-2.5 [-webkit-tap-highlight-color:transparent] ${phase === "idle" ? "cursor-pointer" : "cursor-default"}`}
      onClick={handleTap}
    >
      <div
        className="font-arcade text-[9px] tracking-[0.08em] text-center transition-opacity duration-300"
        style={{
          color: c.text,
          animation:
            phase === "idle" ? "insertCoin 1.1s step-end infinite" : "none",
          opacity: phase === "idle" ? 1 : 0.4,
        }}
      >
        {theme.footerText}
      </div>

      <div className="relative h-9" style={{ width: trackWidth }}>
        {/* Hero character */}
        <div
          className={`absolute z-[2] ${isMoving ? "pacman-chomping" : ""}`}
          style={{
            top: 2,
            left: heroX,
            transition: isMoving
              ? "left 320ms ease-in-out"
              : phase === "resetting"
                ? "left 0.4s ease-in-out"
                : "none",
            animation:
              phase === "idle"
                ? "ghostFloat 1.2s ease-in-out infinite"
                : "none",
          }}
        >
          <PacMan size={32} direction="right" />
        </div>

        {/* Enemy characters */}
        {characters.map((col, i) => {
          const eaten = phase === "eating" && eatIndex >= i;
          const scared = phase === "eating" && eatIndex < i;
          return (
            <div
              key={col}
              className="absolute top-1 z-[1] transition-[transform,opacity] duration-200 ease-out"
              style={{
                left: charX(i),
                transform: eaten ? "scale(0)" : "scale(1)",
                opacity: eaten ? 0 : 1,
              }}
            >
              <Ghost color={col} size={24} scared={scared} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
