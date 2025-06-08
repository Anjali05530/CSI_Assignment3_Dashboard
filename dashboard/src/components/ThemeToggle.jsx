import React from "react";

const buttonStyle = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 6,
  fontSize: 18,
  transition: "color 0.3s ease, background-color 0.3s ease",
  borderRadius: "8px",
};

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      aria-label="Toggle theme"
      title="Toggle light/dark theme"
      style={{
        ...buttonStyle,
        color: theme === "light" ? "#2563eb" : "#fcd34d", // Adjusted colors for better visibility
        backgroundColor: theme === "light" ? "transparent" : "#1f2937", // Dark background for dark theme
      }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌞" : "🌙"}
    </button>
  );
}
