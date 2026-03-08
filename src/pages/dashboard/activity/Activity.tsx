import { Box, styled } from "@mui/material";
import Title from "../../../shared/ui/Title";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import Event from "./Event";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { activityData, activityStatus, fetchActivities } from "./activitySlice";
import type { TLanguage } from "../../../config/i18n";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";

const ActivityWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxHeight: "425px",
  backgroundColor: theme.palette.first.main,
}));

const EventsWrapper = styled(Box)({
  flex: 1,
  width: "100%",
  overflowX: "hidden",
  overflowY: "scroll",
  scrollbarWidth: "none",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "0px 10px",
});

export default function Activity() {
  const { t, i18n } = useTranslation("dashboard");
  const status = useSelector(activityStatus);
  const data = useSelector(activityData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const activityRequest = dispatch(fetchActivities());
    return () => {
      activityRequest.abort();
    };
  }, [dispatch]);

  return (
    <WithSkeleton loading={status === "loading"}>
      <ActivityWrapper>
        <Title isColorDiff="whitesmoke">{t("activity.title")}</Title>
        <EventsWrapper>
          {data.map((d) => {
            return (
              <Event
                key={d.id}
                title={d.title[i18n.language as TLanguage]}
                content={d.content[i18n.language as TLanguage]}
                date={d.date}
              />
            );
          })}
        </EventsWrapper>
      </ActivityWrapper>
    </WithSkeleton>
  );
}
