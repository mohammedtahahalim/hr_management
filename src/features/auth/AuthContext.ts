import { createContext } from "react";
import type { User } from "./authSlice";

interface AuthContextProps {
  user: User | null;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
});
