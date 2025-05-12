import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    proxy: {
      "/api": {
        target: "https://cinemaguide.skillbox.cc/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import "/src/styles/global/_mixins";
  //         @import "/src/styles/global/_variables";
  //         @import "/src/styles/global/_visually-hidden";
  //       `,
  //     },
  //   },
  // },
});
