import { Box, styled } from "@mui/material";
import type { UseFormRegister } from "react-hook-form";
import type { NewVacancyData } from "./addVacancySlice";

interface BasicProps {
  register: UseFormRegister<NewVacancyData>;
}

const BasicWrapper = styled(Box)({
  flex: 1,
  border: "1px solid black",
});

export default function Basic({ register }: BasicProps) {
  return (
    <BasicWrapper>
      <input type="text" {...register("hirer.name")} />
    </BasicWrapper>
  );
}
