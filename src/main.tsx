import { createRoot } from "react-dom/client";
import "modern-normalize";
import "./index.css";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./components/ModalContext/ModalProvider";

const queryClient = new QueryClient();
createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ModalProvider>
        <App />
      </ModalProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
