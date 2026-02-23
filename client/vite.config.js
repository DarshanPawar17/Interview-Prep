// =============================================
//  vite.config.js — Vite Build Configuration
// =============================================
//  Plugins:
//    • @vitejs/plugin-react  → JSX transform, fast refresh
//    • @tailwindcss/vite     → Tailwind CSS v4 (no postcss config needed!)
// =============================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),       // React fast-refresh & JSX support
    tailwindcss(), // Tailwind CSS v4 — zero-config via Vite plugin
  ],
  server: {
    port: 5173,    // Default Vite dev server port
  },
});
