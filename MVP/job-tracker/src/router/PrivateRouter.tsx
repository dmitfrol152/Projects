import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useContext";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-1 bg-[var(--color-black-05)]">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="flex grow gap-3 bg-[var(--color-gray-50)] pb-15 pt-18">
      <aside className="fixed top-18 left-0 bottom-15 w-64 shrink-0 bg-[var(--color-bg-pernamently)] text-[var(--color-white-pernamently)] flex flex-col p-4">
        <Navigation
          className="flex flex-col gap-2 grow"
          user={user}
          isVisibleSettingsLink
        />
      </aside>
      <div className="containers flex flex-col grow pl-68 pr-6 py-6 bg-[var(--color-gray-50)]">
        <Outlet />
      </div>
    </div>
  );
}
