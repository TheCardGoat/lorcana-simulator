Your task is to improve the promoted default Lorcana AI strategy.

Treat `packages/lorcana/lorcana-engine/src/automation/strategy-registry.ts` as the source of truth for the current default strategy. Today that means `DEFAULT_AUTOMATED_ACTION_STRATEGY_ID` and its promoted implementation path, not the legacy `default-strategy.ts` wrapper by itself.

Primary code paths:

- Strategy registry / default id:
  - `packages/lorcana/lorcana-engine/src/automation/strategy-registry.ts`
- Current default strategy logic:
  - `packages/lorcana/lorcana-engine/src/automation/deck-aware-strategy.ts`
  - `packages/lorcana/lorcana-engine/src/automation/strategy/**`
- Legacy / comparison-only strategy wrappers:
  - `packages/lorcana/lorcana-engine/src/automation/default-strategy.ts`
- Planner / execution / diagnostics:
  - `packages/lorcana/lorcana-engine/src/automation/planner.ts`
  - `packages/lorcana/lorcana-engine/src/automation/actor-resolution.ts`
  - `packages/lorcana/lorcana-engine/src/automation/deadlock.ts`
  - `packages/lorcana/lorcana-engine/src/automation/decision-trace.ts`
  - `packages/lorcana/lorcana-engine/src/automation/types.ts`
- Engine automation tests:
  - `packages/lorcana/lorcana-engine/src/automation/automated-actions.test.ts`
- Strategy lab / benchmark harness:
  - `packages/lorcana/lorcana-simulator/src/testing/ai-strategy/strategy-suite.ts`
  - `packages/lorcana/lorcana-simulator/src/testing/ai-strategy/simulate-game.test.ts`
  - `packages/lorcana/lorcana-simulator/src/testing/ai-strategy/strategy-iteration.ts`
  - `packages/lorcana/lorcana-simulator/src/testing/ai-strategy/strategy-smoke.test.ts`
  - `packages/lorcana/lorcana-simulator/src/testing/ai-strategy/deck-aware-strategy.test.ts`
- Real deck fixtures:
  - `packages/lorcana/lorcana-simulator/src/lib/features/simulator-devtools/deck-fixtures/index.ts`

Context:

- The engine already has an opt-in strategy lab and benchmark workflow. Reuse it; do not invent a parallel benchmark or logging system.
- The current default strategy is trace-rich and deck-aware. Improvements may belong in shared family heuristics, deck-aware weighting, or planner correctness depending on the failure mode.
- Strategy quality must be improved with deterministic AI-vs-AI evidence, not ad hoc intuition.
- Existing artifacts already expose scorecards, worst matchups, diagnostics, fallbacks, deadlocks, decision traces, and per-match runtime logs.
- Unsupported prompt shapes and chooser-owned pending effects must be visible in diagnostics/traces and must never leave automation silently stalled.

Operating rules:

- Correctness blockers come before heuristic tuning. If actor resolution, chooser ownership, unsupported prompt handling, or deadlock fallback prevents legal progress, fix that first.
- Tune the current default strategy path in place by default. Do not create a new strategy id or candidate manifest unless the work clearly cannot fit the promoted default path.
- Prefer one small, explainable, typed improvement over a broad rewrite.
- Do not use `any` or `unknown`.
- Preserve deterministic seeds.
- Keep opt-in benchmarks opt-in so normal CI stays fast.
- Reuse existing trace fields, diagnostics, board snapshots, scorecards, and artifacts.
- If a game can end by normal game rules, it should. If automation is blocked on an unsupported chooser-owned pending item/effect, the trace should show that and the fallback/deadlock path should still terminate cleanly.

Required workflow:

1. Confirm the actual heuristic touchpoint before editing.
   - If the behavior is shared ordering, inspect `strategy/` first.
   - If the behavior is deck-profile or matchup weighting, inspect `deck-aware-strategy.ts` and `strategy-data`.
   - If the behavior is a legal-progress failure, inspect `planner.ts`, `actor-resolution.ts`, and `deadlock.ts` first.

2. Establish a baseline with the narrowest useful checks.
   - Run targeted engine tests first.
   - Prefer focused simulator strategy tests before broad benchmarks.
   - Use the existing simulator scripts when widening scope:
     - `cd packages/lorcana/lorcana-simulator && bun run test:strategy:quick`
     - `cd packages/lorcana/lorcana-simulator && bun run test:strategy:candidate`
     - `cd packages/lorcana/lorcana-simulator && bun run test:strategy:promotion`
     - `cd packages/lorcana/lorcana-simulator && bun run test:strategy:benchmark`

3. Read the existing artifacts instead of guessing.
   - Inspect `.artifacts/strategy/latest/**`.
   - Start with:
     - `benchmark-summary.md`
     - `benchmark-summary.json`
     - `run-summary.json`
     - per-match `strategy-decisions.jsonl`
     - per-match `game-runtime.jsonl`
   - Use `scorecards`, `worstMatchups`, `inspectNext`, diagnostic counts, fallback counts, and deadlock counts to pick one bounded weakness.

4. Use traces to identify the real failure mode.
   - Check whether the expected move was enumerated.
   - Check whether it was skipped by `unsupported-shape` or `overflow-skip`.
   - Check whether it was rejected by validation.
   - Check where it landed in `orderedCandidates`.
   - Check `selectedCandidate`, `executionAttempts`, `fallbackTaken`, `blocked`, `matchedRuleIds`, contributors, and heuristics.
   - Only change heuristics after you can point to a concrete trace-backed mistake.

5. Implement one bounded improvement in the correct layer.
   - Shared family behavior: `strategy/families/*`, `strategy/composer.ts`, `strategy/common.ts`
   - Deck-aware weighting / matchup logic: `deck-aware-strategy.ts`, `strategy-data/*`, `deck-profile.ts`
   - Correctness / progress / unsupported-shape handling: `planner.ts`, `actor-resolution.ts`, `deadlock.ts`
   - Do not add opaque special cases when a typed heuristic, contributor, or rule can explain the behavior cleanly.

6. Add focused regression coverage.
   - Engine-level behavior and trace assertions belong in `automated-actions.test.ts`.
   - Simulator-level real-deck / artifact / trace regressions belong in `src/testing/ai-strategy/*` when the behavior depends on fixture decks or benchmark reports.
   - If you change unsupported prompt handling or fallback behavior, add a regression that proves the trace/diagnostic surface is visible and automation terminates cleanly.

7. Re-run the same seeds and compare before vs after.
   - Use the same preset / deck filter / game count for before and after.
   - Summarize both tactical improvement and any diagnostic/fallback/deadlock regression.

Deliverables:

- The code changes.
- The exact tactical weakness or correctness gap that was found.
- The trace or benchmark evidence that identified it.
- The specific heuristic or engine change that addressed it.
- Before/after benchmark or strategy-lab results.
- Focused tests covering the new behavior.
- A short note describing the next most valuable follow-up iteration.

Acceptance criteria:

- Targeted engine tests pass.
- Relevant simulator strategy tests pass.
- The chosen opt-in strategy lab / benchmark run completes successfully.
- The post-change result is measurably better, or the lack of improvement is explained with trace-backed evidence.
- Automation never silently stalls on chooser-owned pending effects; unsupported prompt shapes remain visible in diagnostics/traces, and fallback/deadlock termination stays clean.
