<script lang="ts">
    import {useLorcanaBoardPresenter} from "@/features/simulator/context/game-context.svelte.js";
    import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
    import {type ResolvedBoardMoveAnimation} from "@/features/simulator/animations/board-move-animations.js";

  const board = useLorcanaBoardPresenter();
  const animations = $derived(board.animations);

  function getAnimationStyle(animation: ResolvedBoardMoveAnimation): string {
    const dx = animation.destinationRect.centerX - animation.sourceRect.centerX;
    const dy = animation.destinationRect.centerY - animation.sourceRect.centerY;
    const scaleX = animation.destinationRect.width / Math.max(animation.sourceRect.width, 1);
    const scaleY = animation.destinationRect.height / Math.max(animation.sourceRect.height, 1);
    const viaDx = animation.viaRect
      ? animation.viaRect.centerX - animation.sourceRect.centerX
      : dx;
    const viaDy = animation.viaRect
      ? animation.viaRect.centerY - animation.sourceRect.centerY
      : dy;
    const viaScaleX = animation.viaRect
      ? animation.viaRect.width / Math.max(animation.sourceRect.width, 1)
      : scaleX;
    const viaScaleY = animation.viaRect
      ? animation.viaRect.height / Math.max(animation.sourceRect.height, 1)
      : scaleY;

    console.log("[BoardAnimationLayer] Rendering board animation style", {
      id: animation.id,
      variant: animation.variant,
      sourceRect: animation.sourceRect,
      destinationRect: animation.destinationRect,
      viaRect: animation.viaRect ?? null,
      dx,
      dy,
      scaleX,
      scaleY,
      viaDx,
      viaDy,
    });

    return [
      `left:${animation.sourceRect.x}px`,
      `top:${animation.sourceRect.y}px`,
      `width:${animation.sourceRect.width}px`,
      `height:${animation.sourceRect.height}px`,
      `--board-animation-dx:${dx}px`,
      `--board-animation-dy:${dy}px`,
      `--board-animation-scale-x:${scaleX}`,
      `--board-animation-scale-y:${scaleY}`,
      `--board-animation-mid-dx:${viaDx}px`,
      `--board-animation-mid-dy:${viaDy}px`,
      `--board-animation-mid-scale-x:${viaScaleX}`,
      `--board-animation-mid-scale-y:${viaScaleY}`,
      `--board-animation-duration:${animation.durationMs}ms`,
    ].join(";");
  }

  function getImpactStyle(animation: ResolvedBoardMoveAnimation): string {
    const rect = animation.impactRect;
    const size = Math.max(rect.width, rect.height) * 1.45;
    return [
      `left:${rect.centerX - size / 2}px`,
      `top:${rect.centerY - size / 2}px`,
      `width:${size}px`,
      `height:${size}px`,
      `--board-impact-duration:${Math.round(animation.durationMs * 0.78)}ms`,
    ].join(";");
  }

  function getAnimationImageFormat(animation: ResolvedBoardMoveAnimation): "art_and_name" | "full" {
    return animation.variant === "play-action" || animation.destinationZoneId === "inkwell"
      ? "art_and_name"
      : "full";
  }
</script>

