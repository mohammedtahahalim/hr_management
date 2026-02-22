import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import type { RootState } from "../../config/store";
import { LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

const NotificatioWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "25px",
  minWidth: "175px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.divider,
  borderRadius: "8px",
  overflow: "hidden",
}));

const NotificationNavElement = styled(NavLink)(({ theme }) => ({
  width: "100%",
  minWidth: "175px",
  padding: "9px 15px",
  textDecoration: "none",
  borderBottom: `1px solid ${theme.palette.background.default}`,
  color: "inherit",
  display: "flex",
  gap: "8px",
  alignItems: "center",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  transition: "all 0.2s ease-in-out",
  "&:last-child": {
    border: "none",
  },
  "&:hover": {
    backgroundColor: theme.palette.icon.main,
  },
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
            <NotificationNavElement to={"/"} key={n.title}>
              {n.title}
            </NotificationNavElement>
          );
        })}
      {status === "succeeded" && notifications.length === 0 && (
        <div>nothing to show</div>
      )}
    </NotificatioWrapper>
  );
}
