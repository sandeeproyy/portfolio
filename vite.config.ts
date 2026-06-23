import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  server: {
    watch: {
      ignored: ["**/routeTree.gen.ts"],
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro(),
    react(),
    tailwindcss(),
  ],
});
