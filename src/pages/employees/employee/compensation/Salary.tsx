import {
  Box,
  FormLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployee,
  selectEmployeeError,
  selectEmployeePayRollInfo,
  selectEmployeeStatus,
} from "../employeeSlice";
import Title from "../../../../shared/ui/Title";
import type { AppDispatch } from "../../../../config/store";
import { useEmployeeForm } from "../EmployeeFormContext";
import useCanEdit from "../useCanEdit";
import { formatDate } from "../../../../shared/lib/helpers";
import type { TLanguage } from "../../../../config/i18n";
import { useParams } from "react-router-dom";
import Reload from "../../../../shared/ui/Reload";

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
  const status = useSelector(selectEmployeeStatus);
  const isLoading = status === "loading";
  const error = useSelector(selectEmployeeError);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { salaryBasis, salaryAmount, lastPayout, payoutType, billRate } =
    useSelector(selectEmployeePayRollInfo) ?? {};
  const register = useEmployeeForm();
  const { canEdit } = useCanEdit();

  const dispatchFunc = () => {
    dispatch(fetchEmployee({ id: id ?? "1" }));
  };

  return (
    <WithSkeleton loading={isLoading} sx={{ borderRadius: "12px" }}>
      {status === "success" && (
        <SalaryWrapper>
          <Title ender={false}>{t("salary.title")}</Title>
          <SalaryBox>
            <Label>{t("salary.basis.title")}</Label>
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
            >
              <MenuItem value="hour">hour</MenuItem>
              <MenuItem value="day">day</MenuItem>
              <MenuItem value="week">week</MenuItem>
              <MenuItem value="month">month</MenuItem>
              <MenuItem value="year">year</MenuItem>
            </Select>
          </SalaryBox>
          <SalaryBox>
            <Label>{t("salary.salaryAmount")}</Label>
            <Input
              type="text"
              variant="standard"
              size="small"
              disabled={!canEdit}
              {...register("salaryAmount")}
              defaultValue={salaryAmount + "$"}
            />
          </SalaryBox>
          <SalaryBox>
            <Label>{t("salary.lastPayout")}</Label>
            <Input
              type="text"
              variant="standard"
              size="small"
              disabled={!canEdit}
              {...register("lastPayout")}
              defaultValue={formatDate(lastPayout ?? "", lang)}
            />
          </SalaryBox>
          <SalaryBox>
            <Label>{t("salary.payoutType.title")}</Label>
            <Input
              type="text"
              variant="standard"
              size="small"
              disabled={!canEdit}
              {...register("payoutType")}
              defaultValue={t(`salary.payoutType.${payoutType}`)}
            />
          </SalaryBox>
          <SalaryBox>
            <Label>{t("salary.billRate")}</Label>
            <Input
              type="text"
              variant="standard"
              size="small"
              disabled={!canEdit}
              {...register("billRate")}
              defaultValue={billRate + "%"}
            />
          </SalaryBox>
        </SalaryWrapper>
      )}
      {status === "failure" && (
        <Reload error={error} dispatchThunk={dispatchFunc} />
      )}
    </WithSkeleton>
  );
}
