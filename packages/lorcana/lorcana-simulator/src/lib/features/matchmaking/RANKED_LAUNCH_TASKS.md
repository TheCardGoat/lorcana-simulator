# Ranked Matchmaking — Task Breakdown

**Source:** [`RANKED_LAUNCH_SPEC.md`](./RANKED_LAUNCH_SPEC.md)
**Format:** Each row is one importable task. Fields: `ID`, `Title`, `Spec ref`,
`Tier`, `Lane`, `Depends on`, `Estimate`, `Notes`.

**Lanes:** `FE` (frontend / SvelteKit), `BE` (backend service — out of repo),
`ART` (icons/animations), `COPY` (i18n + marketing), `OPS` (CI / observability /
launch runbooks), `QA` (test authoring).

**Tier:** `T0` must close before launch · `T1` Season 1 · `T2` Season 2+.

**Estimate:** `S` ≤ 2d · `M` ≤ 1w · `L` ≤ 2w · `XL` > 2w.

> **Important:** estimates and dependencies are tech-lead suggestions. Engineer
> assigned to each task must confirm both before sprint commit.

---

## Decisions blocking sprint planning

These are not engineering tasks but **must be answered first** by product /
leadership. Every T0 below assumes one of these answers; flipping them mid-sprint
will rework tasks.

| ID    | Decision                                                                                    | Owner       | Blocks                       |
| ----- | ------------------------------------------------------------------------------------------- | ----------- | ---------------------------- |
| DEC-1 | Soft-launch (Preseason) vs full-season launch                                               | Product     | Almost everything            |
| DEC-2 | Keep reward marketing copy + build fulfillment, OR rewrite copy to "leaderboard glory only" | Product     | RANK-301, RANK-302, RANK-303 |
| DEC-3 | Tier ladder names + division count + art brief                                              | Product+Art | RANK-110, RANK-111           |
| DEC-4 | Hidden-MMR posture: hide entirely / dual-display / keep MMR-as-rank                         | Product     | RANK-201, RANK-411           |
| DEC-5 | Single global queue vs region split                                                         | Product+BE  | RANK-202                     |

---

## Section 0 — Pre-flight

| ID       | Title                                                            | Spec | Tier | Lane | Depends on         | Est | Notes                                                                                                                                                   |
| -------- | ---------------------------------------------------------------- | ---- | ---- | ---- | ------------------ | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RANK-001 | Add `feature-flags.ts` config module reading `PUBLIC_*` env      | 0.1  | T0   | FE   | —                  | S   | Mirror pattern in [`config/public-url-config.ts`](../../config/public-url-config.ts). Export `getFeatureFlags()`.                                       |
| RANK-002 | Add per-user rollout dial to `MatchmakingContext`                | 0.1  | T0   | BE   | DEC-1              | S   | Hash userId into 0–100 bucket; field exposed by `/v1/users/me/games/lorcana/onboard`.                                                                   |
| RANK-003 | Replace hardcoded ranked early-return with flag check            | 0.1  | T0   | FE   | RANK-001, RANK-002 | S   | [`useMatchmakingLobbyController.svelte.ts:847`](ui/useMatchmakingLobbyController.svelte.ts:847). Also guard hydration of persisted `selectedMatchType`. |
| RANK-004 | Replace `rankedComingSoon` copy across 5 locales                 | 0.2  | T0   | COPY | DEC-1              | S   | Edit `messages/{en,de,es,it,pt-br}.json`; rerun paraglide build.                                                                                        |
| RANK-005 | Audit lobby content for "coming soon" mentions                   | 0.2  | T0   | COPY | RANK-004           | S   | [`content/bulletin.md`](content/bulletin.md), [`content/right-column-content.ts`](content/right-column-content.ts), `engagement.mode.ranked`.           |
| RANK-006 | Backend contract sign-off: ranked queue + rating algo            | 0.3  | T0   | BE   | —                  | S   | Confirm ranked is a separate queue, algorithm (Glicko-2 recommended), starting MMR, K-factor, draw handling, abandonment. **Get in writing.**           |
| RANK-007 | Backend contract sign-off: match payload + leaderboard freshness | 0.3  | T0   | BE   | —                  | S   | Does `state_update`/`move_accepted` `matchInfo` carry mmr/tier deltas inline, or do we refetch match-history? Drives RANK-411.                          |
| RANK-008 | Kill-switch staging validation                                   | 0.4  | T0   | QA   | RANK-003           | S   | Verify mid-queue and mid-match flag-flip cases. Add scenario to `state/matchmaking-queue.test.ts`.                                                      |
| RANK-009 | Audit analytics for `match_type` on every queue/match event      | 0.5  | T0   | FE   | —                  | S   | [`lib/analytics/types.ts`](../../analytics/types.ts). Pair with backend dashboards.                                                                     |

