# Ranked Matchmaking — Production Readiness Checklist

## Context

A launch of Ranked matchmaking is being considered for tomorrow. An audit of the
`lorcana-simulator` package shows the feature is wired at the API contract and
UI-rendering level, but is **explicitly gated off** in code and ships with
"coming soon" copy. A second pass confirmed that the match-result → rating
update path is server-authoritative (via the realtime gateway), so the rating
math is not a client concern — but several other production concerns are real
and must be cleared before flipping the switch.

This checklist captures every item I believe needs to be verified or shipped
before Ranked can go live, grouped so it can drive both engineering work and a
go/no-go conversation with backend owners.

---

## Locked decisions (answered by product)

These supersede earlier recommendations in this doc. Where the prior text
recommended a different option, the locked answer wins.

| ID    | Decision                          | Answer                                                                                    | Affects                                                             |
| ----- | --------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| DEC-1 | Soft-launch vs full-season launch | **Full Season 1 launch**                                                                  | Sprint shape, Part II Phase A/B/C, §3.5 rank reveal becomes T0      |
| DEC-2 | Reward fulfillment posture        | **Manual handover** — copy stays, ops team delivers prizes by hand                        | §3.3 reward task collapses from XL→S/M, but adds new ops-side tasks |
| DEC-3 | Tier ladder shape                 | **Generic names, 7 tiers** (e.g. Bronze, Silver, Gold, Platinum, Diamond, Master, Legend) | §1.1 unblocked; art brief simplified                                |
| DEC-4 | Hidden-MMR posture                | **Dual display** — tier + stars are primary; numeric MMR / percentile shown at top tier   | §2.2 changes; §1.1 surfaces secondary number                        |
| DEC-5 | Region / queue sharding           | **Single global queue, no splits**                                                        | §2.5 closed; `region` field stays unread                            |

### Implications worth calling out

**DEC-1 (full launch) raises the bar.** The earlier "Soft launch / Preseason"
phasing in Part II is no longer the recommendation. Specifically:

- §3.5 (end-of-season rank reveal) is now **T0** — without it, the launch's
  payoff moment is missing.
- §3.6 (season-end re-engagement push) is closer to T0 than T1; an in-app
  banner + email at T-72h is now strongly recommended for the first season.
- The 4-sprint shape in `RANKED_LAUNCH_TASKS.md` likely stretches; engineering
  should re-estimate against the full-launch bar before commit.

**DEC-2 (manual fulfillment) is a major estimate shift, with caveats.**

- We **save the L–XL "reward fulfillment pipeline"** task entirely. No claim
  endpoint, no inventory persistence, no automated payout job.
- We still owe the player something at season end: an in-app "you finished
  Diamond — your prize will be shipped within X weeks" confirmation, plus a
  **mailing-address / contact collection** flow (likely at season end so we
  only collect from prize-eligible players).
- Backend needs an **ops-only export** of "rank-eligible players + contact
  info" so the team has a working doc for fulfillment.
- The current marketing copy on `routes/matchmaking/(shell)/season/wilds-unknown/+page.svelte`
  must add **fine print on manual fulfillment timing**, prize-availability
  terms, and likely a TOS link. Don't ship the page without legal review.
- Customer-support workflow needs to exist before launch: "I didn't get my
  prize" tickets are inevitable. Owner: ops/community.

**DEC-3 (generic 7 tiers).** Use a standard ladder shape:

1. Bronze · 2. Silver · 3. Gold · 4. Platinum · 5. Diamond · 6. Master · 7. Legend
   (Final names are product's call; art treatment can be Lorcana-themed even with
   generic names.) Suggested division count: 3 per tier (Bronze III → Bronze I)
   with 5 stars per division — Marvel-Snap-ish cadence. **Top tier (Legend) is a
   numbered leaderboard** (per DEC-4), so decay (§2.4) becomes T0 to keep it
   fresh.

**DEC-4 (dual display).** §2.2's "hide MMR by default" recommendation does NOT
apply. Instead:

- Tiers + stars are the primary, ever-visible chase.
- Numeric MMR is shown as a secondary line on the lobby card and post-game
  delta — same plumbing as today, just demoted in visual hierarchy.
