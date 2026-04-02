import { alpha, Box, Container, styled } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../features/auth/AuthContext";
import Forbidden from "../shared/ui/Forbidden";
import type { Resource } from "../shared/lib/types";
import { canAccess } from "../shared/lib/permissions";

const MainWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
});

const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: "275px",
  height: "100%",
  padding: "25px 10px",
  backgroundImage: `linear-gradient(to bottom, ${alpha(theme.palette.second.main, 0.9)},${theme.palette.second.main})`,
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const BodyWrapper = styled(Box)({
  flex: "1",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const HeaderWrapper = styled(Box)({
  width: "100%",
  height: "75px",
  padding: "12px 25px",
});

const OutletWrapper = styled(Container)({
  width: "100%",
  flex: "1",
  overflowY: "scroll",
  scrollbarWidth: "none",
});

export default function Main() {
  const { whoIs } = useContext(AuthContext);
  const role = whoIs?.role ?? "candidate";
  const { pathname } = useLocation();
  const firstSegment = pathname.split("?")[0].split("#")[0];
  const resource =
    (firstSegment.split("/").filter(Boolean)[0] as Resource) ?? "dashboard";
  const outletRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outlet = outletRef.current;
    if (!outlet) return;
    outlet.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <MainWrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <BodyWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <OutletWrapper maxWidth="xl" ref={outletRef}>
          {whoIs && canAccess(role, "READ", resource) ? (
            <Outlet />
          ) : (
            <Forbidden />
          )}
        </OutletWrapper>
      </BodyWrapper>
    </MainWrapper>
  );
}
