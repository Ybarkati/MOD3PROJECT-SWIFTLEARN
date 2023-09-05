import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    proxy: {
      '/api': 'https://mod3project-swiftlearn.onrender.com',
      '/authU': 'https://mod3project-swiftlearn.onrender.com',
      "/send-email":"https://mod3project-swiftlearn.onrender.com"
    },
  },
});
