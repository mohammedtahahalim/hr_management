import { Box, styled } from "@mui/material";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import { selectDetailExperience, selectDetailStatus } from "./detailSlice";
import Experience from "./Experience";
import Title from "../../../../shared/ui/Title";
import { useTranslation } from "react-i18next";

const ProfessionalWrapper = styled(Box)({
  flex: 1,
  minWidth: "300px",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export default function Professional() {
  const { t } = useTranslation("applicants");
  const status = useSelector(selectDetailStatus);
  const professionalExperience = useSelector(selectDetailExperience);

  return (
    <ProfessionalWrapper>
      <WithSkeleton
        loading={status === "loading"}
        sx={{ borderRadius: "12px" }}
      >
        <Title variant="body1" ender={false}>
          {t("details.experience.title")}
        </Title>
        {professionalExperience?.map((p, index) => {
          return <Experience key={index} {...p} />;
        })}
      </WithSkeleton>
    </ProfessionalWrapper>
  );
}
