<script lang="ts">
  import { useLorcanaBoardPresenter } from "@/features/simulator/context/game-context.svelte.js";
  import type { ResolvedCardEffectAnimation } from "@/features/simulator/animations/card-effect-animations.js";
  import { watchCssAnimation } from "@/features/simulator/animations/animation-shared.js";

  const board = useLorcanaBoardPresenter();
  const cardEffectAnimations = $derived(board.cardEffectAnimations);

  function onCardEffectAnimationFinished(id: string): void {
    board.onCardEffectAnimationFinished(id);
  }

  function getGlowStyle(animation: ResolvedCardEffectAnimation): string {
    const rect = animation.sourceRect;
    const size = Math.max(rect.width, rect.height) * 1.6;
    return [
      `left:${rect.centerX - size / 2}px`,
      `top:${rect.centerY - size / 2}px`,
      `width:${size}px`,
      `height:${size}px`,
      `--card-effect-duration:${animation.durationMs}ms`,
    ].join(";");
  }
</script>

<div class="card-effect-animation-layer" aria-hidden="true">
  {#each cardEffectAnimations as animation (animation.id)}
    <div
      class="card-effect-glow"
      class:card-effect-glow--activate={animation.effectKind === "activate-ability"}
      class:card-effect-glow--sing={animation.effectKind === "sing"}
      class:card-effect-glow--resolve={animation.effectKind === "resolve-effect"}
      style={getGlowStyle(animation)}
      use:watchCssAnimation={{ id: animation.id, onFinished: onCardEffectAnimationFinished }}
    ></div>
  {/each}
</div>

<style>
  .card-effect-animation-layer {
    position: absolute;
    inset: 0;
    overflow: visible;
    pointer-events: none;
    z-index: 26;
  }

  .card-effect-glow {
    position: absolute;
    border-radius: 999px;
    pointer-events: none;
    animation: card-effect-pulse var(--card-effect-duration, 800ms) ease-out both;
  }

  .card-effect-glow--activate {
    background:
      radial-gradient(circle, rgba(255, 215, 80, 0.35) 0%, rgba(255, 215, 80, 0.12) 40%, transparent 72%);
    box-shadow:
      0 0 28px rgba(255, 215, 80, 0.3),
      inset 0 0 20px rgba(255, 240, 160, 0.15);
  }

  .card-effect-glow--sing {
    background:
      radial-gradient(circle, rgba(180, 130, 255, 0.35) 0%, rgba(180, 130, 255, 0.12) 40%, transparent 72%);
    box-shadow:
      0 0 28px rgba(180, 130, 255, 0.3),
      inset 0 0 20px rgba(210, 180, 255, 0.15);
  }

  .card-effect-glow--resolve {
    background:
      radial-gradient(circle, rgba(80, 200, 255, 0.35) 0%, rgba(80, 200, 255, 0.12) 40%, transparent 72%);
    box-shadow:
      0 0 28px rgba(80, 200, 255, 0.3),
      inset 0 0 20px rgba(160, 225, 255, 0.15);
  }

  @keyframes card-effect-pulse {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    25% {
      opacity: 1;
      transform: scale(1);
    }
    60% {
      opacity: 0.8;
      transform: scale(1.05);
    }
    100% {
      opacity: 0;
      transform: scale(1.15);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card-effect-glow {
      animation: none;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .card-effect-glow {
      box-shadow: none;
    }
  }
</style>