- At top tier (Legend), the player's leaderboard rank is shown as the primary
  number ("Legend #312") — this is the §2.4 (decay) and §3.5 (rank reveal)
  payoff surface.

**DEC-5 (single global queue).** No queue-sharding or region work. The
existing nullable `region` field on
[`account-settings-api.ts`](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/api/account-settings-api.ts)
stays unread; document the choice so we don't accidentally rely on it later
(`RANK-202` in tasks file). Re-evaluate at 5k+ concurrent ranked players.

### New open questions raised by DEC-2 (manual fulfillment)

These are product/ops-side, not engineering-blocking, but should be answered
before launch comms go out:

1. **When do we collect mailing addresses?** Recommend at season-end, only
   from prize-eligible players, to minimize PII handling.
2. **What's the SLA for manual prize delivery?** "Within 8 weeks" is the
   industry-low bar; bake into the copy and TOS.
3. **Who owns the manual-fulfillment ops process?** Community / support /
   ops team — needs a named owner before launch.
4. **What happens if a prize is unavailable** (sold-out, region-restricted)?
   Substitute, currency, or skip? Document before season ends, not during.
5. **Legal review of the prize terms** — required before ship.

This is a **plan**, not a prescription to implement everything tomorrow. Items
marked **BLOCKER** must clear before launch. **STRONG** are launch-quality
asks; skipping them ships real risk. **NICE** are post-launch polish.

---

## Critical files (frontend, in this repo)

- [useMatchmakingLobbyController.svelte.ts:847](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/ui/useMatchmakingLobbyController.svelte.ts:847) — hardcoded ranked early-return
- [MatchmakingQueueCard.svelte:121](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/ui/MatchmakingQueueCard.svelte:121) — `rankedComingSoon` tooltip
- [MatchmakingQueueCard.svelte:728](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/ui/MatchmakingQueueCard.svelte:728) — MMR badge render
- [matchmaking-api.ts:21](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/api/matchmaking-api.ts:21) — `MatchmakingJoinParams.matchType`
- [matchmaking-queue.svelte.ts](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/state/matchmaking-queue.svelte.ts) — queue state machine
- [lobby-room.svelte.ts:455](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/state/lobby-room.svelte.ts:455) — match_found handler / `saveRankedMatchSession`
- [practice-match-storage.ts:79](packages/lorcana/lorcana-simulator/src/lib/features/practice-match/practice-match-storage.ts:79) — `saveRankedMatchSession`
- [leaderboard-api.ts](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/api/leaderboard-api.ts) — leaderboard fetch
- [load-matchmaking-data.ts](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/server/load-matchmaking-data.ts) — server-side preload
- [routes/matchmaking/(shell)/season/[seasonSlug]/+page.svelte](<packages/lorcana/lorcana-simulator/src/routes/matchmaking/(shell)/season/>) — season page
- i18n: search the simulator's messages files for `rankedComingSoon`, `rankedBadge`, `engagement.mode.ranked`

---

## 1. Backend contract verification — must confirm with backend owners

These cannot be answered from this repo alone. Get a **written yes** for each
before shipping.

- [ ] **BLOCKER** — `/v1/games/lorcana/play/matchmaking/join` accepts and
      honors `matchType: "ranked"` (separate queue, not aliased to casual).
- [ ] **BLOCKER** — Server actually computes and persists `mmrBefore` /
      `mmrAfter` on match completion (the values surfaced in
      `match-history/types.ts`). Confirm the rating algorithm
      (Elo / Glicko-2 / TrueSkill), starting MMR, K-factor or volatility,
      and draw handling.
- [ ] **BLOCKER** — Server handles abandonment / disconnect / surrender for
      ranked: which player loses MMR, what timeouts apply, and whether
      reconnects within window are allowed.
- [ ] **BLOCKER** — `/v1/leaderboards/lorcana/{type}` is updated on match
      completion (not stale snapshots) and is paginated/cached sensibly for
      launch traffic.
