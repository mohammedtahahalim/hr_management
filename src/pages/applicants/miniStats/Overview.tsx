import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface OverviewProps {
  name: "active" | "open" | "hiring" | "experience";
  total: number;
  special: number;
}

const OverviewWrapper = styled(Box)({
  height: "100%",
  width: "80px",
  display: "flex",
  flexDirection: "column",
});

const Total = styled(Typography)({
  fontFamily: "system-ui",
  fontWeight: "bold",
  flex: 1,
  lineHeight: "80px",
  verticalAlign: "middle",
  textAlign: "center",
});

const Special = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

const SpecialContent = styled(Typography)(({ theme }) => ({
  padding: "2px",
  borderRadius: "12px",
  fontSize: "0.7rem",
  fontFamily: "system-ui",
  backgroundColor: theme.palette.third.main,
  color: "black",
  marginRight: "10px",
}));

export default function Overview({ name, total, special }: OverviewProps) {
  const { t } = useTranslation("applicants");
  return (
    <OverviewWrapper>
      <Total variant="h4" aria-describedby={`overview-${name}`} tabIndex={0}>
        {total}
      </Total>
      <Special>
        <SpecialContent variant="body2">
          +{special} {t(`miniStats.${name}.special`)}
        </SpecialContent>
      </Special>
    </OverviewWrapper>
  );
}
