import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllCandidates } from "./candidateSlice";
import { Virtuoso } from "react-virtuoso";
import { memo } from "react";
import { offerColors, offerState } from "../../../shared/lib/constants";
import type { OfferState, PaletteColorKey } from "../../../shared/lib/types";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../config/i18n";

const RecentWrapper = styled(Box)({
  width: "100%",
  flex: 1,
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  overflowY: "scroll",
  scrollbarWidth: "none",
});

const Line = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: "42px",
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  alignItems: "center",
  padding: "0px 5px",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Profile = styled(Box)({
  flex: 1,
  height: "100%",
  display: "flex",
  gap: "5px",
  alignItems: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const Picture = styled("img")(({ theme }) => ({
  height: "35px",
  aspectRatio: "1",
  borderRadius: "50px",
  border: `1px solid ${theme.palette.primary.main}`,
}));

const Name = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  fontWeight: "bold",
});

const Position = styled(Typography)({
  flex: 1,
  height: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  fontStyle: "italic",
});

const Offer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isColor",
})<{ isColor: PaletteColorKey }>(({ theme, isColor }) => ({
  borderRadius: "50px",
  fontSize: "0.8rem",
  textTransform: "uppercase",
  height: "30px",
  backgroundColor: theme.palette[isColor].main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0px 5px",
  overflow: "hidden",
}));

const RecentApps = memo(() => {
  const allCandidates = useSelector(selectAllCandidates);
  const { i18n } = useTranslation();

  return (
    <RecentWrapper>
      <Virtuoso
        data={allCandidates}
        itemContent={(_, c) => (
          <>
            <Line key={c.id}>
              <Profile>
                <Picture
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${c.name}`}
                  alt={`${c.name} picture`}
                  loading="lazy"
                />
                <Name variant="body1">{c.name}</Name>
              </Profile>
              <Position variant="body1">
                {c.position[i18n.language as keyof typeof c.position]}
              </Position>
              <Offer isColor={offerColors(c.offerState)}>
                {offerState(
                  c.offerState as OfferState,
                  i18n.language as TLanguage,
                )}
              </Offer>
            </Line>
          </>
        )}
        style={{ height: "400px", scrollbarWidth: "none" }}
      />
    </RecentWrapper>
  );
});

export default RecentApps;
