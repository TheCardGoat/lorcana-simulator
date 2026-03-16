<script lang="ts">
    import "../../../app.css";
  import { untrack } from "svelte";
  import { m } from "$lib/paraglide/messages";
    import * as Dialog from "$lib/design-system/primitives/dialog";
    import * as Sidebar from "$lib/design-system/primitives/sidebar";
    import {Toaster} from "$lib/design-system/primitives/sonner";
  import { toast } from "svelte-sonner";
  import {DragDropProvider} from "@dnd-kit/svelte";
  import {Feedback, PointerActivationConstraints, PointerSensor} from "@dnd-kit/dom";
  import type { LorcanaEngineBase } from "@tcg/lorcana-engine";
    import type {LorcanaSimulatorReadModel, SimulatorMoveError} from "@/features/simulator/model/contracts.js";
    import type {LorcanaPlayerSettingsMap} from "@/features/simulator/model/player-visual-settings.js";

    import LorcanaSimulatorSidebar from "./LorcanaSimulatorSidebar.svelte";
  import LorcanaCompactPanels from "./LorcanaCompactPanels.svelte";
    import {setSimulatorCardContext} from "@/features/simulator/context/simulator-card-context.svelte.js";
    import {setLorcanaSimulatorDndContext} from "@/features/simulator/context/simulator-dnd-context.svelte.js";
    import {CardInspectSheet, GlobalCardPreview, TabletopBoard} from "@/features/simulator/index.js";
    import {
        setLorcanaGameContext,
        useLorcanaSidebarPresenter
    } from "@/features/simulator/context/game-context.svelte.js";
    import {SimulatorLayoutModeObserver} from "@/features/simulator/model/layout-mode.svelte.js";
    import {getMoveCategoryGroupCount} from "@/features/simulator/model/move-presentation.js";

  interface LorcanaTabletopSimulatorProps {
    engine: LorcanaEngineBase;
    readModel?: Pick<LorcanaSimulatorReadModel, "getMoveLog"> &
      Partial<Pick<LorcanaSimulatorReadModel, "subscribeStateUpdates">>;
    playerSettings?: LorcanaPlayerSettingsMap;
  }

  let { engine, readModel, playerSettings = {} }: LorcanaTabletopSimulatorProps = $props();
  let sidebarOpen = $state(true);

  const game = setLorcanaGameContext({
    get engine() {
      return engine;
    },
    get readModel() {
      return readModel;
    },
    get playerSettings() {
      return playerSettings;
    },
  });

  const sidebar = useLorcanaSidebarPresenter();

  setSimulatorCardContext({
    onMulliganSelectionChange: () => {
      sidebar.pendingMulliganDangerConfirm = null;
    },
  });
  const dndContext = setLorcanaSimulatorDndContext();

  const boardSnapshot = $derived(game.boardSnapshot());
  const pendingMoveError = $derived(sidebar.pendingMoveError);
  const executableMoves = $derived(sidebar.executableMoves);
  const compactActionCount = $derived(getMoveCategoryGroupCount(executableMoves));
  const layout = new SimulatorLayoutModeObserver();
  const layoutMode = $derived(layout.current);
  const isCompactLayout = $derived(layout.isCompact);
  // Hand cards overlap nearby drop zones, so we require a bit of movement before
  // starting a drag. Touch keeps a larger threshold to avoid long-press-only drag,
  // while mouse gets a smaller threshold so clicks do not misfire into the inkwell.
  const sensors = [
    PointerSensor.configure({
      activationConstraints(event) {
        if (event.pointerType === "touch") {
          return [new PointerActivationConstraints.Distance({ value: 10 })];
        }

        return [new PointerActivationConstraints.Distance({ value: 6 })];
      },
    }),
  ];
  let lastToastedMoveError = $state<SimulatorMoveError | null>(null);
  let compactPanelsOpen = $state(false);
  let compactPanelsTab = $state<"moves" | "log">("moves");

  $effect(() => {
    const nextEngine = engine;
    const nextReadModel = readModel;
    const nextPlayerSettings = playerSettings;

    untrack(() => {
      console.log("[LorcanaTabletopSimulator] Sync");
      game.syncEngine(nextEngine, nextReadModel, nextPlayerSettings);
    });
  });

  $effect(() => {
    if (!isCompactLayout) {
      compactPanelsOpen = false;
      compactPanelsTab = "moves";
    }
  });

  $effect(() => {
    if (!pendingMoveError || pendingMoveError === lastToastedMoveError) {
      return;
    }

    lastToastedMoveError = pendingMoveError;

    toast.error(pendingMoveError.rawReason ?? pendingMoveError.message, {
      description:
        pendingMoveError.rawReason && pendingMoveError.rawReason !== pendingMoveError.message
          ? pendingMoveError.message
          : undefined,
    });
  });

  $effect(() => {
    if (!pendingMoveError || pendingMoveError === lastToastedMoveError) {
      return;
    }

    lastToastedMoveError = pendingMoveError;

    toast.error(pendingMoveError.rawReason ?? pendingMoveError.message, {
      description:
        pendingMoveError.rawReason && pendingMoveError.rawReason !== pendingMoveError.message
          ? pendingMoveError.message
          : undefined,
    });
  });

  export function runAnimation(...args: Parameters<typeof game.runAnimation>): ReturnType<typeof game.runAnimation> {
    return game.runAnimation(...args);
  }

  function openCompactPanels(tab: "moves" | "log" = "moves"): void {
    compactPanelsTab = tab;
    compactPanelsOpen = true;
  }
