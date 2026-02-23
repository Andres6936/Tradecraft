import React from "react";

import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
};

export { Providers };
