import { useEffect } from "react";
import { useTheme } from "@/shared/lib/context/contexts";
import type { ThemeWrapperProps } from "./types";

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
