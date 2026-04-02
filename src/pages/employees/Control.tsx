import { Box, styled, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import WithSkeleton from "../../shared/ui/WithSkeleton";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAllEmployeeStatus,
  selectEmployeeLastPage,
} from "./allEmployeeSlice";

const ControlWrapper = styled(Box)({
  width: "100%",
  height: "40px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  "& > *": {
    height: "70%",
    aspectRatio: "1",
  },
});

const PrevPage = styled(IconButton)({});

const Page = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  height: "27.5px",
  maxWidth: "27.5px",
  borderRadius: "4px",
  backgroundColor: theme.palette.background.paper,
}));

const NextPage = styled(IconButton)({});

export default function Control() {
  const { t } = useTranslation("employees");
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);
  const status = useSelector(selectAllEmployeeStatus);
  const page = Number(searchParams.get("page") ?? "1");
  const lastPage = useSelector(selectEmployeeLastPage);
  const navigate = useNavigate();
  const isLoading = status === "loading";

  const movePage = (dir: "next" | "prev") => {
    const next = Math.min(Number(page) + 1, lastPage ?? Number(page) + 1);
    const prev = Math.max(1, Number(page) - 1);
    searchParams.set("page", dir === "next" ? String(next) : String(prev));
    navigate({
      pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <ControlWrapper>
      <PrevPage
        aria-label={t("control.prevPage")}
        onClick={() => movePage("prev")}
        disabled={isLoading || page === 1}
      >
        <WestIcon sx={{ fontSize: "1rem" }} />
      </PrevPage>
      <WithSkeleton
        loading={isLoading}
        sx={{ height: "27px", maxWidth: "27px" }}
      >
        <Page
          aria-label={`${t("control.currentPage")}:${page}`}
          aria-live="polite"
        >
          {page}
        </Page>
      </WithSkeleton>
      <NextPage
        aria-label={t("control.nextPage")}
        onClick={() => movePage("next")}
        disabled={isLoading || page === lastPage}
      >
        <EastIcon sx={{ fontSize: "1rem" }} />
      </NextPage>
    </ControlWrapper>
  );
}
