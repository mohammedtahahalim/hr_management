import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import type { RootState } from "../../config/store";
import { LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../themes/ThemeContext";

const NotificatioWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  overflowY: "scroll",
  scrollbarWidth: "none",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.divider,
  borderRadius: "8px",
  maxWidth: "275px",
  maxHeight: "300px",
}));

const NotificationNavElement = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "isRead" && prop !== "isLight",
})<{ isRead: boolean; isLight: boolean }>(({ theme, isRead, isLight }) => ({
  width: "225px",
  minHeight: "40px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  padding: "8px 12px",
  textDecoration: "none",
  borderBottom: `1px solid ${theme.palette.background.default}`,
  color: "inherit",
  gap: "8px",
  display: "flex",
  alignItems: "center",
  fontFamily: "system-ui",
  fontSize: "0.8rem",
  transition: "all 0.2s ease-in-out",
  "&:last-child": {
    border: "none",
  },
  "&:hover": {
    backgroundColor: theme.palette.icon.main,
  },
  backgroundColor: isRead
    ? isLight
      ? theme.palette.warning.main
      : theme.palette.error.main
    : "transparent",
}));

const Loader = styled(Box)(({ theme }) => ({
  minWidth: "175px",
  minHeight: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.icon.main,
  "& > *": {
    width: "80%",
    height: "8px",
  },
}));

const NotificationText = styled("span")({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minWidth: 0,
  flex: 1,
});

const Failure = styled(Typography)({
  padding: "10px 20px",
  fontFamily: "system-ui",
  fontStyle: "italic",
  minWidth: "250px",
});

export default function Notifications() {
  const { status, notifications, error } = useSelector(
    (state: RootState) => state.notifications,
  );
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);

  return (
    <NotificatioWrapper>
      {status === "loading" && (
        <Loader>
          <LinearProgress color="inherit" />
        </Loader>
      )}
      {status === "failure" && (
        <Failure variant="body1">{t(`notifications.${error}`)}</Failure>
      )}
      {status === "succeeded" &&
        notifications.map((n) => {
          return (
            <NotificationNavElement
              to={`/notifications/${n.id}`}
              key={n.id}
              isRead={n.read}
              isLight={currentTheme === "light"}
            >
              <NotificationText>{n.title}</NotificationText>
            </NotificationNavElement>
          );
        })}
      {status === "succeeded" && notifications.length === 0 && (
        <div>nothing to show</div>
      )}
    </NotificatioWrapper>
  );
}
