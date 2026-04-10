import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { useEffect } from "react";
import {
  fetchNotifications,
  selectNotificationUnread,
} from "./notificationSlice";

const NotificationsWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.icon.main,
  cursor: "pointer",
  position: "relative",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const UnReadCount = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  right: "12px",
  width: "12px",
  height: "12px",
  backgroundColor: theme.palette.warning.main,
  overflow: "hidden",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "0.6rem",
  fontFamily: "system-ui",
  fontWeight: "bold",
  color: "black",
}));

export default function NotificationsTrigger() {
  const unread = useSelector(selectNotificationUnread);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const notificationRequest = dispatch(fetchNotifications());
    return () => {
      notificationRequest.abort();
    };
  }, [dispatch]);

  return (
    <NotificationsWrapper tabIndex={0}>
      {unread !== 0 && <UnReadCount>{unread}</UnReadCount>}
      <NotificationsIcon fontSize="medium" color="inherit" />
    </NotificationsWrapper>
  );
}
