import { Box, styled } from "@mui/material";
import type { Employee } from "./allEmployeeSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../config/i18n";
import { formatDate } from "../../shared/lib/helpers";
import { useNavigate } from "react-router-dom";
import type { PositionColor } from "../../shared/lib/types";

const positionColors: Record<Employee["position"], PositionColor> = {
  backend: "first",
  devOps: "second",
  fullStack: "third",
  django: "fourth",
  cloud: "error",
  "c++": "success",
  front: "first",
  php: "second",
  data: "third",
  design: "fourth",
  project: "success",
};

const statusColors: Record<Employee["status"], PositionColor> = {
  active: "fourth",
  onleave: "third",
  remote: "second",
  terminated: "first",
};

const RowWrapper = styled("tr")(({ theme }) => ({
  cursor: "pointer",
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: "50px",
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
    transition: "all 0.1s ease-in-out",
  },
  [theme.breakpoints.down("lg")]: {
    "&>td:nth-of-type(3)": {
      display: "none",
    },
    "&>td:nth-of-type(5)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    "&>td:nth-of-type(6)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&>td:nth-of-type(7)": {
      display: "none",
    },
  },
}));

const Col = styled("td")({
  textAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "0.85rem",
  fontFamily: "system-ui",
  maxWidth: "80px",
  "&:last-of-type": {
    textTransform: "lowercase",
  },
});

const MainInfo = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  paddingLeft: "5px",
});

const Picture = styled(Box)(({ theme }) => ({
  height: "50%",
  aspectRatio: "1",
  borderRadius: "12px",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Name = styled(Box)({
  width: "fit-content",
});

const Position = styled(Box, {
  shouldForwardProp: (prop) => prop !== "clr",
})<{ clr: PositionColor }>(({ theme, clr }) => ({
  width: "fit-content",
  padding: "5px 10px",
  backgroundColor: theme.palette[clr].main,
  borderRadius: "50px",
  margin: "0 auto",
  color: "whitesmoke",
  fontFamily: "system-ui",
  fontSize: "0.8rem",
}));

const Status = styled(Box, {
  shouldForwardProp: (prop) => prop !== "clr",
})<{ clr: PositionColor }>(({ theme, clr }) => ({
  width: "fit-content",
  padding: "4px 8px",
  color: theme.palette[clr].main,
  border: `1px solid ${theme.palette[clr].main}`,
  borderRadius: "50px",
  margin: "0 auto",
  fontFamily: "system-ui",
  fontSize: "0.8rem",
}));

export default function Row({
  id,
  name,
  profilePicture,
  position,
  department,
  status,
  joinDate,
  email,
  phoneNumber,
}: Employee) {
  const { t, i18n } = useTranslation("employees");
  const navigate = useNavigate();
  const lang = i18n.language as TLanguage;
  return (
    <RowWrapper onClick={() => navigate(`/employee/${id}`)}>
      <Col>
        <MainInfo>
          <Picture>
            <img src={profilePicture ?? ""} alt="" />
          </Picture>
          <Name>{name[lang]}</Name>
        </MainInfo>
      </Col>
      <Col>
        <Position clr={positionColors[position]}>
          {t(`table.bodyCells.positions.${position}`)}
        </Position>
      </Col>
      <Col>{t(`table.bodyCells.departments.${department}`)}</Col>
      <Col>
        <Status clr={statusColors[status]}>
          {t(`table.bodyCells.statuses.${status}`)}
        </Status>
      </Col>
      <Col>{formatDate(joinDate, lang)}</Col>
      <Col>{phoneNumber}</Col>
      <Col>{email}</Col>
    </RowWrapper>
  );
}
