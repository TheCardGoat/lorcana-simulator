# Lorcana Card Patterns

Use this file as the short companion to [`SKILL.md`](./SKILL.md).

It is a quick-reference matrix, not the full workflow.

## Safest Reference Order

1. The exact card file and test file you are touching.
2. Active examples from the same card type.
3. Current engine helpers and semantic matchers already used by migrated tests.
4. Migration docs that actually exist in `packages/lorcana/lorcana-cards/docs`.

Default maturity order:

- `actions`: safest
- `locations`: also safe
- `items`: mixed
- `characters`: least reliable overall

## Fast Triage

Before using any file as a reference, check:

```bash
rg -n "missingImplementation|missingTests" packages/lorcana/lorcana-cards/src/cards/<SET>
rg -n "LEGACY IMPLEMENTATION|It\\.skip|Describe\\.skip" packages/lorcana/lorcana-cards/src/cards/<SET> -g '*.test.ts'
```

Interpretation:

- active Bun test: good reference
- keyword-smoke-only test: partial reference
- empty `.test.ts`: not coverage
- commented legacy Jest file: historical note only

## Authoring Patterns By Card Type

### Actions

- Use `abilities: [{ type: "action", effect: ... }]`.
- Prefer built-in effect nodes over ad hoc layering.
- Use `sequence` when clause order matters.
- Use `choice` for true modal selection.
- Use `or` when an illegal branch must fall through to the remaining legal branch.
- Reuse earlier choices with `target: { ref: "previous-target" }`.
- Use `target-query` with `reference: "selected-first"` or `reference: "revealed-first"` when later logic inspects earlier choices.
- Use `count: "all"` with `selector: "all"`.
- Use `count: { upTo: N }` for optional target counts.
- Use `zones: ["limbo"]` plus an `under-parent` filter for under-card work.

### Characters

- Keyword-only cards can stay simple, but do not mistake keyword tests for full behavior coverage.
- Triggered abilities should use current multiplayer flows and authoritative turn sequencing.
- Activated character abilities usually follow the same `activateAbility(...)` test surface as items.
- Static/replacement-like text often needs semantic assertions instead of direct state poking.
- If the file is still a generator stub with `missingImplementation: true`, treat it as backlog, not as style guidance.

### Items

- Default to `type: "activated"` or `type: "triggered"` instead of action-style modeling.
- Model real costs first:
  - `exert`
  - `ink`
  - discard
  - banish self
- Use `activateAbility(...)` tests as the default entry point.
- Assert hand/discard/under-card/hidden-zone effects with authoritative state when needed.

### Locations

- Treat "while here" as a location pattern, not as action text.
- Use location-specific static effects such as granted abilities while at a location.
- Use `toBeAtLocation(...)` when movement is the user-visible behavior.
- Use `activateAbility(...)` for location activations rather than building custom action-like harness code.

## Helper Cheatsheet

### Play-time helpers

- `playCard(...)`
- `playCardWithChoice(...)`
- `playCardWithDestinations(...)`
- `playSong(...)`
- `playSongTogether(...)`

### Pending / responder helpers

- `resolvePendingEffect(...)`
- `respondWith(...)`
- `respondWithChoice(...)`

### Activated ability helper

- `activateAbility(...)`

### When exact card identity matters

- `findCardInstanceId(...)`
- authoritative server access for hidden-zone or facedown assertions

## Assertion Cheatsheet

- Use `toHaveZoneCounts(...)` for hand/deck/discard/play/inkwell changes.
- Use `toHaveKeyword(...)` for temporary or granted keywords.
- Use `toBeAtLocation(...)` for character movement to locations.
- Use direct authoritative card reads for:
  - facedown inkwell cards
  - hidden-zone identity
  - under-card state
  - client/server mismatch suspicion

## Active Example Shapes

Use live examples instead of old comments:

- Action `sequence` + location move + temporary keyword:
  - `src/cards/010/actions/198-the-games-afoot.ts`
- Action choice / responder discard:
  - `src/cards/010/actions/095-trust-in-me.ts`
- Activated location granted ability:
  - `src/cards/010/locations/068-the-great-illuminary-abandoned-laboratory.ts`
- Triggered character `or` branch with legality fallback:
  - `src/cards/011/characters/046-meeko-skittish-scrounger.ts`
- Activated item patterns:
  - inspect live tests under `src/cards/002/items` and `src/cards/005/items`

## Verification

```bash
bun test --cwd packages/lorcana/lorcana-cards "./src/cards/<SET>/<TYPE>/<NUMBER>-<card-slug>.test.ts"
bun run --cwd packages/lorcana/lorcana-cards check-types
```
