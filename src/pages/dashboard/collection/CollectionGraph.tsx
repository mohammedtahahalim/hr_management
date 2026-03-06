import { alpha, Box, styled, useTheme } from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Legend,
  Tooltip,
  type TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectInsource, selectOutsource } from "./collectionSlice";
import { useTranslation } from "react-i18next";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Legend,
  Tooltip,
);

const GraphWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

export default function CollectionGraph() {
  const insource = useSelector(selectInsource);
  const outsource = useSelector(selectOutsource);
  const { t } = useTranslation("dashboard");

  const theme = useTheme();
  const data = {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        data: insource,
        label: t("collection.insource"),
        borderColor: theme.palette.first.main,
        backgroundColor: alpha(theme.palette.first.main, 0.5),
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
        pointStyle: "circle",
      },
      {
        data: outsource,
        label: t("collection.outsource"),
        borderColor: theme.palette.second.main,
        backgroundColor: alpha(theme.palette.second.main, 0.5),
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
        pointStyle: "circle",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            return `Value: ${context.raw}`;
          },
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      intersect: false,
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
      y: {
        border: { display: false },
        grid: {
          color: theme.palette.divider,
        },
        ticks: {
          stepSize: 10,
          display: false,
        },
        min: 20,
        max: 70,
      },
    },
  };

  return (
    <GraphWrapper>
      <Line data={data} options={options} />
    </GraphWrapper>
  );
}
