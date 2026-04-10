import { Box, Button, styled, Typography } from "@mui/material";
import type { FilterShape } from "./Filters";
import { useSearchParams } from "react-router-dom";

const FilterWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "5px",
});

const TitleWrapper = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
});

const Container = styled(Box)({
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
});

const FilterButton = styled(Button)({
  minWidth: 0,
  width: "fit-content",
  textTransform: "capitalize",
  fontFamily: "system-ui",
  borderRadius: "50px",
  minHeight: 0,
  padding: "5px 10px",
  fontSize: "0.8rem",
});

export default function Filter({ title, data, filterKey }: FilterShape) {
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get(filterKey) ?? "all";

  const changeFilter = (key: string, val: string) => {
    setSearchParams((searchParams) => {
      searchParams.set(key, val);
      return searchParams;
    });
  };

  return (
    <FilterWrapper>
      <TitleWrapper variant="subtitle1">{title}</TitleWrapper>
      <Container>
        {data.map((d) => {
          return (
            <FilterButton
              key={d.key}
              variant={active === d.key ? "contained" : "outlined"}
              onClick={() => changeFilter(filterKey, d.key)}
            >
              {d.value}
            </FilterButton>
          );
        })}
      </Container>
    </FilterWrapper>
  );
}
