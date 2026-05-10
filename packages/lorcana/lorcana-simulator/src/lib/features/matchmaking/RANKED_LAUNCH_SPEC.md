# Ranked Matchmaking — Feature Spec for Technical Evaluation

**Status:** Tech-lead-annotated (notes inline under each item)
**Owner:** Product
**Goal:** Identify every item required to bring Ranked matchmaking up to
"top-level" parity with 2026 digital CCG ladders (Hearthstone, MTG Arena,
Marvel Snap, Legends of Runeterra). Each item below carries technical
annotations to support estimating, sequencing, and risk assessment.

---

## How to read this doc

Every item has the same shape:

- **What it is** — one-line description.
- **Why it matters** — player-facing rationale.
- **Today** — current state in this codebase (file:line cited where known).
- **Acceptance criteria** — concrete bar for "shipped".
- **Tier** — T0 table-stakes / T1 competitive parity / T2 differentiator.
- **Tech Lead Notes** — files to touch, gotchas, recommended approach,
  rough effort hint (S ≤ 2d, M ≤ 1w, L ≤ 2w, XL > 2w).

**Repository conventions (one-time read):**

- Frontend: SvelteKit + Svelte 5 runes (`$state`, `$derived`, `$effect`).
  Lobby state lives in **class-based controllers with DI**, not stores —
  see [`useMatchmakingLobbyController.svelte.ts`](ui/useMatchmakingLobbyController.svelte.ts).
- i18n: **Paraglide / inlang**. Source of truth is `messages/en.json` (and
  per-locale siblings); compiled output lives at `src/lib/paraglide/messages/`.
  Keys are referenced as `m["sim.matchmaking.foo"]({})`.
- Tests: **Bun test** (`bun:test`), not Vitest. Module mocking via
  `mock.module(...)`. E2E uses **Playwright** in `/e2e/` against Vite on
  `127.0.0.1:5174`.
- Server boundary: SvelteKit is a thin proxy. Real matchmaking, ratings,
  leaderboards, seasons, and gateway tickets live behind external API
  endpoints (`/v1/games/lorcana/play/...`, `/v1/leaderboards/...`,
  `/v1/gateway/ticket`, etc.). **Almost every backend item below means
  changes in a service that is NOT in this repo.**
- Realtime: WebSocket gateway, see
  [`gateway/gateway-client.svelte.ts`](../gateway/gateway-client.svelte.ts)
  and [`gateway/gateway-transport.ts`](../gateway/gateway-transport.ts).
  Server pushes match state via `state_update` / `move_accepted` messages
  with an embedded `matchInfo` payload — that is the natural extension
  point for tier/star deltas.
- Analytics: **GA4 only** (`@/lib/analytics`). No Sentry, no Datadog, no
  distributed tracing today.
- Auth: **Better Auth** session resolved server-side in
  [`hooks.server.ts`](../../../hooks.server.ts), populated to
  `event.locals.user`. Gateway tickets carry short-lived auth tokens.

The codebase reference paths assume the simulator package
`packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/`.

---

## Section 0 — Pre-flight (no ranked launch is possible without these)

### 0.1 Runtime feature flag for Ranked

- **What:** Replace the hardcoded gate at
  `ui/useMatchmakingLobbyController.svelte.ts:847`
  (`if (this.selectionDisabled || matchType === "ranked") return;`) with a
  flag readable at runtime (env, remote config, or per-user).
- **Why:** Allows rollout staging, dark launch, kill switch without redeploy.
- **Today:** Hardcoded early-return. No flag plumbing.
- **Acceptance:** Flag flippable without redeploy; flipping off mid-session
  returns user to a safe state without breaking active tickets; default off
  in production until launch.
- **Tier:** T0
- **Tech Lead Notes:**
  - **No feature-flag system exists today.** The closest pattern is
    [`src/lib/config/public-url-config.ts`](../../../config/public-url-config.ts)
    which reads `PUBLIC_*` env vars from `$env/dynamic/public` with safe
    fallbacks. Recommend a sibling `src/lib/config/feature-flags.ts` that
    follows the same shape, exposed via `+layout.server.ts` so the value is
    available both server-side and on hydration.
  - **Don't gate on env var alone** — for staged rollout we need
    per-user/per-cohort decisions. Hash `userId` against a 0–100 dial
    sourced from `MatchmakingContext` (extend the API in §2/§3.1) so
    "ranked enabled for the first 5% of users" is a one-line config change.
  - The single read site that matters is
    [`useMatchmakingLobbyController.svelte.ts:847`](ui/useMatchmakingLobbyController.svelte.ts:847),
    but watch for two more derived UI paths: the disabled visual on
    [`MatchmakingQueueCard.svelte`](ui/MatchmakingQueueCard.svelte) and the
    persisted `selectedMatchType` (lines 285–315 + 1604–1610) which can
    hydrate to `"ranked"` from a previous session even when the flag is
    off — guard the hydration path explicitly.
  - **Effort:** S–M (server-side rollout dial is the larger half).

### 0.2 Remove "coming soon" copy

- **What:** Replace `sim.matchmaking.matchmaking.rankedComingSoon` (referenced
  at `ui/MatchmakingQueueCard.svelte:121`) and audit all locales (`en`, `de`,
  `es`, `it`, `pt-br`).
- **Why:** Shipping a locale that still says "coming soon" undermines the
  launch.
- **Today:** Tooltip text and disabled visual state present.
- **Acceptance:** Tooltip and disabled state respond to flag in 0.1; no
  locale contains "coming soon" copy when flag is on.
- **Tier:** T0
- **Tech Lead Notes:**
  - Edit `messages/en.json` (and the four locale siblings), then run the
    paraglide build (already wired in `package.json`). Compiled output
    regenerates at `src/lib/paraglide/messages/`.
  - Recommend keeping the key name and changing the value (e.g. to a
    description of the format/floor rules) rather than deleting the key —
    avoids touching every callsite.
  - Adjacent keys to audit: `sim.matchmaking.matchmaking.rankedBadge`,
    `sim.matchmaking.engagement.mode.ranked`, plus the right-column-content
    bulletin (`content/right-column-content.ts`) and `content/bulletin.md`.
  - **Effort:** S.

### 0.3 Backend contract verification

- **What:** Get written confirmation from backend owners that
  `/v1/games/lorcana/play/matchmaking/join` honors `matchType: "ranked"` as
  a separate queue (not aliased to casual), and that match completion
  populates `mmrBefore` / `mmrAfter` in the response surfaced by
  `/v1/match-history/players/me/matches`.
- **Why:** Cannot validate from this repo. Rating math is
  server-authoritative via the realtime gateway.
- **Today:** API types accept `matchType` (`api/matchmaking-api.ts:21`); MMR
  fields exist on `match-history/types.ts`. Behavior unverified.
- **Acceptance:** Backend confirms queue, algorithm (Elo / Glicko-2 /
  TrueSkill), starting MMR, K-factor, draw handling, abandonment policy,
  reconnect window.
