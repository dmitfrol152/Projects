import { useEffect, useState } from "react";
import type { ThemeProviderProps } from "./types";
import { ThemeContext } from "@/hooks/useContext";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const init = () => {
      const storageTheme = localStorage.getItem("jobtracker:theme") as
        | "light"
        | "dark";

      if (storageTheme) {
        setTheme(storageTheme);
      } else {
        localStorage.setItem("jobtracker:theme", "light");
        setTheme("light");
      }
    };

    init();
  }, []);

  useEffect(() => {
    localStorage.setItem("jobtracker:theme", theme);
  }, [theme]);

  const toggle = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme: toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
