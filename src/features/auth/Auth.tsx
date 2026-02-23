import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../config/store";
import { useEffect } from "react";
import { checkAuth } from "./authSlice";
import Loader from "../../shared/ui/Loader";
import Network from "../../shared/ui/Network";
import Forbidden from "../../shared/ui/Forbidden";
import Maintenance from "../../shared/ui/Maintenance";

interface AuthProps {
  guard: "required" | "notRequired";
}

export default function Auth({ guard }: AuthProps) {
  const { status, authState, systemState, whoIs, networkState } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <AuthContext.Provider value={{ whoIs }}>
      <Outlet />
    </AuthContext.Provider>
  );
}
