import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  ssr: {
    // CJS packages used with named imports must be bundled so the SSR output
    // resolves their exports at build time (Node can't statically see named
    // exports on these CommonJS modules).
    noExternal: ["react-vertical-timeline-component"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})