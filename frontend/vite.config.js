import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/expenses": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },

      "/convert": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});