---

## Section 1 — Visible Progression

| ID       | Title                                                          | Spec     | Tier | Lane   | Depends on         | Est | Notes                                                                          |
| -------- | -------------------------------------------------------------- | -------- | ---- | ------ | ------------------ | --- | ------------------------------------------------------------------------------ |
| RANK-110 | Define `Tier` enum + `mmr → tier` mapping in `packages/shared` | 1.1      | T0   | FE+BE  | DEC-3              | S   | Single source of truth for FE and BE. Server still authoritative.              |
| RANK-111 | Tier icon SVG sprite + `<TierBadge>` component                 | 1.1      | T0   | ART+FE | DEC-3, RANK-110    | M   | Reused by lobby, post-game, match history, leaderboard.                        |
| RANK-112 | Extend `PlayerStats` with `tier`, `division`, `stars`          | 1.1      | T0   | BE     | RANK-110           | S   | Add to [`match-history/types.ts:33–51`](../match-history/types.ts) optionally. |
| RANK-113 | Extend `MatchSummary` with tier/star before/after fields       | 1.1, 1.2 | T0   | BE     | RANK-110           | S   | Backwards-compatible (optional).                                               |
| RANK-120 | Render star bar in queue card and post-game                    | 1.2      | T0   | FE     | RANK-111, RANK-411 | S   | Animate delta on post-game.                                                    |
| RANK-130 | Server: enforce rank floor on demotion                         | 1.3      | T0   | BE     | RANK-110           | S   | Clamp at result-write time.                                                    |
| RANK-131 | Surface `floorTier` on player profile + lobby season card      | 1.3      | T0   | FE     | RANK-130, RANK-740 | S   | "You cannot drop below Illumineer this season".                                |
| RANK-140 | Promotion-series state on player + UI dot row                  | 1.4      | T1   | BE+FE  | RANK-110           | M   | Optional — skip if star math is sufficient.                                    |
| RANK-150 | Server: win-streak +2 stars rule + UI hint                     | 1.5      | T1   | BE+FE  | RANK-110           | S   | `currentWinStreak` already plumbed. Make rule data-driven.                     |
| RANK-160 | Server: bad-luck protection (Nth-loss star reduction)          | 1.6      | T1   | BE     | RANK-110           | S   | Reuse `currentLossStreak`.                                                     |

---

## Section 2 — Calibration & Fairness

| ID       | Title                                                           | Spec | Tier | Lane   | Depends on | Est | Notes                                                                             |
| -------- | --------------------------------------------------------------- | ---- | ---- | ------ | ---------- | --- | --------------------------------------------------------------------------------- |
| RANK-210 | Placement match counter on `MatchmakingContext`                 | 2.1  | T0   | BE     | RANK-006   | S   | `placementsRemaining: number \| null`.                                            |
| RANK-211 | Placement badge in queue card + post-game                       | 2.1  | T0   | FE     | RANK-210   | S   | "Placement match 3 of 10".                                                        |
| RANK-201 | Hide MMR by default; gate behind `?debug`                       | 2.2  | T0   | FE     | DEC-4      | S   | [`MatchmakingQueueCard.svelte:728`](ui/MatchmakingQueueCard.svelte:728).          |
| RANK-220 | Glicko-2 / TrueSkill new-account uncertainty (smurf protection) | 2.3  | T1   | BE     | RANK-006   | M   | If Elo, manual K-boost for first 20 games.                                        |
| RANK-230 | Decay job for inactive top-tier players                         | 2.4  | T1   | BE     | RANK-110   | S   | Daily cron over `last_ranked_match_at`. Don't drop below floor.                   |
| RANK-231 | Decay warning on lobby season card                              | 2.4  | T1   | FE     | RANK-230   | S   | `decayWarningDaysRemaining`.                                                      |
| RANK-202 | Document region/queue-shard decision                            | 2.5  | T1   | BE+Doc | DEC-5      | S   | If single global, write it down so we don't accidentally rely on the field later. |

