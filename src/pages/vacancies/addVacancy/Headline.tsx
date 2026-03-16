import { memo } from "react";
import { Box, Button, styled } from "@mui/material";
import Title from "../../../shared/ui/Title";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAddVacancyStatus } from "./addVacancySlice";

interface HeadlineProps {
  onSave: () => void;
}

const HeadlineWrapper = styled(Box)({
  width: "100%",
  height: "fit-content",
  minHeight: "75px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
});

const Control = styled(Box)({
  flex: 1,
  height: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "8px",
});

const ControlButton = styled(Button)({
  borderRadius: "50px",
  textTransform: "capitalize",
  minWidth: "100px",
});

const Headline = memo(({ onSave }: HeadlineProps) => {
  const { t } = useTranslation("addVacancy");
  const navigate = useNavigate();
  const status = useSelector(selectAddVacancyStatus);

  return (
    <HeadlineWrapper>
      <Title>{t("title")}</Title>
      <Control>
        <ControlButton
          variant="outlined"
          color="primary"
          startIcon={<CloseIcon fontSize="small" />}
          onClick={() => navigate("/vacancies")}
        >
          {t("cancel")}
        </ControlButton>
        <ControlButton
          variant="contained"
          color="primary"
          startIcon={<SaveIcon fontSize="small" />}
          disabled={status === "loading"}
          onClick={onSave}
        >
          {status === "loading" ? t("loading") : t("save")}
        </ControlButton>
      </Control>
    </HeadlineWrapper>
  );
});

export default Headline;
