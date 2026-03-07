"use client";

import { useState, useEffect } from "react";
import Ghost from "../Ghost";
import PacMan from "../PacMan";
import type { ThemeConfig } from "@/types/theme";

export function GameLoader({
  onDone,
  theme,
}: {
  onDone: () => void;
  theme: ThemeConfig;
}) {
  const [fading, setFading] = useState(false);
  const c = theme.colors;

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2500);
    const t2 = setTimeout(onDone, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  const containerCn =
    "fixed top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] flex flex-col items-center justify-center z-[9998] transition-opacity duration-300" +
    (fading ? " opacity-0 pointer-events-none" : " opacity-100");

  const GHOST_COLORS = ["#ff0000", "#ffb8ff", "#00ffff", "#ffb852"];
  const GHOST_LEFT = [60, 120, 180, 240];
  const GHOST_DELAY = [0.35, 0.82, 1.29, 1.76];

  return (
    <div className={containerCn} style={{ background: c.bg }}>
      <div
        className="font-arcade text-[11px] tracking-[0.15em] mb-2.5"
        style={{ color: c.primary, textShadow: `0 0 10px ${c.primary}88` }}
      >
        READY!
      </div>
      <div
        className="font-arcade text-[8px] tracking-[0.12em] mb-7"
        style={{
          color: c.text,
          animation: "insertCoin 0.8s step-end infinite",
        }}
      >
        LOADING...
      </div>
      <div className="relative w-[300px] h-[50px]">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-evenly items-center">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[3px] rounded-full opacity-40"
              style={{ background: c.dot }}
            />
          ))}
        </div>
        <div
          className="pacman-chomping absolute top-[9px] left-0 z-[2]"
          style={{ animation: "loaderPacMove 2.2s linear forwards" }}
        >
          <PacMan size={32} direction="right" />
        </div>
        {GHOST_COLORS.map((color, i) => (
          <div
            key={color}
            className="absolute top-2 z-[1]"
            style={{
              left: GHOST_LEFT[i],
              animation: `loaderGhostEaten 0.35s ease-out ${GHOST_DELAY[i]}s forwards`,
            }}
          >
            <Ghost color={color} size={28} scared />
          </div>
        ))}
      </div>
      <div
        className="font-arcade text-[7px] tracking-[0.1em] mt-8"
        style={{ color: c.textDim }}
      >
        © OJANTIGAKALI ARCADE PORTFOLIO
      </div>
    </div>
  );
}
