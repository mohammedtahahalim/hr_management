import type { UseFormRegister } from "react-hook-form";
import {
  Box,
  MenuItem,
  styled,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextField,
} from "@mui/material";
import type { NewVacancyData } from "./addVacancySlice";
import { useTranslation } from "react-i18next";

interface RequirementsProps {
  register: UseFormRegister<NewVacancyData>;
}

const RequirementsWrapper = styled(Box)({
  flex: 1,
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const BasicFormControl = styled(FormControl)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "25px",
});

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
  textTransform: "capitalize",
});

const Option = styled(MenuItem)({
  textTransform: "capitalize",
  fontFamily: "system-ui",
});

const Checkboxes = styled(FormGroup)({
  display: "flex",
  flexDirection: "row",
  gap: "5px",
  flexWrap: "wrap",
  flex: 1,
  maxWidth: "400px",
});

const Responsabilities = styled(TextField)({
  flex: 1,
  maxWidth: "400px",
  borderRadius: "8px",
  fontFamily: "system-ui",
});

const Duties = styled(TextField)({
  flex: 1,
  maxWidth: "400px",
  borderRadius: "8px",
  fontFamily: "system-ui",
});

export default function Requirements({ register }: RequirementsProps) {
  const { t } = useTranslation("vacancies");

  return (
    <RequirementsWrapper>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="workExp">
          {t("form.requirements.workExp.title")}
        </BasicFormLabel>
        <BasicFormSelect
          defaultValue="none"
          {...register("job.minWorkExp")}
          id="workExp"
        >
          <Option value="none">
            {t("form.requirements.workExp.values.none")}
          </Option>
          <Option value="junior">
            {t("form.requirements.workExp.values.junior")}
          </Option>
          <Option value="juniorPlus">
            {t("form.requirements.workExp.values.juniorPlus")}
          </Option>
          <Option value="mid">
            {t("form.requirements.workExp.values.mid")}
          </Option>
          <Option value="midPlus">
            {t("form.requirements.workExp.values.midPlus")}
          </Option>
          <Option value="senior">
            {t("form.requirements.workExp.values.senior")}
          </Option>
        </BasicFormSelect>
      </BasicFormControl>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="education">
          {t("form.requirements.education.title")}
        </BasicFormLabel>
        <BasicFormSelect
          defaultValue="none"
          {...register("job.minEducation")}
          id="education"
        >
          <Option value="none">
            {t("form.requirements.education.values.none")}
          </Option>
          <Option value="junior">
            {t("form.requirements.education.values.junior")}
          </Option>
          <Option value="juniorPlus">
            {t("form.requirements.education.values.juniorPlus")}
          </Option>
          <Option value="mid">
            {t("form.requirements.education.values.mid")}
          </Option>
          <Option value="midPlus">
            {t("form.requirements.education.values.midPlus")}
          </Option>
          <Option value="senior">
            {t("form.requirements.education.values.senior")}
          </Option>
        </BasicFormSelect>
      </BasicFormControl>
      <BasicFormControl>
        <BasicFormLabel htmlFor="suitable">
          {t("form.requirements.suitable.title")}
        </BasicFormLabel>
        <Checkboxes id="suitable">
          <FormControlLabel
            control={
              <Checkbox value={"student"} {...register("job.suitableFor")} />
            }
            label={t("form.requirements.suitable.student")}
            sx={{ textTransform: "capitalize" }}
          />
          <FormControlLabel
            control={
              <Checkbox value={"vet"} {...register("job.suitableFor")} />
            }
            label={t("form.requirements.suitable.veteran")}
            sx={{ textTransform: "capitalize" }}
          />
          <FormControlLabel
            control={
              <Checkbox value={"disabled"} {...register("job.suitableFor")} />
            }
            label={t("form.requirements.suitable.disabled")}
            sx={{ textTransform: "capitalize" }}
          />
        </Checkboxes>
      </BasicFormControl>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="job-resp">
          {t("form.requirements.resp")}
        </BasicFormLabel>
        <Responsabilities
          id="job-resp"
          multiline
          {...register("job.responsiblities")}
          minRows={3}
          sx={{ fontFamily: "system-ui" }}
        />
      </BasicFormControl>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="job-duties">
          {t("form.requirements.duties")}
        </BasicFormLabel>
        <Duties
          id="job-duties"
          multiline
          {...register("job.duties")}
          minRows={3}
          sx={{ fontFamily: "system-ui" }}
        />
      </BasicFormControl>
    </RequirementsWrapper>
  );
}
