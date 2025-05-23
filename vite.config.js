import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["scrollreveal"],
  },
  resolve: {
    alias: {
      "react-quill": "react-quill/dist/react-quill",
    },
  },
});
