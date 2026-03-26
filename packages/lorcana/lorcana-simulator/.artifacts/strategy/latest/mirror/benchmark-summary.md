# Strategy Lab Benchmark Summary

## Run Metadata
- Generated at: 2026-03-22T14:44:45.711Z
- Preset: custom
- Mode: mirror
- Shared game count fallback: 1
- Mirror games per pairing: 1
- Cross-deck games per pairing: 1
- Total matches: 12
- Baseline strategy: default-lore-race
- Decks: amber-amethyst-aggressive, steel-sapphire-midrange
- Strategies: aggressive-board-control-lore-race, board-control-lore-race, default-lore-race
- Match classifications: mirror 12, mirror-same-strategy 0, cross-deck 0

## Candidate Scorecards
| Candidate | Status | Parent | Blended | Mirror | Cross-Deck | Deadlock/Fallback Penalty | Diagnostic Penalty | Delta Vs Baseline | Gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| board-control-lore-race | candidate | default-lore-race | -48.7875 | 0.3750 | 0.0000 | 18.3750 | 471.3750 | -5.2250 | hold |
| aggressive-board-control-lore-race | draft | board-control-lore-race | -55.7250 | 0.5000 | 0.0000 | 17.7500 | 542.0000 | -12.1625 | hold |
- board-control-lore-race: Board-control lore racing should gain mirror equity by contesting opposing lore engines earlier without collapsing tempo.
- heuristics: Prefer banishing challenges over questing when the challenge cuts meaningful opposing lore pressure.; Prefer board-developing plays over inking when the play uses current ink and keeps branching bounded.
- promotion gate: Blended score did not improve by at least 0.02. Mirror win rate regressed by more than 0.01. Fallback count increased by more than 5%. Diagnostic count increased by more than 5%.
- aggressive-board-control-lore-race: An aggressive board-control variant should outperform the current board-control profile in threat-dense mirrors by cashing in more value trades before the opponent snowballs lore.
- heuristics: Reuse the current self-first and structural mulligan opening choices.; Challenge earlier when the opposing exerted character is worth a favorable or equal value trade.; Allow mutual-banish trades when they remove a higher-value opposing lore engine or board anchor.
- promotion gate: Blended score did not improve by at least 0.02. Mirror win rate regressed by more than 0.01. Diagnostic count increased by more than 5%.

## Top Strategies
| Strategy | Win Rate | Wins | Losses | No Winner | Avg Turns | Avg Actions | Deadlocks | Fallbacks |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| default-lore-race | 0.63 | 5 | 3 | 0 | 18.38 | 89.75 | 0/0 | concede 0, pass 139 |
| aggressive-board-control-lore-race | 0.50 | 4 | 4 | 0 | 18.63 | 92.00 | 0/0 | concede 1, pass 141 |
| board-control-lore-race | 0.38 | 3 | 5 | 0 | 19.25 | 94.00 | 0/0 | concede 1, pass 146 |

## Worst Matchups
| Matchup | Win Rate | Games | Losses | Deadlocks | Fallbacks | Diagnostics |
| --- | --- | --- | --- | --- | --- | --- |
| board-control-lore-race on amber-amethyst-aggressive vs aggressive-board-control-lore-race on amber-amethyst-aggressive | 0.00 | 2 | 2 | 0/0 | concede 1, pass 36 | total 1384, actor 183, validation 1200, unsupported 1 |
| aggressive-board-control-lore-race on amber-amethyst-aggressive vs default-lore-race on amber-amethyst-aggressive | 0.00 | 2 | 2 | 0/0 | concede 0, pass 31 | total 665, actor 145, validation 520, unsupported 0 |
| aggressive-board-control-lore-race on steel-sapphire-midrange vs board-control-lore-race on steel-sapphire-midrange | 0.50 | 2 | 1 | 0/0 | concede 0, pass 38 | total 984, actor 202, validation 782, unsupported 0 |
| board-control-lore-race on steel-sapphire-midrange vs aggressive-board-control-lore-race on steel-sapphire-midrange | 0.50 | 2 | 1 | 0/0 | concede 0, pass 38 | total 984, actor 202, validation 782, unsupported 0 |
| aggressive-board-control-lore-race on steel-sapphire-midrange vs default-lore-race on steel-sapphire-midrange | 0.50 | 2 | 1 | 0/0 | concede 0, pass 36 | total 1303, actor 206, validation 1097, unsupported 0 |

## Deadlock And Fallback Summary
- Deadlock games: 0
- Deadlock concedes: 0
- Fallbacks: concede 1, pass 213
- Diagnostics: total 5739, actor 1103, validation 4635, unsupported 1

