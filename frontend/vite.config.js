import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:1111',
      '/authU': 'http://localhost:1111',
      "/send-email":"http://localhost:1111"
    },
  },
});