---

## Section 3 — Seasons & Rewards

| ID       | Title                                                                   | Spec | Tier | Lane      | Depends on | Est | Notes                                                                                                                                              |
| -------- | ----------------------------------------------------------------------- | ---- | ---- | --------- | ---------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| RANK-310 | Backend: `seasons` table + `GET /v1/seasons/{slug}` endpoint            | 3.1  | T0   | BE        | DEC-1      | M   | Schema: id, slug, startsAt, endsAt, status, rewardSchema.                                                                                          |
| RANK-311 | `Season` type in `packages/shared`                                      | 3.1  | T0   | FE        | RANK-310   | S   | Mirror server schema.                                                                                                                              |
| RANK-312 | Convert hardcoded season page to data-driven template                   | 3.1  | T0   | FE        | RANK-311   | M   | [`routes/matchmaking/(shell)/season/[seasonSlug]/+page.svelte`](<../../../routes/matchmaking/(shell)/season/>) (430 lines). Add `+page.server.ts`. |
| RANK-313 | Add season fetch to parallel `load-matchmaking-data.ts`                 | 3.1  | T0   | FE        | RANK-310   | S   | [`server/load-matchmaking-data.ts:67–85`](server/load-matchmaking-data.ts:67).                                                                     |
| RANK-320 | Season countdown widget                                                 | 3.2  | T0   | FE        | RANK-311   | S   | Reuse `engagement.deadline.daysHours` formatter.                                                                                                   |
| RANK-302 | **DECIDE-AND-EXECUTE:** rewrite season page copy to "leaderboard glory" | 3.3  | T0   | COPY      | DEC-2      | S   | Path A: 30-min copy edit, removes refunds/credibility risk.                                                                                        |
| RANK-303 | **OR:** Build reward fulfillment pipeline                               | 3.3  | T0   | BE+FE     | DEC-2      | XL  | Path B: end-of-season job, claim endpoint, inventory persistence, audit log, support tooling.                                                      |
| RANK-340 | Soft-reset visualization modal                                          | 3.4  | T1   | FE+BE     | RANK-110   | S   | One-shot modal off `seasonResetSnapshot` profile flag.                                                                                             |
| RANK-350 | End-of-season rank-reveal modal                                         | 3.5  | T1   | FE+BE+ART | RANK-340   | M   | Animation polish dominates.                                                                                                                        |
| RANK-360 | Season-end re-engagement: in-app banner + email                         | 3.6  | T1   | FE+BE     | —          | S   | **Skip web push for now (XL).**                                                                                                                    |

---

## Section 4 — Match-Flow Polish

