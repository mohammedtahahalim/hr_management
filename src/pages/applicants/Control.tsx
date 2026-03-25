import { Box, IconButton, styled, Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  selectApplicantLastPage,
  selectApplicantStatus,
} from "./table/applicantSlice";
import WithSkeleton from "../../shared/ui/WithSkeleton";
import { useCallback } from "react";

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
  const { t } = useTranslation("applicants");
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = Number(searchParams.get("page") ?? "1");
  const navigate = useNavigate();
  const status = useSelector(selectApplicantStatus);
  const lastPage = useSelector(selectApplicantLastPage);
  const isLoading = status === "loading";

  const navigatePage = useCallback(
    (dir: "prev" | "next") => {
      const params = new URLSearchParams(search);
      const currentPage = Number(params.get("page") ?? "1");

      params.set(
        "page",
        dir === "prev"
          ? String(Math.max(currentPage - 1, 1))
          : String(Math.min(currentPage + 1, lastPage ?? currentPage + 1)),
      );

      navigate({ pathname, search: params.toString() });
    },
    [search, pathname, navigate],
  );

  return (
    <ControlWrapper>
      <PrevPage
        onClick={() => navigatePage("prev")}
        aria-label={t("prevPage")}
        disabled={isLoading || page === 1}
      >
        <WestIcon sx={{ fontSize: "1rem" }} />
      </PrevPage>
      <WithSkeleton
        loading={isLoading}
        sx={{ height: "27px", maxWidth: "27px" }}
      >
        <Page aria-label={`${t("currentPage")}:${page}`} aria-live="polite">
          {page}
        </Page>
      </WithSkeleton>
      <NextPage
        onClick={() => navigatePage("next")}
        aria-label={t("nextPage")}
        disabled={isLoading || page === lastPage}
      >
        <EastIcon sx={{ fontSize: "1rem" }} />
      </NextPage>
    </ControlWrapper>
  );
}
