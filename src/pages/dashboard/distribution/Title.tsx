import { styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const TitleWrapper = styled(Typography)(({ theme }) => ({
  alignSelf: "center",
  maxWidth: "75%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textTransform: "capitalize",
  [theme.breakpoints.down("sm")]: {
    alignSelf: "flex-start",
    maxWidth: "100%",
  },
  fontWeight: "bold",
  fontFamily: "system-ui",
}));

export default function Title() {
  const { t } = useTranslation("dashboard");

  return <TitleWrapper>{t("distributions.title")}</TitleWrapper>;
}