- **Tier:** T0
- **Tech Lead Notes:**
  - Concrete contract questions to send the backend team:
    1. Is "ranked" a separate physical queue or a flag on a unified queue?
       (Affects pairing latency tuning.)
    2. What is the rating algorithm? Glicko-2 is the most defensible choice
       for ladder games (lower K + uncertainty term beats Elo for new
       accounts). Confirm starting rating, K, and draw handling.
    3. Per-match payload: does the gateway's `match_completed`/`state_update`
       emit `mmrBefore`/`mmrAfter` inline, or do we have to refetch
       `/v1/match-history/players/me/matches` after the game? See §4.2 —
       this answer dictates the post-game UI architecture.
    4. Concurrent-ticket / concurrent-game enforcement (§6.6).
    5. Surrender / disconnect / abandonment policy (§4.3, §4.5).
  - Get this in writing before any T0 frontend work starts; multiple items
    fork on the answers.
  - **Effort:** S (calendar) but cross-team blocker.

### 0.4 Kill switch validated on staging

- **What:** Verify flipping the flag from 0.1 to off mid-session degrades
  cleanly — active tickets cancel, in-game ranked matches finish, the
  Ranked tab disappears or returns to disabled state on next render.
- **Tier:** T0
- **Tech Lead Notes:**
  - Two failure modes to design around: (a) user is **mid-queue** when the
    flag flips — preferred behavior is to leave their ticket alive (don't
    punish for our toggle) and only block _new_ ranked queues; (b) user is
    **mid-match** — never interrupt; let the game finish and report the
    result, but block re-queue.
  - Test harness: `state/matchmaking-queue.test.ts` already mocks
    `joinMatchmakingQueue`; extend with a "flag flipped during queued
    state" case.
  - **Effort:** S (mostly test scenarios).

### 0.5 Analytics coverage

- **What:** Confirm `selectedMatchType` is on every queue / match-found /
  match-completed / concede / disconnect event. Reference:
  `lib/analytics/types.ts`.
- **Acceptance:** Dashboards exist for ranked queue depth, p50/p95 wait
  time, match-find success rate, concede rate, MMR distribution.
- **Tier:** T0
- **Tech Lead Notes:**
  - Backend is **GA4-only** today via `gtag.js`
    ([`src/lib/analytics/analytics.ts`](../../analytics/analytics.ts);
    [`types.ts`](../../analytics/types.ts) lines 1–331). Match flow already
    emits `queue_join`, `queue_match_found`, `queue_timeout`,
    `match_forfeit`, `game_join`, `game_end` — verify each carries
    `match_type` and add it where missing.
  - **GA4 limitation:** event payloads are flat strings/numbers only.
    Anything richer than that (e.g. nested tier-delta object) needs to be
    flattened into multiple keys (`tier_before`, `tier_after`, `stars_delta`).
  - Dashboards for queue depth / wait time need backend metrics, not just
    client events — confirm with backend team that they're emitting them.
  - **Effort:** S frontend / depends backend.

---

## Section 1 — Visible Progression (ladder structure)

### 1.1 Named tier ladder

- **What:** Define and implement a player-facing rank ladder (e.g. Apprentice
  → Storyweaver → Illumineer → Archivist → Legend), each tier with
  divisions if applicable, an icon, a color, and a localized name.
- **Why:** A bare MMR number is not a goal. Tiers are the chase.
- **Today:** `PlayerStats.bracket` is a nullable string with no enum or
  visual mapping. No tier art. No tier-name localization.
- **Acceptance:** Tier enum + mapping function `mmr → tier` shared between
  frontend and backend; tier icon set in art pipeline; localized names in
  all 5 supported locales; tier badge component renders in lobby, post-game,
  match history, and (if scoped) in-game.
- **Dependencies:** Art brief; product naming decision; backend tier
  computation parity.
- **Tier:** T0
- **Tech Lead Notes:**
  - **Tier enum belongs in `packages/shared`** (or a new
    `@tcg/lorcana-ranked` package) so frontend and any future backend code
    in the monorepo share one source of truth. The `mmr → tier` mapping
    should be **server-authoritative** and shipped as a returned field, not
    recomputed client-side — otherwise bug-fix releases that change the
    threshold will silently disagree with the server.
  - Type extension lives at
    [`match-history/types.ts:33–51`](../match-history/types.ts) (`PlayerStats`)
    and the per-match shape (`MatchSummary` lines 9–26). Add: `tier`,
    `division`, `stars` to both, all optional during the rollout window.
  - Build a `<TierBadge tier=… size=…>` component once, reuse in the lobby
    queue card, post-game screen, match history rows, and the leaderboard
    widget. Don't recreate per surface.
  - Art: SVG sprite sheet rather than per-tier PNGs — keeps bundle size
    down and lets us tint per division without re-export.
  - **Effort:** M backend (tier service + payload), M frontend (component +
    integration), L art (longest pole — start now).

### 1.2 Stars / pips within tier

- **What:** Per-match progression units within a tier (e.g. 5 stars per
  division). Win = +1, loss = -1, with floors at division boundaries.
- **Why:** Per-match progression feedback. MMR alone is illegible.
- **Today:** Not present.
- **Acceptance:** Star count visible in lobby and post-game; star delta
  animation on result screen; backend authoritative on star count.
- **Tier:** T0
- **Tech Lead Notes:**
  - Star math is **server-authoritative** alongside the rating algorithm.
    Don't try to mirror the formula client-side; just render
    `starsBefore → starsAfter` from the gateway payload (see §0.3 / §4.2).
  - The per-match `matchInfo` parsed in
    [`game-mode-message-router.ts:128–151`](../../gateway/game-mode-message-router.ts)
    is the natural carrier for `starsBefore`, `starsAfter`, `tierBefore`,
    `tierAfter`. Keep them optional so non-ranked games continue to parse
    without changes.
  - Win-streak bonus (§1.5) interacts here: server should emit `+2 stars`
    explicitly so the client doesn't have to derive it.
  - **Effort:** S frontend (rendering) once backend ships fields.

### 1.3 Rank floors

- **What:** Once a player reaches a tier, they cannot drop below it during
  the season.
- **Why:** Largest single retention lever in HS-style ladders. Removes
  ladder anxiety.
- **Today:** Not present.
- **Acceptance:** Backend enforces floor on demotion; UI communicates floor
  ("You cannot drop below Illumineer this season").
- **Tier:** T0
- **Tech Lead Notes:**
  - Pure backend rule: at result-write time, clamp the new tier to
    `max(currentTier, floorTier)`. No frontend logic; UI only displays.
  - Add `floorTier` to player profile / stats payload so the lobby's "Your
    season" card (§7.4) can show it without an extra round-trip.
  - **Edge case:** when MMR drops but tier doesn't (because of floor), the
    server still needs to track _real_ MMR to keep matchmaking working.
    This is exactly why hidden-MMR vs visible-tier separation (§2.2)
    matters; flag for backend.
  - **Effort:** S backend / S frontend.

