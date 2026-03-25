import { Box, styled, Typography } from "@mui/material";
import type { ApplicantDataSample } from "./applicantSlice";
import { useTranslation } from "react-i18next";
import type { PositionColor } from "../../../shared/lib/types";
import {
  formatDate,
  generateRandomPosColor,
} from "../../../shared/lib/helpers";
import type { TLanguage } from "../../../config/i18n";
import { statusStages } from "../../../shared/lib/constants";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

const RowWrapper = styled("tr")(({ theme }) => ({
  height: "45px",
  cursor: "pointer",
  [theme.breakpoints.down("lg")]: {
    "&>td:nth-of-type(3)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    "&>td:nth-of-type(5)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&>td:nth-of-type(6)": {
      display: "none",
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Col = styled("td")(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: "50px",
  textAlign: "center",
  minWidth: "100px",
}));

const Name = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.9rem",
  maxWidth: "90px",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const Position = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  fontFamily: "system-ui",
  fontWeight: "bold",
  backgroundColor: theme.palette[posColor].main,
  width: "fit-content",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "0.8rem",
  margin: "0 auto",
  color: "whitesmoke",
  maxWidth: "100px",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const Date = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.9rem",
});

const Status = styled(Box)({
  display: "flex",
  gap: "5px",
  justifyContent: "center",
});

const StatusText = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.8rem",
});

const StatusBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  height: "4px",
  width: "18px",
  borderRadius: "12px",
  backgroundColor: isActive
    ? theme.palette.primary.main
    : theme.palette.divider,
}));

const Email = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.9rem",
  fontStyle: "italic",
});

const Rating = styled(Box)({
  display: "flex",
  gap: "3px",
  justifyContent: "center",
});

export default function Row({
  id,
  name,
  position,
  date,
  status,
  email,
  rating,
  setActiveApplicant,
}: ApplicantDataSample & {
  setActiveApplicant: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { t, i18n } = useTranslation("applicants");
  const statusText = statusStages[status - 1][i18n.language as TLanguage];

  return (
    <RowWrapper id={`row-${id}`} onClick={() => setActiveApplicant(id)}>
      <Col>
        <Name variant="subtitle1">{name}</Name>
      </Col>
      <Col>
        <Position posColor={generateRandomPosColor()}>
          {t(`table.body.position.${position}`)}
        </Position>
      </Col>
      <Col>
        <Date variant="subtitle1">
          {formatDate(date, i18n.language as TLanguage)}
        </Date>
      </Col>
      <Col>
        <StatusText variant="subtitle1">{statusText}</StatusText>
        <Status>
          {Array.from({ length: 6 }).map((_, idx) => {
            return <StatusBar key={idx} isActive={idx < status} />;
          })}
        </Status>
      </Col>
      <Col>
        <Email>{email}</Email>
      </Col>
      <Col>
        <Rating>
          {Array.from({ length: 5 }).map((_, idx) => {
            return idx < rating ? (
              <StarIcon key={idx} sx={{ fontSize: "1rem" }} color="warning" />
            ) : (
              <StarBorderOutlinedIcon key={idx} sx={{ fontSize: "1rem" }} />
            );
          })}
        </Rating>
      </Col>
    </RowWrapper>
  );
}
