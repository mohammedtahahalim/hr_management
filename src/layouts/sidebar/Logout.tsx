import { Box, Button, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { logout, selectLogoutStatus } from "../../features/auth/authSlice";

const LogoutWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const LogoutButton = styled(Button)(({ theme }) => ({
  width: "100%",
  maxWidth: "175px",
  borderRadius: "50px",
  padding: "6px 0px",
  textTransform: "capitalize",
  fontFamily: "system-ui",
  fontSize: "1rem",
  backgroundColor: theme.palette.fourth.light,
  color: "black",
}));

export default function Logout() {
  const dispatch = useDispatch<AppDispatch>();
  const logoutStatus = useSelector(selectLogoutStatus);
  const { t } = useTranslation("login");

  return (
    <LogoutWrapper>
      <LogoutButton
        variant="contained"
        disabled={logoutStatus === "loading"}
        onClick={() => dispatch(logout())}
      >
        {t("logout")}
      </LogoutButton>
    </LogoutWrapper>
  );
}
