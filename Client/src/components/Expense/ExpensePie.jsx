import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

const ExpensePie = () => {
  const expenseData = useSelector((state) => state.data.expenses);

  const groupedExpenseData = expenseData.reduce((acc, item) => {
    const { category, amount } = item;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const categories = Object.keys(groupedExpenseData);
  const amounts = Object.values(groupedExpenseData);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: categories,
        datasets: [
          {
            data: amounts,
            backgroundColor: [
              "rgba(255, 0, 55, 0.6)",
              "rgba(0, 153, 255, 0.6)",
              "rgba(255, 183, 0, 0.6)",
              "rgba(0, 255, 42, 0.6)",
              "rgba(251, 0, 255, 0.6)",
              "rgba(132, 0, 255, 0.6)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [amounts, categories]);

  return (
    <div style={{ height: "auto", display: "flex", flexDirection: "column" }}>
      <h4 style={{ fontFamily: "Ubuntu", color: "#141718" }}>
        Expense by Category
      </h4>
      <div style={{ flex: 1 }}>
        <canvas ref={chartRef} style={{ maxHeight: "100%" }} />
      </div>
    </div>
  );
};

export default ExpensePie;
