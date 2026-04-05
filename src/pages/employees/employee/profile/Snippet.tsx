import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectEmployeePersonalInfo } from "../employeeSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../../config/i18n";
import type { PositionColor } from "../../../../shared/lib/types";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { formatDate } from "../../../../shared/lib/helpers";
import { positionsColor } from "../../../../shared/lib/constants";
import WaitEmployeeMode from "../WaitEmployeeMode";

const SnippetWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "10px",
  alignItems: "center",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  padding: "10px",
}));

const CustomT = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "0.9rem",
});

const Top = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "3px",
  alignItems: "center",
});

const Name = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
});

const Position = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  padding: "4px 10px",
  borderRadius: "50px",
  color: "whitesmoke",
  backgroundColor: theme.palette[posColor].main,
}));

const Middle = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  gap: "2px",
});

const CustomB = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "5px 10px",
  gap: "5px",
});

const Content = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.9rem",
});

const Bottom = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "80px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
}));

const Contact = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  display: "flex",
  gap: "8px",
  "&:first-of-type": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  flex: 1,
  alignItems: "center",
  fontSize: "0.85rem",
  ...(isArabic ? { paddingRight: "15px" } : { paddingLeft: "15px" }),
}));

export default function Snippet() {
  const { t, i18n } = useTranslation("employee");
  const lang = i18n.language as TLanguage;
  const isArabic = lang === "ar";
  const snippetInfo = useSelector(selectEmployeePersonalInfo);
  const { name, position, department, joinDate, email, phoneNumber } =
    snippetInfo ?? {};

  return (
    <WaitEmployeeMode>
      <SnippetWrapper>
        <Top>
          <Name>{name && name[lang]}</Name>
          <Position posColor={positionsColor[position ?? "backend"]}>
            <CustomT>{t(`positions.${position}`)}</CustomT>
          </Position>
        </Top>
        <Middle>
          <CustomB>
            <CustomT>{t("departments.title")}</CustomT>
            <Content>{t(`departments.${department}`)}</Content>
          </CustomB>
          <CustomB>
            <CustomT>{t("joinDate")}</CustomT>
            <Content>{joinDate && formatDate(joinDate, lang)}</Content>
          </CustomB>
        </Middle>
        <Bottom>
          <Contact isArabic={isArabic}>
            <EmailIcon fontSize="small" color="primary" />
            <CustomT>{email}</CustomT>
          </Contact>
          <Contact isArabic={isArabic}>
            <PhoneIcon fontSize="small" color="primary" />
            <CustomT>{phoneNumber}</CustomT>
          </Contact>
        </Bottom>
      </SnippetWrapper>
    </WaitEmployeeMode>
  );
}
