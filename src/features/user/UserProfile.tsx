import { Box, styled } from "@mui/material";

const UserProfileWrapper = styled(Box)({
  width: "100%",
  aspectRatio: "5/3",
  border: "1px solid white",
});

export default function UserProfile() {
  return <UserProfileWrapper>UserProfile</UserProfileWrapper>;
}
