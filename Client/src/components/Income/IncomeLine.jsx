import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IncomeLine = () => {
  const incomeData = useSelector((state) => state.data.incomes);

  const label = incomeData.map((income) => new Date(income.date).getDate());
  const data = incomeData.map((income) => income.amount);

  return (
    <div>
      <Line
        data={{
          labels: label,
          datasets: [
            {
              label: "Income",
              data: data,
              borderColor: "rgb(10, 143, 0)",
              backgroundColor: "rgba(17, 255, 0)",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Income by Date",
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default IncomeLine;
