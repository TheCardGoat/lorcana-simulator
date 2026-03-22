# Role

You are a senior Lorcana migration agent working in `/Users/wazar/projects/the-card-goat-online/lorcana`. Your task is to finding implementation gaps in the new engine, and implement the missing behavior. We do so by porting the tests from the legacy engine, and ensuring parity with the legacy behavior.

# Objective

Process exactly the last 10 unchecked items, in file order, from `legacy_inventory`.

For each selected item:

- Load both the legacy and new card files from the respective roots, ensures you find both files.
- Load the respective test files from the respective roots.
- Load the respective Audit Chunk file from `legacy_inventory`, and check the expected tests we should write.
- Write a test test for the new card file, using the legacy behavior as the specification.
- Reason about the legacy behavior, investigate whether the current engine supports the behavior, if not, reason about how can we extend the engine to support the behavior.
- The new engine might not have the same behavior already implemented, in this case you must implement the expected behavior. Ensure to use the existing helper functions and types if possible.
- DO not write tests that only assert the Card Definition structure, write tests that assert the behavior of the card by simulating real game play, and asserting on the game state.

The legacy tests are the specification. Preserve behavior, not legacy syntax.

Example of the workflow, for a sample card tod-knows-all-the-tricks.
// Read the card files from the legacy and new roots
/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/011/characters/092-tod-knows-all-the-tricks.test.ts
/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/011/characters/092-tod-knows-all-the-tricks.ts
/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/characters/092-tod-knows-all-the-tricks.ts
/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/characters/092-tod-knows-all-the-tricks.test.ts

// Read the audit chunk file from the legacy root
/Users/wazar/projects/the-card-goat-online/packages/packages/lorcana/lorcana-cards/src/cards/AUDIT_INVENTORY_CHUNK_17.md

- [ ] **011/characters/092-tod-knows-all-the-tricks.test.ts**
  - Card: `011/characters/092-tod-knows-all-the-tricks.ts`
    - `should ready Tod when targeted by an action`
    - `should allow triggering twice per turn`
    - `should not trigger a third time per turn`
    - `should not count declined triggers toward the per-turn limit`
    - `should ready Tod when targeted by an item ability`
    - `should allow triggering twice when item ability targets Tod twice (different items)`
    - `should ready Tod when targeted by Darkwing's Chair Set`
    - `should ready Tod when targeted by Mother Will Protect You (played directly)`
    - `should ready Tod when targeted by Mother Will Protect You (sung by a character)`
    - `should only trigger once when targeted by Education Or Elimination mode 1`
    - `should ready twice per turn`

// Write the test for the new card file
We would then write all the tests we found in the audit chunk file, and the legacy tests as the specification. Adjust the APIs to the new engine, but keeping the behavior similar.

# Non-Negotiable Rules

- Understand the legacy behavior, then write a similar test for the new card file, make sure that the API for the new engine is ergonomic and better than the legacy one.
- Use TDD. Start by porting or adapting the legacy behavior test so it fails for the correct reason, then implement the fix.
- Do not mark a card as complete unless the new-format test is executable and passing.
- If the engine or DSL cannot express the behavior, extend `packages/lorcana/lorcana-engine` and/or `packages/lorcana/lorcana-types` in the same task when the gap is bounded.
- Do not call something “blocked” until you have identified the exact unsupported engine or type surface, and tried to extend the engine or types to support the behavior.
- Type safety is mandatory. Do not introduce `any` or `unknown`.
- Prefer clean breaks over compatibility shims, migrations, or deprecations.
- Respect package boundaries: `@tcg/lorcana-engine` must not import `@tcg/lorcana-cards`, including tests. Engine tests must use mock cards. Mixed engine-plus-real-card integration coverage belongs in `packages/lorcana/lorcana-simulator/src/testing/**`.
- Keep reasoning internal. In logs and summaries, report conclusions, decisions, evidence, and blockers only.

# Required Skills

Use the relevant skills for this task.

1. `.agents/skills/lorcana-find-card/SKILL.md`
2. `.agents/skills/lorcana-cards/SKILL.md`
3. `.agents/skills/lorcana-test-generation/SKILL.md`

Use `.agents/skills/fix-ci/SKILL.md` only after targeted checks are passing and broader verification is needed.

If a skill requires memory or bank updates, perform them. Prefer updating the relevant memory artifacts over editing `SKILL.md` unless you discover a stable, reusable workflow improvement.

## Before Writing Tests: Engine Gap Analysis

For each ability in the card definition, verify engine support exists:

| Ability type                                    | Where to check                                                                     |
| ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| Trigger event (e.g. `be-chosen`, `leave-play`)  | `packages/lorcana/lorcana-engine/src/runtime-moves/` — search for the event string |
| Effect type (e.g. `reveal-hand`, `choice`)      | `packages/lorcana/lorcana-engine/src/runtime-moves/resolution/`                    |
| Cost modifier (e.g. conditional cost reduction) | `packages/lorcana/lorcana-engine/src/runtime-moves/moves/core/play-card.ts`        |

If a trigger event is **declared in types but not handled in the engine**, implement the handler. Use an existing trigger handler as a reference implementation.

**The goal is working behavior, not a green test run.**

## TDD Sequence (per card)

1. Read the legacy test to understand the FULL expected behavior
2. Write the full test suite mirroring the legacy spec
3. Run the tests — for each failure, determine the root cause:
   a. If the card definition is wrong → fix the card definition
   b. If the engine lacks support for a trigger/effect type → **implement the engine support first**
   - Search for similar implementations in the engine as reference
   - Implement the missing trigger handler / effect type
   - Do NOT use it.todo() as a substitute for implementation
4. Only use it.todo() for behaviors that require a fundamentally new engine subsystem
   that would take more than 6–12 hours to implement. Document WHY it's deferred. and so not mark them as audited.

# Autonomy

Work autonomously through the full batch of 10 items. Do not stop for routine questions. If a decision is ambiguous but not dangerous, choose the most defensible option, record it in the log, and continue.

# Final Output

When the batch is complete, return a concise summary with:

- the 10 inventory items selected
- cards completed
- tests added or updated
- engine/type surfaces expanded
- items still blocked, with the exact missing support
- path to the log file
- whether `bun run ci-check` passed

<repositories>
    legacy_inventory=packages/lorcana/lorcana-cards/src/cards/AUDIT_INVENTORY_INDEX.md
    legacy_root=/Users/wazar/projects/lorcanito/packages/lorcana-engine
    target_root=/Users/wazar/projects/the-card-goat-online/packages/lorcana
    new_cards_root=/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards
    log_file=/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/CARD_MIGRATION_LOG.md
</repositories>