### 1.4 Promotion / demotion series

- **What:** Best-of-N matches required to cross a tier boundary (optional —
  some ladders skip).
- **Today:** Not present.
- **Tier:** T1
- **Tech Lead Notes:**
  - If skipped, the star system handles cross-tier movement on its own;
    promo series is a polish layer.
  - When implemented, server tracks "in promo series" state on the player;
    UI surfaces it as a 0/3 or 0/5 dot row above the star bar. Add as a
    field to `PlayerStats` (`promotionProgress?: { wins: number; total: number }`).
  - **Effort:** M (state machine on server + UI).

### 1.5 Win-streak bonus

- **What:** At low tiers, consecutive wins grant +2 stars instead of +1
  until a tier ceiling.
- **Today:** Streak is tracked (`PlayerStats.currentWinStreak`,
  `highestWinStreak`); badge renders at
  `ui/MatchmakingQueueCard.svelte:72`. **No bonus behavior is wired.**
- **Acceptance:** Backend applies bonus per ruleset; UI shows "On a streak,
  +2!" indicator.
- **Tier:** T1
- **Tech Lead Notes:**
  - The streak field is already plumbed end-to-end — `currentWinStreak` is
    rendered by [`MatchmakingQueueCard.svelte:72–82`](ui/MatchmakingQueueCard.svelte:72),
    so the UI lift is just adding a "+2 next win" hint when the streak is
    active and the player is below the ceiling tier.
  - Backend rule should be data-driven (config table per tier) so balance
    tweaks don't require a deploy.
  - **Effort:** S frontend / S–M backend.

### 1.6 Loss-streak / bad-luck protection

- **What:** Reduce demotion impact after N consecutive losses, or seed
  next match against weaker opposition.
- **Today:** Not present.
- **Tier:** T1
- **Tech Lead Notes:**
  - Two implementations to choose from: (a) reduce star loss to 0 on the
    Nth loss in a row (simpler, more visible); (b) widen MMR search band
    on the matchmaker to find an easier opponent (more powerful, less
    visible). Recommend (a) for launch — players need to _see_ the
    protection or it doesn't work as a retention lever.
  - `currentLossStreak` already exists in `PlayerStats`
    ([types.ts:33–51](../match-history/types.ts)) — reuse, don't add a
    parallel field.
  - **Effort:** S backend.

---

## Section 2 — Calibration & Fairness

### 2.1 Placement matches

- **What:** First N (5 or 10) ranked matches each season are "placements"
  — outcomes weighted heavier, no demotion, final placement determined at
  the end.
- **Today:** `onboardPlayer()` API exists at
  `api/player-context-api.ts:239` but returns no placement state.
- **Acceptance:** Backend tracks per-season placement count and bias; UI
  shows "Placement match 3 of 10" badge during queue and post-game.
- **Tier:** T0
- **Tech Lead Notes:**
  - Add `placementsRemaining: number | null` to `MatchmakingContext`
    ([player-context-api.ts:59–65](api/player-context-api.ts:59)). When
    `null`, player is not in placements (already placed, or pre-season);
    when 0, last placement is rendered as a "reveal" moment (§3.5).
  - If using Glicko-2 server-side, "weighted heavier" is naturally handled
    by uncertainty (RD shrinks as games are played) — no special placement
    code path is needed beyond surfacing the counter.
  - UI: queue card and post-game both show "Placement match N of M"
    above/replacing the tier badge.
  - **Effort:** S backend (counter) / S frontend.

### 2.2 Hidden MMR vs visible rank

- **What:** Internally use MMR for matchmaking, externally show only tier +
  stars. (HS / Snap model.)
- **Why:** Reduces obsession with a single number; aligns visible
  progression with actual play.
- **Today:** Only an MMR number is shown
  (`ui/MatchmakingQueueCard.svelte:728`).
- **Acceptance:** MMR removed from default UI; debug-flag exposes it for
  internal use.
- **Tier:** T0 (or T1 if leadership chooses MTGA-style dual-display)
- **Tech Lead Notes:**
  - Keep the MMR field in API responses; just stop rendering it by default.
    A `?debug=1` query param or the existing dev-routes mechanism
    ([`simulator-devtools/routes/dev-routes.ts`](../simulator-devtools/routes/dev-routes.ts))
    is the cheapest way to keep the value visible to internal users.
  - Keep MMR in match history for power users; surface tier delta as the
    primary signal and demote MMR delta to a secondary line.
  - This decision blocks 1.1's UI integration — confirm posture before
    wiring tier badges.
  - **Effort:** S frontend.

### 2.3 Smurf / new-account seeding

- **What:** New accounts start at a low MMR with high uncertainty
  (Glicko-2 RD or TrueSkill σ) so they climb fast if skilled.
- **Today:** Unknown — backend internals not visible from this repo.
- **Tier:** T1
- **Tech Lead Notes:**
  - Glicko-2 handles this for free via the rating-deviation parameter; if
    backend chose Elo, this becomes a manual K-boost for the first ~20
    games. Get the answer in §0.3.
  - No frontend work beyond surfacing "new player" state on placement
    match badges.

### 2.4 Decay for inactive top players

- **What:** At top tiers, lose stars for N days of inactivity.
- **Why:** Keeps the leaderboard alive and rewards consistent play.
- **Today:** Not present.
- **Tier:** T1
- **Tech Lead Notes:**
  - Pure backend cron (daily) over `last_ranked_match_at`. Frontend
    surfaces `decayWarningDaysRemaining: number | null` on the lobby's
    season card (§7.4) — a small but high-leverage UX touch.
  - Do **not** decay below the tier floor (§1.3). Coordinate the
    interaction with backend.
  - **Effort:** S backend cron / S frontend warning.

### 2.5 Region / queue sharding

- **What:** Decide whether ranked uses one global queue or splits by region.
- **Today:** Unverified. Single queue assumed.
- **Tier:** T1 (decision needed even if implementation is "global")
- **Tech Lead Notes:**
  - A `region: string | null` field already exists on
    [`account-settings-api.ts`](api/account-settings-api.ts) but is never
    read by the queue. If we ship single global, document that decision
    explicitly so we don't accidentally rely on the field later.
  - Region affects p95 wait times more than fairness; for launch volume
    (low) global is almost certainly right.

---

## Section 3 — Seasons & Rewards

### 3.1 Real season state

- **What:** A backed seasons resource (id, slug, startsAt, endsAt, status,
  rewardSchema) replacing the hardcoded `wilds-unknown` page at
  `routes/matchmaking/(shell)/season/[seasonSlug]/+page.svelte`.
- **Today:** Loader hardcoded to a single slug; static marketing HTML.
- **Acceptance:** Backend `seasons` table; current season fetched at
  page-load; player profile includes `currentSeason`, `placementsRemaining`,
  `seasonResetAt`.
