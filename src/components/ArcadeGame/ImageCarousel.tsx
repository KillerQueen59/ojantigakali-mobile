"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import NextImage from "next/image";

function ImageLightbox({
  images,
  initialIndex,
  color,
  name,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  color: string;
  name: string;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);
  const [loaded, setLoaded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    setLoaded(false);
  }, [idx]);

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length],
  );

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, prev, next]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] bg-black/[0.92] backdrop-blur-[8px] flex flex-col items-center justify-center"
      style={{
        animation: closing
          ? "lightboxOut 0.25s ease-in forwards"
          : "lightboxIn 0.25s ease-out forwards",
      }}
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 bg-black/80 rounded-md w-9 h-9 cursor-pointer font-arcade text-[12px] flex items-center justify-center"
        style={{
          border: `1px solid ${color}55`,
          color,
          boxShadow: `0 0 12px ${color}33`,
        }}
      >
        ✕
      </button>

      {/* Image area */}
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) {
            dx < 0 ? next() : prev();
          }
        }}
        className="relative max-w-[94vw] max-h-[80vh] rounded-[10px] overflow-hidden"
        style={{
          border: `1px solid ${color}44`,
          boxShadow: `0 0 40px ${color}22, 0 0 0 1px ${color}33`,
          animation: closing
            ? "lightboxImgOut 0.25s ease-in forwards"
            : "lightboxImgIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        {/* Loading shimmer */}
        {!loaded && (
          <div
            className="w-[90vw] max-w-[500px] aspect-[16/10]"
            style={{
              background:
                "linear-gradient(110deg, #111 30%, #1a1a1a 50%, #111 70%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s ease-in-out infinite",
            }}
          />
        )}
        <NextImage
          key={images[idx]}
          src={images[idx]}
          alt={`${name} screenshot ${idx + 1}`}
          width={1200}
          height={900}
          quality={90}
          unoptimized
          className="max-w-[94vw] max-h-[80vh] w-auto h-auto object-contain transition-opacity duration-300"
          style={{
            opacity: loaded ? 1 : 0,
            position: loaded ? "relative" : "absolute",
          }}
          onLoad={() => setLoaded(true)}
        />

        {/* CRT overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.06)_2px,rgba(0,0,0,0.06)_4px)]" />
      </div>

      {/* Nav + indicators */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-4 mt-4"
      >
        {images.length > 1 && (
          <button
            onClick={prev}
            className="bg-black/80 rounded-md w-9 h-9 cursor-pointer font-arcade text-[11px] flex items-center justify-center"
            style={{
              border: `1px solid ${color}55`,
              color,
              boxShadow: `0 0 8px ${color}33`,
            }}
          >
            ◀
          </button>
        )}

        <div className="flex gap-1.5 items-center">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIdx(i)}
              className="h-1.5 rounded-[3px] cursor-pointer transition-all duration-200"
              style={{
                width: i === idx ? 14 : 6,
                background: i === idx ? color : `${color}44`,
                boxShadow: i === idx ? `0 0 8px ${color}88` : "none",
              }}
            />
          ))}
        </div>

        {images.length > 1 && (
          <button
            onClick={next}
            className="bg-black/80 rounded-md w-9 h-9 cursor-pointer font-arcade text-[11px] flex items-center justify-center"
            style={{
              border: `1px solid ${color}55`,
              color,
              boxShadow: `0 0 8px ${color}33`,
            }}
          >
            ▶
          </button>
        )}
      </div>

      {/* Counter */}
      <div
        className="mt-2.5 font-arcade text-[8px] tracking-[0.12em] opacity-70"
        style={{ color }}
      >
        {idx + 1} / {images.length}
      </div>
    </div>,
    document.body,
  );
}

export function ImageCarousel({
  images,
  color,
  name,
}: {
  images: string[];
  color: string;
  name: string;
}) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef(0);

  const prev = () => {
    setLoaded(false);
    setIdx((i) => (i - 1 + images.length) % images.length);
  };
  const next = () => {
    setLoaded(false);
    setIdx((i) => (i + 1) % images.length);
  };

  return (
    <>
      <div className="mb-3.5">
        <div
          className="relative rounded-lg overflow-hidden bg-[#050505] cursor-zoom-in"
          style={{ border: `1px solid ${color}33` }}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) > 40) {
              dx < 0 ? next() : prev();
            } else {
              setLightboxOpen(true);
            }
          }}
          onClick={() => setLightboxOpen(true)}
        >
          {/* Skeleton */}
          {!loaded && (
            <div
              className="w-full aspect-[16/10]"
              style={{
                background:
                  "linear-gradient(110deg, #111 30%, #1a1a1a 50%, #111 70%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s ease-in-out infinite",
              }}
            />
          )}
          <NextImage
            src={images[idx]}
            alt={`${name} screenshot ${idx + 1}`}
            width={800}
            height={500}
            quality={80}
            unoptimized
            className="w-full h-auto object-cover max-h-[220px] transition-opacity duration-300"
            style={{
              opacity: loaded ? 1 : 0,
              position: loaded ? "relative" : "absolute",
            }}
            onLoad={() => setLoaded(true)}
          />

          {/* Zoom hint */}
          <div
            className="absolute top-2 right-2 bg-black/75 rounded-[4px] px-[7px] py-[3px] font-arcade text-[7px] tracking-[0.08em] flex items-center gap-1"
            style={{
              border: `1px solid ${color}44`,
              color,
            }}
          >
            🔍 TAP
          </div>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/70 rounded-[4px] w-7 h-7 cursor-pointer font-arcade text-[10px] flex items-center justify-center"
                style={{
                  border: `1px solid ${color}55`,
                  color,
                }}
              >
                ◀
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/70 rounded-[4px] w-7 h-7 cursor-pointer font-arcade text-[10px] flex items-center justify-center"
                style={{
                  border: `1px solid ${color}55`,
                  color,
                }}
              >
                ▶
              </button>
            </>
          )}

          {/* Counter badge */}
          <div
            className="absolute bottom-2 right-2 bg-black/75 rounded-[4px] px-2 py-0.5 font-arcade text-[7px] tracking-[0.1em]"
            style={{
              border: `1px solid ${color}44`,
              color,
            }}
          >
            {idx + 1}/{images.length}
          </div>
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex justify-center gap-[5px] mt-2">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  setLoaded(false);
                  setIdx(i);
                }}
                className="h-[5px] rounded-[3px] cursor-pointer transition-all duration-200"
                style={{
                  width: i === idx ? 12 : 5,
                  background: i === idx ? color : `${color}44`,
                  boxShadow: i === idx ? `0 0 6px ${color}66` : "none",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <ImageLightbox
          images={images}
          initialIndex={idx}
          color={color}
          name={name}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