## Triage Backlog
| Category | Signals | Matches | Recommended Transcripts |
| --- | --- | --- | --- |
| Fallback churn | 214 | 12 | amber-amethyst-aggressive-mirror-aggressive-board-control-lore-race-vs-default-lore-race-0, amber-amethyst-aggressive-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0, steel-sapphire-midrange-mirror-aggressive-board-control-lore-race-vs-default-lore-race-0 |
| Missed challenge | 135 | 11 | amber-amethyst-aggressive-mirror-aggressive-board-control-lore-race-vs-default-lore-race-0, amber-amethyst-aggressive-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0, steel-sapphire-midrange-mirror-aggressive-board-control-lore-race-vs-default-lore-race-0 |
| Bad ability timing | 27 | 8 | amber-amethyst-aggressive-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0, steel-sapphire-midrange-mirror-aggressive-board-control-lore-race-vs-default-lore-race-0, steel-sapphire-midrange-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0 |
- Fallback churn showed up in 214 traced decisions across 12 matches.
- Missed challenge showed up in 135 traced decisions across 11 matches.
- Bad ability timing showed up in 27 traced decisions across 8 matches.

## Suggested Transcripts To Inspect Next
- amber-amethyst-aggressive-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0 (board-control-lore-race on amber-amethyst-aggressive vs aggressive-board-control-lore-race on amber-amethyst-aggressive, mirror)
  reason: fallbacks concede 1, pass 36; diagnostics total 1384, actor 183, validation 1200, unsupported 1
  decisions: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-simulator/.artifacts/strategy/latest/mirror/amber-amethyst-aggressive-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0/strategy-decisions.jsonl
  runtime: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-simulator/.artifacts/strategy/latest/mirror/amber-amethyst-aggressive-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0/game-runtime.jsonl
- amber-amethyst-aggressive-mirror-aggressive-board-control-lore-race-vs-default-lore-race-0 (aggressive-board-control-lore-race on amber-amethyst-aggressive vs default-lore-race on amber-amethyst-aggressive, mirror)
  reason: fallbacks concede 0, pass 31; diagnostics total 665, actor 145, validation 520, unsupported 0
  decisions: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-simulator/.artifacts/strategy/latest/mirror/amber-amethyst-aggressive-mirror-aggressive-board-control-lore-race-vs-default-lore-race-0/strategy-decisions.jsonl
  runtime: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-simulator/.artifacts/strategy/latest/mirror/amber-amethyst-aggressive-mirror-aggressive-board-control-lore-race-vs-default-lore-race-0/game-runtime.jsonl
- steel-sapphire-midrange-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0 (aggressive-board-control-lore-race on steel-sapphire-midrange vs board-control-lore-race on steel-sapphire-midrange, mirror)
  reason: fallbacks concede 0, pass 38; diagnostics total 984, actor 202, validation 782, unsupported 0
  decisions: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-simulator/.artifacts/strategy/latest/mirror/steel-sapphire-midrange-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0/strategy-decisions.jsonl
  runtime: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-simulator/.artifacts/strategy/latest/mirror/steel-sapphire-midrange-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0/game-runtime.jsonl
- steel-sapphire-midrange-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0 (board-control-lore-race on steel-sapphire-midrange vs aggressive-board-control-lore-race on steel-sapphire-midrange, mirror)
  reason: fallbacks concede 0, pass 38; diagnostics total 984, actor 202, validation 782, unsupported 0
  decisions: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-simulator/.artifacts/strategy/latest/mirror/steel-sapphire-midrange-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0/strategy-decisions.jsonl
  runtime: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-simulator/.artifacts/strategy/latest/mirror/steel-sapphire-midrange-mirror-board-control-lore-race-vs-aggressive-board-control-lore-race-0/game-runtime.jsonl
- steel-sapphire-midrange-mirror-aggressive-board-control-lore-race-vs-default-lore-race-0 (aggressive-board-control-lore-race on steel-sapphire-midrange vs default-lore-race on steel-sapphire-midrange, mirror)
  reason: fallbacks concede 0, pass 36; diagnostics total 1303, actor 206, validation 1097, unsupported 0
  decisions: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-simulator/.artifacts/strategy/latest/mirror/steel-sapphire-midrange-mirror-aggressive-board-control-lore-race-vs-default-lore-race-0/strategy-decisions.jsonl
  runtime: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-simulator/.artifacts/strategy/latest/mirror/steel-sapphire-midrange-mirror-aggressive-board-control-lore-race-vs-default-lore-race-0/game-runtime.jsonl
