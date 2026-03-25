import { Box, styled, TextField, Typography } from "@mui/material";
import WithSkeleton from "../../../../shared/ui/WithSkeleton";
import { useSelector } from "react-redux";
import { selectDetailGeneral, selectDetailStatus } from "./detailSlice";
import { useTranslation } from "react-i18next";
import type { TLanguage } from "../../../../config/i18n";
import { positionsColor } from "../../../../shared/lib/constants";
import type { PositionColor } from "../../../../shared/lib/types";

const HeadlineWrapper = styled(Box)(({ theme }) => ({
  padding: "5px",
  minHeight: "80px",
  borderRadius: "12px",
  display: "flex",
  gap: "5px",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    minHeight: "150px",
  },
}));

const Personal = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "10px",
});

const Name = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
});

const Position = styled(Box, {
  shouldForwardProp: (prop) => prop !== "posColor",
})<{ posColor: PositionColor }>(({ theme, posColor }) => ({
  width: "fit-content",
  padding: "5px 15px",
  borderRadius: "50px",
  fontSize: "0.85rem",
  backgroundColor: theme.palette[posColor].main,
  color: "whitesmoke",
}));

const ApplicationStatus = styled(Box)({
  display: "flex",
  alignItems: "flex-end",
  gap: "15px",
  padding: "10px",
});

const Custom = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "1rem",
});

export default function Headline() {
  const { t, i18n } = useTranslation("applicants");
  const fetchStatus = useSelector(selectDetailStatus);
  const general = useSelector(selectDetailGeneral);

  const { name, position, status } = general ?? {};

  return (
    <HeadlineWrapper>
      <WithSkeleton
        loading={fetchStatus === "loading"}
        sx={{ borderRadius: "12px" }}
      >
        <>
          <Personal>
            <Name variant="h6">{name && name[i18n.language as TLanguage]}</Name>
            <Position posColor={positionsColor[position ?? "front"]}>
              {t(`details.headline.positions.${position}`)}
            </Position>
          </Personal>
          <ApplicationStatus>
            <Custom>{t("details.headline.status.title")}</Custom>
            <TextField
              variant="standard"
              disabled={true}
              placeholder={t(`details.headline.status.${status}`)}
              size="small"
              sx={{ width: "135px" }}
            />
          </ApplicationStatus>
        </>
      </WithSkeleton>
    </HeadlineWrapper>
  );
}
