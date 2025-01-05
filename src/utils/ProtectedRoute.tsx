import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useEffect, useState } from "react";
import { refreshAccessToken } from "../API/services/authService";
import React from "react";

function ProtectedRoute() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated) {
          const token = localStorage.getItem("accessToken");
          if (token) {
            try {
              const { accessToken } = await refreshAccessToken();
              localStorage.setItem("accessToken", accessToken);
              setIsAuthenticated(true);
            } catch (error) {
              console.error("Token refresh failed:", error);
              localStorage.removeItem("accessToken");
            }
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, setIsAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    const currentPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth?mode=signin&redirect=${currentPath}`} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