- **Tier:** T0
- **Tech Lead Notes:**
  - The current loader at
    [`routes/matchmaking/(shell)/season/[seasonSlug]/+page.ts:8`](<../../../routes/matchmaking/(shell)/season/[seasonSlug]/+page.ts>)
    accepts only `"wilds-unknown"` and 404s otherwise. The `+page.svelte`
    is **430 lines of hardcoded marketing HTML** — milestones, prize
    tables, dates, copy.
  - Recommended path: add `+page.server.ts` that fetches `GET /v1/seasons/{slug}`,
    define a `Season` type in `packages/shared` with arrays for
    `milestones`, `formats`, `queuePrizes`, and bind the existing template
    to the loaded data. This converts 430 lines of static HTML into a
    template — much smaller diff than it sounds.
  - Add the season fetch to the parallel `Promise.allSettled([...])` block
    in
    [`server/load-matchmaking-data.ts:67–85`](server/load-matchmaking-data.ts:67)
    so the lobby gets it on initial load — no extra round-trip.
  - **Effort:** M backend (table + endpoint), M frontend (template
    rebinding + types).

### 3.2 Season countdown widget

- **What:** Visible "Season ends in 14d 3h" element on the lobby.
- **Today:** Not present.
- **Tier:** T0
- **Tech Lead Notes:**
  - Trivial once §3.1 is live; needs `season.endsAt` and a `$derived` clock.
  - Reuse the deadline-formatting utility at
    [`EngagementEventCard.svelte:71`](ui/EngagementEventCard.svelte:71)
    (`m["sim.matchmaking.engagement.deadline.daysHours"]({ days, hours })`)
    so countdown copy matches engagement events.
  - Place inside the lobby's season-progress card (§7.4) rather than as a
    standalone element — keeps the lobby tidy.
  - **Effort:** S.

### 3.3 End-of-season reward fulfillment

- **What:** Backend pipeline that, on season close, computes each player's
  peak rank, awards the corresponding reward (currency / cosmetic / pack /
  card-back), and surfaces it in a claim flow.
- **Today:** `routes/matchmaking/(shell)/season/wilds-unknown/+page.svelte:87`
  advertises booster boxes and an Illumineer's Trove. **No fulfillment
  code anywhere in this repo.**
- **Why critical:** Shipping the marketing copy without fulfillment is a
  refunds + credibility risk.
- **Acceptance:** Reward rules defined; end-of-season job runs; claim UI
  exists; rewards delivered to player inventory; audit log per award.
- **Tier:** T0 if we keep the current copy. Otherwise: rewrite copy and
  defer to T1.
- **Tech Lead Notes:**
  - **Exhaustive search (`*reward*`, `*inventory*`, `*currency*`,
    `*cosmetic*`, `*chest*`, `*claim*`) returns zero implementation.** The
    `walletBalance` field on `MatchmakingEngagementState`
    ([player-context-api.ts:110–114](api/player-context-api.ts:110)) is
    declared but never used.
  - Building a full reward+inventory system before launch is **L–XL** and
    requires backend, asset pipeline, claim UI, audit logging, and
    customer-support tooling for botched fulfillment. **Strong
    recommendation: rewrite the season page copy to "leaderboard glory
    only" for the first season and defer reward fulfillment to Season 2.**
    This is a 30-minute copy change vs. weeks of system work, with no
    legal/refunds risk.
  - If we _must_ fulfill rewards in S1, at minimum: idempotent
    end-of-season job (rerunnable safely), per-award audit row, a claim
    endpoint that's safe to call N times. Plan for support tickets.
  - **Effort:** S (copy rewrite path) vs L–XL (full fulfillment).

### 3.4 Soft-reset visualization

- **What:** At season start, players drop ~3 tiers (or a defined formula).
  UI explains why.
- **Today:** Not present.
- **Tier:** T1
- **Tech Lead Notes:**
  - Server stamps `seasonResetSnapshot: { previousTier, newTier }` on the
    player profile during reset; client renders a one-time modal on first
    lobby visit of the new season.
  - Hook into the same dialog system as the FTUE modal (§4.6).
  - **Effort:** S backend / S frontend.

### 3.5 End-of-season rank reveal

- **What:** Modal or splash on first login after season close: "You finished
  Illumineer 3 — top 12% — here are your rewards."
- **Why:** Highest-screenshot moment in modern ladders.
- **Today:** Not present.
- **Tier:** T1
- **Tech Lead Notes:**
  - Same delivery path as §3.4 (one-shot modal off a profile flag). The
    work is mostly art/animation + percentile computation server-side.
  - If §3.3 is rewritten to "leaderboard glory only", the reveal becomes
    the _primary_ end-of-season payoff — invest accordingly.
  - **Effort:** M (animation polish dominates).

### 3.6 Season-end re-engagement notification

- **What:** Push / email / in-app at T-72h before season close.
- **Today:** No notification system surfaced.
- **Tier:** T1
- **Tech Lead Notes:**
  - **No web-push infrastructure exists** beyond the PWA install nudge at
    [`state/install-nudge.svelte.ts`](state/install-nudge.svelte.ts). This
    is a "build from scratch" item: service worker + VAPID keys + backend
    subscription endpoint + opt-in flow.
  - Cheaper alternative for launch: an in-app banner on lobby visits in
    the final 72h, plus an email blast from backend. Defer push to a later
    season.
  - **Effort:** XL (push) vs S (banner+email).

---

## Section 4 — Match-Flow Polish

### 4.1 Tier-up celebration

- **What:** ~2-second animation + sound when a player promotes a tier.
- **Today:** Not present.
- **Acceptance:** Triggered post-game when server-reported new tier > old
  tier; non-skippable for first promotion of the day, skippable thereafter.
- **Tier:** T0
- **Tech Lead Notes:**
  - The trigger surface is the gateway's `match_completed` payload —
    parsed in
    [`game-mode-message-router.ts:128–151`](../../gateway/game-mode-message-router.ts).
    Add `tierBefore` / `tierAfter` to that payload (also covers §4.2);
    fire animation when they differ.
  - Render in the post-game screen path (§4.2 file references). Lottie or
    CSS keyframes both work; the frontend doesn't load Lottie today, so
    CSS+SVG is the lower-risk pick.
  - "Non-skippable on first daily" — track in localStorage, key by
    `userId:date`. Don't put on the server.
  - **Effort:** M (animation + state machine).

### 4.2 Post-game MMR / star delta

- **What:** On the post-game screen show `oldRank → newRank`, star delta,
  and MMR change (if 2.2 keeps MMR visible).
- **Today:** Delta is visible only on next match-history reload
  (`ui/MatchRow.svelte:42`); not on the post-game screen.
  `lobby-room.svelte.ts:455` only saves session metadata locally.
- **Acceptance:** Post-game payload from gateway includes pre/post rank +
  stars + mmr; UI animates the delta.
