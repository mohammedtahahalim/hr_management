import { Box, styled } from "@mui/material";
import Headline from "./Headline";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../config/store";
import { addNewVacancy } from "./addVacancySlice";

const AddVacancyWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const FormWrapper = styled("form")({
  width: "100%",
  flex: 1,
  border: "1px solid black",
});

export default function AddVacancy() {
  const dispatch = useDispatch<AppDispatch>();
  // TODO: Implement the hook form

  const onSave = () => {
    dispatch(addNewVacancy());
  };

  return (
    <AddVacancyWrapper>
      <Headline onSave={onSave} />
      <FormWrapper></FormWrapper>
    </AddVacancyWrapper>
  );
}
