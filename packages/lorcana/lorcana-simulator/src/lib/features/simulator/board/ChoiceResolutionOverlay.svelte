<script lang="ts">
import GripIcon from "@lucide/svelte/icons/grip";
import { onMount, tick } from "svelte";
import { m } from "$lib/i18n/messages.js";
import type { ResolutionChoiceAvailableMovesSelectionState } from "@/features/simulator/model/contracts.js";

interface ChoiceResolutionOverlayProps {
	selectionState: ResolutionChoiceAvailableMovesSelectionState;
	onSelectOption?: (moveId: string) => boolean;
	onConfirm?: () => boolean;
	onDismiss?: () => void;
}

let {
	selectionState,
	onSelectOption,
	onConfirm,
	onDismiss,
}: ChoiceResolutionOverlayProps = $props();

const OVERLAY_PADDING = 8;

let overlayElement: HTMLElement | null = null;
let overlayPosition = $state({
	x: OVERLAY_PADDING,
	y: OVERLAY_PADDING,
});
let isDraggingOverlay = $state(false);

let dragPointerId: number | null = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function clampOverlayPosition(x: number, y: number): { x: number; y: number } {
	if (!overlayElement) {
		return { x, y };
	}

	const parent = overlayElement.offsetParent;
	if (!(parent instanceof HTMLElement)) {
		return { x, y };
	}

	const maxX = Math.max(
		OVERLAY_PADDING,
		parent.clientWidth - overlayElement.offsetWidth - OVERLAY_PADDING,
	);
	const maxY = Math.max(
		OVERLAY_PADDING,
		parent.clientHeight - overlayElement.offsetHeight - OVERLAY_PADDING,
	);

	return {
		x: Math.min(Math.max(OVERLAY_PADDING, x), maxX),
		y: Math.min(Math.max(OVERLAY_PADDING, y), maxY),
	};
}

async function centerOverlay(): Promise<void> {
	await tick();

	if (!overlayElement) {
		return;
	}

	const parent = overlayElement.offsetParent;
	if (!(parent instanceof HTMLElement)) {
		return;
	}

	const centeredX = (parent.clientWidth - overlayElement.offsetWidth) / 2;
	const centeredY = (parent.clientHeight - overlayElement.offsetHeight) / 2;
	overlayPosition = clampOverlayPosition(centeredX, centeredY);
}

function handleWindowResize(): void {
	overlayPosition = clampOverlayPosition(overlayPosition.x, overlayPosition.y);
}

function handleOverlayPointerMove(event: PointerEvent): void {
	if (!isDraggingOverlay || dragPointerId !== event.pointerId) {
		return;
	}

	overlayPosition = clampOverlayPosition(
		event.clientX - dragOffsetX,
		event.clientY - dragOffsetY,
	);
}

function stopOverlayDrag(pointerId?: number): void {
	if (!isDraggingOverlay) {
		return;
	}

	if (pointerId !== undefined && dragPointerId !== pointerId) {
		return;
	}

	isDraggingOverlay = false;
	dragPointerId = null;
}

function handleOverlayPointerDown(event: PointerEvent): void {
	if (!overlayElement) {
		return;
	}

	const overlayRect = overlayElement.getBoundingClientRect();
	dragPointerId = event.pointerId;
	dragOffsetX = event.clientX - overlayRect.left;
	dragOffsetY = event.clientY - overlayRect.top;
	isDraggingOverlay = true;
	event.preventDefault();
}

onMount(() => {
	void centerOverlay();

	window.addEventListener("pointermove", handleOverlayPointerMove);
	window.addEventListener("pointerup", (e) => stopOverlayDrag(e.pointerId));
	window.addEventListener("pointercancel", (e) => stopOverlayDrag(e.pointerId));
	window.addEventListener("resize", handleWindowResize);

	return () => {
		window.removeEventListener("pointermove", handleOverlayPointerMove);
		window.removeEventListener("pointerup", (e) => stopOverlayDrag(e.pointerId));
		window.removeEventListener("pointercancel", (e) => stopOverlayDrag(e.pointerId));
		window.removeEventListener("resize", handleWindowResize);
	};
});
</script>

<section
  class="choice-overlay"
  class:choice-overlay--dragging={isDraggingOverlay}
  aria-label={selectionState.title}
  data-testid="choice-resolution-overlay"
  bind:this={overlayElement}
  style={`left: ${overlayPosition.x}px; top: ${overlayPosition.y}px;`}
