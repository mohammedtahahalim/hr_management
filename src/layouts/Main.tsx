import { Box, Container, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./Header";

const MainWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
});

const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: "275px",
  height: "100%",
  padding: "25px 10px",
  backgroundColor: theme.palette.secondary.main,
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const BodyWrapper = styled(Box)({
  flex: "1",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const HeaderWrapper = styled(Box)({
  width: "100%",
  height: "75px",
  padding: "10px 25px",
  border: "1px solid black",
});

const OutletWrapper = styled(Container)({
  width: "100%",
  flex: "1",
  border: "1px solid black",
});

export default function Main() {
  return (
    <MainWrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <BodyWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <OutletWrapper maxWidth="lg">
          <Outlet />
        </OutletWrapper>
      </BodyWrapper>
    </MainWrapper>
  );
}
