import { Box, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import NavItem from "../../shared/ui/NavItem";

export interface INavItem {
  item: string;
  link: string;
}

const NavMenuWrapper = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
});

export default function NavMenu() {
  const { t } = useTranslation("sidebar");
  const navElements = t("navMenu", { returnObjects: true }) as INavItem[];
  return (
    <NavMenuWrapper>
      {Array.isArray(navElements) &&
        navElements.map((nav) => {
          return <NavItem {...nav} key={nav.item} />;
        })}
    </NavMenuWrapper>
  );
}
