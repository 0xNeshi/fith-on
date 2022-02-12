import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import { UserContext } from "../providers";

export default function Landing() {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loading />;
  }

  const targetUrl = !!user ? "/dashboard" : "/signin";

  return <Navigate to={targetUrl} />;
}
