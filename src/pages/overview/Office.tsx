import { Box, styled } from "@mui/material";
import Title from "../../shared/ui/Title";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../config/i18n";
import { MAP_LOCATION } from "../../shared/lib/constants";
import WaitMode from "./WaitMode";

const OfficeWrapper = styled(Box)({
  flex: 1,
  minWidth: "350px",
  minHeight: "250px",
  overflow: "hidden",
  borderRadius: "12px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Map = styled("iframe")({
  width: "100%",
  height: "100%",
  borderRadius: "12px",
});

export default function Office() {
  const { t, i18n } = useTranslation("overview");
  const lang = i18n.language as TLanguage;

  return (
    <OfficeWrapper>
      <WaitMode sx={{ borderRadius: "12px" }}>
        <Title ender={false}>{t("map.title")}</Title>
        <Map src={MAP_LOCATION[lang]} allowFullScreen={true} loading="lazy" />
      </WaitMode>
    </OfficeWrapper>
  );
}
