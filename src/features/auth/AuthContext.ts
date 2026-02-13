import { createContext } from "react";
import type { User } from "./authSlice";

interface AuthContextProps {
  whoIs: User | null;
}

export const AuthContext = createContext<AuthContextProps>({
  whoIs: null,
});
