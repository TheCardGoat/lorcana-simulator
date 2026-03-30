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
		/** Visual presentation variant for timer chrome */
		variant?: "inline" | "rail";
		/** Optional visible label for rail presentation */
		label?: string;
	}

	let {
		reserveMsRemaining,
		isActive = false,
		isRunning = false,
		startedAtMs,
		timeoutCount = 0,
		isInNegativeTime = false,
		variant = "inline",
		label = "Clock",
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
	class:player-timer--rail={variant === "rail"}
	role="timer"
	aria-label="Player time remaining: {formattedTime}"
>
	{#if variant === "rail"}
		<span class="timer-label">{label}</span>
	{/if}
	<div class="timer-main">
		<span class="timer-value">{formattedTime}</span>
		{#if timeoutCount > 0}
			<span class="timeout-badge" title="Timeouts: {timeoutCount}">
				{timeoutCount}
			</span>
		{/if}
	</div>
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
			border-color 200ms ease,
			box-shadow 200ms ease;
	}

	.player-timer--active {
		border-color: rgba(59, 130, 246, 0.5);
		background: rgba(15, 23, 42, 0.9);
	}

	.player-timer--rail {
		width: 100%;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.2rem;
		padding: 0.55rem 0.7rem;
		border-radius: 0.85rem;
		border-color: rgba(125, 211, 252, 0.18);
		background:
			linear-gradient(180deg, rgba(10, 20, 36, 0.96), rgba(8, 15, 27, 0.96));
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.05),
			0 12px 28px rgba(2, 6, 23, 0.28);
	}

	.player-timer--rail.player-timer--active {
		border-color: rgba(125, 211, 252, 0.4);
		box-shadow:
			0 0 0 1px rgba(56, 189, 248, 0.18),
			0 16px 32px rgba(2, 6, 23, 0.34),
			inset 0 1px 0 rgba(255, 255, 255, 0.06);
	}

	.timer-label {
		font-size: 0.64rem;
		font-weight: 800;
		line-height: 1;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(186, 230, 253, 0.72);
	}

	.timer-main {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.timer-value {
		font-size: 0.82rem;
		font-weight: 700;
		color: #e2e8f0;
		line-height: 1;
	}

	.player-timer--rail .timer-value {
		font-size: 1.1rem;
		font-weight: 800;
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
