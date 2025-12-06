import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  role?: "user" | "admin";
}

export const ProtectedRoute: React.FC<Props> = ({ children, role }) => {
  const logged = localStorage.getItem("rcco_user_logged");
  const userRole = localStorage.getItem("rcco_role"); // "user" | "admin"

  if (logged !== "true") {
    return <Navigate to="/login" replace />;
  }

  // Si se requiere un rol específico y no coincide, negar acceso
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