<div class="board-animation-layer" aria-hidden="true">
  {#each animations as animation (animation.id)}
    <div
      class="board-animation-impact"
      class:board-animation-impact--ink={animation.variant === "ink-faceDown" || animation.variant === "ink-faceUp"}
      class:board-animation-impact--play={animation.variant !== "ink-faceDown" && animation.variant !== "ink-faceUp"}
      style={getImpactStyle(animation)}
    ></div>

    <div
      class="board-animation-actor"
      class:board-animation-actor--ink-faceDown={animation.variant === "ink-faceDown"}
      class:board-animation-actor--ink-faceUp={animation.variant === "ink-faceUp"}
      class:board-animation-actor--play-character={animation.variant === "play-character"}
      class:board-animation-actor--play-item={animation.variant === "play-item"}
      class:board-animation-actor--play-location={animation.variant === "play-location"}
      class:board-animation-actor--play-action={animation.variant === "play-action"}
      class:board-animation-actor--play-action-preview={animation.variant === "play-action-preview"}
      style={getAnimationStyle(animation)}
    >
      <div
        class="board-animation-card-shell"
        class:board-animation-card-shell--play-action-preview={animation.variant === "play-action-preview"}
      >
        <LorcanaCard
          card={animation.card}
          useContainerSize
          imageFormat={getAnimationImageFormat(animation)}
          isMasked={animation.renderFace === "faceDown"}
          showHoverCard={false}
        />
      </div>
    </div>
  {/each}
</div>

<style>
  .board-animation-layer {
    position: absolute;
    inset: 0;
    overflow: visible;
    pointer-events: none;
    z-index: 25;
  }

  .board-animation-actor {
    position: absolute;
    pointer-events: none;
    transform-origin: center center;
    will-change: transform, opacity, filter;
    animation-duration: var(--board-animation-duration);
    animation-fill-mode: both;
  }

  .board-animation-card-shell {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 22px 28px rgba(5, 10, 18, 0.55));
  }

  .board-animation-actor--ink-faceDown,
  .board-animation-actor--ink-faceUp {
    animation-name: board-animation-ink;
    animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
  }

  .board-animation-actor--play-character {
    animation-name: board-animation-play-character;
    animation-timing-function: cubic-bezier(0.2, 0.85, 0.22, 1);
  }

  .board-animation-actor--play-item {
    animation-name: board-animation-play-item;
    animation-timing-function: cubic-bezier(0.18, 0.82, 0.2, 1);
  }

  .board-animation-actor--play-location {
    animation-name: board-animation-play-location;
    animation-timing-function: cubic-bezier(0.18, 0.76, 0.22, 1);
  }

  .board-animation-actor--play-action {
    animation-name: board-animation-play-action;
    animation-timing-function: cubic-bezier(0.18, 0.84, 0.2, 1);
  }

  .board-animation-actor--play-action-preview {
    animation-name: board-animation-play-action-preview;
    animation-timing-function: cubic-bezier(0.22, 0.82, 0.18, 1);
  }

  .board-animation-impact {
    position: absolute;
    border-radius: 999px;
    pointer-events: none;
    animation: board-animation-impact-ring var(--board-impact-duration) ease-out both;
  }

  .board-animation-impact--ink {
    background:
      radial-gradient(circle, rgba(145, 104, 255, 0.28) 0%, rgba(145, 104, 255, 0.14) 35%, transparent 72%);
    box-shadow:
      0 0 22px rgba(145, 104, 255, 0.28),
      inset 0 0 18px rgba(196, 181, 253, 0.18);
  }

  .board-animation-impact--play {
    background:
      radial-gradient(circle, rgba(80, 197, 255, 0.26) 0%, rgba(80, 197, 255, 0.1) 40%, transparent 76%);
    box-shadow:
      0 0 24px rgba(80, 197, 255, 0.24),
      inset 0 0 22px rgba(186, 230, 253, 0.12);
  }

  .board-animation-card-shell--play-action-preview {
    filter: drop-shadow(0 26px 36px rgba(5, 10, 18, 0.68)) drop-shadow(0 0 28px rgba(104, 225, 255, 0.34));
  }

  @keyframes board-animation-ink {
    0% {
      opacity: 0.15;
      transform: translate(0px, 0px) scale(1) rotate(-8deg);
    }
    18% {
      opacity: 1;
    }
    52% {
      transform: translate(
          calc(var(--board-animation-dx) * 0.58),
          calc(var(--board-animation-dy) * 0.58 - 42px)
        )
        scale(1.04);
    }
    100% {
      opacity: 0.96;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy))
        scale(var(--board-animation-scale-x), var(--board-animation-scale-y))
        rotate(0deg);
    }
  }

  @keyframes board-animation-play-character {
    0% {
      opacity: 0.12;
      transform: translate(0px, 0px) scale(1) rotate(-6deg);
    }
    20% {
      opacity: 1;
    }
    54% {
      transform: translate(
          calc(var(--board-animation-dx) * 0.56),
          calc(var(--board-animation-dy) * 0.56 - 72px)
        )
        scale(1.08)
        rotate(2deg);
    }
    100% {
      opacity: 0.98;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy))
        scale(var(--board-animation-scale-x), var(--board-animation-scale-y))
        rotate(0deg);
    }
  }

  @keyframes board-animation-play-item {
    0% {
      opacity: 0.12;
      transform: translate(0px, 0px) scale(1) rotate(-4deg);
    }
    24% {
      opacity: 1;
    }
    64% {
      transform: translate(
          calc(var(--board-animation-dx) * 0.76),
          calc(var(--board-animation-dy) * 0.76 - 28px)
        )
        scale(1.03)
        rotate(4deg);
    }
    100% {
      opacity: 0.98;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy))
        scale(var(--board-animation-scale-x), var(--board-animation-scale-y))
        rotate(0deg);
    }
  }

  @keyframes board-animation-play-location {
    0% {
      opacity: 0.12;
      transform: translate(0px, 0px) scale(1) rotate(-3deg);
    }
    28% {
      opacity: 1;
    }
    70% {
      transform: translate(
          calc(var(--board-animation-dx) * 0.7),
          calc(var(--board-animation-dy) * 0.7 - 18px)
        )
        scale(1.02)
        rotate(1deg);
    }
    100% {
      opacity: 0.98;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy))
        scale(var(--board-animation-scale-x), var(--board-animation-scale-y))
        rotate(0deg);
    }
  }

  @keyframes board-animation-play-action {
    0% {
      opacity: 0.12;
      transform: translate(0px, 0px) scale(1) rotate(-6deg);
    }
    34% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        scale(var(--board-animation-mid-scale-x), var(--board-animation-mid-scale-y))
        rotate(0deg);
    }
    54% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        scale(calc(var(--board-animation-mid-scale-x) * 1.08), calc(var(--board-animation-mid-scale-y) * 1.08));
    }
    100% {
      opacity: 0.92;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy))
        scale(var(--board-animation-scale-x), var(--board-animation-scale-y)) rotate(3deg);
    }
  }

  @keyframes board-animation-play-action-preview {
    0% {
      opacity: 0;
      transform: translate(0px, 0px) scale(0.92) rotate(-9deg);
    }
    16% {
      opacity: 1;
    }
    32% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy)) scale(calc(var(--board-animation-mid-scale-x) * 1.04), calc(var(--board-animation-mid-scale-y) * 1.04)) rotate(0deg);
    }
    74% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy)) scale(calc(var(--board-animation-mid-scale-x) * 1.12), calc(var(--board-animation-mid-scale-y) * 1.12)) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: translate(var(--board-animation-mid-dx), calc(var(--board-animation-mid-dy) - 28px)) scale(calc(var(--board-animation-mid-scale-x) * 0.82), calc(var(--board-animation-mid-scale-y) * 0.82))
        rotate(3deg);
    }
  }

  @keyframes board-animation-impact-ring {
    0% {
      opacity: 0;
      transform: scale(0.35);
    }
    18% {
      opacity: 0.95;
    }
    100% {
      opacity: 0;
      transform: scale(1.08);
    }
  }
</style>
