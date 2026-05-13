<script lang="ts">
  import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
  import { useLorcanaBoardPresenter } from "@/features/simulator/context/game-context.svelte.js";
  import type { ResolvedActionAnimation } from "@/features/simulator/animations/action-animations.js";
  import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";
  import { m } from "$lib/i18n/messages.js";

  const board = useLorcanaBoardPresenter();
  const actionAnimations = $derived(board.actionAnimations);
  const cardSnapshotsById = $derived(board.cardSnapshotsById);

  function onActionAnimationFinished(id: string): void {
    board.onActionAnimationFinished(id);
  }

  function getTargetCard(targetId: string): LorcanaCardSnapshot | null {
    return cardSnapshotsById[targetId] ?? null;
  }

  function getActionCard(animation: ResolvedActionAnimation): LorcanaCardSnapshot | null {
    return cardSnapshotsById[animation.actionCardId] ?? null;
  }

  function handleAnimationEnd(animation: ResolvedActionAnimation, event: AnimationEvent): void {
    if (event.currentTarget !== event.target) {
      return;
    }

    onActionAnimationFinished(animation.id);
  }

  function markerId(animation: ResolvedActionAnimation, index: number): string {
    return `action-result-arrow-${animation.id}-${index}`;
  }
</script>

{#each actionAnimations as animation (animation.id)}
  <div
    class="action-result-panel"
    style="--duration:{animation.durationMs}ms"
    aria-hidden="true"
    onanimationend={(event) => handleAnimationEnd(animation, event)}
  >
    <div class="card-slot card-slot--source">
      {#if getActionCard(animation)}
        <LorcanaCard card={getActionCard(animation)!} size="small" isExerted={false} />
      {:else}
        <div class="card-placeholder"></div>
      {/if}
    </div>

    <div class="targets" style="--target-count:{animation.targets.length}">
      {#each animation.targets as target, index (`${animation.id}:${target.cardId}:${index}`)}
        <div class="target-column">
          <svg class="arrow-svg" viewBox="0 0 20 52" aria-hidden="true" overflow="visible">
            <defs>
              <marker
                id={markerId(animation, index)}
                markerWidth="10"
                markerHeight="10"
                refX="8.5"
                refY="5"
                orient="auto"
              >
                <path d="M 0 1 L 8.5 5 L 0 9 Q 2.8 5 0 1" class="fill-amber-300" />
              </marker>
            </defs>
            <line
              x1="10"
              y1="4"
              x2="10"
              y2="44"
              class="stroke-slate-950/55"
              stroke-width="14"
              stroke-linecap="round"
            />
            <line
              x1="10"
              y1="4"
              x2="10"
              y2="44"
              class="stroke-amber-300/95"
              stroke-width="8"
              stroke-linecap="round"
              marker-end="url(#{markerId(animation, index)})"
            />
          </svg>

          <div class="card-slot">
            {#if getTargetCard(target.cardId)}
              <LorcanaCard
                card={getTargetCard(target.cardId)!}
                size="small"
                isExerted={false}
                isBanishedPreview={target.wasBanished}
              />
            {:else}
              <div class="card-placeholder"></div>
            {/if}
            {#if target.wasBanished}
              <span class="banish-badge">{m["sim.challengePreview.banished"]({})}</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
{/each}

<style>
  .action-result-panel {
    position: fixed;
    right: 1.5rem;
    top: 50%;
    z-index: 50;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    max-width: min(34rem, calc(100vw - 3rem));
    background: rgba(9, 16, 28, 0.96);
    border: 1px solid rgba(113, 154, 204, 0.25);
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: action-result-panel-lifecycle var(--duration, 1000ms) ease both;
  }

  @keyframes action-result-panel-lifecycle {
    0% {
      opacity: 0;
      transform: translate3d(120%, -50%, 0);
    }
    8% {
      opacity: 1;
      transform: translate3d(0, -50%, 0);
    }
    88% {
      opacity: 1;
      transform: translate3d(0, -50%, 0);
    }
    100% {
      opacity: 0;
      transform: translate3d(0, -50%, 0);
    }
  }

  .targets {
    display: grid;
    grid-template-columns: repeat(var(--target-count), minmax(76px, 1fr));
    gap: 10px;
    align-items: start;
    justify-items: center;
    max-width: 100%;
  }

  .target-column,
  .card-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card-slot {
    gap: 4px;
  }

  .card-slot--source {
    margin-bottom: -2px;
  }

  .card-placeholder {
    width: 90px;
    height: 126px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .arrow-svg {
    width: 20px;
    height: 52px;
    flex-shrink: 0;
  }

  .banish-badge {
    position: static;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.85);
    padding: 0.2rem 0.55rem;
    font-size: 0.58rem;
    font-weight: 900;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgb(253, 230, 138);
    white-space: nowrap;
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.45);
  }

  @media (max-width: 720px) {
    .action-result-panel {
      right: 0.75rem;
      padding: 12px;
    }

    .targets {
      grid-template-columns: repeat(var(--target-count), minmax(64px, 1fr));
      gap: 6px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .action-result-panel {
      animation: none;
    }
  }
</style>
