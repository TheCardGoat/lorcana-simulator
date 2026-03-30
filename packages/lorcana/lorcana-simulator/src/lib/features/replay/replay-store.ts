/**
 * Replay IndexedDB Store
 *
 * Persists compressed replay blobs locally with a 14-day TTL.
 * Expired entries are purged lazily on each save.
 */

const DB_NAME = "lorcana-replays";
const DB_VERSION = 1;
const STORE_NAME = "replays";
const TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 days

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SavedReplay {
  gameId: string;
  matchId: string;
  savedAt: number;
  expiresAt: number;
  playerIds: [string, string];
  totalMoves: number;
  totalTurns: number;
  winnerId?: string;
  createdAt: string;
  completedAt: string;
  sizeBytes: number;
  /** Gzipped PersistedReplayData blob */
  data: ArrayBuffer;
}

export type SavedReplayMeta = Omit<SavedReplay, "data">;

// ---------------------------------------------------------------------------
// Database
// ---------------------------------------------------------------------------

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "gameId" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function txStore(db: IDBDatabase, mode: IDBTransactionMode): IDBObjectStore {
  return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function isReplayStoreAvailable(): boolean {
  return typeof indexedDB !== "undefined";
}

/**
 * Save a replay to IndexedDB. Purges expired entries first.
 */
export async function saveReplay(replay: SavedReplay): Promise<void> {
  const db = await openDb();
  try {
    await purgeExpiredReplays(db);
    const store = txStore(db, "readwrite");
    await requestToPromise(store.put(replay));
  } finally {
    db.close();
  }
}

/**
 * List all non-expired saved replays (metadata only, no blob).
 */
export async function listSavedReplays(): Promise<SavedReplayMeta[]> {
  const db = await openDb();
  try {
    const store = txStore(db, "readonly");
    const all = (await requestToPromise(store.getAll())) as SavedReplay[];
    const now = Date.now();
    return all
      .filter((entry) => entry.expiresAt > now)
      .sort((a, b) => b.savedAt - a.savedAt)
      .map(({ data: _data, ...meta }) => meta);
  } finally {
    db.close();
  }
}

/**
 * Check if a replay is already saved.
 */
export async function isReplaySaved(gameId: string): Promise<boolean> {
  const db = await openDb();
  try {
    const store = txStore(db, "readonly");
    const entry = (await requestToPromise(store.get(gameId))) as SavedReplay | undefined;
    return !!entry && entry.expiresAt > Date.now();
  } finally {
    db.close();
  }
}

/**
 * Load the compressed replay blob for a game.
 */
export async function loadReplayData(gameId: string): Promise<ArrayBuffer | null> {
  const db = await openDb();
  try {
    const store = txStore(db, "readonly");
    const entry = (await requestToPromise(store.get(gameId))) as SavedReplay | undefined;
    if (!entry || entry.expiresAt <= Date.now()) {
      return null;
    }
    return entry.data;
  } finally {
    db.close();
  }
}

/**
 * Delete a single saved replay.
 */
export async function deleteReplay(gameId: string): Promise<void> {
  const db = await openDb();
  try {
    const store = txStore(db, "readwrite");
    await requestToPromise(store.delete(gameId));
  } finally {
    db.close();
  }
}

/**
 * Purge all expired entries. Returns the number of entries deleted.
 */
export async function purgeExpiredReplays(existingDb?: IDBDatabase): Promise<number> {
  const db = existingDb ?? (await openDb());
  const shouldClose = !existingDb;
  try {
    const store = txStore(db, "readwrite");
    const all = (await requestToPromise(store.getAll())) as SavedReplay[];
    const now = Date.now();
    const expired = all.filter((entry) => entry.expiresAt <= now);
    for (const entry of expired) {
      await requestToPromise(store.delete(entry.gameId));
    }
    return expired.length;
  } finally {
    if (shouldClose) {
      db.close();
    }
  }
}

// ---------------------------------------------------------------------------
// High-level: fetch from API and save
// ---------------------------------------------------------------------------

/**
 * Fetch replay from the API and save it to IndexedDB.
 */
export async function saveReplayFromApi(
  gameId: string,
  fetchBlob: (gameId: string) => Promise<ArrayBuffer>,
  decompressBlob: (compressed: ArrayBuffer) => Promise<{
    gameId: string;
    matchId: string;
    playerIds: [string, string];
    metadata: {
      totalMoves: number;
      totalTurns: number;
      createdAt: string;
      completedAt: string;
      winnerId?: string;
    };
  }>,
): Promise<void> {
  const compressed = await fetchBlob(gameId);
  const data = await decompressBlob(compressed);

  await saveReplay({
    gameId: data.gameId,
    matchId: data.matchId,
    savedAt: Date.now(),
    expiresAt: Date.now() + TTL_MS,
    playerIds: data.playerIds,
    totalMoves: data.metadata.totalMoves,
    totalTurns: data.metadata.totalTurns,
    winnerId: data.metadata.winnerId,
    createdAt: data.metadata.createdAt,
    completedAt: data.metadata.completedAt,
    sizeBytes: compressed.byteLength,
    data: compressed,
  });
}
