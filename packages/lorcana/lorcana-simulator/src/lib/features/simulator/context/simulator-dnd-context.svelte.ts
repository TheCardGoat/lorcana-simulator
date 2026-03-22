import { createDraggable, createDroppable, DragDropProvider } from "@dnd-kit/svelte";
import { getContext, hasContext, setContext } from "svelte";
import type { ComponentProps } from "svelte";

import {
  useLorcanaGameContext,
  useLorcanaSidebarPresenter,
} from "@/features/simulator/context/game-context.svelte.js";
import {
  getTurnSide,
  type ExecutableMoveEntry,
  type LorcanaCardSnapshot,
  type LorcanaPlayerSide,
  type LorcanaZoneId,
} from "@/features/simulator/model/contracts.js";

const SIMULATOR_DND_CONTEXT_KEY = Symbol.for("lorcana.simulator-dnd");
const MISSING_PROVIDER_ERROR = "getDragDropManager was called outside of a DragDropProvider";

export type SupportedDropZone = Extract<LorcanaZoneId, "play" | "inkwell" | "hand">;
export type DragDropState = "none" | "preview" | "valid" | "invalid";
type DraggedCardKind = "hand" | "hand-targeted-action" | "play-character";

type AttachHandler = (node: HTMLElement) => void | (() => void);
type DragProviderProps = ComponentProps<typeof DragDropProvider>;

interface ZoneDropIntent {
  kind: "zone";
  playerSide: LorcanaPlayerSide;
  zoneId: SupportedDropZone;
}

interface LocationDropIntent {
  kind: "location";
  playerSide: LorcanaPlayerSide;
  zoneId: "play";
  locationId: string;
}

interface CardDropIntent {
  kind: "card";
  playerSide: LorcanaPlayerSide;
  zoneId: "play";
  targetCardId: string;
}

export type DropIntent = ZoneDropIntent | LocationDropIntent | CardDropIntent;

interface OptionalDraggableInput {
  card?: LorcanaCardSnapshot | null;
  disabled?: boolean;
}

type OptionalDroppableInput =
  | {
      player: LorcanaPlayerSide;
      zone: SupportedDropZone;
      disabled?: boolean;
    }
  | {
      player: LorcanaPlayerSide;
      locationId: string;
      disabled?: boolean;
    };

interface OptionalDraggableInstance {
  attach: AttachHandler;
  attachHandle: AttachHandler;
}

interface OptionalDroppableInstance {
  attach: AttachHandler;
}

interface DropIntentProbeElement {
  dataset: {
    cardDropId?: string;
    locationDropId?: string;
    playerSide?: string;
    zoneId?: string;
  };
  closest: (selector: string) => DropIntentProbeElement | null;
}
type DropIntentProbe = Element | DropIntentProbeElement;

function getProbeDataset(
  element: DropIntentProbe | null,
): DropIntentProbeElement["dataset"] | undefined {
  if (!element || !("dataset" in element)) {
    return undefined;
  }

  return element.dataset;
}

interface DropActionGame {
  openPlayCardSelection: (cardId: string, options?: { targetCardId?: string }) => boolean;
  playCard: (cardId: string) => boolean;
  ink: (cardId: string) => boolean;
  canDropHandCardIntoZone: (
    cardId: string,
    zoneId: Extract<SupportedDropZone, "play" | "inkwell">,
  ) => boolean;
  canPlayCardOnTarget: (cardId: string, targetCardId: string) => boolean;
  canMoveCharacterToLocation: (characterId: string, locationId: string) => boolean;
  executeMove: (
    moveId: "moveCharacterToLocation",
    params: {
      characterId: string;
      locationId: string;
    },
    options: {
      clearChallengeMode: boolean;
      clearSelection: boolean;
    },
  ) => boolean;
}

export interface LorcanaSimulatorDndContextValue {
  draggedCardId: string | null;
  isDraggingHandCard: boolean;
  createOptionalDraggable: (input: OptionalDraggableInput) => OptionalDraggableInstance;
  createOptionalDroppable: (input: OptionalDroppableInput) => OptionalDroppableInstance;
  getZoneDropState: (zoneId: LorcanaZoneId, playerSide: LorcanaPlayerSide) => DragDropState;
  getLocationDropState: (locationId: string, playerSide: LorcanaPlayerSide) => DragDropState;
  getCardDropState: (cardId: string) => DragDropState;
  handleDragStart: NonNullable<DragProviderProps["onDragStart"]>;
  handleDragMove: NonNullable<DragProviderProps["onDragMove"]>;
  handleDragEnd: NonNullable<DragProviderProps["onDragEnd"]>;
}

