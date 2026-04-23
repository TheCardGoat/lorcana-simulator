# Lorcana Rules Memory Bank

## Guardrails

- Use index-first retrieval; avoid broad full-document scans.
- Include citations for every implementation-relevant ruling.
- Flag uncertainty explicitly when source text is ambiguous.

## Entries

## 2026-03-05 - skill-hardening-baseline

- task: Add implementation handoff contract and memory loop.
- failure: Legacy skill lacked explicit output contract for card implementation flow.
- root_cause: Rules skill evolved independently from implementation skills.
- corrective_action: Added structured handoff JSON and citation quality rules.
- preventive_guardrail: Require citations for implementation-facing outputs.
- verification: structural check only (files updated).
- handoff_notes: `lorcana-cards` now consumes behavior constraints directly.

## 2026-03-09 - section-02 gameplay specs

- task: Implement gameplay-section tests for lore victory and empty-deck loss while aligning the Lorcana engine with section 1.8 and 2.3 rules.
- failure: Initial sample specs and several existing tests assumed turns could pass with empty decks and that start-of-turn draw was not part of runtime turn advancement.
- root_cause: Rule summaries were paraphrased too loosely and the engine relied on beginning-phase hooks that were not actually applying the required turn-start effects during `passTurn`.
- corrective_action: Used the indexed rules plus comprehensive citations (`1.8.1.1`, `1.8.1.2`, `1.11.2`, `2.3.3.1`) to move draw/readiness into turn advancement, enforce empty-deck loss on turn end, implement `questWithAll()`, and update affected tests with non-empty deck fixtures where they were testing other behavior.
- preventive_guardrail: When a rule depends on “turn ends” or “start of turn,” verify the runtime transition path directly instead of assuming lifecycle hooks are firing.
- verification: `bun test` passed for `section-01.test.ts`, `section-02.test.ts`, `pass-turn.test.ts`, and `activate-ability.test.ts`; `bun run ci-check` passed.
- handoff_notes: Future rules/spec work that uses pass-turn loops must provide deck fixtures explicitly unless the scenario is intentionally exercising deck-loss behavior.

## 2026-03-09 - floating-triggered-abilities-bag-handoff

- task: Translate the comprehensive-rules floating-trigger model into engine constraints for action-generated temporary triggers and bag sequencing.
- failure: The existing implementation inferred that temporary triggered text could be treated as a granted on-card ability, which conflicts with the floating-trigger definition and misses later qualifying events from newly arrived characters.
- root_cause: The earlier interpretation optimized for available engine primitives and underweighted the distinction between abilities that exist on cards and generated triggered abilities that exist outside the bag until they fire.
- corrective_action: Re-centered the implementation on CR `6.2.7.1`, `6.2.3`, `7.7.3.1`, `7.7.4.2`-`7.7.4.5`, and `6.1.13.4`: generated triggers persist for the stated duration, create bag entries when the condition occurs, pause normal play while bag entries remain, and expire when the duration window ends.
- preventive_guardrail: For any future Lorcana rules handoff involving "Whenever ... this turn" or "At end/start of turn" generated text, treat "exists outside the bag, creates an instance in the bag on trigger" as the default model unless a cited rule explicitly says the ability is granted to a card instead.
- verification: Local rules handoff was exercised by the engine/card implementation pass and validated by the targeted trigger/bag tests plus `bun run ci-check` (all pass).
- handoff_notes: The current runtime only wires the trigger event set needed by existing coverage; future rules handoffs should call out unsupported events/restrictions explicitly instead of assuming full triggered-ability parity.

## 2026-03-10 - section-04-06 challenge specs

- task: Add rule-numbered challenge tests for section 4.6, including a rules-text example.
- failure: Initial assertions tried to read attacker exertion directly from projected card state, which was not stable enough for this spec file, and mixed-controller bag resolution failed when all bag entries were resolved from player one.
- root_cause: Challenge-state observability differs between high-level test helpers and authoritative bag ownership metadata.
- corrective_action: Shifted the exertion assertion to an observable follow-up legality check (`ATTACKER_EXERTED` on a second challenge), resolved bag entries through the owning player view, and used named mock characters for Example A so the test stayed focused on the rule flow.
- preventive_guardrail: In section-spec tests, prefer externally visible behavior over internal meta reads, and when a bag contains triggers from both players, resolve each entry from the player indicated by bag metadata.
- verification: `bun test packages/lorcana/lorcana/src/__tests__/section-04-06.test.ts` passed.
- handoff_notes: Full `bun run ci-check` is still blocked by unrelated pre-existing type errors in `packages/lorcana/lorcana-cards/src/cards/001/characters/142-belle-strange-but-special.ts`, `packages/lorcana/lorcana-engine/src/runtime-moves/move-character-to-location.ts`, and `packages/lorcana/lorcana-engine/src/runtime-moves/resources.ts`.

## 2026-03-10 - section-03 beginning-phase transitions

- task: Confirm and enforce the start-of-turn phase transition rules around Ready/Set triggers and the move into Main.
- failure: The engine reported `main` while a start-of-turn bag still existed, because the flow auto-ended the `beginning` phase before the pending turn transition finished.
- root_cause: `runtime-flow-config` used `endIf: () => true` for `beginning`, so the framework advanced phases independently of `pendingTurnTransition`, bag contents, and pending choices/effects.
- corrective_action: Guarded auto-advancement until no turn-transition work remains, allowed `resolveBag`/`resolveEffect` during `beginning`, and tightened the section 3 spec to assert the phase stays `beginning` until the bag is empty.
- preventive_guardrail: For any Lorcana phase-rule implementation, treat the bag-empty condition in CR `3.2.3.2` and `7.7.4.5` as authoritative; phase changes must not be driven by generic flow hooks alone when a rule-specific transition state is active.
- verification: Verified against CR `3.2.2.3`, `3.2.3.2`, and `7.7.4.2`-`7.7.4.5`; `bun test packages/lorcana/lorcana/src/__tests__/section-03.test.ts`, `bun test packages/lorcana/lorcana-engine/src/runtime-moves/pass-turn.test.ts`, and `bun run ci-check` all passed.
- handoff_notes: Future Draw-step trigger support should preserve the same rule: any triggers created by the draw must resolve before the game is considered to have entered `main`.

## 2026-03-10 - section-03 pending action completion

