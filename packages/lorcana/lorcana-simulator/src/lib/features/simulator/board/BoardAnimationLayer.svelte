<script lang="ts">
    import {useLorcanaBoardPresenter} from "@/features/simulator/context/game-context.svelte.js";
    import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
    import {type ResolvedBoardMoveAnimation} from "@/features/simulator/animations/board-move-animations.js";
    import type {BoardAnimationPlaceholder} from "@/features/simulator/animations/animation-orchestrator.svelte.js";
    import {watchCssAnimation} from "@/features/simulator/animations/animation-shared.js";

  const board = useLorcanaBoardPresenter();
  const animations = $derived(board.animations);
  const placeholders = $derived(board.boardAnimationPlaceholders);

  function onBoardAnimationFinished(id: string): void {
    board.onBoardAnimationFinished(id);
  }

  function getPlaceholderStyle(placeholder: BoardAnimationPlaceholder): string {
    return [
      `left:${placeholder.rect.x}px`,
      `top:${placeholder.rect.y}px`,
      `width:${placeholder.rect.width}px`,
      `height:${placeholder.rect.height}px`,
      `--zone-card-width:${placeholder.rect.width}px`,
      `--zone-card-height:${placeholder.rect.height}px`,
    ].join(";");
  }

  function getAnimationStyle(animation: ResolvedBoardMoveAnimation): string {
    // Use the source rect dimensions for the animated card. The destination rect
    // can be a zone-level fallback anchor (spanning the full zone width) when the
    // card-specific anchor isn't in the DOM yet — using those dimensions would
    // stretch the card across the screen. Source is always a real card-sized rect.
    const w = animation.sourceRect.width;
    const h = animation.sourceRect.height;

    const dx = animation.destinationRect.centerX - animation.sourceRect.centerX;
    const dy = animation.destinationRect.centerY - animation.sourceRect.centerY;
    const viaDx = animation.viaRect
      ? animation.viaRect.centerX - animation.sourceRect.centerX
      : dx;
    const viaDy = animation.viaRect
      ? animation.viaRect.centerY - animation.sourceRect.centerY
      : dy;

    return [
      `left:${animation.sourceRect.x}px`,
      `top:${animation.sourceRect.y}px`,
      `width:${w}px`,
      `height:${h}px`,
      `--zone-card-width:${w}px`,
      `--zone-card-height:${h}px`,
      `--board-animation-dx:${dx}px`,
      `--board-animation-dy:${dy}px`,
      `--board-animation-mid-dx:${viaDx}px`,
      `--board-animation-mid-dy:${viaDy}px`,
      `--board-animation-duration:${animation.durationMs}ms`,
    ].join(";");
  }

  function getImpactStyle(animation: ResolvedBoardMoveAnimation): string {
    const rect = animation.impactRect;
    const isPlay = animation.variant.startsWith("play-") && animation.variant !== "play-action-preview";
    const sizeMultiplier = isPlay ? 1.8 : 1.45;
    const size = Math.max(rect.width, rect.height) * sizeMultiplier;
    return [
      `left:${rect.centerX - size / 2}px`,
      `top:${rect.centerY - size / 2}px`,
      `width:${size}px`,
      `height:${size}px`,
      `--board-impact-duration:${Math.round(animation.durationMs * 0.78)}ms`,
    ].join(";");
  }

  function getAnimationImageFormat(animation: ResolvedBoardMoveAnimation): "art_and_name" | "full" {
    if (animation.destinationZoneId === "inkwell") {
      return "art_and_name";
    }
    return "full";
  }
</script>

