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
import Modal from "../../../features/modal/Modal";

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

const ViewTypeWrapper = styled(Box)({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ViewButton = styled(Button)({
  fontFamily: "system-ui",
  fontSize: "1.1rem",
  textTransform: "capitalize",
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
        <ViewTypeWrapper onClick={() => dispatch(toggleViewType())}>
          {viewType === "card" ? (
            <ViewButton startIcon={<ViewListIcon />}>
              {t("listView")}
            </ViewButton>
          ) : (
            <ViewButton startIcon={<GridViewIcon />}>
              {t("cardView")}
            </ViewButton>
          )}
        </ViewTypeWrapper>
        <Modal
          trigger={
            <AddVacancy variant="contained" color="primary">
              + {t("addVacancy")}
            </AddVacancy>
          }
          trapFocus={true}
          preventScroll={true}
        >
          <div>Test</div>
        </Modal>
      </Logic>
    </HeadlineWrapper>
  );
}
