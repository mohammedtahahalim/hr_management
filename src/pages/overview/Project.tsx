import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectOverviewProject } from "./overviewSlice";
import WaitMode from "./WaitMode";
import Title from "../../shared/ui/Title";
import type { PositionColor } from "../../shared/lib/types";

const colors: PositionColor[] = ["first", "second", "third", "fourth"];

const ProjectWrapper = styled(Box)(({ theme }) => ({
  minWidth: "350px",
  flex: 1,
  minHeight: "250px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
}));

const TitleWrapper = styled(Box)({
  padding: "10px 20px",
});

const Projects = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  alignItems: "center",
  padding: "10px 20px",
});

const ProjectBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  flex: 1,
  height: "40%",
  minHeight: "100px",
  minWidth: "40%",
  borderRadius: "8px",
  backgroundColor: theme.palette[posColor].light,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "5px",
  padding: "10px",
}));

const Number = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: "black",
});

const Content = styled(Typography)({
  fontFamily: "system-ui",
  textTransform: "capitalize",
  fontSize: "0.8rem",
  color: "black",
});

const Percentage = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "8px",
  borderRadius: "50px",
  alignSelf: "center",
  backgroundColor: theme.palette.background.paper,
  overflow: "hidden",
}));

const Fill = styled(Box, {
  shouldForwardProp: (prop) => prop !== "fill" && prop !== "posColor",
})<{ fill: number; posColor: PositionColor }>(({ theme, fill, posColor }) => ({
  width: `${fill}%`,
  height: "100%",
  backgroundColor: theme.palette[posColor].main,
}));

export default function Project() {
  const { t } = useTranslation("overview");
  const projects = useSelector(selectOverviewProject) ?? [];

  return (
    <ProjectWrapper>
      <WaitMode>
        <>
          <TitleWrapper>
            <Title ender={false}>{t("projects.title")}</Title>
          </TitleWrapper>
          <Projects>
            {projects.map((p, idx) => {
              return (
                <ProjectBox key={p.name} posColor={colors[idx]}>
                  <Number variant="h6">
                    {p.total} {p.name === "progress" ? "%" : ""}
                  </Number>
                  <Content variant="subtitle1">
                    {t(`projects.${p.name}`)}
                  </Content>
                  <Percentage>
                    <Fill fill={p.percentage} posColor={colors[idx]} />
                  </Percentage>
                </ProjectBox>
              );
            })}
          </Projects>
        </>
      </WaitMode>
    </ProjectWrapper>
  );
}
