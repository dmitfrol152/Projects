import { useEffect } from "react";
import { useTheme } from "@/hooks/useContext";
import type { ThemeWrapperProps } from "./types";

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
