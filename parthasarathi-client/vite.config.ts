import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// Add a development proxy so `/api` requests are forwarded to the backend
// This prevents the dev server from returning the app HTML for API calls.
// Adjust the target if your backend runs on a different host/port.
// https://vitejs.dev/config/server-options.html#server-proxy
export default defineConfig(() => {
  return {
    plugins: [tailwindcss(), react()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
  };
});
