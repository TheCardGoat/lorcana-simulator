import { fetchLiveMatches, type LiveMatchEntry } from "../api/live-matches-api.js";

export class LiveMatchesStore {
  matches = $state<LiveMatchEntry[]>([]);
  total = $state(0);
  loading = $state(false);
  error = $state<string | null>(null);
  displayLimit = $state(25);

  #intervalId: ReturnType<typeof setInterval> | null = null;

  async refresh(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const res = await fetchLiveMatches(this.displayLimit);
      this.matches = res.matches;
      this.total = res.total;
    } catch (e) {
      this.error = e instanceof Error ? e.message : "Failed to load live matches";
    } finally {
      this.loading = false;
    }
  }

  showMore(count = 25): void {
    this.displayLimit += count;
    this.refresh();
  }

  startPolling(intervalMs = 20_000): void {
    this.refresh();
    this.#intervalId = setInterval(() => this.refresh(), intervalMs);
  }

  stopPolling(): void {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  }

  destroy(): void {
    this.stopPolling();
  }
}