function noopAttach(): void {}

function createNoopDraggable(): OptionalDraggableInstance {
  return {
    attach: noopAttach,
    attachHandle: noopAttach,
  };
}

function createNoopDroppable(): OptionalDroppableInstance {
  return {
    attach: noopAttach,
  };
}

function isMissingProviderError(error: Error): boolean {
  return error.message.includes(MISSING_PROVIDER_ERROR);
}

function areDropIntentsEqual(left: DropIntent | null, right: DropIntent | null): boolean {
  if (left === right) {
    return true;
  }

  if (!left || !right || left.kind !== right.kind) {
    return false;
  }

  if (left.kind === "zone" && right.kind === "zone") {
    return left.playerSide === right.playerSide && left.zoneId === right.zoneId;
  }

  if (left.kind === "location" && right.kind === "location") {
    return (
      left.playerSide === right.playerSide &&
      left.zoneId === right.zoneId &&
      left.locationId === right.locationId
    );
  }

  if (left.kind === "card" && right.kind === "card") {
    return (
      left.playerSide === right.playerSide &&
      left.zoneId === right.zoneId &&
      left.targetCardId === right.targetCardId
    );
  }

  return false;
}

interface MoveToLocationParams {
  characterId: string;
  locationId: string;
}

function isMoveToLocationParams(params: unknown): params is MoveToLocationParams {
  return (
    typeof params === "object" &&
    params !== null &&
    typeof (params as MoveToLocationParams).characterId === "string" &&
    typeof (params as MoveToLocationParams).locationId === "string"
  );
}

function getMoveCharacterId(move: ExecutableMoveEntry): string | null {
  if (move.moveId !== "moveCharacterToLocation" || !isMoveToLocationParams(move.params)) {
    return null;
  }

  return move.params.characterId;
}

function getMoveLocationId(move: ExecutableMoveEntry): string | null {
  if (move.moveId !== "moveCharacterToLocation" || !isMoveToLocationParams(move.params)) {
    return null;
  }

  return move.params.locationId;
}

interface PlayCardMoveParams {
  cardId: string;
  targets?: string[];
}

function isPlayCardMoveParams(params: unknown): params is PlayCardMoveParams {
  return (
    typeof params === "object" &&
    params !== null &&
    typeof (params as PlayCardMoveParams).cardId === "string"
  );
}

function getMovePlayCardId(move: ExecutableMoveEntry): string | null {
  if (move.moveId !== "playCard" || move.presentation.categoryId !== "play-card") {
    return null;
  }

  if (!isPlayCardMoveParams(move.params)) {
    return null;
  }

  return move.params.cardId;
}

function getMovePlayCardTargetId(move: ExecutableMoveEntry): string | null {
  if (move.moveId !== "playCard" || move.presentation.categoryId !== "play-card") {
    return null;
  }

  if (!isPlayCardMoveParams(move.params)) {
    return null;
  }

  return Array.isArray(move.params.targets) && typeof move.params.targets[0] === "string"
    ? move.params.targets[0]
    : null;
}

function getPlayCardTargetIds(cardId: string, executableMoves: ExecutableMoveEntry[]): string[] {
  const targetIds = executableMoves
    .filter((move) => getMovePlayCardId(move) === cardId)
    .map((move) => getMovePlayCardTargetId(move))
    .filter((targetId): targetId is string => targetId !== null);

  return [...new Set(targetIds)];
}

export function canDragHandCard(args: {
  card: LorcanaCardSnapshot;
  playableCardIds: string[];
  ownerSide: LorcanaPlayerSide | null;
  turnSide: LorcanaPlayerSide | null;
}): boolean {
  const { card, playableCardIds, ownerSide, turnSide } = args;
  if (
    card.zoneId !== "hand" ||
    !ownerSide ||
    card.ownerSide !== ownerSide ||
    turnSide !== ownerSide
  ) {
    return false;
  }

  return playableCardIds.includes(card.cardId);
}

