import { Skeleton, styled } from "@mui/material";

const Row = styled("tr")(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("lg")]: {
    "&>*:nth-of-type(5)": {
      display: "none",
    },
  },
  [theme.breakpoints.down("md")]: {
    "&>*:nth-of-type(2)": {
      display: "none",
    },
    "&>*": {
      maxWidth: "75px",
    },
  },
}));

const Cell = styled("td")({
  padding: "10px 5px",
  minWidth: 0,
  overflow: "hidden",
});

const CustomSkeleton = styled(Skeleton)({
  width: "100%",
  height: "100%",
  minHeight: "50px",
});

export default function SkeletonLine() {
  return (
    <Row>
      <Cell>
        <CustomSkeleton />
      </Cell>
      <Cell>
        <CustomSkeleton />
      </Cell>
      <Cell>
        <CustomSkeleton />
      </Cell>
      <Cell>
        <CustomSkeleton />
      </Cell>
      <Cell>
        <CustomSkeleton />
      </Cell>
      <Cell>
        <CustomSkeleton />
      </Cell>
    </Row>
  );
}
