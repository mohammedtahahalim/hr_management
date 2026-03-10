import { Box, CircularProgress, styled, type ButtonProps } from "@mui/material";

interface LoaderProps {
  color?: ButtonProps["color"];
}

const LoaderWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function Loader(props: LoaderProps | void) {
  const { color = "primary" } = props ?? {};

  return (
    <LoaderWrapper>
      <CircularProgress color={color} size={"3rem"} />
    </LoaderWrapper>
  );
}
