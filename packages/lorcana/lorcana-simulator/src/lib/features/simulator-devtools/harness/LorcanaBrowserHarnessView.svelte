<script lang="ts">
import {
	LORCANA_SIMULATOR_VIEWS,
	LorcanaTabletopSimulator,
	type LorcanaSimulatorFixture,
	type LorcanaSimulatorReadModel,
	type LorcanaSimulatorView,
	type LorcanaZoneId,
	type SimulatorDebugAnimationPlayer,
	type SimulatorDebugAnimationRequest,
} from "$lib";
import type { LorcanaGameContext } from "@/features/simulator/context/game-context.svelte.js";
import { LorcanaMultiplayerSimulatorAdapter } from "@/features/simulator-devtools/harness";
import {
	PLAYER_ONE,
	PLAYER_TWO,
	type CanonicalPlayerId,
	type LorcanaBrowserHarness,
	type LorcanaBrowserHarnessConfig,
	type LorcanaBrowserHarnessExecuteResult,
	type LorcanaBrowserStatus,
} from "@/features/simulator-devtools/harness/browser-harness";
import { assertLorcanaSimulatorMoveId } from "@/features/simulator/model/contracts";
import { dispatchSimulatorMove } from "@/features/simulator/model/move-dispatch";
import LorcanaDebugControls from "@/features/simulator-devtools/storybook/LorcanaDebugControls.svelte";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";

interface Props {
	fixture: LorcanaSimulatorFixture;
	fixtureId?: string;
	view?: LorcanaSimulatorView;
}

const ZONE_IDS: readonly LorcanaZoneId[] = [
	"deck",
	"hand",
	"play",
	"inkwell",
	"discard",
	"limbo",
];

let { fixture, fixtureId = fixture.id, view = "playerOne" }: Props = $props();

let resetRevision = $state(0);
let wrapperElement = $state<HTMLDivElement | null>(null);
let viewOverride = $state<LorcanaSimulatorView | null>(null);
let serializedState = $state<string>("No state available.");
let serializedBoardProjection = $state<string>(
	"No board projection available.",
);
let debugStateId = $state<number | null>(null);

const currentView = $derived(
	viewOverride ?? (LORCANA_SIMULATOR_VIEWS.includes(view) ? view : "playerOne"),
);

