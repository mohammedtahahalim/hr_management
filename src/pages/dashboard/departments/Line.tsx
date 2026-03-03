import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const randomNumber = () => Math.floor(Math.random() * 5);

const randomDepartment = () => {
  const all = ["development", "sales", "management", "analytics", "finance"];
  return all[Math.floor(Math.random() * all.length)];
};

const LineWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "55px",
  borderRadius: "10px",
  margin: "5px 0px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: theme.palette.fourth.contrastText,
  padding: "0px 8px",
  color: theme.palette.fourth.main,
}));

const Title = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "system-ui",
  color: "inherit",
});

const Applications = styled(Box)({
  flex: 1,
  display: "flex",
  gap: "5px",
  alignItems: "center",
  overflow: "hidden",
});

const ProfileSnippet = styled(Box)({
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  gap: "5px",
  overflow: "hidden",
});

const Profile = styled(Box)({
  height: "35px",
  aspectRatio: "1",
  borderRadius: "50%",
  zIndex: 4,
  backgroundColor: "#d8d8d8",
  "&:first-of-type": {
    translate: "150% 0%",
    zIndex: 1,
  },
  "&:nth-of-type(2)": {
    translate: "100% 0%",
    zIndex: 2,
  },
  "&:nth-of-type(3)": {
    translate: "50% 0%",
    zIndex: 3,
  },
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const New = styled(Box)(({ theme }) => ({
  borderRadius: "5px",
  padding: "1px 3px",
  fontFamily: "system-ui",
  fontSize: "0.8rem",
  minWidth: "50px",
  backgroundColor: theme.palette.fourth.main,
  color: "whitesmoke",
}));

export default function Line() {
  const { t } = useTranslation("dashboard");
  const num = randomNumber();
  const dep = randomDepartment();
  return (
    <LineWrapper>
      <Title variant="body1">{t(`departments.departmentsName.${dep}`)}</Title>
      <Applications>
        <ProfileSnippet>
          <Profile>
            <Image src="https://api.dicebear.com/7.x/adventurer/svg?seed=Taha" />
          </Profile>
          <Profile>
            <Image src="https://api.dicebear.com/7.x/adventurer/svg?seed=John" />
          </Profile>
          <Profile>
            <Image src="https://api.dicebear.com/7.x/adventurer/svg?seed=Imane" />
          </Profile>
          <Profile>
            <Image src="https://api.dicebear.com/7.x/adventurer/svg?seed=Guillermo" />
          </Profile>
        </ProfileSnippet>
        {!!num && (
          <New>
            {num}+ {t("departments.new")}
          </New>
        )}
      </Applications>
    </LineWrapper>
  );
}
