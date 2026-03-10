import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectVacancieData } from "../vacancieSlice";
import Line from "./Line";

const headCells: string[] = [
  "positionTitle",
  "location",
  "applicants",
  "status",
  "publication",
  "trend",
];

const TableWrapper = styled(Box)({
  width: "100%",
  flex: 1,
});

const TableContent = styled("table")({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: 0,
  overflowX: "hidden",
  overflowY: "scroll",
  scrollbarWidth: "none",
});

const Identifier = styled("tr", {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  backgroundColor: theme.palette.background.paper,
  "&>*:nth-of-type(2)": {
    maxWidth: "40px",
  },
  "&>*:nth-of-type(3)": {
    maxWidth: "40px",
  },
  [theme.breakpoints.down("lg")]: {
    "&>*:nth-of-type(5)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    "&>*:nth-of-type(2)": {
      display: "none",
    },
  },
  borderRadius: "12px",
  "& td:first-of-type": {
    ...(isArabic
      ? { borderTopRightRadius: 12, borderBottomRightRadius: 12 }
      : { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }),
  },
  "& td:last-of-type": {
    ...(isArabic
      ? { borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }
      : { borderTopRightRadius: 12, borderBottomRightRadius: 12 }),
  },
}));

const Cell = styled("td")({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.9rem",
  padding: "8px",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export default function Table() {
  const { t, i18n } = useTranslation("vacancies");
  const isArabic = i18n.language === "ar";
  const data = useSelector(selectVacancieData);

  return (
    <TableWrapper>
      <TableContent>
        <thead>
          <Identifier isArabic={isArabic}>
            {headCells.map((c) => {
              return <Cell key={c}>{t(`table.head.${c}`)}</Cell>;
            })}
          </Identifier>
        </thead>
        <tbody>
          {data.map((d) => {
            return <Line {...d} key={d.id} />;
          })}
        </tbody>
      </TableContent>
    </TableWrapper>
  );
}
