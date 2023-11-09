import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

const IncomePie = () => {
  const incomeData = useSelector((state) => state.data.incomes);

  const groupedIncomeData = incomeData.reduce((acc, item) => {
    const { source, amount } = item;
    acc[source] = (acc[source] || 0) + amount;
    return acc;
  }, {});

  const sources = Object.keys(groupedIncomeData);
  const amounts = Object.values(groupedIncomeData);

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
        labels: sources,
        datasets: [
          {
            data: amounts,
            backgroundColor: [
              "rgba(255, 0, 55, 0.6)",
              "rgba(0, 153, 255, 0.6)",
              "rgba(255, 183, 0, 0.6)",
              "rgba(0, 255, 42, 0.6)",
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
  }, [amounts, sources]);

  return (
    <div style={{ height: "auto", display: "flex", flexDirection: "column" }}>
      <h4 style={{ fontFamily: "Ubuntu", color: "#141718" }}>
        Income by Source
      </h4>
      <div style={{ flex: 1 }}>
        <canvas ref={chartRef} style={{ maxHeight: "100%" }} />
      </div>
    </div>
  );
};

export default IncomePie;
