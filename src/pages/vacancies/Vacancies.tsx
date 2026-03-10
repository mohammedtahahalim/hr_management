import { Box, styled } from "@mui/material";
import Headline from "./headline/Headline";
import Table from "./table/Table";
import Control from "./table/Control";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";
import {
  fetchVacancies,
  selectVacancieStatus,
  selectVacancieViewType,
  selectVacanieError,
  type Filters,
} from "./vacancieSlice";
import Cards from "./table/Cards";
import Loader from "../../shared/ui/Loader";
import Reload from "../../shared/ui/Reload";

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

const LoaderWrapper = styled(Box)({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function Vacancies() {
  const { search } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectVacancieStatus);
  const error = useSelector(selectVacanieError);
  const viewType = useSelector(selectVacancieViewType);
  const isCard = status === "success" && viewType === "card";
  const isList = status === "success" && viewType === "list";

  const handleRetry = useCallback(() => {
    const urlSearchParams = new URLSearchParams(search);
    const page = urlSearchParams.get("page") ?? "1";
    const filter = (urlSearchParams.get("filter") ?? "all") as Filters;
    const vacanciesRequest = dispatch(fetchVacancies({ page, filter }));
    return () => {
      vacanciesRequest.abort();
    };
  }, [search, dispatch]);

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
        {isCard && <Cards />}
        {isList && <Table />}
        {status === "loading" && (
          <LoaderWrapper>
            <Loader color="secondary" />
          </LoaderWrapper>
        )}
        {status === "failure" && (
          <Reload error={error} dispatchThunk={() => handleRetry()} />
        )}
        <Control />
      </MainContent>
    </VacanciesWrapper>
  );
}
