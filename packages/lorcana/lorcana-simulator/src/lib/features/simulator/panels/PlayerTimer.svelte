<script lang="ts">
	interface PlayerTimerProps {
		/** Remaining reserve time in ms (from last server settlement) */
		reserveMsRemaining: number;
		/** Whether this player's clock is currently running */
		isActive: boolean;
		/** Whether the clock is running (not paused) */
		isRunning: boolean;
		/** Server timestamp when clock started (for client-side interpolation) */
		startedAtMs?: number;
		/** Number of timeouts (0, 1, or 2) */
		timeoutCount?: number;
		/** Whether the player is in negative time */
		isInNegativeTime?: boolean;
	}

	let {
		reserveMsRemaining,
		isActive = false,
		isRunning = false,
		startedAtMs,
		timeoutCount = 0,
		isInNegativeTime = false,
	}: PlayerTimerProps = $props();

	let displayMs = $state(0);
	let intervalId: ReturnType<typeof setInterval> | undefined;

	// Client-side interpolation: tick every 100ms when this player's clock is running
	$effect(() => {
		// Capture reactive values for the closure
		const currentReserve = reserveMsRemaining;
		const currentStartedAt = startedAtMs;
		const shouldTick = isActive && isRunning && typeof currentStartedAt === "number";

		if (intervalId) {
			clearInterval(intervalId);
			intervalId = undefined;
		}

		if (shouldTick) {
			const tick = () => {
				const elapsed = Date.now() - currentStartedAt;
				displayMs = currentReserve - elapsed;
			};
			tick();
			intervalId = setInterval(tick, 100);
		} else {
			displayMs = currentReserve;
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = undefined;
			}
		};
	});

	const isNegative = $derived(displayMs < 0);
	const absMs = $derived(Math.abs(displayMs));
	const minutes = $derived(Math.floor(absMs / 60_000));
	const seconds = $derived(Math.floor((absMs % 60_000) / 1000));
	const formattedTime = $derived(
		`${isNegative ? "-" : ""}${minutes}:${String(seconds).padStart(2, "0")}`,
	);

	const urgencyClass = $derived.by(() => {
		if (isInNegativeTime || isNegative) return "timer--critical";
		if (displayMs < 10_000) return "timer--danger";
		if (displayMs < 30_000) return "timer--warning";
		return "";
	});
</script>

<div
	class="player-timer {urgencyClass}"
	class:player-timer--active={isActive && isRunning}
	role="timer"
	aria-label="Player time remaining: {formattedTime}"
>
	<span class="timer-value">{formattedTime}</span>
	{#if timeoutCount > 0}
		<span class="timeout-badge" title="Timeouts: {timeoutCount}">
			{timeoutCount}
		</span>
	{/if}
</div>

<style>
	.player-timer {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.1rem 0.35rem;
		border-radius: 0.25rem;
		background: rgba(15, 23, 42, 0.7);
		border: 1px solid rgba(71, 85, 105, 0.4);
		font-variant-numeric: tabular-nums;
		transition:
			background 200ms ease,
			border-color 200ms ease;
	}

	.player-timer--active {
		border-color: rgba(59, 130, 246, 0.5);
		background: rgba(15, 23, 42, 0.9);
	}

	.timer-value {
		font-size: 0.82rem;
		font-weight: 700;
		color: #e2e8f0;
		line-height: 1;
	}

	.timer--warning .timer-value {
		color: #fbbf24;
	}

	.timer--danger .timer-value {
		color: #ef4444;
	}

	.timer--critical .timer-value {
		color: #ef4444;
		animation: pulse-critical 1s ease-in-out infinite;
	}

	@keyframes pulse-critical {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.timeout-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 0.9rem;
		height: 0.9rem;
		padding: 0 0.15rem;
		border-radius: 999px;
		background: rgba(239, 68, 68, 0.8);
		font-size: 0.55rem;
		font-weight: 700;
		color: white;
		line-height: 1;
	}
</style>