- task: Align main-phase action timing with unresolved action-effect choices for the section 3 pending-effect spec.
- failure: The engine discarded action cards immediately after creating a pending action-effect choice and still allowed other turn actions while that unresolved effect was waiting for input.
- root_cause: The runtime treated `pendingEffects` as separate from the "turn action fully complete" rule and only guarded turn actions on bag contents, so suspended action resolution did not keep the originating action open.
- corrective_action: Used CR `3.3.2.1`, `4.3.3.2`, `5.4.1.2`, and `6.7.1.2` to keep suspended action cards unresolved in engine limbo until `resolveEffect` finishes, finalize them to discard only after full resolution, and block turn actions with `EFFECT_PENDING` while an action effect is pending.
- preventive_guardrail: When an action effect pauses for player input, treat that state as an unfinished turn action, not a post-action idle state; no new turn actions or discard movement should occur until the pending effect finishes.
- verification: Verified against CR `3.3.2.1`, `4.3.3.2`, `5.4.1.2`, and `6.7.1.2`; `bun test packages/lorcana/lorcana/src/__tests__/section-03.test.ts packages/lorcana/lorcana-cards/src/cards/001/actions/199-ransack.test.ts packages/lorcana/lorcana-cards/src/cards/001/actions/031-you-have-forgotten-me.test.ts packages/lorcana/lorcana-cards/src/cards/001/actions/098-sudden-chill.test.ts`, `bun run check-types --filter=@tcg/lorcana --filter=@tcg/lorcana-cards --filter=@tcg/lorcana-general`, and `bun run ci-check` all passed.
- handoff_notes: Any future action card with chooser-driven or multi-step resolution should reuse the same pending-action path; tests that asserted immediate discard on suspension should be updated to expect limbo-until-resolution instead.

## 2026-03-10 - section-05 card-type specs with real cards

- task: Replace the empty section 5.3, 5.4, and 5.5 rules placeholders with executable specs that cite real card behavior instead of local mock cards.
- failure: The first pass stopped at the target files, but repo-wide verification exposed unrelated skipped placeholder files with stale imports and a separate section-04 challenge fixture seeded from a mock character that lacked a stable id.
- root_cause: The rules-spec suite had several dormant placeholder files that were never reduced to lint-safe skeletons, and one earlier challenge spec relied on a mock helper input that no longer tolerates missing ids during static-resource seeding.
- corrective_action: Added real-card tests for characters, actions, songs, Sing Together, and items; reduced the dormant section-06/07/08 placeholders to minimal skipped suites; and added the missing `fragileDefender` id in `section-04-06.test.ts`.
- preventive_guardrail: When promoting numbered rules sections from comments to runnable specs, use exported real cards wherever possible, but still run full `ci-check` because neighboring placeholder rule files and old mock fixtures can fail independently of the touched section.
- verification: Verified against the section 5 comprehensive rules and local indexed references; `bun test packages/lorcana/lorcana/src/__tests__/section-05-03.test.ts packages/lorcana/lorcana/src/__tests__/section-05-04.test.ts packages/lorcana/lorcana/src/__tests__/section-05-05.test.ts`, `bunx turbo lint --filter=@tcg/lorcana-general`, `bunx turbo test --filter=@tcg/lorcana-general`, and `bun run ci-check` all passed.
- handoff_notes: Section 5 now has real-card regression coverage for core character/action/item rules, and future section work should treat mock-card ids as mandatory whenever those mocks enter seeded multiplayer fixtures.

## 2026-03-10 - section-04-03 payment modifier source zones

- task: Implement section 4.3.6 Example C and align static payment modifiers with the self-referential vs in-play-only rules text.
- failure: The first pass only introduced explicit hand source zones for one card, which fixed the new example but regressed other self-referential hand-time modifiers and exposed adjacent stale rule-spec assertions.
- root_cause: The engine lacked a shared concept for when a static cost-reduction ability functions from hand, and trigger/play-cost code paths were relying on slightly different state/definition views.
- corrective_action: Added hand-vs-play source-zone handling for static cost reductions, keyed self-referential defaults off printed "play this <card type>" text, added named-character and item-count static-condition support, wired trigger strength checks through projected derived state, and corrected stale section-spec fixtures/assertions uncovered by `ci-check`.
- preventive_guardrail: For future payment-modifier work, verify both projection and runtime payment paths against CR `4.3.6`, and treat self-referential printed text as a distinct execution mode from generic in-play static modifiers.
- verification: Verified against CR `4.3.6` and Example C in the comprehensive rules; `bun test packages/lorcana/lorcana/src/__tests__/section-04-03.test.ts`, `bun test packages/lorcana/lorcana/src/__tests__/section-06-04.test.ts`, `bun test packages/lorcana/lorcana-engine/src/projection/card-derived-parity.test.ts`, and `bun run ci-check` all passed.
- handoff_notes: New static payment modifiers that should work from hand can either rely on the self-referential text heuristic or set `sourceZones` explicitly when the printed text is atypical.

## 2026-03-10 - section-06-05 replacement effects

- task: Turn CR `6.5.1` through `6.5.8` into executable rules specs with real cards and use the indexed rules text as the source of truth for replacement timing/order.
- failure: The engine initially treated several `"instead"` clauses and prevention shields as ad hoc card behavior, which was enough for isolated cards but not enough to honor CR `6.5.3` through `6.5.8` once multiple replacement effects interacted.
- root_cause: CR `6.5` requires replacement effects to inspect and modify the resolving event before it happens, with self-replacement first (`6.5.6`, `6.5.7.1`), one application per effect per event (`6.5.5`), and duplicate-instance collapse (`6.5.8`); the older runtime had no shared event model for that.
- corrective_action: Implemented the section tests around the real CR examples for `Stolen Scimitar`, `Snuggly Duckling - Disreputable Pub`, `Seven Dwarfs' Mine - Secure Fortress` with `Sleepy - Sluggish Knight`, `Beast - Selfless Protector`, `Rapunzel - Ready for Adventure`, and `Max Goof - Chart Topper`, plus a focused `Lilo - Bundled Up` regression, and aligned the engine with the rule ordering from `6.5.3`-`6.5.8` and the bag sequencing requirements from `7.7.4.2`-`7.7.4.5`.
- preventive_guardrail: When a CR example says an effect is checked "when it resolves" or uses `"instead"`, do not encode it as an after-the-fact conditional; build the test so the bag resolution point or damage-resolution point is explicit, because that is where CR `6.5` actually applies.
- verification: Verified against the indexed `6.5.1`-`6.5.8`, `6.7.2.2`, and `7.7.4.2`-`7.7.4.5` references; `bun test packages/lorcana/lorcana/src/__tests__/section-06-05.test.ts`, `bun test packages/lorcana/lorcana-cards/src/cards/011/characters/195-lilo-bundled-up.test.ts`, and `bun run ci-check` all passed.
- handoff_notes: Later CR work involving redirects, prevention, or destination swaps should reuse the same replacement-event framing; the section 6.5 examples now serve as the canonical regression set for replacement timing and ordering.

