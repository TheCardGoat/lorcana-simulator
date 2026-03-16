import { fileURLToPath } from "node:url";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const BRIDGE_MODULES = [
  "../src/lib/paraglide/runtime.js",
  "../src/lib/paraglide/messages.js",
  "../src/lib/paraglide/server.js",
  "../src/lib/paraglide/registry.js",
] as const;

const failures: string[] = [];

for (const modulePath of BRIDGE_MODULES) {
  const moduleUrl = new URL(modulePath, import.meta.url);
  const readablePath = fileURLToPath(moduleUrl);

  try {
    await import(moduleUrl.href);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${readablePath}: ${message}`);
  }
}

if (failures.length > 0) {
  console.error(
    "Paraglide bridge import validation failed. Ensure src/lib/paraglide wrappers point to valid generated/runtime files.",
  );
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

const SRC_DIR = fileURLToPath(new URL("../src", import.meta.url));
const BRIDGE_DIR = fileURLToPath(new URL("../src/lib/paraglide", import.meta.url));
const SOURCE_EXTENSIONS = new Set([".ts", ".js", ".svelte"]);
const forbiddenImportPattern = /(?:from\s+["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\))/g;
const forbiddenRefs: string[] = [];

function getLineNumber(content: string, index: number): number {
  return content.slice(0, index).split("\n").length;
}

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(absolutePath)));
      continue;
    }
    if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(absolutePath);
    }
  }
  return files;
}

const sourceFiles = await walk(SRC_DIR);
for (const filePath of sourceFiles) {
  if (filePath.startsWith(BRIDGE_DIR + path.sep) || filePath === BRIDGE_DIR) {
    continue;
  }

  const content = await readFile(filePath, "utf8");
  for (const match of content.matchAll(forbiddenImportPattern)) {
    const importTarget = match[1] ?? match[2];
    if (!importTarget || !importTarget.includes("paraglide-generated/")) {
      continue;
    }

    const line = getLineNumber(content, match.index ?? 0);
    const relativePath = path.relative(fileURLToPath(new URL("..", import.meta.url)), filePath);
    forbiddenRefs.push(`${relativePath}:${line} imports "${importTarget}"`);
  }
}

if (forbiddenRefs.length > 0) {
  console.error(
    "Direct imports from src/lib/paraglide-generated are forbidden. Import from src/lib/paraglide bridges instead.",
  );
  for (const forbiddenRef of forbiddenRefs) {
    console.error(`- ${forbiddenRef}`);
  }
  process.exit(1);
}
