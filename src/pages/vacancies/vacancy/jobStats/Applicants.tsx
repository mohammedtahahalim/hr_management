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
import { formatDate } from "../../../../shared/lib/helpers";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../../config/i18n";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import { selectVacancyStatus } from "../vacancySlice";

const sampleLabel: string[] = [
  "2026-03-19T08:00:00.000Z",
  "2026-03-20T12:30:00.000Z",
  "2026-03-21T16:45:00.000Z",
  "2026-03-22T09:15:00.000Z",
  "2026-03-23T20:00:00.000Z",
  "2026-03-24T14:10:00.000Z",
];

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
  overflow: "hidden",
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
  overflow: "hidden",
});

export default function Applicants() {
  const { i18n, t } = useTranslation("vacancy");
  const status = useSelector(selectVacancyStatus);
  const theme = useTheme();
  const data = {
    labels: sampleLabel.map((d) =>
      formatDate(d, i18n.language as TLanguage, false),
    ),
    datasets: [
      {
        data: [12, 15, 12, 22, 18, 9],
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
      },
      y: {
        min: 0,
        max: 40,
        border: { display: false },
        ticks: {
          stepSize: 10,
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
