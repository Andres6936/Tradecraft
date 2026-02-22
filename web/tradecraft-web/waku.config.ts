import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "waku/config";

export default defineConfig({
  vite: {
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
      react({
        babel: {
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
    ],
  },
});
