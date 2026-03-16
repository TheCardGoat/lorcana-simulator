import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const hotUpdateDelayMs = Number(env.HOT_UPDATE_DELAY_MS ?? 0);
  const shouldDelayHotUpdates = Number.isFinite(hotUpdateDelayMs) && hotUpdateDelayMs > 0;
  const paraglideGeneratedWatchIgnore = ["**/src/lib/paraglide-generated/**"];

  return {
    server: {
      watch: {
        // Paraglide regenerates this directory during dev. Watching it causes
        // Vite to invalidate the graph from its own generated output.
        ignored: paraglideGeneratedWatchIgnore,
        ...(shouldDelayHotUpdates
          ? {
              awaitWriteFinish: {
                stabilityThreshold: hotUpdateDelayMs,
                pollInterval: 100,
              },
            }
          : {}),
      },
    },
    resolve: {
      conditions: mode === "test" ? ["browser"] : undefined,
      alias: {
        "node:events": fileURLToPath(new URL("./src/lib/shims/node-events.ts", import.meta.url)),
        "node:module": fileURLToPath(new URL("./src/lib/shims/node-module.ts", import.meta.url)),
      },
    },
    plugins: [
      tailwindcss(),
      sveltekit(),
      paraglideVitePlugin({ project: "./project.inlang", outdir: "./src/lib/paraglide-generated" }),
    ],
  };
});
