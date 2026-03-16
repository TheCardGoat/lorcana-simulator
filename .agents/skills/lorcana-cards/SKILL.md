---
name: lorcana-cards
description: Create, debug, fix, and triage Disney Lorcana cards in packages/lorcana/lorcana-cards, and extend the Lorcana engine when printed text exposes a bounded runtime gap.
---

# Lorcana Cards

Use this skill when working in `packages/lorcana/lorcana-cards`.

This package is not in one uniform migration state. Treat card type maturity as part of the task, not background noise.

Default references:

1. The exact card file and test file you are touching.
2. Real active tests in the same card type.
3. The engine helpers and matchers already used by current migrated cards.

Do not assume a numbered test file means the card is really covered.

## Engine Reality Before Blocking

Card migration is not a `lorcana-cards`-only task. Printed behavior can depend on:

- `packages/lorcana/lorcana-cards`
- `packages/lorcana/lorcana-engine`
- `packages/lorcana/lorcana-types`

Before marking a card blocked, prove whether the issue is:

1. authoring
2. existing engine support you have not used yet
3. a real runtime or type-system gap

Do not infer a blocker from one stale generated stub, one commented legacy test, or one failing first attempt.

## Required Context Before Editing

Before coding:

1. Resolve the exact card file and related test file.
2. Inspect card type and set.
3. Inspect `missingImplementation` and `missingTests`.
4. Inspect the test file state:
   - active executable test
   - keyword-smoke-only test
   - empty placeholder
   - commented legacy Jest reference
5. Inspect adjacent live examples from the same card type.
6. Inspect migration docs only when relevant.
   - Start with `packages/lorcana/lorcana-cards/docs/ACTION_MIGRATION_ANALYSIS.md` for action work.
   - Use `packages/lorcana/lorcana-cards/docs/SET_001_ITEM_MIGRATION_ANALYSIS.md` for the set-001 item migration surface.
   - If a requested doc is not present, do not invent one. Fall back to live code.
7. Read [`memory/bank.md`](./memory/bank.md) and [`memory/schema.md`](./memory/schema.md).
8. Inspect current engine and type support before calling the card blocked.
   - Check action-effect resolvers in `packages/lorcana/lorcana-engine/src/runtime-moves/resolution/action-effects`.
   - Check activated ability execution in `packages/lorcana/lorcana-engine/src/runtime-moves/moves/abilities/activate-ability.ts`.
   - Check trigger support in `packages/lorcana/lorcana-engine/src/triggered-abilities/index.ts`.
   - Check derived-state and projection behavior in `packages/lorcana/lorcana-engine/src/rules/derived-state.ts` and `packages/lorcana/lorcana-engine/src/projection`.
   - Check effect and targeting types in `packages/lorcana/lorcana-types/src`.
9. If a legacy implementation is available in the workspace or a mirrored repo, use it as a behavior oracle, not as syntax to copy blindly.
10. If the card is blocked, investigate a path the unblocks it. You must ensure we can implement ALL cards, and we're using new cards to expand the engine behavior

Useful repo checks:

```bash
rg --files packages/lorcana/lorcana-cards/src/cards
rg -n "missingImplementation|missingTests" packages/lorcana/lorcana-cards/src/cards/<SET>
rg -n "LEGACY IMPLEMENTATION|It\\.skip|Describe\\.skip" packages/lorcana/lorcana-cards/src/cards/<SET> -g '*.test.ts'
rg --files packages/lorcana/lorcana-cards/docs
rg -n "usesPerTurn|once-per-turn|first-time-each-turn|PLAYED_CARD|classification|discard" packages/lorcana/lorcana-engine/src packages/lorcana/lorcana-types/src -g '*.ts'
rg -n "put-on-bottom|reveal-top-card|cost-reduction|discard" packages/lorcana/lorcana-cards/src/cards -g '*.ts'
```

## Engine-First Guardrails

- A claimed blocker must be reduced to one exact unsupported engine or type surface.
- If the gap is bounded and local, extend the engine in the same task instead of leaving the card blocked.
- If the same blocker appears twice in one batch, stop the batch and fix the shared engine support first.
- Tests that only assert `missingImplementation`, `missingTests`, or `abilities: []` do not count as migration coverage.
- Only leave missing flags after you have searched current support, compared live examples, and decided a bounded engine patch is still not safe or not enough.

## Workflow By Card Type

### Actions

Use actions as the default reference surface when you need the cleanest current DSL examples.

Workflow:

1. Start from printed text.
2. Classify the effect shape before writing code:
   - atomic effect
   - `sequence`
   - `choice`
   - `or`
   - `optional`
   - `conditional`
   - `for-each`
   - `scry`
   - under-card movement
   - move-to-location
3. Write or activate a failing behavior test first.
4. Implement the smallest readable `type: "action"` DSL that matches printed text.
5. Re-run the targeted card test.
6. If the behavior still looks blocked, inspect the engine and extend it when the gap is bounded.
7. Keep `missingImplementation` or `missingTests` true only after the remaining blocker is proven.

Use current live helpers first:

- `playCard`
- `playCardWithChoice`
- `playCardWithDestinations`
- `playSong`
- `playSongTogether`
- `resolvePendingEffect`
- `respondWith`

