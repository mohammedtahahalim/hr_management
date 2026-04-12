import { Box, Button, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { Navigate } from "react-router-dom";
import {
  selectLogoutError,
  selectLogoutStatus,
  sendLogoutRequest,
} from "../../features/auth/logoutSlice";
import { useEffect } from "react";
import { addToast } from "../../features/toast/toastSlice";

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
  const status = useSelector(selectLogoutStatus);
  const error = useSelector(selectLogoutError);
  const { t } = useTranslation("login");

  useEffect(() => {
    if (!error) return;
    dispatch(addToast({ type: "error", message: error }));
  }, [error, dispatch]);

  if (status === "success") return <Navigate to={"/login"} replace />;

  return (
    <LogoutWrapper>
      <LogoutButton
        variant="contained"
        disabled={status === "loading"}
        onClick={() => dispatch(sendLogoutRequest())}
      >
        {t("logout")}
      </LogoutButton>
    </LogoutWrapper>
  );
}
