import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  selectDepartmentData,
  selectDepartmentError,
  selectDepartmentStatus,
} from "./departmentSlice";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import { Virtuoso } from "react-virtuoso";
import Line from "./Line";
import { useTranslation } from "react-i18next";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";
import Title from "../../../shared/ui/Title";
import Reload from "../../../shared/ui/Reload";

const DepartmentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "450px",
  },
}));

const Content = styled(Box)({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  overflowY: "scroll",
  scrollbarWidth: "none",
});

export default function Department() {
  const status = useSelector(selectDepartmentStatus);
  const error = useSelector(selectDepartmentError);
  const data = useSelector(selectDepartmentData);
  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const deptRequest = dispatch(fetchDepartments());
    return () => {
      deptRequest.abort();
    };
  }, [dispatch]);

  return (
    <WithSkeleton loading={status === "loading"}>
      {status === "success" && (
        <DepartmentWrapper>
          <Title>{t("departments.title")}</Title>
          <Content>
            <Virtuoso
              data={data}
              itemContent={(idx, d) => {
                return <Line key={idx} {...d} />;
              }}
              style={{
                maxHeight: "400px",
                scrollbarWidth: "none",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            />
          </Content>
        </DepartmentWrapper>
      )}
      {status === "failure" && (
        <Reload
          error={error}
          dispatchThunk={() => dispatch(fetchDepartments())}
        />
      )}
    </WithSkeleton>
  );
}
