import { Box, Button, styled, Typography } from "@mui/material";
import type { Employee } from "./allEmployeeSlice";
import { useNavigate } from "react-router-dom";
import type { PositionColor } from "../../shared/lib/types";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../config/i18n";
import { formatDate } from "../../shared/lib/helpers";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const statusColors: Record<Employee["status"], PositionColor> = {
  active: "fourth",
  onleave: "third",
  remote: "second",
  terminated: "first",
};

const CardWrapper = styled(Box)({
  width: "325px",
  "&:hover .rainbow-border::before": {
    opacity: 1,
    animation: "rainbowShift 4s linear infinite",
    transition: "all 0.1s ease-in-out",
  },
  "@keyframes rainbowShift": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
});

const FakeBox = styled(Box)({
  width: "100%",
  height: "fit-content",
  borderRadius: "12px",
  padding: "2px",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    background: `conic-gradient(
      red,
      orange,
      yellow,
      green,
      cyan,
      blue,
      violet,
      red
    )`,
    opacity: 0,
    zIndex: 0,
    backgroundSize: "200% 200%",
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
});

const RealBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "10px 20px",
  backgroundColor: theme.palette.background.default,
}));

const Status = styled(Box, {
  shouldForwardProp: (prop) => prop !== "clr",
})<{ clr: PositionColor }>(({ theme, clr }) => ({
  padding: "4px 8px",
  color: theme.palette[clr].main,
  borderRadius: "50px",
  fontFamily: "system-ui",
  fontSize: "0.8rem",
  border: `1px solid ${theme.palette[clr].main}`,
  alignSelf: "flex-end",
}));

const Personal = styled(Box)({
  width: "100%",
  height: "70px",
  display: "flex",
  gap: "15px",
});

const Picture = styled(Box)(({ theme }) => ({
  height: "100%",
  aspectRatio: "1",
  overflow: "hidden",
  borderRadius: "50px",
  border: `3px solid ${theme.palette.divider}`,
}));

const NamePosWrapper = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "2px",
});

const Name = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "1rem",
});

const Position = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
  fontSize: "1rem",
});

const Company = styled(Box)({
  width: "100%",
  height: "60px",
  display: "flex",
  gap: "10px",
});

const CompanyBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ isArabic }) => ({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "2px",
  ...(isArabic ? { paddingRight: "15px" } : { paddingLeft: "15px" }),
}));

const Title = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "0.9rem",
});

const Content = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
  fontSize: "0.8rem",
});

const Contact = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "80px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
}));

const ContactBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ theme, isArabic }) => ({
  flex: 1,
  ...(isArabic ? { paddingRight: "15px" } : { paddingLeft: "15px" }),
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  display: "flex",
  alignItems: "center",
  color: "gray",
  gap: "10px",
  textTransform: "lowercase",
  "&:first-of-type": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const ButtonBoxes = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: "10px",
});

const CustomButton = styled(Button)({
  width: "40%",
  borderRadius: "50px",
  alignSelf: "center",
  minHeight: "0px",
  padding: "4px 10px",
  fontFamily: "system-ui",
  textTransform: "capitalize",
});

export default function Card({
  id,
  name,
  position,
  department,
  email,
  status,
  phoneNumber,
  joinDate,
  profilePicture,
}: Employee) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("employees");
  const lang = i18n.language as TLanguage;

  return (
    <CardWrapper>
      <FakeBox className="rainbow-border">
        <RealBox>
          <Status clr={statusColors[status]}>
            {t(`table.bodyCells.statuses.${status}`)}
          </Status>
          <Personal>
            <Picture>
              <img src={profilePicture ?? ""} alt="" />
            </Picture>
            <NamePosWrapper>
              <Name>{name[lang]}</Name>
              <Position>{t(`table.bodyCells.positions.${position}`)}</Position>
            </NamePosWrapper>
          </Personal>
          <Company>
            <CompanyBox isArabic={lang === "ar"}>
              <Title>{t("cards.department")}</Title>
              <Content>
                {t(`table.bodyCells.departments.${department}`)}
              </Content>
            </CompanyBox>
            <CompanyBox isArabic={lang === "ar"}>
              <Title>{t("cards.joinDate")}</Title>
              <Content>{formatDate(joinDate, lang)}</Content>
            </CompanyBox>
          </Company>
          <Contact>
            <ContactBox isArabic={lang === "ar"}>
              <EmailIcon sx={{ fontSize: "inherit" }} color="inherit" />
              <Typography fontFamily={"inherit"} fontSize={"inherit"}>
                {email}
              </Typography>
            </ContactBox>
            <ContactBox isArabic={lang === "ar"}>
              <PhoneIcon sx={{ fontSize: "inherit" }} color="inherit" />
              <Typography fontFamily={"inherit"} fontSize={"inherit"}>
                {phoneNumber}
              </Typography>
            </ContactBox>
          </Contact>
          <ButtonBoxes>
            <CustomButton
              onClick={() => navigate(`/employees/${id}?mode=edit`)}
              variant="contained"
              sx={{ backgroundColor: "gray" }}
            >
              {t("cards.edit")}
            </CustomButton>
            <CustomButton
              onClick={() => navigate(`/employees/${id}?mode=view`)}
              variant="contained"
              color={"primary"}
            >
              {t("cards.view")}
            </CustomButton>
          </ButtonBoxes>
        </RealBox>
      </FakeBox>
    </CardWrapper>
  );
}
