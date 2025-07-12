import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import type { LoginStaffResponse } from "../../../model/Staff/LoginStaffResponse";

interface PrivateRoutesProps {
  permission: keyof LoginStaffResponse;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ permission }) => {
  const { logged, userData } = useAuth();

  if (!logged || !userData || !userData[permission]) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;