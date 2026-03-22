import { Box, styled, useTheme } from "@mui/material";
import Title from "../../../../shared/ui/Title";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatDate, getLast7DaysISO } from "../../../../shared/lib/helpers";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../../config/i18n";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import { selectApplicantOverTime, selectVacancyStatus } from "../vacancySlice";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
);

const ApplicantsWrapper = styled(Box)({
  flex: 1.5,
  minWidth: "350px",
  overflowX: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const ApplicantHead = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
});

const ApplicantChart = styled(Box)({
  width: "100%",
  flex: 1,
  overflowX: "hidden",
});

export default function Applicants() {
  const { i18n, t } = useTranslation("vacancy");
  const status = useSelector(selectVacancyStatus);
  const theme = useTheme();
  const trend = useSelector(selectApplicantOverTime);
  const data = {
    labels: getLast7DaysISO().map((d) =>
      formatDate(d, i18n.language as TLanguage, false),
    ),
    datasets: [
      {
        data: trend,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        borderColor: theme.palette.secondary.main,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: theme.palette.primary.main,
        },
      },
      y: {
        min: Math.min(...(trend ?? [])) - (Math.min(...(trend ?? [])) % 10),
        max:
          Math.max(...(trend ?? [])) + (10 - (Math.max(...(trend ?? [])) % 10)),
        border: { display: false },
        grid: {
          color: theme.palette.background.paper,
        },
        ticks: {
          stepSize: 10,
          color: theme.palette.primary.main,
          callback: function (value: number | string) {
            if (value === 0) return "";
            return value;
          },
        },
      },
    },
  };
  return (
    <ApplicantsWrapper>
      <ApplicantHead>
        <Title variant="h6" ender={false}>
          {t("applicants")}
        </Title>
      </ApplicantHead>
      <WithSkeleton loading={status === "loading"}>
        <ApplicantChart>
          <Line data={data} options={options} />
        </ApplicantChart>
      </WithSkeleton>
    </ApplicantsWrapper>
  );
}
