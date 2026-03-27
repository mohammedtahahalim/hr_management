import { Box, styled, Typography } from "@mui/material";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVacancy,
  selectVacancyError,
  selectVacancyStatus,
} from "../vacancySlice";
import Title from "../../../../shared/ui/Title";
import { useTranslation } from "react-i18next";
import { sampleData } from "../../../../shared/lib/constants";
import type { TLanguage } from "../../../../config/i18n";
import Reload from "../../../../shared/ui/Reload";
import type { AppDispatch } from "../../../../config/store";
import { useParams } from "react-router-dom";

const ActivityWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  border: `1px solid ${theme.palette.background.paper}`,
  borderRadius: "18px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
}));

const ActivitiesContent = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  overflowY: "scroll",
  scrollbarWidth: "none",
  maxHeight: "425px",
});

const ActivityLine = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "85px",
  display: "flex",
  flexDirection: "column",
  padding: "8px",
  "&:not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Step = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.95rem",
});

const Feedback = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
  fontSize: "0.85rem",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});

export default function Activity() {
  const status = useSelector(selectVacancyStatus);
  const error = useSelector(selectVacancyError);
  const { id = "1" } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { i18n, t } = useTranslation("vacancy");
  return (
    <WithSkeleton loading={status === "loading"}>
      {status === "success" && (
        <ActivityWrapper>
          <Title variant="h6" ender={false}>
            {t("recentActivities")}
          </Title>
          <ActivitiesContent tabIndex={-1}>
            {sampleData[i18n.language as TLanguage].map((s, idx) => {
              return (
                <ActivityLine key={idx} tabIndex={-1}>
                  <Step
                    variant="body1"
                    aria-describedby={`feedback-${s.title}`}
                    tabIndex={0}
                  >
                    {s.title}
                  </Step>
                  <Feedback variant="subtitle1" id={`feedback-${s.title}`}>
                    {s.content}
                  </Feedback>
                </ActivityLine>
              );
            })}
          </ActivitiesContent>
        </ActivityWrapper>
      )}
      {status === "failure" && (
        <Reload
          error={error}
          dispatchThunk={() => dispatch(fetchVacancy({ id }))}
        />
      )}
    </WithSkeleton>
  );
}
