import { Button, styled, type ButtonProps } from "@mui/material";
import type { INavItem } from "../../layouts/sidebar/NavMenu";
import { NavLink, useLocation } from "react-router-dom";
import { navIcons } from "../lib/constants";
import AbcIcon from "@mui/icons-material/Abc";

const NavLinkButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<ButtonProps & { to: string; isActive: boolean }>(({ theme, isActive }) => ({
  backgroundColor: isActive ? theme.palette.fourth.light : "transparent",
  width: "75%",
  borderRadius: "50px",
  color: isActive
    ? theme.palette.second.main
    : theme.palette.fourth.contrastText,
  textTransform: "capitalize",
  fontFamily: "system-ui",
  fontWeight: "bold",
  textAlign: "left",
  fontSize: "1rem",
  justifyContent: "flex-start",
  padding: "8px 35px",
}));

export default function NavItem({ item, link }: INavItem) {
  const { pathname } = useLocation();

  const Icon = link in navIcons ? navIcons[link] : AbcIcon;

  return (
    <NavLinkButton
      variant="text"
      component={NavLink}
      to={link}
      isActive={pathname === link}
      startIcon={<Icon />}
    >
      {item}
    </NavLinkButton>
  );
}
