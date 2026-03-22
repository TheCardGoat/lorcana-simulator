Your task is to improve the default Lorcana AI strategy.

Primary code paths:

- Strategy logic: `packages/lorcana/lorcana-engine/src/automation/default-strategy.ts`
- Strategy unit tests: `packages/lorcana/lorcana-engine/src/automation/automated-actions.test.ts`
- Simulation harness: `packages/lorcana/lorcana-simulator/src/testing/strategy/strategy-suite.ts`
- Benchmark / simulation test entrypoint: `packages/lorcana/lorcana-simulator/src/testing/strategy/simulate-game.test.ts`
- Deck fixtures: `packages/lorcana/lorcana-simulator/src/lib/features/simulator-devtools/deck-fixtures/index.ts`

Context:

- The default strategy is currently too shallow and tends to over-prioritize raw quest tempo.
- We want to iterate on strategy quality using deterministic AI-vs-AI simulations, not ad hoc guesses.
- Use the existing game logs, decision traces, and board snapshots. Prefer extending existing instrumentation over inventing a parallel logging system.
- Before heuristic tuning, fix any actor-resolution or fallback deadlocks that prevent the AI from legally progressing.
- Unsupported prompt types such as scry-selection and name-card-selection should be visible in traces and must never leave automation silently stalled.

Goals:

1. Build or reuse an opt-in benchmark in `simulate-game.test.ts` that runs 100 deterministic deck/seed permutations.
2. Run the benchmark on the available strategies and identify the weakest matchup patterns.
3. Inspect representative transcripts / traces to find decision-quality issues.
4. Improve the weakest strategy heuristics.
5. Add focused unit tests in `automated-actions.test.ts` for the new tactical behavior.
6. Re-run the benchmark and compare before vs after.
7. Verify automation never silently stalls on chooser-owned pending effects; if the prompt shape is unsupported, the trace should show that and fallback behavior should still terminate cleanly.

Requirements:

- Do not use `any` or `unknown`.
- Keep the 100-game benchmark opt-in so normal CI stays fast.
- Prefer small, explainable heuristic improvements over large speculative rewrites.
- Preserve deterministic seeds.
- If you enrich logs, leverage existing decision traces and board snapshots.
- If a game ends, it should end by normal game rules, not by artificial concede fallback.
- If a prompt is unsupported for automation, treat it as a traceable fallback case and confirm the engine can still concede while that pending item/effect exists.

Deliverables:

- Code changes to the strategy and tests.
- A benchmark summary with before/after results.
- A short explanation of what tactical weakness was found and how the heuristic was changed.
- A short “how to iterate again later” note describing the benchmark loop.

Acceptance criteria:

- Targeted engine tests pass.
- Strategy simulation tests pass.
- The 100-game benchmark runs successfully when explicitly enabled.
- The post-change benchmark is measurably better than the baseline, or you explain clearly why it is not.
- `bun run ci-check` passes unless the change is purely visual.

Suggested workflow:

1. Baseline benchmark.
2. Analyze weak matchups, transcripts, and any actor-resolution/fallback deadlocks first.
3. Fix deadlocks before changing heuristics if they block automation from progressing.
4. Implement one bounded heuristic improvement.
5. Add focused tests.
6. Re-benchmark.
