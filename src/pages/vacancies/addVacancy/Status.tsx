import type { UseFormRegister } from "react-hook-form";
import { Box, styled } from "@mui/material";
import type { NewVacancyData } from "./addVacancySlice";

interface StatusProps {
  register: UseFormRegister<NewVacancyData>;
}

const StatusWrapper = styled(Box)({
  flex: 1,
  border: "1px solid black",
});

export default function Status({ register }: StatusProps) {
  return (
    <StatusWrapper>
      <input type="text" {...register("hirer.name")} />
    </StatusWrapper>
  );
}
