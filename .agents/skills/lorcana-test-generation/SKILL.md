---
name: lorcana-test-generation
description: Generate focused Lorcana card-behavior tests using the current multiplayer test engine and helper syntax, and write minimal engine repro tests when a card exposes a suspected runtime gap.
---

# Lorcana Test Generation

Write focused Bun tests for Lorcana card behavior using the current engine helpers in `packages/lorcana/lorcana-cards`.

## Scope

- Use this skill for current test syntax across actions, items, characters, and locations.
- Do not use skipped suites, `todo` stubs as syntax references.
- If the test file contains commented out code, ensure you understand it and is able to replicate the commented out tests in the correct synxtax.
- Keep tests narrow, semantic, and tied to printed behavior.
- A test that only asserts `missingImplementation`, `missingTests`, or an empty ability list is not valid migration coverage.
- When adapting a legacy test, preserve the legacy behavior claim and avoid strengthening it into a transport-level failure assertion unless the old test explicitly checked that failure mode.

## Enhanced Context

Use [lorcana-find-card](../lorcana-find-card/SKILL.md) to find similar cards, and use them to guide test development.

## Harness Choice

Use `@tcg/lorcana-engine/testing`.

- `LorcanaMultiplayerTestEngine` is the default for gameplay behavior, pending effects, chosen-player flows, response flows, bag triggers, songs, locations, and cross-turn duration checks.
- `LorcanaTestEngine` is only for narrow model or keyword checks that do not require gameplay flow.
- `createMockCharacter(...)` is appropriate when printed identity does not matter.
- Use real card definitions when name, classifications, printed abilities, or reprint identity matter.

```ts
import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
```

## Fixture Rules

- If `deck` is omitted, the harness injects 10 placeholder cards.
- Use `deck: []` when the test must avoid hidden draws.
- Static card definitions are usually fine for cards already on board when the helper accepts `CardInput`.

## Quick Workflow

1. Read the printed text and current card definition.
2. Classify the interaction before writing the test:
   - simple chosen target
   - chosen player
   - modal choice
   - optional follow-up
   - activated extra cost
   - opponent response
   - bag trigger
   - scry / reorder / split destinations
   - under-card selection
   - song / sing together
   - temporary duration across turns
4. Find similar cards, do ensure we're writting consistent tests.
3. Write one active test per real behavior clause.
4. If a clause appears blocked, we must ensure that the engine is expanded so it support the expected behavior.
5. Use the smallest helper that matches the flow.
6. Prefer semantic matchers over raw internals.
7. Run the targeted test file first.
8. Activate stale skipped coverage instead of adding a parallel placeholder file.
9. If the adapted test depends on post-event timing, verify who actually holds priority before asserting an immediate same-turn activation.

Test behavior only. Do not add metadata snapshots or metadata-only blocker tests.

## Blocker Tests

- Keep card-package tests focused on printed gameplay behavior.
- If the suspected blocker is inside `lorcana-engine`, prefer a minimal engine or simulator repro near the affected resolver, targeting, activation, or trigger code.
- A blocker report without a behavior repro is not complete enough to justify leaving the card blocked.
- Use authoritative deck, discard, pending-effect, and zone-order assertions for reveal and hidden-zone flows.

## Important
- Don't ever test card's raw printed values alone. Like `should have correct stats and abilities`.

## Helper Selection Guide

Use the narrowest helper that keeps the test readable.

- simple play with chosen targets:

```ts
expect(
  testEngine.asPlayerOne().playCard(cardUnderTest, {
    targets: [targetCard],
  }),
).toBeSuccessfulCommand();
```

- modal play:

```ts
expect(
  testEngine.asPlayerOne().playCardWithChoice(cardUnderTest, 0, {
    targets: [targetCard],
  }),
).toBeSuccessfulCommand();
```

- chosen player:

```ts
expect(
  testEngine.asPlayerOne().playCardForPlayer(cardUnderTest, PLAYER_TWO),
).toBeSuccessfulCommand();
```

- reorder / split destinations on play:

```ts
expect(
  testEngine.asPlayerOne().playCardWithDestinations(cardUnderTest, {
    zone: "deck-top",
    cards: [firstCard, secondCard, thirdCard],
  }),
).toBeSuccessfulCommand();
```

- activated ability with explicit ability text:

```ts
expect(
  testEngine.asPlayerOne().activateAbility(cardUnderTest, {
    ability: "ABILITY NAME",
  }),
).toBeSuccessfulCommand();
```

- activated ability with target:

```ts
expect(
  testEngine.asPlayerOne().activateAbility(cardUnderTest, {
    ability: "ABILITY NAME",
    targets: [targetCard],
  }),
).toBeSuccessfulCommand();
```

- activated ability with costs:

```ts
expect(
  testEngine.asPlayerOne().activateAbility(cardUnderTest, {
    costs: {
      discardCards: [cardToDiscard],
    },
  }),
).toBeSuccessfulCommand();
```

Use only the cost key the card actually needs, for example `exertCharacters`, `discardCards`, or `banishItems`.

- resolve a pending effect tied to a card:

```ts
expect(
  testEngine.asPlayerOne().resolvePendingEffect(cardUnderTest, {
    resolveOptional: true,
  }),
).toBeSuccessfulCommand();
```

