import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv, type UserConfig } from "vite-plus";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const hotUpdateDelayMs = Number(env.HOT_UPDATE_DELAY_MS ?? 0);
  const shouldDelayHotUpdates = Number.isFinite(hotUpdateDelayMs) && hotUpdateDelayMs > 0;
  const paraglideWatchIgnore = ["**/src/lib/paraglide/**"];

  // The union of these three plugins' return types blows TypeScript's
  // structural comparison budget under svelte-check on CI ("Excessive stack
  // depth comparing types 'Plugin<any>[]' and 'Plugin<any>[]'", TS2321) but
  // the error doesn't reproduce locally. Cast each element to `unknown`
  // individually so inference never attempts to unify the Plugin<any>[] types.
  const plugins: unknown[] = [
    tailwindcss() as unknown,
    sveltekit() as unknown,
    paraglideVitePlugin({ project: "./project.inlang", outdir: "./src/lib/paraglide" }) as unknown,
  ];

  return {
    server: {
      port: 5173, // your preferred starting port
      strictPort: false, // fall through to next available
      watch: {
        // Paraglide regenerates this directory during dev. Watching it causes
        // Vite to invalidate the graph from its own generated output.
        ignored: paraglideWatchIgnore,
      },
    },
    resolve: {
      conditions: mode === "test" ? ["browser"] : undefined,
      alias: {
        "node:events": fileURLToPath(new URL("./src/lib/shims/node-events.ts", import.meta.url)),
        "node:module": fileURLToPath(new URL("./src/lib/shims/node-module.ts", import.meta.url)),
        // daisyui has `"browser": "./daisyui.css"` which Vite's resolver picks up via
        // browser conditions, causing @tailwindcss/vite to fail loading it as a JS plugin.
        // Force resolution to the JS entry point.
        daisyui: fileURLToPath(import.meta.resolve("daisyui/index.js")),
      },
    },
    plugins: plugins as UserConfig["plugins"],
    optimizeDeps: {
      include: [
        "@tcg/lorcana-cards/cards/001",
        "@tcg/lorcana-cards/cards/002",
        "@tcg/lorcana-cards/cards/003",
        "@tcg/lorcana-cards/cards/004",
        "@tcg/lorcana-cards/cards/005",
        "@tcg/lorcana-cards/cards/006",
        "@tcg/lorcana-cards/cards/007",
        "@tcg/lorcana-cards/cards/008",
        "@tcg/lorcana-cards/cards/009",
        "@tcg/lorcana-cards/cards/010",
        "@tcg/lorcana-cards/cards/011",
        "@tcg/lorcana-cards/cards/012",
        "@tcg/lorcana-cards/deck-list-resolver",
      ],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("lorcana-engine")) return "lorcana-engine";
            if (id.includes("lorcana-cards")) return "lorcana-cards";
          },
        },
      },
    },
  } as UserConfig;
});
