Your task is to improve the default Lorcana AI strategy.

Primary code paths:
- Strategy logic: `packages/lorcana/lorcana-engine/src/automation/default-strategy.ts`
- Strategy unit tests: `packages/lorcana/lorcana-engine/src/automation/automated-actions.test.ts`
- Simulation harness: `packages/lorcana/lorcana-simulator/src/testing/strategy/strategy-suite.ts`
- Benchmark / simulation test entrypoint: `packages/lorcana/lorcana-simulator/src/testing/strategy/simulate-game.test.ts`

Context:
- The default strategy is currently too shallow and tends to over-prioritize raw quest tempo.
- We want to iterate on strategy quality using deterministic AI-vs-AI simulations, not ad hoc guesses.
- Use the existing game logs, decision traces, and board snapshots. Prefer extending existing instrumentation over inventing a parallel logging system.

Goals:
1. Build or reuse an opt-in benchmark in `simulate-game.test.ts` that runs 100 deterministic deck/seed permutations.
2. Run the benchmark on the current default strategy and identify the weakest matchup patterns.
3. Inspect representative transcripts / traces to find decision-quality issues.
4. Improve the default strategy heuristics in `default-strategy.ts`.
5. Add focused unit tests in `automated-actions.test.ts` for the new tactical behavior.
6. Re-run the benchmark and compare before vs after.
7. If possible, run a mirrored head-to-head benchmark of new strategy vs old strategy on the same deck/seed set.

Requirements:
- Do not use `any` or `unknown`.
- Keep the 100-game benchmark opt-in so normal CI stays fast.
- Prefer small, explainable heuristic improvements over large speculative rewrites.
- Preserve deterministic seeds.
- If you enrich logs, leverage existing decision traces and board snapshots.
- If a game ends, it should end by normal game rules, not by artificial concede fallback.

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
2. Analyze weak matchups and transcripts.
3. Implement one bounded heuristic improvement.
4. Add focused tests.
5. Re-benchmark.
