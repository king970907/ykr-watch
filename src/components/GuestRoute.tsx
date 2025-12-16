import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

interface GuestRouteProps {
  children: JSX.Element;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const { user } = useAuth();

  if (user) {
    // 已登入 → 導到 /index
    return <Navigate to="/index" replace />;
  }

  // 未登入 → render children
  return children;
};

export default GuestRoute;
