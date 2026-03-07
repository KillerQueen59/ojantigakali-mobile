"use client";

import { ThemeConfig, ThemeId } from "@/types/theme";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { pacmanTheme, THEMES } from "./constants";

interface ThemeContextValue {
  theme: ThemeConfig;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: pacmanTheme,
  themeId: "pacman",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>("pacman");
  const theme = THEMES[themeId];

  const setTheme = useCallback((id: ThemeId) => {
    setThemeId(id);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
