import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  selectApplicantSortBy,
  selectApplicantSortOrder,
  sortData,
  type Sorters,
} from "./applicantSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../config/store";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import type React from "react";

const HeadContent: Sorters[] = [
  "name",
  "pos",
  "date",
  "status",
  "contact",
  "rating",
];

const HeadWrapper = styled("thead")({
  width: "100%",
});

const Row = styled("tr", {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  "&>th:first-of-type": {
    ...(isArabic
      ? { borderTopRightRadius: "50px", borderBottomRightRadius: "50px" }
      : { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }),
  },
  "&>th:last-of-type": {
    ...(isArabic
      ? { borderTopLeftRadius: "50px", borderBottomLeftRadius: "50px" }
      : { borderTopRightRadius: "50px", borderBottomRightRadius: "50px" }),
  },
  [theme.breakpoints.down("lg")]: {
    "&>th:nth-of-type(3)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    "&>th:nth-of-type(5)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&>th:nth-of-type(6)": {
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

export default function Head() {
  const { t, i18n } = useTranslation("applicants");
  const dispatch = useDispatch<AppDispatch>();
  const activeSort = useSelector(selectApplicantSortBy);
  const sortOrder = useSelector(selectApplicantSortOrder);
  const isArabic = i18n.language === "ar";

  const onEnterKey = (e: React.KeyboardEvent, c: Sorters) => {
    if (e.key !== "Enter" && e.key !== "Space") return;
    dispatch(sortData(c));
  };

  return (
    <HeadWrapper>
      <Row isArabic={isArabic}>
        {HeadContent.map((c) => {
          return (
            <Col
              onClick={() => dispatch(sortData(c))}
              key={c}
              tabIndex={0}
              onKeyDown={(e) => onEnterKey(e, c)}
              scope="col"
            >
              {t(`table.head.${c}`)}{" "}
              {activeSort === c ? (
                sortOrder === "asc" ? (
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
    </HeadWrapper>
  );
}
