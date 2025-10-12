import { useContext } from "react";
import { ThemeContext } from "@/components/ThemeContext";
import { Colors } from "@/constants/Colors";

export const useThemeColors = () => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === "light";

  return {
    background: isLight ? Colors.light.background : Colors.dark.background,
    backgroundSecondary: isLight ? Colors.light.backgroundSecondary : Colors.dark.backgroundSecondary,
    textPrimary: isLight ? Colors.light.textPrimary : Colors.dark.textPrimary,
    textSecondary: isLight ? Colors.light.textSecondary : Colors.dark.textSecondary,
    darkGray: isLight ? Colors.light.darkGray : Colors.dark.darkGray,
    orange: Colors.light.orange,
    lightGray: isLight ? Colors.light.lightGray : Colors.dark.lightGray,
    button: isLight ? Colors.light.button : Colors.dark.button,
  };
};
