import { Box, Button, styled } from "@mui/material";
import Title from "../../shared/ui/Title";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { useDispatch, useSelector } from "react-redux";
import {
  changeViewType,
  selectAllEmployeeStatus,
  selectAllEmployeeViewType,
} from "./allEmployeeSlice";
import type { AppDispatch } from "../../config/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "5px",
  },
}));

const Visuals = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    alignSelf: "flex-start",
  },
}));

const ListType = styled(Button)({
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  textTransform: "capitalize",
});

const Add = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    alignSelf: "flex-end",
  },
}));

const NewEmployee = styled(Button)({
  borderRadius: "50px",
  textTransform: "capitalize",
  fontSize: "0.85rem",
  fontFamily: "system-ui",
});

export default function Headline() {
  const { t } = useTranslation("employees");
  const status = useSelector(selectAllEmployeeStatus);
  const listType = useSelector(selectAllEmployeeViewType);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = status === "loading";

  return (
    <HeadlineWrapper>
      <Visuals>
        <Title variant="h6" ender={false}>
          {t("headline.title")}
        </Title>
        <ListType
          variant="text"
          startIcon={
            listType === "list" ? (
              <GridViewIcon fontSize="inherit" />
            ) : (
              <ViewListIcon fontSize="inherit" />
            )
          }
          onClick={() => dispatch(changeViewType())}
          disabled={isLoading}
        >
          {listType === "list"
            ? t("headline.cardView")
            : t("headline.listView")}
        </ListType>
      </Visuals>
      <Add>
        <NewEmployee
          variant="outlined"
          startIcon={<ImportExportIcon fontSize="inherit" />}
        >
          {t("headline.import")}
        </NewEmployee>
        <NewEmployee
          variant="contained"
          startIcon={<AddIcon fontSize="inherit" />}
          onClick={() => navigate("/employees/add-employee")}
        >
          {t("headline.addEmployee")}
        </NewEmployee>
      </Add>
    </HeadlineWrapper>
  );
}
