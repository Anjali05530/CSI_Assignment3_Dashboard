import React, { useState } from "react";

const calendarWrapper = {
  maxWidth: 380,
  margin: "0 auto",
  backgroundColor: "#fff",
  borderRadius: 12,
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  padding: "1rem",
  fontSize: 14,
  color: "#374151",
  userSelect: "none",
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

const weekDayStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  textAlign: "center",
  fontWeight: 600,
  color: "#6b7280",
  marginBottom: 8,
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  function getCalendarGrid(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const firstWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const totalCells = 42;
    const days = [];

    for (let i = 0; i < totalCells; i++) {
      let dayNum;
      let currentMonth = true;
      if (i < firstWeekday) {
        dayNum = prevMonthLastDay - firstWeekday + 1 + i;
        currentMonth = false;
      } else if (i < firstWeekday + daysInMonth) {
        dayNum = i - firstWeekday + 1;
      } else {
        dayNum = i - (firstWeekday + daysInMonth) + 1;
        currentMonth = false;
      }
      const dateObj = new Date(year, month, dayNum);
      days.push({ dayNum, currentMonth, dateObj });
    }
    return days;
  }

  function goPrevMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }

  function goNextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  }

  const days = getCalendarGrid(currentDate);
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const yearNum = currentDate.getFullYear();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function dayButtonStyle(currentMonth, isToday, isSelected) {
    let base = {
      borderRadius: "50%",
      width: 32,
      height: 32,
      cursor: currentMonth ? "pointer" : "default",
      border: isToday ? "2px solid #2563eb" : "2px solid transparent",
      backgroundColor: isSelected ? "#2563eb" : "transparent",
      color: isSelected ? "#ffffff" : currentMonth ? "#111827" : "#9ca3af",
      fontWeight: isSelected || isToday ? "700" : "400",
      fontSize: 14,
      userSelect: "none",
      outline: "none",
      margin: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "background-color 0.2s ease",
    };
    return base;
  }

  const today = new Date();

  return (
    <div style={calendarWrapper}>
      <div style={navStyle}>
        <button onClick={goPrevMonth} aria-label="Previous month" style={{ cursor: "pointer", fontSize: 18, background: "none", border: "none" }}>
          &lt;
        </button>
        <h2 style={{ fontWeight: 600, fontSize: 20 }}>{monthName} {yearNum}</h2>
        <button onClick={goNextMonth} aria-label="Next month" style={{ cursor: "pointer", fontSize: 18, background: "none", border: "none" }}>
          &gt;
        </button>
      </div>
      <div style={weekDayStyle}>
        {weekDays.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", justifyItems: "center" }}>
        {days.map(({ dayNum, currentMonth, dateObj }, i) => {
          const isToday = dateObj.toDateString() === today.toDateString();
          const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={i}
              type="button"
              disabled={!currentMonth}
              style={dayButtonStyle(currentMonth, isToday, isSelected)}
              onClick={() => currentMonth && setSelectedDate(dateObj)}
              aria-pressed={isSelected}
              aria-label={`${dateObj.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}${isToday ? ", Today" : ""}`}
            >
              {dayNum}
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <p style={{ textAlign: "center", marginTop: 16, fontWeight: 600, color: "#374151" }}>
          Selected: {selectedDate.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
