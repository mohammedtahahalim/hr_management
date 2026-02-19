import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LogoWrapper = styled(Box)({
  width: "80%",
  maxHeight: "80px",
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

export default function Logo() {
  const { t } = useTranslation("a11y");
  return (
    <LogoWrapper>
      <Link to={"/"}>
        <Image src={"/img/logo.webp"} alt={t("logo_label")} />
      </Link>
    </LogoWrapper>
  );
}