- resolve a named-card prompt:

```ts
expect(
  testEngine.asPlayerOne().resolvePendingEffect(cardUnderTest, {
    namedCard: "Simba",
  }),
).toBeSuccessfulCommand();
```

- resolve the next pending choice or response:

```ts
expect(testEngine.asPlayerTwo().resolveNextPending({ choiceIndex: 1 })).toBeSuccessfulCommand();
expect(testEngine.asPlayerTwo().respondWith(firstTarget, secondTarget)).toBeSuccessfulCommand();
expect(testEngine.asPlayerTwo().respondWithChoice(0)).toBeSuccessfulCommand();
```

- resolve a bag trigger:

```ts
const [bagEffect] = testEngine.asPlayerOne().getBagEffects();

expect(
  testEngine.asPlayerOne().resolveBag(bagEffect!.id, {
    resolveOptional: true,
  }),
).toBeSuccessfulCommand();
```

- resolve a runtime-selected copy before using a helper that needs an instance id:

```ts
const discardId = testEngine.findCardInstanceId(cardToRecover, "discard", "p1");

expect(
  testEngine.asPlayerOne().respondWith(discardId),
).toBeSuccessfulCommand();
```

- song flows:

```ts
expect(testEngine.asPlayerOne().singSong(songCard, singerCard)).toBeSuccessfulCommand();
expect(
  testEngine.asPlayerOne().playSongTogether(songCard, [singerA, singerB]),
).toBeSuccessfulCommand();
```

## Assertion Guide

Prefer the matcher surface provided by `@tcg/lorcana-engine/testing`:

- `toBeSuccessfulCommand()`
- `toHaveZoneCounts({ hand, deck, play, inkwell, discard })`
- `toHaveLore({ card, value })`
- `toHaveKeyword({ card, keyword, value? })`
- `toHaveRestriction({ card, restriction })`
- `toHaveGrantedAbility({ card, ability })`
- `toHaveCardsUnder({ card, count })`
- `toBeAtLocation({ card, location })`
- `toHavePendingEffectCount(n)`
- `toBeReady(card)`
- `toBeExerted(card)`
- `toBeInZone("deck" | "hand" | "play" | "discard" | "inkwell")`

Use runtime methods only when no matcher exists:

- `getCardZone(card)`
- `getZonesCardCount()`
- `getCard(card)`
- `getCardStrength(card)`
- `getCardLore(card)`
- `getDamage(card)`
- `getKeywordValue(card, "Resist")`
- `hasKeyword(card, keyword)`
- `getBagCount()`
- `getBagEffects()`
- `getPendingEffects()`
- `isExerted(card)`
- `getCardPublicFaceState(card, "inkwell")`
- `findCardInstanceId(card, zone, "p1" | "p2")`
- `getAuthoritativeState()` for hidden-zone or exact-zone-key assertions that the player view cannot safely express

Use `LorcanaTestEngine` model helpers only for non-gameplay checks:

```ts
const testEngine = new LorcanaTestEngine({
  play: [cardUnderTest],
});

expect(testEngine.getCardModel(cardUnderTest).hasBodyguard()).toBe(true);
```

## Current Pitfalls

- Chosen-player cards use `playCardForPlayer(...)`; responder-side choices usually resolve with `asPlayerTwo().resolveNextPending(...)`.
- For `upTo` or zero-target branches, assert the legal minimal target bundle the runtime actually accepts rather than forcing dummy selections.
- When a card moves into a hidden zone, prefer zone counts or authoritative state over direct player-view identity assertions.
- When printed text refers to "that character", tests should follow implementations that reuse the prior chosen target instead of re-selecting a fresh card.
- Bag-trigger tests should assert both bag count and post-resolution state.
- Songs, hand/discard selections, under-card choices, and ambiguous duplicate copies often require runtime ids from `findCardInstanceId(...)`.

## Verification

- Run the targeted test file first.
- If the change is test-only or documentation-only, stop at targeted verification.
- If the test unlocks broader implementation work and the targeted run passes, then follow the repo rule for wider checks.

## Sample Prompt

Use this when you want another agent to create or update a card test:

```md
Use `lorcana-test-generation`.

Create or update the test for `<CARD_NAME>` in `packages/lorcana/lorcana-cards`.

Requirements:
- If the engine does support yet the card, we must expand the current engine to ensure it supports the card.
- Find the card definition first and use the matching active local test file if it exists.
- Use only current patterns from `@tcg/lorcana-engine/testing`.
- Write focused Bun behavior tests for the printed card text only.
- Prefer `LorcanaMultiplayerTestEngine` unless this is only a narrow keyword/model check.
- Use semantic matchers like `toHaveZoneCounts`, `toHaveLore`, `toHaveKeyword`, `toHaveRestriction`, `toHaveGrantedAbility`, `toBeAtLocation`, or `toHavePendingEffectCount` when possible.
- If the card has pending choices, chosen-player flow, bag triggers, or cross-turn duration, use the current helper APIs as appropriate.
- Run only the targeted test file after editing.
- Do not run repo-wide checks unless the targeted test passes and broader verification is clearly needed.

Success criteria:
- The test is active, uses current syntax, and proves the real printed behavior of the card.
- The targeted Bun test passes.
```
