import { Box, styled, useTheme } from "@mui/material";
import WaitMode from "./WaitMode";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useFetchDate from "./useFetchDate";
import { formatDate, generateWeekFromDay } from "../../shared/lib/helpers";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectOverviewApplication } from "./overviewSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../config/i18n";
import Title from "../../shared/ui/Title";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
);

const ApplicationWrapper = styled(Box)({
  flex: 2,
  minWidth: "350px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  justifyContent: "space-evenly",
});

const GraphWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  maxHeight: "300px",
  alignSelf: "center",
  [theme.breakpoints.down("md")]: {
    maxWidth: "450px",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "350px",
  },
}));

export default function Application() {
  const { t, i18n } = useTranslation("overview");
  const lang = i18n.language as TLanguage;
  const date = useFetchDate();
  const week = useMemo(() => generateWeekFromDay(date), [date]);
  const { direct, social, referral } = useSelector(
    selectOverviewApplication,
  ) ?? { direct: [], social: [], referral: [] };
  const dataMin = Math.min(...direct, ...social, ...referral);
  const dataMax = Math.max(...direct, ...social, ...referral);
  const theme = useTheme();

  const data = {
    labels: week.map((d) => formatDate(d, lang, false, true)),
    datasets: [
      {
        data: direct,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        borderColor: theme.palette.first.main,
        label: t("application.direct"),
      },
      {
        data: social,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        borderColor: theme.palette.fourth.main,
        label: t("application.social"),
      },
      {
        data: referral,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        borderColor: theme.palette.third.main,
        label: t("application.referral"),
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
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
      },
      y: {
        min: dataMin - (dataMin % 10),
        max: dataMax + (10 - (dataMax % 10)),
        border: { display: false },
        grid: {
          color: theme.palette.background.paper,
        },
        ticks: {
          stepSize: 5,
          callback: function (value: number | string) {
            if (value === 0) return "";
            return value;
          },
        },
      },
    },
  };

  return (
    <ApplicationWrapper>
      <WaitMode>
        <Title ender={false}>{t("application.title")}</Title>
        <GraphWrapper>
          <Line data={data} options={options} />
        </GraphWrapper>
      </WaitMode>
    </ApplicationWrapper>
  );
}