### Characters

Do not treat character files as uniformly migrated.

First classify the card:

- keyword-only
- static ability
- triggered ability
- activated ability
- replacement-like or rules-hook behavior

Then decide whether the card is:

- already implemented but under-tested
- a generated stub that needs real authoring
- blocked on engine/runtime support after proof
- only carrying a legacy comment file with no real coverage

Character guidance:

- Keyword-only cards can use small focused tests, but do not confuse those with full behavior coverage.
- Triggered and activated abilities should use current multiplayer engine flows, not copied Jest/TestEngine comments.
- If the existing `.test.ts` file is only commented legacy content, treat the card as effectively untested.
- For triggered and activated abilities, prove whether the failure is authoring or runtime before calling it blocked.
- If the runtime cannot express the ability cleanly, extend `lorcana-engine` and `lorcana-types` when the gap is bounded.
- Only leave missing flags when you can name the exact unresolved engine surface and explain why no bounded patch was enough.

### Items

Items are usually best modeled and tested through `activateAbility(...)`, explicit costs, and authoritative zone assertions.

Default workflow:

1. Confirm whether the item is activated, triggered, static, or mixed.
2. Verify cost shape first:
   - `exert`
   - `ink`
   - discard cost
   - banish-self cost
3. Confirm whether existing discard and cost-reduction support already covers the printed text before inventing a blocker.
4. Use targeted `activateAbility(...)` tests before widening scope.
5. Prefer authoritative zone/count assertions for discard, hand, under-card, and hidden-zone flows.

Active repo patterns exist for:

- activated item abilities
- pending-effect follow-ups after activation
- self-banish costs
- item-driven restrictions and temporary granted abilities

### Locations

Locations are mature enough to use as real references.

Treat these as first-class patterns:

- static "characters here gain ..." behavior
- location activated abilities
- movement to and from locations
- location-scoped assertions such as `toBeAtLocation(...)`

Use live location tests instead of action analogies when the card text is really location-specific.

## Debugging Flow

When a card is broken or suspicious, classify the failure before changing code:

1. Authoring problem
   - wrong DSL shape
   - wrong target ownership
   - wrong duration
   - wrong missing flags
2. Runtime support gap
   - search existing engine and type support first
   - reduce the failure to one missing resolver, targeting, or type-system surface
   - patch the engine when the gap is bounded
3. Generated stub quality problem
   - generated file exists but is structurally wrong or incomplete
4. Test surface problem
   - empty test file
   - keyword-smoke-only test
   - commented legacy Jest file
   - optimistic client success hiding authoritative failure
5. Find similar cards
   - Use [lorcana-find-card](../lorcana-find-card/SKILL.md) to find similar cards, and use them to guide test development.

Debugging rules:

- Prefer live engine helpers and semantic matchers over legacy comments.
- Prefer proving or disproving support with targeted engine tests over inferring blockers from card files.
- Do not trust a client-side success result alone on known mismatch paths.
- Use authoritative server state for hidden-zone, under-card, facedown-ink, or chooser-projection problems.
- Do not replace behavior tests with metadata-only assertions just to keep the branch green.
- If the runtime cannot express the real effect, do not fake it just to clear a test, but do attempt the bounded engine fix first.

## Generation, Parser, And Tooling

This package also contains parser and generation tooling. Use that fact deliberately.

Inspect generated or parser-driven files when:

- a card looks machine-generated or structurally inconsistent with nearby live cards
- repeated malformed stubs suggest a generator issue instead of one local card issue
- parser output or text-shape normalization is the real blocker

Key scripts:

```bash
bun run --cwd packages/lorcana/lorcana-cards generate
bun run --cwd packages/lorcana/lorcana-cards generate-cards:all --skip-fetch
bun run --cwd packages/lorcana/lorcana-cards fetch
```

Use `generate-cards.ts` / `generate-cards-all.ts` when the task is about regeneration or pipeline fixes.

Do not hide parser or generator gaps inside hand-authored card hacks. If the blocker is really generation or parser coverage, escalate it instead of baking in one-off local workarounds.

## Verification Matrix

Default verification:

```bash
bun test --cwd packages/lorcana/lorcana-cards "./src/cards/<SET>/<TYPE>/<NUMBER>-<card-slug>.test.ts"
bun run --cwd packages/lorcana/lorcana-cards check-types
```

Widen scope only when needed:

- related engine tests if you changed or investigated engine behavior
- same-surface neighboring tests if you changed shared helpers or resolver logic
- generation commands only if the task touched generator or parser flows

Report clearly when:

- the test file is placeholder-only
- package-wide `check-types` is failing for unrelated reasons
- a card remains blocked by runtime support rather than authoring
- which engine files and tests you inspected before concluding it was blocked

## Memory Update

After substantive skill-guided work:

1. Update [`memory/bank.md`](./memory/bank.md) in place when the repo state or guidance changed.
2. Add a short dated learning only when it changes future work.
3. Use [`memory/schema.md`](./memory/schema.md) for the expected compact format.

## Reusable Prompts

Reusable request templates live in [`PROMPTS.md`](./PROMPTS.md).
