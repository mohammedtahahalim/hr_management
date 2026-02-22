import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, styled } from "@mui/material";

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
}));

export default function NotificationsTrigger() {
  return (
    <NotificationsWrapper tabIndex={0}>
      <UnReadCount>5</UnReadCount>
      <NotificationsIcon fontSize="medium" color="inherit" />
    </NotificationsWrapper>
  );
}
