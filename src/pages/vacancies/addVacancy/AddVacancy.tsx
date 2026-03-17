import { Box, styled, Typography } from "@mui/material";
import Headline from "./Headline";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../config/store";
import {
  addNewVacancy,
  resetFormStatus,
  selectAddVacancyError,
  selectAddVacancyStatus,
  type NewVacancyData,
} from "./addVacancySlice";
import { useForm } from "react-hook-form";
import Basic from "./Basic";
import Requirements from "./Requirements";
import Status from "./Status";
import Contact from "./Contact";
import { useEffect } from "react";
import { addToast } from "../../../features/toast/toastSlice";
import { useTranslation } from "react-i18next";

const AddVacancyWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const FormWrapper = styled("form")({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const Top = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: "5px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  minHeight: "350px",
}));

const Bottom = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: "5px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
  minHeight: "350px",
}));

const Success = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  paddingTop: "75px",
});

const SuccessMessage = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontStyle: "italic",
});

export default function AddVacancy() {
  const { register, getValues } = useForm<NewVacancyData>();
  const { t } = useTranslation("addVacancy");
  const status = useSelector(selectAddVacancyStatus);
  const error = useSelector(selectAddVacancyError);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resetFormStatus());
  }, [dispatch]);

  const onSave = () => {
    const data = getValues() as unknown;
    dispatch(addNewVacancy(data));
  };

  useEffect(() => {
    if (!error) return;
    dispatch(
      addToast({
        message: error,
        type: error === "MISMATCH" ? "warning" : "error",
        expireAt: 5000,
      }),
    );
  }, [error, dispatch]);

  return (
    <AddVacancyWrapper>
      {status !== "success" && (
        <>
          <Headline onSave={onSave} />
          <FormWrapper>
            <Top>
              <Basic register={register} />
              <Requirements register={register} />
            </Top>
            <Bottom>
              <Status register={register} />
              <Contact register={register} />
            </Bottom>
          </FormWrapper>
        </>
      )}
      {status === "success" && (
        <Success>
          <SuccessMessage
            variant="h4"
            color="success"
            aria-haspopup={true}
            aria-live="polite"
          >
            {t("success")}
          </SuccessMessage>
        </Success>
      )}
    </AddVacancyWrapper>
  );
}
