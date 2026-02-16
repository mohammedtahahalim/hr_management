import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HRStore } from "./config/store.ts";
import "./index.css";
import "./config/i18n.ts";
import App from "./App.tsx";
import ThemeProvider from "./features/themes/ThemeProvider.tsx";
import LanguageProvider from "./features/languages/LanguageProvider.tsx";
import Loader from "./shared/ui/Loader.tsx";
import ErrorBoundary from "./shared/ui/ErrorBoundaries.tsx";
import Toast from "./features/toast/Toast.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={HRStore}>
        <ThemeProvider>
          <LanguageProvider>
            <Suspense fallback={<Loader />}>
              <Toast />
              <App />
            </Suspense>
          </LanguageProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
