import { Box, Button, styled } from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { checkAuth } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";

type Status = "idle" | "submitting" | "failure" | "success";

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
  const [submitStatus, setSubmitStatus] = useState<Status>("idle");
  const dispatch = useDispatch<AppDispatch>();
  const controller = useRef<AbortController | null>(new AbortController());
  const { t } = useTranslation("login");

  // TODO: refactor
  const handleLogout = async () => {
    setSubmitStatus("submitting");
    try {
      const fullURL: string = `${import.meta.env.VITE_API_URL}/api/logout`;
      const fullOptions: RequestInit = {
        method: "POST",
        credentials: "include",
        signal: controller.current?.signal,
      };
      const response = await fetch(fullURL, fullOptions);
      if (!response.ok) throw new Error(response.status.toString());
      dispatch(checkAuth());
      <Navigate to={"/login"} />;
      setSubmitStatus("success");
    } catch (err) {
      console.log(err);
      setSubmitStatus("failure");
    }
  };

  return (
    <LogoutWrapper>
      <LogoutButton
        variant="contained"
        disabled={submitStatus === "submitting"}
        onClick={handleLogout}
      >
        {t("logout")}
      </LogoutButton>
    </LogoutWrapper>
  );
}
