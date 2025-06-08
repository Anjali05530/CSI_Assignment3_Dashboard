import React from "react";

const cardStyle = {
  backgroundColor: "#f9fafb",
  borderRadius: 12,
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  padding: "1.5rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  fontWeight: 600,
  color: "#111827",
  fontSize: 14,
};

const iconStyle = {
  fontSize: 40,
};

const titleStyle = {
  textTransform: "uppercase",
  fontWeight: 600,
  color: "#6b7280",
  fontSize: 12,
  marginBottom: 4,
};

const valueStyle = {
  fontSize: 28,
  fontWeight: "800",
};

export default function Card({ title, value, icon }) {
  return (
    <article style={cardStyle}>
      <div style={iconStyle}>{icon}</div>
      <div>
        <p style={titleStyle}>{title}</p>
        <p style={valueStyle}>{value}</p>
      </div>
    </article>
  );
}
