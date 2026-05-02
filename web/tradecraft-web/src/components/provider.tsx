"use client";

import React from "react";
import { NuqsAdapter } from 'nuqs/adapters/react'
import { ShimmerProvider } from "shimmer-from-structure";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/theme-provider";
import { LoginContextProvider } from "~/features/login/context/use-login";

const defualtShimmerColor = "oklch(from var(--foreground) l c h / 0.1)"
const queryClient = new QueryClient();

const Providers = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ShimmerProvider config={{
        shimmerColor: defualtShimmerColor
      }}>
        <NuqsAdapter>
          <QueryClientProvider client={queryClient}>
            <LoginContextProvider>
              {children}
            </LoginContextProvider>
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </NuqsAdapter>
      </ShimmerProvider>
    </ThemeProvider>
  );
};

export { Providers };
