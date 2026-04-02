import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEmployeeForm } from "../EmployeeFormContext";
import { useLocation } from "react-router-dom";
import type { Mode } from "../../../../shared/lib/types";
import { useContext } from "react";
import { AuthContext } from "../../../../features/auth/AuthContext";

const PersonalWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  border: "1px solid white",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
});

export default function Personal() {
  const { t } = useTranslation("employee");
  const register = useEmployeeForm();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const mode = (params.get("mode") ?? "view") as Mode;
  const whoIs = useContext(AuthContext);

  return <PersonalWrapper>Personal</PersonalWrapper>;
}
