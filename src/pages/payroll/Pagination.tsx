import { Box, IconButton, styled, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPayrollLastPage, selectPayrollStatus } from "./payrollSlice";
import { useTranslation } from "react-i18next";
import WithSkeleton from "../../shared/ui/WithSkeleton";

const DEFAULT_PAGE = 1;
const DEFAULT_LAST_PAGE = 8;

const PaginationWrapper = styled(Box)({
  height: "100%",
  display: "flex",
  gap: "5px",
  alignItems: "center",
});

const ArrowWrapper = styled(IconButton)({
  fontSize: "0.9rem",
});

const Page = styled(Box)(({ theme }) => ({
  fontFamily: "system-ui",
  fontSize: "0.8rem",
  height: "65%",
  aspectRatio: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "5px",
}));

export default function Pagination() {
  const { t, i18n } = useTranslation("payroll");
  const isArabic = i18n.language === "ar";
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? DEFAULT_PAGE);
  const lastPage = useSelector(selectPayrollLastPage) ?? DEFAULT_LAST_PAGE;
  const status = useSelector(selectPayrollStatus);
  const isLoading = status === "loading";

  const updatePage = (dir: "next" | "prev") => {
    setSearchParams((searchParams) => {
      searchParams.set(
        "page",
        String(
          dir === "next" ? Math.min(page + 1, lastPage) : Math.max(page - 1, 1),
        ),
      );
      return searchParams;
    });
  };

  return (
    <PaginationWrapper>
      <ArrowWrapper
        disabled={page === 1 || isLoading}
        onClick={() => updatePage("prev")}
        aria-label={t("control.pagination.prevPage")}
      >
        {isArabic ? (
          <EastIcon fontSize="inherit" />
        ) : (
          <WestIcon fontSize="inherit" />
        )}
      </ArrowWrapper>
      <Page>
        <WithSkeleton loading={isLoading} sx={{ borderRadius: "5px" }}>
          <Typography fontFamily={"inherit"} fontSize={"inherit"}>
            {page}
          </Typography>
        </WithSkeleton>
      </Page>
      <ArrowWrapper
        disabled={page === lastPage || isLoading}
        onClick={() => updatePage("next")}
        aria-label={t("control.pagination.nextPage")}
      >
        {isArabic ? (
          <WestIcon fontSize="inherit" />
        ) : (
          <EastIcon fontSize="inherit" />
        )}
      </ArrowWrapper>
    </PaginationWrapper>
  );
}
