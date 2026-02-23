import React from "react";

import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
};

export { Providers };