- **Tier:** T0
- **Tech Lead Notes:**
  - **There is no dedicated "post-game screen" component yet.** Match end
    is signaled by `status: "finished"` on the engine state, handled at
    [`HumanVsHumanMode.svelte` ~lines 74–106](../../../routes/matches/[matchId]/games/[gameId]/modes/HumanVsHumanMode.svelte)
    — currently fires a terminal toast then navigates back. We need to
    add a `<PostGameScreen>` component rendered _before_ navigation when
    `matchInfo.matchCompleted && matchType === "ranked"`.
  - **Two delivery options for the delta values:**
    1. Extend `matchInfo` parsed in `game-mode-message-router.ts` to carry
       `mmrAfter` / `tierAfter` / `starsAfter` inline. Lowest latency, but
       requires backend changes to a hot path.
    2. Have the post-game screen call `/v1/match-history/players/me/matches?limit=1`
       on mount. Tolerates eventual consistency, no backend hot-path
       changes. **Recommend (2) for launch**, migrate to (1) if perceived
       latency is an issue.
  - Animation: CSS-only number tween + tier badge crossfade. ~150 lines.
  - **Effort:** M (component + integration + animation), assumes (2).

### 4.3 Ranked-specific surrender warning

- **What:** Concede dialog calls out the ranked penalty: "Conceding a
  ranked match counts as a full loss — you will lose stars."
- **Today:** Generic forfeit dialog (no ranked-specific copy).
- **Tier:** T0
- **Tech Lead Notes:**
  - Forfeit endpoint: `POST` via
    [`api/matchmaking-api.ts:109–119`](api/matchmaking-api.ts:109);
    handler in `useMatchmakingLobbyController.svelte.ts` ~lines 946–987.
    The dialog is rendered by `MatchmakingActiveMatchCard.svelte` /
    `MatchmakingPlayCard.svelte`.
  - Add a conditional copy variant when the active match is ranked —
    pure i18n + a prop, no logic change. Search for
    `sim.matchmaking.activematch.cancelforfeit` and add a sibling key
    `…cancelforfeit.ranked`.
  - **Effort:** S.

### 4.4 Accept window with dodge consequence

- **What:** 15s accept window already implemented at
  `state/matchmaking-queue.svelte.ts` (DEFAULT_ACCEPT_WINDOW_MS). Add a
  dodge consequence: cooldown / star penalty / rate limit, communicated
  in-UI.
- **Today:** Accept window present; no dodge penalty UI.
- **Tier:** T1
- **Tech Lead Notes:**
  - Accept timer at
    [`matchmaking-queue.svelte.ts:14, 334–411`](state/matchmaking-queue.svelte.ts:14);
    expiry handler at lines 400–411. Dodge penalty must be enforced
    server-side (queue cooldown), with a UI banner showing remaining
    cooldown.
  - Be careful with the messaging — players genuinely lose connection
    during the accept window; punishing all dodges identically generates
    support tickets. Consider a 1-strike grace.
  - **Effort:** S frontend banner / S–M backend cooldown.

### 4.5 Reconnect grace window UI

- **What:** On disconnect during a ranked game, show "Reconnecting… 90s
  remaining" with a clear timer; only mark a loss after grace expires.
- **Today:** Gateway reconnect logic exists; no visible grace timer.
- **Tier:** T0
- **Tech Lead Notes:**
  - Grace logic is present:
    [`opponent-presence.svelte.ts:43–70`](../gateway/opponent-presence.svelte.ts:43)
    has a hard-coded **30s** opponent-drop window; client-side reconnect
    handler is `useMatchmakingLobbyController.svelte.ts:1308–1314`. The
    timer is not surfaced visually.
  - **Two UIs to build:** (a) "_You_ are reconnecting…" with a countdown
    matching server policy; (b) "Opponent reconnecting (Xs remaining)"
    overlay so the waiting player isn't confused. Both are toast/overlay
    patterns; reuse the existing toast system.
  - Confirm the grace duration with backend (§0.3) — 30s is short for
    ranked; 60–90s is closer to industry norm.
  - **Effort:** S frontend, depends backend duration confirmation.

### 4.6 First-time-ranked onboarding modal

- **What:** One-time splash on first ranked queue entry: how the ladder
  works, season window, rewards, surrender warning.
- **Today:** Not present.
- **Tier:** T0
- **Tech Lead Notes:**
  - Persist "seen" flag in `LorcanitoUserSettings` (the JSONB blob in
    Better Auth user metadata, [`shared/auth/types.ts:89–111`](../../../../../shared/src/auth/types.ts:89))
    — survives device switches. localStorage-only would re-show on every
    new device, which players hate.
  - Trigger point: first call to `selectMatchType("ranked")` after the
    flag is on, before the queue actually starts.
  - 3 slides: ladder → season → fair-play (surrender + reconnect).
    Skippable but the first time should be required-acknowledgement, not
    just dismissable.
  - **Effort:** M (content + 3 slides + persistence).

### 4.7 Format / deck-legality lobby explanation

- **What:** Pre-queue card explaining current format, banned/restricted
  cards, link to full format rules.
- **Today:** Validation logic exists (`validateDeckForFormat`); no
  explanatory UI before queueing.
- **Tier:** T1
- **Tech Lead Notes:**
  - `validateDeckForFormat` at
    [`api/player-context-api.ts:530–543`](api/player-context-api.ts:530)
    already accepts a `formatId` and reads from `LORCANA_FORMATS` in
    `@tcg/lorcana-types`. **No new validation work needed**, just a UI
    surface that reads the same format object and renders banned/restricted
    lists.
  - Place in the Matchmaking deck selection card alongside the existing
    deck-validation details surface.
  - **Effort:** S.

---

## Section 5 — Social & Competitive

### 5.1 Opponent rank display

- **What:** Show opponent's tier badge pre-game and on the in-game scoreboard.
- **Today:** Not present.
- **Tier:** T1
- **Tech Lead Notes:**
  - Opponent tier should travel on the same gateway message that announces
    `match_found` (currently in `lobby-room.svelte.ts:428–469`). Add
    `opponentTier`/`opponentBracket` to the payload.
  - **Privacy consideration:** at high tier (top 100, leaderboard-listed)
    showing tier reveals identity. Don't display opponent tier above a
    threshold OR add an opt-out.
  - **Effort:** S frontend / S backend payload extension.

### 5.2 Post-game emote / GG

- **What:** A small set of emotes (GG, Well Played, Thanks) on the post-game
  screen.
- **Today:** Not present.
- **Tier:** T1
- **Tech Lead Notes:**
  - **Preset chat infrastructure already exists.**
    [`packages/shared/src/chat.ts:1–10`](../../../../../shared/src/chat.ts:1)
    defines 8 preset keys: `good_luck`, `have_fun`, `thinking`,
    `one_moment`, `nice_play`, `oops`, `thanks`, `good_game`. The
    [`match-chat-controller.svelte.ts`](../match-chat/match-chat-controller.svelte.ts)
    already handles `send_chat_message` over the gateway with i18n via
    Paraglide. Adding post-game emotes is a UI re-wrap of existing keys,
    not a new system.
  - **Footgun:** the chat controller has `MAX_CHAT_TEXT_LENGTH = 280` for
    freetext, no server-side validation, and **no rate limit on preset
    sends**. Spam vector. Add a 1-emote-per-2-seconds client throttle
    minimum and confirm backend enforces something stricter.
  - **Effort:** S–M (UI + rate limit; existing transport is free).