## 2026-03-11 - resist static ability handoff

- task: Verify the Resist rules against the engine and implement the missing static-ability behavior for action damage.
- failure: The first pass assumed action damage was already using the same Resist calculation as challenge damage, and the section spec also assumed any put-damage card failure meant the runtime path was still wrong.
- root_cause: `deal-damage-effect.ts` only summed printed and temporary Resist, so static grants from projection were ignored, while `put-damage-effect.ts` reused the deal-damage resolver and therefore incorrectly applied Resist despite CR `8.8.3`.
- corrective_action: Re-based direct damage on projected derived keyword values so printed, temporary, and static Resist stack per CR `8.8.1`; split put-damage onto a no-Resist path to honor CR `8.8.3`; kept the broader section put-damage spec skipped because the higher-level engine harness still isn't ready for that assertion even though the focused engine test now covers it.
- preventive_guardrail: Any future Lorcana damage implementation should decide up front whether an effect "deals" damage or "puts/moves" damage counters, because only the former gets CR `6.7.2.3` damage-modifier handling and Resist reduction.
- verification: Verified against CR `6.7.2.3`, `8.8.1`, `8.8.2`, and `8.8.3`; `bun test packages/lorcana/lorcana-engine/src/runtime-moves/action-effect/deal-damage-effect.test.ts`, `bun test packages/lorcana/lorcana/src/__tests__/section-08-resist.test.ts`, `bunx turbo lint check-types test --filter=@tcg/lorcana`, and `bun run ci-check` all passed.
- handoff_notes: Challenge damage was already using projected Resist totals; action and challenge damage now agree on static Resist behavior, while put-damage remains covered at the engine-unit level until the multiplayer rules-spec harness can observe it reliably.

## 2026-03-11 - section-06-01 skipped test triage

- task: Determine whether the skipped section 6.1 tests are invalid specs or valid rules coverage blocked by the current engine.
- failure: The Ursula 6.1.11.1 skip initially looked like a possible over-specified test because the engine already passed the single-Ursula "that song" case.
- root_cause: The rules engine enqueues sing triggers with the exact sung card as `triggerSourceCardId`, but `resolvePlayCardEffect` falls back to "last matching card in discard" when that specific instance is no longer present, so the second Ursula trigger incorrectly replays another copy with the same name instead of resolving with no effect under CR `6.1.11.1`.
- corrective_action: Verified the skipped cases against CR `6.1.5.1`, `6.1.7.1`, `6.1.10`, and `6.1.11.1`, and confirmed by targeted local test that 6.1.11.1 is an engine bug while the 6.1.7.1 and 6.1.10 skips are source-coverage gaps and the Launch skip is a malformed test fixture/assertion.
- preventive_guardrail: For any future `"that <card>"` implementation, if the trigger snapshot identifies a specific card instance and the referenced zone no longer contains that instance, do not retarget by name or generic filter; the effect must fail that part and continue with as much as possible.
- verification: Verified against CR `6.1.5.1`, `6.1.7.1`, `6.1.10`, `6.1.11`, and `6.1.11.1`; `bun test packages/lorcana/lorcana/src/__tests__/section-06-01.test.ts --test-name-pattern "That song|Launch|6.1.7.1|6.1.10"` and a temporary same-directory Bun test for the 6.1.11.1 Ursula scenario reproduced the failure (`Expected lore 4, received 6` after resolving the second bag effect).
- handoff_notes: The section file can safely unskip 6.1.11.1 once `play-card` effects stop falling back to another matching discard card when the exact referenced instance is gone; the other two placeholder skips need new real-card fixtures, not engine work.

## 2026-03-11 - section-06-01 that-card zone enforcement

- task: Implement the CR `6.1.11.1` fix for Ursula's "that song" replay and verify the section tests after the runtime change.
- failure: Making the resolver honor exact-card zone checks surfaced a separate ambiguous rules test in `6.1.7` that was selecting a discard replay target by card definition despite another copy already being in play.
- root_cause: CR `6.1.11.1` requires zone checking for the exact referenced card instance, but one older test was depending on pre-fix fallback behavior rather than explicitly selecting the discard instance it meant to replay.
- corrective_action: Kept the rules interpretation unchanged, enforced exact-card zone failure for Ursula-style replay, and updated the unrelated `6.1.7` rules test fixture to use the discard instance id so it still models the intended free-play timing example without relying on name-based fallback.
- preventive_guardrail: When a rules example depends on "that card" or any zone-specific identity reference, use concrete instance ids in executable fixtures whenever duplicate copies can exist in multiple zones.
- verification: CR `6.1.11`, `6.1.11.1`; `bun test --cwd /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana ./src/__tests__/section-06-01.test.ts --test-name-pattern "That song"` (pass); `bun test --cwd /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana ./src/__tests__/section-06-01.test.ts --test-name-pattern "6.1.7\\. Playing a card for free ignores alternate costs"` (pass); `bun run ci-check` (pass).
- handoff_notes: The section 6.1 rules file now cleanly distinguishes exact-instance "that card" semantics from generic discard replay examples, which should reduce future false positives when tightening replay selection rules.

## 2026-03-12 - set 001 item happy-path implementation

