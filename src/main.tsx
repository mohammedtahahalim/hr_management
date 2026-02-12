import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HRStore } from "./config/store.ts";
import "./index.css";
import "./config/i18n.ts";
import App from "./App.tsx";
import ThemeProvider from "./features/themes/ThemeProvider.tsx";
import LanguageProvider from "./features/languages/LanguageProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={HRStore}>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
