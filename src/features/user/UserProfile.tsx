import { Box, styled, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

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
  const { firstName, lastName, email } = useContext(AuthContext).whoIs ?? {
    firstName: "",
    lastName: "",
    email: "",
  };
  return (
    <UserProfileWrapper>
      <PictureWrapper>
        <Picture src="https://avatar.iran.liara.run/public" alt="Name" />
      </PictureWrapper>
      <Info>
        <Name variant="subtitle1">{`${firstName} ${lastName}`}</Name>
        <Email variant="subtitle1">{email}</Email>
      </Info>
    </UserProfileWrapper>
  );
}
