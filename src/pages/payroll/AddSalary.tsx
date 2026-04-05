import { alpha, Box, styled } from "@mui/material";

const AddSalaryWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: alpha(theme.palette.background.default, 0.9),
  padding: "10px",
  borderTopLeftRadius: "18px",
  borderBottomLeftRadius: "18px",
}));

export default function AddSalary() {
  return <AddSalaryWrapper>AddSalary</AddSalaryWrapper>;
}
