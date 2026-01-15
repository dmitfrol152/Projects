import { Navigation } from "@widgets/Navigation";
import { useAuth } from "@/shared/lib/context/contexts";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-100 bg-[var(--color-black-05)]">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="flex grow gap-3 bg-[var(--color-gray-50)] pb-27 pt-30 lg:pb-15 lg:pt-18">
      <aside className="fixed top-18 left-0 bottom-15 w-64 shrink-0 bg-[var(--color-bg-pernamently)] text-[var(--color-white-pernamently)] flex-col p-4 z-10 hidden lg:flex">
        <Navigation
          className="flex flex-col gap-2 grow"
          user={user}
          isVisibleSettingsLink
        />
      </aside>
      <div className="containers flex flex-col grow pr-6 py-6 bg-[var(--color-gray-50)] pl-4 lg:pl-68">
        <Outlet />
      </div>
    </div>
  );
}
