import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useContext";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-1 bg-black/50">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="flex grow gap-3 bg-[var(--color-gray-light)] min-h-screen">
      <aside className="w-64 shrink-0 bg-gray-800 text-white flex flex-col p-4">
        <Navigation className="flex flex-col gap-2" user={user} />
      </aside>
      <div className="containers flex flex-col grow py-6">
        <Outlet />
      </div>
    </div>
  );
}