- task: Move the set 001 item suite from placeholder RED tests to active GREEN coverage and align the item implementations with the current multiplayer engine.
- failure: The first pass nearly widened the target DSL because `Sword of Truth` was authored with a `classification` filter shape that does not match the current chosen-target filter syntax.
- root_cause: The runtime already supports classification filtering for chosen targets via `has-classification`, but the card implementation used a stale filter spelling while the rules work also required exact turn-duration behavior for Support, quest restrictions, challenge restrictions, and inkwell placement.
- corrective_action: Implemented the real item abilities and active Bun tests, switched `Sword of Truth` to `has-classification`, explicitly kept Fishbone Quill's inkwell placement face down and ready, and derived the duration/activation expectations from CR `4.2.3.2`, `4.4.2`, `4.5.1.2`, `4.6.4.3`, `5.5.4`, `6.3.1.2`, `7.5.2`, `7.5.6`, `8.13.1`, and `3.4.1.2`.
- preventive_guardrail: For future Lorcana item work, prefer the currently supported target/filter vocabulary (`has-classification`, `target-query`, `activateAbility(card, { ability, targets })`) over ad hoc filter spellings, and always verify temporary effects against explicit turn progression instead of same-turn snapshots only.
- verification: Verified against CR `4.2.3.2`, `4.4.2`, `4.5.1.2`, `4.6.4.3`, `5.5.4`, `6.3.1.2`, `7.5.2`, `7.5.6`, `8.13.1`, and `3.4.1.2`; `bun test packages/lorcana/lorcana-cards/src/cards/001/items/033-lantern.test.ts packages/lorcana/lorcana-cards/src/cards/001/items/066-magic-mirror.test.ts packages/lorcana/lorcana-cards/src/cards/001/items/134-poisoned-apple.test.ts packages/lorcana/lorcana-cards/src/cards/001/items/135-shield-of-virtue.test.ts packages/lorcana/lorcana-cards/src/cards/001/items/136-sword-of-truth.test.ts packages/lorcana/lorcana-cards/src/cards/001/items/167-eye-of-the-fates.test.ts packages/lorcana/lorcana-cards/src/cards/001/items/168-fishbone-quill.test.ts packages/lorcana/lorcana-cards/src/cards/001/items/169-magic-golden-flower.test.ts packages/lorcana/lorcana-cards/src/cards/001/items/170-scepter-of-arendelle.test.ts packages/lorcana/lorcana-cards/src/cards/001/items/202-frying-pan.test.ts packages/lorcana/lorcana-cards/src/cards/001/items/204-plasma-blaster.test.ts`, `bun run check-types --filter=@tcg/lorcana --filter=@tcg/lorcana-cards --filter=@tcg/lorcana-general`, and `bun run ci-check` all passed.
- handoff_notes: The set 001 item files now serve as current examples for zero-target activated abilities, direct targeted abilities, next-turn restriction expiry, and face-down inkwell assertions; the refreshed test-generation skill points future contributors at those exact patterns.

## 2026-03-12 - set 002 item activated abilities and extra costs

- task: Move the set 002 item batch from RED to GREEN with active Bun tests and real production implementations, including `Binding Contract`'s extra exerted-character activation cost and updated test-generation guidance.
- failure: Several item files were still empty or using stale DSL shapes, and the runtime `activateAbility` helper only understood self-exert and ink costs, so a printed cost like `{E}, {E} one of your characters` could not be expressed or validated from tests.
- root_cause: The card layer had drifted from the current engine vocabulary in three places: unsupported conditional syntax (`Sleepy's Flute`), stale filter/target spellings for discard and Dragon/Support selection (`Dragon Gem`, `Fang Crossbow`), and missing runtime plumbing for selected extra exert costs (`Binding Contract`).
- corrective_action: Implemented the 13 item abilities with current effect/target syntax, added activated-ability input support for `costs.exertCharacters`, taught discard-return target analysis to respect Support keyword filtering, and updated the skill doc to use the current helper patterns from active tests (`activateAbility(card, { ability, targets, costs })`, `playCard(..., { amount })`, and `isExerted(card)` for definition-based assertions).
- preventive_guardrail: For future Lorcana item work, treat CR `4.4.2` and `4.4.3.4` activated abilities as requiring fully pay-and-validateable costs before effect resolution, use CR `6.1.5.1`/`6.1.13.3` sequencing for "then" effects like `Dinner Bell`, and prefer current target DSL filters (`has-keyword`, `has-classification`, discard-return filters) instead of ad hoc target enums that are declared but not runtime-backed.
- verification: Verified against CR `1.7.3`, `1.7.5`, `4.4.2`, `4.4.2.1`, `4.4.3.4`, `5.5.4`, `6.1.2`, `6.1.3`, `6.1.5.1`, `6.1.11.1`, `6.1.13.3`, `6.1.13.4`, `6.3.1.2`, `6.7.1.2`, `6.7.2.4`, `7.1.6`, `7.5.2`, `7.5.6`, `8.8.1`, `8.8.2`, `8.8.3`, `8.9.1`, and `8.13.1`; `bun test packages/lorcana/lorcana-cards/src/cards/002/items/{033-dragon-gem,034-sleepys-flute,065-binding-contract,066-croquet-mallet,067-perplexing-signposts,068-the-sorcerers-spellbook,102-ratigans-marvelous-trap,134-dinner-bell,136-sword-in-the-stone,166-fang-crossbow,167-gumbo-pot,202-last-cannon,203-mouse-armor}.test.ts`, `bun run check-types --filter=@tcg/lorcana --filter=@tcg/lorcana-cards --filter=@tcg/lorcana-general`, and `bun run ci-check` all passed.
- handoff_notes: The set 002 item batch now serves as the current regression set for extra activated costs, discard-to-hand keyword filtering, damage-based temporary modifiers, and until-start-of-next-turn Resist behavior; future tests should copy these patterns instead of the older placeholder syntax.

## 2026-03-12 - set 003 item activated abilities and pending-resolution syntax

- task: Move the set 003 item batch from RED to GREEN by implementing the real item abilities, activating the placeholder specs with current Bun syntax, and refreshing the test-generation skill.
- failure: Several item files still used unsupported free-form conditional nodes (`type: "if"` with `expression` strings), incorrect self-banish costs were authored as exert costs, and the skill doc did not show the currently valid pending-resolution syntax for named-card and discard-choice prompts.
- root_cause: The authored card layer had drifted from the engine's supported strict condition/effect vocabulary, especially for named-character checks, turn-metric checks, next-play cost reductions, and reveal/name pending effects.
- corrective_action: Re-authored the items to use supported condition/effect shapes (`has-named-character`, `turn-metric`, `cost-reduction`, `gain-keyword`, `name-a-card`, `revealed-matches-named`), added active Bun tests for the 10 requested items, and updated the skill doc with the validated `resolvePendingEffect(card, { namedCard })`, `respondWith(cardToDiscard)`, and `getPendingEffects()` patterns.
- preventive_guardrail: For future Lorcana item work, treat CR `4.4.2`, `4.4.3.4`, `5.5.4`, `6.1.13.3`, `6.1.13.4`, `6.3.1.2`, `7.5.2`, `7.5.6`, and `8.13.1` as the baseline for item activations, temporary durations, inkwell placement, and Support; avoid string-expression conditions when the engine already has a typed condition for the rule text.
- verification: Verified against CR `4.4.2`, `4.4.3.4`, `5.5.4`, `6.1.13.3`, `6.1.13.4`, `6.3.1.2`, `7.5.2`, `7.5.6`, and `8.13.1`; `bun test packages/lorcana/lorcana-cards/src/cards/003/items/{029-cleansing-rainwater,030-heart-of-atlantis,031-wildcats-wrench,064-the-lamp,065-the-sorcerers-hat,097-airfoil,099-starlight-vial,166-scrooges-top-hat,200-gizmosuit,210-the-sorcerers-hat-enchanted}.test.ts`, `bun run check-types --filter=@tcg/lorcana --filter=@tcg/lorcana-cards --filter=@tcg/lorcana-general`, and `bun run ci-check` all passed.
- handoff_notes: The set 003 item tests now provide current examples for self-banish item activations, next-play cost reductions on characters/actions/items, named-card pending prompts, discard-choice pending prompts, and until-start-of-next-turn keyword expiry.

