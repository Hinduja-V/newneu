import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ❌ NOT LOGGED IN → GO LOGIN
  if (!user || !user.id) {
    return <Navigate to="/login" replace />;
  }

  // ✅ LOGGED IN → ALLOW
  return children;
};

export default ProtectedRoute;