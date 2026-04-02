import { Box, Button, styled } from "@mui/material";
import Description from "./Description";
import Activity from "./Activity";
import { useContext, useState } from "react";
import Title from "../../../../shared/ui/Title";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import SaveIcon from "@mui/icons-material/Save";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../../features/auth/AuthContext";
import { canAccess } from "../../../../shared/lib/permissions";

const JobInfoWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  padding: "10px",
  minHeight: "500px",
});

const DescriptionWrapper = styled(Box)(({ theme }) => ({
  flex: 2,
  minWidth: "450px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  [theme.breakpoints.down("sm")]: {
    minWidth: "100%",
  },
}));

const ActivityWrapper = styled(Box)({
  flex: 1,
  minWidth: "325px",
});

const DescriptionControl = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "5px 15px",
});

const Enable = styled(Button)({
  minWidth: "0",
  textTransform: "capitalize",
});

export default function JobInfo() {
  const [onEditMode, setOnEditMode] = useState<boolean>(false);
  const { register } = useForm<{ id: string }>();
  const { t } = useTranslation("vacancy");
  const { whoIs } = useContext(AuthContext);
  const role = whoIs?.role ?? "candidat";

  return (
    <JobInfoWrapper>
      <DescriptionWrapper>
        <DescriptionControl>
          <Title variant="h6" ender={false}>
            {t("description")}
          </Title>
          <Enable
            startIcon={
              onEditMode ? (
                <SaveIcon fontSize="small" />
              ) : (
                <EditAttributesIcon fontSize="small" />
              )
            }
            onClick={() => setOnEditMode((onEditMode) => !onEditMode)}
            disabled={!canAccess(role, "UPDATE", "vacancy")}
          >
            {onEditMode ? t("saveChanges") : t("editVacancy")}
          </Enable>
        </DescriptionControl>
        <Description onEditMode={onEditMode} register={register} />
      </DescriptionWrapper>
      <ActivityWrapper>
        <Activity />
      </ActivityWrapper>
    </JobInfoWrapper>
  );
}
