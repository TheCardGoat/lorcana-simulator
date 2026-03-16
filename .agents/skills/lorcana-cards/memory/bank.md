# Lorcana Cards Memory Bank

## Current State

- `actions`: most mature surface
  - 340 definitions
  - 2 still marked missing
- `locations`: mature surface
  - 87 definitions
  - 0 still marked missing
- `items`: mixed migration state
  - 204 definitions
  - 125 still marked missing
- `characters`: largest backlog
  - 1936 definitions
  - 1569 still marked missing
  - many tests are placeholders, legacy comments, or keyword-smoke-only

## Guardrails

- Resolve the exact card file and test file before editing.
- Check `missingImplementation` and `missingTests` before trusting a file as a reference.
- Treat active Bun tests as the real source of truth, not commented Jest history.
- Use actions and locations as the safest syntax/style references.
- Inspect `lorcana-engine` and `lorcana-types` before deciding a card is blocked.
- Keep missing flags honest only after engine investigation and bounded-extension attempts.
- Metadata-only blocker tests do not count as migration coverage.
- If the same blocker repeats in a batch, stop and fix the shared engine support.
- Prefer live engine helpers and semantic matchers over hand-rolled harness code.

## Trusted Patterns

- Actions:
  - `type: "action"` with `sequence`, `choice`, `or`, `optional`, `conditional`, `for-each`, and `scry`
  - reuse follow-up targets with `target: { ref: "previous-target" }`
  - use `count: "all"` with `selector: "all"`
  - use `count: { upTo: N }` for optional targeting
- Items:
  - default to `activateAbility(...)` tests
  - verify real cost shape first
- Engine behavior:
  - activated once-per-turn uses `usesPerTurn`
  - triggered `once-per-turn` and `first-time-each-turn` use trigger restrictions
  - trigger subject filters support `cost-comparison` against printed card cost
  - single-classification pending cost reductions already work
  - nested `play-card` action effects can carry optional Bodyguard entry choice into the resulting character play
  - `reveal-top-card` plus `put-in-hand`, `put-on-top`, and `put-on-bottom` already works
  - chosen discard filters already support card type, max cost, and a single classification
- Locations:
  - trust "while here" and location activation patterns from live tests
- Tests:
  - `playCardWithChoice(...)`, `playCardWithDestinations(...)`, `resolvePendingEffect(...)`, `respondWith(...)`, `respondWithChoice(...)`, `activateAbility(...)`
  - `toHaveZoneCounts(...)`, `toHaveKeyword(...)`, `toBeAtLocation(...)`

## Known Gaps

- Character migration is still uneven; many numbered tests are not executable coverage.
- Item coverage is incomplete and varies sharply by set.
- Hidden-zone, under-card, and chooser-projection flows still need authoritative-state checks.
- Generated stubs can be structurally plausible while still being wrong for real gameplay.
- `PLAYED_CARD` exists in types and parser mapping, but runtime targeting support may still be missing.
- Union classification semantics like `Princess or Queen` are not first-class in single-classification discard and cost-reduction surfaces.

## Do Not Trust

- Empty `.test.ts` files
- Commented `LEGACY IMPLEMENTATION` blocks
- Keyword-smoke-only tests as full behavior proof
- Client-side success without checking authoritative state on suspicious paths
- Non-action files as default syntax references when a mature action/location example already exists

## Recent Learnings

## 2026-03-14 - skill-rewrite-full-card-reality

- signal: the skill was still action-only while the package had already become a mixed card-definition, parser, and generation workspace with very uneven non-action migration quality.
- impact: future guidance must branch by card type and explicitly call out placeholder-test false positives before using a file as a reference.
- verification: `bun run --cwd packages/lorcana/lorcana-cards check-types`; repo inventory and test-state scans across `src/cards`.

## 2026-03-15 - engine-first-blocker-proof

