import React, { type ReactNode } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import { Translation } from "react-i18next";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const ErrorWrapper = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#347be3",
  padding: "0.5rem",
});

const Section = styled("section")(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  maxWidth: "550px",
  backgroundColor: theme.palette.background.paper,
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "2rem",
  alignItems: "center",
  margin: "0 auto",
  textAlign: "center",
  borderRadius: "25px",
}));

const Title = styled(Typography)({
  fontFamily: "system-ui",
  fontSize: "2.5rem",
});

const ErrorMessage = styled(Typography)({
  fontFamily: "system-ui",
  fontStyle: "italic",
});

const TryAgain = styled(Button)({
  textTransform: "capitalize",
});

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  private handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <ErrorWrapper>
          <Section role="alert" aria-live="assertive">
            <Translation>
              {(t) => (
                <>
                  <Title variant="h2" color="error">
                    {t("errorBoundary.title")}
                  </Title>
                  <ErrorMessage variant="body1" color="info">
                    {t("errorBoundary.message")}
                  </ErrorMessage>

                  <TryAgain onClick={this.handleRetry} variant="contained">
                    {t("errorBoundary.tryAgain")}
                  </TryAgain>
                </>
              )}
            </Translation>
          </Section>
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
