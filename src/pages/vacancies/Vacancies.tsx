import { Box, styled } from "@mui/material";
import Headline from "./headline/Headline";
import Table from "./table/Table";
import Control from "./table/Control";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchVacancies,
  selectVacancieStatus,
  type Filters,
} from "./vacancieSlice";

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
});

const MainContent = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export default function Vacancies() {
  const { search } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectVacancieStatus);

  console.log(status);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const page = urlSearchParams.get("page") ?? "1";
    const filter = (urlSearchParams.get("filter") ?? "all") as Filters;
    const vacanciesRequest = dispatch(fetchVacancies({ page, filter }));
    return () => {
      vacanciesRequest.abort();
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
