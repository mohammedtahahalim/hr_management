import { Box, styled, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useTranslation } from "react-i18next";

const UserProfileWrapper = styled(Box)({
  width: "100%",
  aspectRatio: "5/3",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "10px",
});

const PictureWrapper = styled(Box)({
  width: "75px",
  aspectRatio: "1",
  borderRadius: "50px",
  overflow: "hidden",
  border: "1px solid white",
});

const Picture = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const Info = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const Name = styled(Typography)({
  fontFamily: "system-ui",
  textTransform: "capitalize",
  color: "whitesmoke",
  fontWeight: "bold",
  lineHeight: "1.25rem",
  fontSize: "1.1rem",
});

const Email = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "whitesmoke",
  fontSize: "0.8rem",
  lineHeight: "1.25rem",
});

export default function UserProfile() {
  const { firstName, lastName, email, profilePic } = useContext(AuthContext)
    .whoIs ?? {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    profilePic: "https://thispersondoesnotexist.com/",
  };
  const { t } = useTranslation("a11y");

  return (
    <UserProfileWrapper>
      <PictureWrapper>
        <Picture src={profilePic} alt={`${t("profile_label")}`} />
      </PictureWrapper>
      <Info>
        <Name variant="subtitle1">{`${firstName} ${lastName}`}</Name>
        <Email variant="subtitle1">{email}</Email>
      </Info>
    </UserProfileWrapper>
  );
}
