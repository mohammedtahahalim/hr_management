import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  selectAllEmployeeSortBy,
  selectAllEmployeeSortOrder,
  sortAllEmployeeData,
  type SortableKeys,
} from "./allEmployeeSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../config/store";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import ImportExportIcon from "@mui/icons-material/ImportExport";

interface TableHead {
  key: SortableKeys;
  value: string;
}

const THeadWrapper = styled("thead")({});

const Row = styled("tr", {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  width: "100%",
  "&>th:first-of-type": {
    ...(isArabic
      ? { borderTopRightRadius: "12px", borderBottomRightRadius: "12px" }
      : { borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" }),
  },
  "&>th:last-of-type": {
    ...(isArabic
      ? { borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" }
      : { borderTopRightRadius: "12px", borderBottomRightRadius: "12px" }),
  },
  [theme.breakpoints.down("lg")]: {
    "&>th:nth-of-type(3)": {
      display: "none",
    },
    "&>th:nth-of-type(5)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    "&>th:nth-of-type(6)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&>th:nth-of-type(7)": {
      display: "none",
    },
    "&>th:nth-of-type(4)": {
      ...(isArabic
        ? { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
        : { borderTopRightRadius: "50px", borderBottomRightRadius: "50px" }),
    },
  },
}));

const Col = styled("th")(({ theme }) => ({
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  height: "50px",
  cursor: "pointer",
  fontSize: "0.9rem",
}));

export default function THead() {
  const { t, i18n } = useTranslation("employees");
  const dispatch = useDispatch<AppDispatch>();
  const activeSort = useSelector(selectAllEmployeeSortBy);
  const sortOrder = useSelector(selectAllEmployeeSortOrder);
  const isArabic = i18n.language === "ar";

  const tableHeadCells = t("table.headCells", {
    returnObjects: true,
  }) as TableHead[];

  return (
    <THeadWrapper>
      <Row isArabic={isArabic}>
        {!!tableHeadCells.length &&
          tableHeadCells.map((th) => {
            return (
              <Col
                key={th.key}
                onClick={() => dispatch(sortAllEmployeeData(th.key))}
                scope="col"
              >
                {th.value}{" "}
                {activeSort === th.key ? (
                  sortOrder === "desc" ? (
                    <NorthIcon sx={{ fontSize: "0.75rem" }} />
                  ) : (
                    <SouthIcon sx={{ fontSize: "0.75rem" }} />
                  )
                ) : (
                  <ImportExportIcon sx={{ fontSize: "0.8rem" }} />
                )}
              </Col>
            );
          })}
      </Row>
    </THeadWrapper>
  );
}
