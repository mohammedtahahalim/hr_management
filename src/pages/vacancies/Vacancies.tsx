import { Box, styled } from "@mui/material";
import Headline from "./headline/Headline";
import Table from "./table/Table";
import Control from "./table/Control";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fetchVacancies, type Filters } from "./vacancieSlice";

const VacanciesWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const HeadlineWrapper = styled(Box)({
  width: "100%",
  minHeight: "75px",
  border: "1px solid black",
});

const MainContent = styled(Box)(({ theme }) => ({
  width: "100%",
  flex: 1,
  display: "flex",
  gap: "2px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column-reverse",
  },
}));

export default function Vacancies() {
  const { search } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const page = urlSearchParams.get("page") ?? "1";
    const filter = (urlSearchParams.get("filter") ?? "all") as Filters;
    const vacanciesRequers = dispatch(fetchVacancies({ page, filter }));
    return () => {
      vacanciesRequers.abort();
    };
  }, [search, dispatch]);

  return (
    <VacanciesWrapper>
      <HeadlineWrapper>
        <Headline />
      </HeadlineWrapper>
      <MainContent>
        <Table />
        <Control />
      </MainContent>
    </VacanciesWrapper>
  );
}
