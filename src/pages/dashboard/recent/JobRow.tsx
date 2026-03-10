import { styled } from "@mui/material";
import type { RecentJobs } from "./recentSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../config/i18n";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Graph from "../../../shared/ui/Graph";

const JobRowWrapper = styled("tr")(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.background.default}`,
}));

const Col = styled("td")(({ theme }) => ({
  maxWidth: "100px",
  padding: "5px 10px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "0.9rem",
  fontStyle: "italic",
  fontFamily: "system-ui",
  verticalAlign: "middle",
  "&:nth-of-type(2)": {
    display: "flex",
    gap: "2px",
    alignItems: "center",
    height: "100%",
    minHeight: "45px",
  },
  [theme.breakpoints.down("md")]: {
    "&:nth-of-type(2)": {
      display: "none",
    },
  },
}));

export default function JobRow({
  jobTitle,
  location,
  totalApps,
  trend,
}: RecentJobs) {
  const { i18n, t } = useTranslation("dashboard");

  return (
    <JobRowWrapper>
      <Col aria-describedby="job-title" tabIndex={0}>
        {jobTitle[i18n.language as TLanguage]}
      </Col>
      <Col aria-describedby="job-location" tabIndex={0}>
        {location === "R" ? (
          <LanguageIcon fontSize="small" color="warning" />
        ) : (
          <LocationOnIcon fontSize="small" color="success" />
        )}
        {location === "R" ? t("recent.remote") : location}
      </Col>
      <Col aria-describedby="application-count" tabIndex={0}>
        {totalApps}
      </Col>
      <Col aria-describedby="application-chart">
        <Graph trend={trend} />
      </Col>
    </JobRowWrapper>
  );
}
