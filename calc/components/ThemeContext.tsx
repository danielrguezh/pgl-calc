import { createContext } from "react";

export type ThemeType = "light" | "dark";

export const ThemeContext = createContext({
  theme: "light" as ThemeType,
  setTheme: (theme: ThemeType) => {},
});
