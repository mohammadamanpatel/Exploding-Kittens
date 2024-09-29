import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: {
    proxy: {
      "/api/game": {
        target: "http://localhost:6000", // Your backend server
        changeOrigin: true, // Changes the origin of the host header to the target URL
        secure: false,
        // No rewrite needed since your backend is already using /api/game
      },
    },
  },
  plugins: [react()],
});
