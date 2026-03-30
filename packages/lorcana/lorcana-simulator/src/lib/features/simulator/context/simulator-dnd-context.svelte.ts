import { createDraggable, createDroppable, DragDropProvider } from "@dnd-kit/svelte";
import { getContext, hasContext, setContext } from "svelte";
import type { ComponentProps } from "svelte";

import {
  useLorcanaGameContext,
  useLorcanaSidebarPresenter,
} from "@/features/simulator/context/game-context.svelte.js";
import {
  dispatchDropIntent,
  type DropIntent,
  type DraggedCardKind,
  type SupportedDropZone,
} from "@/features/simulator/context/simulator-dnd-dispatch.js";
import {
  getTurnSide,
  type LorcanaCardSnapshot,
  type LorcanaPlayerSide,
  type LorcanaZoneId,
} from "@/features/simulator/model/contracts.js";

const SIMULATOR_DND_CONTEXT_KEY = Symbol.for("lorcana.simulator-dnd");
const MISSING_PROVIDER_ERROR = "getDragDropManager was called outside of a DragDropProvider";

export type DragDropState = "none" | "preview" | "valid" | "invalid";

type AttachHandler = (node: HTMLElement) => void | (() => void);
type DragProviderProps = ComponentProps<typeof DragDropProvider>;

interface OptionalDraggableInput {
  card?: LorcanaCardSnapshot | null;
  disabled?: boolean;
}

interface OptionalDroppableInput {
  player: LorcanaPlayerSide;
  zone: SupportedDropZone;
  disabled?: boolean;
}

interface OptionalDraggableInstance {
  attach: AttachHandler;
  attachHandle: AttachHandler;
}

interface OptionalDroppableInstance {
  attach: AttachHandler;
}

interface DropIntentProbeElement {
  dataset: {
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

export interface LorcanaSimulatorDndContextValue {
  draggedCardId: string | null;
  isDraggingHandCard: boolean;
  createOptionalDraggable: (input: OptionalDraggableInput) => OptionalDraggableInstance;
  createOptionalDroppable: (input: OptionalDroppableInput) => OptionalDroppableInstance;
  getZoneDropState: (zoneId: LorcanaZoneId, playerSide: LorcanaPlayerSide) => DragDropState;
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

  return false;
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

export function createZoneDropZoneId(
  zoneId: SupportedDropZone,
  playerSide: LorcanaPlayerSide,
): string {
  return `sim-drop:zone:${playerSide}:${zoneId}`;
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
  return null;
}

export function resolveDropIntentFromElements(args: {
  elements: DropIntentProbe[];
  ownerSide: LorcanaPlayerSide | null;
}): DropIntent | null {
  const { elements, ownerSide } = args;

  for (const element of elements) {
    const zoneElement = element.closest("[data-zone-id][data-player-side]");
    const zoneDataset = getProbeDataset(zoneElement);
    const zoneId = zoneDataset?.zoneId;
    const playerSide = zoneDataset?.playerSide;
    if (
      (zoneId === "play" || zoneId === "inkwell" || zoneId === "hand") &&
      (playerSide === "playerOne" || playerSide === "playerTwo") &&
      playerSide === ownerSide
    ) {
      return {
        kind: "zone",
        playerSide,
        zoneId,
      };
    }
  }

  return null;
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

    return canDragHandCard({
      card,
      playableCardIds: this.playableHandCardIds,
      ownerSide: this.ownerSide,
      turnSide: this.turnSide,
    })
      ? "hand"
      : null;
  }

  get isDraggingHandCard(): boolean {
    return this.draggedCardKind === "hand";
  }

  isCardDraggable(card: LorcanaCardSnapshot | null | undefined): boolean {
    if (!card) {
      return false;
    }

    return canDragHandCard({
      card,
      playableCardIds: this.playableHandCardIds,
      ownerSide: this.ownerSide,
      turnSide: this.turnSide,
    });
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
      const getDropZoneId = () => createZoneDropZoneId(input.zone, input.player);
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
      this.hoveredDropIntent.zoneId === zoneId &&
      this.hoveredDropIntent.playerSide === playerSide
    ) {
      return this.draggedCardId &&
        playerSide === this.ownerSide &&
        this.#game.canDropHandCardIntoZone(this.draggedCardId, zoneId)
        ? "valid"
        : "none";
    }

    if (
      this.draggedCardId &&
      playerSide === this.ownerSide &&
      this.#game.canDropHandCardIntoZone(this.draggedCardId, zoneId)
    ) {
      return "preview";
    }

    return "none";
  };

  resolveDropIntentFromPoint(clientX: number, clientY: number): DropIntent | null {
    return resolveDropIntentFromElements({
      elements: document.elementsFromPoint(clientX, clientY),
      ownerSide: this.ownerSide,
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
        shouldOpenPlayCardSelectionOnDrop: this.#game.shouldOpenPlayCardSelectionOnDrop,
        canDropHandCardIntoZone: this.#game.canDropHandCardIntoZone,
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
