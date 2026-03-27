import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectDistributions, selectTotal } from "./distributionSlice";
import { useTranslation } from "react-i18next";
import { departmentColor } from "../../../shared/lib/constants";
import type { DeptColor } from "../../../shared/lib/types";

const StatsWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  overflowY: "scroll",
  scrollbarWidth: "none",
  maxHeight: "300px",
  padding: "10px",
});

const All = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
});

const BarsWrapper = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const Bar = styled(Box)({
  width: "100%",
  height: "65px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "5px",
});

const BarText = styled(Box)({
  fontFamily: "system-ui",
  textTransform: "capitalize",
  fontSize: "1.1rem",
  fontWeight: "bold",
});

const Empty = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "10px",
  borderRadius: "50px",
  backgroundColor: theme.palette.background.default,
  overflow: "hidden",
}));

const Fill = styled(Box, {
  shouldForwardProp: (prop) => prop !== "amount" && prop !== "deptColor",
})<{ amount: number; deptColor: DeptColor }>(
  ({ theme, amount, deptColor }) => ({
    height: "100%",
    width: `${amount}%`,
    backgroundColor: theme.palette[deptColor].main,
  }),
);

export default function Stats() {
  const distributions = useSelector(selectDistributions);
  const total = useSelector(selectTotal);
  const { t } = useTranslation("dashboard");

  return (
    <StatsWrapper tabIndex={-1}>
      <All variant="h6" tabIndex={0}>
        {total} {t("distributions.total")}
      </All>
      <BarsWrapper>
        {distributions?.map((d) => {
          return (
            <Bar
              key={d.deptName}
              tabIndex={0}
              aria-label={`${t(`departments.departmentsName.${d.deptName}`)} ${d.percentage}%`}
            >
              <BarText>
                {t(`departments.departmentsName.${d.deptName}`)} {d.percentage}%
              </BarText>
              <Empty>
                <Fill
                  amount={d.percentage}
                  deptColor={departmentColor(d.deptName)}
                />
              </Empty>
            </Bar>
          );
        })}
      </BarsWrapper>
    </StatsWrapper>
  );
}
