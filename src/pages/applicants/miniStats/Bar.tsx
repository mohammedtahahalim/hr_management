import { Box, styled, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { PositionColor } from "../../../shared/lib/types";
import { Bar as BarGraph } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface BarProps {
  name: "active" | "open" | "hiring" | "experience";
  trend: number[];
  barColor: PositionColor;
}

const BarWrapper = styled(Box)({
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "8px",
});

const Title = styled(Typography)({
  padding: "10px",
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "1rem",
});

const BarContainer = styled(Box)({
  flex: 1,
  padding: "10px",
  maxHeight: "75px",
  overflow: "hidden",
  maxWidth: "175px",
});

export default function Bar({ name, trend, barColor }: BarProps) {
  const { t } = useTranslation("applicants");
  const theme = useTheme();

  const data = {
    labels: trend.map((_, index) => `${index + 1}`),
    datasets: [
      {
        label: t(`miniStats.${name}.title`),
        data: trend,
        backgroundColor: theme.palette[barColor].main,
        borderColor: "transparent",
        borderWidth: 1.5,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <BarWrapper>
      <Title id="overview-title" tabIndex={0} variant="h6">
        {t(`miniStats.${name}.title`)}
      </Title>
      <BarContainer>
        <BarGraph data={data} options={options} />
      </BarContainer>
    </BarWrapper>
  );
}
