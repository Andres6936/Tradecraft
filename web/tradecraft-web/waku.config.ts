import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "waku/config";

export default defineConfig({
  vite: {
    server: {
      hmr: false,
    },
    resolve: {
      alias: { "~": path.resolve(import.meta.dirname, "./src") },
    },
    plugins: [
      tailwindcss(),
      react({
        babel: {
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
    ],
  },
});
