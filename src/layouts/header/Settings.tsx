import SettingsIcon from "@mui/icons-material/Settings";
import { Box, styled } from "@mui/material";

const SettingsWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.icon.main,
  cursor: "pointer",
}));

export default function Settings() {
  return (
    <SettingsWrapper tabIndex={0}>
      <SettingsIcon fontSize="medium" color="inherit" />
    </SettingsWrapper>
  );
}