<div class="board-animation-layer" aria-hidden="true">
  {#each placeholders as placeholder (placeholder.id)}
    <div
      class="board-animation-placeholder"
      style={getPlaceholderStyle(placeholder)}
    >
      <div class="board-animation-card-shell">
        <LorcanaCard
          card={placeholder.card}
          useContainerSize
          imageFormat="art_and_name"
          isMasked={placeholder.renderFace === "faceDown"}
          showHoverCard={false}
        />
      </div>
    </div>
  {/each}

  {#each animations as animation (animation.id)}
    <div
      class="board-animation-impact"
      class:board-animation-impact--ink={animation.variant === "ink-faceDown" || animation.variant === "ink-faceUp"}
      class:board-animation-impact--move-to-location={animation.variant === "move-to-location"}
      class:board-animation-impact--play={animation.variant !== "ink-faceDown" && animation.variant !== "ink-faceUp" && animation.variant !== "move-to-location"}
      style={getImpactStyle(animation)}
    ></div>

    <div
      class="board-animation-actor"
      class:board-animation-actor--banish={animation.variant === "banish"}
      class:board-animation-actor--ink-faceDown={animation.variant === "ink-faceDown"}
      class:board-animation-actor--ink-faceUp={animation.variant === "ink-faceUp"}
      class:board-animation-actor--play-character={animation.variant === "play-character"}
      class:board-animation-actor--play-item={animation.variant === "play-item"}
      class:board-animation-actor--play-location={animation.variant === "play-location"}
      class:board-animation-actor--play-action={animation.variant === "play-action"}
      class:board-animation-actor--move-to-location={animation.variant === "move-to-location"}
      class:board-animation-actor--play-action-preview={animation.variant === "play-action-preview"}
      style={getAnimationStyle(animation)}
      use:watchCssAnimation={{ id: animation.id, onFinished: onBoardAnimationFinished }}
    >
      <div
        class="board-animation-card-shell"
        class:board-animation-card-shell--play-action-preview={animation.variant === "play-action-preview"}
      >
        <LorcanaCard
          card={animation.card}
          useContainerSize
          imageFormat={getAnimationImageFormat(animation)}
          isMasked={animation.variant !== "ink-faceDown" && animation.variant !== "ink-faceUp" && animation.renderFace === "faceDown"}
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

  .board-animation-placeholder {
    position: absolute;
    pointer-events: none;
  }

  .board-animation-actor {
    position: absolute;
    pointer-events: none;
    transform-origin: center center;
    will-change: transform, opacity;
    animation-duration: var(--board-animation-duration);
    animation-fill-mode: both;
  }

  .board-animation-card-shell {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 22px 28px rgba(5, 10, 18, 0.55));
  }

  .board-animation-actor--banish {
    animation-name: board-animation-banish;
    animation-timing-function: cubic-bezier(0.3, 0.0, 0.5, 1);
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

  .board-animation-actor--move-to-location {
    animation-name: board-animation-move-to-location;
    animation-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
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

  .board-animation-impact--move-to-location {
    background:
      radial-gradient(circle, rgba(255, 200, 80, 0.26) 0%, rgba(255, 200, 80, 0.1) 40%, transparent 76%);
    box-shadow:
      0 0 24px rgba(255, 200, 80, 0.24),
      inset 0 0 22px rgba(255, 230, 150, 0.12);
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

  @keyframes board-animation-banish {
    0% {
      opacity: 1;
      transform: translate(0px, 0px) rotate(0deg);
    }
    30% {
      opacity: 0.9;
      transform: translate(
          calc(var(--board-animation-dx) * 0.25),
          calc(var(--board-animation-dy) * 0.25 - 14px)
        )
        rotate(-3deg);
    }
    100% {
      opacity: 0;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy))
        rotate(6deg);
    }
  }

  @keyframes board-animation-ink {
    0% {
      opacity: 0;
      transform: translate(0px, 0px) rotate(-8deg);
    }
    15% {
      opacity: 1;
    }
    35% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        rotate(0deg);
    }
    55% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        rotate(0deg);
    }
    100% {
      opacity: 0.96;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy))
        rotate(0deg);
    }
  }

  @keyframes board-animation-play-character {
    0% {
      opacity: 0;
      transform: translate(0px, 0px) rotate(-6deg);
    }
    15% {
      opacity: 1;
    }
    35% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        rotate(0deg);
    }
    55% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        rotate(0deg);
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0.98;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy))
        rotate(0deg);
    }
  }

  @keyframes board-animation-play-item {
    0% {
      opacity: 0;
      transform: translate(0px, 0px) rotate(-4deg);
    }
    15% {
      opacity: 1;
    }
    35% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        rotate(0deg);
    }
    55% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        rotate(0deg);
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0.98;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy))
        rotate(0deg);
    }
  }

  @keyframes board-animation-play-location {
    0% {
      opacity: 0;
      transform: translate(0px, 0px) rotate(-3deg);
    }
    15% {
      opacity: 1;
    }
    35% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        rotate(0deg);
    }
    55% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        rotate(0deg);
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0.98;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy))
        rotate(0deg);
    }
  }

  @keyframes board-animation-play-action {
    0% {
      opacity: 0;
      transform: translate(0px, 0px) rotate(-6deg);
    }
    15% {
      opacity: 1;
    }
    30% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        rotate(0deg);
    }
    55% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy))
        rotate(0deg);
    }
    75% {
      opacity: 0.95;
    }
    100% {
      opacity: 0;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy))
        rotate(3deg);
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
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy)) rotate(0deg);
    }
    74% {
      opacity: 1;
      transform: translate(var(--board-animation-mid-dx), var(--board-animation-mid-dy)) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: translate(var(--board-animation-mid-dx), calc(var(--board-animation-mid-dy) - 28px))
        rotate(3deg);
    }
  }

  @keyframes board-animation-move-to-location {
    0% {
      opacity: 1;
      transform: translate(0px, 0px);
    }
    40% {
      opacity: 1;
      transform: translate(
          calc(var(--board-animation-dx) * 0.5),
          calc(var(--board-animation-dy) * 0.5 - 18px)
        );
    }
    100% {
      opacity: 0.96;
      transform: translate(var(--board-animation-dx), var(--board-animation-dy));
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

  @media (prefers-reduced-motion: reduce) {
    .board-animation-actor {
      animation: none;
    }

    .board-animation-impact {
      animation: none;
    }
  }

  /* Mobile: skip impact rings and reduce filter complexity for better perf */
  @media (hover: none) and (pointer: coarse) {
    .board-animation-card-shell {
      filter: none;
    }

    .board-animation-card-shell--play-action-preview {
      filter: none;
    }

    .board-animation-impact {
      display: none;
    }
  }
</style>
