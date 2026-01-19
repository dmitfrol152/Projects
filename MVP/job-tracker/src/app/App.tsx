import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "@app/router/AppRouter";
import { Header } from "@widgets/Header";
import { Footer } from "@widgets/Footer";
import { HomeLayout } from "@shared/ui/HomeLayout";
import { AuthProvider } from "@app/providers/context/AuthProvider";
import { SearchProvider } from "@app/providers/context/SearchProvider";
import { ThemeProvider } from "@app/providers/context/ThemeProvider";
import { ThemeWrapper } from "@app/providers/ThemeWrapper";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@app/providers/queryClient";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation("common");

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <ThemeWrapper>
              <SearchProvider>
                <ToastContainer
                  position="top-right"
                  hideProgressBar={false}
                  closeOnClick={true}
                  pauseOnHover={true}
                  draggable={false}
                  theme="colored"
                  icon={false}
                />
                <Suspense
                  fallback={
                    <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-100 bg-[var(--color-black-05)]">
                      {t("loading")}
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
    </QueryClientProvider>
  );
}