export function canDragMoveToLocationCard(args: {
  card: LorcanaCardSnapshot;
  executableMoves: ExecutableMoveEntry[];
  ownerSide: LorcanaPlayerSide | null;
  turnSide: LorcanaPlayerSide | null;
}): boolean {
  const { card, executableMoves, ownerSide, turnSide } = args;
  if (
    card.zoneId !== "play" ||
    card.cardType !== "character" ||
    !ownerSide ||
    card.ownerSide !== ownerSide ||
    turnSide !== ownerSide
  ) {
    return false;
  }

  return executableMoves.some((move) => getMoveCharacterId(move) === card.cardId);
}

export function canDropCharacterAtLocation(args: {
  characterId: string;
  locationId: string;
  executableMoves: ExecutableMoveEntry[];
}): boolean {
  const { characterId, locationId, executableMoves } = args;
  return executableMoves.some(
    (move) => getMoveCharacterId(move) === characterId && getMoveLocationId(move) === locationId,
  );
}

export function canDragSimulatorCard(args: {
  card: LorcanaCardSnapshot;
  executableMoves: ExecutableMoveEntry[];
  playableCardIds: string[];
  ownerSide: LorcanaPlayerSide | null;
  turnSide: LorcanaPlayerSide | null;
}): boolean {
  return (
    canDragHandCard(args) ||
    canDragMoveToLocationCard({
      card: args.card,
      executableMoves: args.executableMoves,
      ownerSide: args.ownerSide,
      turnSide: args.turnSide,
    })
  );
}

export function createZoneDropZoneId(
  zoneId: SupportedDropZone,
  playerSide: LorcanaPlayerSide,
): string {
  return `sim-drop:zone:${playerSide}:${zoneId}`;
}

export function createLocationDropZoneId(
  locationId: string,
  playerSide: LorcanaPlayerSide,
): string {
  return `sim-drop:location:${playerSide}:${locationId}`;
}

export function createCardDropZoneId(targetCardId: string, playerSide: LorcanaPlayerSide): string {
  return `sim-drop:card:${playerSide}:${targetCardId}`;
}

export function resolveDropIntentFromTargetId(
  targetId: string | number | null | undefined,
): DropIntent | null {
  if (typeof targetId !== "string") {
    return null;
  }

  const [prefix, kind, playerSide, value] = targetId.split(":");
  if (prefix !== "sim-drop" || (playerSide !== "playerOne" && playerSide !== "playerTwo")) {
    return null;
  }

  if (kind === "zone" && (value === "play" || value === "inkwell" || value === "hand")) {
    return {
      kind: "zone",
      playerSide,
      zoneId: value,
    };
  }

  if (kind === "location" && value) {
    return {
      kind: "location",
      playerSide,
      zoneId: "play",
      locationId: value,
    };
  }

  if (kind === "card" && value) {
    return {
      kind: "card",
      playerSide,
      zoneId: "play",
      targetCardId: value,
    };
  }

  return null;
}

export function resolveDropIntentFromElements(args: {
  elements: DropIntentProbe[];
  ownerSide: LorcanaPlayerSide | null;
  draggedCardKind?: DraggedCardKind | null;
}): DropIntent | null {
  const { elements, ownerSide, draggedCardKind } = args;
  let cardIntent: CardDropIntent | null = null;
  let zoneFallback: ZoneDropIntent | null = null;
  let locationIntent: LocationDropIntent | null = null;

  for (const element of elements) {
    const cardElement = element.closest("[data-card-drop-id][data-player-side][data-zone-id]");
    const cardDataset = getProbeDataset(cardElement);
    const cardDropId = cardDataset?.cardDropId;
    const cardPlayerSide = cardDataset?.playerSide;
    const cardZoneId = cardDataset?.zoneId;
    if (
      cardDropId &&
      cardZoneId === "play" &&
      (cardPlayerSide === "playerOne" || cardPlayerSide === "playerTwo") &&
      !cardIntent
    ) {
      cardIntent = {
        kind: "card",
        playerSide: cardPlayerSide,
        zoneId: "play",
        targetCardId: cardDropId,
      };
    }

    const locationElement = element.closest("[data-location-drop-id][data-player-side]");
    const locationDataset = getProbeDataset(locationElement);
    const locationId = locationDataset?.locationDropId;
    const locationPlayerSide = locationDataset?.playerSide;
    if (
      locationId &&
      (locationPlayerSide === "playerOne" || locationPlayerSide === "playerTwo") &&
      locationPlayerSide === ownerSide &&
      !locationIntent
    ) {
      locationIntent = {
        kind: "location",
        playerSide: locationPlayerSide,
        zoneId: "play",
        locationId,
      };
    }

    if (zoneFallback) {
      continue;
    }

    const zoneElement = element.closest("[data-zone-id][data-player-side]");
    const zoneDataset = getProbeDataset(zoneElement);
    const zoneId = zoneDataset?.zoneId;
    const playerSide = zoneDataset?.playerSide;
    if (
      (zoneId === "play" || zoneId === "inkwell" || zoneId === "hand") &&
      (playerSide === "playerOne" || playerSide === "playerTwo") &&
      playerSide === ownerSide
    ) {
      zoneFallback = {
        kind: "zone",
        playerSide,
        zoneId,
      };
    }
  }

  if (draggedCardKind === "hand-targeted-action" && cardIntent) {
    return cardIntent;
  }

  // For play-character cards, prioritize location intent over zone fallback.
  // For hand cards, use zone fallback instead of location intent so hand drops
  // still work when hovering over location layouts.
  if (draggedCardKind === "play-character" && locationIntent) {
    return locationIntent;
  }

  return zoneFallback;
}

