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
      <Link to={"/dashboard"}>
        <Image
          src={
            "https://res.cloudinary.com/dkoixkbyl/image/upload/v1772450545/logo_tfrdvd.avif"
          }
          alt={t("logo_label")}
          fetchPriority="high"
          decoding="async"
        />
      </Link>
    </LogoWrapper>
  );
}
