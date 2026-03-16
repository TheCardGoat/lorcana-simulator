<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";
  import type {ActivePlayerGuidanceItem} from "@/features/simulator/model/active-player-guidance.js";

  interface ActivePlayerGuidanceProps {
    items?: ActivePlayerGuidanceItem[];
    anchor?: "top" | "bottom";
  }

  let { items = [], anchor = "bottom" }: ActivePlayerGuidanceProps = $props();
</script>

{#if items.length > 0}
  <div class="guidance-anchor" class:guidance-anchor--top={anchor === "top"} class:guidance-anchor--bottom={anchor === "bottom"}>
    <div class="guidance-stack" role="region" aria-label={m["sim.guidance.aria"]({})}>
      {#each items as item (item.id)}
        <section class="guidance-pill" data-mode={item.mode}>
          <p class="guidance-message" role="status" aria-live="polite" aria-atomic="true">{item.message}</p>

          {#if item.actions.length > 0}
            <div class="guidance-actions">
              {#each item.actions as action (action.id)}
                <button
                  type="button"
                  class="guidance-action"
                  class:guidance-action--emphasis={action.emphasis}
                  disabled={action.disabled}
                  onclick={action.onClick}
                >
                  {action.label}
                </button>
              {/each}
            </div>
          {/if}
        </section>
      {/each}
    </div>
  </div>
{/if}

<style>
  .guidance-anchor {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: min(48rem, calc(100% - 1rem));
    pointer-events: none;
    display: flex;
    justify-content: center;
    z-index: 36;
  }

  .guidance-stack {
    width: min(48rem, calc(100% - 1rem));
    display: grid;
    gap: 0.55rem;
  }

  .guidance-anchor--bottom {
    bottom: calc(var(--hand-guidance-offset, 5.25rem) + var(--hand-guidance-clearance, 1.2rem));
  }

  .guidance-anchor--top {
    top: calc(var(--hand-guidance-offset, 5.25rem) + var(--hand-guidance-clearance, 1.2rem));
  }

  .guidance-pill {
    pointer-events: auto;
    display: grid;
    grid-template-columns: minmax(0, auto) minmax(0, 1fr);
    max-width: 100%;
    align-items: center;
    gap: 0.7rem;
    padding: 0.52rem 0.6rem 0.52rem 0.85rem;
    border-radius: 16px;
    border: 1px solid rgba(130, 178, 235, 0.56);
    background:
      linear-gradient(180deg, rgba(9, 24, 43, 0.94) 0%, rgba(7, 18, 33, 0.94) 100%);
    backdrop-filter: blur(6px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.14);
  }

  .guidance-message {
    margin: 0;
    color: #f2f7ff;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    line-height: 1.2;
    white-space: pre-line;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
  }

  .guidance-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.45rem;
    flex-wrap: wrap;
  }

  .guidance-action {
    min-height: 2rem;
    border-radius: 10px;
    border: 1px solid rgba(173, 210, 246, 0.54);
    background: rgba(17, 48, 81, 0.95);
    color: #e8f1fc;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    line-height: 1.1;
    padding: 0.42rem 0.72rem;
    cursor: pointer;
    transition: background-color 120ms ease, border-color 120ms ease, transform 120ms ease;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
  }

  .guidance-action:hover:enabled {
    background: rgba(37, 76, 120, 0.98);
    border-color: rgba(192, 226, 255, 0.88);
    transform: translateY(-1px);
  }

  .guidance-action--emphasis {
    border-color: rgba(247, 220, 134, 0.9);
    background:
      linear-gradient(180deg, rgba(200, 130, 18, 0.98) 0%, rgba(171, 98, 6, 0.98) 100%);
    color: #fff5d8;
    box-shadow: 0 0 0 1px rgba(255, 214, 122, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.24);
  }

  .guidance-action--emphasis:hover:enabled {
    background:
      linear-gradient(180deg, rgba(220, 149, 29, 0.99) 0%, rgba(194, 116, 15, 0.99) 100%);
  }

  .guidance-action:disabled {
    opacity: 0.54;
    cursor: default;
    transform: none;
  }

  @media (max-width: 900px) {
    .guidance-stack {
      width: 100%;
    }

    .guidance-pill {
      grid-template-columns: 1fr;
      text-align: center;
      border-radius: 14px;
      padding: 0.58rem;
    }

    .guidance-message {
      width: 100%;
      white-space: normal;
    }

    .guidance-actions {
      width: 100%;
      justify-content: center;
    }
  }
</style>
