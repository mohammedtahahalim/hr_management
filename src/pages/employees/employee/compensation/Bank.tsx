import { Box, FormLabel, styled, TextField } from "@mui/material";
import Title from "../../../../shared/ui/Title";
import { useTranslation } from "react-i18next";
import { useEmployeeForm } from "../EmployeeFormContext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployee,
  selectEmployeeError,
  selectEmployeePayRollInfo,
  selectEmployeeStatus,
} from "../employeeSlice";
import { useParams } from "react-router-dom";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import type { AppDispatch } from "../../../../config/store";
import Reload from "../../../../shared/ui/Reload";
import useCanEdit from "../useCanEdit";

const BankWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflow: "hidden",
});

const BankBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "55px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "&:not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Label = styled(FormLabel)({
  fontFamily: "system-ui",
  fontSize: "0.9rem",

  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const Input = styled(TextField)({
  fontFamily: "system-ui",
});

export default function Bank() {
  const { t } = useTranslation("employee");
  const status = useSelector(selectEmployeeStatus);
  const isLoading = status === "loading";
  const error = useSelector(selectEmployeeError);
  const dispatch = useDispatch<AppDispatch>();
  const register = useEmployeeForm();
  const { id } = useParams();
  const { canEdit } = useCanEdit();
  const { bankAcc, ifscCode, panNb } =
    useSelector(selectEmployeePayRollInfo) ?? {};

  const dispatchThunk = () => {
    dispatch(fetchEmployee({ id: id ?? "1" }));
  };

  return (
    <BankWrapper>
      <WithSkeleton loading={isLoading} sx={{ borderRadius: "12px" }}>
        {status === "success" && (
          <>
            <Title ender={false}>{t("bank.title")}</Title>
            <BankBox>
              <Label>{t("bank.bankAcc")}</Label>
              <Input
                type="text"
                variant="standard"
                size="small"
                disabled={!canEdit}
                {...register("bankAcc")}
                defaultValue={bankAcc}
              />
            </BankBox>
            <BankBox>
              <Label>{t("bank.ifscCode")}</Label>
              <Input
                type="text"
                variant="standard"
                size="small"
                disabled={!canEdit}
                {...register("ifscCode")}
                defaultValue={ifscCode}
              />
            </BankBox>
            <BankBox>
              <Label>{t("bank.panNb")}</Label>
              <Input
                type="text"
                variant="standard"
                size="small"
                disabled={!canEdit}
                {...register("panNb")}
                defaultValue={panNb}
              />
            </BankBox>
          </>
        )}
        {status === "failure" && (
          <Reload error={error} dispatchThunk={dispatchThunk} />
        )}
      </WithSkeleton>
    </BankWrapper>
  );
}
