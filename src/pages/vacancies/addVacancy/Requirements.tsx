import type { UseFormRegister } from "react-hook-form";
import { Box, styled } from "@mui/material";
import type { NewVacancyData } from "./addVacancySlice";

interface RequirementsProps {
  register: UseFormRegister<NewVacancyData>;
}

const RequirementsWrapper = styled(Box)({
  flex: 1,
  border: "1px solid black",
});

export default function Requirements({ register }: RequirementsProps) {
  return (
    <RequirementsWrapper>
      <input type="text" {...register("hirer.name")} />
    </RequirementsWrapper>
  );
}
