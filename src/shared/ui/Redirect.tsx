import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import type { AppDispatch } from "../../config/store";
import { checkAuth } from "../../features/auth/authSlice";

export default function Redirect() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return <Navigate to={"/dashboard"} replace />;
}
