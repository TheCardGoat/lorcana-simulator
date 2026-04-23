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
  - `OPPONENT_CHARACTERS` trigger `on` value works for `event: "challenge"`
  - `event: "remove-damage"` with `on: "YOUR_CHARACTERS"` triggers on damage removal from your characters
  - `turn-metric` conditions support `damage-removed-by-player` and `played-character-with-classification`
  - `may-enter-play-exerted` restriction allows optional exerted entry, paired with `is-exerted` condition on a triggered ability
  - `property-modification` with `operation: "add-alias"` adds an alternate name for Shift targeting
  - `trigger-amount` as effect amount captures the quantity from the triggering event
- Locations:
  - trust "while here" and location activation patterns from live tests
  - `CHARACTERS_HERE` trigger `on` value works for location-triggered abilities
- Characters:
  - keyword helpers (`rush`, `ward`, `evasive`, `resist(N)`, `challenger(N)`, `singer(N)`, `shift(N)`, `alert`) are safe and tested
  - "may enter play exerted" always requires two abilities: static restriction + triggered with `is-exerted` condition
  - enchanted/epic variants share `canonicalId` and should have identical abilities to their base card
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
- `cant-play-actions` restriction does not support cost-based filtering (e.g., "can't play actions with cost 4 or more"). Cards needing this must use the restriction without the cost filter, which is slightly broader than printed text.

## Do Not Trust

- Empty `.test.ts` files
- Commented `LEGACY IMPLEMENTATION` blocks
- Keyword-smoke-only tests as full behavior proof
- Client-side success without checking authoritative state on suspicious paths
- Non-action files as default syntax references when a mature action/location example already exists

## Recent Learnings

## 2026-04-21 - set-012-batch-missing-cards-ability-authoring

