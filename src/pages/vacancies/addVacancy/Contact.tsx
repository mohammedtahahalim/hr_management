import type { UseFormRegister } from "react-hook-form";
import {
  Box,
  styled,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import type { NewVacancyData } from "./addVacancySlice";
import { useTranslation } from "react-i18next";

interface ContactProps {
  register: UseFormRegister<NewVacancyData>;
}

const ContactWrapper = styled(Box)({
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

export default function Contact({ register }: ContactProps) {
  const { t } = useTranslation("addVacancy");
  return (
    <ContactWrapper>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="hirer-name">
          {t("form.contact.person")}
        </BasicFormLabel>
        <BasicFormInput {...register("hirer.name")} id="hirer-name" />
      </BasicFormControl>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="hirer-phone">
          {t("form.contact.phone")}
        </BasicFormLabel>
        <BasicFormInput
          type="phone"
          {...register("hirer.phone")}
          id="hirer-phone"
        />
      </BasicFormControl>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="additional-contact">
          {t("form.contact.additional")}
        </BasicFormLabel>
        <BasicFormInput
          {...register("hirer.additional")}
          id="additional-contact"
        />
      </BasicFormControl>
      <BasicFormControl size="small">
        <BasicFormLabel htmlFor="show-info">
          {t("form.contact.show")}
        </BasicFormLabel>
        <FormControlLabel
          control={<Checkbox />}
          label={t("form.contact.showLarge")}
          sx={{
            flex: 1,
            maxWidth: "400px",
            marginRight: "12px",
          }}
          id="show-info"
        />
      </BasicFormControl>
    </ContactWrapper>
  );
}
