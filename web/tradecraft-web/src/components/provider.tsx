"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "./theme-provider";

const queryClient = new QueryClient();

const Providers = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

export { Providers };
