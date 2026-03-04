import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../auth/service/useAuth.ts";

const RequireAuth: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default RequireAuth;