## 2026-03-12 - set 004 item modal abilities and discard costs

- task: Move the requested set 004 item batch from RED to GREEN with real item implementations, active Bun tests, and refreshed current-syntax guidance for multiplayer `activateAbility(...)` flows.
- failure: The batch mixed placeholder tests, stale card DSL, and runtime gaps, so several printed item abilities could not be expressed or validated with the current engine, especially modal activated abilities, discard-card activation costs, and temporary triggered bonuses.
- root_cause: The engine only handled a narrow subset of activation costs, temporary structured triggered abilities were skipped on cards without printed triggered abilities, static item `enters-play-exerted` handling was missing, and the shared `name` filter did not honor the `has-named-character` condition shape emitted by the current condition evaluator.
- corrective_action: Implemented the 12 item definitions and active tests, added `activateAbility(..., { choiceIndex, costs: { discardCards } })` support, collected temporary structured triggered abilities from card meta, applied static item `enters-play-exerted` on entry, and taught runtime target resolution to accept `filter.name` for named-character checks.
- preventive_guardrail: For future item work, model CR `4.4.2` and `4.4.3.4` activations as fully pay-and-validateable costs before effects resolve, prefer typed conditions like `has-named-character` over ad hoc string logic, and treat temporary `"Whenever ... this turn"` text as a real temporary triggered ability that still needs bag resolution coverage in tests.
- verification: Verified against CR `3.2.1.2`, `4.4.2`, `4.4.3.4`, `6.7.2.3`, `7.5.2`, `7.5.6`, `8.3.1`, `8.3.3`, `8.5.1`, `8.5.2`, `8.6.1`, `8.9.1`, and `8.13.1`; `bun test packages/lorcana/lorcana-cards/src/cards/004/items/{031-miracle-candle,064-mystical-rose,065-rose-lantern,066-tritons-trident,132-medallion-weights,133-the-plank,134-vitalisphere,167-great-stone-dragon,168-ice-block,200-fortisphere,201-imperial-bow,202-rls-legacys-cannon}.test.ts` and `bun run check-types --filter=@tcg/lorcana --filter=@tcg/lorcana-cards --filter=@tcg/lorcana-general` passed.
- handoff_notes: This set 004 batch is now the canonical regression set for modal item activations, discard-card activation costs, temporary triggered item buffs, and item enter-exerted behavior; future tests should copy the current `activateAbility(card, { choiceIndex, targets, costs })` syntax from these active files.

## 2026-03-12 - set 005 item activations, optional prompts, and banish-item costs

- task: Move the requested set 005 item batch from RED to GREEN with real item implementations, active Bun tests, current helper syntax, and updated test-generation guidance.
- failure: The batch still contained placeholder tests, unsupported conditional syntax, wrong activated costs and durations, empty multi-ability items, and one printed cost (`Banish one of your items`) that the runtime helper could not yet express from tests.
- root_cause: The authored card layer had drifted from the engine's strict target/effect vocabulary (`target-query`, chosen-target filters, `until-start-of-next-turn` windows, scry destinations), and `activateAbility(...)` only accepted exert-character and discard-card extra costs even though the printed Sapphire Chromicon cost requires selecting an item to banish.
- corrective_action: Re-authored the 16 set-005 items to current supported DSL, added `costs.banishItems` support through `LorcanaEngineBase`, runtime move params, and `activate-ability`, activated the Bun specs for healing, return-to-hand, discard-cost exertion, optional draw prompts, scry destinations, temporary Ward/Resist windows, lore buffs, and enter-exerted behavior, and refreshed the `lorcana-test-generation` skill with the live syntax now used by those tests.
- preventive_guardrail: For future Lorcana item work, treat CR `4.4.2`, `4.4.2.1`, and `4.4.3.4` activations as fully validateable costs before resolution, use typed conditions like `target-query` instead of string `"if"` expressions, and remember that the multiplayer fixture injects 10 placeholder deck cards unless `deck` is set explicitly.
- verification: Verified against CR `1.2.3`, `1.5.2`, `1.5.3`, `1.7.2`, `1.7.3`, `1.7.5`, `1.7.6`, `3.2.1.3`, `3.4.1.2`, `4.4.1`, `4.4.2`, `4.4.2.1`, `4.4.3.4`, `4.4.4`, `5.5.4`, `6.1.2`, `6.1.3`, `6.1.13.3`, `6.1.13.4`, `6.3.1.2`, `6.3.3`, `6.7.2.4`, `6.7.5`, `7.5.2`, `7.5.6`, `8.8.1`, `8.8.2`, `8.8.3`, `8.13.1`, `8.15.1`, and `8.15.2`; `bun test packages/lorcana/lorcana-cards/src/cards/005/items/{030-healing-decanter,032-amber-chromicon,064-retrosphere,065-half-hexwell-crown,066-amethyst-chromicon,099-obscurosphere,132-potion-of-might,134-ruby-chromicon,165-medal-of-heroes,166-basils-magnifying-glass,167-merlins-carpetbag,168-sapphire-chromicon,200-shield-of-arendelle,201-plate-armor,202-steel-chromicon,223-half-hexwell-crown-epic}.test.ts` and `bun run check-types --filter=@tcg/lorcana --filter=@tcg/lorcana-cards --filter=@tcg/lorcana-general` passed.
- handoff_notes: The set 005 item tests are now the canonical examples for `costs: { discardCards }`, `costs: { banishItems }`, `resolvePendingEffect(card, { resolveOptional })`, `resolvePendingEffect(card, { destinations })`, and explicit `deck: []` / `deck: 2` fixture control for draw-free and turn-duration assertions.

