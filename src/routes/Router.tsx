import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authRoutes, mainRoutes } from "./routes";
import Auth from "../features/auth/Auth";
import Main from "../layouts/Main";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Router() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("title");
  }, [i18n.language, t]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Auth guard="notRequired" />}>
          {authRoutes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
        </Route>
        <Route element={<Auth guard="required" />}>
          <Route element={<Main />}>
            {mainRoutes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.component />}
                />
              );
            })}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
