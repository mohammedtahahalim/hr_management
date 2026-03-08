import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  selectAllCandidates,
  selectRejectedCandidates,
  selectShortlistedCandidates,
} from "./candidateSlice";
import { calculatePercentage } from "../../../shared/lib/constants";
import Title from "../../../shared/ui/Title";

const StatusWrapper = styled(Box)({
  flex: 1,
  height: "210px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const Employers = styled(Typography)({
  fontStyle: "italic",
  fontFamily: "system-ui",
  fontWeight: "bold",
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

const Number = styled("span")({
  fontFamily: "system-ui",
  fontSize: "2rem",
  fontWeight: "bold",
  fontStyle: "normal",
});

const ApplicantPercentage = styled(Box)({
  width: "100%",
  overflow: "hidden",
  display: "flex",
  flex: 1,
});

const Stat = styled(Box, {
  shouldForwardProp: (prop) => prop !== "percentage",
})<{ percentage: number }>(({ percentage }) => ({
  minHeight: "100%",
  width: `${percentage}%`,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
}));

const Bar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "dir" && prop !== "isArabic",
})<{ dir: "left" | "right" | "middle"; isArabic: boolean }>(
  ({ theme, dir, isArabic }) => ({
    width: "100%",
    minHeight: "15px",
    overflow: "hidden",
    position: "relative",
    ...(dir === "left"
      ? {
          borderRadius: "8px",
          backgroundColor: theme.palette.first.main,
        }
      : dir === "right"
        ? {
            ...(isArabic
              ? {
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                }
              : {
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }),
            backgroundColor: theme.palette.fourth.main,
            "&::before": {
              content: "''",
              height: "100%",
              aspectRatio: "1",
              position: "absolute",
              top: "0",
              ...(isArabic
                ? { right: "0", translate: "50% 0%" }
                : { left: "0", translate: "-50% 0%" }),
              borderRadius: "50%",
              backgroundColor: theme.palette.background.default,
            },
          }
        : {
            ...(isArabic
              ? {
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                }
              : {
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }),
            backgroundColor: theme.palette.third.main,
            "&::before": {
              content: "''",
              height: "100%",
              aspectRatio: "1",
              position: "absolute",
              top: "0",
              ...(isArabic
                ? { right: "0", translate: "50% 0%" }
                : { left: "0", translate: "-50% 0%" }),
              borderRadius: "50%",
              backgroundColor: theme.palette.background.default,
            },
          }),
  }),
);

const Percentage = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.default,
  flex: 1,
  paddingLeft: "5px",
}));

const Percent = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "system-ui",
});

const Text = styled(Typography)({
  fontFamily: "system-ui",
  textTransform: "uppercase",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontStyle: "italic",
  fontSize: "0.9rem",
  fontWeight: "500",
});

export default function Status() {
  const { t, i18n } = useTranslation("dashboard");
  const allCandidates = useSelector(selectAllCandidates).length;
  const shortlisted = calculatePercentage(
    allCandidates,
    useSelector(selectShortlistedCandidates).length,
  );
  const rejected = calculatePercentage(
    allCandidates,
    useSelector(selectRejectedCandidates).length,
  );
  const rest = 100 - shortlisted - rejected;
  const isArabic = i18n.language === "ar";

  return (
    <StatusWrapper>
      <Title>{t("candidate.status.title")}</Title>
      <Employers variant="subtitle1">
        <Number>{allCandidates}</Number>
        {"  "}
        {t("candidate.status.employers")}
      </Employers>
      <ApplicantPercentage>
        <Stat percentage={rest}>
          <Bar dir="left" isArabic={isArabic} />
          <Percentage>
            <Percent variant="body1">{rest}%</Percent>
            <Text variant="subtitle1">{t("candidate.status.total")}</Text>
          </Percentage>
        </Stat>
        <Stat percentage={shortlisted}>
          <Bar dir="middle" isArabic={isArabic} />
          <Percentage>
            <Percent variant="body1">{shortlisted}%</Percent>
            <Text variant="subtitle1">{t("candidate.status.shortlisted")}</Text>
          </Percentage>
        </Stat>
        <Stat percentage={rejected}>
          <Bar dir="right" isArabic={isArabic} />
          <Percentage>
            <Percent variant="body1">{rejected}%</Percent>
            <Text variant="subtitle1">{t("candidate.status.rejected")}</Text>
          </Percentage>
        </Stat>
      </ApplicantPercentage>
    </StatusWrapper>
  );
}