| ID       | Title                                                 | Spec | Tier | Lane    | Depends on         | Est | Notes                                                                                                                                                 |
| -------- | ----------------------------------------------------- | ---- | ---- | ------- | ------------------ | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| RANK-410 | Build `<PostGameScreen>` component                    | 4.2  | T0   | FE      | RANK-111           | M   | New surface. Render before navigation in [`HumanVsHumanMode.svelte`](../../../routes/matches/[matchId]/games/[gameId]/modes/HumanVsHumanMode.svelte). |
| RANK-411 | Wire post-game screen to mmr/tier delta source        | 4.2  | T0   | FE      | RANK-007, RANK-410 | S   | Path 1: extend gateway `matchInfo`. Path 2: refetch `/v1/match-history?limit=1`. Decide per RANK-007.                                                 |
| RANK-412 | Tier-up celebration animation                         | 4.1  | T0   | FE+ART  | RANK-410, RANK-111 | M   | CSS+SVG; track first-of-day in localStorage to gate skippable behavior.                                                                               |
| RANK-430 | Ranked-specific surrender warning copy                | 4.3  | T0   | FE+COPY | —                  | S   | Add `…cancelforfeit.ranked` i18n key; conditional in `MatchmakingActiveMatchCard.svelte`.                                                             |
| RANK-440 | Server: dodge cooldown after accept-window timeout    | 4.4  | T1   | BE      | —                  | S   | Add 1-strike grace to avoid punishing genuine drops.                                                                                                  |
| RANK-441 | UI banner showing dodge cooldown remaining            | 4.4  | T1   | FE      | RANK-440           | S   |                                                                                                                                                       |
| RANK-450 | "You are reconnecting" countdown overlay              | 4.5  | T0   | FE      | RANK-007           | S   | Mirror server grace policy. Confirm 60–90s, not the current 30s.                                                                                      |
| RANK-451 | "Opponent reconnecting" overlay                       | 4.5  | T0   | FE      | RANK-450           | S   | [`opponent-presence.svelte.ts:43–70`](../gateway/opponent-presence.svelte.ts:43).                                                                     |
| RANK-460 | First-time-ranked onboarding modal (3 slides)         | 4.6  | T0   | FE+COPY | —                  | M   | Persist "seen" flag in `LorcanitoUserSettings` JSONB, not localStorage.                                                                               |
| RANK-470 | Pre-queue format / banned-restricted explanation card | 4.7  | T1   | FE+COPY | —                  | S   | Reads from `LORCANA_FORMATS` already exposed.                                                                                                         |

---

## Section 5 — Social & Competitive

| ID       | Title                                                           | Spec | Tier | Lane  | Depends on | Est | Notes                                                                             |
| -------- | --------------------------------------------------------------- | ---- | ---- | ----- | ---------- | --- | --------------------------------------------------------------------------------- |
| RANK-510 | Add opponent tier to `match_found` payload + render badge       | 5.1  | T1   | BE+FE | RANK-110   | S   | Privacy: hide above top-100 OR opt-out.                                           |
| RANK-520 | Post-game emote panel (reuses preset chat)                      | 5.2  | T1   | FE    | RANK-410   | S   | [`packages/shared/src/chat.ts`](../../../../../shared/src/chat.ts) presets exist. |
| RANK-521 | Client + server emote rate limit (1 / 2s)                       | 5.2  | T1   | FE+BE | RANK-520   | S   | Spam vector today.                                                                |
| RANK-530 | Add `gameId` to `MatchSummary`; render replay link in match row | 5.3  | T1   | BE+FE | —          | S   | Replay infra mature; just surface the field.                                      |
| RANK-540 | Friend / direct challenge                                       | 5.4  | T2   | FE+BE | —          | XL  | Greenfield social graph. Defer.                                                   |
| RANK-550 | "Watch top players" entry from leaderboard                      | 5.5  | T2   | FE+BE | —          | M   | BE: opt-in `currentGameId`. FE: link to `/spectate/{gameId}`.                     |
| RANK-560 | Daily ranked quests (extend engagement events)                  | 5.6  | T2   | BE+FE | —          | M   | `MatchmakingEngagementEventSummary` shape already supports it.                    |

---

## Section 6 — Anti-Toxicity & Integrity

