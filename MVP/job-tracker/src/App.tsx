import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@router/AppRouter";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { HomeLayout } from "@components/HomeLayout";
import { AuthProvider } from "@/context/AuthProvider";
import { SearchProvider } from "@/context/SearchProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ThemeWrapper } from "@/components/ThemeWrapper";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ThemeWrapper>
            <SearchProvider>
              <Suspense
                fallback={
                  <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-1 bg-black/50">
                    Loading...
                  </div>
                }
              >
                <HomeLayout header={<Header />} footer={<Footer />}>
                  <AppRouter />
                </HomeLayout>
              </Suspense>
            </SearchProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
