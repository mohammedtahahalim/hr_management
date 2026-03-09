import { Box, Button, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { displayControlPages } from "../../../shared/lib/helpers";
import { useSelector } from "react-redux";
import { selectVacancieLastPage } from "../vacancieSlice";

const ControlWrapper = styled(Box)({
  width: "100%",
  height: "48px",
  border: "1px solid black",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "8px",
  padding: "0px 10px",
});

const Page = styled(Button)({
  height: "90%",
  aspectRatio: 1,
  minWidth: 0,
});

export default function Control() {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const page = new URLSearchParams(search).get("page") ?? 1;
  const lastPage = useSelector(selectVacancieLastPage);

  const changePage = (newPage: string | number) => {
    const params = new URLSearchParams(search);
    params.set("page", String(newPage));
    navigate({
      pathname,
      search: `?${params}`,
    });
  };

  const displayPages = displayControlPages(Number(page), lastPage ?? 11);

  return (
    <ControlWrapper>
      {displayPages.map((p) => {
        return (
          <Page
            key={p}
            variant={page == p ? "contained" : "outlined"}
            onClick={() => changePage(p)}
          >
            {p}
          </Page>
        );
      })}
    </ControlWrapper>
  );
}
