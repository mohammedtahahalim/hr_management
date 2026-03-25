import { Box, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { selectDetailSkills, selectDetailStatus } from "./detailSlice";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import Title from "../../../../shared/ui/Title";
import { useTranslation } from "react-i18next";

const SkillsWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: "12px",
  backgroundColor: theme.palette.divider,
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
}));

const List = styled("ul")({
  listStyleType: "none",
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
});

const Item = styled("li")(({ theme }) => ({
  padding: "6px 10px",
  backgroundColor: theme.palette.background.default,
  color: "inherit",
  fontSize: "0.8rem",
  borderRadius: "50px",
  fontWeight: "bold",
}));

export default function Skills() {
  const { t } = useTranslation("applicants");
  const status = useSelector(selectDetailStatus);
  const skills = useSelector(selectDetailSkills);

  return (
    <SkillsWrapper>
      <WithSkeleton loading={status === "loading"}>
        <>
          <Title variant="h6" ender={false}>
            {t(`details.skills.title`)}
          </Title>
          <List>
            {skills?.map((s) => {
              return <Item key={s}>{t(`details.skills.${s}`)}</Item>;
            })}
          </List>
        </>
      </WithSkeleton>
    </SkillsWrapper>
  );
}