- signal: 15 cards in set 012 had `missingImplementation: true` with text but no `abilities` array. All were resolved without engine changes using existing DSL patterns: keyword helpers, triggered abilities, static conditions, "may enter play exerted" two-ability pattern, `property-modification` for name aliases, and location `CHARACTERS_HERE` triggers. The `cant-play-actions` restriction does not yet support cost-based filtering (needed for Gizmoduck's "cost 4 or more" clause).
- impact: future batch card implementation should start by finding `missingImplementation` flags, then match printed text against the common patterns in PATTERNS.md before investigating engine support. Enchanted/epic variants should copy abilities directly from their base card. The `OPPONENT_CHARACTERS` trigger `on` value exists and works for challenge events.
- verification: `bun test --cwd packages/lorcana/lorcana-cards src/cards/012/`; `rg -l 'missingImplementation: true' packages/lorcana/lorcana-cards/src/cards/012/ --type ts` (returns empty)

## 2026-03-19 - sapphire-aura-static-target

- signal: Daisy Duck - Sapphire Champion needed a static aura target for "your other Sapphire characters", and static target projection required `getCardOwner` plus an explicit legacy matcher case.
- impact: future color-specific static auras should verify both the static target matcher and the static ability context before calling the card blocked.
- verification: `bun test packages/lorcana/lorcana-cards/src/cards/010/characters/158-daisy-duck-sapphire-champion.test.ts`

## 2026-03-19 - explicit-discard-to-play-song-support

- signal: `Circle of Life` style song actions that play a character from discard already resolve cleanly with the existing `play-card` effect and explicit discard target selection.
- impact: future migration work for this effect shape should stay at the card layer unless a different target constraint exposes a real runtime gap.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/001/actions/210-circle-of-life-enchanted.test.ts`

## 2026-03-18 - support-needs-triggered-quest-effect

- signal: support-only character definitions can pass keyword smoke checks while still missing the actual quest-triggered strength boost.
- impact: when migrating Support characters, add the explicit quest trigger with the optional support effect; do not treat the keyword alone as gameplay coverage.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/007/characters/018-bolt-dependable-friend.test.ts`

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

## 2026-03-18 - inventory-slug-drift-before-blocking

- signal: chunk-10 set-006 inventory rows marked three cards as `MISSING` even though the current repo already had working definitions/tests under normalized possessive slugs.
- impact: before treating an audit row as missing authoring work, check for current-slug variants without apostrophe fragments; inventory cleanup may be the only required change.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/006/items/168-jumbo-pop.test.ts ./src/cards/006/items/200-kings-sensor-core.test.ts ./src/cards/006/items/201-training-dummy.test.ts ./src/cards/006/items/202-sunglasses.test.ts ./src/cards/006/locations/034-hundred-acre-island-poohs-home.test.ts ./src/cards/006/locations/035-sugar-rush-speedway-finish-line.test.ts ./src/cards/006/locations/068-fairy-ship-royal-vessel.test.ts ./src/cards/006/locations/069-mystical-tree-mama-odies-home.test.ts ./src/cards/006/locations/101-perilous-maze-watery-labyrinth.test.ts ./src/cards/006/locations/102-owl-island-secluded-entrance.test.ts`

## 2026-03-18 - draw-then-discard-character-sequence

- signal: Bobby Zimuruski's play trigger initially modeled only the discard step, which left the draw step invisible to the engine.
- impact: when a triggered ability says "draw a card, then choose and discard a card," author it as a `sequence` with the draw step first and the discard step explicitly coming from `hand`.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/009/characters/078-bobby-zimuruski-spray-cheese-kid.test.ts`

## 2026-03-19 - sing-event-song-triggers

- signal: a song-triggered character ability did not fire when modeled as `event: "play"`; the runtime emits a distinct `sing` trigger for the singer during song resolution.
- impact: author "whenever this character sings a song" abilities with `event: "sing"` and resolve the effect directly when the runtime auto-queues and resolves the bag.
- verification: `bun test packages/lorcana/lorcana-cards/src/cards/004/characters/004-cinderella-melody-weaver.test.ts`

## 2026-03-19 - pay-cost-triggered-item-banish

- signal: Clarabelle - Clumsy Guest's play trigger needed the additional 2 ink payment modeled as a nested `pay-cost` effect before the chosen-item banish resolved.
- impact: for "may pay N to banish chosen item" character triggers, prefer `chooser: "CONTROLLER"` with `type: "pay-cost"` wrapping the chosen-item banish effect; the bag resolution can then target any item in play cleanly.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/005/characters/086-clarabelle-clumsy-guest.test.ts`

## 2026-03-19 - discard-play-action-still-covered

- signal: `Circle of Life` migrated cleanly with the existing `play-card` from `discard` action effect; no engine patch was needed.
- impact: for similar song/actions, check the current action DSL before inventing a runtime gap.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/001/actions/065-circle-of-life.test.ts`

## 2026-03-19 - trigger-time-board-state-conditions

- signal: triggered abilities with board-state `comparison` or `resource-count` conditions were still queuing a bag even when the condition was false.
- impact: check those conditions eagerly in triggered-ability matching so end-turn "if" text does not surface a dead prompt.
- verification: `bun test --cwd packages/lorcana/lorcana-engine ./src/runtime-moves/effects/triggered-abilities.test.ts`; `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/005/characters/084-clarabelle-light-on-her-hooves.test.ts`

## 2026-03-19 - support-aura-static-filter

- signal: a character aura that buffs "your other characters with Support" is expressed cleanly with a static `modify-stat` effect targeting `owner: "you"`, `zones: ["play"]`, `excludeSelf: true`, and a `has-keyword` filter.
- impact: future Support-aura cards can reuse the same static target shape instead of introducing card-specific runtime behavior.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/010/characters/181-clarabelle-news-reporter.test.ts`

## 2026-03-19 - discard-classification-condition-needs-explicit-target-query

- signal: Coldstone's "2 or more Gargoyle character cards in your discard" trigger is safest as a structured `target-query` condition instead of a natural-language `expression` string.
- impact: future filtered discard-count triggers should prefer explicit query conditions so the runtime can evaluate the zone, type, and classification deterministically.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/010/characters/051-coldstone-reincarnated-cyborg.test.ts`

## 2026-03-19 - conditional-enters-play-exerted-static-ability

- signal: conditional "enters play exerted unless you have X in play" cards need the play-card helper to evaluate the static ability condition before applying `enters-play-exerted`.
- impact: future conditional enter-play exerted cards can stay on the static restriction pattern as long as the condition is checked in play resolution.
- verification: `bun test --cwd packages/lorcana/lorcana-engine ./src/runtime-moves/moves/core/play-card.test.ts`; `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/006/characters/007-dale-friend-in-need.test.ts`

## 2026-03-19 - classification-limited-ready-challenge-grant

- signal: "can challenge ready Villain characters" can be represented as a static `grant-ability` with a `classification` payload, and the challenge rule can gate ready defenders by that classification.
- impact: future ready-challenge permissions that are classification-limited should keep the classification on the granted ability payload and assert against a ready defender of the matching class.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/011/characters/192-darkwing-duck-cool-under-pressure.test.ts`

## 2026-03-19 - return-from-discard-trigger-selection

- signal: mandatory `return-from-discard` play triggers need `target-analysis` to count discard-card selection as explicit targeting, and pending selection context must not treat `target: "CONTROLLER"` as a player choice.
- impact: future discard-return triggers should surface a real discard-card prompt only when eligible discard cards exist; empty discard piles should resolve cleanly without a bogus pending target-selection.
- verification: `bun test packages/lorcana/lorcana-cards/src/cards/001/characters/006-hades-lord-of-the-underworld.test.ts`

## 2026-03-19 - quest-triggered-opponent-discard-pending-flow

- signal: Daisy Duck - Secret Agent quests into an opponent-facing discard choice that resolves as opponent pending input; the controller does not need an explicit visible bag-count assertion in the card test.
- impact: future "each opponent chooses and discards a card" quest triggers should resolve the opponent pending directly and assert zone changes on the chosen hand card.
- verification: `bun test packages/lorcana/lorcana-cards/src/cards/002/characters/076-daisy-duck-secret-agent.test.ts`

## 2026-03-19 - evasive-challenge-gameplay-check

- signal: keyword-only Evasive character cards are better proven with multiplayer challenge restrictions than with a metadata-only `hasEvasive` smoke check.
- impact: future Evasive-only character tests should assert `canChallenge` against exerted defenders with both non-Evasive and Evasive attackers.
- verification: `bun test packages/lorcana/lorcana-cards/src/cards/005/characters/111-daisy-duck-spotless-food-fighter.test.ts`

## 2026-03-19 - rush-challenge-gameplay-check

- signal: Rush-only character cards are better proven with a multiplayer immediate-challenge assertion than with a metadata-only `hasRush` smoke check.
- impact: future Rush-only character tests should keep the keyword assertion, but also verify the card can challenge an exerted defender on the turn it is played.
- verification: `bun test packages/lorcana/lorcana-cards/src/cards/011/characters/043-darkwing-duck-darkwolf-dog.test.ts`

## 2026-03-21 - during-your-turn-evasive-plus-discard-activated-challenger

- signal: Jasmine - Fearless Princess had a static "during your turn gains Evasive" ability that was modeled correctly, but the activated ability cost was missing `discardCards: 1, discardChosen: true`; the ability also lacked `name:` for activation routing.
- impact: activated abilities with "choose and discard a card" as a cost must include `discardCards: 1, discardChosen: true` in the cost object and a `name:` field for `activateAbility(... ability: "NAME" ...)` targeting; "during your turn" static Evasive is tested via `canChallenge` against exerted defenders on your own turn and the opponent's turn.
- verification: `bun test packages/lorcana/lorcana-cards/src/cards/009/characters/178-jasmine-fearless-princess.test.ts`

## 2026-03-22 - chosen-opponent-bag-then-discard-choice

- signal: triggered character abilities authored with `target: "OPPONENT"` now surface a bag-resolution step before the controller-facing discard-choice pending effect, while the same effects auto-resolve fully when the filtered opponent hand has no legal discard candidates.
- impact: future tests for "chosen opponent reveals their hand and discards ..." should resolve the bag before `respondWith(...)` only when a valid discard target exists; zero-candidate cases should assert the final zone state without forcing a bag resolution. Optional targeted buffs with no legal candidates should expect no bag at all.
- verification: `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/008/characters/007-ludwig-von-drake-all-around-expert.test.ts ./src/cards/008/characters/155-anita-radcliffe-dog-lover.test.ts ./src/cards/004/characters/024-ursula-erics-bride.test.ts ./src/cards/011/characters/016-timon-snowball-swiper.test.ts`

## 2026-03-22 - ordered-put-on-bottom-target-snapshots

- signal: `Under the Sea` exposed that ordered `put-on-bottom` pending effects were queued without a `selectionContext`, so pending resolution re-ran live target legality after the first card moved and rejected the rest of the ordered batch.
- impact: future ordered bottom-of-deck effects must snapshot the full candidate set, min/max selection count, and chooser when the pending effect is created; do not rely on recomputing `selector: "all"` legality during resolution.
- verification: `bun test --cwd packages/lorcana/lorcana-engine ./src/runtime-moves/resolution/action-effects/composed-effect-resolver.test.ts`; `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/004/actions/095-under-the-sea.test.ts ./src/cards/009/actions/097-under-the-sea.test.ts`; `bun test --cwd packages/lorcana/lorcana-cards ./src/cards/004/actions/028-look-at-this-family.test.ts ./src/cards/004/actions/061-second-star-to-the-right.test.ts ./src/cards/004/actions/095-under-the-sea.test.ts ./src/cards/004/actions/128-a-pirates-life.test.ts ./src/cards/004/actions/162-dig-a-little-deeper.test.ts ./src/cards/004/actions/198-the-mob-song.test.ts ./src/cards/009/actions/025-look-at-this-family.test.ts ./src/cards/009/actions/026-circle-of-life.test.ts ./src/cards/009/actions/060-second-star-to-the-right.test.ts ./src/cards/009/actions/097-under-the-sea.test.ts ./src/cards/009/actions/130-i2i.test.ts ./src/cards/009/actions/132-a-pirates-life.test.ts ./src/cards/009/actions/166-dig-a-little-deeper.test.ts ./src/cards/009/actions/202-the-mob-song.test.ts ./src/cards/009/actions/225-circle-of-life-enchanted.test.ts ./src/cards/009/actions/234-i2i-enchanted.test.ts ./src/cards/008/actions/042-it-means-no-worries.test.ts ./src/cards/008/actions/079-fantastical-and-magical.test.ts ./src/cards/008/actions/115-stopped-chaos-in-its-tracks.test.ts ./src/cards/008/actions/147-nothing-we-wont-do.test.ts ./src/cards/008/actions/175-heads-held-high.test.ts ./src/cards/008/actions/202-beyond-the-horizon.test.ts ./src/cards/008/actions/212-fantastical-and-magical-enchanted.test.ts`
