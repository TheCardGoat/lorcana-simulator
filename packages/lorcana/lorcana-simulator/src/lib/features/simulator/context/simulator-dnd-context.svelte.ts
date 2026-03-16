import { createDraggable, createDroppable, DragDropProvider } from "@dnd-kit/svelte";
import { getContext, hasContext, setContext } from "svelte";
import type { ComponentProps } from "svelte";

import { useLorcanaGameContext } from "@/features/simulator/context/game-context.svelte.js";
import {
  getTurnSide,
  type LorcanaCardSnapshot,
  type LorcanaPlayerSide,
  type LorcanaZoneId,
} from "@/features/simulator/model/contracts.js";

const SIMULATOR_DND_CONTEXT_KEY = Symbol.for("lorcana.simulator-dnd");
const MISSING_PROVIDER_ERROR = "getDragDropManager was called outside of a DragDropProvider";

export type SupportedDropZone = Extract<LorcanaZoneId, "play" | "inkwell">;
export type DragDropState = "none" | "preview" | "valid" | "invalid";

type AttachHandler = (node: HTMLElement) => void | (() => void);
type DragProviderProps = ComponentProps<typeof DragDropProvider>;

interface DropIntent {
  playerSide: LorcanaPlayerSide;
  zoneId: SupportedDropZone;
}

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

export interface LorcanaSimulatorDndContextValue {
  draggedCardId: string | null;
  createDropZoneId: (zoneId: SupportedDropZone, playerSide: LorcanaPlayerSide) => string;
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

  if (!left || !right) {
    return false;
  }

  return left.playerSide === right.playerSide && left.zoneId === right.zoneId;
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

class LorcanaSimulatorDndController implements LorcanaSimulatorDndContextValue {
  draggedCardId = $state<string | null>(null);
  hoveredDropIntent = $state<DropIntent | null>(null);

  readonly #game = useLorcanaGameContext();

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

  createDropZoneId = (zoneId: SupportedDropZone, playerSide: LorcanaPlayerSide): string =>
    `sim-drop:${playerSide}:${zoneId}`;

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
      const getDropZoneId = () => this.createDropZoneId(input.zone, input.player);
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
    if (zoneId !== "play" && zoneId !== "inkwell") {
      return "none";
    }

    if (
      this.hoveredDropIntent &&
      this.hoveredDropIntent.zoneId === zoneId &&
      this.hoveredDropIntent.playerSide === playerSide
    ) {
      return this.draggedCardId && playerSide === this.ownerSide ? "valid" : "none";
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
    const elements = document.elementsFromPoint(clientX, clientY);

    for (const element of elements) {
      if (!(element instanceof HTMLElement)) {
        continue;
      }

      const zoneElement = element.closest<HTMLElement>("[data-zone-id][data-player-side]");
      const zoneId = zoneElement?.dataset.zoneId;
      const playerSide = zoneElement?.dataset.playerSide;
      if (
        (zoneId === "play" || zoneId === "inkwell") &&
        (playerSide === "playerOne" || playerSide === "playerTwo") &&
        playerSide === this.ownerSide
      ) {
        return { playerSide, zoneId };
      }
    }

    return null;
  }

  resolveDropIntentFromTargetId(targetId: string | number | null | undefined): DropIntent | null {
    if (typeof targetId !== "string") {
      return null;
    }

    const [prefix, playerSide, zoneId] = targetId.split(":");
    if (
      prefix !== "sim-drop" ||
      (playerSide !== "playerOne" && playerSide !== "playerTwo") ||
      (zoneId !== "play" && zoneId !== "inkwell")
    ) {
      return null;
    }

    return { playerSide, zoneId };
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
    if (!dropIntent) {
      return;
    }

    if (dropIntent.playerSide !== this.ownerSide) {
      return;
    }

    if (dropIntent.zoneId === "play") {
      this.#game.playCard(cardId);
      return;
    }

    if (dropIntent.zoneId === "inkwell") {
      this.#game.ink(cardId);
    }
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
