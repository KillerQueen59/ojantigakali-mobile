export type ThemeId = "pacman";

export interface ThemeColors {
  bg: string;
  primary: string;
  secondary: string;
  text: string;
  textDim: string;
  wall: string;
  wallGlow: string;
  dot: string;
  score: string;
}

export interface ThemeMenuItem {
  id: "about" | "experience" | "projects" | "education" | "contact" | "resume";
  label: string;
  subtitle: string;
  characterName: string;
  color: string;
  points: number;
  description: string;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  colors: ThemeColors;
  menuItems: readonly ThemeMenuItem[];
  title: { line1: string; line2: string };
  footerText: string;
  loaderTitle: string;
  footerCharacters: readonly string[];
}
