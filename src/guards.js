import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./providers";
import Loading from "./components/Loading";

export function RequireAuth({ children }) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loading />;
  }

  return !!user ? children : <Navigate to="/signin" />;
}

export function RequireAnon({ children }) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loading />;
  }

  return !user ? children : <Navigate to="/dashboard" />;
}
