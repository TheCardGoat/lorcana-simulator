<script lang="ts">
    import type {
        LorcanaSimulatorView,
        SimulatorDebugAnimationRequest,
    } from "$lib";

    import LorcanaDebugBubble from "./LorcanaDebugBubble.svelte";
    import LorcanaDebugPanel from "./LorcanaDebugPanel.svelte";

    const DEBUG_PANEL_ID = "lorcana-debug-sidebar";

    interface DebugControlsProps {
        wrapperElement: HTMLDivElement | null;
        fixtureId: string;
        view: LorcanaSimulatorView;
        stateId: number | null;
        serializedState: string;
        serializedBoardProjection: string;
        onViewChange: (view: LorcanaSimulatorView) => void;
        onFixtureChange?: (fixtureId: string) => void;
        onSwapPlayers: () => void;
        onReset: () => void;
        onRefresh: () => void;
        onRunAnimation: (animation: SimulatorDebugAnimationRequest) => boolean;
    }

    const {
        wrapperElement,
        fixtureId,
        view,
        stateId,
        serializedState,
        serializedBoardProjection,
        onViewChange,
        onFixtureChange,
        onSwapPlayers,
        onReset,
        onRefresh,
        onRunAnimation,
    }: DebugControlsProps = $props();

    let isOpen = $state(false);

    function openPanel(): void {
        if (isOpen) {
            return;
        }

        isOpen = true;
    }

    function closePanel(): void {
        isOpen = false;
    }
</script>

<LorcanaDebugBubble
        {isOpen}
        {wrapperElement}
        onOpenPanel={openPanel}
        onSwapPlayers={onSwapPlayers}
/>

<LorcanaDebugPanel
        sidebarId={DEBUG_PANEL_ID}
        {isOpen}
        {fixtureId}
        {view}
        {stateId}
        {serializedState}
        {serializedBoardProjection}
        {onViewChange}
        {onFixtureChange}
        {onReset}
        {onRefresh}
        {onRunAnimation}
        onClose={closePanel}
/>
