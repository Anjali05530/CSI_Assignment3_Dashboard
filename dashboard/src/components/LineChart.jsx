import React, { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend } from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend);

export default function LineChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Visitors",
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: "#2563eb",
            backgroundColor: "rgba(37, 99, 235, 0.2)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#374151",
              font: { weight: "600", size: 14 },
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#374151" },
            grid: { display: false },
          },
          y: {
            ticks: {
              color: "#374151",
              stepSize: 20,
              beginAtZero: true,
            },
            grid: {
              borderDash: [5, 5],
              color: "rgba(107, 114, 128, 0.2)",
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: 256,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
      <canvas ref={canvasRef} aria-label="Visitors line chart" role="img" />
    </div>
  );
}
