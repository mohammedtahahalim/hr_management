import { Box, styled, Typography } from "@mui/material";
import type { EmployeeData } from "../employeeSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../../config/i18n";
import { formatDate } from "../../../../shared/lib/helpers";

interface ProjectProps {
  p: EmployeeData["activeProjects"][number];
}

const Project = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: "hidden",
  minWidth: "300px",
  minHeight: "275px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

const Title = styled(Typography)({
  fontFamily: "system-ui",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: "bold",
  fontSize: "1rem",
});

const Description = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
  fontSize: "0.85rem",
  display: "-webkit-box",
  WebkitLineClamp: "3",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

const Deadline = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.9rem",
}));

const Leader = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.9rem",
}));

const Progress = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  flex: 1,
});

const ProgressInfo = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.9rem",
});

const ProgressBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "fill",
})<{ fill: number }>(({ theme, fill }) => ({
  height: "8px",
  borderRadius: "50px",
  overflow: "hidden",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  position: "relative",
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: `${fill}%`,
    backgroundColor: theme.palette.primary.main,
    zIndex: 99,
    borderRadius: "50px",
  },
}));

export default function ProjectBox({ p }: ProjectProps) {
  const { t, i18n } = useTranslation("employee");
  const lang = i18n.language as TLanguage;
  console.log(p);
  return (
    <Project>
      <Title variant="body2">{p[lang].projTitle}</Title>
      <Description variant="body2">{p[lang].projDesc}</Description>
      <Deadline>
        <Typography
          variant="subtitle1"
          fontFamily={"inherit"}
          fontWeight={"inherit"}
          fontSize={"inherit"}
          id="deadline"
        >
          {t("projects.deadline")}
        </Typography>
        <Typography
          variant="subtitle1"
          fontFamily={"inherit"}
          fontSize={"inherit"}
          aria-describedby="deadline"
        >
          {formatDate(p[lang].deadline, lang)}
        </Typography>
      </Deadline>
      <Leader>
        <Typography
          variant="subtitle1"
          fontFamily={"inherit"}
          fontWeight={"inherit"}
          fontSize={"inherit"}
          id="projectLeader"
        >
          {t("projects.leader")}
        </Typography>
        <Typography
          variant="subtitle1"
          fontFamily={"inherit"}
          fontSize={"inherit"}
          aria-describedby="projectLeader"
        >
          {p[lang].projLeader}
        </Typography>
      </Leader>
      <Progress>
        <ProgressInfo>
          <Typography
            variant="subtitle1"
            fontFamily={"inherit"}
            fontWeight={"inherit"}
            fontSize={"inherit"}
            id="progress"
          >
            {t("projects.progress")}
          </Typography>
          <Typography
            variant="subtitle1"
            fontFamily={"inherit"}
            fontSize={"inherit"}
            aria-describedby="progress"
          >
            {p[lang].progress}%
          </Typography>
        </ProgressInfo>
        <ProgressBar fill={p[lang].progress}></ProgressBar>
      </Progress>
    </Project>
  );
}
