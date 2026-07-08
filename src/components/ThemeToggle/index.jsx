import React from "react";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme((p) => (p === "dark" ? "light" : "dark"))}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-icon">{theme === "dark" ? "\u2600" : "\u263E"}</span>
    </button>
  );
}
