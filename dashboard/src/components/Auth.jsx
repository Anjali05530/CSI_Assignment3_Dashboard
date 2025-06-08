import React, { useState } from "react";

const containerStyle = {
  maxWidth: 400,
  margin: "3rem auto",
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  padding: "2rem",
  fontSize: 16,
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "0.5rem 0 1rem 0",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 16,
  outline: "none",
};

const labelStyle = {
  fontWeight: 600,
  marginBottom: 6,
  display: "block",
  color: "#374151",
};

const buttonStyle = {
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: 12,
  padding: "0.8rem 1.5rem",
  fontSize: 18,
  fontWeight: "600",
  cursor: "pointer",
  width: "100%",
  marginTop: "1rem",
  transition: "background-color 0.3s ease",
};

const errorStyle = {
  color: "#dc2626",
  fontWeight: "600",
  marginTop: "-0.5rem",
  marginBottom: "1rem",
};

const linkStyle = {
  color: "#2563eb",
  cursor: "pointer",
  textDecoration: "underline",
  userSelect: "none",
  marginLeft: 6,
};

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("login"); // or register
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const USERS_KEY = "admindashboard_users";

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users) =>
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !email.trim() || !password) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setError("Email is already registered.");
      return;
    }
    const newUser = {
      id: Date.now(),
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
    };
    users.push(newUser);
    saveUsers(users);
    alert("Registration successful! You can now log in.");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMode("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("All fields are required.");
      return;
    }
    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    onLogin(user);
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24, userSelect: "none" }}>
        {mode === "login" ? "Sign In to Your Account" : "Create a New Account"}
      </h2>
      <form onSubmit={mode === "login" ? handleLogin : handleRegister} noValidate>
        {error && <p style={errorStyle}>{error}</p>}

        {mode === "register" && (
          <>
            <label style={labelStyle} htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </>
        )}

        <label style={labelStyle} htmlFor="email">
          Email address
        </label>
        <input
          type="email"
          id="email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label style={labelStyle} htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {mode === "register" && (
          <>
            <label style={labelStyle} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              style={inputStyle}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit" style={buttonStyle}>
          {mode === "login" ? "Sign In" : "Register"}
        </button>
      </form>
      <p style={{ marginTop: 16, fontSize: 14, color: "#6b7280", userSelect: "none" }}>
        {mode === "login" ? (
          <>
            Don't have an account?
            <span style={linkStyle} onClick={() => setMode("register")}>
              Register
            </span>
          </>
        ) : (
          <>
            Already have an account?
            <span style={linkStyle} onClick={() => setMode("login")}>
              Sign In
            </span>
          </>
        )}
      </p>
    </div>
  );
}