### 5.3 Replay linking from match history

- **What:** Each ranked match in match history links to the saved replay.
- **Today:** Replay infra exists (`replay-orchestrator.svelte.ts`,
  `fetch-replay.ts`); explicit link from ranked match rows unconfirmed.
- **Tier:** T1
- **Tech Lead Notes:**
  - Replay system is mature; replays are keyed by **`gameId`** (see
    [`replay/fetch-replay.ts:78`](../replay/fetch-replay.ts:78) — `GET
/v1/games/lorcana/play/replays/{gameId}/data`).
  - **Currently `MatchSummary` carries `matchId` but not `gameId`.** Add
    optional `gameId?: string` to the API response and to
    [`match-history/types.ts:9–26`](../match-history/types.ts:9), then
    render a "Watch Replay" link in `MatchRow.svelte` when present.
  - **Effort:** S backend (field) / S frontend.

### 5.4 Friend / direct challenge

- **What:** Challenge a friend to a private match (not ranked, but adjacent
  feature players expect).
- **Today:** Not present.
- **Tier:** T2
- **Tech Lead Notes:**
  - Adjacent product surface (friends list, invites, lobby) doesn't exist;
    significant scope. The lobby-room state machine
    ([`state/lobby-room.svelte.ts`](state/lobby-room.svelte.ts)) is the
    reuseable substrate, but the social graph is greenfield.
  - **Effort:** XL.

### 5.5 Spectate top-ranked players

- **What:** "Watch top players" entry from the leaderboard widget.
- **Today:** Spectator infra exists; entry point not wired.
- **Tier:** T2
- **Tech Lead Notes:**
  - Spectator route at
    [`/spectate/[gameId]`](../../../routes/spectate/[gameId]/+page.svelte)
    already works against any active gameId; orchestrator at
    [`spectator-match-orchestrator.svelte.ts`](../spectator/spectator-match-orchestrator.svelte.ts)
    is mature. Wiring from leaderboard requires backend to expose
    `currentGameId` per top-ranked player (privacy: opt-in).
  - No spectator rate limit or inactivity kick today — flag for the
    backend before opening this floodgate at launch.
  - **Effort:** S frontend / M backend (privacy + currentGameId surface).

### 5.6 Daily quests tied to ranked

- **What:** Quests like "Win 3 ranked matches", "Play 5 ranked matches with
  Amber". `MatchmakingEngagementState` exists but ranked-specific quests
  do not.
- **Tier:** T2
- **Tech Lead Notes:**
  - The shape is already there:
    [`MatchmakingEngagementEventSummary`](api/player-context-api.ts:83)
    has `dailyPoints`, `dailyCapPoints`, `eligibleMatchTypes`,
    `eligibleModes`, `nextRewardPreview`. `EngagementEventCard.svelte`
    already renders point caps with countdowns.
  - Daily quests likely require **no new components** — just a backend
    endpoint that emits quest-shaped engagement events with a `questType`
    discriminator, and a tab in the engagement section.
  - **Effort:** M backend / S frontend.

---

## Section 6 — Anti-Toxicity & Integrity

### 6.1 Report player flow

- **What:** End-of-game report dialog with categories (cheating, toxic
  emotes, AFK, stalling); feeds the sportsmanship leaderboard.
- **Today:** `leaderboard-api.ts:4` already supports a `"sportsmanship"`
  leaderboard type; `PlayerStats.sportsmanshipTier` field exists. **No
  report UI, no enforcement queue.**
- **Acceptance:** End-of-game report button; backend persists reports;
  sportsmanship score reflects reports + game-state signals.
- **Tier:** T0
- **Tech Lead Notes:**
  - **The `sportsmanshipTier` field is orphaned today** — defined on
    `PlayerStats` ([types.ts:33–51](../match-history/types.ts:33)),
    rendered by the dist-only `SportsmanshipCard.svelte`, but **nothing
    in the codebase writes to it**. A leaderboard endpoint exists but
    has no input pipeline.
  - Minimum viable launch: post-game report button + `POST /v1/matches/{matchId}/report`
    endpoint + backend persistence + manual moderation review queue.
    Sportsmanship-tier _recomputation_ can come later.
  - **Defense-in-depth:** rate-limit reports per reporter per day to
    prevent spam-as-griefing. Pair with a mute (§6.2).
  - **Effort:** M frontend (dialog + i18n) / M–L backend (storage,
    moderation queue, abuse limits).

### 6.2 Mute opponent

- **What:** Mute emotes / chat for the current and all future games with
  this player.
- **Today:** No emote / chat exists yet (see 5.2). Bundle with that.
- **Tier:** T1 (same launch as emotes)
- **Tech Lead Notes:**
  - Persist mute list in `LorcanitoUserSettings` JSONB (auth/types.ts:89).
    Apply client-side first as a fast win; backend mirroring later.
  - Bundle with §5.2 release — shipping emotes without mute is a clear
    net negative.

### 6.3 Concede / dodge penalty visibility

- **What:** Pair with 4.3 and 4.4: every penalty applied is shown to the
  player with the reason.
- **Tier:** T1
- **Tech Lead Notes:**
  - Don't invent a parallel telemetry path; backend should attach a
    `penaltyApplied: { reason, magnitude }` field to the relevant gateway
    or API responses, and the frontend renders it where it shows up.
  - **Effort:** S.

### 6.4 AFK / stalling detection

- **What:** Server-side timer detects no-action / rope-walking; auto-loss
  after threshold.
- **Today:** Unknown — backend internals not visible.
- **Tier:** T1
- **Tech Lead Notes:**
  - **No turn-timeout system exists in the engine.** The
    [`security.ts`](../../../../../lorcana-engine/src/core/runtime/security.ts)
    rate-limiter caps moves at 10/sec (move-spam protection), not turn
    duration. Clock state in
    [`runtime/types.ts:41`](../../../../../lorcana-engine/src/core/runtime/types.ts:41)
    is gameplay-internal, not wall-clock-bound.
  - Building this requires: per-turn `turnStartedAt` timestamp on the
    match state, a server-side timer that fires `forfeit-game` after
    the threshold, and a client rope/countdown UI. This is
    non-trivial — coordinate with engine team.
  - For launch, an explicit per-action timer is overkill; a "no move in
    180s = forfeit" rule covers 90% of the need.
  - **Effort:** L (engine changes), required for ranked credibility.

### 6.5 Per-account ranked rate limit

