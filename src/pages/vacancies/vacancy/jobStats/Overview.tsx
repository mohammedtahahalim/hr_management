import { Box, styled, type Theme } from "@mui/material";
import Title from "../../../../shared/ui/Title";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectVacancyStatus } from "../vacancySlice";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";

type TOverviewColor = keyof Pick<
  Theme["palette"],
  "overviewOne" | "overviewTwo" | "overviewThree" | "overviewFour"
>;

const OverviewColors: TOverviewColor[] = [
  "overviewOne",
  "overviewTwo",
  "overviewThree",
  "overviewFour",
];
const sampleData = [
  { type: "views", total: 529, newPerc: 10 },
  { type: "apps", total: 529, newPerc: 10 },
  { type: "shortlist", total: 529, newPerc: 10 },
  { type: "progress", total: 529, newPerc: -25 },
];

const OverviewWrapper = styled(Box)({
  flex: 1,
  minWidth: "325px",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const BoxesWrapper = styled(Box)({
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  justifyContent: "center",
});

const OverviewBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{
  bgColor: TOverviewColor;
}>(({ theme, bgColor }) => ({
  width: "150px",
  height: "80px",
  borderRadius: "12px",
  backgroundColor: theme.palette[bgColor].main,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "5px",
  alignItems: "center",
  textTransform: "capitalize",
}));

const BoxTitle = styled(Box)({
  width: "100%",
  paddingLeft: "10px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const Stats = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

const NewBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: "success" | "error" }>(({ theme, bgColor }) => ({
  width: "45px",
  height: "25px",
  borderRadius: "12px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  backgroundColor: theme.palette[bgColor].light,
  fontFamily: "system-ui",
  fontSize: "0.8rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function Overview() {
  const { t } = useTranslation("vacancy");
  const status = useSelector(selectVacancyStatus);

  return (
    <OverviewWrapper>
      <Title variant="h5" ender={false}>
        {t("overview")}
      </Title>
      <WithSkeleton
        loading={status === "loading"}
        sx={{ maxWidth: "310px", alignSelf: "center" }}
      >
        <BoxesWrapper>
          {sampleData.map((s, idx) => {
            return (
              <OverviewBox key={s.type} bgColor={OverviewColors[idx]}>
                <BoxTitle>
                  <Title variant="body2" ender={false}>
                    {t(`${s.type}`)}
                  </Title>
                </BoxTitle>
                <Stats>
                  <Title variant="h6" ender={false}>
                    {String(s.total)}
                  </Title>
                  <NewBox bgColor={s.newPerc > 0 ? "success" : "error"}>
                    {s.newPerc > 0 ? (
                      <NorthIcon sx={{ fontSize: "0.8rem" }} />
                    ) : (
                      <SouthIcon sx={{ fontSize: "0.8rem" }} />
                    )}
                    {s.newPerc}%
                  </NewBox>
                </Stats>
              </OverviewBox>
            );
          })}
        </BoxesWrapper>
      </WithSkeleton>
    </OverviewWrapper>
  );
}
