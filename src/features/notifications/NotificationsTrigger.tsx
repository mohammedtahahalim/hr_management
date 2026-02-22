import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../config/store";
import { useEffect } from "react";
import {
  fetchNotifications,
  fetchNotificationsUnreadCount,
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
  const { unreadCount } = useSelector(
    (state: RootState) => state.notifications,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchNotificationsUnreadCount());
  }, [dispatch]);

  return (
    <NotificationsWrapper tabIndex={0}>
      {unreadCount !== 0 && <UnReadCount>{unreadCount}</UnReadCount>}
      <NotificationsIcon
        fontSize="medium"
        color="inherit"
        onClick={() => dispatch(fetchNotifications())}
      />
    </NotificationsWrapper>
  );
}
