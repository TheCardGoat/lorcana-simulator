# Backend spec — Ranked status endpoint for `/matchmaking`

## Goal

The matchmaking lobby needs to display a player's MMR per queue format when they queue for a ranked match, but **only after they've completed 20 placement matches in the current season** for that format. Formats are tracked independently (`core-constructed`, `infinity`).

The client contract is already defined: `packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/api/ranked-status-api.ts`. This document describes what the backend needs to build to satisfy it.

## Endpoint to implement

### `GET /v1/match-history/players/me/ranked-status`

**Auth:** same as other `/match-history/players/me/*` endpoints (authenticated player, scoped to caller).

**Response shape (200):**

```ts
{
  object: "ranked_status",
  seasonId: string,            // e.g. "season-2026-q2"
  seasonStartsAt: string,      // ISO-8601
  seasonEndsAt: string,        // ISO-8601
  formats: {
    "core-constructed": {
      placementsCompleted: number,   // 0..placementsRequired
      placementsRequired: number,    // 20 for now, but configurable server-side
      mmr: number | null,            // null until placementsCompleted >= placementsRequired
      highestMmr: number | null,     // same gating as mmr
      bracket: string | null         // same gating as mmr
    },
    "infinity": {
      placementsCompleted: number,
      placementsRequired: number,
      mmr: number | null,
      highestMmr: number | null,
      bracket: string | null
    }
  }
}
```

Both format keys MUST always be present, even if the player has never queued in that format (return zeroed counters and `null` MMR fields).

## Business rules the backend must enforce

### 1. Per-format tracking

MMR, highest MMR, bracket, and placement counters are tracked **independently per format**. A player can be placed in `core-constructed` and unplaced in `infinity` simultaneously.

### 2. Placement counter definition

`placementsCompleted` counts **completed ranked matches in the current season for that format**, summed across modes (BO1 + BO3).

Rules:

- Only `matchType === "ranked"` counts. Casual and testing matches are excluded.
- Both BO1 and BO3 ranked matches count toward the same per-format counter.
- A match counts when it reaches a terminal state with a recorded result (win / loss / draw).
- Disconnect / forfeit / abandoned matches: **count them as completed** if the engine records a result for the disconnecting player. Do not count matches that ended in a no-contest with no result recorded. Confirm this matches the existing match-history "completed match" definition.

### 3. Season scoping

- `placementsCompleted` resets to 0 at every season rollover.
- `mmr`, `highestMmr`, and `bracket` are **season-scoped** values. At rollover, players must re-complete placements before MMR is revealed again, even if they were placed in the prior season.
- `seasonId` / `seasonStartsAt` / `seasonEndsAt` reflect the **currently active** season at request time.

### 4. MMR gating (server-enforced)

The backend MUST return `mmr: null`, `highestMmr: null`, `bracket: null` whenever `placementsCompleted < placementsRequired` for that format. The client will not perform this gate — the raw value must never leave the server pre-placement.

After the threshold is reached, return the live values and keep returning them for the rest of the season (even if the player stops playing).

### 5. `placementsRequired` is configurable

Hardcode `20` initially but expose it as a server-side config value. The client reads it from the response so we can tune the threshold without a client release.

## Edge cases — expected behavior

| Scenario                                                          | Response                                                                           |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Brand-new account, never queued                                   | Both formats: `placementsCompleted: 0`, all MMR fields `null`                      |
| 12 / 20 placements done in `core-constructed`, none in `infinity` | core-constructed: `placementsCompleted: 12`, `mmr: null`. infinity: zeros + nulls. |
| Just completed 20th placement                                     | `placementsCompleted: 20`, `mmr: <number>`, `bracket: <string>`                    |
| Placed last season, not yet this season                           | `placementsCompleted: 0..19`, `mmr: null` (no carry-over)                          |
| Mid-match (queued but match not yet terminal)                     | Match is not counted until terminal state                                          |

## Non-goals (do not implement now)

- No provisional / hidden MMR exposed to the client during placements. Just the counter.
- No per-mode (BO1 vs BO3) breakdown of placement counts in the response. Aggregate only.
- No historical season data on this endpoint — current season only.

## Performance / caching

This is hit on every `/matchmaking` page load (server-side loader, fan-out with 4 other calls). Aim for response time consistent with `/play/matchmaking/dashboard`. Cache server-side if needed; the client does not cache.

## Open question for backend

Would you prefer to **fold this into the existing `/v1/games/lorcana/play/matchmaking/dashboard` response** as a `rankedStatus` field instead of a separate endpoint? That would save one round-trip from the route loader. We're happy either way — the TypeScript shape above can move into the dashboard response unchanged. Let us know your preference and we'll adjust the client.

## Reference — client files

- Contract: `packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/api/ranked-status-api.ts`
- Format union (`"core-constructed" | "infinity"`): `packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/api/queue-stats-api.ts:4`
- Route loader that will consume this: `packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/server/load-matchmaking-data.ts`
