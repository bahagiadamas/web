/* eslint-disable no-unused-vars */
import React from "react";
import { useTheme } from "../context/ThemeContext";
import * as ico from "react-icons/io5";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      style={{
        display: "block",
        cursor: "pointer",
        background: "none",
        color: "inherit",
      }}
      onClick={toggleTheme}
      className="theme-toggle-button"
      aria-label={
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      }
    >
      {theme === "light" ? (
        <ico.IoMoon className="icon" />
      ) : (
        <ico.IoSunny className="icon" />
      )}
    </button>
  );
}