- **What:** Cooldown after a quick concede or a dodge; prevents farm/grief.
- **Today:** Not present (assumed; backend confirmation needed).
- **Tier:** T1
- **Tech Lead Notes:**
  - **No HTTP rate-limiting middleware in this repo.** SvelteKit hooks
    ([`hooks.server.ts`](../../../hooks.server.ts)) only resolve auth.
    Rate limits must live in the backend matchmaking service.
  - Confirm in §0.3: per-account RPS on `/v1/games/lorcana/play/matchmaking/join`
    and a queue-cooldown after an accept-window timeout.

### 6.6 Anti-dupe: one queue ticket / one ranked game per account

- **What:** Backend enforces single active ranked ticket and single active
  ranked game per account; reaps stale tickets.
- **Today:** Backend confirmation needed.
- **Tier:** T0
- **Tech Lead Notes:**
  - The gateway-ticket endpoint
    ([`fetch-ticket.ts:11–16`](../gateway/fetch-ticket.ts:11)) returns
    short-lived auth; today there's no visible enforcement that a user
    can't open two tabs and queue twice. **Confirm with backend** that
    `POST /v1/games/lorcana/play/matchmaking/join` returns 409 when a
    ranked ticket already exists for the user, and that the gateway
    rejects a second concurrent ranked game.
  - Frontend defense: surface "You're already in a ranked match" with a
    deep-link to resume. Without this UX the 409 looks like a bug.
  - **Effort:** S frontend / depends backend.

---

## Section 7 — Stats & Engagement

### 7.1 Personal stats dashboard

- **What:** Per-deck, per-archetype, per-matchup winrate. `fetchDeckRundown()`
  in `api/player-stats-api.ts:73` returns the data; needs a UI surface.
- **Today:** Data layer present; no surface in lobby/profile.
- **Tier:** T1
- **Tech Lead Notes:**
  - `fetchDeckRundown` returns a `DeckRundownResponse` with matchup data
    keyed by deck — already supports the dashboard. No backend work for
    v1; it's purely a Svelte page.
  - Place at `/matchmaking/(shell)/stats` or extend the profile page.
  - **Effort:** M (chart/table layout + filters).

### 7.2 Match history with full context

- **What:** Match row shows tier change, star delta, opponent deck color,
  replay link, MMR delta. Currently `ui/MatchRow.svelte:42` shows MMR delta
  and deck color; tier and replay missing.
- **Tier:** T1
- **Tech Lead Notes:**
  - Pure additive change to
    [`MatchRow.svelte`](../match-history/ui/MatchRow.svelte) gated on
    optional fields in `MatchSummary`. Pairs with 1.1 (tier badge), 1.2
    (stars delta), 5.3 (replay link). Land them together; don't ship
    in 3 PRs.
  - **Effort:** S.

### 7.3 Leaderboard widget on lobby

- **What:** Live top-50 widget with the player's rank highlighted.
- **Today:** `LeaderboardWidget.svelte` referenced but file not found in
  initial sweep — needs verification.
- **Tier:** T1
- **Tech Lead Notes:**
  - **The widget exists** at
    [`ui/LeaderboardWidget.svelte`](ui/LeaderboardWidget.svelte) and is
    fully functional (4 tabs, server-preloaded via
    [`server/load-matchmaking-data.ts:67–85`](server/load-matchmaking-data.ts:67)).
    First audit was wrong — verify in your evaluation.
  - For seasonal scoping, add a `?season=…` query param to
    [`leaderboard-api.ts:20–32`](api/leaderboard-api.ts:20); the widget
    needs no UI changes.
  - **Effort:** XS.

### 7.4 Ranked progress card on the lobby

- **What:** A persistent "Your season" card showing current tier, stars,
  next-tier progress, placements remaining.
- **Today:** Not present.
- **Tier:** T0
- **Tech Lead Notes:**
  - Composite of: tier badge (1.1), star bar (1.2), placements counter
    (2.1), season countdown (3.2), decay warning (2.4). Build last after
    its constituents are done; treat as the "integration test" surface.
  - Place in the existing left-column / sidebar layout — reuse
    `MatchmakingLeftColumn.svelte` patterns.
  - **Effort:** S (assuming inputs are ready).

---

## Section 8 — Testing & Observability

### 8.1 Ranked end-to-end test

- **What:** Test that exercises queue → match-found → game complete → tier
  / star update.
- **Today:** `state/matchmaking-queue.test.ts:91` passes
  `matchType: "ranked"` through but doesn't assert the gate or the
  post-match update.
- **Tier:** T0
- **Tech Lead Notes:**
  - Test runner is **Bun test**, not Vitest. Module mocking via
    `mock.module("../api/matchmaking-api.js", () => ({ joinMatchmakingQueue: mock(), … }))`
    — see existing pattern at
    [`matchmaking-queue.test.ts:1–32`](state/matchmaking-queue.test.ts:1).
  - For full E2E (UI through gateway), extend the existing **Playwright**
    suite at `/e2e/`. Today it boots a Vite dev server on `127.0.0.1:5174`;
    add a `ranked-flow.e2e.ts` that mocks the gateway via a fixture.
  - Cover both the gating (flag-off → tab disabled) and the happy path
    (flag-on → queue → match → post-game delta).
  - **Effort:** M.

### 8.2 Flag-on / flag-off branch coverage

- **What:** `useMatchmakingLobbyController.test.ts` covers both flag states.
- **Tier:** T0
- **Tech Lead Notes:**
  - Pair with 0.1 — write the flag-on/off tests when the flag is
    introduced; don't bolt on later.
  - **Effort:** S.

### 8.3 Two-account staging smoke

- **What:** Manual procedure: two accounts, queue together, complete a
  ranked game, verify mmrBefore/mmrAfter, leaderboard update, match
  history filter.
- **Tier:** T0
- **Tech Lead Notes:**
  - Document as a runbook, not just a tribal-knowledge step. Owner: QA.

### 8.4 Load test

- **What:** N synthetic tickets to validate pairing latency at launch
  traffic.
- **Tier:** T1
- **Tech Lead Notes:**
  - Playwright is the wrong tool. Use **k6** or Artillery against the
    backend's `/v1/games/lorcana/play/matchmaking/join`. Out of scope for
    this repo; coordinate with backend team.

### 8.5 Dashboards / alerts

- **What:** Queue depth, p50/p95 wait, match-find success, concede rate,
  reconnect rate, MMR distribution drift, server error rate on the join
  endpoint scoped to `matchType=ranked`.
- **Tier:** T0
- **Tech Lead Notes:**
  - **Today the only client telemetry is GA4** — fine for funnel metrics,
    weak for ops alerting. Server-side dashboards (queue depth, etc.) live
    in the backend and are out of this repo's scope; confirm they exist
    before launch.
  - **Strong recommendation: add Sentry (`@sentry/sveltekit`)** before
    launch. Today there is no exception reporting — gateway reconnect
    failures, ticket parse errors, post-game route bugs all silently
    no-op. For a ranked launch we cannot fly blind. Sentry is a one-day
    integration; do it.
  - Add a `request-id` header pass-through in
    [`hooks.server.ts`](../../../hooks.server.ts) so SvelteKit logs can
    be correlated with backend logs.
  - **Effort:** S (Sentry) / depends backend (dashboards).

