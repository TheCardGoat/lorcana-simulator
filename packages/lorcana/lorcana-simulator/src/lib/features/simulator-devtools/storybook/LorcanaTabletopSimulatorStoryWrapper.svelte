<script lang="ts">
import {
	LorcanaTabletopSimulator,
	type LorcanaPlayerSettingsMap,
	type LorcanaSimulatorReadModel,
	type LorcanaSimulatorView,
	type SimulatorDebugAnimationRequest,
} from "$lib";
import {getLorcanaFixture} from "@/features/simulator-devtools/fixtures";
import {LorcanaMultiplayerSimulatorAdapter} from "@/features/simulator-devtools/harness";
import { getLocale, setLocale } from "$lib/paraglide/runtime";

import LorcanaDebugControls from "./LorcanaDebugControls.svelte";

import type {LorcanaSimulatorFixture} from "@/features/simulator/model/contracts";
import type {LorcanaSimulatorLocale} from "@/features/simulator/model/contracts";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";

interface StoryWrapperProps {
	fixture?: LorcanaSimulatorFixture;
	fixtureId: string;
	initialView: LorcanaSimulatorView;
	locale?: LorcanaSimulatorLocale;
	frameWidth?: string;
	frameHeight?: string;
	onFixtureChange?: (fixtureId: string) => void;
}

const PLAYER_LOCALE_STORAGE_KEY = "lorcana.simulator.playerLocale";
const TEST_PLAYER_ONE_CARD_BACK_URL =
	"https://r2.tcg.online/public/lorcana/simulator/card-back/back-cosmos.webp";
const TEST_PLAYER_TWO_CARD_BACK_URL =
	"https://r2.tcg.online/public/lorcana/simulator/card-back/back-yellow.webp";
// const TEST_PLAYER_ONE_PLAYMAT_URL =
// 	"https://r2.tcg.online/public/lorcana/simulator/playmats/005.webp";
// const TEST_PLAYER_TWO_PLAYMAT_URL =
// 	"https://r2.tcg.online/public/lorcana/simulator/playmats/pooh-001.webp";

let {
	fixtureId,
	fixture: fixtureProp,
	initialView,
	locale: storyLocale = "en",
	frameWidth = "100%",
	frameHeight = "100vh",
	onFixtureChange,
}: StoryWrapperProps = $props();

let wrapperElement = $state<HTMLDivElement | null>(null);
let serializedState = $state<string>("No state available.");
let serializedBoardProjection = $state<string>("No board projection available.");
let currentViewOverride = $state<LorcanaSimulatorView | null>(null);
let debugStateId = $state<number | null>(null);
let currentView = $derived(currentViewOverride ?? initialView);

$effect.pre(() => {
	if (getLocale() !== storyLocale) {
		setLocale(storyLocale, { reload: false });
	}

	if (typeof localStorage !== "undefined") {
		localStorage.setItem(PLAYER_LOCALE_STORAGE_KEY, storyLocale);
	}
});

let fixture = $derived<LorcanaSimulatorFixture>(fixtureProp || getLorcanaFixture(fixtureId));
let testEngine = $derived.by<LorcanaMultiplayerTestEngine>(() => {
	return LorcanaMultiplayerTestEngine.createWithFixture(
		fixture.playerOne,
		fixture.playerTwo,
		{
			seed: fixture.seed ?? "simulator-default",
			skipPreGame: fixture.skipPreGame ?? true,
			validateSync: false,
			debugServerCommunication: true,
		},
	);
});

let engine = $derived.by(() => {
	if (currentView === "spectator") {
		return testEngine.asServer();
	}

	if (currentView === "playerOne") {
		return testEngine.asPlayerOne();
	}

	if (currentView === "playerTwo") {
		return testEngine.asPlayerTwo();
	}

	return testEngine.asServer();
});

let readModel = $derived.by<Pick<LorcanaSimulatorReadModel, "getMoveLog">>(() => {
	const adapter = new LorcanaMultiplayerSimulatorAdapter(testEngine);
	return {
		getMoveLog: (limit?: number) => adapter.getMoveLog(limit, currentView),
	};
});

let playerSettings = $derived.by<LorcanaPlayerSettingsMap>(() => {
	const [playerOneId, playerTwoId] = testEngine.getBoard(currentView).playerOrder.map(String);

	return {
		[playerOneId]: {
			cardBack: TEST_PLAYER_ONE_CARD_BACK_URL,
			// playmat: TEST_PLAYER_ONE_PLAYMAT_URL,
		},
		[playerTwoId]: {
			cardBack: TEST_PLAYER_TWO_CARD_BACK_URL,
			// playmat: TEST_PLAYER_TWO_PLAYMAT_URL,
		},
	};
});

function refreshDebugPayloads(): void {
	debugStateId = testEngine.getStateID();
	serializedState = JSON.stringify(testEngine.getAuthoritativeState(), null, 2);
	serializedBoardProjection = JSON.stringify(testEngine.getBoard(currentView), null, 2);
}

$effect(() => {
	const activeFixtureId = fixtureId;
	const activeView = currentView;

	refreshDebugPayloads();

	const playerOneEngine = testEngine.getClientEngine("playerOne");
	const playerTwoEngine = testEngine.getClientEngine("playerTwo");

	const unsubscribePlayerOne = playerOneEngine?.engine.onStateUpdate(() => {
			refreshDebugPayloads();
		}) ?? (() => {});
	const unsubscribePlayerTwo = playerTwoEngine?.engine.onStateUpdate(() => {
			refreshDebugPayloads();
		}) ?? (() => {});

	return () => {
		void activeFixtureId;
		void activeView;
		unsubscribePlayerOne();
		unsubscribePlayerTwo();
	};
});

function setCurrentView(nextView: LorcanaSimulatorView): void {
	if (currentView === nextView) {
		return;
	}

	currentViewOverride = nextView;
}

function swapPlayers(): void {
	const nextView = currentView === "playerTwo" ? "playerOne" : "playerTwo";
	setCurrentView(nextView);
}

function resetToInitialFixture(): void {
	currentViewOverride = null;
}

function runAnimation(animation: SimulatorDebugAnimationRequest): boolean {
	return false;
}

</script>

<div
	class="story-wrapper dark"
	style={`--story-frame-width: ${frameWidth}; --story-frame-height: ${frameHeight};`}
	bind:this={wrapperElement}
>
	{#if engine}
		<LorcanaTabletopSimulator {engine} {readModel} {playerSettings}/>

			<LorcanaDebugControls
					{wrapperElement}
					{fixtureId}
					view={currentView}
					stateId={debugStateId}
					{serializedState}
					{serializedBoardProjection}
					onViewChange={setCurrentView}
					{onFixtureChange}
					onSwapPlayers={swapPlayers}
					onReset={resetToInitialFixture}
				onRefresh={() => {}}
				onRunAnimation={runAnimation}
		/>
	{:else}
		<p class="loading">Loading...</p>
	{/if}
</div>

<style>
	.story-wrapper {
		position: relative;
		width: min(100%, var(--story-frame-width, 100%));
		height: var(--story-frame-height, 100vh);
		max-width: 100%;
		margin: 0 auto;
		overflow: hidden;
		padding: 0 !important;
	}

	.loading {
		margin: 0;
		height: 100%;
		display: grid;
		place-items: center;
		color: #d4e2f3;
		font-family: "Trebuchet MS", "Segoe UI", sans-serif;
	}
</style>