- signal: recent migration work treated several cards as blocked before proving what the current engine already supports, and some blocker tests only asserted missing flags.
- impact: future card work must inspect engine support first, prefer bounded engine extensions, and reject metadata-only tests as real coverage.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/008/items/178-television-set.test.ts`; `bun test --cwd packages/lorcana/lorcana-engine ./src/runtime-moves/effects/triggered-abilities.test.ts`; `bun test --cwd packages/lorcana/lorcana-engine ./src/projection/card-derived-parity.test.ts`; `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/005/locations/135-sugar-rush-speedway-starting-line.test.ts`

## 2026-03-15 - nested-play-bodyguard-and-printed-cost-triggers

- signal: `Just in Time` needed the optional free-play choice to reach nested Bodyguard entry, and `Lantern` exposed that temporary discounts must not satisfy printed-cost trigger checks like Stitch - Rock Star.
- impact: future migrations can use nested `play-card` effects for free-play Bodyguard parity, but trigger eligibility that says "cost X or less" must filter against printed cost rather than discounted play cost.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/001/actions/029-just-in-time.test.ts`; `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/001/items/033-lantern.test.ts`; `bun test --cwd packages/lorcana/lorcana-simulator ./src/testing/rules/section-08-bodyguard.test.ts`; `bun test --cwd packages/lorcana/lorcana-engine ./src/runtime-moves/resolution/action-effects/composed-effect-resolver-parity.test.ts`

## 2026-03-15 - dynamic-classification-trigger-snapshots

- signal: `The Thunderquack` and `Darkwing Tower` required trigger matching against a Villain classification that exists only while the target is in play, while `Containment Unit` exposed a second gap where challenge validation ignored active `cant-challenge` restrictions even though preview helpers already respected them.
- impact: when a trigger depends on printed or static classifications at banish time, snapshot the derived classifications before moving the card out of play; when a restriction says a character cannot challenge, validate the live move with the same restriction checks used by eligibility previews; and when an `or` branch self-banishes a non-character source, prefer typed self-target enums like `THIS_ITEM`.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/011/items/202-the-thunderquack.test.ts ./src/cards/011/items/203-containment-unit.test.ts ./src/cards/011/locations/204-darkwing-tower-icy-headquarters.test.ts`; `bun run --cwd packages/lorcana/lorcana-engine check-types`; `bun run ci-check`

## 2026-03-15 - self-banish-trigger-candidates

- signal: printed `When this character is banished` abilities still failed after the source left play because trigger discovery scanned current zones only, and debug lethal-damage setup left banish events buffered until something else flushed the trigger boundary.
- impact: snapshot eligible triggered abilities from the source before clearing play-state, carry those candidates on the emitted banish event, and flush manual damage changes through the normal trigger boundary so self-banish behavior matches gameplay moves.
- verification: `bun test --cwd packages/lorcana/lorcana-engine ./src/runtime-moves/effects/triggered-abilities.test.ts`; `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/002/characters/006-dopey-always-playful.test.ts`; `bun run --cwd packages/lorcana/lorcana-engine check-types`; `bun run --cwd packages/lorcana/lorcana-cards check-types`

## 2026-03-15 - fixture-self-discounts-and-heal-draw-snapshots

- signal: `Tramp - Street-Smart Dog` showed that hand-active self cost reductions were invisible when the static resolver did not support `characters-in-play`, and `Rapunzel - Gifted with Healing` showed that heal-follow-up sequences need a shared `eventSnapshot` plus the `DAMAGE_REMOVED` amount string rather than an ad hoc amount object.
- impact: future migrations should author self-discount characters with `sourceZones: ["hand"]` and `cardType` while confirming the static amount resolver supports the chosen counter; heal/draw follow-ups should prefer `DAMAGE_REMOVED` and add engine coverage whenever the follow-up depends on snapshot state from an earlier step in the same sequence.
- verification: `bun test --cwd packages/lorcana/lorcana-engine ./src/runtime-moves/rules/static-ability-utils.test.ts ./src/runtime-moves/resolution/action-effects/composed-effect-resolver.test.ts`; `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/001/characters/018-rapunzel-gifted-with-healing.test.ts ./src/cards/007/characters/010-tramp-street-smart-dog.test.ts`; `bun run ci-check`
