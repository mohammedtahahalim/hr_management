import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../features/auth/AuthContext";
import { canAccess } from "../../../shared/lib/permissions";

interface UseCanEditReturn {
  canEdit: boolean;
}

export default function useCanEdit(): UseCanEditReturn {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const mode = params.get("mode") ?? "view";
  const { whoIs } = useContext(AuthContext);
  const permission = canAccess(
    whoIs?.role ?? "candidate",
    "UPDATE",
    "employee",
  );
  return { canEdit: mode === "edit" && permission };
}
