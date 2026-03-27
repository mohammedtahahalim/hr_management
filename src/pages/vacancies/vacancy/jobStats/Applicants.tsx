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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVacancy,
  selectApplicantOverTime,
  selectVacancyError,
  selectVacancyStatus,
} from "../vacancySlice";
import Reload from "../../../../shared/ui/Reload";
import { useParams } from "react-router-dom";
import type { AppDispatch } from "../../../../config/store";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
);

const ApplicantsWrapper = styled(Box)({
  height: "100%",
  maxHeight: "250px",
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
  "& canvas": {
    width: "100% !important",
  },
});

export default function Applicants() {
  const { i18n, t } = useTranslation("vacancy");
  const { id = "1" } = useParams();
  const status = useSelector(selectVacancyStatus);
  const error = useSelector(selectVacancyError);
  const dispatch = useDispatch<AppDispatch>();
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
      <WithSkeleton loading={status === "loading"} sx={{ minHeight: "250px" }}>
        {status === "success" && (
          <ApplicantChart>
            <Line data={data} options={options} tabIndex={0} />
          </ApplicantChart>
        )}
        {status === "failure" && (
          <Reload
            error={error}
            dispatchThunk={() => dispatch(fetchVacancy({ id }))}
          />
        )}
      </WithSkeleton>
    </ApplicantsWrapper>
  );
}
