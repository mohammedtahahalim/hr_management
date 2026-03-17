import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
  TextField,
} from "@mui/material";
import type { UseFormRegister } from "react-hook-form";
import type { NewVacancyData } from "./addVacancySlice";
import { useTranslation } from "react-i18next";
import { depts } from "../../../shared/lib/constants";

interface BasicProps {
  register: UseFormRegister<NewVacancyData>;
}

const BasicWrapper = styled(Box)({
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

const BasicFormInput = styled(OutlinedInput)({
  flex: 1,
  maxWidth: "400px",
  borderRadius: "8px",
  fontFamily: "system-ui",
});

const BasicFormSelect = styled(Select)({
  flex: 1,
  maxWidth: "400px",
  borderRadius: "8px",
  fontFamily: "system-ui",
});

const Description = styled(TextField)({
  flex: 1,
  maxWidth: "400px",
  borderRadius: "8px",
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

const Multiple = styled(FormControl)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "25px",
});

export default function Basic({ register }: BasicProps) {
  const { t } = useTranslation("addVacancy");

  return (
    <BasicWrapper>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="job-title">
          {t("form.basic.title")}
        </BasicFormLabel>
        <BasicFormInput
          id="job-title"
          label="Job Title"
          {...register("job.title")}
        />
      </BasicFormControl>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="job-dept">
          {t("form.basic.depts.title")}
        </BasicFormLabel>
        <BasicFormSelect {...register("job.dept")} defaultValue={"frontend"}>
          {depts.map((d) => {
            return (
              <MenuItem value={d} key={d} sx={{ fontFamily: "system-ui" }}>
                {t(`form.basic.depts.values.${d}`)}
              </MenuItem>
            );
          })}
        </BasicFormSelect>
      </BasicFormControl>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="job-desc">
          {t("form.basic.desc")}
        </BasicFormLabel>
        <Description
          id="job-desc"
          multiline
          {...register("job.desc")}
          minRows={3}
          sx={{ fontFamily: "system-ui" }}
        />
      </BasicFormControl>
      <BasicFormControl>
        <BasicFormLabel htmlFor="empType">
          {t("form.basic.empType")}
        </BasicFormLabel>
        <Checkboxes id="empType">
          <FormControlLabel
            control={<Checkbox {...register("job.empType")} value={"f"} />}
            label={t("form.basic.full")}
          />
          <FormControlLabel
            control={<Checkbox value={"p"} {...register("job.empType")} />}
            label={t("form.basic.part")}
          />
          <FormControlLabel
            control={<Checkbox {...register("job.empType")} value={"c"} />}
            label={t("form.basic.contract")}
          />
          <FormControlLabel
            control={<Checkbox {...register("job.empType")} value={"fl"} />}
            label={t("form.basic.freelance")}
          />
        </Checkboxes>
      </BasicFormControl>
      <BasicFormControl>
        <BasicFormLabel>{t("form.basic.loc")}</BasicFormLabel>
        <BasicFormSelect
          {...register("job.location")}
          defaultValue={"jp"}
          size="small"
        >
          <MenuItem value={"jp"}>{t("form.basic.jp")}</MenuItem>
          <MenuItem value={"us"}>{t("form.basic.us")}</MenuItem>
          <MenuItem value={"fr"}>{t("form.basic.fr")}</MenuItem>
          <MenuItem value={"ma"}>{t("form.basic.ma")}</MenuItem>
          <MenuItem value={"uk"}>{t("form.basic.uk")}</MenuItem>
          <MenuItem value={"r"}>{t("form.basic.r")}</MenuItem>
        </BasicFormSelect>
      </BasicFormControl>
      <Multiple>
        <BasicFormLabel>{t("form.basic.multiple")}</BasicFormLabel>
        <FormControlLabel
          control={<Checkbox {...register("job.multiple")} />}
          label={t("form.basic.yesMultiple")}
          sx={{
            flex: 1,
            maxWidth: "400px",
            marginRight: "12px",
          }}
        />
      </Multiple>
    </BasicWrapper>
  );
}
