import { Box, styled } from "@mui/material";
import Logo from "../../shared/ui/Logo";
import UserProfile from "../../features/user/UserProfile";
import NavMenu from "./NavMenu";
import Logout from "./Logout";

const SidebarWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  overflowY: "scroll",
  scrollbarWidth: "none",
});

export default function Sidebar() {
  return (
    <SidebarWrapper>
      <Logo />
      <UserProfile />
      <NavMenu />
      <Logout />
    </SidebarWrapper>
  );
}
