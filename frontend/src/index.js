import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
);