## 2026-03-27 - optional triggered abilities with no legal choices

- task: Diagnose missing bag entries in the Be Prepared multi-trigger simulator test where each player was short one self-banish trigger.
- failure: The engine suppressed optional triggered abilities at enqueue time when their inner targeted effect had zero legal candidates, so `Candlehead - Dedicated Racer` and `The Carpenter - Dinner Companion` never reached the bag after the simultaneous board wipe.
- root_cause: The trigger pipeline applied a convenience optimization that contradicted CR timing: it treated "no legal choices later" as "ability never triggers," even though triggered abilities are added when their condition is met and choices are made only on resolution.
- corrective_action: Removed `shouldSkipOptionalEffectWithNoValidTargets(...)` from `packages/lorcana/lorcana-engine/src/triggered-abilities/index.ts` and updated affected card tests to expect the bag entry, then decline it as a no-op when no legal choice exists.
- preventive_guardrail: Do not suppress a triggered ability merely because its later target choice would be empty; per CR `6.2.2`, `6.2.9`, `1.7.3`, and `1.7.7`, the trigger still enters the bag and resolves with no effect if no legal choices exist.
- verification: Verified against CR `6.2.2`, `6.2.8`, `6.2.9`, `6.7.2.4`, `7.4.3`, and `1.7.7`; `bun test packages/lorcana/lorcana-simulator/src/testing/triggered-abilities/multiple-triggers.test.ts packages/lorcana/lorcana-cards/src/cards/007/characters/017-candlehead-dedicated-racer.test.ts packages/lorcana/lorcana-cards/src/cards/006/characters/044-the-carpenter-dinner-companion.test.ts packages/lorcana/lorcana-cards/src/cards/002/characters/057-pinocchio-on-the-run.test.ts packages/lorcana/lorcana-cards/src/cards/007/characters/157-monsieur-darque-despicable-proprietor.test.ts` and `bun test packages/lorcana/lorcana-cards/src/cards/010/characters/075-vladimir-ceramic-unicorn-fan.test.ts packages/lorcana/lorcana-cards/src/cards/010/characters/087-goldie-ogilt-cunning-prospector.test.ts` passed.
- handoff_notes: Other targeted optionals may now legitimately queue a bag entry instead of silently disappearing; prefer tests that resolve or decline that bag entry over asserting `getBagCount() === 0` unless the trigger condition itself is absent.

## 2026-03-27 - sing-trigger-bag-entry-timing

- task: Determine whether "Whenever this character sings a song" enters the bag immediately when the sing event fires or only after the song's pending effect fully resolves.
- failure: No engine bug required a fix; this was a timing-model clarification requested for Mode B handoff. The risk of an implementation error here is that a developer emits the "sing" trigger event and calls flushTriggeredEventsToBag *before* suspending for the pending-effect target selection, which would incorrectly put the trigger in the bag while the song effect is still waiting for target input—violating CR 7.7.3.1.
- root_cause: The CR is unambiguous (7.7.3.1: "If the triggered ability's condition is met while another effect is resolving, it's added to the bag but the players wait to resolve it until the current effect is completely resolved"), but the interaction between emitTriggeredLorcanaEvent (which only buffers the event in pendingEvents) and flushTriggeredEventsToBag (which converts the buffer into live bag entries) must be respected. The engine correctly delays the flush: for action songs, emitTriggeredLorcanaEvent is called before resolveActionCardEffects, but flushTriggeredEventsToBag is called only AFTER the effect fully resolves (inside the non-suspended branch). When the effect suspends for a pending target-selection, flushTriggeredEventsToBag is NOT called; the flush is deferred until resolveEffect completes. Consequently the "sing" bag entry is not visible to players until after the song's pending effect is resolved.
- corrective_action: No code change needed; the engine already implements the correct rule. This entry documents the confirmed model for future implementers.
- preventive_guardrail: Never call flushTriggeredEventsToBag mid-action when a pending-effect suspension is about to occur. The sing event should be emitted (buffered) before the action-effect resolver runs, but flushed to the bag only after the complete resolution boundary (resolveEffect completion or immediate-resolution path).
- verification: Verified against CR 5.4.1.2, 5.4.4.2, 5.4.5, 6.2.3, 7.7.3.1, 8.12.3, 4.3.4, and play-card.ts lines 1751–1824 plus resolve-effect.ts lines 956/1001 (flushTriggeredEventsToBag call sites). Engine behavior confirmed correct.
- handoff_notes: Implementation tests for "Whenever this character sings a song" cards (e.g. Ursula – Deceiver of All, Elsa – Skating Into the Unknown) should sequence as: (1) play song with singer, (2) if song effect needs a target → call resolvePendingEffect first, then (3) the "sing" bag entry is visible and can be resolved. Do not expect the sing trigger in the bag until after all pending effects from the song are resolved.

## 2026-03-27 - that-card trigger identity plus zone lock

- task: Validate Belle - Snowfield Strategist's `that card from your discard` behavior and reconcile the card implementation with the comprehensive rules.
- failure: The authored Belle ability used a generic `source: "discard"` selector, and the engine's reference resolver ignored explicit zone constraints for reference-based targets. Together, that let Belle choose unrelated discard cards and even move the triggering card from hand after it had already left the discard.
- root_cause: We applied the trigger-subject identity model incompletely. CR `6.1.11`/`6.1.11.1` require both exact-card tracking and checking only the named zone, but the implementation had only a loose discard picker and the target resolver treated `{ ref: ... , zones: [...] }` as identity-only.
- corrective_action: Updated Belle's common and enchanted printings to use `source: { ref: "trigger-subject", zones: ["discard"] }`, fixed `resolveCandidateTargets` to honor explicit zone filters for reference descriptors, and added regression coverage for both the engine-level zone lock and Belle's extra-discard-card scenario.
- preventive_guardrail: For any card text using `that <card>` with an explicit zone phrase like `from your discard`, encode both pieces: use a trigger/reference target to preserve the exact instance and also include the required `zones` constraint so the effect fizzles if that instance changes zones before resolution.
- verification: Verified against CR `6.1.11`, `6.1.11.1`, `6.7.2.4`, `7.1.6`, `7.4.3`, and `7.7.3.1`; `bun test packages/lorcana/lorcana-engine/src/runtime-moves/resolution/action-effects/target-resolver.test.ts`, `bun test packages/lorcana/lorcana-cards/src/cards/011/characters/158-belle-snowfield-strategist.test.ts`, and `bun test packages/lorcana/lorcana-cards/src/cards/011/characters/236-belle-snowfield-strategist-enchanted.test.ts` passed.
- handoff_notes: Recheck any remaining `that card` implementations that still use broad zone selectors like `source: "discard"` or `target: { zones: [...] }` without a trigger reference; they may have the same identity-vs-zone bug under multi-copy or moved-zone scenarios.

