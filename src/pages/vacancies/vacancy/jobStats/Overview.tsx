import { Box, styled, type Theme } from "@mui/material";
import Title from "../../../../shared/ui/Title";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectOverviews, selectVacancyStatus } from "../vacancySlice";
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

const BoxTitle = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isArabic",
})<{ isArabic: boolean }>(({ isArabic }) => ({
  width: "100%",
  ...(isArabic ? { paddingRight: "10px" } : { paddingLeft: "10px" }),
  overflowX: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

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
  const { t, i18n } = useTranslation("vacancy");
  const status = useSelector(selectVacancyStatus);
  const isArabic = i18n.language === "ar";
  const overviewData = useSelector(selectOverviews);

  return (
    <OverviewWrapper>
      <Title variant="h6" ender={false}>
        {t("overview")}
      </Title>
      <WithSkeleton
        loading={status === "loading"}
        sx={{ maxWidth: "310px", alignSelf: "center", maxHeight: "170px" }}
      >
        <BoxesWrapper>
          {Array.isArray(overviewData) &&
            overviewData.map((s, idx) => {
              return (
                <OverviewBox key={s.type} bgColor={OverviewColors[idx]}>
                  <BoxTitle isArabic={isArabic}>
                    <Title variant="body2" ender={false}>
                      {t(`${s.type}`)}
                    </Title>
                  </BoxTitle>
                  <Stats>
                    <Title variant="h6" ender={false}>
                      {String(s.total)}
                    </Title>
                    {s.new !== 0 && (
                      <NewBox bgColor={s.new > 0 ? "success" : "error"}>
                        {s.new > 0 ? (
                          <NorthIcon sx={{ fontSize: "0.8rem" }} />
                        ) : (
                          <SouthIcon sx={{ fontSize: "0.8rem" }} />
                        )}
                        {s.new}%
                      </NewBox>
                    )}
                  </Stats>
                </OverviewBox>
              );
            })}
        </BoxesWrapper>
      </WithSkeleton>
    </OverviewWrapper>
  );
}