>
  <header class="choice-overlay__header">
    <div class="choice-overlay__header-main">
      <div class="choice-overlay__header-text">
        <h2 class="choice-overlay__title">{selectionState.title}</h2>
        {#if selectionState.message}
          <p class="choice-overlay__message">{selectionState.message}</p>
        {/if}
      </div>

      <button
        type="button"
        class="choice-overlay__drag-handle"
        aria-label="Drag overlay"
        onpointerdown={handleOverlayPointerDown}
      >
        <GripIcon class="size-4" />
      </button>
    </div>
  </header>

  <div class="choice-overlay__body">
    {#each selectionState.entries as entry (entry.id)}
      <button
        type="button"
        class="choice-option"
        class:choice-option--selected={entry.selected}
        disabled={entry.disabled}
        title={entry.disabled ? (entry.disabledReason ?? undefined) : undefined}
        onclick={() => entry.moveId !== undefined && onSelectOption?.(entry.moveId)}
      >
        {entry.label}
      </button>
    {/each}
  </div>

  <footer class="choice-overlay__footer">
    <button
      type="button"
      class="choice-footer-button choice-footer-button--ghost"
      onclick={onDismiss}
    >
      {m["sim.actions.cancel"]({})}
    </button>
    <button
      type="button"
      class="choice-footer-button choice-footer-button--primary"
      disabled={!selectionState.canConfirm}
      data-testid="choice-confirm-button"
      onclick={onConfirm}
    >
      {m["sim.actions.confirm"]({})}
    </button>
  </footer>
</section>

<style>
  .choice-overlay {
    position: absolute;
    width: min(22rem, calc(100% - 1.5rem));
    z-index: 80;
    display: grid;
    gap: 0.75rem;
    padding: clamp(0.8rem, 2vw, 1rem);
    border: 1px solid rgba(175, 202, 167, 0.28);
    border-radius: 1.35rem;
    background:
      linear-gradient(145deg, rgba(12, 25, 28, 0.96), rgba(22, 44, 48, 0.98)),
      rgba(8, 15, 17, 0.96);
    box-shadow: 0 24px 60px rgba(2, 6, 23, 0.42);
    color: #edf7ef;
    backdrop-filter: blur(10px);
  }

  .choice-overlay--dragging {
    box-shadow: 0 28px 80px rgba(2, 6, 23, 0.5);
  }

  .choice-overlay__header {
    display: grid;
    gap: 0.25rem;
  }

  .choice-overlay__header-main {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.75rem;
    align-items: start;
  }

  .choice-overlay__header-text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }

  .choice-overlay__title {
    font-size: 0.9rem;
    font-weight: 700;
    line-height: 1.3;
    color: #edf7ef;
    margin: 0;
  }

  .choice-overlay__message {
    font-size: 0.75rem;
    color: rgba(193, 228, 197, 0.75);
    margin: 0;
    line-height: 1.4;
  }

  .choice-overlay__drag-handle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid rgba(190, 225, 195, 0.18);
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.04);
    color: rgba(193, 228, 197, 0.6);
    cursor: grab;
    padding: 0;
    touch-action: none;
  }

  .choice-overlay__drag-handle:hover {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(193, 228, 197, 0.9);
  }

  .choice-overlay__drag-handle:active {
    cursor: grabbing;
  }

  .choice-overlay__body {
    display: grid;
    gap: 0.45rem;
  }

  .choice-option {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.7rem 0.95rem;
    border: 1px solid rgba(190, 225, 195, 0.18);
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.04);
    color: #edf7ef;
    font: inherit;
    font-size: 0.875rem;
    text-align: left;
    cursor: pointer;
    transition:
      background 0.12s ease,
      border-color 0.12s ease;
  }

  .choice-option:hover:not(:disabled) {
    background: rgba(190, 225, 195, 0.1);
    border-color: rgba(190, 225, 195, 0.3);
  }

  .choice-option--selected {
    background: rgba(125, 180, 111, 0.2);
    border-color: rgba(125, 180, 111, 0.5);
    color: #d6f0da;
  }

  .choice-option--selected:hover:not(:disabled) {
    background: rgba(125, 180, 111, 0.28);
  }

  .choice-option:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .choice-overlay__footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.55rem;
    padding-top: 0.1rem;
  }

  .choice-footer-button {
    min-height: 2.5rem;
    padding: 0.65rem 0.95rem;
    border: 1px solid rgba(190, 225, 195, 0.22);
    border-radius: 999px;
    color: #f3fdf5;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }

  .choice-footer-button:hover {
    background: rgba(201, 240, 208, 0.14);
  }

  .choice-footer-button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .choice-footer-button--primary {
    background: linear-gradient(180deg, rgba(125, 180, 111, 0.96), rgba(71, 118, 65, 0.96));
  }

  .choice-footer-button--ghost {
    background: transparent;
  }

  @media (max-width: 699px) {
    .choice-overlay {
      width: min(18rem, calc(100% - 2rem));
      padding: 0.75rem;
      border-radius: 1rem;
    }
  }
</style>
