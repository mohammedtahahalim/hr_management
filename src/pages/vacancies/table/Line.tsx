import { Box, styled } from "@mui/material";
import type { VacancieData } from "../vacancieSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../config/i18n";
import type { PositionColor } from "../../../shared/lib/types";
import { positionColor } from "../../../shared/lib/constants";
import { formatDate } from "../../../shared/lib/helpers";
import { useNavigate } from "react-router-dom";
import Graph from "../../../shared/ui/Graph";

const Row = styled("tr")(({ theme }) => ({
  "&>*:nth-of-type(2)": {
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
    "&>*": {
      maxWidth: "75px",
    },
  },
  "&>*": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    maxHeight: "50px",
    overflow: "hidden",
  },
  "&:hover, &:focus": {
    backgroundColor: theme.palette.background.paper,
    cursor: "pointer",
  },
  border: "1px solid black",
}));

const Cell = styled("td")({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.9rem",
  padding: "8px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minWidth: 0,
});

const StatusWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  height: "100%",
  width: "fit-content",
  padding: "5px 8px",
  borderRadius: "50px",
  color: "whitesmoke",
  backgroundColor: theme.palette[posColor].main,
}));

export default function Line({
  id,
  title,
  location,
  applicants,
  status,
  publication,
  trend,
}: VacancieData) {
  const { i18n, t } = useTranslation(["dashboard", "vacancies"]);
  const lang = i18n.language as TLanguage;
  const navigate = useNavigate();

  const handleKeyClick = (e: React.KeyboardEvent, id: number) => {
    if (e.key !== "Enter") return;
    navigate(`/vacancy/${id}`);
  };

  return (
    <Row
      onClick={() => navigate(`/vacancy/${id}`)}
      tabIndex={0}
      onKeyDown={(e) => handleKeyClick(e, id)}
    >
      <Cell>{title[lang]}</Cell>
      <Cell>{location === "R" ? t("dashboard:recent.remote") : location}</Cell>
      <Cell>{applicants}</Cell>
      <Cell>
        <StatusWrapper posColor={positionColor[status]}>
          {t(`vacancies:${status}`)}
        </StatusWrapper>
      </Cell>
      <Cell>{formatDate(publication, i18n.language as TLanguage)}</Cell>
      <Cell>
        <Graph trend={trend} />
      </Cell>
    </Row>
  );
}
