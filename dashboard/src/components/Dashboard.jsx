import React from "react";
import Card from "./Card";
import Table from "./Table";
import LineChart from "./LineChart";
import Calendar from "./Calendar";
import Kanban from "./Kanban";

const containerStyle = {
  maxWidth: 1200,
  margin: "3rem auto",
  padding: "0 1rem",
  userSelect: "none",
};

const sectionTitleStyle = {
  fontSize: 36,
  fontWeight: 700,
  color: "#00BFFF",
  marginBottom: 24,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: 24,
  marginBottom: 48,
};

export default function Dashboard() {
  return (
    <main style={containerStyle}>
      <section>
        <h2 style={sectionTitleStyle}>Dashboard Overview</h2>
        <div style={gridStyle}>
          <Card title="Users" value="1,249" icon="👥" />
          <Card title="Active Sessions" value="527" icon="💻" />
          <Card title="Server Uptime" value="99.98%" icon="🟢" />
          <Card title="Errors" value="12" icon="⚠️" />
        </div>
      </section>

      <section>
        <h2 style={sectionTitleStyle}>User Table</h2>
        <Table />
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Sales Chart</h2>
        <LineChart />
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Calendar</h2>
        <Calendar />
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Kanban Board</h2>
        <Kanban />
      </section>

      <footer style={{ textAlign: "center", color: "#6b7280", margin: "3rem 0" }}>
        &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </footer>
    </main>
  );
}
