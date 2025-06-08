

import React, { useState } from "react";

const containerStyle = {
  display: "flex",
  gap: 20,
  maxWidth: 1200,
  margin: "0 auto",
  padding: "2rem 1rem",
  userSelect: "none",
};

const columnStyle = {
  flex: 1,
  backgroundColor: "#f9fafb",
  borderRadius: 12,
  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  maxHeight: 450,
  overflowY: "auto",
  transition: "background-color 0.3s ease",
};

const columnHeaderStyle = {
  marginBottom: 16,
  fontWeight: 700,
  fontSize: 18,
  color: "#111827",
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: "0.75rem 1rem",
  marginBottom: 12,
  boxShadow: "0 1px 8px rgba(0,0,0,0.15)",
  cursor: "grab",
  fontWeight: 600,
  color: "#374151",
  transition: "box-shadow 0.2s ease",
  userSelect: "none",
};

const cardHoverFocusStyle = {
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.5)",
};

const addTaskButtonStyle = {
  marginTop: "auto",
  padding: "0.75rem 1.25rem",
  borderRadius: 12,
  border: "2px dashed #2563eb",
  color: "#2563eb",
  fontWeight: 600,
  textAlign: "center",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  userSelect: "none",
};

const addTaskButtonHoverStyle = {
  backgroundColor: "#e0e7ff",
};

export default function Kanban() {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [
        { id: "1", content: "Design the dashboard UI" },
        { id: "2", content: "Set up React project" },
      ],
    },
    inprogress: {
      name: "In Progress",
      items: [{ id: "3", content: "Implement theme toggle" }],
    },
    done: {
      name: "Done",
      items: [{ id: "4", content: "Gather requirements" }],
    },
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [newTaskText, setNewTaskText] = useState("");
  const [addingToColumn, setAddingToColumn] = useState(null);

  function onDragStart(e, columnId, itemIndex) {
    setDraggedItem({ columnId, itemIndex });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "");
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(e, targetColumnId) {
    e.preventDefault();
    if (!draggedItem) return;
    const { columnId, itemIndex } = draggedItem;
    if (columnId === targetColumnId) return;

    const item = columns[columnId].items[itemIndex];
    const newColumns = { ...columns };

    newColumns[columnId] = {
      ...newColumns[columnId],
      items: newColumns[columnId].items.filter((_, i) => i !== itemIndex),
    };

    newColumns[targetColumnId] = {
      ...newColumns[targetColumnId],
      items: [...newColumns[targetColumnId].items, item],
    };

    setColumns(newColumns);
    setDraggedItem(null);
  }

  function startAddTask(columnId) {
    if (columnId !== "todo") return; // Only allow adding in To Do
    setAddingToColumn(columnId);
    setNewTaskText("");
  }

  function cancelAddTask() {
    setAddingToColumn(null);
    setNewTaskText("");
  }

  function confirmAddTask() {
    if (!newTaskText.trim()) return;
    const newItem = { id: Date.now().toString(), content: newTaskText.trim() };
    const newColumns = { ...columns };
    newColumns[addingToColumn].items = [
      ...newColumns[addingToColumn].items,
      newItem,
    ];
    setColumns(newColumns);
    cancelAddTask();
  }

  return (
    <section style={containerStyle} aria-label="Kanban board">
      {Object.entries(columns).map(([columnId, column]) => (
        <div
          key={columnId}
          style={columnStyle}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, columnId)}
          aria-label={`${column.name} column`}
        >
          <h3 style={columnHeaderStyle}>{column.name}</h3>
          {column.items.length === 0 && (
            <p
              style={{
                fontStyle: "italic",
                color: "#6b7280",
                textAlign: "center",
                flexGrow: 1,
                userSelect: "none",
              }}
            >
              No tasks
            </p>
          )}
          {column.items.map((item, idx) => (
            <div
              key={item.id}
              draggable
              role="button"
              tabIndex={0}
              aria-grabbed="false"
              onDragStart={(e) => onDragStart(e, columnId, idx)}
              style={cardStyle}
              onFocus={(e) =>
                (e.currentTarget.style.boxShadow = cardHoverFocusStyle.boxShadow)
              }
              onBlur={(e) => (e.currentTarget.style.boxShadow = cardStyle.boxShadow)}
            >
              {item.content}
            </div>
          ))}

          {/* Show Add Task controls ONLY for "To Do" column */}
          {columnId === "todo" ? (
            addingToColumn === columnId ? (
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <textarea
                  aria-label="New task text"
                  rows={3}
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  style={{
                    borderRadius: 12,
                    padding: 10,
                    fontSize: 16,
                    resize: "vertical",
                    border: "1px solid #d1d5db",
                    fontFamily: "'Inter', sans-serif",
                    outline: "none",
                    minHeight: 70,
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      confirmAddTask();
                    } else if (e.key === "Escape") {
                      cancelAddTask();
                    }
                  }}
                  autoFocus
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={confirmAddTask}
                    style={{
                      ...cardStyle,
                      cursor: "pointer",
                      flexGrow: 1,
                      textAlign: "center",
                    }}
                  >
                    Add Task
                  </button>
                  <button
                    onClick={cancelAddTask}
                    style={{
                      ...cardStyle,
                      flexGrow: 1,
                      backgroundColor: "#ddd",
                      color: "#333",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => startAddTask(columnId)}
                style={addTaskButtonStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    addTaskButtonHoverStyle.backgroundColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                aria-label={`Add new task to ${column.name}`}
              >
                + Add New Task
              </button>
            )
          ) : null}
        </div>
      ))}
    </section>
  );
}