</script>

<DragDropProvider
        plugins={(defaults) => [...defaults, Feedback.configure({})]}
        {sensors}
        onDragStart={dndContext.handleDragStart}
        onDragMove={dndContext.handleDragMove}
        onDragEnd={dndContext.handleDragEnd}
>
  <Sidebar.Provider bind:open={sidebarOpen}>
    <div class="simulator-dark simulator-v2">
      <Toaster theme="dark"/>
      {#if !isCompactLayout}
          <LorcanaSimulatorSidebar/>
      {/if}

      {#if !isCompactLayout}
        <Sidebar.Inset aria-label={m["sim.tabletop.aria"]({})}>
          <div class="absolute z-50 cursor-pointer top-1 left-1">
            <Sidebar.Trigger class="cursor-pointer"/>
          </div>

          {#if boardSnapshot}
            <TabletopBoard
              {layoutMode}
              {compactActionCount}
              pendingEffectsPopoverItems={sidebar.pendingEffectsPopoverItems}
              activePlayerGuidance={sidebar.activePlayerGuidance}
              scryResolutionOpen={sidebar.isScryResolutionOpen}
              scryResolutionEffect={sidebar.activeScryResolution}
              onCloseScryResolution={sidebar.closeScryResolution}
              onConfirmScryResolution={sidebar.handleConfirmScryResolution}
            />
          {:else}
            <div class="loading">{m["sim.tabletop.loading"]({})}</div>
            <span class="loading loading-spinner loading-xl"></span>
          {/if}
        </Sidebar.Inset>
      {:else}
        <main class="compact-inset" aria-label={m["sim.tabletop.aria"]({})}>
          {#if boardSnapshot}
            <TabletopBoard
              {layoutMode}
              {compactActionCount}
              pendingEffectsPopoverItems={sidebar.pendingEffectsPopoverItems}
              activePlayerGuidance={sidebar.activePlayerGuidance}
              scryResolutionOpen={sidebar.isScryResolutionOpen}
              scryResolutionEffect={sidebar.activeScryResolution}
              onOpenCompactPanels={openCompactPanels}
              onCloseScryResolution={sidebar.closeScryResolution}
              onConfirmScryResolution={sidebar.handleConfirmScryResolution}
            />
          {:else}
            <div class="loading">{m["sim.tabletop.loading"]({})}</div>
            <span class="loading loading-spinner loading-xl"></span>
          {/if}
        </main>
      {/if}

    {#if pendingMoveError}
      <Dialog.Root bind:open={sidebar.showRawErrorDialog}>
        <Dialog.Portal>
          <Dialog.Overlay class="raw-error-overlay" />
          <Dialog.Content class="raw-error-dialog" showCloseButton={false}>
            <Dialog.Title class="raw-error-title">
              {m["sim.errorPanel.rawTitle"]({})}
            </Dialog.Title>
            <Dialog.Description class="raw-error-description">
              {m["sim.errorPanel.rawDescription"]({})}
            </Dialog.Description>

            <pre class="raw-error-payload">{sidebar.formatRawMoveError(pendingMoveError)}</pre>

            <Dialog.Footer class="raw-error-footer">
              <Dialog.Close class="raw-error-close">
                {m["sim.errorPanel.close"]({})}
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    {/if}

      <CardInspectSheet/>
      <GlobalCardPreview/>
      {#if isCompactLayout}
        <LorcanaCompactPanels bind:open={compactPanelsOpen} bind:activeTab={compactPanelsTab} />
      {/if}
    </div>
  </Sidebar.Provider>
</DragDropProvider>

<style>
  :global([data-slot="sidebar-wrapper"]) {
    min-height: 100vh !important;
    height: 100vh !important;
  }

  .simulator-v2 {
    --bg: #070f1b;
    --text-primary: #e5edf7;

    height: 100vh;
    max-height: 100vh;
    width: 100%;
    display: flex;
    background:
      radial-gradient(circle at 10% -5%, rgba(40, 74, 115, 0.5), transparent 55%),
      radial-gradient(circle at 95% 0%, rgba(32, 78, 70, 0.22), transparent 60%),
      var(--bg);
    font-family: "Trebuchet MS", "Segoe UI", sans-serif;
    overflow: hidden;
  }

  .loading {
    display: grid;
    place-items: center;
    height: 100%;
    color: #cbd9ea;
    font-size: 0.95rem;
  }

  :global([data-sidebar="trigger"]) {
    color: var(--text-primary) !important;
    background: rgba(17, 31, 50, 0.88) !important;
    border: 1px solid rgba(108, 145, 192, 0.28) !important;
  }

  :global([data-sidebar="trigger"]:hover) {
    background: rgba(25, 47, 76, 0.95) !important;
  }

  :global([data-slot="sidebar-inset"]) {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: transparent !important;
  }

  .compact-inset {
    flex: 1;
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 0.35rem;
    padding-bottom: calc(0.35rem + env(safe-area-inset-bottom));
    overflow: hidden;
  }

  @media (max-width: 767px) {
    .compact-inset {
      margin: 0;
      padding: 0;
    }
  }

  :global(.raw-error-overlay) {
    background: rgba(3, 7, 18, 0.76);
    backdrop-filter: blur(6px);
  }

  :global(.raw-error-dialog) {
    max-width: min(42rem, calc(100vw - 2rem));
    background: linear-gradient(180deg, rgba(10, 18, 31, 0.98), rgba(7, 15, 27, 0.98));
    border-color: rgba(108, 145, 192, 0.28);
    color: #e5edf7;
  }

  :global(.raw-error-title) {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }

  :global(.raw-error-description) {
    margin-top: -0.5rem;
    color: rgba(203, 217, 234, 0.8);
  }

  .raw-error-payload {
    margin: 0;
    max-height: min(24rem, 55vh);
    overflow: auto;
    border-radius: 12px;
    border: 1px solid rgba(108, 145, 192, 0.18);
    background: rgba(2, 6, 23, 0.92);
    padding: 0.9rem;
    font-size: 0.78rem;
    line-height: 1.55;
    color: #dbeafe;
    white-space: pre-wrap;
    word-break: break-word;
  }

  :global(.raw-error-footer) {
    margin-top: 0.25rem;
  }

  :global(.raw-error-close) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: 1px solid rgba(108, 145, 192, 0.28);
    background: rgba(17, 31, 50, 0.72);
    padding: 0.55rem 0.9rem;
    color: #e5edf7;
    font-size: 0.88rem;
    transition:
      background 160ms ease,
      border-color 160ms ease;
  }

  :global(.raw-error-close:hover) {
    background: rgba(25, 47, 76, 0.9);
    border-color: rgba(108, 145, 192, 0.4);
  }

</style>
