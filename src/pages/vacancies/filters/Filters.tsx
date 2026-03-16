import { Box, Button, styled } from "@mui/material";
import Title from "../../../shared/ui/Title";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Filter from "./Filter";

interface FilterElement {
  key: string;
  value: string;
}

export interface FilterShape {
  title: string;
  data: FilterElement[];
  filterKey: string;
}

const FiltersContainer = styled(Box)({
  width: "100%",
  height: "fit-content",
  padding: "5px",
});

const Headline = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const Clear = styled(Button)({
  fontFamily: "system-ui",
  fontWeight: "bold",
});

const FiltersWrapper = styled(Box)({});

export default function Filters() {
  const navigate = useNavigate();
  const { t } = useTranslation("vacancies");
  const currentFilters = t("filters", { returnObjects: true }) as FilterShape[];

  return (
    <FiltersContainer>
      <Headline>
        <Title variant="subtitle1">Vacancies Filter</Title>
        <Clear
          size="small"
          variant="text"
          onClick={() => navigate("/vacancies")}
        >
          Clear All
        </Clear>
      </Headline>
      <FiltersWrapper>
        {Array.isArray(currentFilters) &&
          currentFilters.map((f) => {
            return <Filter {...f} key={f.filterKey} />;
          })}
      </FiltersWrapper>
    </FiltersContainer>
  );
}