---

## Section 9 — Launch Operations

### 9.1 Rollout plan

- **What:** Dark launch (employees) → staged % → full open. Defined success
  / rollback criteria.
- **Tier:** T0
- **Tech Lead Notes:**
  - The percent-rollout dial belongs on the same flag from §0.1 — don't
    rebuild rollout infra separately.
  - Define quantitative rollback triggers (e.g. >5% gateway reconnect
    rate, p95 queue time >120s, exception-rate spike) so the on-call
    decision is mechanical, not political.

### 9.2 Rollback runbook

- **What:** Who flips 0.1's flag, where, how the team is notified.
- **Tier:** T0
- **Tech Lead Notes:**
  - Document the flag's storage location and the exact command/console
    URL. "I'll figure it out at 2am" is not a runbook.

### 9.3 Comms

- **What:** In-app announcement, changelog entry, season page copy aligned
  with launch state. If any reward promises remain, they must match
  fulfillment status from 3.3.
- **Tier:** T0
- **Tech Lead Notes:**
  - The lobby has a `bulletin.md` content surface
    ([`content/bulletin.md`](content/bulletin.md)) and
    `right-column-content.ts`
    ([`content/right-column-content.ts`](content/right-column-content.ts))
    — both are checked in. Update both as part of the launch PR, not as a
    follow-up.
  - **Hard rule:** if §3.3 is rewritten to "leaderboard glory only",
    cross-check the season page copy _and_ the bulletin _and_ any
    push/email comms before flipping the flag. Misaligned copy is the
    biggest preventable PR risk.

---

## Quick reference: T0 items only (must close before public launch)

0.1 Feature flag · 0.2 "Coming soon" copy · 0.3 Backend contract ·
0.4 Kill switch · 0.5 Analytics ·
1.1 Tier ladder · 1.2 Stars/pips · 1.3 Rank floors ·
2.1 Placements · 2.2 Hidden MMR posture ·
3.1 Real season state · 3.2 Countdown · 3.3 Reward fulfillment (or copy
rewrite) ·
4.1 Tier-up celebration · 4.2 Post-game delta · 4.3 Surrender warning ·
4.5 Reconnect grace UI · 4.6 First-time onboarding ·
6.1 Report flow · 6.6 Anti-dupe ·
7.4 Season progress card ·
8.1 E2E test · 8.2 Flag coverage · 8.3 Staging smoke · 8.5 Dashboards ·
9.1 Rollout plan · 9.2 Rollback · 9.3 Comms

**Count: 27 T0 items.**

---

## Tech-lead summary: top 10 things to internalize

1. **The big work isn't here.** Ratings, queue, leaderboard ranking,
   reward fulfillment, AFK detection, rate limiting — all live in
   external services. This repo is the UI + a thin API client. Frame
   estimates accordingly.
2. **No feature-flag system exists.** Every gradual-rollout, kill-switch,
   and dark-launch concern collapses to building one (§0.1). Do this
   first; everything else depends on it.
3. **No reward / inventory / cosmetic infrastructure exists.** The
   season page promises booster boxes; nothing fulfills them. Strongly
   recommend rewriting the copy for S1 (§3.3) and deferring the system
   to S2 — it is L–XL work otherwise.
4. **The tier system needs a shared package.** `mmr → tier` mapping must
   not diverge between FE and BE. Put the enum + thresholds in
   `packages/shared` (or a new ranked-specific package) before either
   side starts coding to it.
5. **The gateway `matchInfo` payload is the right extension point** for
   per-match deltas (§1.2, §4.1, §4.2). One backend change; covers
   three frontend features cleanly.
6. **There is no post-game screen component yet.** Match end is a toast
   and a navigation. We are building this surface from scratch (§4.2);
   plan a real component, not a modal hack.
7. **The chat-emote infra is mostly already there** — preset chat works
   over the gateway today (§5.2). Reuse it; don't build a parallel
   "emote" pipeline.
8. **No exception reporting today.** Add Sentry before launch (§8.5).
   One day of work; non-negotiable for a flagship feature.
9. **`sportsmanshipTier` is an orphaned field.** The leaderboard for it
   exists but nothing writes the score (§6.1). Plan for the full input
   pipeline or rename the leaderboard.
10. **Tests are Bun, not Vitest. E2E is Playwright.** Don't reach for
    Vitest patterns; the existing harness has its own idioms — see
    `state/matchmaking-queue.test.ts` for the canonical example.

---

## Engineer evaluation form (please fill in per item)

| Item | Estimate (S/M/L/XL) | Team(s) | Dependencies | Open questions |
| ---- | ------------------- | ------- | ------------ | -------------- |
| 0.1  |                     |         |              |                |
| 0.2  |                     |         |              |                |
| 0.3  |                     |         |              |                |
| 0.4  |                     |         |              |                |
| 0.5  |                     |         |              |                |
| 1.1  |                     |         |              |                |
| 1.2  |                     |         |              |                |
| 1.3  |                     |         |              |                |
| 1.4  |                     |         |              |                |
| 1.5  |                     |         |              |                |
| 1.6  |                     |         |              |                |
| 2.1  |                     |         |              |                |
| 2.2  |                     |         |              |                |
| 2.3  |                     |         |              |                |
| 2.4  |                     |         |              |                |
| 2.5  |                     |         |              |                |
| 3.1  |                     |         |              |                |
| 3.2  |                     |         |              |                |
| 3.3  |                     |         |              |                |
| 3.4  |                     |         |              |                |
| 3.5  |                     |         |              |                |
| 3.6  |                     |         |              |                |
| 4.1  |                     |         |              |                |
| 4.2  |                     |         |              |                |
| 4.3  |                     |         |              |                |
| 4.4  |                     |         |              |                |
| 4.5  |                     |         |              |                |
| 4.6  |                     |         |              |                |
| 4.7  |                     |         |              |                |
| 5.1  |                     |         |              |                |
| 5.2  |                     |         |              |                |
| 5.3  |                     |         |              |                |
| 5.4  |                     |         |              |                |
| 5.5  |                     |         |              |                |
| 5.6  |                     |         |              |                |
| 6.1  |                     |         |              |                |
| 6.2  |                     |         |              |                |
| 6.3  |                     |         |              |                |
| 6.4  |                     |         |              |                |
| 6.5  |                     |         |              |                |
| 6.6  |                     |         |              |                |
| 7.1  |                     |         |              |                |
| 7.2  |                     |         |              |                |
| 7.3  |                     |         |              |                |
| 7.4  |                     |         |              |                |
| 8.1  |                     |         |              |                |
| 8.2  |                     |         |              |                |
| 8.3  |                     |         |              |                |
| 8.4  |                     |         |              |                |
| 8.5  |                     |         |              |                |
| 9.1  |                     |         |              |                |
| 9.2  |                     |         |              |                |
| 9.3  |                     |         |              |                |
