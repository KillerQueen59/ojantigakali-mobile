"use client";

import { useState, useCallback } from "react";
import SectionPanel from "../SectionPanel";
import { useTheme } from "@/themes/ThemeContext";
import type { ThemeMenuItem } from "@/types/theme";
import { MenuItem } from "./MenuItem";
import { MazeBorder, PathDots } from "./MazeBorder";
import { GameLoader } from "./GameLoader";
import { FooterInteraction } from "./FooterInteraction";
import { DesktopToggle } from "./DesktopToggle";
import { SectionContent } from "./SectionContent";

type MenuId = ThemeMenuItem["id"];

export default function ArcadeGame() {
  const { theme } = useTheme();
  const c = theme.colors;
  const menuItems = theme.menuItems;

  const [activeSection, setActiveSection] = useState<MenuId | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [eatenSet, setEatenSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const handleOpen = useCallback((item: ThemeMenuItem) => {
    setScore((prev) => prev + item.points);
    setRound((prev) => prev + 1);
    setActiveSection(item.id);
    setEatenSet((prev) => new Set([...prev, item.id]));
    setTimeout(() => {
      setEatenSet((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 600);
  }, []);

  const handleLoadingDone = useCallback(() => setLoading(false), []);

  const activeItem = menuItems.find((m) => m.id === activeSection);

  return (
    <div
      className="min-h-svh flex justify-center max-w-[430px] w-full mx-auto relative"
      style={{ background: c.bg }}
    >
      {loading && <GameLoader onDone={handleLoadingDone} theme={theme} />}

      <DesktopToggle theme={theme} />

      <div
        className="w-full max-w-[430px] min-h-svh flex flex-col items-center pt-3 pb-6"
        style={{ background: c.bg }}
      >
        <div className="w-full max-w-[420px] px-10 mb-[18px] flex justify-between">
          <div className="flex flex-col items-center gap-0.5">
            <span
              className="font-arcade text-[8px] tracking-widest"
              style={{ color: c.text }}
            >
              SCORE
            </span>
            <span
              className="font-arcade text-xs"
              style={{
                color: c.primary,
                animation: "neonGlow 2.5s ease-in-out infinite",
              }}
            >
              {String(score).padStart(7, "0")}
            </span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span
              className="font-arcade text-[8px] tracking-widest"
              style={{ color: c.text }}
            >
              ROUND
            </span>
            <span
              className="font-arcade text-xs"
              style={{
                color: c.secondary,
                animation: "neonGlow 2.5s ease-in-out infinite 0.4s",
              }}
            >
              {String(round).padStart(3, "0")}
            </span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span
              className="font-arcade text-[8px] tracking-widest"
              style={{ color: c.text }}
            >
              LIVES
            </span>
            <span
              className="font-arcade text-xs"
              style={{
                color: c.score,
                animation: "neonGlow 2.5s ease-in-out infinite 0.8s",
              }}
            >
              3
            </span>
          </div>
        </div>

        <div className="text-center mb-5 px-4">
          <div
            className="font-arcade text-[10px] tracking-[0.12em] mb-1.5"
            style={{
              color: c.primary,
              animation:
                "neonGlow 2.5s ease-in-out infinite, titleFlicker 12s step-end infinite 5s",
            }}
          >
            {theme.title.line1.replace("'", "\u2019")}
          </div>
          <div
            className="font-arcade text-xl tracking-[0.15em]"
            style={{
              color: c.primary,
              animation: "neonGlow 2.5s ease-in-out infinite 0.4s",
            }}
          >
            {theme.title.line2}
          </div>
        </div>

        <MazeBorder theme={theme} />

        <div className="w-full max-w-[420px] px-4 py-2.5 flex flex-col gap-0">
          {menuItems.map((item, i) => (
            <div key={item.id}>
              <MenuItem
                {...item}
                isEaten={eatenSet.has(item.id)}
                onClick={() => handleOpen(item)}
                floatDelay={i}
                theme={theme}
              />
              {i < menuItems.length - 1 && (
                <PathDots delay={i * 0.15} theme={theme} />
              )}
            </div>
          ))}
        </div>

        <MazeBorder bottom theme={theme} />

        <FooterInteraction theme={theme} />

        <div
          className="font-arcade text-[7px] mt-2.5 tracking-[0.1em] text-center"
          style={{ color: c.textDim }}
        >
          © 2025 OJANTIGAKALI{"\n"}
        </div>

        {activeSection && activeItem && (
          <SectionPanel
            title={activeItem.label}
            color={activeItem.color}
            ghostName={activeItem.characterName}
            onClose={() => setActiveSection(null)}
          >
            <SectionContent id={activeSection} theme={theme} />
          </SectionPanel>
        )}
      </div>
    </div>
  );
}
