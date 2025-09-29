import { useAuth } from "@/hooks/useContext";
import { Navigate } from "react-router-dom";
import type { PrivateRouterProps } from "./types";

export function PrivateRouter({ children }: PrivateRouterProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
}
