import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectOverviewActivity } from "./overviewSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../config/i18n";
import Title from "../../shared/ui/Title";
import type { PositionColor } from "../../shared/lib/types";
import { randomFrom } from "../../shared/lib/constants";
import WaitMode from "./WaitMode";

const colors: PositionColor[] = ["first", "fourth", "second", "third"];

const ActivityWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "10px",
  overflowX: "hidden",
  overflowY: "scroll",
  scrollbarWidth: "none",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const EventWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  width: "100%",
  minHeight: "75px",
  borderRadius: "12px",
  overflow: "hidden",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  padding: "10px 5px",
  backgroundColor: theme.palette[posColor].light,
  color: "black",
}));

const Time = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  fontFamily: "system-ui",
  fontWeight: "bold",
  padding: "10px",
  position: "relative",
  "&::after": {
    content: "''",
    position: "absolute",
    top: "0",
    right: "0",
    height: "100%",
    width: "3px",
    borderRadius: "50px",
    backgroundColor: theme.palette[posColor].main,
  },
}));

const Content = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  justifyContent: "center",
});

const Location = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
});

const Event = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "system-ui",
});

export default function Activity() {
  const { t, i18n } = useTranslation("overview");
  const lang = i18n.language as TLanguage;
  const activities = useSelector(selectOverviewActivity) ?? [];

  return (
    <ActivityWrapper>
      <WaitMode>
        <Title ender={false}>{t("activities.title")}</Title>
        {activities.map((a) => {
          const random = randomFrom(colors);
          return (
            <EventWrapper key={`${a.time}${a.event[lang]}`} posColor={random}>
              <Time variant="h6" posColor={random}>
                {a.time}
              </Time>
              <Content>
                <Location>{t(`activities.locations.${a.location}`)}</Location>
                <Event>{a.event[lang]}</Event>
              </Content>
            </EventWrapper>
          );
        })}
      </WaitMode>
    </ActivityWrapper>
  );
}
