import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectDetailName,
  selectDetailPersonal,
  selectDetailStatus,
} from "./detailSlice";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../../config/i18n";
import { formatDate } from "../../../../shared/lib/helpers";

const PersonalWrapper = styled(Box)(({ theme }) => ({
  minHeight: "300px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "12px",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
}));

const Block = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  gap: "5px",
  alignItems: "center",
  maxHeight: "50px",
  padding: "2px 15px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Title = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  fontWeight: "bold",
  textWrap: "nowrap",
});

const Content = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "0.95rem",
  fontStyle: "italic",
});

export default function Personal() {
  const { t, i18n } = useTranslation("applicants");
  const status = useSelector(selectDetailStatus);
  const data = useSelector(selectDetailPersonal);
  const name = useSelector(selectDetailName);

  return (
    <PersonalWrapper>
      <WithSkeleton
        loading={status === "loading"}
        sx={{ borderRadius: "12px" }}
      >
        <>
          <Block>
            <Title variant="subtitle1">{t(`details.personal.name`)} :</Title>
            <Content>{name && name[i18n.language as TLanguage]}</Content>
          </Block>
          {data &&
            Object.keys(data).map((f) => {
              return (
                <Block key={f}>
                  <Title variant="subtitle1">
                    {t(`details.personal.${f}`)} :
                  </Title>
                  <Content>
                    {f === "appliedDate"
                      ? formatDate(data[f], i18n.language as TLanguage)
                      : data[f as keyof typeof data]}
                  </Content>
                </Block>
              );
            })}
        </>
      </WithSkeleton>
    </PersonalWrapper>
  );
}
