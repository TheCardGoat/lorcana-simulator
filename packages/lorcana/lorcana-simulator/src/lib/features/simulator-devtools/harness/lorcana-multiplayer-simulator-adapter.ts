/**
 * Responsibility: simulator-facing adapter for Lorcana multiplayer testing.
 * Translates `LorcanaMultiplayerTestEngine` state/moves into UI snapshots with view-based masking.
 * This layer must not implement rules execution, transport behavior, or fixture seeding.
 *
 * Docs:
 * - ../ARCHITECTURE.md
 */

import {
  type DeepReadonly,
  type EnginePacketUpdate,
  type LorcanaCard,
  type LorcanaMatchState,
  type LorcanaProjectedBoardView,
} from "@tcg/lorcana-engine";
import {
  cardsAuxKv,
  getLocalizedCardSync,
  loadLocalization,
  resolveSimulatorCardLocale,
  type LocalizationData,
  type SupportedLocale,
} from "@tcg/lorcana-cards/data";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import {
  LORCANA_ZONE_IDS,
  LORCANA_SIMULATOR_VIEWS,
  type LorcanaCardSnapshot,
  type LorcanaCardTextEntrySnapshot,
  type LorcanaSimulatorLocale,
  type LorcanaPlayerSide,
  type LorcanaSimulatorReadModel,
  type LorcanaSimulatorFixture,
  type SimulatorSerializedObject,
  type SimulatorSerializedValue,
  type LorcanaSimulatorView,
  type LorcanaZoneId,
  type MoveLogEntrySnapshot,
  type MoveLogRelatedEntrySnapshot,
  assertLorcanaSimulatorMoveId,
} from "@/features/simulator/model/contracts.js";
import { formatEventLogBody } from "@/features/simulator/model/event-log-formatting.js";
import { m } from "$lib/i18n/messages.js";

const OWNER_BY_SIDE = {
  playerOne: PLAYER_ONE,
  playerTwo: PLAYER_TWO,
} as const;

function parseBaseZone(zoneId?: string): LorcanaZoneId | null {
  if (!zoneId) {
    return null;
  }
  const [baseZone] = zoneId.split(":");
  return LORCANA_ZONE_IDS.includes(baseZone as LorcanaZoneId) ? (baseZone as LorcanaZoneId) : null;
}

type LocalizedCardTextSource = string | Array<{ title: string; description?: string }>;

const ZONE_LABEL_MESSAGE_BY_ID: Record<LorcanaZoneId, string> = {
  deck: "sim.zone.deck",
  hand: "sim.zone.hand",
  play: "sim.zone.play",
  inkwell: "sim.zone.inkwell",
  discard: "sim.zone.discard",
  limbo: "sim.zone.limbo",
};

type SimulatorMoveInputSnapshot = {
  args: SimulatorSerializedObject;
};

type SimulatorMoveHistoryEntrySnapshot = {
  moveId: string;
  input?: SimulatorMoveInputSnapshot;
  playerId?: string;
  timestamp: number;
  turnNumber?: number;
};

function normalizeMoveParams(
  input?: SimulatorMoveInputSnapshot,
): SimulatorSerializedObject | undefined {
  return input?.args;
}

function snapshotDefaultMessage(defaultMessage?: {
  key: string;
  values: SimulatorSerializedObject;
}): MoveLogRelatedEntrySnapshot["defaultMessage"] {
  if (!defaultMessage) {
    return undefined;
  }

  return {
    key: defaultMessage.key,
    values: defaultMessage.values as SimulatorSerializedObject,
  };
}

function flattenCardText(
  text?: string | Array<{ title: string; description?: string }>,
): string | undefined {
  if (!text) return undefined;
  if (typeof text === "string") return text;

  return text
    .map((entry) => (entry.description ? `${entry.title} ${entry.description}` : entry.title))
    .join("\n");
}

function projectCardTextEntries(
  text?: string | Array<{ title: string; description?: string }>,
): LorcanaCardTextEntrySnapshot[] | undefined {
  if (!text || typeof text === "string") {
    return undefined;
  }

  const entries = text
    .map<LorcanaCardTextEntrySnapshot | null>((entry) => {
      const title = entry.title.trim();
      if (!title) {
        return null;
      }

      const description = entry.description?.trim();
      return {
        title,
        ...(description ? { description } : {}),
      };
    })
    .filter((entry): entry is LorcanaCardTextEntrySnapshot => entry !== null);

  return entries.length > 0 ? entries : undefined;
}

