import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      //includeAssets: ["ph-tax.PNG"],
      manifest: {
        name: "PH Tax Calculator",
        short_name: "PHTaxApp",
        description: "PH Tax Calculator App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "ph-tax.PNG",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "ph-tax.PNG",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
