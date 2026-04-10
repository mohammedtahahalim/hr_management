import { Box, styled } from "@mui/material";
import Headline from "./headline/Headline";
import Table from "./table/Table";
import Control from "./table/Control";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import {
  fetchVacancies,
  selectVacancieStatus,
  selectVacancieViewType,
  selectVacanieError,
} from "./vacancieSlice";
import Cards from "./table/Cards";
import Reload from "../../shared/ui/Reload";
import Filters from "./filters/Filters";

const VacanciesWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "75px",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    minHeight: "150px",
  },
}));

const MainContent = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const MainWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  gap: "15px",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column-reverse",
  },
}));

const FiltersWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "325px",
  height: "fit-content",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  padding: "5px",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "100%",
  },
}));

const Content = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export default function Vacancies() {
  const [searchParams, _] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectVacancieStatus);
  const error = useSelector(selectVacanieError);
  const viewType = useSelector(selectVacancieViewType);
  const isCard = viewType === "card";
  const isList = viewType === "list";

  const handleRetry = useCallback(() => {
    const vacanciesRequest = dispatch(
      fetchVacancies({ queries: searchParams.toString() }),
    );
    return () => {
      vacanciesRequest.abort();
    };
  }, [searchParams, dispatch]);

  useEffect(() => {
    const vacanciesRequest = dispatch(
      fetchVacancies({ queries: searchParams.toString() }),
    );
    return () => {
      vacanciesRequest.abort();
    };
  }, [searchParams, dispatch]);

  return (
    <VacanciesWrapper>
      <HeadlineWrapper>
        <Headline />
      </HeadlineWrapper>
      <MainContent>
        <MainWrapper>
          {status === "failure" && (
            <Reload error={error} dispatchThunk={() => handleRetry()} />
          )}
          {status !== "failure" && (
            <Content>
              {isCard && <Cards />}
              {isList && <Table />}
              <Control />
            </Content>
          )}
          <FiltersWrapper>
            <Filters />
          </FiltersWrapper>
        </MainWrapper>
      </MainContent>
    </VacanciesWrapper>
  );
}
