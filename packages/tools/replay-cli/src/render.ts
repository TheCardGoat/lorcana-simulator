import type { PersistedReplayData } from "./fetch";
import type { ExtractedTurn } from "./turn-extractor";
import type { ResolvedCard } from "./card-resolver";

export interface RenderInput {
  replay: PersistedReplayData;
  turn: number;
  extracted: ExtractedTurn;
  resolvedCards: Map<string, ResolvedCard>;
}

export function renderTurn(input: RenderInput): string {
  const { replay, turn, extracted, resolvedCards } = input;
  const lines: string[] = [];

  lines.push(`=== REPLAY ${replay.gameId} · TURN ${turn} ===`);
  lines.push(
    `gameType=${replay.gameType} matchId=${replay.matchId} totalSteps=${replay.steps.length} totalTurns=${replay.metadata.totalTurns} totalMoves=${replay.metadata.totalMoves}`,
  );
  lines.push(`players=${replay.playerIds.join(" vs ")}`);
  lines.push("");

  // CARDS INVOLVED
  lines.push("--- CARDS INVOLVED ---");
  const byDef = new Map<string, { resolved: ResolvedCard; instances: string[] }>();
  for (const instId of extracted.involvedInstanceIds) {
    const defId = extracted.cardInstances[instId];
    if (!defId) continue;
    const resolved = resolvedCards.get(defId);
    if (!resolved) continue;
    let entry = byDef.get(defId);
    if (!entry) {
      entry = { resolved, instances: [] };
      byDef.set(defId, entry);
    }
    entry.instances.push(instId);
  }
  if (byDef.size === 0) {
    lines.push("(no card instances detected in this turn)");
  } else {
    const entries = [...byDef.values()].sort((a, b) =>
      a.resolved.fullName.localeCompare(b.resolved.fullName),
    );
    for (const { resolved, instances } of entries) {
      const filePath = resolved.filePath ?? "(no file resolved)";
      lines.push(`${resolved.defId}  ${resolved.fullName}  ${filePath}`);
      lines.push(`  instances: ${instances.join(", ")}`);
    }
  }
  lines.push("");

  // INITIAL STATE
  lines.push(`--- INITIAL STATE (before turn ${turn}) ---`);
  lines.push(JSON.stringify(extracted.preTurnState, null, 2));
  lines.push("");

  // STEPS
  lines.push("--- STEPS ---");
  for (const { globalIndex, step } of extracted.turnSteps) {
    const move = step.acceptedMove;
    lines.push(`[step ${globalIndex} · turn ${turn} · actor ${move.actorId}]`);
    lines.push(`move:    ${move.moveId} input=${JSON.stringify(move.input ?? null)}`);
    if (step.logs.length === 0) {
      lines.push("logs:    []");
    } else {
      lines.push("logs:");
      for (const log of step.logs) lines.push(`  ${JSON.stringify(log)}`);
    }
    if (step.patches.length === 0) {
      lines.push("patches: []");
    } else {
      lines.push("patches:");
      for (const p of step.patches) lines.push(`  ${JSON.stringify(p)}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
