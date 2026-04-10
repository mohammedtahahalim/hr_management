import { Box, styled } from "@mui/material";
import type { RecentJobs } from "./recentSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../config/i18n";
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
  textAlign: "center",
  "&:nth-of-type(2)": {
    display: "flex",
    gap: "2px",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    minHeight: "45px",
    margin: "0 auto",
  },
  [theme.breakpoints.down("md")]: {
    "&:nth-of-type(2)": {
      display: "none",
    },
  },
}));

const GraphBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

export default function JobRow({
  jobTitle,
  location,
  totalApps,
  trend,
}: RecentJobs) {
  const { i18n, t } = useTranslation("dashboard");

  return (
    <JobRowWrapper>
      <Col>{jobTitle[i18n.language as TLanguage]}</Col>
      <Col>
        <LocationOnIcon fontSize="small" color="success" />{" "}
        {t(`recent.locations.${location}`)}
      </Col>
      <Col>{totalApps}</Col>
      <Col>
        <GraphBox>
          <Graph trend={trend} />
        </GraphBox>
      </Col>
    </JobRowWrapper>
  );
}
