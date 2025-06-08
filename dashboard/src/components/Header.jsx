import React from "react";
import ThemeToggle from "./ThemeToggle";

const styles = {
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "inherit",
    borderBottom: "1px solid #eaeaea",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 3rem",
    fontWeight: "700",
    fontSize: 24,
    zIndex: 100,
  },
  nav: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    fontWeight: "600",
    cursor: "pointer",
  },
  usernameBtn: {
    background: "none",
    border: "none",
    color: "#2563eb",
    fontWeight: "600",
    cursor: "pointer",
    padding: "0.25rem 0.5rem",
    borderRadius: "8px",
    transition: "background-color 0.3s ease",
  },
  usernameBtnHover: {
    backgroundColor: "#e0e7ff",
  },
  logoutButton: {
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "1px solid #dc2626",
    color: "#dc2626",
    padding: "0.25rem 0.75rem",
    borderRadius: "0.75rem",
    fontWeight: "600",
    transition: "all 0.2s ease-in-out",
  },
};

export default function Header({ theme, setTheme, loggedInUser , onLogout, onShowProfile }) {
  return (
    <header style={styles.header}>
      <div style={{ userSelect: "none" }}>Admin Dashboard</div>
      <nav style={styles.nav}>
        {loggedInUser  ? (
          <>
            <button
              style={styles.usernameBtn}
              onClick={onShowProfile}
              aria-label="Open user profile"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.usernameBtnHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Hello, {loggedInUser .username}
            </button>
            <button style={styles.logoutButton} onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <div>Please login to access dashboard</div>
        )}
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </nav>
    </header>
  );
}