- [ ] **STRONG** — Per-account ranked rate limit / queue-cooldown after a
      dodge or a quick concede (prevents farm/grief).
- [ ] **STRONG** — Deck legality and format check happens server-side at
      ticket creation (don't trust the client lobby validator alone).
- [ ] **STRONG** — Anti-dupe: one active ranked queue ticket per account, and
      one in-progress ranked match per account. Stale tickets are reaped.
- [ ] **NICE** — Smurf/seeding logic for new accounts (placement matches or
      uncertainty-weighted rating).

## 2. Seasons — currently a static page, needs real infra

- [ ] **BLOCKER** — Decide: are we launching with a real season, or with
      Ranked permanently on without a season concept? If "with a season",
      the [season/[seasonSlug]/+page.svelte](<packages/lorcana/lorcana-simulator/src/routes/matchmaking/(shell)/season/>) loader (currently
      hardcoded to `wilds-unknown`) must read from a real seasons source
      with start/end timestamps.
- [ ] **BLOCKER** (if season-based) — Backend has a `seasons` table, a
      defined first-season window, an end-of-season reset job, and a
      snapshot mechanism for end-of-season leaderboard.
- [ ] **STRONG** — Player-facing copy on season page reflects the _real_
      first-season window, prizes, and dates. The current page is hardcoded
      marketing HTML — every claim it makes is a commitment.
- [ ] **NICE** — `currentSeason`, `placementRank`, `seasonResetAt` on the
      player profile / fetchPlayerStats response so the UI can show
      pre-/post-reset state.

## 3. Frontend code changes (this repo)

- [ ] **BLOCKER** — Replace the hardcoded gate at
      [useMatchmakingLobbyController.svelte.ts:847](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/ui/useMatchmakingLobbyController.svelte.ts:847)
      with a runtime feature flag (env or remote config), not just a
      deletion. Default the flag **off** in production until launch is
      confirmed; ungate via config flip, not a redeploy.
- [ ] **BLOCKER** — Remove the `RANKED_TOOLTIP_TEXT` "coming soon" tooltip
      and the dimmed/disabled visual state on the Ranked tab in
      [MatchmakingQueueCard.svelte](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/ui/MatchmakingQueueCard.svelte) — they must respect the same flag.
- [ ] **STRONG** — Verify `selectedMatchType` default. Today it's read from
      persisted state; confirm it cannot be hydrated to `"ranked"` for a
      user whose flag is off (regression seam during gradual rollout).
- [ ] **STRONG** — Surface the server-returned MMR delta on the post-game
      screen, not just on the next match-history page reload. Today
      [lobby-room.svelte.ts:455](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/state/lobby-room.svelte.ts:455)
      stores only metadata locally; the post-game UI should show
      `mmrBefore → mmrAfter` from the server's match-info payload.
- [ ] **STRONG** — Error states for ranked-only failures: deck illegal for
      ranked, account ineligible (e.g. unverified / banned / placement
      pending), regional queue empty / long ETA. Casual today silently
      succeeds; Ranked needs explicit messages.
- [ ] **NICE** — Tighten queue-stats partitioning: confirm
      [queue-stats-api.ts](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/api/queue-stats-api.ts) and
      `LiveMatchesTable` filter `ranked` correctly when the queue is hot.

## 4. Content / i18n

- [ ] **BLOCKER** — Replace `sim.matchmaking.matchmaking.rankedComingSoon`
      with launch copy across **every** locale file (`en`, `de`, `es`, `it`,
      `pt-br`). Either repurpose the key or remove its callsites — do not
      ship a locale where the tooltip still says "coming soon".
- [ ] **STRONG** — Audit `engagement.mode.ranked` and any other ranked copy
      keys for placeholder text.
- [ ] **STRONG** — Bulletin / right-column-content review: any "coming
      soon" mentions on the lobby need updating.

## 5. Anti-abuse / safety (frontend surface)

- [ ] **STRONG** — Confirm with backend that surrender / concede on a ranked
      game is treated as a loss with full MMR penalty; show this in the
      concede confirmation dialog so users are warned.
- [ ] **STRONG** — Disable deck-edit while a ranked queue ticket is active
      or a ranked match is in progress (prevent post-match-find swap
      tricks). Should already be the case for casual; verify it holds.
- [ ] **NICE** — Report-player flow exists for ranked games (sportsmanship
      leaderboard exists per leaderboard-api types, so plumbing likely
      partial).

## 6. Observability & kill switch

- [ ] **BLOCKER** — Kill switch: the runtime flag from §3 must be flippable
      without a deploy. Validate on staging that flipping it off mid-session
      gracefully returns users to casual selection without breaking active
      tickets.
- [ ] **STRONG** — Analytics: confirm `selectedMatchType` is on every queue
      / match-found / match-completed event. Spot-check via
      `packages/lorcana/lorcana-simulator/src/lib/analytics/types.ts`.
- [ ] **STRONG** — Dashboards/alerts for: ranked queue depth, average wait
      time, MMR distribution drift, concede rate, server-side error rate on
      the join endpoint with `matchType=ranked`.

## 7. Testing

- [ ] **BLOCKER** — Add an end-to-end test that exercises ranked join →
      match found → game complete → MMR badge updates. The current
      [matchmaking-queue.test.ts:91](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/state/matchmaking-queue.test.ts:91)
      passes `matchType: "ranked"` through but never asserts the gate or
      the post-match update.
- [ ] **STRONG** — Update
      [useMatchmakingLobbyController.test.ts](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/ui/useMatchmakingLobbyController.test.ts)
      to cover both flag-on and flag-off branches of `selectMatchType`.
- [ ] **STRONG** — Manual smoke on staging by two test accounts: queue
      together, complete a ranked game, verify both see correct
      `mmrBefore`/`mmrAfter`, leaderboard reflects the result, match
      history filter "Ranked" includes it.
- [ ] **NICE** — Load test ranked queue with N synthetic tickets to confirm
      backend pairing latency and queue-stats update frequency.

## 8. Launch runbook (day-of)

- [ ] **BLOCKER** — Decide rollout shape: dark launch (flag on for
      employees), staged % rollout, or full open. Document the rollback
      criteria (queue-error rate, MMR distribution sanity, p50 wait time).
- [ ] **BLOCKER** — Rollback plan: who flips the flag, where, and how is it
      announced if we abort.
- [ ] **STRONG** — Pre-warm leaderboard cache / season state if applicable.
- [ ] **STRONG** — Comms: changelog, in-app notice, and the season page
      (§2) all match the launch state.

---

## Verification (end-to-end)

To confirm Ranked is actually working in staging before flipping prod:

1. Start the simulator: `pnpm --filter lorcana-simulator dev`. Sign in as
   account A.
2. Force the ranked feature flag on for account A.
3. Open `/matchmaking`, click the Ranked tab. Confirm: tab is enabled, no
   "coming soon" tooltip, MMR badge shows a value (or initial seed).
4. In a second browser, sign in as account B with the same flag.
5. Both queue Ranked at the same time. Verify: matchmaking-queue state
   advances through `searching → found → accepted → in-game`; the
   `match_found` payload arrives over the gateway; `saveRankedMatchSession`
   fires (visible in console logs around
   [lobby-room.svelte.ts:455](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/state/lobby-room.svelte.ts:455)).
6. Play to completion. On post-game, confirm:
   - The match shows up in match history with `matchType: "ranked"` and
     non-null `mmrBefore` / `mmrAfter`.
   - The MMR badge on the lobby reflects the new rating after refresh
     (and ideally without — see §3).
   - The leaderboard widget reflects the result for the higher-ranked
     account if it's in range.
7. Concede a second match from account B. Verify the loss is recorded and
   the MMR delta is asymmetric (penalty for surrender).
8. Flip the flag off for account A. Verify on next reload the Ranked tab
   returns to its disabled state and any in-flight ticket is handled
   gracefully.
9. Run `pnpm --filter lorcana-simulator test` and confirm the new ranked
   E2E test from §7 passes.

If any step fails, ranked is not ready.

---

# Part II — Product Parity Brief (PM lens)

## Executive recommendation

The engineering checklist above asks _can we technically ship Ranked?_ This
section asks _is what we'd ship actually a Ranked experience worth playing?_

Short answer: **no, not yet.** What exists today is a **data-collection layer**
(MMR, win-streaks, leaderboards, sportsmanship score) wrapped in a casual
queue UI. It is missing nearly every feature that turns "matches with hidden
rating" into a Ranked **product** — tiers, progression rewards, season
structure, promotion celebrations, end-of-season payoff.

If we launch tomorrow as-is, players will see a "Ranked" tab that visually
resembles Casual with an MMR number. There is no progression to chase, no
seasonal stakes, no reward at the end, no social texture, no anti-toxicity
loop. Engagement will be driven by intrinsic competitiveness only — which in
2026 CCG benchmarks underperforms Casual within ~2 weeks.

**Recommendation: delay to a Soft Launch + Season 1 model** described below.
Ship the table-stakes set on day one; commit publicly to the Season 1 set
within ~6 weeks; treat differentiators as Season 2+.

## Reference: 2026 CCG ladder table-stakes

What competing products treat as the **minimum** for a ranked launch (sources:
Hearthstone Standard, MTG Arena Bo1 ladder, Marvel Snap, Legends of
Runeterra):

1. Visible **tier ladder** with named ranks and icons (Bronze→…→Legend/Mythic).
2. **Stars/pips** within a tier giving moment-to-moment progression feedback.
3. **Rank floors** so players don't yo-yo (huge retention lever).
4. **Win-streak bonuses** at low tiers (smurf-friendly _and_ casual-friendly).
5. **Placement matches** (5–10) for first-time ranked players each season.
6. **Season window** with start/end dates and a visible **countdown**.
7. **End-of-season reward** tied to peak rank (cosmetic + currency).
8. **Soft reset** at season start (drop a few tiers, not back to zero).
9. **Tier-up celebration** moment — animation + sound, ~2 seconds.
10. **MMR/rank delta on post-game screen** (not just buried in match history).
11. **Surrender warning** that calls out the MMR penalty for ranked.
12. **Report / mute** flow with at least the back-end queue.
13. **Reconnect grace window** with a visible timer.

## Parity gap matrix

Tier legend:

- **T0** Table-stakes — without it, this isn't a Ranked product.
- **T1** Competitive — peers all ship this; absence is felt within a week.
- **T2** Differentiator — earns press, retention, or word-of-mouth.

| #   | Feature                                         | Today   | Tier   | Notes                                                                                                                                                                                                                                                                                     |
| --- | ----------------------------------------------- | ------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Named tiers / divisions with icons              | MISSING | **T0** | `PlayerStats.bracket` is a nullable string with no enum or visual mapping. We need a defined ladder (e.g. Apprentice → Storyweaver → Illumineer → Archivist → Legend) with art.                                                                                                           |
| 2   | Stars/pips within tier                          | MISSING | **T0** | Ladder progression is illegible without per-match feedback.                                                                                                                                                                                                                               |
| 3   | Rank floors                                     | MISSING | **T0** | Single biggest retention lever in HS-style ladders.                                                                                                                                                                                                                                       |
| 4   | Promotion / demotion series                     | MISSING | T1     | Optional; some games skip in favor of pure stars.                                                                                                                                                                                                                                         |
| 5   | Win-streak bonus                                | PARTIAL | T1     | Streak tracked (`PlayerStats.currentWinStreak`, [`MatchmakingQueueCard.svelte:72`](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/ui/MatchmakingQueueCard.svelte:72)) but no MMR/star multiplier behavior tied to it.                                                    |
| 6   | Loss-streak / bad-luck protection               | MISSING | T1     | Not in `PlayerStats`. Important for bottom-of-ladder retention.                                                                                                                                                                                                                           |
| 7   | Placement matches                               | MISSING | **T0** | `onboardPlayer()` exists ([`player-context-api.ts:239`](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/api/player-context-api.ts:239)) but no placement state. Needed to avoid 1500-MMR seeded players steamrolling brand-new opponents.                                 |
| 8   | Hidden MMR vs visible rank separation           | PARTIAL | **T0** | Today only one number is shown. Best-in-class hides MMR and shows only the tier ladder; MMR is the matchmaker's job.                                                                                                                                                                      |
| 9   | Decay for inactive top players                  | MISSING | T1     | Required to keep the leaderboard alive past week 2.                                                                                                                                                                                                                                       |
| 10  | Season countdown UI                             | PARTIAL | **T0** | Static season page has hardcoded dates ([`routes/matchmaking/(shell)/season/[seasonSlug]/+page.svelte`](<packages/lorcana/lorcana-simulator/src/routes/matchmaking/(shell)/season/>)); no countdown widget, no live state.                                                                |
| 11  | End-of-season reward delivery                   | PARTIAL | **T0** | Marketing copy promises booster boxes & Illumineer's Trove ([`+page.svelte:87`](<packages/lorcana/lorcana-simulator/src/routes/matchmaking/(shell)/season/wilds-unknown/+page.svelte:87>)). **No backend reward flow.** Shipping with this copy and no fulfillment is a credibility risk. |
| 12  | Soft-reset visualization                        | MISSING | T1     | Players must understand why their rank dropped on day 1 of a season.                                                                                                                                                                                                                      |
| 13  | End-of-season rank reveal                       | MISSING | T1     | The single most-screenshotted moment in modern ladders.                                                                                                                                                                                                                                   |
| 14  | Tier-up celebration                             | MISSING | **T0** | Without this, progression feels like a number going up.                                                                                                                                                                                                                                   |
| 15  | Streak indicator on lobby                       | PARTIAL | T1     | Win-streak badge present; loss-streak intentionally hidden is fine.                                                                                                                                                                                                                       |
| 16  | MMR/rank delta on post-game                     | PARTIAL | **T0** | Visible on next match-history reload; needs to be on the post-game screen itself. See Part I §3.                                                                                                                                                                                          |
| 17  | Accept window UX                                | PARTIAL | T1     | 15s window in [`matchmaking-queue.svelte.ts`](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/state/matchmaking-queue.svelte.ts); no dodge-penalty messaging.                                                                                                             |
| 18  | Ranked-specific surrender warning               | MISSING | **T0** | Generic forfeit dialog today. Must call out MMR/star loss.                                                                                                                                                                                                                                |
| 19  | Friend / direct challenge                       | MISSING | T2     | Already strong product backlog; not a launch ask.                                                                                                                                                                                                                                         |
| 20  | Spectate top-ranked                             | MISSING | T2     | Spectator infra exists; not blocking.                                                                                                                                                                                                                                                     |
| 21  | Post-game emote / GG                            | MISSING | T1     | Light personality goes a long way.                                                                                                                                                                                                                                                        |
| 22  | Opponent rank display                           | MISSING | T1     | Pre-game tier badge increases stakes meaningfully.                                                                                                                                                                                                                                        |
| 23  | Replay tied to ranked match                     | PARTIAL | T1     | Replay system exists; needs explicit linkage from match history.                                                                                                                                                                                                                          |
| 24  | Report / mute flow                              | MISSING | **T0** | `sportsmanshipTier` field exists with no UI to feed it. Launching ranked without a report path is a moderation liability.                                                                                                                                                                 |
| 25  | Concede / dodge penalty visibility              | MISSING | T1     | Pairs with #18.                                                                                                                                                                                                                                                                           |
| 26  | Reconnect grace UI                              | MISSING | **T0** | Disconnect = ranked loss is the worst possible new-player experience without a visible reconnect timer.                                                                                                                                                                                   |
| 27  | Personal stats dashboard                        | PARTIAL | T1     | `fetchDeckRundown()` ([`player-stats-api.ts:73`](packages/lorcana/lorcana-simulator/src/lib/features/matchmaking/api/player-stats-api.ts:73)) returns matchup data; needs a surface in the UI.                                                                                            |
| 28  | Match history w/ replay + delta + opponent deck | PARTIAL | T1     | `MatchRow.svelte` shows delta and deck color; replay link unconfirmed.                                                                                                                                                                                                                    |
| 29  | Daily quests tied to ranked                     | MISSING | T2     | `MatchmakingEngagementState` exists; not blocking.                                                                                                                                                                                                                                        |
| 30  | Season-end re-engagement push                   | MISSING | T1     | "Season ends in 3 days" notification doubles last-week activity in peer products.                                                                                                                                                                                                         |
| 31  | First-time-ranked onboarding modal              | MISSING | **T0** | One-time "here's how Ranked works, here are the rewards, here's the season window" splash. Cheap; high-impact.                                                                                                                                                                            |
| 32  | Format / deck-legality lobby explanation        | PARTIAL | T1     | Validator exists; surface the rules pre-queue.                                                                                                                                                                                                                                            |

**T0 gaps (must close before any public launch): 11.**
T1 gaps (close within Season 1): 12. T2 (Season 2+): 4.

## Phased rollout proposal

### Phase A — Soft launch ("Preseason"), week 0

Goal: real ranked queue with credible bones, no big promises.

- All Part I engineering blockers cleared.
- T0 gaps 1, 2, 3, 7, 14, 16, 18, 24, 26, 31 closed (tiers + pips + floors,
  placements, tier-up moment, post-game delta, surrender warning, report
  flow, reconnect UI, FTUE modal).
- T0 gap 10/11 handled by **scoping down the season page**: drop the
  reward-promise copy, frame this window as a "Preseason" with
  leaderboard-only bragging rights. This eliminates the credibility risk of
  promising rewards we haven't built fulfillment for.
- Hidden MMR shown only in a `?debug` view; player-facing UI shows tiers.

### Phase B — Season 1, week ~6

Goal: the first "real" season with rewards and end-of-season payoff.

- T0 gaps 11 (rewards backend), 13 (rank reveal screen).
- T1 gaps: decay (#9), soft-reset visualization (#12), opponent rank (#22),
  emotes (#21), season-end push (#30), stats dashboard surface (#27),
  ranked-replay linking (#23).
- Win-streak bonus behavior wired (#5).

### Phase C — Season 2+, ongoing

- Friend challenges (#19), spectate-top (#20), daily quests (#29),
  promotion series (#4), bad-luck protection (#6).

## Top engagement risks if we ship as-is

1. **No progression chase.** A bare MMR number is not a goal. Day-7 retention
   for ranked-only-by-numbers is historically ~40–60% of tiered ladders.
2. **Marketing copy that overpromises.** The hardcoded season page advertises
   booster boxes and Illumineer's Trove rewards we can't deliver. Either ship
   the fulfillment or rewrite the copy. Do not ship the copy with no
   fulfillment.
3. **No moderation surface.** Sportsmanship leaderboard implies player
   reporting drives it; with no report UI, the leaderboard is decorative and
   the toxicity loop is unmitigated.
4. **First-loss attrition.** New players who lose a placement match with no
   tier visualization, no rank floor, and no FTUE will churn from Ranked
   permanently.
5. **Disconnect = losses with no recourse.** Without a reconnect timer UI,
   any network blip on mobile/wifi feels like the system stole MMR. This
   generates support tickets at a predictable rate (~2–4% of matches).

## Decisions needed from leadership

1. **Soft launch vs full season launch?** My strong recommendation is soft.
2. **Reward promise scope.** Keep marketing the booster-box rewards and
   commit to building fulfillment by Season 1 end, or rewrite the season
   page now to "leaderboard glory only"? Pick before any external comms.
3. **Tier theme.** We need a Lorcana-flavored tier naming scheme + art brief
   (Apprentice → Storyweaver → Illumineer → Archivist → Legend, or similar)
   committed before art can start. Lead time is the longest pole.
4. **Hidden MMR posture.** Hide MMR entirely (HS/Snap), expose it as a
   second number (MTGA Mythic %), or keep the current "MMR is the rank"
   model? Affects #1, #8, #16.
5. **Region / cross-region matchmaking.** Not in this audit but worth
   confirming: do we have one global queue, and is that the intended UX?

Once 1–4 are answered, I can convert the matrix above into an explicit
sprint plan with art / eng / copy / backend lanes.
