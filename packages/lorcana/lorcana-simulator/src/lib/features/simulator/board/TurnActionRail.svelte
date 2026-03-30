<script lang="ts">
  import Flag from "@lucide/svelte/icons/flag";
  import Undo2 from "@lucide/svelte/icons/undo-2";
  import Users from "@lucide/svelte/icons/users";
  import { m } from "$lib/i18n/messages.js";
  import PlayerTimer from "@/features/simulator/panels/PlayerTimer.svelte";
  import type { LorcanaPlayerTimerSummary } from "@/features/simulator/model/contracts.js";
  import type { ConfirmableDirectMoveCategoryId } from "@/features/simulator/model/direct-action-state.js";

  interface TurnActionRailProps {
    timer?: LorcanaPlayerTimerSummary;
    timerLabel?: string;
    questAllCount?: number | null;
    questAllLore?: number | null;
    canPassTurn?: boolean;
    canUndo?: boolean;
    canQuestAll?: boolean;
    armedCategoryId?: ConfirmableDirectMoveCategoryId | null;
    onUndo?: () => void;
    onPassTurn?: () => void;
    onQuestAll?: () => void;
  }

  let {
    timer,
    timerLabel = "Clock",
    questAllCount = null,
    questAllLore = null,
    canPassTurn = false,
    canUndo = false,
    canQuestAll = false,
    armedCategoryId = null,
    onUndo,
    onPassTurn,
    onQuestAll,
  }: TurnActionRailProps = $props();

  const passTurnArmed = $derived(armedCategoryId === "pass-turn");
  const undoArmed = $derived(armedCategoryId === "undo");
  const questAllArmed = $derived(armedCategoryId === "quest-all");
  const undoLabel = $derived(
    undoArmed
      ? m["sim.actions.confirmMoveLabel"]({ label: m["sim.actions.label.undo"]({}) })
      : m["sim.actions.label.undo"]({}),
  );
  const passTurnLabel = $derived(
    passTurnArmed
      ? m["sim.actions.confirmMoveLabel"]({ label: m["sim.actions.label.passTurn"]({}) })
      : m["sim.actions.label.passTurn"]({}),
  );
  const questAllBaseLabel = $derived(
    questAllLore !== null && questAllCount !== null
      ? m["sim.actions.label.questWithAll"]({ count: questAllCount, lore: questAllLore })
      : m["sim.actions.label.questAll"]({}),
  );
  const questAllLabel = $derived(
    questAllArmed
      ? m["sim.actions.confirmMoveLabel"]({ label: questAllBaseLabel })
      : questAllBaseLabel,
  );
  const questAllAriaLabel = $derived(
    questAllLore !== null && questAllCount !== null
      ? `Quest with all using ${questAllCount} character${questAllCount === 1 ? "" : "s"} for ${questAllLore} lore`
      : "Quest with all",
  );
</script>

{#if timer || canQuestAll || canUndo || canPassTurn}
  <aside class="turn-action-rail" aria-label="Turn actions">
    {#if timer}
      <div class="turn-action-rail__timer">
        <PlayerTimer
          reserveMsRemaining={timer.reserveMsRemaining}
          isActive={timer.isActive}
          isRunning={timer.isRunning}
          startedAtMs={timer.startedAtMs}
          timeoutCount={timer.timeoutCount}
          isInNegativeTime={timer.isInNegativeTime}
          variant="rail"
          label={timerLabel}
        />
      </div>
    {/if}

    <div class="turn-action-rail__actions">
      {#if canQuestAll}
        <button
          type="button"
          class="turn-action-button turn-action-button--secondary"
          class:turn-action-button--armed={questAllArmed}
          onclick={onQuestAll}
          aria-label={questAllAriaLabel}
        >
          <span class="turn-action-button__header">
            <Users class="size-4" />
            <span>{questAllLabel}</span>
          </span>
          {#if questAllLore !== null && questAllCount !== null}
            <span class="turn-action-button__meta">{questAllCount} Ready | +{questAllLore} Lore</span>
          {/if}
        </button>
      {/if}

      {#if canUndo}
        <button
          type="button"
          class="turn-action-button turn-action-button--secondary"
          class:turn-action-button--armed={undoArmed}
          onclick={onUndo}
          aria-label={undoLabel}
        >
          <span class="turn-action-button__header">
            <Undo2 class="size-4" />
            <span>{undoLabel}</span>
          </span>
        </button>
      {/if}

      {#if canPassTurn}
        <button
          type="button"
          class="turn-action-button turn-action-button--primary"
          class:turn-action-button--armed={passTurnArmed}
          onclick={onPassTurn}
          aria-label={passTurnLabel}
        >
          <span class="turn-action-button__header">
            <Flag class="size-4" />
            <span>{passTurnLabel}</span>
          </span>
        </button>
      {/if}
    </div>
  </aside>
{/if}

<style>
  .turn-action-rail {
    position: absolute;
    left: 0;
    right: 0;
    bottom: env(safe-area-inset-bottom);
    z-index: 30;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 0.9rem;
    pointer-events: none;
  }

  .turn-action-rail__timer {
    display: flex;
    align-items: flex-end;
    width: min(10.5rem, calc(100vw - 2rem));
    min-width: 0;
    pointer-events: auto;
    margin-left: 0;
  }

  .turn-action-rail__actions {
    display: grid;
    justify-items: end;
    gap: 0.45rem;
    width: min(13.5rem, calc(100vw - 2rem));
    min-width: 0;
    pointer-events: auto;
    margin-right: 0;
  }

  .turn-action-button {
    display: grid;
    gap: 0.28rem;
    width: 100%;
    padding: 0.7rem 0.8rem;
    border-radius: 0.95rem;
    border: 1px solid rgba(148, 163, 184, 0.22);
    background:
      linear-gradient(180deg, rgba(11, 21, 38, 0.98), rgba(7, 14, 24, 0.98));
    color: #eff6ff;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 14px 32px rgba(2, 6, 23, 0.32);
    text-align: left;
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      background 160ms ease,
      box-shadow 160ms ease;
  }

  .turn-action-button:hover {
    transform: translateX(-1px);
    border-color: rgba(125, 211, 252, 0.34);
  }

  .turn-action-button--primary {
    border-color: rgba(250, 204, 21, 0.28);
    background:
      linear-gradient(180deg, rgba(113, 63, 18, 0.92), rgba(68, 34, 10, 0.98));
    color: #fff7db;
  }

  .turn-action-button--secondary {
    border-color: rgba(125, 211, 252, 0.24);
    background:
      linear-gradient(180deg, rgba(8, 47, 73, 0.9), rgba(15, 23, 42, 0.98));
  }

  .turn-action-button--armed {
    border-color: rgba(251, 191, 36, 0.58);
    box-shadow:
      0 0 0 1px rgba(251, 191, 36, 0.24),
      0 14px 32px rgba(2, 6, 23, 0.34),
      inset 0 1px 0 rgba(255, 255, 255, 0.07);
  }

  .turn-action-button__header {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.82rem;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: 0.03em;
  }

  .turn-action-button__meta {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(191, 219, 254, 0.84);
  }

  @media (max-width: 1439px) {
    .turn-action-rail {
      gap: 0.7rem;
    }

    .turn-action-rail__timer {
      width: min(9.5rem, calc(100vw - 2rem));
    }

    .turn-action-rail__actions {
      width: min(12.25rem, calc(100vw - 2rem));
    }

    .turn-action-button {
      padding: 0.62rem 0.72rem;
    }
  }
</style>
