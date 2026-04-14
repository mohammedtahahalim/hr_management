import { Box, styled, Typography } from "@mui/material";
import Title from "../../shared/ui/Title";
import type { PositionColor } from "../../shared/lib/types";
import { useSelector } from "react-redux";
import { selectOverviewMain } from "./overviewSlice";
import WaitMode from "./WaitMode";
import { useTranslation } from "react-i18next";

const colors: PositionColor[] = ["second", "first", "third"];

const StatsWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  minHeight: "175px",
});

const StatsBox = styled(Box)({
  flex: 1,
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
});

const Stat = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  minWidth: "300px",
  flex: 1,
  borderRadius: "6px",
  backgroundColor: theme.palette[posColor].light,
  display: "flex",
  gap: "10px",
  minHeight: "100px",
}));

const Numbers = styled(Box)({
  flex: 1.5,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  padding: "5px 10px",
});

const StatTitle = styled(Typography)({
  fontFamily: "system-ui",
  padding: "10px",
  fontSize: "0.9rem",
  fontWeight: "bold",
});

const Percentage = styled(Box)({
  flex: 0.5,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Info = styled(Box)({
  display: "flex",
  gap: "20px",
  alignItems: "center",
});

const Total = styled(Typography)({
  fontFamily: "system-ui",
});

const Change = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  padding: "0px 8px",
  borderRadius: "50px",
  backgroundColor: theme.palette[posColor].main,
  height: "fit-content",
  maxHeight: "25px",
  fontSize: "0.8rem",
  color: "whitesmoke",
}));

const BigText = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  color: "black",
});

export default function Stats() {
  const { t } = useTranslation("overview");
  const overviewStats = useSelector(selectOverviewMain);

  return (
    <StatsWrapper>
      <Title ender={false}>{t("title")}</Title>
      <WaitMode>
        <StatsBox>
          {Array.isArray(overviewStats) &&
            overviewStats.map((s, idx) => {
              return (
                <Stat key={s.name} posColor={colors[idx]}>
                  <Numbers>
                    <StatTitle>{t(`stats.${s.name}`)}</StatTitle>
                    <Info>
                      <Total variant="h4">{s.total}</Total>
                      <Change variant="subtitle1" posColor={colors[idx]}>
                        {s.percentage}%
                      </Change>
                    </Info>
                  </Numbers>
                  <Percentage>
                    <BigText variant="h6">{s.percentage}%</BigText>
                  </Percentage>
                </Stat>
              );
            })}
        </StatsBox>
      </WaitMode>
    </StatsWrapper>
  );
}
