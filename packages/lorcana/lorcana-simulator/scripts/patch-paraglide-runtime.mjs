import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const runtimePath = resolve(scriptDir, "../src/lib/paraglide/runtime.js");

const generatedServerCheck = "export const isServer = typeof window === 'undefined';";
const viteServerCheck =
  "export const isServer = import.meta.env?.SSR ?? typeof window === 'undefined';";

const source = await readFile(runtimePath, "utf8");
if (!source.includes(generatedServerCheck) && !source.includes(viteServerCheck)) {
  throw new Error("Unable to find Paraglide isServer export in generated runtime.");
}

if (source.includes(viteServerCheck)) {
  process.exit(0);
}

await writeFile(runtimePath, source.replace(generatedServerCheck, viteServerCheck));
