import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@router/AppRouter";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { HomeLayout } from "@components/HomeLayout";
import { AuthProvider } from "@/context/AuthProvider";
import { SearchProvider } from "@/context/SearchProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                Loading...
              </div>
            }
          >
            <HomeLayout header={<Header />} footer={<Footer />}>
              <AppRouter />
            </HomeLayout>
          </Suspense>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
