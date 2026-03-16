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
