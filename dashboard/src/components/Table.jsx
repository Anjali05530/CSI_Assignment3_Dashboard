import React, { useState, useMemo } from "react";

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
  color: "grey",
};

const thStyle = {
  padding: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  borderBottom: "2px solid #d1d5db",
  userSelect: "none",
  cursor: "pointer",
  color: "#374151",
};

const tdStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid #e5e7eb",
};

const statusActiveStyle = {
  backgroundColor: "#d1fae5",
  color: "#047857",
  borderRadius: 12,
  padding: "2px 8px",
  fontWeight: 600,
  fontSize: 12,
};

const statusInactiveStyle = {
  backgroundColor: "#fee2e2",
  color: "#b91c1c",
  borderRadius: 12,
  padding: "2px 8px",
  fontWeight: 600,
  fontSize: 12,
};

export default function Table() {
  const [sortKey, setSortKey] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);

  const data = useMemo(
    () => [
      { id: 1, name: "Alice", status: "Active", email: "alice@example.com", role: "Admin" },
      { id: 2, name: "Bob", status: "Inactive", email: "bob@example.com", role: "User" },
      { id: 3, name: "Carol", status: "Active", email: "carol@example.com", role: "Manager" },
      { id: 4, name: "Dave", status: "Active", email: "dave@example.com", role: "User" },
      { id: 5, name: "Eve", status: "Inactive", email: "eve@example.com", role: "User" },
    ],
    []
  );

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortAsc]);

  function handleSort(key) {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  return (
    <table style={tableStyle} aria-label="User data table">
      <thead>
        <tr>
          {["id", "name", "status", "email", "role"].map((key) => (
            <th
              key={key}
              style={thStyle}
              onClick={() => handleSort(key)}
              role="button"
              tabIndex={0}
              aria-sort={sortKey === key ? (sortAsc ? "ascending" : "descending") : "none"}
            >
              {key.toUpperCase()}
              {sortKey === key && (sortAsc ? " ▲" : " ▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id} style={{ backgroundColor: row.id % 2 === 0 ? "#f9fafb" : "transparent" }}>
            <td style={tdStyle}>{row.id}</td>
            <td style={tdStyle}>{row.name}</td>
            <td style={tdStyle}>
              <span style={row.status === "Active" ? statusActiveStyle : statusInactiveStyle}>
                {row.status}
              </span>
            </td>
            <td style={tdStyle}>{row.email}</td>
            <td style={tdStyle}>{row.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
