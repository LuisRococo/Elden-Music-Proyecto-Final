import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

export default function ProtectRoute({ adminPermissions, children }) {
  const token = useSelector((state: RootState) => state.token.token);

  if (!token || (adminPermissions && !token.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
