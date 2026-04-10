import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import JobRow from "./JobRow";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecentJobs,
  selectRecentData,
  selectRecentError,
  selectRecentStatus,
} from "./recentSlice";
import { useTranslation } from "react-i18next";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";
import Title from "../../../shared/ui/Title";
import Reload from "../../../shared/ui/Reload";

const RecentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  maxHeight: "425px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
}));

const TableScroll = styled(Box)({
  flex: 1,
  minHeight: 0,
  overflowY: "scroll",
  overflowX: "hidden",
  scrollbarWidth: "none",
});

const Content = styled("table")({
  width: "100%",
  flex: 1,
  overflow: "hidden",
  borderCollapse: "collapse",
  overflowY: "auto",
});

const HeadRow = styled("tr", {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  backgroundColor: theme.palette.background.default,
  fontWeight: "bold",
  fontFamily: "system-ui",
  minHeight: "32px",
  position: "sticky",
  top: 0,
  "&>th": {
    position: "sticky",
    top: 0,
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

const Col = styled("th")(({ theme }) => ({
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
  const status = useSelector(selectRecentStatus);
  const error = useSelector(selectRecentError);
  const data = useSelector(selectRecentData);
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
      {status === "success" && (
        <RecentWrapper>
          <Title>{t("recent.title")}</Title>
          <TableScroll>
            <Content>
              <thead>
                <HeadRow isArabic={isArabic}>
                  <Col scope="col">{t("recent.jobTitle")}</Col>
                  <Col scope="col">{t("recent.location")}</Col>
                  <Col scope="col">{t("recent.appNum")}</Col>
                  <Col scope="col">{t("recent.chart")}</Col>
                </HeadRow>
              </thead>
              <tbody>
                {data.map((d) => {
                  return <JobRow key={d.id} {...d} />;
                })}
              </tbody>
            </Content>
          </TableScroll>
        </RecentWrapper>
      )}
      {status === "failure" && (
        <Reload
          error={error}
          dispatchThunk={() => dispatch(fetchRecentJobs())}
        />
      )}
    </WithSkeleton>
  );
}
