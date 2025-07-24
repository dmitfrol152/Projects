import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    proxy: {
      "/api": {
        target: "https://audioplayer-ov4g.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
