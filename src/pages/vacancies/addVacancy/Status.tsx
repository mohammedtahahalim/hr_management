import type { UseFormRegister } from "react-hook-form";
import {
  Box,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import type { NewVacancyData } from "./addVacancySlice";
import { useTranslation } from "react-i18next";

interface StatusProps {
  register: UseFormRegister<NewVacancyData>;
}

const StatusWrapper = styled(Box)({
  flex: 1,
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const BasicFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "25px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "5px",
  },
}));

const BasicFormLabel = styled(InputLabel)({
  position: "static",
  transform: "none",
  fontFamily: "system-ui",
  fontWeight: "bold",
});

const BasicFormSelect = styled(Select)({
  flex: 1,
  maxWidth: "400px",
  borderRadius: "8px",
  fontFamily: "system-ui",
});

const DatesControl = styled(Box)({
  flex: 1,
  maxWidth: "400px",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "10px",
});

export default function Status({ register }: StatusProps) {
  const { t } = useTranslation("addVacancy");
  return (
    <StatusWrapper>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="vacancy-status">
          {t("form.status.vacancy")}
        </BasicFormLabel>
        <BasicFormSelect
          defaultValue={"open"}
          {...register("job.status")}
          id="vacancy-status"
        >
          <MenuItem value="open">{t("form.status.values.open")}</MenuItem>
          <MenuItem value="completed">
            {t("form.status.values.completed")}
          </MenuItem>
          <MenuItem value="inprogress">
            {t("form.status.values.inprogress")}
          </MenuItem>
        </BasicFormSelect>
      </BasicFormControl>
      <BasicFormControl>
        <BasicFormLabel htmlFor="openClose">
          {t("form.status.openClose")}
        </BasicFormLabel>
        <DatesControl id="openClose">
          <TextField
            type="date"
            {...register("job.openDate")}
            size="small"
            sx={{ maxWidth: "175px" }}
          />
          <TextField
            type="date"
            {...register("job.closeDate")}
            size="small"
            sx={{ maxWidth: "175px" }}
          />
        </DatesControl>
      </BasicFormControl>
    </StatusWrapper>
  );
}
