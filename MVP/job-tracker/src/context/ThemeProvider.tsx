import { useEffect, useState } from "react";
import type { ThemeProviderProps } from "./types";
import { ThemeContext } from "@/hooks/useContext";

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