export function dispatchDropIntent(args: {
  cardId: string;
  dropIntent: DropIntent | null;
  draggedCardKind: DraggedCardKind | null;
  ownerSide: LorcanaPlayerSide | null;
  game: DropActionGame;
}): boolean {
  const { cardId, dropIntent, draggedCardKind, ownerSide, game } = args;
  if (!dropIntent || (dropIntent.kind !== "card" && dropIntent.playerSide !== ownerSide)) {
    return false;
  }

  if (dropIntent.kind === "zone") {
    const { zoneId } = dropIntent;
    if (zoneId === "hand") {
      return false;
    }

    if (draggedCardKind === "hand-targeted-action" && zoneId === "play") {
      return game.openPlayCardSelection(cardId);
    }

    if (game.canDropHandCardIntoZone(cardId, zoneId)) {
      if (zoneId === "play") {
        return game.playCard(cardId);
      }

      return game.ink(cardId);
    }
  }

  if (dropIntent.kind === "card" && draggedCardKind === "hand-targeted-action") {
    return game.canPlayCardOnTarget(cardId, dropIntent.targetCardId)
      ? game.openPlayCardSelection(cardId, { targetCardId: dropIntent.targetCardId })
      : game.openPlayCardSelection(cardId);
  }

  if (
    dropIntent.kind === "location" &&
    draggedCardKind === "play-character" &&
    game.canMoveCharacterToLocation(cardId, dropIntent.locationId)
  ) {
    return game.executeMove(
      "moveCharacterToLocation",
      {
        characterId: cardId,
        locationId: dropIntent.locationId,
      },
      {
        clearChallengeMode: true,
        clearSelection: true,
      },
    );
  }

  return false;
}

class LorcanaSimulatorDndController implements LorcanaSimulatorDndContextValue {
  draggedCardId = $state<string | null>(null);
  hoveredDropIntent = $state<DropIntent | null>(null);

  readonly #game = useLorcanaGameContext();
  readonly #sidebar = useLorcanaSidebarPresenter();

  get ownerSide(): LorcanaPlayerSide | null {
    return this.#game.ownerSide();
  }

  get turnSide(): LorcanaPlayerSide | null {
    const board = this.#game.boardSnapshot();
    return board ? getTurnSide(board) : null;
  }

  get executableMoves(): ExecutableMoveEntry[] {
    return this.#game.executableMoves();
  }

  get playableHandCardIds(): string[] {
    return this.#game.playableHandCardIds();
  }

