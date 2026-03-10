import { Box, styled, useTheme } from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface GraphProps {
  trend: number[];
}

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const GraphWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  maxHeight: "42px",
  overflow: "hidden",
  maxWidth: "75px",
});

export default function Graph({ trend }: GraphProps) {
  const theme = useTheme();
  const data = {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        data: trend,
        borderColor: theme.palette.info.main,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
      y: {
        display: false,
        min: 0,
        max: 30,
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <GraphWrapper>
      <Line data={data} options={options} />
    </GraphWrapper>
  );
}