function getCardDisplayName(
  fullName?: string,
  definition?: { name: string; version?: string },
): string | undefined {
  if (fullName) {
    return fullName;
  }

  if (!definition) {
    return undefined;
  }

  return definition.version ? `${definition.name} - ${definition.version}` : definition.name;
}

/**
 * Lorcana Multiplayer Simulator Adapter
 *
 * A thin wrapper around LorcanaMultiplayerTestEngine that provides:
 * - Engine-native board access with display-card enrichment helpers
 * - Read-only projections for simulator consumers
 * - State ID tracking for efficient UI updates
 *
 * ## Architecture
 *
 * The session is deliberately minimal:
 * - No internal card registries (uses engine's CardQueryAPI)
 * - No knowledge of ctx.zones.private (uses engine projected board views)
 * - Fully synchronous construction (uses createWithFixture)
 *
 * ## Usage
 *
 * ```typescript
 * const adapter = LorcanaMultiplayerSimulatorAdapter.fromFixture(myFixture);
 * const snapshot = adapter.getSnapshot("playerOne");
 * const stateId = adapter.getStateID();
 * ```
 */
export class LorcanaMultiplayerSimulatorAdapter implements LorcanaSimulatorReadModel {
  #engine: LorcanaMultiplayerTestEngine;
  #locale: LorcanaSimulatorLocale = "en";
  #cardLocale: SupportedLocale = "en";
  #cardLocalization: LocalizationData | null = null;
  #localizationRequestId = 0;
  #localeRevision = 0;

