import { Box, Button, styled, Typography } from "@mui/material";
import type { FilterShape } from "./Filters";
import { useLocation, useNavigate } from "react-router-dom";

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
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const active = params.get(filterKey) ?? "all";

  const changeFilter = (val: string) => {
    params.set(filterKey, val);
    navigate({
      pathname,
      search: `${params.toString()}`,
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
              onClick={() => changeFilter(d.key)}
            >
              {d.value}
            </FilterButton>
          );
        })}
      </Container>
    </FilterWrapper>
  );
}
