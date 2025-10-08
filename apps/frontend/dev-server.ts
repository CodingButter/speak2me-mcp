// Simple Bun dev server with auto-rebuild
import { serve } from "bun"
import index from "./index.html"

const server = serve({
  port: 5174,
  routes: {
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
})

console.log(`🚀 Server running at ${server.url}`)
