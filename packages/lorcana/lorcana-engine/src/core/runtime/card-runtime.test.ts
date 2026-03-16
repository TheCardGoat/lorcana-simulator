import { describe, expect, it } from "bun:test";
import { createPlayerId } from "../types";
import { createCardQueryAPI } from "./card-runtime";
import { createRecordCardCatalog, createRecordCardInstanceRegistry } from "./static-resources";
import { createInitialTCGCtx } from "./types";
import type { MatchState } from "./types";
import type { ZoneConfig } from "./match-runtime.types";

// Minimal zone definitions for testing (avoids dependency on @tcg/lorcana-engine)
const testZones: Record<string, ZoneConfig> = {
  deck: { id: "deck", name: "Deck", visibility: "secret", ordered: true, ownerScoped: true },
  hand: { id: "hand", name: "Hand", visibility: "private", ordered: false, ownerScoped: true },
  play: { id: "play", name: "Play", visibility: "public", ordered: false, ownerScoped: true },
};

type TestDef = { id: string; canonicalId: string; name: string; cardType: string };

describe("card-runtime", () => {
  it("resolves runtime card view from static resources + ctx.zones", () => {
    const ctx = createInitialTCGCtx({
      matchID: "match-1",
      gameID: "lorcana",
      rulesetHash: "ruleset-1",
    });
    ctx.zones.zoneDefs.deck = {
      id: "deck",
      name: "Deck",
      visibility: "secret",
      ordered: true,
      ownerScoped: true,
    };
    ctx.zones.public.zoneSummaries.deck = { revision: 0, count: 1 };
    ctx.zones.private.zoneCards.deck = ["c000001"];
    ctx.zones.private.cardIndex.c000001 = {
      zoneKey: "deck",
      index: 0,
      ownerID: createPlayerId("p1"),
      controllerID: createPlayerId("p1"),
    };
    ctx.zones.private.cardMeta.c000001 = { damage: 2, state: "ready" };

    const state: MatchState<{ ok: true }> = {
      G: { ok: true },
      ctx,
    };

    const cards = createCardQueryAPI(
      state,
      {
        zoneDefinitions: testZones,
        cards: createRecordCardCatalog<TestDef>("cards:test", {
          alpha: {
            id: "alpha",
            canonicalId: "alpha",
            name: "Alpha Unit",
            cardType: "unit",
          },
        }),
        instances: createRecordCardInstanceRegistry("instances:test", {
          c000001: {
            instanceId: "c000001",
            definitionId: "alpha",
            ownerID: "p1",
          },
        }),
      },
      {
        deriveRuntimeCard: ({ card }) => ({
          isOwnedByP1: () => card.ownerID === "p1",
          getZoneOrUnknown: () => card.zoneID ?? "unknown",
        }),
      },
    );

    const card = cards.require("c000001");
    expect(card.instanceId).toBe("c000001");
    expect(card.definitionId).toBe("alpha");
    expect(card.definition.name).toBe("Alpha Unit");
    expect(card.ownerID).toBe("p1");
    expect(card.controllerID).toBe("p1");
    expect(card.zoneID).toBe("deck");
    expect(card.meta.damage).toBe(2);
    expect(card.isOwnedByP1()).toBe(true);
    expect(card.getZoneOrUnknown()).toBe("deck");
  });

  it("queryRuntime filters by owner and zones while preserving candidate order", () => {
    const ctx = createInitialTCGCtx({
      matchID: "match-2",
      gameID: "lorcana",
      rulesetHash: "ruleset-2",
    });

    ctx.zones.zoneDefs["hand:p1"] = {
      id: "hand:p1",
      name: "Hand p1",
      visibility: "private",
      ordered: false,
      ownerScoped: true,
    };
    ctx.zones.zoneDefs["hand:p2"] = {
      id: "hand:p2",
      name: "Hand p2",
      visibility: "private",
      ordered: false,
      ownerScoped: true,
    };
    ctx.zones.zoneDefs["play:p1"] = {
      id: "play:p1",
      name: "Play p1",
      visibility: "public",
      ordered: false,
      ownerScoped: true,
    };

    ctx.zones.private.zoneCards["hand:p1"] = ["c1", "c2"];
    ctx.zones.private.zoneCards["hand:p2"] = ["c3"];
    ctx.zones.private.zoneCards["play:p1"] = ["c4"];

    ctx.zones.private.cardIndex.c1 = {
      zoneKey: "hand:p1",
      index: 0,
      ownerID: createPlayerId("p1"),
      controllerID: createPlayerId("p1"),
    };
    ctx.zones.private.cardIndex.c2 = {
      zoneKey: "hand:p1",
      index: 1,
      ownerID: createPlayerId("p1"),
      controllerID: createPlayerId("p1"),
    };
    ctx.zones.private.cardIndex.c3 = {
      zoneKey: "hand:p2",
      index: 0,
      ownerID: createPlayerId("p2"),
      controllerID: createPlayerId("p2"),
    };
    ctx.zones.private.cardIndex.c4 = {
      zoneKey: "play:p1",
      index: 0,
      ownerID: createPlayerId("p1"),
      controllerID: createPlayerId("p1"),
    };

    const state: MatchState<{ ok: true }> = {
      G: { ok: true },
      ctx,
    };

    const staticResources = {
      zoneDefinitions: testZones,
      cards: createRecordCardCatalog<TestDef>("cards:test", {
        alpha: { id: "alpha", canonicalId: "alpha", name: "Alpha", cardType: "unit" },
        beta: { id: "beta", canonicalId: "beta", name: "Beta", cardType: "unit" },
        gamma: { id: "gamma", canonicalId: "gamma", name: "Gamma", cardType: "unit" },
        delta: { id: "delta", canonicalId: "delta", name: "Delta", cardType: "unit" },
      }),
      instances: createRecordCardInstanceRegistry("instances:test", {
        c1: { instanceId: "c1", definitionId: "alpha", ownerID: "p1" },
        c2: { instanceId: "c2", definitionId: "beta", ownerID: "p1" },
        c3: { instanceId: "c3", definitionId: "gamma", ownerID: "p2" },
        c4: { instanceId: "c4", definitionId: "delta", ownerID: "p1" },
      }),
    };

    const cards = createCardQueryAPI(state, staticResources, {
      actorPlayerId: "p1",
      deriveRuntimeCard: ({ card, actorPlayerId }) => ({
        isOwnedByActor: () => card.ownerID === actorPlayerId,
      }),
    });

    const ownHandCards = cards.queryRuntime({
      selector: "chosen",
      count: 1,
      owner: "you",
      zones: ["hand"],
    });
    expect(ownHandCards.map((card) => card.instanceId)).toEqual(["c1", "c2"]);

    const opponentHandCards = cards.queryRuntime({
      owner: "opponent",
      zones: ["hand"],
    });
    expect(opponentHandCards.map((card) => card.instanceId)).toEqual(["c3"]);

    const playCards = cards.queryRuntime({
      zones: ["play"],
    });
    expect(playCards.map((card) => card.instanceId)).toEqual(["c4"]);

    const projected = cards.queryRuntime(
      { owner: "you", zones: ["hand", "hand:p1"] },
      (card) => `${card.instanceId}:${card.definitionId}:${card.isOwnedByActor()}`,
    );
    expect(projected).toEqual(["c1:alpha:true", "c2:beta:true"]);
  });
});
