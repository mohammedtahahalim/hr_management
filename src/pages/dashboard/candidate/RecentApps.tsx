import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllCandidates } from "./candidateSlice";

const RecentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  flex: 1,
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  overflowY: "scroll",
  scrollbarWidth: "none",
  "&>*:not(:last-child)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const Line = styled(Box)({
  width: "100%",
  minHeight: "42px",
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  alignItems: "center",
  padding: "0px 5px",
});

const Profile = styled(Box)({
  flex: 1,
  height: "100%",
  display: "flex",
  gap: "5px",
  alignItems: "center",
});

const Picture = styled("img")({
  height: "35px",
  aspectRatio: "1",
  borderRadius: "50px",
});

const Name = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  fontWeight: "bold",
});

const Position = styled(Typography)({
  flex: 1.25,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontFamily: "system-ui",
  fontSize: "0.9rem",
  fontStyle: "italic",
});

const Offer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isColor",
})({
  borderRadius: "50px",
  fontSize: "0.9rem",
  textTransform: "uppercase",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  height: "30px",
});

export default function RecentApps() {
  const allCandidates = useSelector(selectAllCandidates);

  return (
    <RecentWrapper>
      {allCandidates.map((c) => {
        return (
          <Line key={c.id}>
            <Profile>
              <Picture src="https://i.postimg.cc/SNgrLf66/icons8-profile-100.png" />
              <Name variant="body1">{c.name}</Name>
            </Profile>
            <Position variant="body1">{c.position}</Position>
            <Offer>{c.offerState}</Offer>
          </Line>
        );
      })}
    </RecentWrapper>
  );
}