| ID       | Title                                                        | Spec | Tier | Lane        | Depends on | Est | Notes                                                                               |
| -------- | ------------------------------------------------------------ | ---- | ---- | ----------- | ---------- | --- | ----------------------------------------------------------------------------------- |
| RANK-610 | Post-game report dialog (UI + categories + i18n)             | 6.1  | T0   | FE+COPY     | RANK-410   | M   |                                                                                     |
| RANK-611 | `POST /v1/matches/{matchId}/report` + persistence            | 6.1  | T0   | BE          | —          | M   |                                                                                     |
| RANK-612 | Moderation review queue (manual at launch)                   | 6.1  | T0   | BE+OPS      | RANK-611   | M   | Sportsmanship-tier auto-recompute can come later.                                   |
| RANK-613 | Per-reporter rate limit on reports                           | 6.1  | T0   | BE          | RANK-611   | S   | Anti-spam-as-griefing.                                                              |
| RANK-620 | Mute opponent (client list + persistence)                    | 6.2  | T1   | FE          | RANK-520   | S   | Persist in `LorcanitoUserSettings` JSONB.                                           |
| RANK-630 | Surface server-applied penalties (`penaltyApplied` field)    | 6.3  | T1   | FE+BE       | RANK-440   | S   |                                                                                     |
| RANK-640 | Engine: per-turn timeout + auto-forfeit ("rope")             | 6.4  | T1   | BE (engine) | —          | L   | No turn-timeout exists today. Coordinate with engine team. 180s starting threshold. |
| RANK-641 | Client rope/countdown UI                                     | 6.4  | T1   | FE          | RANK-640   | S   |                                                                                     |
| RANK-650 | HTTP rate limit on join endpoint                             | 6.5  | T1   | BE          | RANK-006   | S   |                                                                                     |
| RANK-660 | Server: anti-dupe enforcement (one ranked ticket / one game) | 6.6  | T0   | BE          | RANK-006   | S   | Return 409 on second concurrent ranked join.                                        |
| RANK-661 | Frontend: handle 409 with deep-link to active match          | 6.6  | T0   | FE          | RANK-660   | S   | Otherwise the 409 looks like a bug.                                                 |

---

## Section 7 — Stats & Engagement

| ID       | Title                                                           | Spec | Tier | Lane  | Depends on                             | Est | Notes                                                                                                     |
| -------- | --------------------------------------------------------------- | ---- | ---- | ----- | -------------------------------------- | --- | --------------------------------------------------------------------------------------------------------- |
| RANK-710 | Personal stats dashboard page (per-deck, per-archetype winrate) | 7.1  | T1   | FE    | —                                      | M   | `fetchDeckRundown()` already returns the data.                                                            |
| RANK-720 | Match history row: tier delta + replay link + opponent deck     | 7.2  | T1   | FE    | RANK-113, RANK-530                     | S   | Pure additive to [`MatchRow.svelte`](../match-history/ui/MatchRow.svelte). Land all together.             |
| RANK-730 | Seasonal scope on leaderboard API + widget                      | 7.3  | T1   | BE+FE | RANK-310                               | S   | `?season=…` param. Widget already exists at [`ui/LeaderboardWidget.svelte`](ui/LeaderboardWidget.svelte). |
| RANK-740 | Lobby "Your season" composite card                              | 7.4  | T0   | FE    | RANK-111, RANK-120, RANK-211, RANK-320 | S   | Integration surface for tier + stars + placements + countdown + decay.                                    |

---

## Section 8 — Testing & Observability

| ID       | Title                                                        | Spec | Tier | Lane   | Depends on | Est | Notes                                                                          |
| -------- | ------------------------------------------------------------ | ---- | ---- | ------ | ---------- | --- | ------------------------------------------------------------------------------ |
| RANK-810 | Bun-test: ranked queue end-to-end (gate + happy path)        | 8.1  | T0   | QA     | RANK-003   | M   | Pattern: [`state/matchmaking-queue.test.ts`](state/matchmaking-queue.test.ts). |
| RANK-811 | Playwright: `ranked-flow.e2e.ts` against fixture gateway     | 8.1  | T0   | QA     | RANK-003   | M   | Add to `/e2e/`.                                                                |
| RANK-820 | `useMatchmakingLobbyController.test.ts` flag-on/off coverage | 8.2  | T0   | QA     | RANK-003   | S   | Bundle with RANK-003.                                                          |
| RANK-830 | QA runbook: two-account staging smoke                        | 8.3  | T0   | QA+OPS | —          | S   | Document, don't tribal-knowledge.                                              |
| RANK-840 | k6 / Artillery load test on join endpoint                    | 8.4  | T1   | OPS+BE | RANK-006   | M   | Out of repo.                                                                   |
| RANK-850 | Add `@sentry/sveltekit` integration                          | 8.5  | T0   | FE+OPS | —          | S   | **Non-negotiable for ranked launch.** No exception reporting today.            |
| RANK-851 | Backend dashboards: queue depth, p50/p95 wait, error rate    | 8.5  | T0   | BE+OPS | RANK-006   | M   | Out of repo.                                                                   |
| RANK-852 | `request-id` header pass-through in `hooks.server.ts`        | 8.5  | T0   | FE     | —          | S   | Cross-system log correlation.                                                  |

