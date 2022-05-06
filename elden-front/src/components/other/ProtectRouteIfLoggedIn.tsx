import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

export default function ProtectRouteIfLoggedIn({ children }) {
  const token = useSelector((state: RootState) => state.token.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