const testEngine = $derived.by(() => {
	void resetRevision;
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

const adapter = $derived.by(
	() => new LorcanaMultiplayerSimulatorAdapter(testEngine),
);

const engine = $derived.by(() => {
	if (currentView === "spectator" || currentView === "authoritative") {
		return testEngine.asServer();
	}

	if (currentView === "playerTwo") {
		return testEngine.asPlayerTwo();
	}

	return testEngine.asPlayerOne();
});

const readModel = $derived.by<Pick<LorcanaSimulatorReadModel, "getMoveLog">>(
	() => {
		return {
			getMoveLog: (limit?: number) => adapter.getMoveLog(limit, currentView),
		};
	},
);

function resolvePlayerId(targetView: LorcanaSimulatorView): string {
	if (targetView === "playerOne") {
		return PLAYER_ONE;
	}

	if (targetView === "playerTwo") {
		return PLAYER_TWO;
	}

	const board = adapter.getBoard("authoritative");
	return (
		board.priorityPlayer ??
		board.choosingFirstPlayer ??
		board.openingTurnPlayer ??
		PLAYER_ONE
	);
}

function getZoneCount(
	boardPlayer: Record<string, unknown>,
	zoneId: LorcanaZoneId,
): number {
	const cards = boardPlayer[zoneId];
	return Array.isArray(cards) ? cards.length : 0;
}

function toCanonicalPlayerId(
	playerId: string | null | undefined,
): CanonicalPlayerId | undefined {
	if (playerId === PLAYER_ONE || playerId === PLAYER_TWO) {
		return playerId;
	}

	return undefined;
}

function getStatus(): LorcanaBrowserStatus {
	const board = adapter.getBoard("authoritative");
	const zoneCounts = Object.fromEntries(
		board.playerOrder.map((playerId) => {
			const boardPlayer = board.players[String(playerId)] ?? {};
			return [
				String(playerId),
				Object.fromEntries(
					ZONE_IDS.map((zoneId) => [
						zoneId,
						getZoneCount(boardPlayer as Record<string, unknown>, zoneId),
					]),
				),
			];
		}),
	) as LorcanaBrowserStatus["zoneCounts"];

	return {
		stateID: board.stateID,
		openingTurnPlayer: toCanonicalPlayerId(
			board.openingTurnPlayer ?? undefined,
		),
		pendingMulligan: board.pendingMulligan.flatMap((playerId) => {
			const canonicalPlayerId = toCanonicalPlayerId(playerId);
			return canonicalPlayerId ? [canonicalPlayerId] : [];
		}),
		priorityPlayer: toCanonicalPlayerId(board.priorityPlayer ?? undefined),
		choosingFirstPlayer: toCanonicalPlayerId(
			board.choosingFirstPlayer ?? undefined,
		),
		phase: board.phase,
		gameSegment: board.gameSegment,
		turnNumber: board.turnNumber,
		zoneCounts,
	};
}

function getConfig(): LorcanaBrowserHarnessConfig {
	return {
		fixtureId,
		view: currentView,
	};
}

function swapPlayers(): void {
	viewOverride = currentView === "playerTwo" ? "playerOne" : "playerTwo";
}

function setCurrentView(nextView: LorcanaSimulatorView): void {
	if (currentView === nextView) {
		return;
	}
	viewOverride = nextView;
}

function refreshDebugPayloads(): void {
	debugStateId = testEngine.getStateID();
	serializedState = JSON.stringify(testEngine.getAuthoritativeState(), null, 2);
	serializedBoardProjection = JSON.stringify(
		testEngine.getBoard(currentView),
		null,
		2,
	);
}

function resetToInitialFixture(): void {
	viewOverride = null;
	resetRevision += 1;
}

async function reset(): Promise<void> {
	resetRevision += 1;
}

async function execute(
	targetView: LorcanaSimulatorView,
	moveId: string,
	params: Record<string, unknown> = {},
): Promise<LorcanaBrowserHarnessExecuteResult> {
	const normalizedMoveId = assertLorcanaSimulatorMoveId(moveId);
	const result = dispatchSimulatorMove(
		testEngine.getEngineForView(targetView),
		resolvePlayerId(targetView),
		normalizedMoveId,
		params as never,
	);

	return {
		success: result.success,
		reason: result.success ? undefined : result.error,
		code: result.success ? undefined : result.errorCode,
	};
}

async function getBoard(targetView: LorcanaSimulatorView) {
	return adapter.getBoard(targetView);
}

let gameContextRef = $state<LorcanaGameContext | null>(null);

async function runAnimation(): Promise<boolean> {
	return false;
}

function handleRunAnimation(
	animation: SimulatorDebugAnimationRequest,
): boolean {
	if (!gameContextRef) {
		return false;
	}
	return gameContextRef.runAnimation(animation);
}

function handleRunQuestAnimation(
	cardId: string,
	player: SimulatorDebugAnimationPlayer,
	loreGained: number,
): boolean {
	if (!gameContextRef) {
		return false;
	}
	const side =
		player === "player_one" ? ("playerOne" as const) : ("playerTwo" as const);
	return gameContextRef.runQuestAnimation(cardId, side, loreGained);
}

function handleRunChallengeAnimation(
	attackerId: string,
	defenderId: string,
	player: SimulatorDebugAnimationPlayer,
	preview: {
		attackerDamageDealt: number;
		defenderDamageDealt: number;
		defenderKind: "character" | "location";
		attackerWouldBeBanished: boolean;
		defenderWouldBeBanished: boolean;
	},
): boolean {
	if (!gameContextRef) {
		return false;
	}
	const side =
		player === "player_one" ? ("playerOne" as const) : ("playerTwo" as const);
	return gameContextRef.runChallengeAnimation(
		attackerId,
		defenderId,
		side,
		preview,
	);
}

const browserHarness: LorcanaBrowserHarness = {
	getConfig,
	reset,
	execute,
	getBoard,
	getStatus: async () => getStatus(),
	runAnimation,
};

$effect(() => {
	refreshDebugPayloads();

	const playerOneEngine = testEngine.getClientEngine("playerOne");
	const playerTwoEngine = testEngine.getClientEngine("playerTwo");

	const unsubscribePlayerOne =
		playerOneEngine?.engine.onStateUpdate(() => {
			refreshDebugPayloads();
		}) ?? (() => {});
	const unsubscribePlayerTwo =
		playerTwoEngine?.engine.onStateUpdate(() => {
			refreshDebugPayloads();
		}) ?? (() => {});

	return () => {
		unsubscribePlayerOne();
		unsubscribePlayerTwo();
	};
});

$effect(() => {
	window.__lorcanaTestHarness = browserHarness;

	return () => {
		if (window.__lorcanaTestHarness === browserHarness) {
			delete window.__lorcanaTestHarness;
		}
	};
});
</script>

<div
	data-testid="lorcana-test-harness"
	class="relative h-full w-full"
	bind:this={wrapperElement}
>
  <LorcanaTabletopSimulator {engine} {readModel} bind:gameContext={gameContextRef} />

  <LorcanaDebugControls
    {wrapperElement}
    {fixtureId}
    view={currentView}
    stateId={debugStateId}
    {serializedState}
    {serializedBoardProjection}
    onViewChange={setCurrentView}
    onSwapPlayers={swapPlayers}
    onReset={resetToInitialFixture}
    onRefresh={refreshDebugPayloads}
    onRunAnimation={handleRunAnimation}
    onRunQuestAnimation={handleRunQuestAnimation}
    onRunChallengeAnimation={handleRunChallengeAnimation}
  />
</div>
