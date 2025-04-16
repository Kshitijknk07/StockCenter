import { useState, useEffect } from "react";

type Theme = "dark" | "light" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "system"
  );

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove previous theme class
    root.classList.remove("light", "dark");

    // Determine theme to apply
    let appliedTheme: "light" | "dark";

    if (theme === "system") {
      appliedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      appliedTheme = theme as "light" | "dark";
    }

    // Apply theme class
    root.classList.add(appliedTheme);

    // Store theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
