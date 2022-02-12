import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./providers";

export function RequireAuth({ children }) {
  const { user } = useContext(UserContext);
  console.log("auth", user);
  return !!user ? children : <Navigate to="/signin" />;
}

export function RequireAnon({ children }) {
  const { user } = useContext(UserContext);
  console.log("anon", user);
  return !user ? children : <Navigate to="/dashboard" />;
}
