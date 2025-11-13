import { useEffect, useState } from "react";
import type { ThemeProviderProps } from "@shared/lib/context/types";
import { ThemeContext } from "@/shared/lib/context/contexts";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("jobtracker:theme") as "light" | "dark") ?? "light"
  );

  useEffect(() => {
    if (theme) {
      localStorage.setItem("jobtracker:theme", theme);
    }
  }, [theme]);

  const toggle = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme: toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
