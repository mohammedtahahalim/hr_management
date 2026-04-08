import { Box, Button, styled, Typography, type SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { Reject } from "../lib/types";

interface ReloadProps {
  dispatchThunk: (_args: unknown) => void;
  error: Reject | null;
  sx?: SxProps;
}

const ReloadWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  border: `1px solid ${theme.palette.divider}`,
  padding: "10px",
}));

const Error = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.85rem",
});

const Refetch = styled(Button)({
  textTransform: "capitalize",
});

const Reload = ({ dispatchThunk, error, sx = {} }: ReloadProps) => {
  const { t } = useTranslation("dashboard");
  const errorMessage = t(`errors.${error}`);

  return (
    <ReloadWrapper
      aria-live="polite"
      aria-describedby="error-message"
      sx={{ ...sx }}
    >
      <Error id="error-message" color="error">
        {errorMessage}
      </Error>
      <Refetch onClick={dispatchThunk} color="primary" variant="contained">
        {t("refetch")}
      </Refetch>
    </ReloadWrapper>
  );
};

export default Reload;
