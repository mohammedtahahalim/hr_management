import { Box, Button, styled } from "@mui/material";
import Title from "../../../shared/ui/Title";
import { filterButtons } from "../../../shared/lib/constants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  toggleViewType,
  selectVacancieViewType,
  type Filters,
} from "../vacancieSlice";
import { useTranslation } from "react-i18next";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../config/store";

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  gap: "5px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const Filters = styled(Box)({
  flex: 1.5,
  display: "flex",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap",
});

const ActiveFilter = styled(Button)({
  borderRadius: "50px",
  textTransform: "capitalize",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
});

const Logic = styled(Box)({
  alignSelf: "flex-end",
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "20px",
  height: "100%",
});

const ViewTypeButton = styled(Button)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textTransform: "capitalize",
  fontFamily: "system-ui",
});

const AddVacancy = styled(Button)({
  borderRadius: "50px",
  textTransform: "capitalize",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
});

export default function Headline() {
  const { t } = useTranslation("vacancies");
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const viewType = useSelector(selectVacancieViewType);
  const dispatch = useDispatch<AppDispatch>();
  const activeFilter = (new URLSearchParams(search).get("filter") ??
    "all") as Filters;

  const handleFilterChange = (filter: Filters) => {
    const params = new URLSearchParams(search);
    params.set("filter", filter);

    navigate({
      pathname,
      search: `?${params.toString()}`,
    });
  };

  return (
    <HeadlineWrapper>
      <Filters>
        <Title>{t("title")}</Title>
        {filterButtons.map((b) => {
          return (
            <ActiveFilter
              variant={b === activeFilter ? "contained" : "outlined"}
              onClick={() => handleFilterChange(b)}
              key={b}
            >
              {t(`${b}`)}
            </ActiveFilter>
          );
        })}
      </Filters>
      <Logic>
        <ViewTypeButton
          startIcon={
            viewType === "card" ? (
              <ViewListIcon fontSize="inherit" />
            ) : (
              <GridViewIcon fontSize="inherit" />
            )
          }
          onClick={() => dispatch(toggleViewType())}
        >
          {viewType === "card" ? t("listView") : t("cardView")}
        </ViewTypeButton>
        <AddVacancy
          variant="contained"
          color="primary"
          onClick={() => navigate("add-vacancy")}
        >
          + {t("addVacancy")}
        </AddVacancy>
      </Logic>
    </HeadlineWrapper>
  );
}
