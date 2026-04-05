import { Button, styled, type ButtonProps } from "@mui/material";
import type { INavItem } from "../../layouts/sidebar/NavMenu";
import { NavLink, useLocation } from "react-router-dom";
import { navIcons } from "../lib/constants";
import AbcIcon from "@mui/icons-material/Abc";
import { preFetch } from "../lib/helpers";

const NavLinkButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<ButtonProps & { to: string; isActive: boolean }>(({ theme, isActive }) => ({
  backgroundColor: isActive ? theme.palette.fourth.light : "transparent",
  width: "85%",
  borderRadius: "50px",
  color: isActive ? theme.palette.second.main : "whitesmoke",
  textTransform: "capitalize",
  fontFamily: "system-ui",
  fontWeight: "bold",
  textAlign: "left",
  fontSize: "1rem",
  justifyContent: "flex-start",
  padding: "8px 35px",
  transition: "all 0.25s ease-in-out",
}));

export default function NavItem({ item, link }: INavItem) {
  const { pathname } = useLocation();
  const isActive = pathname.split("/")[1] === link.replace("/", "");
  const Icon = link in navIcons ? navIcons[link] : AbcIcon;

  return (
    <NavLinkButton
      variant={"text"}
      component={NavLink}
      to={link}
      isActive={isActive}
      startIcon={<Icon fontSize="large" />}
      onMouseEnter={() => preFetch(link)}
    >
      {item}
    </NavLinkButton>
  );
}
