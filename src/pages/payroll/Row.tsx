import { Box, styled, Typography } from "@mui/material";
import type { PayrollData } from "./payrollSlice";
import { formatDate } from "../../shared/lib/helpers";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../config/i18n";
import type { PositionColor } from "../../shared/lib/types";

const StatusColor: Record<PayrollData["status"], PositionColor> = {
  completed: "success",
  pending: "second",
  progress: "first",
  rejected: "error",
};

const CURRENCIES: Record<TLanguage, string> = {
  ar: "د.إ",
  en: "$",
  fr: "€",
  ja: "¥",
};

const RowWrapper = styled("tr")(({ theme }) => ({
  width: "100%",
  height: "75px",
  "&:not(:last-of-type)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Col = styled("td")(({ theme }) => ({
  height: "45px",
  minWidth: "75px",
  maxWidth: "175px",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  userSelect: "none",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textAlign: "center",
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

const InfoBox = styled(Box)({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  gap: "10px",
  alignItems: "center",
});

const Picture = styled("img")(({ theme }) => ({
  maxHeight: "45px",
  aspectRatio: 1,
  borderRadius: "50px",
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const RestContainer = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "5px",
  alignItems: "flex-start",
});

const Name = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textAlign: "center",
});

const Email = styled(Typography)(({ theme }) => ({
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Status = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  padding: "4px 16px",
  color: "whitesmoke",
  backgroundColor: theme.palette[posColor].main,
  borderRadius: "50px",
  width: "fit-content",
  margin: "0 auto",
}));

export default function Row({
  email,
  jobType,
  name,
  period,
  position,
  profilePic,
  rateType,
  salary,
  status,
}: PayrollData) {
  const { t, i18n } = useTranslation("payroll");
  const lang = i18n.language as TLanguage;

  return (
    <RowWrapper>
      <Col>
        <InfoBox>
          <Picture src={profilePic ?? ""} />
          <RestContainer>
            <Name>{name[lang]}</Name>
            <Email>{email}</Email>
          </RestContainer>
        </InfoBox>
      </Col>
      <Col>{t(`table.body.positions.${position}`)}</Col>
      <Col>{t(`table.body.rate.${rateType}`)}</Col>
      <Col>{formatDate(period[0], lang)}</Col>
      <Col>{t(`table.body.jobType.${jobType}`)}</Col>
      <Col>
        {CURRENCIES[lang]}
        {salary}
      </Col>
      <Col>
        <Status posColor={StatusColor[status]}>
          {t(`table.body.status.${status}`)}
        </Status>
      </Col>
    </RowWrapper>
  );
}
