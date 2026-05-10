#!/usr/bin/env bun
/**
 * tcg-replay CLI
 *
 * Download a Lorcana replay from production and print the per-turn trace
 * (cards involved → initial state → step-by-step move/logs/patches) so
 * an LLM agent can debug a specific turn from a player bug report.
 *
 * Usage:
 *   bun packages/tools/replay-cli/src/cli.ts --replay-id <gameId> --turn <n>
 *   tcg-replay --replay-id <gameId> --turn <n> [--api-origin <url>]
 */
import { fetchReplay, ReplayNotFoundError } from "./fetch";
import { extractTurn } from "./turn-extractor";
import { resolveDefIds } from "./card-resolver";
import { renderTurn } from "./render";

const DEFAULT_API_ORIGIN = "https://api.tcg.online";

interface CliOptions {
  replayId: string | null;
  turn: number | null;
  apiOrigin: string;
  showHelp: boolean;
}

function parseArgs(argv: string[]): CliOptions {
  let replayId: string | null = null;
  let turn: number | null = null;
  let apiOrigin = process.env.TCG_API_ORIGIN ?? DEFAULT_API_ORIGIN;
  let showHelp = false;

  const requireValue = (flag: string, value: string | undefined): string => {
    if (value === undefined || value.startsWith("--")) {
      process.stderr.write(`${flag} requires a value\n`);
      process.exit(2);
    }
    return value;
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      showHelp = true;
      continue;
    }
    if (arg === "--replay-id") {
      replayId = requireValue("--replay-id", argv[++i]);
      continue;
    }
    if (arg === "--turn") {
      const raw = requireValue("--turn", argv[++i]);
      const n = Number.parseInt(raw, 10);
      turn = Number.isFinite(n) ? n : null;
      continue;
    }
    if (arg === "--api-origin") {
      apiOrigin = requireValue("--api-origin", argv[++i]);
      continue;
    }
  }

  return { replayId, turn, apiOrigin, showHelp };
}

function printHelp(): void {
  console.log(
    `Download a Lorcana replay from production and print the per-turn trace.

Options:
  --replay-id <id>    Replay (game) id to download (required)
  --turn <n>          1-based turn number to inspect (required)
  --api-origin <url>  API origin (default: $TCG_API_ORIGIN or ${DEFAULT_API_ORIGIN})
  -h, --help          Show this help

Output sections (in order):
  --- CARDS INVOLVED ---       instanceId → defId → on-disk file path
  --- INITIAL STATE ---        reconstructed MatchState before the turn
  --- STEPS ---                per-step move, logs, JSON patches

Exit codes:
  0   success
  1   runtime error (replay not found, turn out of range, fetch failure)
  2   bad input (missing/invalid args)
`,
  );
}

async function main(): Promise<void> {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.showHelp) {
    printHelp();
    return;
  }
  if (!opts.replayId) {
    process.stderr.write("Missing required --replay-id\n\n");
    printHelp();
    process.exit(2);
  }
  if (opts.turn === null || opts.turn < 1) {
    process.stderr.write("Missing or invalid --turn (expected 1-based positive integer)\n\n");
    printHelp();
    process.exit(2);
  }

  let replay;
  try {
    replay = await fetchReplay(opts.replayId, opts.apiOrigin);
  } catch (err) {
    if (err instanceof ReplayNotFoundError) {
      process.stderr.write(`replay not found: ${opts.replayId}\n`);
      process.exit(1);
    }
    process.stderr.write(`fetch failed: ${(err as Error).message}\n`);
    process.exit(1);
  }

  let extracted;
  try {
    extracted = extractTurn(replay, opts.turn);
  } catch (err) {
    process.stderr.write(`${(err as Error).message}\n`);
    process.exit(1);
  }

  const defIds = new Set<string>();
  for (const instId of extracted.involvedInstanceIds) {
    const defId = extracted.cardInstances[instId];
    if (defId) defIds.add(defId);
  }
  const resolvedCards = await resolveDefIds(defIds);

  const output = renderTurn({ replay, turn: opts.turn, extracted, resolvedCards });
  process.stdout.write(output + "\n");
}

if (import.meta.main) {
  main().catch((err) => {
    process.stderr.write(`tcg-replay failed: ${(err as Error).stack ?? (err as Error).message}\n`);
    process.exit(1);
  });
}
