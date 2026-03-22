import type { EnginePacketUpdate } from "@tcg/lorcana-engine";
import type { LorcanaProjectedBoardView } from "@tcg/lorcana-engine";
import type {
  CardFacePresentation,
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
  LorcanaZoneId,
  MoveLogEntrySnapshot,
} from "@/features/simulator/model/contracts.js";
import { getSideForOwnerId, getZoneCardIds } from "@/features/simulator/model/contracts.js";

export const BOARD_CENTER_ANCHOR_ID = "board:center";
const DEBUG_BOARD_ANIMATIONS = true;

export type BoardMoveAnimationVariant =
  | "ink-faceDown"
  | "ink-faceUp"
  | "move-to-location"
  | "play-character"
  | "play-item"
  | "play-location"
  | "play-action"
  | "play-action-preview";

export type SimulatorDebugAnimationPlayer = "player_one" | "player_two";

export interface SimulatorDebugAnimationRequest {
  id: string;
  kind: "play.action" | "lorcana.boardMove";
  payload: {
    cardId: string;
    player: SimulatorDebugAnimationPlayer;
    variant?: BoardMoveAnimationVariant;
  };
}

export interface BoardAnchorRect {
  left: number;
  top: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export interface BoardLocalRect {
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export interface BoardAnchorSnapshot {
  revision: number;
  boardRect: BoardAnchorRect;
  anchors: Record<string, BoardAnchorRect>;
}

type AnchorReference = {
  primaryId: string;
  fallbackId?: string;
};

export interface QueuedBoardMoveAnimation {
  actorSide: LorcanaPlayerSide;
  card: LorcanaCardSnapshot;
  destination: AnchorReference;
  destinationZoneId: LorcanaZoneId;
  durationMs: number;
  id: string;
  impactAt: "destination" | "via";
  moveLogId: string;
  renderFace: CardFacePresentation;
  source: AnchorReference;
  variant: BoardMoveAnimationVariant;
  via?: AnchorReference;
}

export interface ResolvedBoardMoveAnimation {
  card: LorcanaCardSnapshot;
  destinationRect: BoardLocalRect;
  destinationZoneId: LorcanaZoneId;
  durationMs: number;
  id: string;
  impactAt: "destination" | "via";
  impactRect: BoardLocalRect;
  renderFace: CardFacePresentation;
  sourceRect: BoardLocalRect;
  variant: BoardMoveAnimationVariant;
  viaRect?: BoardLocalRect;
}

type CardLocation = {
  card: LorcanaCardSnapshot;
  side: LorcanaPlayerSide;
  zoneId: LorcanaZoneId;
};

export const VARIANT_DURATION_MS: Record<BoardMoveAnimationVariant, number> = {
  "ink-faceDown": 560,
  "ink-faceUp": 620,
  "move-to-location": 800,
  "play-action": 2200,
  "play-action-preview": 2000,
  "play-character": 2000,
  "play-item": 1800,
  "play-location": 1800,
};

export function getAnimationSpeedMultiplier(speed: "fast" | "normal" | "slow"): number {
  switch (speed) {
    case "fast":
      return 0.6;
    case "normal":
      return 1.0;
    case "slow":
      return 1.5;
    default: {
      const _exhaustive: never = speed;
      return 1.0;
    }
  }
}

type BoardMovePacketPayload = {
  actorPlayerId: string;
  actorSide: LorcanaPlayerSide;
  cardId: string;
  destinationZoneId: LorcanaZoneId;
  impactAt: "destination" | "via";
  renderFace: CardFacePresentation;
  sourceZoneId: LorcanaZoneId;
  variant: BoardMoveAnimationVariant;
  viaAnchorId?: string;
};

export function createZoneAnchorId(side: LorcanaPlayerSide, zoneId: LorcanaZoneId): string {
  return `zone:${side}:${zoneId}`;
}

export function createCardAnchorId(
  side: LorcanaPlayerSide,
  zoneId: LorcanaZoneId,
  cardId: string,
): string {
  return `card:${side}:${zoneId}:${cardId}`;
}

export function createSeatHandAnchorId(side: LorcanaPlayerSide): string {
  return `seat-hand:${side}`;
}

export function measureBoardAnchorRect(
  rect: Pick<DOMRect, "left" | "top" | "width" | "height">,
): BoardAnchorRect {
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2,
  };
}

export function getNewMoveLogEntries(
  previousEntries: MoveLogEntrySnapshot[],
  nextEntries: MoveLogEntrySnapshot[],
): MoveLogEntrySnapshot[] {
  if (nextEntries.length === 0) {
    return [];
  }

  if (previousEntries.length === 0) {
    return nextEntries;
  }

  const previousIds = new Set(previousEntries.map((entry) => entry.id));
  return nextEntries.filter((entry) => !previousIds.has(entry.id));
}

export function deriveQueuedBoardMoveAnimations(
  previousSnapshot: LorcanaProjectedBoardView | null,
  nextSnapshot: LorcanaProjectedBoardView | null,
  newEntries: MoveLogEntrySnapshot[],
  resolveCard: (cardId: string) => LorcanaCardSnapshot | null,
): QueuedBoardMoveAnimation[] {
  if (!previousSnapshot || !nextSnapshot || newEntries.length === 0) {
    if (DEBUG_BOARD_ANIMATIONS && newEntries.length > 0) {
      console.log("[board-move-animations] Skipping derive due to missing snapshot", {
        hasPreviousSnapshot: previousSnapshot !== null,
        hasNextSnapshot: nextSnapshot !== null,
        newEntryIds: newEntries.map((entry) => entry.id),
      });
    }
    return [];
  }

  const queued: QueuedBoardMoveAnimation[] = [];

  for (const entry of newEntries) {
    const move = entry.rawLogRegistry?.move;
    const moveId = move?.moveId ?? entry.moveId;
    const params = move?.params ?? {};
    const cardId = getMoveCardId(entry);

    if (DEBUG_BOARD_ANIMATIONS) {
      console.log("[board-move-animations] Considering move-log entry", {
        entryId: entry.id,
        moveId,
        actorSide: entry.actorSide ?? null,
        params,
        cardId: cardId ?? null,
        cardReferenceIds: entry.rawLogRegistry?.cardReferences?.map((card) => card.cardId) ?? [],
      });
    }

    if (moveId === "putCardIntoInkwell" && typeof cardId === "string") {
      const queuedInk = deriveInkAnimation(
        previousSnapshot,
        nextSnapshot,
        entry,
        cardId,
        resolveCard,
      );
      if (queuedInk) {
        queued.push(queuedInk);
        if (DEBUG_BOARD_ANIMATIONS) {
          console.log("[board-move-animations] Derived ink animation", {
            id: queuedInk.id,
            cardId: queuedInk.card.cardId,
            source: queuedInk.source,
            destination: queuedInk.destination,
            renderFace: queuedInk.renderFace,
            variant: queuedInk.variant,
          });
        }
      } else if (DEBUG_BOARD_ANIMATIONS) {
        console.log("[board-move-animations] No ink animation derived", {
          entryId: entry.id,
          cardId,
        });
      }
      continue;
    }

    if (moveId === "playCard" && typeof cardId === "string") {
      const queuedPlay = derivePlayAnimation(
        previousSnapshot,
        nextSnapshot,
        entry,
        cardId,
        resolveCard,
      );
      if (queuedPlay) {
        queued.push(queuedPlay);
        if (DEBUG_BOARD_ANIMATIONS) {
          console.log("[board-move-animations] Derived play animation", {
            id: queuedPlay.id,
            cardId: queuedPlay.card.cardId,
            source: queuedPlay.source,
            via: queuedPlay.via ?? null,
            destination: queuedPlay.destination,
            variant: queuedPlay.variant,
          });
        }
      } else if (DEBUG_BOARD_ANIMATIONS) {
        console.log("[board-move-animations] No play animation derived", {
          entryId: entry.id,
          cardId,
        });
      }
    }
  }

  if (DEBUG_BOARD_ANIMATIONS) {
    console.log("[board-move-animations] Finished derive", {
      queuedCount: queued.length,
      queuedIds: queued.map((animation) => animation.id),
    });
  }

  return queued;
}

export function deriveQueuedBoardMoveAnimationsFromPacket(
  previousSnapshot: LorcanaProjectedBoardView | null,
  nextSnapshot: LorcanaProjectedBoardView | null,
  packet: EnginePacketUpdate | null,
  resolveCard: (cardId: string) => LorcanaCardSnapshot | null,
  durationMultiplier = 1,
): QueuedBoardMoveAnimation[] {
  if (!previousSnapshot || !nextSnapshot || !packet || packet.animations.length === 0) {
    return [];
  }

  const queued: QueuedBoardMoveAnimation[] = [];
  for (const animation of packet.animations) {
    if (animation.kind !== "lorcana.boardMove") {
      continue;
    }

    const payload = animation.payload as Partial<BoardMovePacketPayload>;
    if (
      !payload ||
      typeof payload.cardId !== "string" ||
      typeof payload.sourceZoneId !== "string" ||
      typeof payload.destinationZoneId !== "string" ||
      typeof payload.variant !== "string" ||
      (payload.impactAt !== "destination" && payload.impactAt !== "via") ||
      (payload.renderFace !== "faceDown" && payload.renderFace !== "faceUp") ||
      (payload.actorSide !== "playerOne" && payload.actorSide !== "playerTwo")
    ) {
      continue;
    }

    const nextLocation = findCardLocation(nextSnapshot, payload.cardId, resolveCard);
    if (!nextLocation) {
      continue;
    }

    const previousLocation = findCardLocation(previousSnapshot, payload.cardId, resolveCard);
    queued.push({
      actorSide: payload.actorSide,
      card: nextLocation.card,
      destination:
        payload.destinationZoneId === "discard"
          ? {
              primaryId: createCardAnchorId(nextLocation.side, "discard", payload.cardId),
              fallbackId: createZoneAnchorId(nextLocation.side, "discard"),
            }
          : buildCardDestination(nextLocation),
      destinationZoneId: payload.destinationZoneId,
      durationMs: Math.round(VARIANT_DURATION_MS[payload.variant] * durationMultiplier),
      id: animation.id,
      impactAt: payload.impactAt,
      moveLogId: packet.processedCommand.commandID,
      renderFace: payload.renderFace,
      source: buildSourceAnchor(previousLocation, payload.actorSide),
      variant: payload.variant,
      via: payload.viaAnchorId ? { primaryId: payload.viaAnchorId } : undefined,
    });
  }

  return queued;
}

function getMoveCardId(entry: MoveLogEntrySnapshot): string | null {
  const paramsCardId = entry.rawLogRegistry?.move.params?.cardId;
  if (typeof paramsCardId === "string" && paramsCardId.trim().length > 0) {
    return paramsCardId;
  }

  const referencedCardId = entry.rawLogRegistry?.cardReferences?.[0]?.cardId;
  if (typeof referencedCardId === "string" && referencedCardId.trim().length > 0) {
    return referencedCardId;
  }

  return null;
}

export function resolveQueuedBoardMoveAnimation(
  animation: QueuedBoardMoveAnimation,
  previousAnchors: BoardAnchorSnapshot | null,
  nextAnchors: BoardAnchorSnapshot | null,
): ResolvedBoardMoveAnimation | null {
  if (!nextAnchors) {
    if (DEBUG_BOARD_ANIMATIONS) {
      console.log("[board-move-animations] Cannot resolve animation without next anchors", {
        id: animation.id,
      });
    }
    return null;
  }

  const sourceRect =
    resolveAnchorRect(previousAnchors, animation.source) ??
    resolveAnchorRect(nextAnchors, animation.source);
  const destinationRect = resolveAnchorRect(nextAnchors, animation.destination);
  const viaRect = animation.via ? resolveAnchorRect(nextAnchors, animation.via) : undefined;

  if (!sourceRect || !destinationRect) {
    if (DEBUG_BOARD_ANIMATIONS) {
      console.log("[board-move-animations] Failed to resolve animation anchors", {
        id: animation.id,
        source: animation.source,
        destination: animation.destination,
        via: animation.via ?? null,
        hasPreviousAnchors: previousAnchors !== null,
        hasSourceRect: sourceRect !== null,
        hasDestinationRect: destinationRect !== null,
        previousAnchorIds: previousAnchors ? Object.keys(previousAnchors.anchors) : [],
        nextAnchorIds: Object.keys(nextAnchors.anchors),
      });
    }
    return null;
  }

  const boardRect = nextAnchors.boardRect;
  const resolvedViaRect = viaRect ? toLocalRect(viaRect, boardRect) : undefined;
  const impactRect =
    animation.impactAt === "via" && resolvedViaRect
      ? resolvedViaRect
      : toLocalRect(destinationRect, boardRect);

  if (DEBUG_BOARD_ANIMATIONS) {
    const localSourceRect = toLocalRect(sourceRect, boardRect);
    const localDestinationRect = toLocalRect(destinationRect, boardRect);
    console.log("[board-move-animations] Resolved animation", {
      id: animation.id,
      variant: animation.variant,
      source: animation.source,
      destination: animation.destination,
      via: animation.via ?? null,
      sourceRect: localSourceRect,
      destinationRect: localDestinationRect,
      viaRect: resolvedViaRect ?? null,
      dx: localDestinationRect.centerX - localSourceRect.centerX,
      dy: localDestinationRect.centerY - localSourceRect.centerY,
    });
  }

  return {
    card: animation.card,
    destinationRect: toLocalRect(destinationRect, boardRect),
    destinationZoneId: animation.destinationZoneId,
    durationMs: animation.durationMs,
    id: animation.id,
    impactAt: animation.impactAt,
    impactRect,
    renderFace: animation.renderFace,
    sourceRect: toLocalRect(sourceRect, boardRect),
    variant: animation.variant,
    viaRect: resolvedViaRect,
  };
}

function deriveInkAnimation(
  previousSnapshot: LorcanaProjectedBoardView,
  nextSnapshot: LorcanaProjectedBoardView,
  entry: MoveLogEntrySnapshot,
  cardId: string,
  resolveCard: (cardId: string) => LorcanaCardSnapshot | null,
): QueuedBoardMoveAnimation | null {
  const nextLocation = findCardLocation(nextSnapshot, cardId, resolveCard);
  if (!nextLocation || nextLocation.zoneId !== "inkwell") {
    return null;
  }

  const previousLocation = findCardLocation(previousSnapshot, cardId, resolveCard);
  const actorSide = entry.actorSide ?? nextLocation.side;
  const renderFace = nextLocation.card.facePresentation;
  const variant = renderFace === "faceUp" ? "ink-faceUp" : "ink-faceDown";

  return {
    actorSide,
    card: nextLocation.card,
    destination: buildCardDestination(nextLocation),
    destinationZoneId: "inkwell",
    durationMs: VARIANT_DURATION_MS[variant],
    id: `${entry.id}:ink:${cardId}`,
    impactAt: "destination",
    moveLogId: entry.id,
    renderFace,
    source: buildSourceAnchor(previousLocation, actorSide),
    variant,
  };
}

function derivePlayAnimation(
  previousSnapshot: LorcanaProjectedBoardView,
  nextSnapshot: LorcanaProjectedBoardView,
  entry: MoveLogEntrySnapshot,
  cardId: string,
  resolveCard: (cardId: string) => LorcanaCardSnapshot | null,
): QueuedBoardMoveAnimation | null {
  const nextLocation = findCardLocation(nextSnapshot, cardId, resolveCard);
  if (!nextLocation) {
    return null;
  }

  const previousLocation = findCardLocation(previousSnapshot, cardId, resolveCard);
  const actorSide = entry.actorSide ?? nextLocation.side;
  const variant = getPlayVariant(nextLocation.card.cardType);
  if (!variant) {
    return null;
  }

  const destination =
    nextLocation.zoneId === "discard"
      ? {
          primaryId: createCardAnchorId(nextLocation.side, "discard", cardId),
          fallbackId: createZoneAnchorId(nextLocation.side, "discard"),
        }
      : buildCardDestination(nextLocation);

  return {
    actorSide,
    card: nextLocation.card,
    destination,
    destinationZoneId: nextLocation.zoneId,
    durationMs: VARIANT_DURATION_MS[variant],
    id: `${entry.id}:play:${cardId}`,
    impactAt: "via",
    moveLogId: entry.id,
    renderFace: "faceUp",
    source: buildSourceAnchor(previousLocation, actorSide),
    variant,
    via: { primaryId: BOARD_CENTER_ANCHOR_ID },
  };
}

function getPlayVariant(
  cardType: LorcanaCardSnapshot["cardType"],
): BoardMoveAnimationVariant | null {
  switch (cardType) {
    case "character":
      return "play-character";
    case "item":
      return "play-item";
    case "location":
      return "play-location";
    case "action":
      return "play-action";
    default:
      return null;
  }
}

function buildSourceAnchor(
  location: CardLocation | null,
  actorSide: LorcanaPlayerSide,
): AnchorReference {
  if (!location) {
    return {
      primaryId: createSeatHandAnchorId(actorSide),
      fallbackId: createZoneAnchorId(actorSide, "hand"),
    };
  }

  if (!location.card.isMasked) {
    return {
      primaryId: createCardAnchorId(location.side, location.zoneId, location.card.cardId),
      fallbackId: createZoneAnchorId(location.side, location.zoneId),
    };
  }

  return {
    primaryId: createSeatHandAnchorId(actorSide),
    fallbackId: createZoneAnchorId(actorSide, "hand"),
  };
}

function buildCardDestination(location: CardLocation): AnchorReference {
  return {
    primaryId: createCardAnchorId(location.side, location.zoneId, location.card.cardId),
    fallbackId: createZoneAnchorId(location.side, location.zoneId),
  };
}

function findCardLocation(
  snapshot: LorcanaProjectedBoardView,
  cardId: string,
  resolveCard: (cardId: string) => LorcanaCardSnapshot | null,
): CardLocation | null {
  for (const side of ["playerOne", "playerTwo"] as const) {
    for (const zoneId of ["deck", "hand", "play", "inkwell", "discard", "limbo"] as const) {
      const card = getZoneCardIds(snapshot, side, zoneId).includes(cardId)
        ? resolveCard(cardId)
        : null;
      if (card) {
        return { card, side, zoneId };
      }
    }
  }

  return null;
}

function resolveAnchorRect(
  snapshot: BoardAnchorSnapshot | null,
  reference: AnchorReference,
): BoardAnchorRect | null {
  if (!snapshot) {
    return null;
  }

  const primary = snapshot.anchors[reference.primaryId];
  if (primary) {
    return primary;
  }

  if (reference.fallbackId) {
    return snapshot.anchors[reference.fallbackId] ?? null;
  }

  return null;
}

function toLocalRect(rect: BoardAnchorRect, boardRect: BoardAnchorRect): BoardLocalRect {
  return {
    x: rect.left - boardRect.left,
    y: rect.top - boardRect.top,
    width: rect.width,
    height: rect.height,
    centerX: rect.centerX - boardRect.left,
    centerY: rect.centerY - boardRect.top,
  };
}
