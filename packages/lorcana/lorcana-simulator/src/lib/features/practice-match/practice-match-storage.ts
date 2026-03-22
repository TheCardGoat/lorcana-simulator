import type { PracticeMatchSession } from "./types.js";

const STORAGE_KEY = "lorcana.simulator.practiceMatch.session";

export function savePracticeSession(session: PracticeMatchSession): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

export function loadPracticeSession(gameId: string): PracticeMatchSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as PracticeMatchSession;
    if (session.gameId !== gameId) return null;
    return session;
  } catch {
    return null;
  }
}

export function clearPracticeSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently ignore
  }
}
