import { QueryClientProvider } from "@tanstack/react-query";
import "./styles.css";
import { BaseLayout } from "./ui/BaseLayout/BaseLayout";
import { queryClient } from "./api/queryClients";

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BaseLayout />
      </QueryClientProvider>
    </>
  );
}