## 2026-03-27 - sing together simulator multi-select flow

- task: Implement simulator support for `Sing Together` so a player can choose any number of eligible ready characters whose combined singing value meets the printed threshold.
- failure: The engine runtime already accepted `cost: "singTogether"`, but move discovery and the simulator UI only exposed songs through single-singer `singCard` options, so legal `Sing Together` plays never appeared from the hand.
- root_cause: `singCard` availability was keyed only off `getAvailableSingersForSong(...)`, which checks normal `sing` legality one character at a time. No layer-2 move option existed for the alternate `Sing Together` cost, so the simulator had no candidate pool, threshold metadata, or multi-select state to drive CR `8.12.1`-`8.12.3`.
- corrective_action: Extended engine move options with a `singTogether` payload that carries the threshold plus eligible singer ids/values, taught `LorcanaEngineBase` to expose songs playable only through `Sing Together`, and updated the simulator derived-state and sidebar action-selection flow to enter a multi-select `choose-target` step that toggles singers, tracks the running total, and executes `playCard` with `cost: "singTogether"` and the ordered `singers` array.
- preventive_guardrail: Treat `Sing Together` as a distinct alternate-cost selection flow, not a variant of single-singer `sing`: candidate generation must exclude exerted, drying, and `cant-sing` characters, confirmation must require total value meeting the printed threshold, and every selected character must remain visible to runtime effects that care about "when this character sings a song" under CR `8.12.3`.
- verification: Verified against CR `8.12.1`, `8.12.2`, and `8.12.3`; `bun test packages/lorcana/lorcana-engine/src/available-moves.test.ts`, `AGENT=1 bun test --silent src/lib/features/simulator/model/derived-state.test.ts`, and `AGENT=1 bun test --silent src/lib/features/simulator/context/game-context.mobile-actions.test.ts -t "supports selecting multiple singers before confirming a Sing Together play"` passed from `packages/lorcana/lorcana-simulator`. A focused Playwright run for `e2e/quest-keywords/quest-keywords.e2e.ts` was blocked by an existing harness-load timeout before the simulator test page became visible.
- handoff_notes: Future teammate support can extend the `singTogether` option payload without changing the simulator contract shape; the current first pass is intentionally own-side only, but it already keeps the selected singer list explicit so triggered-ability and rules-sensitive runtime behavior stays correct.

## 2026-03-28 - turn-owner-vs-priority drift on opponent-choice bag effects

