"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

type SectionPanelProps = {
  title: string;
  color: string;
  ghostName: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function SectionPanel({
  title,
  color,
  ghostName,
  onClose,
  children,
}: SectionPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  const panel = (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        zIndex: 1000,
        background: "#000",
        display: "flex",
        justifyContent: "center",
        animation: closing
          ? "panelOut 0.25s ease-in forwards"
          : "panelIn 0.3s ease-out forwards",
      }}
    >
      <div className="w-full max-w-[430px] h-full flex flex-col">
        {/* Title bar */}
        <div
          className="flex items-center justify-between shrink-0 px-4 py-3.5 border-b-4 border-black"
          style={{ background: color }}
        >
          <div>
            <div className="font-arcade text-[8px] text-black/70 tracking-[0.1em] mb-1">
              {ghostName}
            </div>
            <div className="font-arcade text-[13px] text-black tracking-[0.08em]">
              {title}
            </div>
          </div>

          <button
            onClick={handleClose}
            className="bg-black text-white rounded-md px-3 py-1.5 font-arcade text-[10px] cursor-pointer tracking-[0.05em]"
            style={{
              border: `2px solid ${color}`,
              boxShadow: `0 0 8px ${color}88`,
            }}
          >
            BACK
          </button>
        </div>

        {/* Maze path separator */}
        <div
          className="flex items-center gap-1.5 shrink-0 bg-[#111] px-4 py-1.5"
          style={{ borderBottom: `2px solid ${color}33` }}
        >
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full opacity-40"
              style={{ background: color }}
            />
          ))}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto py-5 px-4 [-webkit-overflow-scrolling:touch]">
          {children}
        </div>

        {/* Bottom nav hint */}
        <div
          className="flex justify-center shrink-0 px-4 py-2.5"
          style={{ borderTop: `2px solid ${color}33` }}
        >
          <span className="font-arcade text-[8px] text-[#888] tracking-[0.1em]">
            SCROLL TO READ MORE
          </span>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(panel, document.body);
}
