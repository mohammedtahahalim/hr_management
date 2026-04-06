import { styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSorter,
  selectPayrollSortBy,
  selectPayrollSortDirection,
  type PayrollSorters,
} from "./payrollSlice";
import { useTranslation } from "react-i18next";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import type { AppDispatch } from "../../config/store";

const HeadWrapper = styled("thead")({});

const Row = styled("tr")(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.paper,
}));

interface TableHead {
  key: PayrollSorters;
  value: string;
}

const Col = styled("th", {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  height: "45px",
  cursor: "pointer",
  minWidth: "75px",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  userSelect: "none",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "&:first-of-type": {
    ...(isArabic
      ? { borderTopRightRadius: "12px", borderBottomRightRadius: "12px" }
      : { borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" }),
  },
  "&:last-of-type": {
    ...(isArabic
      ? { borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" }
      : { borderTopRightRadius: "12px", borderBottomRightRadius: "12px" }),
  },
  [theme.breakpoints.down("xl")]: {
    "&:nth-of-type(2)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("lg")]: {
    "&:nth-of-type(5)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    "&:nth-of-type(3)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&:nth-of-type(4)": {
      display: "none",
    },
  },
}));

export default function Head() {
  const { t, i18n } = useTranslation("payroll");
  const sortBy = useSelector(selectPayrollSortBy);
  const sortOrder = useSelector(selectPayrollSortDirection);
  const dispatch = useDispatch<AppDispatch>();
  const isArabic = i18n.language === "ar";
  const headColumns = t("table.head.cols", {
    returnObjects: true,
  }) as TableHead[];

  return (
    <HeadWrapper>
      <Row>
        {Array.isArray(headColumns) &&
          headColumns.map((h) => {
            return (
              <Col
                key={h.key}
                isArabic={isArabic}
                onClick={() => dispatch(changeSorter(h.key))}
                scope="col"
              >
                {h.value}{" "}
                {sortBy === h.key ? (
                  sortOrder === "desc" ? (
                    <SouthIcon sx={{ fontSize: "0.7rem" }} />
                  ) : (
                    <NorthIcon sx={{ fontSize: "0.7rem" }} />
                  )
                ) : (
                  <ImportExportIcon fontSize="inherit" />
                )}
              </Col>
            );
          })}
      </Row>
    </HeadWrapper>
  );
}
