import { describe, expect, it } from "bun:test";
import { stripPrivateFields } from "@tcg/lorcana-engine";
import {
  CANONICAL_PLAYER_ONE,
  CANONICAL_PLAYER_TWO,
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { tipoGrowingSon } from "./157-tipo-growing-son";

const practicedDetective = createMockCharacter({
  id: "tipo-practiced-detective",
  name: "Practiced Detective",
  cost: 1,
});

/**
 * MEASURE ME AGAIN puts a card from the controller's hand into their inkwell
 * facedown and exerted. The card moves from a private zone (hand) to a private
 * zone (inkwell, where every card is facedown by rule).
 *
 * These tests document what each role (owner / opponent / spectator) sees in
 * the move log when the optional ability is accepted with a chosen target.
 *
 * Owner   = controller of Tipo (player_one)
 * Opponent = player_two
 * Spectator = viewerId === null (no role-based access)
 */
describe("Tipo - Growing Son — log lines per perspective", () => {
  function setup() {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [tipoGrowingSon, practicedDetective],
      inkwell: tipoGrowingSon.cost,
      deck: 1,
    });
    const detectiveId = engine.findCardInstanceId(practicedDetective, "hand", "p1");
    const tipoId = engine.findCardInstanceId(tipoGrowingSon, "hand", "p1");

    expect(engine.asPlayerOne().playCard(tipoGrowingSon)).toBeSuccessfulCommand();
    expect(
      engine.asPlayerOne().resolvePendingByCard(tipoGrowingSon, {
        resolveOptional: true,
        targets: [detectiveId],
      }),
    ).toBeSuccessfulCommand();

    const moveLogs = engine.getServerEngine().getRuntime().getMoveLogHistory();

    return { engine, detectiveId, tipoId, moveLogs };
  }

  it("playCard log entry is identical for all viewers (Tipo enters play face-up)", () => {
    const { tipoId, moveLogs } = setup();
    const playCardEntry = moveLogs.find((log) => log.type === "playCard");

    expect(playCardEntry).toMatchObject({
      type: "playCard",
      playerId: CANONICAL_PLAYER_ONE,
      cardId: tipoId,
    });

    const owner = stripPrivateFields(playCardEntry, CANONICAL_PLAYER_ONE);
    const opponent = stripPrivateFields(playCardEntry, CANONICAL_PLAYER_TWO);
    const spectator = stripPrivateFields(playCardEntry, null);

    // Tipo itself is public information (it was played from hand into play),
    // so all three perspectives see the same entry.
    expect(owner).toEqual(opponent);
    expect(owner).toEqual(spectator);
  });

  it("hides resolveBag targets from opponent and spectator (so the rendered log says 'Resolved MEASURE ME AGAIN from Tipo' without naming the inked card)", () => {
    const { detectiveId, moveLogs } = setup();
    const resolveBagEntry = moveLogs.find((log) => log.type === "resolveBag");

    expect(resolveBagEntry).toMatchObject({
      type: "resolveBag",
      playerId: CANONICAL_PLAYER_ONE,
      status: "completed",
    });

    type Stripped = {
      type: string;
      playerId: string;
      status?: string;
      sourceCardId?: string;
      resolution?: { kind: string; targets?: string[] };
    };
    const owner = stripPrivateFields(resolveBagEntry, CANONICAL_PLAYER_ONE) as Stripped;
    const opponent = stripPrivateFields(resolveBagEntry, CANONICAL_PLAYER_TWO) as Stripped;
    const spectator = stripPrivateFields(resolveBagEntry, null) as Stripped;

    // Owner sees the targeted card's id, which the formatter renders as
    // "Resolved MEASURE ME AGAIN from Tipo - Growing Son, targeting <name>".
    expect(owner.resolution).toEqual({ kind: "targets", targets: [detectiveId] });

    // Opponent and spectator must NOT see the targets — otherwise the
    // formatter would name the facedown card. After stripping, targets is
    // undefined and the formatter falls back to the no-targets phrasing
    // ("Resolved MEASURE ME AGAIN from Tipo - Growing Son.").
    expect(opponent.resolution).toEqual({ kind: "targets", targets: undefined });
    expect(spectator.resolution).toEqual({ kind: "targets", targets: undefined });

    // Public scaffolding (status, source, ability) stays visible to all.
    const publicShape = (s: Stripped) => ({
      type: s.type,
      playerId: s.playerId,
      status: s.status,
      sourceCardId: s.sourceCardId,
    });
    expect(publicShape(opponent)).toEqual(publicShape(owner));
    expect(publicShape(spectator)).toEqual(publicShape(owner));
  });

  it("hides the inked card's id and name from opponent and spectator", () => {
    const { detectiveId, moveLogs } = setup();

    // The cardsInked outcome is attached to whichever move log captured the
    // resolution batch (resolveBag when the optional collapses immediately,
    // resolveEffect when target selection is split). We don't care which —
    // we just want to assert what each role sees of the inked-card detail.
    type WithInked = { outcomes?: { cardsInked?: unknown[] } };
    const inkingEntry = moveLogs.find(
      (log): log is typeof log & WithInked =>
        "outcomes" in log &&
        Array.isArray((log as WithInked).outcomes?.cardsInked) &&
        ((log as WithInked).outcomes?.cardsInked?.length ?? 0) > 0,
    );
    expect(inkingEntry).toBeDefined();

    const owner = stripPrivateFields(inkingEntry, CANONICAL_PLAYER_ONE) as WithInked;
    const opponent = stripPrivateFields(inkingEntry, CANONICAL_PLAYER_TWO) as WithInked;
    const spectator = stripPrivateFields(inkingEntry, null) as WithInked;

    // Owner sees the inked card's id; the renderer resolves the name from
    // staticResources keyed off cardId, so no cardName is stored on the log
    // entry itself (see commit 48659b444 — "resolve card names from
    // staticResources instead of live board").
    expect(owner.outcomes?.cardsInked).toEqual([{ cardId: detectiveId, exerted: true }]);

    // Opponent sees that an ink happened (entry present, exerted flag public)
    // but cannot see which card was inked — cardId strips to undefined under
    // PrivateField stripping, which is the actual visibility contract.
    expect(opponent.outcomes?.cardsInked).toEqual([{ cardId: undefined, exerted: true }]);

    // Spectator (no role-based access) sees the same as the opponent.
    expect(spectator.outcomes?.cardsInked).toEqual(opponent.outcomes?.cardsInked);
  });

  it("snapshots the full per-perspective move log shape", () => {
    const { moveLogs } = setup();

    // Strip timestamps and ids so the snapshot focuses on visibility, not time.
    const normalize = (logs: readonly unknown[]) =>
      logs.map((log) => {
        if (log === null || typeof log !== "object") return log;
        const { timestamp: _t, ...rest } = log as { timestamp?: number };
        return rest;
      });

    const ownerView = normalize(
      moveLogs.map((log) => stripPrivateFields(log, CANONICAL_PLAYER_ONE)),
    );
    const opponentView = normalize(
      moveLogs.map((log) => stripPrivateFields(log, CANONICAL_PLAYER_TWO)),
    );
    const spectatorView = normalize(moveLogs.map((log) => stripPrivateFields(log, null)));

    // Each role sees the same number of entries (visibility is field-level,
    // not entry-level, so entries are never dropped — only their fields).
    expect(ownerView).toHaveLength(moveLogs.length);
    expect(opponentView).toHaveLength(moveLogs.length);
    expect(spectatorView).toHaveLength(moveLogs.length);

    // Types preserved across roles.
    const types = (logs: readonly unknown[]) => logs.map((log) => (log as { type: string }).type);
    expect(types(ownerView)).toEqual(types(opponentView));
    expect(types(ownerView)).toEqual(types(spectatorView));

    // Owner and opponent diverge: the cardsInked entry strips cardId/cardName
    // for non-owners. Opponent and spectator see identical (masked) views.
    expect(opponentView).not.toEqual(ownerView);
    expect(spectatorView).toEqual(opponentView);
  });
});