---

## Section 9 — Launch Operations

| ID       | Title                                                          | Spec | Tier | Lane        | Depends on          | Est | Notes                                                                                   |
| -------- | -------------------------------------------------------------- | ---- | ---- | ----------- | ------------------- | --- | --------------------------------------------------------------------------------------- |
| RANK-910 | Define quantitative rollback triggers + rollout schedule       | 9.1  | T0   | OPS+Product | DEC-1               | S   | Reconnect rate, p95 wait, exception spike thresholds.                                   |
| RANK-920 | Rollback runbook (who/where/how)                               | 9.2  | T0   | OPS         | RANK-001            | S   | Document flag location and command.                                                     |
| RANK-930 | Launch-day comms: bulletin + changelog + season page alignment | 9.3  | T0   | COPY        | RANK-302 / RANK-303 | S   | If reward copy was rewritten, cross-check bulletin and external comms before flag-flip. |

---

## Dependency-graph summary (T0 only)

The critical path for a soft launch ("Preseason"):

```
DEC-1 (soft vs full launch decision)
  → RANK-002 (rollout dial) ──┐
  → RANK-001 (flag module) ───┴→ RANK-003 (gate flip) ──┬→ RANK-008 (kill switch)
                                                         ├→ RANK-810/811 (E2E tests)
                                                         └→ RANK-820 (flag coverage)

DEC-3 (tier names+art)
  → RANK-110 (tier enum) ──┬→ RANK-111 (TierBadge) ─┬→ RANK-120 (star bar)
                            │                        ├→ RANK-130 (floors)
                            │                        ├→ RANK-211 (placements badge)
                            │                        └→ RANK-740 (season card)
                            └→ RANK-112/113 (extend types)

DEC-2 (reward copy decision)
  → RANK-302 (rewrite — cheap path)  OR
  → RANK-303 (build fulfillment — XL)

RANK-006/007 (backend contract sign-off)
  → RANK-210, RANK-411, RANK-450, RANK-660

RANK-310 (seasons table)
  → RANK-311 → RANK-312, RANK-313, RANK-320

RANK-410 (post-game screen)
  → RANK-411 → RANK-412 (tier-up animation)
  → RANK-610 (report dialog)

RANK-850 (Sentry) — independent, do early
RANK-460 (FTUE modal) — independent, mostly content
RANK-430 (surrender warning) — independent, copy-only
```

## Suggested sprint shape (2-week sprints, soft-launch path)

**Sprint 1 — Foundation**
RANK-001..009 (all of §0), RANK-110, RANK-112/113, RANK-302, RANK-310, RANK-850

**Sprint 2 — Ladder + Seasons**
RANK-111, RANK-120, RANK-130, RANK-131, RANK-210, RANK-211, RANK-201, RANK-311,
RANK-312, RANK-313, RANK-320, RANK-740

**Sprint 3 — Match-flow polish + integrity**
RANK-410, RANK-411, RANK-412, RANK-430, RANK-450, RANK-451, RANK-460,
RANK-610, RANK-611, RANK-612, RANK-613, RANK-660, RANK-661

**Sprint 4 — Hardening + launch**
RANK-810, RANK-811, RANK-820, RANK-830, RANK-851, RANK-852, RANK-910,
RANK-920, RANK-930. Soft-launch (employees → 5% → 100%).

After Sprint 4 → start Season 1 (T1 set).

---

## How to import these

- **Linear / Jira:** copy each section table; map columns to fields. The `ID`
  is the external key; keep it as a custom field if your tool auto-assigns.
- **GitHub Projects:** create one issue per row; paste the `Title`, body =
  `Spec ref` link + `Notes`; tag with `Lane` and `Tier` labels.
- **Plain backlog tool:** the markdown tables are GFM and copy cleanly.

When estimates come back from engineering, update the `Est` column in place
and use the dependency graph above to confirm the sprint shape still holds.
