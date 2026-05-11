# Backend questions — Ranked MMR display on `/matchmaking`

## Context

We want to show a player's MMR on the matchmaking lobby when they queue for a ranked match. Business rule: MMR is only revealed after the player has completed **20 placement matches this season**, tracked independently per queue format (`core-constructed` and `infinity`).

Implementation is blocked on backend clarifications before we can wire this into the route loader. This document captures what we need from the backend team so we can finalize the client plan.

## What the route loads today

Route loader: `src/routes/matchmaking/_/load-matchmaking-data.ts`

Concurrent fetches:

- `GET /v1/users/me/games/lorcana/matchmaking-context`
- `GET /v1/games/lorcana/play/matchmaking/dashboard?limit=25`
- `POST /v1/gateway/ticket`
- `GET /v1/leaderboards/lorcana/{type}`

Known but **not** called from this route:

- `GET /v1/match-history/players/me/stats` → returns a single `mmr`, `highestMmr`, `bracket` (`src/.../match-history/types.ts:33`)
- `GET /v1/match-history/players/me/mmr-history`
- `GET /v1/games/lorcana/play/matchmaking/stats` → `QueueStatsPartition[]` with `{ format, mode, matchType, placement }` (`src/.../queue-stats-api.ts:4`)

Formats in scope: `"core-constructed"` and `"infinity"` (`src/.../matchmaking-lobby.constants.ts:43`).

## Questions

### 1. Per-format MMR

`PlayerStats.mmr` on `/match-history/players/me/stats` is a single number. We need MMR per format.

- Does this endpoint already accept a `format` query param?
- If not, can it return a map keyed by format (e.g. `{ "core-constructed": { mmr, highestMmr, bracket }, "infinity": {...} }`), or should we add a new endpoint?
- Should `bracket` / `highestMmr` also become per-format?

### 2. Placement counter — definition and granularity

`QueueStatsPartition.placement` is split by `(format, mode, matchType)`.

- Is `placement` already the season-scoped count of completed ranked placement matches, or something else (e.g. queue position)?
- Should the 20-match threshold sum across `mode` (BO1 + BO3) within a format, or is it tracked per mode?
- Only `matchType: "ranked"` counts toward placements, correct? (Casual / testing excluded.)
- Are placement matches counted on disconnect / forfeit / abandoned games?

### 3. Season scoping

Nothing in the response types we see today carries a season identifier.

- Is `placement` already implicitly scoped to the current season server-side, or is it lifetime?
- Same for `mmr` on `/match-history/players/me/stats` — current season or lifetime?
- Can the responses include the active `seasonId` + season start/end so the UI can render "Season N placements: 12 / 20"?
- What happens at season rollover — reset to 0, or do players keep MMR and skip placements next season?

### 4. Preferred endpoint shape

To avoid a second fan-out from `load-matchmaking-data.ts`, ideally the dashboard response (`/play/matchmaking/dashboard`) would include per-format ranked status:

```ts
rankedStatus: {
  seasonId: string;
  formats: {
    "core-constructed": { placementsCompleted: number; placementsRequired: number; mmr: number | null; bracket: string | null };
    "infinity":         { placementsCompleted: number; placementsRequired: number; mmr: number | null; bracket: string | null };
  };
}
```

`mmr` would be `null` until `placementsCompleted >= placementsRequired`.

- Fold into dashboard response, or separate endpoint called in parallel?
- Should the backend enforce the gate (return `mmr: null` pre-placements) or return the raw number and let the client gate it? **We prefer backend-enforced** so the value can never leak before placements complete.

### 5. Edge cases

- Brand-new account: `placementsCompleted: 0`, `mmr: null`?
- Mid-placement (e.g. 12/20): do you expose a provisional/hidden MMR, or just the count?
- Player completed placements in a previous season but not this one: is `mmr` null until they re-place?

## What we need to start client work

Answers to §1, §2, §3, and a decision on §4 (existing endpoint vs new one, and where the gate is enforced).

## Tentative client plan (pending answers)

Once backend shape is confirmed:

- Add a fifth concurrent fetch (or extend dashboard) in `src/routes/matchmaking/_/load-matchmaking-data.ts` for per-format ranked status.
- In the lobby UI, render MMR when `placementsCompleted >= placementsRequired`; otherwise show `"Placements: X / 20"`.
- Reuse existing `PlayerStats` / `QueueStatsPartition` types where possible; extend rather than duplicate.