- task: Investigate flaky turn passing / priority handoff when an opponent resolves a triggered effect during the active player's turn, using `Cursed Merfolk - Ursula's Handiwork` as the concrete repro.
- failure: The investigation found two engine-side risks: `passTurn` trusted priority-shaped state instead of the actual turn owner, and `resolveEffect` lacked the post-resolution priority restoration that `resolveBag` already had, leaving suspended opponent-choice flows vulnerable to ending with priority still pointed at the chooser.
- root_cause: We were conflating "who currently has a bag/pending choice to act" with "who is the active player." CR `1.3.4.1`, `3.4.2`, and `7.7.4.5` keep those concepts separate: only one player has the turn, the bag can temporarily require another player to make choices, and once the bag is empty the game continues with the active player.
- corrective_action: Added authoritative turn-owner validation to `passTurn` based on OTP plus completed turns rather than priority holder, restored priority to the derived turn player after `resolveEffect` finishes and no further bag/challenge/turn-transition work remains, and added regressions for the suspended `Cursed Merfolk` discard flow and the mis-set-priority `passTurn` case.
- preventive_guardrail: Any future timing work must derive turn ownership from turn state, not from transient priority / chooser state; opponent-choice bag and pending-effect flows should always end by returning control to the active player unless a cited rule-driven transition immediately changes turns.
- verification: Verified against CR `1.3.4.1`, `3.3.2.1`, `3.4.1.1`, `3.4.2`, `6.2.3`, `7.7.3.1`, `7.7.4.2`-`7.7.4.5`, and challenge Example B in section `4.6`; `bun test packages/lorcana/lorcana-engine/src/runtime-moves/moves/turn/pass-turn.test.ts`, `bun test packages/lorcana/lorcana-cards/src/cards/003/characters/070-cursed-merfolk-ursulas-handiwork.test.ts`, and `bun test packages/lorcana/lorcana-simulator/src/testing/rules/section-06-01.test.ts --test-name-pattern "6.1.1"` passed. Filtered `bun run check-types --filter=@tcg/lorcana-engine --filter=@tcg/lorcana-cards` remains blocked by pre-existing unrelated `packages/lorcana/lorcana-engine/src/automation/planner.ts` type errors.
- handoff_notes: The new regressions cover both the direct bag resolution and the suspended pending-choice path for opponent-owned triggers on the active player's turn; if similar bugs appear on other turn actions, audit any remaining move validators that still key off `currentPlayer` / priority rather than the derived turn owner.

## 2026-03-27 - shift alternate-cost payment modifiers

- task: Validate whether generic payment modifiers reduce Shift costs and align simulator plus engine coverage with the official rules.
- failure: The initial signal looked like an engine bug because the simulator Shift spec was failing on the Pluto scenario, but the actual runtime already allowed the discounted Shift play; the failure was a stale assertion against an old ink error string/code.
- root_cause: We conflated API-contract drift with rules drift. CR `4.3.2.3` and `4.3.6` already make payment modifiers apply to alternate costs, CR `8.10.1` defines Shift as an alternate cost, and the Fabled release note for Pluto explicitly confirms that `Good Dog` reduces Shift payment. The test was still expecting `NOT_ENOUGH_INK` after the engine standardized on `INSUFFICIENT_INK`.
- corrective_action: Updated the simulator Shift test to assert the current `INSUFFICIENT_INK` contract and added engine regression coverage proving that generic character cost reductions apply to Shift while `playMethod: "standard"` reductions do not.
- preventive_guardrail: When a Lorcana rules check points at a payment-modifier bug, first distinguish the printed card cost from the total amount paid; alternate costs still receive applicable payment modifiers unless the effect text or structured `playMethod` restriction says otherwise.
- verification: Verified against CR `1.5.4`, `1.5.5.2`, `4.3.2.2`, `4.3.2.3`, `4.3.6`, and `8.10.1`, plus the Fabled release note ruling "Good Dog" / Shift interaction; `bun test packages/lorcana/lorcana-simulator/src/testing/keyword-abilities/shift.test.ts` and `bun test packages/lorcana/lorcana-engine/src/runtime-moves/rules/static-ability-utils.test.ts` passed.
- handoff_notes: Shift runtime logic did not need to change; future work on payment modifiers should preserve the distinction between unrestricted character reductions and method-scoped reductions such as `playMethod: "standard"` or `playMethod: "shift"`.

## 2026-03-30 - optional effect continuation after partial resolution

- task: Determine the rules expectation for a triggered ability written as "you may draw a card, then choose and discard a card" after the player has already accepted the optional effect and drawn.
- failure: The engine/UI test pattern was close to treating a follow-up discard choice as still cancelable simply because the overall ability started with "may."
- root_cause: The ambiguity came from conflating the optional decision to begin resolving the effect with later choices made during the effect's ordered resolution.
- corrective_action: Re-grounded the interpretation in CR `1.7.2`, `1.7.3`, `1.7.6`, `1.7.7`, `6.7.2.4`, and `7.3.4`: once the player accepts the optional effect, the remaining instructions resolve in order and the discard choice is mandatory if a legal card exists.
- preventive_guardrail: For `"you may ... then ..."` effects, treat the `may` as the choice to perform the effect at all unless later text adds another explicit optional branch such as a second `may` or `up to`; do not infer a mid-resolution cancel window after earlier instructions have already resolved.
- verification: Checked the comprehensive rules master index plus CR text for effect resolution order, choice timing, illegal-action rollback, and discard instructions; no release note overrode this interpretation.
- handoff_notes: Card and simulator tests should not assert metadata that reopens a voluntary cancel path after a player has already resolved the first step of an accepted optional effect.

## 2026-03-30 - fair-information bot gating for deck-aware automation

- task: Validate which opponent zones a "fair" Lorcana bot may inspect when deriving matchup-aware heuristics, while still allowing an "oracle" candidate that intentionally cheats with full deck knowledge.
- failure: The existing deck-aware automation implicitly profiled both decks from full static deck contents, which is fine for an oracle benchmark but not for a fair-information strategy that should only react to public opponent information.
- root_cause: The planning layer had no explicit information-policy boundary, so matchup detection conflated actor-owned private knowledge with opponent hidden zones. The relevant CR split is public zones in `7.1.2` / `7.6.2` versus private zones in `7.1.3`, `7.2.2`, `7.3.2`, and `7.5.4`.
- corrective_action: Grounded the fair-policy implementation in the rules by limiting opponent profiling to public zones only, specifically play and discard, while leaving oracle mode free to use full opponent deck signatures for authored matchup rules.
- preventive_guardrail: Any future "fair" automation or simulator helper must treat opponent deck, hand, and inkwell as hidden unless a printed effect explicitly reveals information; only public-zone evidence should unlock matchup selectors in fair mode.
- verification: Re-checked the master index plus CR `7.1.2`, `7.1.2.1`, `7.1.3`, `7.1.3.1`, `7.2.2`, `7.3.2`, `7.5.4`, and `7.6.2` before implementing the dual-mode best-AI strategy stack and its tests.
- handoff_notes: If a future teammate wants partial-opponent profiling beyond play/discard, require an explicit rules citation or a concrete revealed-information hook before broadening fair-mode knowledge sources.

## 2026-04-01 - vanish vs activated ability targeting

- task: Validate whether Vanish should trigger when `Angel - Experiment 624` chooses `Palace Guard - Spectral Sentry` with `GOOD AIM`, and align the regression with the official rules.
- failure: The regression expected Vanish to banish the illusion after being chosen by an opponent's activated character ability.
- root_cause: The expectation used older or broader "chosen for an action" wording instead of the current CR scope for Vanish, which is limited to being chosen as part of resolving an action's effect.
- corrective_action: Re-grounded the interaction in CR `8.14.1` and `8.14.2`, confirmed the engine's action-only Vanish path was already correct, and updated the Palace Guard regression to assert that Angel's activated ability deals damage without triggering Vanish.
- preventive_guardrail: For Vanish work, treat `be-chosen` as broader than Vanish; only action-card effect resolution can trigger Vanish, while item/character activated abilities may still satisfy other "be chosen" triggers if their source filters allow it.
- verification: Checked the master index, keyword quick reference, CR `7.7.2`, `7.7.3.1`, `7.7.4.5`, `8.14.1`, and `8.14.2`; `bun test packages/lorcana/lorcana-cards/src/cards/008/characters/045-palace-guard-spectral-sentry.test.ts` and `bun test packages/lorcana/lorcana-simulator/src/testing/rules/section-08-vanish.test.ts` passed.
- handoff_notes: Future card tests involving Vanish should pair action-card examples with explicit non-action counterexamples so the narrower trigger condition stays visible in coverage.

## 2026-04-11 - the-958 shift-trigger rules handoff

- task: Validate THE-958 claim that Merlin's "When you play this character, if you used Shift..." search fails when shifted, and derive implementation constraints.
- failure: No rules contradiction found; risk was mis-triaging a now-fixed behavior as an active engine gap.
- root_cause: Shift entry behavior can be confused with generic enter-play semantics unless the alternate-cost and triggered-ability timing rules are checked together.
- corrective_action: Re-confirmed constraints from indexed CR sections for Shift alternate-cost play and triggered ability resolution (`4.3.2`, `4.3.3.1`, `6.2.2`, `6.2.7`, `6.7.2.1`, `8.10.1`) before regression testing.
- preventive_guardrail: For "if you used Shift" bugs, validate both sides explicitly: (1) shift play must still count as "played", and (2) intervening-if checks are resolved at trigger resolution time, not enqueue time.
- verification: Reviewed `.agents/skills/lorcana-rules/indexes/master-index.md`, `indexes/by-section/04-turn-actions.md`, `indexes/by-section/06-abilities-effects-and-resolving.md`, `indexes/by-section/08-keywords.md`, and searched the comprehensive rules for `8.10` and "When you play this character" references.
- handoff_notes: Future shift-trigger regressions should always include both Shift and hard-cast branches to prove the play-context condition gate.
