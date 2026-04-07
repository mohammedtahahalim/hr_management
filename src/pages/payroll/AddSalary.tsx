import {
  alpha,
  Box,
  Button,
  FormLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Title from "../../shared/ui/Title";
import { memo } from "react";
import { useForm } from "react-hook-form";
import {
  CURRENCIES,
  PAY_TYPE,
  PAYRATE,
  POSITIONS,
} from "../../shared/lib/constants";
import { useTranslation } from "react-i18next";

interface AddSalaryProps {
  closeModal: () => void;
}

interface AddPayrollFormState {
  staff: string;
  position: (typeof POSITIONS)[number];
  pay: (typeof PAYRATE)[number];
  payType: (typeof PAY_TYPE)[number];
  currency: (typeof CURRENCIES)[number];
  salary: number;
  email: string;
}

const AddSalaryWrapper = styled("form")(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: alpha(theme.palette.background.default, 0.95),
  borderTopLeftRadius: "18px",
  borderBottomLeftRadius: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "25px",
}));

const Headline = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 15px",
  marginBottom: "25px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const Mode = styled(Box)({
  display: "flex",
  gap: "10px",
});

const ControlButton = styled(Button)({
  fontFamily: "system-ui",
  textTransform: "capitalize",
  borderRadius: "50px",
  minWidth: "125px",
});

const FormControl = styled(Box)({
  padding: "5px 15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
});

const Label = styled(FormLabel)({
  fontFamily: "system-ui",
  fontSize: "1rem",
  fontWeight: "bold",
});

const Input = styled(TextField)({
  maxWidth: "300px",
  flex: 1,
});

const RegularSelect = styled(Select)({
  flex: 1,
  maxWidth: "300px",
});

const PayRateBox = styled(Box)({
  flex: 1,
  maxWidth: "300px",
  display: "flex",
  gap: "10px",
});

const Currencies = styled(Select)({
  width: "75px",
});

const Divider = styled(Box)(({ theme }) => ({
  height: "2px",
  width: "90%",
  backgroundColor: theme.palette.divider,
  alignSelf: "center",
}));

const AddSalary = memo(({ closeModal }: AddSalaryProps) => {
  const { t } = useTranslation("addPayroll");
  const { register, getValues } = useForm<AddPayrollFormState>();

  console.log(getValues());

  return (
    <AddSalaryWrapper>
      <Headline>
        <Title ender={false}>{t("title")}</Title>
        <Mode>
          <ControlButton
            variant="outlined"
            onClick={() => closeModal()}
            startIcon={<CloseIcon />}
          >
            {t("cancel")}
          </ControlButton>
          <ControlButton variant="contained" startIcon={<SaveIcon />}>
            {t("save")}
          </ControlButton>
        </Mode>
      </Headline>
      <FormControl>
        <Label>{t("staff")}</Label>
        <Input size="small" />
      </FormControl>
      <FormControl>
        <Label>{t("positions.title")}</Label>
        <RegularSelect
          size="small"
          MenuProps={{
            disablePortal: true,
          }}
          {...register("position")}
          defaultValue={POSITIONS[0]}
        >
          {POSITIONS.map((p) => {
            return <MenuItem value={p}>{t(`positions.${p}`)}</MenuItem>;
          })}
        </RegularSelect>
      </FormControl>
      <FormControl>
        <Label>{t("payPeriod.title")}</Label>
        <RegularSelect
          size="small"
          MenuProps={{
            disablePortal: true,
          }}
          {...register("pay")}
          defaultValue={PAYRATE[0]}
        >
          {PAYRATE.map((p) => {
            return <MenuItem value={p}>{t(`payPeriod.${p}`)}</MenuItem>;
          })}
        </RegularSelect>
      </FormControl>
      <FormControl>
        <Label>{t("payType.title")}</Label>
        <RegularSelect
          size="small"
          MenuProps={{
            disablePortal: true,
          }}
          {...register("payType")}
          defaultValue={PAY_TYPE[0]}
        >
          {PAY_TYPE.map((p) => {
            return <MenuItem value={p}>{t(`payType.${p}`)}</MenuItem>;
          })}
        </RegularSelect>
      </FormControl>
      <FormControl>
        <Label>{t("payRate.title")}</Label>
        <PayRateBox>
          <Currencies
            size="small"
            defaultValue={CURRENCIES[0]}
            {...register("currency")}
            MenuProps={{
              disablePortal: true,
            }}
          >
            {CURRENCIES.map((c) => {
              return <MenuItem value={c}>{t(`payRate.${c}`)}</MenuItem>;
            })}
          </Currencies>
          <Input
            size="small"
            type="number"
            defaultValue={0}
            {...register("salary")}
          />
        </PayRateBox>
      </FormControl>
      <Divider />
      <FormControl>
        <Label>{t("email")}</Label>
        <Input
          type="email"
          defaultValue={"@example.com"}
          {...register("email")}
          size="small"
        />
      </FormControl>
    </AddSalaryWrapper>
  );
});

export default AddSalary;
