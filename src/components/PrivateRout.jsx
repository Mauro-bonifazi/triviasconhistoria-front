import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isUserLogged, logout } = useAuth();

  // Si no hay token, forzamos logout por seguridad
  const token = localStorage.getItem("token");
  if (!token || !isUserLogged) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
