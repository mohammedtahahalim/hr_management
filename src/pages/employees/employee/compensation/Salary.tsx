import {
  Box,
  FormLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectEmployeePayRollInfo } from "../employeeSlice";
import Title from "../../../../shared/ui/Title";
import { useEmployeeForm } from "../EmployeeFormContext";
import useCanEdit from "../useCanEdit";
import { formatDate } from "../../../../shared/lib/helpers";
import type { TLanguage } from "../../../../config/i18n";
import WaitEmployeeMode from "../WaitEmployeeMode";

const SalaryWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  borderRadius: "12px",
  padding: "5px",
});

const SalaryBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "40px",
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
  textTransform: "capitalize",
  textAlign: "right",
});

export default function Salary() {
  const { t, i18n } = useTranslation("employee");
  const lang = i18n.language as TLanguage;
  const { salaryBasis, salaryAmount, lastPayout, payoutType, billRate } =
    useSelector(selectEmployeePayRollInfo) ?? {};
  const register = useEmployeeForm();
  const { canEdit } = useCanEdit();

  return (
    <WaitEmployeeMode>
      <SalaryWrapper>
        <Title ender={false}>{t("salary.title")}</Title>
        <SalaryBox>
          <Label htmlFor="salaryBasis">{t("salary.basis.title")}</Label>
          <Select
            type="text"
            variant="standard"
            size="small"
            disabled={!canEdit}
            {...register("salaryBasis")}
            defaultValue={salaryBasis}
            sx={{ textTransform: "capitalize" }}
            renderValue={(value: string) => {
              return t(`salary.basis.${value}`);
            }}
            id="salaryBasis"
          >
            <MenuItem value="hour">hour</MenuItem>
            <MenuItem value="day">day</MenuItem>
            <MenuItem value="week">week</MenuItem>
            <MenuItem value="month">month</MenuItem>
            <MenuItem value="year">year</MenuItem>
          </Select>
        </SalaryBox>
        <SalaryBox>
          <Label htmlFor="salaryAmount">{t("salary.salaryAmount")}</Label>
          <Input
            type="text"
            variant="standard"
            size="small"
            disabled={!canEdit}
            {...register("salaryAmount")}
            defaultValue={salaryAmount + "$"}
            id="salaryAmount"
          />
        </SalaryBox>
        <SalaryBox>
          <Label htmlFor="lastPayout">{t("salary.lastPayout")}</Label>
          <Input
            type="text"
            variant="standard"
            size="small"
            disabled={!canEdit}
            {...register("lastPayout")}
            defaultValue={formatDate(lastPayout ?? "", lang)}
            id="lastPayout"
          />
        </SalaryBox>
        <SalaryBox>
          <Label htmlFor="payoutType">{t("salary.payoutType.title")}</Label>
          <Input
            type="text"
            variant="standard"
            size="small"
            disabled={!canEdit}
            {...register("payoutType")}
            defaultValue={t(`salary.payoutType.${payoutType}`)}
            id="payoutType"
          />
        </SalaryBox>
        <SalaryBox>
          <Label htmlFor="billRate">{t("salary.billRate")}</Label>
          <Input
            type="text"
            variant="standard"
            size="small"
            disabled={!canEdit}
            {...register("billRate")}
            defaultValue={billRate + "%"}
            id="billRate"
          />
        </SalaryBox>
      </SalaryWrapper>
    </WaitEmployeeMode>
  );
}