  get draggedCard(): LorcanaCardSnapshot | null {
    return this.draggedCardId ? (this.#game.cardSnapshotsById()[this.draggedCardId] ?? null) : null;
  }

  get draggedCardKind(): DraggedCardKind | null {
    const card = this.draggedCard;
    if (!card) {
      return null;
    }

    if (
      canDragHandCard({
        card,
        playableCardIds: this.playableHandCardIds,
        ownerSide: this.ownerSide,
        turnSide: this.turnSide,
      })
    ) {
      return this.#game.usesTargetedPlayCardDrag(card.cardId) ? "hand-targeted-action" : "hand";
    }

    if (this.#game.canDragCharacterToLocation(card.cardId)) {
      return "play-character";
    }

    return null;
  }

  get isDraggingHandCard(): boolean {
    return this.draggedCardKind === "hand" || this.draggedCardKind === "hand-targeted-action";
  }

  isCardDraggable(card: LorcanaCardSnapshot | null | undefined): boolean {
    if (!card) {
      return false;
    }

    return (
      canDragHandCard({
        card,
        playableCardIds: this.playableHandCardIds,
        ownerSide: this.ownerSide,
        turnSide: this.turnSide,
      }) || this.#game.canDragCharacterToLocation(card.cardId)
    );
  }

  createOptionalDraggable = (input: OptionalDraggableInput): OptionalDraggableInstance => {
    const card = input.card;
    if (!card) {
      return createNoopDraggable();
    }

    const disabled = input.disabled ?? !this.isCardDraggable(card);

    try {
      const draggable = createDraggable({
        get id() {
          return card.cardId;
        },
        get disabled() {
          return disabled;
        },
      });

      return {
        attach: draggable.attach,
        attachHandle: draggable.attachHandle,
      };
    } catch (error) {
      if (error instanceof Error && isMissingProviderError(error)) {
        return createNoopDraggable();
      }

      throw error;
    }
  };

  createOptionalDroppable = (input: OptionalDroppableInput): OptionalDroppableInstance => {
    try {
      const getDropZoneId = () =>
        "zone" in input
          ? createZoneDropZoneId(input.zone, input.player)
          : createLocationDropZoneId(input.locationId, input.player);
      const isDisabled = () => input.disabled ?? this.ownerSide !== input.player;

      const droppable = createDroppable({
        get id() {
          return getDropZoneId();
        },
        get disabled() {
          return isDisabled();
        },
      });

      return {
        attach: droppable.attach,
      };
    } catch (error) {
      if (error instanceof Error && isMissingProviderError(error)) {
        return createNoopDroppable();
      }

      throw error;
    }
  };

  getZoneDropState = (zoneId: LorcanaZoneId, playerSide: LorcanaPlayerSide): DragDropState => {
    if (zoneId !== "play" && zoneId !== "inkwell" && zoneId !== "hand") {
      return "none";
    }

    if (zoneId === "hand") {
      if (!this.draggedCardId || playerSide !== this.ownerSide || this.draggedCardKind !== "hand") {
        return "none";
      }

      const isHovered =
        this.hoveredDropIntent?.kind === "zone" &&
        this.hoveredDropIntent.zoneId === "hand" &&
        this.hoveredDropIntent.playerSide === playerSide;

      return isHovered ? "valid" : "none";
    }

    if (
      this.hoveredDropIntent &&
      this.hoveredDropIntent.kind === "zone" &&
      this.hoveredDropIntent.zoneId === zoneId &&
      this.hoveredDropIntent.playerSide === playerSide
    ) {
      if (
        this.draggedCardId &&
        playerSide === this.ownerSide &&
        this.draggedCardKind === "hand-targeted-action" &&
        zoneId === "play"
      ) {
        return "valid";
      }

      return this.draggedCardId &&
        playerSide === this.ownerSide &&
        this.#game.canDropHandCardIntoZone(this.draggedCardId, zoneId)
        ? "valid"
        : "none";
    }

    if (
      this.draggedCardId &&
      playerSide === this.ownerSide &&
      ((this.draggedCardKind === "hand-targeted-action" && zoneId === "play") ||
        this.#game.canDropHandCardIntoZone(this.draggedCardId, zoneId))
    ) {
      return "preview";
    }

    return "none";
  };

  getLocationDropState = (locationId: string, playerSide: LorcanaPlayerSide): DragDropState => {
    if (
      !this.draggedCardId ||
      this.draggedCardKind !== "play-character" ||
      playerSide !== this.ownerSide
    ) {
      return "none";
    }

    const isLegalTarget = this.#game.canMoveCharacterToLocation(this.draggedCardId, locationId);
    const isHoveredTarget =
      this.hoveredDropIntent?.kind === "location" &&
      this.hoveredDropIntent.playerSide === playerSide &&
      this.hoveredDropIntent.locationId === locationId;

    if (!isHoveredTarget) {
      return isLegalTarget ? "preview" : "none";
    }

    return isLegalTarget ? "valid" : "invalid";
  };

  getCardDropState = (cardId: string): DragDropState => {
    if (!this.draggedCardId || this.draggedCardKind !== "hand-targeted-action") {
      return "none";
    }

    const targetCard = this.#game.cardSnapshotsById()[cardId];
    if (!targetCard || targetCard.zoneId !== "play") {
      return "none";
    }

    const legalTargetIds = getPlayCardTargetIds(this.draggedCardId, this.executableMoves);
    const isLegalTarget = legalTargetIds.includes(cardId);
    const isHoveredTarget =
      this.hoveredDropIntent?.kind === "card" && this.hoveredDropIntent.targetCardId === cardId;

    if (!isHoveredTarget) {
      return isLegalTarget ? "preview" : "none";
    }

    return isLegalTarget ? "valid" : "invalid";
  };

  resolveDropIntentFromPoint(clientX: number, clientY: number): DropIntent | null {
    return resolveDropIntentFromElements({
      elements: document.elementsFromPoint(clientX, clientY),
      ownerSide: this.ownerSide,
      draggedCardKind: this.draggedCardKind,
    });
  }

  resolveDropIntentFromTargetId(targetId: string | number | null | undefined): DropIntent | null {
    return resolveDropIntentFromTargetId(targetId);
  }

  setHoveredDropIntent(dropIntent: DropIntent | null): void {
    if (areDropIntentsEqual(this.hoveredDropIntent, dropIntent)) {
      return;
    }

    this.hoveredDropIntent = dropIntent;
  }

  updateHoveredDropIntent(event: PointerEvent): void {
    this.setHoveredDropIntent(this.resolveDropIntentFromPoint(event.clientX, event.clientY));
  }

  clearDragState(): void {
    this.draggedCardId = null;
    this.setHoveredDropIntent(null);
  }

  handleDrop(cardId: string, dropIntent: DropIntent | null): void {
    dispatchDropIntent({
      cardId,
      dropIntent,
      draggedCardKind: this.draggedCardKind,
      ownerSide: this.ownerSide,
      game: {
        openPlayCardSelection: this.#sidebar.openPlayCardSelection,
        playCard: this.#game.playCard,
        ink: this.#game.ink,
        canDropHandCardIntoZone: this.#game.canDropHandCardIntoZone,
        canPlayCardOnTarget: (handCardId: string, targetCardId: string) =>
          getPlayCardTargetIds(handCardId, this.executableMoves).includes(targetCardId),
        canMoveCharacterToLocation: this.#game.canMoveCharacterToLocation,
        executeMove: this.#game.executeMove,
      },
    });
  }

  handleDragStart: NonNullable<DragProviderProps["onDragStart"]> = (event): void => {
    this.draggedCardId =
      typeof event.operation.source?.id === "string" ? event.operation.source.id : null;
    this.setHoveredDropIntent(null);
  };

  handleDragMove: NonNullable<DragProviderProps["onDragMove"]> = (event): void => {
    if (event.nativeEvent instanceof PointerEvent) {
      this.updateHoveredDropIntent(event.nativeEvent);
      return;
    }

    this.setHoveredDropIntent(this.resolveDropIntentFromTargetId(event.operation.target?.id));
  };

  handleDragEnd: NonNullable<DragProviderProps["onDragEnd"]> = (event): void => {
    if (event.canceled) {
      this.clearDragState();
      return;
    }

    const cardId =
      typeof event.operation.source?.id === "string"
        ? event.operation.source.id
        : this.draggedCardId;
    if (!cardId) {
      this.clearDragState();
      return;
    }

    const dropIntent =
      event.nativeEvent instanceof PointerEvent
        ? this.resolveDropIntentFromPoint(event.nativeEvent.clientX, event.nativeEvent.clientY)
        : this.resolveDropIntentFromTargetId(event.operation.target?.id);

    this.handleDrop(cardId, dropIntent);
    this.clearDragState();
  };
}

export function setLorcanaSimulatorDndContext(): LorcanaSimulatorDndContextValue {
  return setContext(SIMULATOR_DND_CONTEXT_KEY, new LorcanaSimulatorDndController());
}

export function useLorcanaSimulatorDndContext(): LorcanaSimulatorDndContextValue {
  if (!hasContext(SIMULATOR_DND_CONTEXT_KEY)) {
    throw new Error("Simulator dnd context not found");
  }

  return getContext<LorcanaSimulatorDndContextValue>(SIMULATOR_DND_CONTEXT_KEY);
}

export function createOptionalDraggable(input: OptionalDraggableInput): OptionalDraggableInstance {
  return useLorcanaSimulatorDndContext().createOptionalDraggable(input);
}

export function createOptionalDroppable(input: OptionalDroppableInput): OptionalDroppableInstance {
  return useLorcanaSimulatorDndContext().createOptionalDroppable(input);
}
