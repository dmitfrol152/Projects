import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/queryClient.ts";
import { BrowserRouter } from "react-router";
import { LoadingContainer } from "@components/LoadingContainer";
import { HomeLayout } from "@components/HomeLayout";
import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import AppRouter from "@router/AppRouter";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingContainer />}>
          <HomeLayout header={<Header />} footer={<Footer />}>
            <AppRouter />
          </HomeLayout>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
