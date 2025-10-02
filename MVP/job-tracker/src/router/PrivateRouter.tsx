import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useContext";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRouter() {
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

  return (
    <div className="flex grow gap-3 bg-[var(--color-gray-light)]">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <Navigation className="flex flex-col gap-2" />
      </aside>
      <div className="container flex flex-col grow py-6">
        <Outlet />
      </div>
    </div>
  );
}
