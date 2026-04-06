import { Box, MenuItem, Select, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectPayrollStatus } from "./payrollSlice";

const DEFAULT_PAGE_SIZE = 8;

const PagesizeWrapper = styled(Box)({
  height: "65%",
  alignSelf: "center",
});

const PagesizeSelect = styled(Select)({
  fontFamily: "system-ui",
  textTransform: "capitalize",
  fontSize: "0.9rem",
  height: "100%",
});

const PagesizeOption = styled(MenuItem)({});

export default function Pagesize() {
  const { t } = useTranslation("payroll");
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE);
  const status = useSelector(selectPayrollStatus);

  const updatePageSize = (e: unknown) => {
    if (typeof e !== "string" && typeof e !== "number") return;
    setSearchParams((searchParams) => {
      searchParams.set("pageSize", String(e));
      return searchParams;
    });
  };

  return (
    <PagesizeWrapper>
      <PagesizeSelect
        size="small"
        value={pageSize}
        onChange={(e) => updatePageSize(e.target.value)}
        renderValue={(value: unknown) => {
          return `${t("control.pageSize.show")}  ${value}`;
        }}
        disabled={status === "loading"}
      >
        <PagesizeOption value={8}>
          {t("control.pageSize.show")} 8
        </PagesizeOption>
        <PagesizeOption value={12}>
          {t("control.pageSize.show")} 12
        </PagesizeOption>
        <PagesizeOption value={16}>
          {t("control.pageSize.show")} 16
        </PagesizeOption>
        <PagesizeOption value={20}>
          {t("control.pageSize.show")} 20
        </PagesizeOption>
      </PagesizeSelect>
    </PagesizeWrapper>
  );
}
