import SettingsIcon from "@mui/icons-material/Settings";
import { Box, styled } from "@mui/material";

const SettingsWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.icon.main,
  cursor: "pointer",
  position: "relative",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function Settings() {
  return (
    <SettingsWrapper tabIndex={0}>
      <SettingsIcon fontSize="medium" color="inherit" />
    </SettingsWrapper>
  );
}
