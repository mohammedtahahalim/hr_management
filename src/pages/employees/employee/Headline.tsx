import { Box, Button, IconButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectEditEmployeeStatus, selectEmployeeName } from "./employeeSlice";
import Title from "../../../shared/ui/Title";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../config/i18n";
import WestIcon from "@mui/icons-material/West";

interface HeadlineProps {
  handleEdit: () => void;
}

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "5px",
  },
}));

const TitleWrapper = styled(Box)({
  display: "flex",
  gap: "5px",
  alignItems: "center",
});

const EditMode = styled(Box)({
  display: "flex",
  gap: "10px",
});

const CustomButton = styled(Button)({
  padding: "5px 35px",
  borderRadius: "50px",
  fontFamily: "system-ui",
  textTransform: "capitalize",
});

export default function Headline({ handleEdit }: HeadlineProps) {
  const { t, i18n } = useTranslation("employee");
  const lang = i18n.language as TLanguage;
  const { search, pathname } = useLocation();
  const params = new URLSearchParams(search);
  const mode = params.get("mode") ?? "view";
  const navigate = useNavigate();
  const name = useSelector(selectEmployeeName);
  const editStatus = useSelector(selectEditEmployeeStatus);
  const isEditLoading = editStatus === "loading";

  const onNavigate = (mode: "edit" | "view") => {
    params.set("mode", mode);
    navigate({
      pathname,
      search: `${params.toString()}`,
    });
  };

  return (
    <HeadlineWrapper>
      <TitleWrapper>
        <IconButton aria-label={t("headline.goBack")}>
          <WestIcon
            fontSize="medium"
            color="primary"
            onClick={() => navigate(-1)}
          />
        </IconButton>
        <Title variant="h6" ender={false}>
          {name ? name[lang] : ""}
        </Title>
      </TitleWrapper>
      <EditMode>
        {mode === "edit" ? (
          <>
            <CustomButton
              variant="outlined"
              color="primary"
              onClick={() => onNavigate("view")}
              disabled={isEditLoading}
            >
              {t("headline.cancel")}
            </CustomButton>
            <CustomButton
              variant="contained"
              color="primary"
              onClick={() => handleEdit()}
              disabled={isEditLoading}
            >
              {t("headline.save")}
            </CustomButton>
          </>
        ) : (
          <CustomButton
            variant="contained"
            color="primary"
            onClick={() => onNavigate("edit")}
            disabled={isEditLoading}
          >
            {t("headline.edit")}
          </CustomButton>
        )}
      </EditMode>
    </HeadlineWrapper>
  );
}
