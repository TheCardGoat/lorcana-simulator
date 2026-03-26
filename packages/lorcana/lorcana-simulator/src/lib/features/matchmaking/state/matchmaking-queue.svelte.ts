import { goto } from "$app/navigation";
import {
  joinMatchmakingQueue,
  leaveMatchmakingQueue,
  getMatchmakingStatus,
  type MatchmakingJoinParams,
} from "../api/matchmaking-api.js";

export type MatchmakingStatus = "idle" | "checking" | "queued" | "match_found" | "blocked";

export class MatchmakingQueueStore {
  status: MatchmakingStatus = $state("idle");
  queuedAt: number | null = $state(null);
  expiresAt: number | null = $state(null);
  /** Milliseconds until the queue entry expires. Updated each second. */
  timeRemainingMs: number = $state(0);
  /** Current position in queue (1-based). */
  position: number | null = $state(null);
  matchId: string | null = $state(null);
  gameId: string | null = $state(null);
  blockReason: string | null = $state(null);
  error: string | null = $state(null);

  private timerInterval: ReturnType<typeof setInterval> | null = null;

  /**
   * Check current queue status on mount (rejoin detection).
   * If the player is already in the queue, restores queued state with correct timer.
   */
  async checkStatus(): Promise<void> {
    this.status = "checking";
    try {
      const result = await getMatchmakingStatus();
      if (result.queued && result.entry) {
        this.queuedAt = result.entry.queuedAt;
        this.expiresAt = result.entry.expiresAt;
        this.position = result.position ?? null;
        this.status = "queued";
        this.startTimer();
      } else {
        this.status = "idle";
      }
    } catch {
      // Non-fatal — user may not be authenticated or network unavailable
      this.status = "idle";
    }
  }

  /**
   * Join the matchmaking queue.
   */
  async join(params: MatchmakingJoinParams): Promise<void> {
    this.error = null;
    try {
      const entry = await joinMatchmakingQueue(params);
      this.queuedAt = entry.queuedAt;
      this.expiresAt = entry.expiresAt;
      this.status = "queued";
      this.startTimer();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to join queue";
      if (message.toLowerCase().includes("active match")) {
        this.status = "blocked";
        this.blockReason = message;
      } else {
        this.error = message;
      }
    }
  }

  /**
   * Leave the matchmaking queue.
   */
  async leave(): Promise<void> {
    try {
      await leaveMatchmakingQueue();
    } catch {
      // Ignore — may already be dequeued
    } finally {
      this.reset();
    }
  }

  /**
   * Handle an incoming match_found WebSocket message.
   * Sets state to match_found and redirects to the game.
   */
  handleMatchFound(msg: {
    matchId: string;
    gameId: string;
    opponentDisplayName?: string;
    format: string;
    mode: string;
  }): void {
    this.matchId = msg.matchId;
    this.gameId = msg.gameId;
    this.status = "match_found";
    this.stopTimer();
    void goto(`/match/${msg.gameId}`);
  }

  /**
   * Handle an incoming matchmaking_status WebSocket message (response to poll).
   */
  handleStatusUpdate(msg: {
    queued: boolean;
    queuedAt?: number;
    expiresAt?: number;
    position?: number;
  }): void {
    if (!msg.queued) {
      if (this.status === "queued") {
        this.reset();
      }
      return;
    }

    if (msg.queuedAt !== undefined) this.queuedAt = msg.queuedAt;
    if (msg.expiresAt !== undefined) this.expiresAt = msg.expiresAt;
    if (msg.position !== undefined) this.position = msg.position;

    if (this.status !== "queued") {
      this.status = "queued";
      this.startTimer();
    }
  }

  /**
   * Handle an incoming matchmaking_cancelled WebSocket message.
   */
  handleCancelled(reason: "timeout" | "manual"): void {
    this.reset();
    if (reason === "timeout") {
      this.error = "Matchmaking timed out. Please try again.";
    }
  }

  destroy(): void {
    this.stopTimer();
  }

  private startTimer(): void {
    this.stopTimer();
    this.updateTimeRemaining();
    this.timerInterval = setInterval(() => {
      this.updateTimeRemaining();
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private updateTimeRemaining(): void {
    if (this.expiresAt === null) {
      this.timeRemainingMs = 0;
      return;
    }
    const remaining = this.expiresAt - Date.now();
    this.timeRemainingMs = Math.max(0, remaining);

    if (remaining <= 0 && this.status === "queued") {
      this.reset();
    }
  }

  private reset(): void {
    this.status = "idle";
    this.queuedAt = null;
    this.expiresAt = null;
    this.timeRemainingMs = 0;
    this.position = null;
    this.matchId = null;
    this.gameId = null;
    this.blockReason = null;
    this.error = null;
    this.stopTimer();
  }
}
