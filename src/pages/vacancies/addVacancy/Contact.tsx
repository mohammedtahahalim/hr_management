import type { UseFormRegister } from "react-hook-form";
import { Box, styled } from "@mui/material";
import type { NewVacancyData } from "./addVacancySlice";

interface ContactProps {
  register: UseFormRegister<NewVacancyData>;
}

const ContactWrapper = styled(Box)({
  flex: 1,
  border: "1px solid black",
});

export default function Contact({ register }: ContactProps) {
  return (
    <ContactWrapper>
      <input type="text" {...register("hirer.name")} />
    </ContactWrapper>
  );
}
