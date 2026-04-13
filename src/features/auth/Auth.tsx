import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../config/store";
import { useEffect } from "react";
import {
  checkAuth,
  selectAuthError,
  selectAuthStatus,
  selectAuthUser,
  selectIsAuthenticated,
  selectIsInitialized,
} from "./authSlice";
import Loader from "../../shared/ui/Loader";
import { addToast } from "../toast/toastSlice";

interface AuthProps {
  guard: "required" | "notRequired";
}

export default function Auth({ guard }: AuthProps) {
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError) ?? "SYSTEM";
  const user = useSelector(selectAuthUser);
  const isInitialized = useSelector(selectIsInitialized);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const authRequest = dispatch(checkAuth());
    return () => {
      authRequest.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addToast({ expireAt: 1500, message: error, type: "error" }));
  }, [error, dispatch]);

  if (status === "idle" || status === "loading" || !isInitialized)
    return <Loader />;

  if (guard === "required" && !isAuthenticated)
    return <Navigate to={"/login"} replace />;

  if (guard === "notRequired" && isAuthenticated)
    return <Navigate to={"/dashboard"} replace />;

  return (
    <AuthContext.Provider value={{ user }}>
      <Outlet />
    </AuthContext.Provider>
  );
}