  /**
   * Create an adapter from a fixture.
   *
   * This is the preferred way to create a session for testing/simulation.
   * Uses synchronous createWithFixture internally.
   */
  static fromFixture(fixture: LorcanaSimulatorFixture): LorcanaMultiplayerSimulatorAdapter {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      fixture.playerOne,
      fixture.playerTwo,
      {
        seed: fixture.seed ?? "simulator-default",
        skipPreGame: fixture.skipPreGame ?? true,
        validateSync: false,
      },
    );
    return new LorcanaMultiplayerSimulatorAdapter(engine);
  }

  constructor(engine: LorcanaMultiplayerTestEngine) {
    this.#engine = engine;
  }

  setLocale(locale: LorcanaSimulatorLocale): void {
    if (locale === this.#locale) {
      return;
    }

    const resolution = resolveSimulatorCardLocale(locale);

    this.#locale = locale;
    this.#cardLocale = resolution.cardLocale;
    this.#cardLocalization = null;
    this.#localizationRequestId += 1;
    this.#bumpLocaleRevision();

    if (resolution.cardLocale === "en") {
      return;
    }

    const requestId = this.#localizationRequestId;
    void loadLocalization(resolution.cardLocale)
      .then((localizationData) => {
        if (requestId !== this.#localizationRequestId) {
          return;
        }
        this.#cardLocalization = localizationData;
        this.#bumpLocaleRevision();
      })
      .catch(() => {
        if (requestId !== this.#localizationRequestId) {
          return;
        }
        this.#cardLocalization = null;
        this.#bumpLocaleRevision();
      });
  }

  /**
   * Get the current state ID for change detection.
   *
   * UI components can compare state IDs to avoid redundant updates.
   */
  getStateID(): number {
    return this.#engine.getStateID() * 1_000_000 + this.#localeRevision;
  }

  /**
   * Get the owner side for a given view.
   *
   * Returns null for spectator/authoritative views where no in-game player owns the engine.
   */
  getOwnerSide(view: LorcanaSimulatorView): LorcanaPlayerSide | null {
    return this.#resolveOwnerSide(view, this.#engine.getServerState());
  }

  getBoard(view: LorcanaSimulatorView): LorcanaProjectedBoardView {
    return this.#engine.getBoard(view);
  }

  getLegalActions(view: LorcanaSimulatorView): readonly unknown[] {
    const engine = this.#engine.getEngineForView(view) as unknown as {
      queryLegalActions?: () => readonly unknown[];
      engine?: {
        queryLegalActions?: () => readonly unknown[];
      };
    };

    if (typeof engine.queryLegalActions === "function") {
      return engine.queryLegalActions();
    }

    if (typeof engine.engine?.queryLegalActions === "function") {
      return engine.engine.queryLegalActions();
    }

    return [];
  }

  getCard(view: LorcanaSimulatorView, cardId: string): LorcanaCardSnapshot | null {
    const board = this.#engine.getBoard(view);
    const card = board.cards[cardId];
    if (!card) {
      return null;
    }

    const ownerSide = this.#resolveSideFromOwner(card.ownerId) ?? "playerOne";
    const zoneId = parseBaseZone(card.zone) ?? "deck";
    return this.#projectCard(board, cardId, ownerSide, zoneId);
  }

  getLastPacketUpdate(view: LorcanaSimulatorView = "playerOne"): EnginePacketUpdate | null {
    if (view === "authoritative") {
      return null;
    }

    return this.#engine.getClientEngine(view)?.getLastPacketUpdate() ?? null;
  }

  /**
   * Get the move log for display.
   */
  getMoveLog(limit = 50, view: LorcanaSimulatorView = "authoritative"): MoveLogEntrySnapshot[] {
    // Get ALL move history first to ensure correct cursor-based matching
    // against the full game log, then slice at the end for display.
    const allRawEntries = this.#engine.getMoveHistory() as SimulatorMoveHistoryEntrySnapshot[];
    const gameLogEntries = this.#getFilteredGameLogEntries(view);

    const moveExecutedLogs = gameLogEntries.filter(
      (entry) => entry.defaultMessage?.key === "move.executed",
    );

    // Calculate how many entries to skip for cursor positioning
    const skipCount = Math.max(0, allRawEntries.length - limit);
    let moveExecutedCursor = 0;

    // Fast-forward cursor past entries we're skipping
    // We need to match the skipped entries to their log entries
    for (let i = 0; i < skipCount; i++) {
      const skippedEntry = allRawEntries[i];
      const actorId = String(skippedEntry.playerId);
      while (moveExecutedCursor < moveExecutedLogs.length) {
        const candidate = moveExecutedLogs[moveExecutedCursor];
        const candidateValues = candidate.defaultMessage?.values ?? {};
        moveExecutedCursor += 1;
        if (candidateValues.move === skippedEntry.moveId && candidateValues.playerId === actorId) {
          break;
        }
      }
    }

    // Now process only the entries we'll return
    const entries = allRawEntries.slice(-limit);
    const viewerSide = view === "playerOne" || view === "playerTwo" ? view : undefined;

    return entries.map((entry, index) => {
      const params = normalizeMoveParams(entry.input);
      const actorSide = this.#resolveSideFromOwner(entry.playerId);
      const actorId = String(entry.playerId);
      const moveId = assertLorcanaSimulatorMoveId(entry.moveId);
      const rawMoveSnapshot = {
        moveId,
        params,
        playerId: actorId,
        timestamp: entry.timestamp,
      };

      let matchingMoveLogEntry: MoveLogRelatedEntrySnapshot | undefined;

      while (moveExecutedCursor < moveExecutedLogs.length && !matchingMoveLogEntry) {
        const candidate = moveExecutedLogs[moveExecutedCursor];
        const candidateValues = candidate.defaultMessage?.values ?? {};

        moveExecutedCursor += 1;

        if (candidateValues.move === moveId && candidateValues.playerId === actorId) {
          matchingMoveLogEntry = {
            sourceEventSeqs: [...candidate.sourceEventSeqs],
            defaultMessage: snapshotDefaultMessage(candidate.defaultMessage),
          };
        }
      }
      let relatedLogEntries: MoveLogRelatedEntrySnapshot[] = [];

      if (matchingMoveLogEntry) {
        const moveSourceSeqs = new Set<number>(matchingMoveLogEntry.sourceEventSeqs);
        for (const logEntry of gameLogEntries) {
          const sameSource = logEntry.sourceEventSeqs.some((seq) => moveSourceSeqs.has(seq));
          if (!sameSource) {
            continue;
          }

          relatedLogEntries.push({
            sourceEventSeqs: [...logEntry.sourceEventSeqs],
            defaultMessage: snapshotDefaultMessage(logEntry.defaultMessage),
          });
        }
      }

      const cardReferences = this.#buildLogCardReferences(params ?? {}, relatedLogEntries, view);
      const snapshotEntry: MoveLogEntrySnapshot = {
        actorSide,
        detail: undefined,
        id: `${entry.timestamp}-${index}-${entry.moveId}`,
        moveId,
        rawLogRegistry: {
          move: rawMoveSnapshot,
          matchingMoveLogEntry: matchingMoveLogEntry
            ? {
                sourceEventSeqs: [...matchingMoveLogEntry.sourceEventSeqs],
                defaultMessage: matchingMoveLogEntry.defaultMessage,
              }
            : undefined,
          relatedLogEntries,
          cardReferences,
        },
        timestamp: entry.timestamp,
        title: "",
        turnNumber: entry.turnNumber ?? 1,
      };

      const presentation = formatEventLogBody(snapshotEntry, viewerSide, this.#locale);

      return {
        ...snapshotEntry,
        title: presentation.text,
      };
    });
  }

  subscribeStateUpdates(handler: (stateID: number) => void): () => void {
    const unsubscribers: Array<() => void> = [];
    let lastNotifiedStateID = this.getStateID();

    const subscribeToView = (view: "playerOne" | "playerTwo" | "spectator") => {
      try {
        const engine = this.#engine.getEngineForView(view) as {
          onStateUpdate?: (
            callback: (state: unknown, stateID: number, packet: EnginePacketUpdate | null) => void,
          ) => () => void;
          engine?: {
            onStateUpdate?: (
              callback: (
                state: unknown,
                stateID: number,
                packet: EnginePacketUpdate | null,
              ) => void,
            ) => () => void;
          };
        };
        const subscribe =
          typeof engine.onStateUpdate === "function"
            ? engine.onStateUpdate.bind(engine)
            : typeof engine.engine?.onStateUpdate === "function"
              ? engine.engine.onStateUpdate.bind(engine.engine)
              : null;

        if (!subscribe) {
          return;
        }

        const unsubscribe = subscribe((_state, stateID, _packet) => {
          void stateID;
          const nextStateID = this.getStateID();
          if (nextStateID === lastNotifiedStateID) {
            return;
          }

          lastNotifiedStateID = nextStateID;
          handler(nextStateID);
        });
        unsubscribers.push(() => {
          try {
            unsubscribe();
          } catch {
            // Ignore cleanup failures so remaining view subscriptions still dispose.
          }
        });
      } catch {
        // Some simulator sessions do not allocate every client view.
      }
    };

    subscribeToView("playerOne");
    subscribeToView("playerTwo");
    subscribeToView("spectator");

    return () => {
      for (const unsubscribe of unsubscribers) {
        unsubscribe();
      }
    };
  }

  /**
   * Serialize the authoritative state for debug tooling.
   *
   * This powers the story-level debug panel so developers can inspect
   * the exact match payload currently held by the underlying test engine.
   */
  getSerializedState(indent = 2): string {
    return JSON.stringify(this.#engine.getAuthoritativeState(), null, indent);
  }

  /**
   * Clean up resources.
   */
  dispose(): void {
    void this.#engine.dispose();
  }

  // ===========================================================================
  // Private Helpers
  // ===========================================================================

  #bumpLocaleRevision(): void {
    this.#localeRevision = (this.#localeRevision + 1) % 1_000_000;
  }

  #translate(
    key: string,
    inputs: Record<string, unknown> = {},
    options?: { locale?: LorcanaSimulatorLocale },
  ): string {
    const messages = m as Record<
      string,
      (inputs?: Record<string, unknown>, options?: { locale?: LorcanaSimulatorLocale }) => string
    >;
    return messages[key](inputs, { locale: options?.locale ?? this.#locale });
  }

  #getPlayerLabel(side: LorcanaPlayerSide): string {
    if (side === "playerOne") {
      return this.#translate("sim.player.side.playerOne");
    }
    return this.#translate("sim.player.side.playerTwo");
  }

  #getZoneLabel(zoneId: LorcanaZoneId): string {
    return this.#translate(ZONE_LABEL_MESSAGE_BY_ID[zoneId]);
  }

  #formatDefaultCardLabel(side: LorcanaPlayerSide, zoneId: LorcanaZoneId): string {
    const zoneLabel = this.#getZoneLabel(zoneId);
    return this.#translate("sim.adapter.defaultCardLabel", {
      playerLabel: this.#getPlayerLabel(side),
      zoneLabel,
    });
  }

  #resolveCardShortId(definition: LorcanaCard | undefined, definitionId?: string): string | null {
    const shortIdFromDefinition =
      definition && typeof (definition as { id?: unknown }).id === "string"
        ? (definition as { id: string }).id
        : null;
    if (shortIdFromDefinition) {
      return shortIdFromDefinition;
    }

    if (!definitionId) {
      return null;
    }

    return cardsAuxKv.printingIdToShortId[definitionId] ?? null;
  }

  #resolveLocalizationEntry(shortId: string) {
    if (!this.#cardLocalization || this.#cardLocale === "en") {
      return undefined;
    }

    const direct = this.#cardLocalization[shortId];
    if (direct) {
      return direct;
    }

    const canonicalId = cardsAuxKv.canonicalIdByShortId[shortId];
    if (!canonicalId) {
      return undefined;
    }

    const representativeShortId = cardsAuxKv.representativeShortIdByCanonicalId[canonicalId];
    if (!representativeShortId) {
      return undefined;
    }

    return this.#cardLocalization[representativeShortId];
  }

  #resolveLocalizedCardProjection(
    shortId: string,
    fallbackDefinition: LorcanaCard | undefined,
  ): { label: string; text?: LocalizedCardTextSource } | null {
    if (!fallbackDefinition || this.#cardLocale === "en" || !this.#cardLocalization) {
      return null;
    }

    const localizedCard = getLocalizedCardSync(shortId, this.#cardLocale, this.#cardLocalization);
    if (!localizedCard) {
      return null;
    }

    const localizedEntry = this.#resolveLocalizationEntry(shortId);
    const label = localizedCard.version
      ? `${localizedCard.name} - ${localizedCard.version}`
      : localizedCard.name;

    return {
      label,
      text: localizedEntry?.text as LocalizedCardTextSource | undefined,
    };
  }

  #getFilteredGameLogEntries(view: LorcanaSimulatorView): Array<{
    category: "action" | "rules" | "system";
    defaultMessage?: { key: string; values: SimulatorSerializedObject };
    sourceEventSeqs: number[];
    visibility:
      | { mode: "PUBLIC" }
      | { mode: "PRIVATE"; visibleTo: string[] }
      | {
          mode: "PUBLIC_WITH_OVERRIDES";
          overrides: Record<string, { key: string; values: SimulatorSerializedObject }>;
        };
  }> {
    const sourceEntries = this.#engine
      .getServerEngine()
      .getRuntime()
      .getGameLog()
      .map((entry) => ({
        ...entry,
        defaultMessage: entry.defaultMessage
          ? {
              key: entry.defaultMessage.key,
              values: entry.defaultMessage.values as SimulatorSerializedObject,
            }
          : undefined,
        visibility:
          entry.visibility.mode === "PUBLIC_WITH_OVERRIDES"
            ? {
                mode: "PUBLIC_WITH_OVERRIDES" as const,
                overrides: Object.fromEntries(
                  Object.entries(entry.visibility.overrides).map(([playerId, override]) => [
                    playerId,
                    {
                      key: override.key,
                      values: override.values as SimulatorSerializedObject,
                    },
                  ]),
                ),
              }
            : entry.visibility,
      }));

    const role =
      view === "authoritative"
        ? { role: "judge" as const }
        : view === "spectator"
          ? { role: "spectator" as const }
          : {
              role: "player" as const,
              playerId: view === "playerOne" ? String(PLAYER_ONE) : String(PLAYER_TWO),
            };

    return sourceEntries.flatMap((entry) => {
      switch (entry.visibility.mode) {
        case "PUBLIC":
          return [entry];
        case "PRIVATE":
          if (role.role === "judge") {
            return [entry];
          }
          if (role.role === "player") {
            return entry.visibility.visibleTo.includes(role.playerId) ? [entry] : [];
          }
          return [];
        case "PUBLIC_WITH_OVERRIDES":
          if (role.role === "judge") {
            return [entry];
          }
          if (role.role === "player") {
            const overrideMessage = entry.visibility.overrides[role.playerId];
            if (overrideMessage) {
              return [
                {
                  ...entry,
                  visibility: {
                    mode: "PRIVATE" as const,
                    visibleTo: [role.playerId],
                  },
                  defaultMessage: overrideMessage,
                },
              ];
            }
          }
          return [
            {
              ...entry,
              visibility: { mode: "PUBLIC" as const },
              defaultMessage: entry.defaultMessage,
            },
          ];
      }
    });
  }

  #buildLogCardReferences(
    params: SimulatorSerializedObject,
    relatedLogEntries: MoveLogRelatedEntrySnapshot[],
    view: LorcanaSimulatorView = "authoritative",
  ): LorcanaCardSnapshot[] {
    const cardIds = new Set<string>();

    const addCardId = (value: SimulatorSerializedValue | undefined) => {
      if (typeof value === "string" && value.trim().length > 0) {
        cardIds.add(value);
      }
    };

    const addAllCardIds = (obj: SimulatorSerializedObject) => {
      addCardId(obj.cardId);
      addCardId(obj.attackerId);
      addCardId(obj.characterId);
      addCardId(obj.defenderId);
      addCardId(obj.locationId);
      addCardId(obj.shiftTargetId);
      addCardId(obj.sourceCardId);
      addCardId(obj.sourceId);

      for (const listKey of [
        "cardIds",
        "drawn",
        "lookedAt",
        "mulliganed",
        "singerIds",
        "targets",
      ]) {
        const list = obj[listKey];
        if (Array.isArray(list)) {
          for (const item of list) {
            addCardId(item);
          }
        }
      }
    };

    addAllCardIds(params);

    for (const entry of relatedLogEntries) {
      const values = entry.defaultMessage?.values;
      if (!values) {
        continue;
      }

      addAllCardIds(values);
    }

    if (cardIds.size === 0) {
      return [];
    }

    // Use the viewer's board so hand cards are fully visible for the owner.
    const board = this.#engine.getBoard(view);
    const references: LorcanaCardSnapshot[] = [];

    for (const cardId of cardIds) {
      const card = board.cards[cardId];
      if (card) {
        const ownerSide = this.#resolveSideFromOwner(card.ownerId) ?? "playerOne";
        const zoneId = parseBaseZone(card.zone) ?? "deck";
        references.push(this.#projectCard(board, cardId, ownerSide, zoneId));
        continue;
      }

      // Fallback for cards not in the projected board (e.g. deck cards after mulligan).
      // Look up the definition directly from the instance registry.
      const definition = this.#engine.getCardDefinition(cardId) as LorcanaCard | undefined;
      if (!definition) {
        continue;
      }

      const shortId = this.#resolveCardShortId(definition, undefined);
      const localizedProjection = shortId
        ? this.#resolveLocalizedCardProjection(shortId, definition)
        : null;
      const label =
        localizedProjection?.label ?? getCardDisplayName(undefined, definition) ?? definition.name;

      references.push({
        cardId,
        definitionId: definition.id,
        isMasked: false,
        label,
        ownerId: "",
        ownerSide: "playerOne",
        zoneId: "deck",
        facePresentation: "faceUp",
        cardType: definition.cardType,
        inkType: definition.inkType,
        cost: definition.cost,
        inkable: definition.inkable,
      });
    }

    return references;
  }

  #projectCard(
    board: LorcanaProjectedBoardView,
    cardId: string,
    ownerSide: LorcanaPlayerSide,
    zoneId: LorcanaZoneId,
  ): LorcanaCardSnapshot {
    const card = board.cards[cardId];
    const cardDefinition = card?.hidden ? undefined : this.#engine.getCardDefinition(cardId);
    const ownerId = card?.ownerId ?? String(OWNER_BY_SIDE[ownerSide]);

    const defaultLabel = this.#formatDefaultCardLabel(ownerSide, zoneId);

    const shortId = this.#resolveCardShortId(cardDefinition as LorcanaCard, card?.definitionId);
    const localizedProjection = shortId
      ? this.#resolveLocalizedCardProjection(shortId, cardDefinition as LorcanaCard)
      : null;
    const cardName =
      localizedProjection?.label ?? getCardDisplayName(card?.fullName, cardDefinition);
    const locationCard =
      card?.atLocationId !== undefined ? board.cards[card.atLocationId] : undefined;
    const locationDefinition =
      locationCard?.hidden === true || !card?.atLocationId
        ? undefined
        : this.#engine.getCardDefinition(card.atLocationId);
    const atLocationLabel = getCardDisplayName(locationCard?.fullName, locationDefinition);

    const cardText = localizedProjection?.text ?? cardDefinition?.text;
    const keywords = card?.keywords ?? [];
    const facePresentation =
      zoneId === "inkwell" ? (card?.hidden ? "faceDown" : "faceUp") : "faceUp";
    const readyState =
      card?.exerted === true ? "exerted" : card?.exerted === false ? "ready" : "unknown";
    const isMasked = card?.hidden === true;

    return {
      cardId,
      atLocationId: card?.atLocationId,
      atLocationLabel,
      baseLoreValue:
        cardDefinition?.cardType === "character" || cardDefinition?.cardType === "location"
          ? (cardDefinition as { lore?: number }).lore
          : undefined,
      baseStrength: cardDefinition?.cardType === "character" ? cardDefinition.strength : undefined,
      baseWillpower:
        cardDefinition?.cardType === "character" || cardDefinition?.cardType === "location"
          ? cardDefinition.willpower
          : undefined,
      cardNumber: cardDefinition?.cardNumber,
      cardType: cardDefinition?.cardType,
      cost: cardDefinition?.cost,
      cardsUnderCount: card?.cardsUnder?.length ?? 0,
      classifications:
        cardDefinition?.cardType === "character" ? cardDefinition.classifications : undefined,
      inkable: cardDefinition?.inkable,
      damage: card?.damage ?? 0,
      definitionId: card?.definitionId ?? cardId,
      inkType: cardDefinition?.inkType,
      keywordValues: card?.keywordValues,
      keywords,
      hasQuestRestriction: card?.hasQuestRestriction ?? false,
      isDrying: card?.drying ?? false,
      isMasked,
      facePresentation,
      label: isMasked
        ? zoneId === "deck"
          ? this.#translate("sim.card.hiddenDeck")
          : this.#translate("sim.card.hidden")
        : (cardName ?? defaultLabel),
      loreValue:
        cardDefinition?.cardType === "character" || cardDefinition?.cardType === "location"
          ? (card?.lore ?? (cardDefinition as { lore?: number }).lore)
          : undefined,
      ownerId,
      ownerSide,
      readyState,
      set: cardDefinition?.set,
      moveCost:
        cardDefinition?.cardType === "location"
          ? (card?.moveCost ?? cardDefinition.moveCost)
          : undefined,
      strength: cardDefinition?.cardType === "character" ? card?.strength : undefined,
      temporaryRestrictions: card?.temporaryRestrictions,
      text: flattenCardText(cardText),
      textEntries: projectCardTextEntries(cardText),
      willpower:
        cardDefinition?.cardType === "character" || cardDefinition?.cardType === "location"
          ? card?.willpower
          : undefined,
      zoneId,
    };
  }

  #resolveOwnerSide(
    view: LorcanaSimulatorView,
    state: DeepReadonly<LorcanaMatchState>,
  ): LorcanaPlayerSide | null {
    void state;

    const actorContext = this.#getActorContextForView(view);
    if (!actorContext || actorContext.role !== "player" || !actorContext.playerId) {
      return null;
    }

    return this.#resolveSideFromOwner(actorContext.playerId) ?? null;
  }

  #getActorContextForView(
    view: LorcanaSimulatorView,
  ): { role: "player" | "spectator" | "judge"; playerId?: string } | null {
    switch (view) {
      case "playerOne": {
        return this.#engine.asPlayerOne().getActorContext();
      }

      case "playerTwo": {
        return this.#engine.asPlayerTwo().getActorContext();
      }

      case "spectator": {
        return (
          this.#engine.getClientEngine("spectator")?.getActorContext() ?? { role: "spectator" }
        );
      }

      case "authoritative": {
        return this.#engine.getServerEngine().getActorContext();
      }

      default: {
        return null;
      }
    }
  }

  #resolveSideFromOwner(ownerId?: string): LorcanaPlayerSide | undefined {
    if (!ownerId) {
      return undefined;
    }

    if (String(ownerId) === String(PLAYER_ONE)) {
      return "playerOne";
    }

    if (String(ownerId) === String(PLAYER_TWO)) {
      return "playerTwo";
    }
    return undefined;
  }
}
