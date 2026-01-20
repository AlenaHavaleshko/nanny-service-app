import { createContext } from "react";

export type ThemeType = "red" | "blue" | "green";

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
