import { Box, styled, Typography } from "@mui/material";
import WithSkeleton from "../../../shared/ui/WithSkeleton";
import { useTranslation } from "react-i18next";
import CollectionGraph from "./CollectionGraph";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections, selectCollectionStatus } from "./collectionSlice";
import type { AppDispatch } from "../../../config/store";
import { useEffect } from "react";

const CollectionWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const Title = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  height: "fit-content",
  padding: "2px",
});

const Content = styled(Box)(({ theme }) => ({
  width: "100%",
  flex: 1,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "360px",
  },
}));

export default function Collection() {
  const { t } = useTranslation("dashboard");
  const status = useSelector(selectCollectionStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const collectionRequest = dispatch(fetchCollections());
    return () => {
      collectionRequest.abort();
    };
  }, [dispatch]);

  return (
    <WithSkeleton loading={status === "loading"}>
      <CollectionWrapper>
        <Title>{t("collection.title")} :</Title>
        <Content>
          <CollectionGraph />
        </Content>
      </CollectionWrapper>
    </WithSkeleton>
  );
}
