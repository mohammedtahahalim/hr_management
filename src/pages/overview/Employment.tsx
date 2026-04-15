import { Box, styled, Typography } from "@mui/material";
import WaitMode from "./WaitMode";
import { useTranslation } from "react-i18next";
import Title from "../../shared/ui/Title";
import { useSelector } from "react-redux";
import { selectOverviewEmployment } from "./overviewSlice";

const EmployementWrapper = styled(Box)(({ theme }) => ({
  minWidth: "350px",
  flex: 1,
  minHeight: "250px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  overflow: "hidden",
}));

const EmploymentBox = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "15px",
});

const Total = styled(Box)({
  width: "100%",
  minHeight: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
});

const Stats = styled(Box)({
  flex: 1,
  display: "flex",
  gap: "5px",
});

const FullTime = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
});

const PartTime = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
});

const Number = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "1.6rem",
  fontWeight: "bold",
  textTransform: "uppercase",
});

const Content = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "uppercase",
});

export default function Employment() {
  const { t } = useTranslation("overview");
  const employment = useSelector(selectOverviewEmployment);

  return (
    <EmployementWrapper>
      <WaitMode>
        <EmploymentBox>
          <Title ender={false}>{t("employment.title")}</Title>
          <Total>
            <Number variant="h6">{employment?.total}</Number>
            <Content variant="body1">{t("employment.total")}</Content>
          </Total>
          <Stats>
            <FullTime>
              <Number>{employment?.fullTime}%</Number>
              <Content>{t("employment.fullTime")}</Content>
            </FullTime>
            <PartTime>
              <Number>{employment?.partTime}%</Number>
              <Content>{t("employment.partTime")}</Content>
            </PartTime>
          </Stats>
        </EmploymentBox>
      </WaitMode>
    </EmployementWrapper>
  );
}
