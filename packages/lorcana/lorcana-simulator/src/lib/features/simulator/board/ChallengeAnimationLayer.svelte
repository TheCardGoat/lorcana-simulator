<script lang="ts">
  import { useLorcanaBoardPresenter } from "@/features/simulator/context/game-context.svelte.js";
  import ChallengeAimOverlay from "@/features/simulator/board/ChallengeAimOverlay.svelte";
  import type { ResolvedChallengeAnimation } from "@/features/simulator/animations/challenge-animations.js";
  import type { ChallengePreviewResult } from "@tcg/lorcana-engine";
  import type { BoardLocalRect } from "@/features/simulator/animations/board-move-animations.js";

  const board = useLorcanaBoardPresenter();
  const challengeAnimations = $derived(board.challengeAnimations);

  function getBoardSize(): { width: number; height: number } {
    const snapshot = board.boardSnapshot;
    return {
      width: snapshot ? 2000 : 0,
      height: snapshot ? 1200 : 0,
    };
  }

  function buildPreview(animation: ResolvedChallengeAnimation): ChallengePreviewResult {
    return {
      attackerId: animation.attackerId as never,
      defenderId: animation.defenderId as never,
      defenderKind: animation.preview.defenderKind,
      attackerCurrentDamage: 0,
      defenderCurrentDamage: 0,
      attackerNextDamage: 0,
      defenderNextDamage: 0,
      attackerWillpower: 0,
      defenderWillpower: 0,
      attackerDamageDealt: animation.preview.attackerDamageDealt,
      defenderDamageDealt: animation.preview.defenderDamageDealt,
      attackerWouldBeBanished: animation.preview.attackerWouldBeBanished,
      defenderWouldBeBanished: animation.preview.defenderWouldBeBanished,
    };
  }

  function getTargetPoint(rect: BoardLocalRect): { x: number; y: number } {
    return { x: rect.centerX, y: rect.centerY };
  }
</script>

<div class="challenge-animation-layer" aria-hidden="true">
  {#each challengeAnimations as animation (animation.id)}
    <div
      class="challenge-animation-wrapper"
      style="--challenge-animation-duration:{animation.durationMs}ms"
    >
      <ChallengeAimOverlay
        width={getBoardSize().width}
        height={getBoardSize().height}
        sourceRect={animation.sourceRect}
        targetPoint={getTargetPoint(animation.destinationRect)}
        lockedTargetRect={animation.destinationRect}
        preview={buildPreview(animation)}
      />
    </div>
  {/each}
</div>

<style>
  .challenge-animation-layer {
    position: absolute;
    inset: 0;
    overflow: visible;
    pointer-events: none;
    z-index: 27;
  }

  .challenge-animation-wrapper {
    position: absolute;
    inset: 0;
    pointer-events: none;
    animation: challenge-animation-lifecycle var(--challenge-animation-duration, 1000ms) ease both;
  }

  @keyframes challenge-animation-lifecycle {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .challenge-animation-wrapper {
      animation: none;
    }
  }
</style>
