import { Box, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDepartments,
  selectDepartmentData,
  selectStatus,
} from "./departmentSlice";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import { Virtuoso } from "react-virtuoso";
import Line from "./Line";
import { useTranslation } from "react-i18next";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";

const DepartmentWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const Title = styled(Typography)({
  width: "100%",
  fontFamily: "system-ui",
  fontWeight: "bold",
  fontSize: "1.5rem",
  padding: "8px 0px",
});

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
  const status = useSelector(selectStatus);
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
      <DepartmentWrapper>
        <Title variant="h5">{t("departments.title")} :</Title>
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
    </WithSkeleton>
  );
}
