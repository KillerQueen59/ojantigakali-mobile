import type { Metadata, Viewport } from "next";
import {
  Press_Start_2P,
  Pixelify_Sans,
  Nunito,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});
const pixelify = Pixelify_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-pixelify",
});
const nunito = Nunito({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nunito",
});
const plexMono = IBM_Plex_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "OJAN.FARM — Muhammad Fauzan Ramadhan",
  description: "A software engineer's portfolio, tended as a Stardew Valley farm.",
  icons: { icon: "/farm-chicken-icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${pressStart.variable} ${pixelify.variable} ${nunito.variable} ${plexMono.variable} h-full`}
      >
        {children}
      </body>
    </html>
  );
}
