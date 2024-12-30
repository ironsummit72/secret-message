import { createRoot } from "react-dom/client";
import "@/index.css";
import { RouterProvider } from "react-router-dom";
import router from "@/Router/Router.tsx";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <RouterProvider router={router} />
  </QueryClientProvider>
  </Provider>
);
