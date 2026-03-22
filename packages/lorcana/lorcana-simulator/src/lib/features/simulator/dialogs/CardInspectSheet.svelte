<script lang="ts">
  import EyeIcon from "@lucide/svelte/icons/eye";
  import XIcon from "@lucide/svelte/icons/x";
  import * as Button from "$lib/design-system/primitives/button/index.js";
  import * as Sheet from "$lib/design-system/primitives/sheet/index.js";
  import { m } from "$lib/i18n/messages.js";
  import {SimulatorLayoutModeObserver} from "@/features/simulator/model/layout-mode.svelte.js";
  import {useLorcanaSidebarPresenter} from "@/features/simulator/context/game-context.svelte.js";
  import CardHoverCardContent from "@/design-system/simulator/cards/CardHoverCardContent.svelte";
  import {useSimulatorCardContext} from "@/features/simulator/context/simulator-card-context.svelte.js";

  const simulatorCardContext = useSimulatorCardContext();
  const sidebar = useLorcanaSidebarPresenter();
  const layout = new SimulatorLayoutModeObserver();
  const inspectedCard = $derived(simulatorCardContext.inspectedCard);
  const canSelectInspectedCard = $derived(simulatorCardContext.canSelectInspectedCard);
  const isMobileLayout = $derived(layout.current === "mobile");
  const inspectedActions = $derived(inspectedCard ? sidebar.getCardActionViews(inspectedCard) : []);

  function handleOpenPreview(): void {
    simulatorCardContext.openGlobalPreview(inspectedCard);
  }

  function handleSelect(): void {
    simulatorCardContext.selectInspectedCard();
  }

  function handleClose(): void {
    simulatorCardContext.closeCardInspect();
  }

  $effect(() => {
    if (!isMobileLayout && simulatorCardContext.isInspectOpen) {
      simulatorCardContext.closeCardInspect();
    }
  });
</script>

{#if isMobileLayout}
  <Sheet.Root
    bind:open={() => simulatorCardContext.isInspectOpen, (open) => {
      if (!open) {
        simulatorCardContext.closeCardInspect();
      }
    }}
  >
    <Sheet.Content
      side="bottom"
      showCloseButton={false}
      class="inspect-sheet max-h-[82vh] rounded-t-3xl border-sky-400/25 bg-slate-950/96 px-0 pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <Sheet.Header class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 pt-4">
        <Sheet.Title
          class="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold leading-5 tracking-normal text-slate-200 normal-case"
          title={inspectedCard?.label ?? m["sim.inspect.title"]({})}
        >
          {inspectedCard?.label ?? m["sim.inspect.title"]({})}
        </Sheet.Title>
        <div class="inspect-sheet__actions">
          <button
            type="button"
            class="inspect-sheet__preview-button"
            onclick={handleOpenPreview}
            aria-label={inspectedCard ? m["sim.inspect.previewAria"]({ card: inspectedCard.label }) : "Open preview"}
            disabled={!inspectedCard}
          >
            <EyeIcon class="size-4" />
          </button>
          <button
            type="button"
            class="inspect-sheet__preview-button"
            onclick={handleClose}
            aria-label={m["sim.errorPanel.close"]({})}
          >
            <XIcon class="size-4" />
          </button>
        </div>
      </Sheet.Header>

      <div class="inspect-sheet__body px-4 pb-4 pt-2">
        {#if inspectedCard}
          <CardHoverCardContent
            card={inspectedCard}
            actions={inspectedActions}
            onAction={(action) => {
              if (sidebar.handleCardActionClick(action, { skipConfirmation: true })) {
                simulatorCardContext.closeCardInspect();
              }
            }}
          />
        {/if}
      </div>

      {#if inspectedCard && canSelectInspectedCard}
        <Sheet.Footer class="inspect-sheet__footer px-4 pt-0">
          <Button.Root class="w-full" onclick={handleSelect}>
            {m["sim.inspect.select"]({})}
          </Button.Root>
        </Sheet.Footer>
      {/if}
    </Sheet.Content>
  </Sheet.Root>
{/if}

<style>
  .inspect-sheet__body {
    overflow-y: auto;
    display: flex;
    justify-content: center;
  }

  .inspect-sheet__actions {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
  }

  .inspect-sheet__preview-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.38);
    background: rgba(15, 23, 42, 0.9);
    color: rgba(226, 232, 240, 0.96);
    box-shadow: 0 10px 25px rgba(2, 6, 23, 0.32);
    flex-shrink: 0;
  }

  .inspect-sheet__preview-button:disabled {
    opacity: 0.45;
    box-shadow: none;
  }
</style>
