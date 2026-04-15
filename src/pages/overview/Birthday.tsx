import { Box, styled, Typography } from "@mui/material";
import WaitMode from "./WaitMode";
import Title from "../../shared/ui/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectOverviewBirthday } from "./overviewSlice";
import type { TLanguage } from "../../config/i18n";

const BirthdayWrapper = styled(Box)(({ theme }) => ({
  minWidth: "350px",
  maxWidth: "350px",
  flex: 1,
  minHeight: "250px",
  padding: "10px",
  backgroundColor: theme.palette.first.light,
  borderRadius: "25px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  margin: "0 auto",
}));

const BirthdaySwiper = styled(Swiper)({
  width: "100%",
  flex: 1,
});

const Slide = styled(SwiperSlide)(({ theme }) => ({
  height: "80%",
  width: "175px",
  minHeight: "225px",
  padding: "20px",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  alignItems: "center",
}));

const ProfileWrapper = styled(Box)(({ theme }) => ({
  height: "75px",
  aspectRatio: "1",
  borderRadius: "50px",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
}));

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const Name = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "1.1rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const Position = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
  fontSize: "1rem",
});

const Today = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "0.9rem",
});

const Age = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
});

export default function Birthday() {
  const { t, i18n } = useTranslation("overview");
  const lang = i18n.language as TLanguage;
  const birthdaySlides = useSelector(selectOverviewBirthday) ?? [];
  const doSlidesExists = !!birthdaySlides.length;

  console.log(doSlidesExists, birthdaySlides);

  return (
    <BirthdayWrapper>
      <WaitMode sx={{ borderRadius: "25px" }}>
        <Title ender={false}>{t("birthday.title")}</Title>
        <BirthdaySwiper slidesPerView={"auto"} spaceBetween={10}>
          {birthdaySlides.map((s) => {
            return (
              <Slide key={s.name["en"]}>
                <ProfileWrapper>
                  <Image src={s.profilePicture} alt={s.name["en"]} />
                </ProfileWrapper>
                <Name variant="subtitle1">{s.name[lang]}</Name>
                <Position variant="subtitle2">
                  {t(`birthday.positions.${s.position}`)}
                </Position>
                <Today>{t("birthday.today")}</Today>
                <Age>
                  {s.year} {t("birthday.age")}
                </Age>
              </Slide>
            );
          })}
        </BirthdaySwiper>
      </WaitMode>
    </BirthdayWrapper>
  );
}
