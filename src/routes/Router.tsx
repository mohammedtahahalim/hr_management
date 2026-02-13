import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authRoutes, mainRoutes } from "./routes";
import Auth from "../features/auth/Auth";

export default function Router() {
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
      </Routes>
    </BrowserRouter>
  );
}
