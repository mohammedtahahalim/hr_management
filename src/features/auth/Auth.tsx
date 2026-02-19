import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../config/store";
import { useEffect } from "react";
import { checkAuth } from "./authSlice";
import Loader from "../../shared/ui/Loader";
import Network from "../../pages/Network";
import Forbidden from "../../pages/Forbidden";
import Maintenance from "../../pages/Maintenance";
import { canAccessRoute } from "../../shared/lib/helpers";

interface AuthProps {
  guard: "required" | "notRequired";
}

export default function Auth({ guard }: AuthProps) {
  const { status, authState, systemState, whoIs, networkState } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();

  useEffect(() => {
    const authRequest = dispatch(checkAuth());
    return () => {
      authRequest.abort();
    };
  }, [dispatch]);

  if (status === "idle" || status === "loading" || authState === "unknown")
    return <Loader />;

  if (systemState === "error") throw new Error();

  if (systemState === "down") return <Maintenance />;

  if (networkState === "ABORT") return <Network />;

  if (authState === "forbidden") return <Forbidden />;

  if (guard === "notRequired" && authState === "authenticated")
    return <Navigate to={"/dashboard"} replace />;

  if (guard === "required" && authState !== "authenticated")
    return <Navigate to={"/login"} replace />;

  if (whoIs && !canAccessRoute(pathname, whoIs)) return <Forbidden />;

  return (
    <AuthContext.Provider value={{ whoIs }}>
      <Outlet />
    </AuthContext.Provider>
  );
}
