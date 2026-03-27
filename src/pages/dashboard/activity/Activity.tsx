import { Box, styled } from "@mui/material";
import Title from "../../../shared/ui/Title";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import Event from "./Event";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActivities,
  selectActivityData,
  selectActivityError,
  selectActivityStatus,
} from "./activitySlice";
import type { TLanguage } from "../../../config/i18n";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";
import Reload from "../../../shared/ui/Reload";

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
  const status = useSelector(selectActivityStatus);
  const error = useSelector(selectActivityError);
  const data = useSelector(selectActivityData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const activityRequest = dispatch(fetchActivities());
    return () => {
      activityRequest.abort();
    };
  }, [dispatch]);

  return (
    <WithSkeleton loading={status === "loading"}>
      {status === "success" && (
        <ActivityWrapper>
          <Title isColorDiff="whitesmoke">{t("activity.title")}</Title>
          <EventsWrapper tabIndex={-1}>
            {data.map((d) => {
              return (
                <Event
                  key={d.id}
                  title={d.title[i18n.language as TLanguage]}
                  content={d.content[i18n.language as TLanguage]}
                  date={d.date}
                  id={d.id}
                />
              );
            })}
          </EventsWrapper>
        </ActivityWrapper>
      )}
      {status === "failure" && (
        <Reload
          error={error}
          dispatchThunk={() => dispatch(fetchActivities())}
        />
      )}
    </WithSkeleton>
  );
}
