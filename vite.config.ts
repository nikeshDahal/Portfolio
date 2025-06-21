import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/Portfolio/", // 👈 use your repo name here
  plugins: [react(), tailwindcss()],
});
