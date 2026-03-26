export interface StateScopedValueCacheStats {
  stateID: number | null;
  hits: number;
  misses: number;
  buildTimeMs: number;
}

export interface StateScopedValueCache<TValue> {
  currentStateID: number | null;
  actorBuckets: Map<string, Map<string, TValue>>;
  stats: StateScopedValueCacheStats;
}

const DEFAULT_ACTOR_KEY = "__system__";
const DEBUG_PERF_FLAG = "__TCG_DEBUG_PERFORMANCE__";

function nowMs(): number {
  return typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();
}

function debugPerfEnabled(): boolean {
  return (globalThis as Record<string, unknown>)[DEBUG_PERF_FLAG] === true;
}

function flushDebugStats(cache: StateScopedValueCache<unknown>, label: string): void {
  if (!debugPerfEnabled() || cache.stats.stateID === null) {
    return;
  }
  if (cache.stats.hits === 0 && cache.stats.misses === 0) {
    return;
  }

  console.info(`[engine][perf] ${label}`, {
    stateID: cache.stats.stateID,
    hits: cache.stats.hits,
    misses: cache.stats.misses,
    buildTimeMs: Number(cache.stats.buildTimeMs.toFixed(2)),
  });
}

export function createStateScopedValueCache<TValue>(): StateScopedValueCache<TValue> {
  return {
    currentStateID: null,
    actorBuckets: new Map(),
    stats: {
      stateID: null,
      hits: 0,
      misses: 0,
      buildTimeMs: 0,
    },
  };
}

export function clearStateScopedValueCache(cache: StateScopedValueCache<unknown>): void {
  flushDebugStats(cache, "runtime-card-derived-cache");
  cache.currentStateID = null;
  cache.actorBuckets.clear();
  cache.stats = {
    stateID: null,
    hits: 0,
    misses: 0,
    buildTimeMs: 0,
  };
}

export function getStateScopedValueCacheStats(
  cache: StateScopedValueCache<unknown>,
): StateScopedValueCacheStats {
  return {
    stateID: cache.stats.stateID,
    hits: cache.stats.hits,
    misses: cache.stats.misses,
    buildTimeMs: cache.stats.buildTimeMs,
  };
}

export function getOrBuildStateScopedValue<TValue>(args: {
  cache: StateScopedValueCache<TValue>;
  stateID: number;
  actorKey?: string;
  cardId: string;
  build: () => TValue;
}): TValue {
  const { cache, stateID, cardId, build } = args;
  const actorKey = args.actorKey ?? DEFAULT_ACTOR_KEY;

  if (cache.currentStateID !== stateID) {
    flushDebugStats(cache, "runtime-card-derived-cache");
    cache.currentStateID = stateID;
    cache.actorBuckets.clear();
    cache.stats = {
      stateID,
      hits: 0,
      misses: 0,
      buildTimeMs: 0,
    };
  }

  let actorBucket = cache.actorBuckets.get(actorKey);
  if (!actorBucket) {
    actorBucket = new Map<string, TValue>();
    cache.actorBuckets.set(actorKey, actorBucket);
  }

  const cached = actorBucket.get(cardId);
  if (cached !== undefined) {
    cache.stats.hits += 1;
    return cached;
  }

  const startedAt = nowMs();
  const value = build();
  cache.stats.misses += 1;
  cache.stats.buildTimeMs += nowMs() - startedAt;
  actorBucket.set(cardId, value);
  return value;
}
