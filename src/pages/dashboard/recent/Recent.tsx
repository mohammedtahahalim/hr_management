import { Box, styled, Typography } from "@mui/material";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import JobRow from "./JobRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentJobs, recentData, recentStatus } from "./recentSlice";
import { useTranslation } from "react-i18next";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";

const RecentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "500px",
  maxHeight: "600px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflowX: "hidden",
  overflowY: "scroll",
  scrollbarWidth: "none",
  backgroundColor: theme.palette.background.paper,
}));

const Title = styled(Typography)({
  width: "100%",
  height: "50px",
  fontFamily: "system-ui",
  fontWeight: "bold",
});

const Content = styled("table")({
  width: "100%",
  flex: 1,
  overflow: "hidden",
  borderCollapse: "collapse",
  overflowY: "scroll",
  scrollbarWidth: "none",
});

const HeadRow = styled("tr", {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  backgroundColor: theme.palette.background.default,
  fontWeight: "bold",
  fontFamily: "system-ui",
  minHeight: "32px",
  "&>td": {
    padding: "10px 12px",
    "&:first-of-type": {
      ...(isArabic
        ? { borderTopRightRadius: "20px", borderBottomRightRadius: "40px" }
        : { borderTopLeftRadius: "20px", borderBottomLeftRadius: "40px" }),
    },
    "&:last-of-type": {
      ...(isArabic
        ? { borderTopLeftRadius: "20px", borderBottomLeftRadius: "40px" }
        : { borderTopRightRadius: "20px", borderBottomRightRadius: "40px" }),
    },
  },
}));

const Col = styled("td")(({ theme }) => ({
  maxWidth: "100px",
  padding: "5px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  [theme.breakpoints.down("md")]: {
    "&:nth-of-type(2)": {
      display: "none",
    },
  },
}));

export default function Recent() {
  const status = useSelector(recentStatus);
  const data = useSelector(recentData);
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation("dashboard");
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    const recentRequest = dispatch(fetchRecentJobs());
    return () => {
      recentRequest.abort();
    };
  }, [dispatch]);

  return (
    <WithSkeleton loading={status === "loading"}>
      <RecentWrapper>
        <Title variant="h6">{t("recent.title")}</Title>
        <Content>
          <thead>
            <HeadRow isArabic={isArabic}>
              <Col>{t("recent.jobTitle")}</Col>
              <Col>{t("recent.location")}</Col>
              <Col>{t("recent.appNum")}</Col>
              <Col>{t("recent.chart")}</Col>
            </HeadRow>
          </thead>
          <tbody>
            {data.map((d) => {
              return <JobRow key={d.id} {...d} />;
            })}
          </tbody>
        </Content>
      </RecentWrapper>
    </WithSkeleton>
  );
}
