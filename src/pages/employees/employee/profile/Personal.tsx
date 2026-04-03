import { Box, styled, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useCanEdit from "../useCanEdit";
import Title from "../../../../shared/ui/Title";
import { useEmployeeForm } from "../EmployeeFormContext";
import {
  fetchEmployee,
  selectEmployeeError,
  selectEmployeePrivateInfo,
  selectEmployeeStatus,
} from "../employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../shared/lib/helpers";
import type { TLanguage } from "../../../../config/i18n";
import type { AppDispatch } from "../../../../config/store";
import { useParams } from "react-router-dom";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import Reload from "../../../../shared/ui/Reload";

const PersonalWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const InputControl = styled(Box)(({ theme }) => ({
  width: "100%",
  flex: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  "&:not(last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Label = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
  fontSize: "0.9rem",
});

const Input = styled(TextField)({
  height: "100%",
  maxWidth: "150px",
  fontFamily: "system-ui",
  textTransform: "capitalize",
});

export default function Personal() {
  const { t, i18n } = useTranslation("employee");
  const lang = i18n.language as TLanguage;
  const status = useSelector(selectEmployeeStatus);
  const isLoading = status === "loading";
  const error = useSelector(selectEmployeeError);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { canEdit } = useCanEdit();
  const register = useEmployeeForm();
  const personalInfo = useSelector(selectEmployeePrivateInfo);

  const dispatchFunc = () => {
    dispatch(fetchEmployee({ id: id ?? "1" }));
  };

  return (
    <PersonalWrapper>
      <WithSkeleton loading={isLoading} sx={{ borderRadius: "12px" }}>
        {status === "success" && (
          <>
            <Title variant="subtitle1" ender={false}>
              {t("personal.title")}
            </Title>
            <InputControl>
              <Label>{t("personal.inputs.passport")}</Label>
              <Input
                size="small"
                disabled={!canEdit}
                {...register("passport")}
                defaultValue={personalInfo?.passport}
                variant="standard"
              ></Input>
            </InputControl>
            <InputControl>
              <Label>{t("personal.inputs.passportExp")}</Label>
              <Input
                size="small"
                disabled={!canEdit}
                {...register("passportExp")}
                defaultValue={
                  personalInfo && formatDate(personalInfo?.passportExp, lang)
                }
                variant="standard"
              ></Input>
            </InputControl>
            <InputControl>
              <Label>{t("personal.inputs.phoneNumber")}</Label>
              <Input
                size="small"
                disabled={!canEdit}
                {...register("phoneNumber")}
                defaultValue={personalInfo?.phoneNumber}
                variant="standard"
              ></Input>
            </InputControl>
            <InputControl>
              <Label>{t("personal.inputs.birthDate")}</Label>
              <Input
                size="small"
                disabled={!canEdit}
                {...register("birthDate")}
                defaultValue={
                  personalInfo && formatDate(personalInfo?.birthDate, lang)
                }
                variant="standard"
              ></Input>
            </InputControl>
            <InputControl>
              <Label>{t("personal.inputs.marital.title")}</Label>
              <Input
                size="small"
                disabled={!canEdit}
                {...register("marital")}
                defaultValue={
                  personalInfo?.marital &&
                  t(`personal.inputs.marital.${personalInfo?.marital}`)
                }
                variant="standard"
              ></Input>
            </InputControl>
          </>
        )}
        {status === "failure" && (
          <Reload error={error} dispatchThunk={dispatchFunc} />
        )}
      </WithSkeleton>
    </PersonalWrapper>
  );
}
