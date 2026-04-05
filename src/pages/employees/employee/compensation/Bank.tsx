import { Box, FormLabel, styled, TextField } from "@mui/material";
import Title from "../../../../shared/ui/Title";
import { useTranslation } from "react-i18next";
import { useEmployeeForm } from "../EmployeeFormContext";
import { useSelector } from "react-redux";
import { selectEmployeePayRollInfo } from "../employeeSlice";
import useCanEdit from "../useCanEdit";
import WaitEmployeeMode from "../WaitEmployeeMode";

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
  const register = useEmployeeForm();
  const { canEdit } = useCanEdit();
  const { bankAcc, ifscCode, panNb } =
    useSelector(selectEmployeePayRollInfo) ?? {};

  return (
    <BankWrapper>
      <WaitEmployeeMode>
        <>
          <Title ender={false}>{t("bank.title")}</Title>
          <BankBox>
            <Label htmlFor="bankAcc">{t("bank.bankAcc")}</Label>
            <Input
              type="text"
              variant="standard"
              size="small"
              disabled={!canEdit}
              {...register("bankAcc")}
              defaultValue={bankAcc}
              id="bankAcc"
            />
          </BankBox>
          <BankBox>
            <Label htmlFor="ifscCode">{t("bank.ifscCode")}</Label>
            <Input
              type="text"
              variant="standard"
              size="small"
              disabled={!canEdit}
              {...register("ifscCode")}
              defaultValue={ifscCode}
              id="ifscCode"
            />
          </BankBox>
          <BankBox>
            <Label htmlFor="panNb">{t("bank.panNb")}</Label>
            <Input
              type="text"
              variant="standard"
              size="small"
              disabled={!canEdit}
              {...register("panNb")}
              defaultValue={panNb}
              id="panNb"
            />
          </BankBox>
        </>
      </WaitEmployeeMode>
    </BankWrapper>
  );
}
