import { Box, Button, MenuItem, Select, styled } from "@mui/material";
import Title from "../../shared/ui/Title";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { useDispatch, useSelector } from "react-redux";
import {
  changeViewType,
  selectAllEmployeeSortBy,
  selectAllEmployeeStatus,
  selectAllEmployeeViewType,
  sortAllEmployeeData,
  type SortableKeys,
} from "./allEmployeeSlice";
import type { AppDispatch } from "../../config/store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const sorters: SortableKeys[] = [
  "department",
  "email",
  "joinDate",
  "name",
  "phoneNumber",
  "position",
  "status",
];

function isSortableKey(value: unknown): value is SortableKeys {
  return typeof value === "string" && sorters.includes(value as SortableKeys);
}

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
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    alignSelf: "flex-end",
  },
}));

const NewEmployee = styled(Button)({
  borderRadius: "50px",
  textTransform: "capitalize",
  fontSize: "0.85rem",
  fontFamily: "system-ui",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const SortBy = styled(Select)({
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export default function Headline() {
  const { t } = useTranslation("employees");
  const status = useSelector(selectAllEmployeeStatus);
  const listType = useSelector(selectAllEmployeeViewType);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading = status === "loading";
  const sortBy = useSelector(selectAllEmployeeSortBy);

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
        {listType === "card" && (
          <SortBy
            variant="outlined"
            size="small"
            displayEmpty
            value={sortBy ?? ""}
            onChange={(e) =>
              dispatch(sortAllEmployeeData(e.target.value as SortableKeys))
            }
            renderValue={(value: unknown) => {
              if (!isSortableKey(value)) return t("headline.sortBy.default");
              if (sorters.includes(value))
                return t(`headline.sortBy.${value}`) as SortableKeys;
            }}
          >
            {sorters.map((s) => {
              return (
                <MenuItem
                  key={s}
                  value={s}
                  sx={{ fontFamily: "system-ui", fontSize: "0.9rem" }}
                >
                  {t(`headline.sortBy.${s}`)}
                </MenuItem>
              );
            })}
          </SortBy>
        )}
        <NewEmployee
          variant="outlined"
          startIcon={<ImportExportIcon fontSize="inherit" />}
        >
          {t("headline.import")}
        </NewEmployee>
        <NewEmployee
          variant="contained"
          startIcon={<AddIcon fontSize="inherit" />}
          onClick={() => navigate("/employee/add-employee")}
        >
          {t("headline.addEmployee")}
        </NewEmployee>
      </Add>
    </HeadlineWrapper>
  );
}
