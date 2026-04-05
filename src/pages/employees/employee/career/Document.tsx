import { Box, styled, Typography } from "@mui/material";
import Title from "../../../../shared/ui/Title";
import { useTranslation } from "react-i18next";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import type { PositionColor } from "../../../../shared/lib/types";
import ArticleIcon from "@mui/icons-material/Article";
import WaitEmployeeMode from "../WaitEmployeeMode";

const DocumentWrapper = styled(Box)(({ theme }) => ({
  minWidth: "325px",
  height: "100%",
  maxHeight: "255px",
  overflowX: "hidden",
  overflowY: "scroll",
  scrollbarWidth: "none",
  padding: "5px 15px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const DocumentBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  flex: 1,
  minHeight: "55px",
  cursor: "pointer",
  borderRadius: "10px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  padding: "0px 10px",
  backgroundColor: theme.palette[posColor].main,
  fontFamily: "system-ui",
  fontSize: "1rem",
  transition: "all 0.1s ease-in-out",
  "&:hover": {
    opacity: "0.8",
  },
  color: "whitesmoke",
  textTransform: "capitalize",
}));

export default function Document() {
  const { t } = useTranslation("employee");

  return (
    <WaitEmployeeMode>
      <DocumentWrapper>
        <Title ender={false}>{t("document.title")}</Title>
        <DocumentBox posColor="first">
          <PictureAsPdfIcon fontSize="small" />
          <Typography fontFamily={"inherit"} fontSize={"inherit"}>
            {t("document.contract")}
          </Typography>
        </DocumentBox>
        <DocumentBox posColor="fourth">
          <ArticleIcon fontSize="small" />
          <Typography fontFamily={"inherit"} fontSize={"inherit"}>
            {t("document.resume")}
          </Typography>
        </DocumentBox>
        <DocumentBox posColor="third">
          <PictureAsPdfIcon fontSize="small" />
          <Typography fontFamily={"inherit"} fontSize={"inherit"}>
            {t("document.personal")}
          </Typography>
        </DocumentBox>
      </DocumentWrapper>
    </WaitEmployeeMode>
  );
}
