// Simple Bun dev server with auto-rebuild
import { watch, mkdirSync } from "fs";
import { resolve } from "path";
import tailwind from "bun-plugin-tailwind";

const PORT = 5174;
let buildInProgress = false;

async function build() {
  if (buildInProgress) return;
  buildInProgress = true;

  console.log("🔨 Building...");

  try {
    mkdirSync(resolve("./dist"), { recursive: true });

    const result = await Bun.build({
      entrypoints: ["./src/main.tsx"],
      outdir: "./dist",
      target: "browser",
      splitting: true,
      format: "esm",
      sourcemap: "external",
      plugins: [tailwind],
    });

    if (!result.success) {
      console.error("Build errors:", result.logs);
      return;
    }

    console.log("✅ Build complete");
  } catch (error) {
    console.error("❌ Build failed:", error);
  } finally {
    buildInProgress = false;
  }
}

// Initial build
await build();

// Watch for changes
watch(resolve("./src"), { recursive: true }, (eventType, filename) => {
  if (filename?.endsWith(".ts") || filename?.endsWith(".tsx")) {
    console.log(`📝 Changed: ${filename}`);
    build();
  }
});

// Serve static files
Bun.serve({
  port: PORT,
  hostname: "0.0.0.0", // Bind to all interfaces for WSL2 access
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // Default to index.html for root and non-file paths
    if (path === "/" || !path.includes(".")) {
      path = "/index.html";
    }

    const filePath = resolve(`./dist${path}`);

    try {
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file);
      }
    } catch {}

    // Fallback to public directory
    try {
      const publicFile = Bun.file(resolve(`./public${path}`));
      if (await publicFile.exists()) {
        return new Response(publicFile);
      }
    } catch {}

    // SPA fallback
    if (!path.includes(".")) {
      return new Response(Bun.file(resolve("./dist/index.html")));
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Dev server running at http://localhost:${PORT}`);
