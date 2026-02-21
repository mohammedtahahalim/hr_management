import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, styled } from "@mui/material";

const NotificationsWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.icon.main,
  cursor: "pointer",
  position: "relative",
}));

const UnReadCount = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  right: "12px",
  width: "12px",
  height: "12px",
  backgroundColor: theme.palette.info.main,
  overflow: "hidden",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "0.8rem",
}));

export default function Notifications() {
  return (
    <NotificationsWrapper>
      <UnReadCount>u</UnReadCount>
      <NotificationsIcon fontSize="medium" color="inherit" />
    </NotificationsWrapper>
  );
}
