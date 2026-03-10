import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";

const headCells: string[] = [
  "positionTitle",
  "location",
  "applicants",
  "status",
  "publication",
  "trend",
];

const TableWrapper = styled("table")({
  width: "100%",
  flex: 1,
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
  padding: "10px 0px",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textAlign: "center",
});

const Body = styled("tbody")({});

export default function Table() {
  const { t, i18n } = useTranslation("vacancies");
  const isArabic = i18n.language === "ar";

  return (
    <TableWrapper>
      <thead>
        <Identifier isArabic={isArabic}>
          {headCells.map((c) => {
            return <Cell key={c}>{t(`table.head.${c}`)}</Cell>;
          })}
        </Identifier>
      </thead>
      <Body></Body>
    </TableWrapper>
  );
}
