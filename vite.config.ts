import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Changed from "./" to "/" for absolute path
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  server: {
    open: true, // Automatically open browser
  },
});
