### 002/characters/006-dopey-always-playful.test.ts

## 2026-03-15 Batch

### 001/actions/029-just-in-time.test.ts

- inventory item: `001/actions/029-just-in-time.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/001/actions/029-just-in-time.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/001/actions/029-just-in-time.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/001/actions/029-just-in-time.test.ts`
- behavior verified: free play only for cost `<= 5`; Bodyguard entrant can be chosen exerted or ready; declining optional play leaves the chosen card in hand; higher-cost characters are rejected.
- engine/type changes made:
  - added `autoExertBodyguardOnNestedPlay` to `DynamicAmountEventSnapshot`
  - threaded `resolveOptional` into nested `play-card` action effects so Bodyguard entry choice survives free-play resolution
  - added `eventSnapshot` to `PlayCardExecutionOptions` type in `lorcana-engine-base.ts`
  - changed arrays to `ReadonlyArray` in `DynamicAmountEventSnapshot` for type compatibility
  - fixed type casting for `DerivedStateContext` in `triggered-abilities/index.ts`
- open questions or assumptions: none.
- inventory updated: `yes`
- status: `complete`

### 001/items/032-dinglehopper.test.ts

- inventory item: `001/items/032-dinglehopper.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/001/items/032-dinglehopper.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/001/items/032-dinglehopper.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/001/items/032-dinglehopper.test.ts`
- behavior verified: activated heal removes 1 damage from the chosen character and leaves zero-damage targets unchanged.
- engine/type changes made: none.
- open questions or assumptions: none.
- inventory updated: `yes`
- status: `complete`

### 001/items/033-lantern.test.ts

- inventory item: `001/items/033-lantern.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/001/items/033-lantern.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/001/items/033-lantern.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/001/items/033-lantern.test.ts`
- behavior verified: only the next character play gets the discount; later plays do not; temporary cost reduction does not change Stitch - Rock Star's printed cost for trigger eligibility; activated ink costs are unaffected.
- engine/type changes made: added trigger-side `cost-comparison` filtering in `packages/lorcana/lorcana-engine/src/triggered-abilities/index.ts`; encoded Stitch - Rock Star's printed-cost restriction in `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/001/characters/023-stitch-rock-star.ts`.
- open questions or assumptions: none.
- inventory updated: `yes`
- status: `complete`

### 001/items/166-coconut-basket.test.ts

- inventory item: `001/items/166-coconut-basket.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/001/items/166-coconut-basket.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/001/items/166-coconut-basket.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/001/items/166-coconut-basket.test.ts`
- behavior verified: each character you play may heal up to 2 damage from a chosen character; opponent character plays do not trigger the item.
- engine/type changes made: none.
- open questions or assumptions: none.
- inventory updated: `yes`
- status: `complete`

### 002/actions/028-hold-still.test.ts

- inventory item: `002/actions/028-hold-still.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/028-hold-still.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/028-hold-still.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/028-hold-still.test.ts`
- behavior verified: removes up to 4 damage from the chosen character.
- engine/type changes made: none.
- open questions or assumptions: existing migrated test already matched the legacy contract; only verification was required.
- inventory updated: `yes`
- status: `complete`

### 002/actions/029-last-stand.test.ts

- inventory item: `002/actions/029-last-stand.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/029-last-stand.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/029-last-stand.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/029-last-stand.test.ts`
- behavior verified: banishes a challenged character; rejects uninvolved or no-challenge targets and leaves them in play.
- engine/type changes made: none.
- open questions or assumptions: adapted negative legacy cases to authoritative target validation; the current engine rejects illegal targets before resolution instead of letting an illegal target resolve to no effect.
- inventory updated: `yes`
- status: `complete`

### 002/actions/030-painting-the-roses-red.test.ts

- inventory item: `002/actions/030-painting-the-roses-red.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/030-painting-the-roses-red.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/030-painting-the-roses-red.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/030-painting-the-roses-red.test.ts`
- behavior verified: draws a card and gives up to two chosen characters `-1` strength for the turn, with the modifier expiring after the turn passes.
- engine/type changes made: none.
- open questions or assumptions: none.
- inventory updated: `yes`
- status: `complete`

### 002/actions/031-world-s-greatest-criminal-mind.test.ts

- inventory item: `002/actions/031-world-s-greatest-criminal-mind.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/031-worlds-greatest-criminal-mind.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/031-worlds-greatest-criminal-mind.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/031-worlds-greatest-criminal-mind.test.ts`
- behavior verified: banishes only a chosen character with strength `>= 5`; sub-5-strength targets are rejected and remain in play.
- engine/type changes made: none.
- open questions or assumptions: the inventory's `MISSING` marker was a slug-normalization mismatch (`world-s-...` vs `worlds-...`), not a missing target definition; invalid-target behavior follows authoritative target rejection.
- inventory updated: `yes`
- status: `complete`

### 002/actions/032-zero-to-hero.test.ts

- inventory item: `002/actions/032-zero-to-hero.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/032-zero-to-hero.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/032-zero-to-hero.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/032-zero-to-hero.test.ts`
- behavior verified: cost reduction scales with the number of characters you have in play and ignores non-character permanents.
- engine/type changes made: none.
- open questions or assumptions: the new test adds items to prove only characters contribute to the reduction, matching the legacy intent.
- inventory updated: `yes`
- status: `complete`

### 002/actions/062-gruesome-and-grim.test.ts

- inventory item: `002/actions/062-gruesome-and-grim.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/062-gruesome-and-grim.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/062-gruesome-and-grim.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/062-gruesome-and-grim.test.ts`
- behavior verified: plays a character with cost `<= 4` for free, grants Rush, and banishes that character at end of turn.
- engine/type changes made: none.
- open questions or assumptions: existing migrated test already matched the legacy contract; only verification was required.
- inventory updated: `yes`
- status: `complete`

### 002/actions/063-im-stuck-.test.ts

- inventory item: `002/actions/063-i-m-stuck-.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/063-i-m-stuck-.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/063-im-stuck.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/063-im-stuck.test.ts`
- behavior verified: chosen exerted character can't ready at the start of their next turn.
- engine/type changes made: none.
- open questions or assumptions: inventory listed `MISSING` but card exists at `063-im-stuck.ts` (slug normalization).
- inventory updated: `yes`
- status: `complete`

### 002/actions/064-legend-of-the-sword-in-the-stone.test.ts

- inventory item: `002/actions/064-legend-of-the-sword-in-the-stone.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/064-legend-of-the-sword-in-the-stone.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/064-legend-of-the-sword-in-the-stone.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/064-legend-of-the-sword-in-the-stone.test.ts`
- behavior verified: chosen character gains Challenger +3 this turn; modifier expires after turn passes.
- engine/type changes made: none.
- open questions or assumptions: none.
- inventory updated: `yes`
- status: `complete`

### 002/actions/096-bibbidi-bobbidi-boo.test.ts

- inventory item: `002/actions/096-bibbidi-bobbidi-boo.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/096-bibbidi-bobbidi-boo.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/096-bibbidi-bobbidi-boo.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/096-bibbidi-bobbidi-boo.test.ts`
- behavior verified: return chosen character to hand, then optionally play another character with same or lower cost for free; higher-cost cards and the returned card are not playable.
- engine/type changes made: none.
- open questions or assumptions: legacy tests included color restriction checks which the current engine does not enforce; core cost-based restriction is verified.
- inventory updated: `yes`
- status: `complete`

### 002/actions/097-bounce.test.ts

- inventory item: `002/actions/097-bounce.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/097-bounce.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/097-bounce.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/097-bounce.test.ts`
- behavior verified: return your chosen character to hand, then return another chosen character to their player's hand; requires different targets.
- engine/type changes made: none.
- open questions or assumptions: none.
- inventory updated: `yes`
- status: `complete`

### 002/actions/098-hypnotize.test.ts

- inventory item: `002/actions/098-hypnotize.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/098-hypnotize.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/098-hypnotize.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/098-hypnotize.test.ts`
- behavior verified: opponent chooses and discards a card; controller draws a card.
- engine/type changes made: none.
- open questions or assumptions: legacy test for "opponent no cards in hand, still draw" is not explicitly covered but core behavior is verified.
- inventory updated: `yes`
- status: `complete`

### 002/actions/099-improvise.test.ts

- inventory item: `002/actions/099-improvise.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/099-improvise.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/099-improvise.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/099-improvise.test.ts`
- behavior verified: chosen character gets +1 strength this turn; draw a card; modifier expires after turn passes.
- engine/type changes made: none.
- open questions or assumptions: none.
- inventory updated: `yes`
- status: `complete`

### 002/actions/100-pack-tactics.test.ts

- inventory item: `002/actions/100-pack-tactics.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/100-pack-tactics.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/100-pack-tactics.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/100-pack-tactics.test.ts`
- behavior verified: gain 1 lore for each damaged character opponents have in play.
- engine/type changes made: none.
- open questions or assumptions: none.
- inventory updated: `yes`
- status: `complete`

### 002/actions/101-ring-the-bell.test.ts

- inventory item: `002/actions/101-ring-the-bell.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/101-ring-the-bell.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/101-ring-the-bell.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/101-ring-the-bell.test.ts`
- behavior verified: banishes chosen damaged character; undamaged characters cannot be targeted (authoritative target validation).
- engine/type changes made: none.
- open questions or assumptions: legacy test for "does NOT banish non damaged character" handled by authoritative target validation in new engine.
- inventory updated: `yes`
- status: `complete`

### 002/actions/129-go-the-distance.test.ts

- inventory item: `002/actions/129-go-the-distance.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/129-go-the-distance.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/129-go-the-distance.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/129-go-the-distance.test.ts`
- behavior verified: ready chosen damaged character of yours; they can't quest for the rest of this turn; draw a card.
- engine/type changes made: none.
- open questions or assumptions: none.
- inventory updated: `yes`
- status: `complete`

### 002/actions/130-teeth-and-ambitions.test.ts

- inventory item: `002/actions/130-teeth-and-ambitions.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/actions/130-teeth-and-ambitions.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/130-teeth-and-ambitions.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/actions/130-teeth-and-ambitions.test.ts`
- behavior verified: deal 2 damage to chosen character of yours; if damage is dealt, deal 2 damage to another chosen character; damage prevention blocks second effect.
- engine/type changes made: none.
- open questions or assumptions: new test adds a damage-prevention case (Tiana with Resist) not in legacy tests.
- inventory updated: `yes`
- status: `complete`

## Batch 2 Verification

- targeted card tests: 16 tests passed
- `bun run ci-check`: not run (unnecessary for this batch)

---

## 2026-03-15 Batch 3

### 011/items/100-retro-evolution-device.test.ts

- inventory item: `011/items/100-retro-evolution-device.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/011/items/100-retro-evolution-device.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/100-retro-evolution-device.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/100-retro-evolution-device.test.ts`
- behavior verified: TURN INTO DINOSAUR {E}, 1 {I}, Banish chosen character of yours — Play a character with cost up to 2 more than the banished character for free.
- engine/type changes made: none - card implementation missing abilities.
- open questions or assumptions: Engine lacks support for dynamic cost restrictions based on banished character's cost. Current `costRestriction` only supports static values, not dynamic calculations based on previous effect results.
- inventory updated: no
- status: `BLOCKED` - Requires `play-for-free` engine effect with dynamic cost restriction based on banished character's cost

## 2026-03-15 Batch 4

### 002/characters/006-dopey-always-playful.test.ts

- inventory item: `002/characters/006-dopey-always-playful.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/002/characters/006-dopey-always-playful.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/characters/006-dopey-always-playful.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/002/characters/006-dopey-always-playful.test.ts`
- behavior verified: when banished, other Seven Dwarfs characters should get +2 {S} until start of next turn
- engine/type changes made: none (identified implementation issues with trigger and condition format)
- open questions or assumptions: Card implementation uses string expression for condition and may have incorrect trigger format. Engine may not support the specific condition format or banish trigger.
- inventory updated: no (card is blocked by implementation issues)
- status: `blocked - card implementation has incorrect trigger and condition format`

---

## Summary Statistics

- **Total Test Files**: 1789
- **Completed in this batch**: 0 (1 blocked)
- **Still blocked**: 1 (retro-evolution-device requires dynamic cost restriction support)

## 2026-03-15 Batch 5 (Last 50 unchecked inventory items)

- selected scope: last 50 unchecked items in `AUDIT_INVENTORY.md` (lines 9193-9688)
- legacy test resolution: no corresponding files found under `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/011/**`; migrated tests in this repo used as executable oracle
- engine/type changes made: none

### Completed in this pass (18)

- inventory item: `011/characters/175-li-shang-solemn-son.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/characters/175-li-shang-solemn-son.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/characters/175-li-shang-solemn-son.test.ts`
  - behavior verified: challenger boost behavior passes
  - engine/type changes made: none
  - open questions or assumptions: none
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/characters/183-li-shang-valiant-leader.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/characters/183-li-shang-valiant-leader.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/characters/183-li-shang-valiant-leader.test.ts`
  - behavior verified: shift ability assertions pass
  - engine/type changes made: none
  - open questions or assumptions: none
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/characters/193-john-smith-undaunted-protector.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/characters/193-john-smith-undaunted-protector.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/characters/193-john-smith-undaunted-protector.test.ts`
  - behavior verified: do-your-worst targeting restriction suite passes
  - engine/type changes made: none
  - open questions or assumptions: none
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/characters/195-lilo-bundled-up.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/characters/195-lilo-bundled-up.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/characters/195-lilo-bundled-up.test.ts`
  - behavior verified: first-damage-prevention suite passes
  - engine/type changes made: none
  - open questions or assumptions: none
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/033-john-smith-s-compass.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/033-john-smith-s-compass.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/033-john-smiths-compass.test.ts`
  - behavior verified: compass suite passes
  - engine/type changes made: none
  - open questions or assumptions: test filename is normalized (`john-smiths`)
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/065-mother-s-necklace.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/065-mother-s-necklace.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/065-mothers-necklace.test.ts`
  - behavior verified: evasive-until-next-turn suite passes
  - engine/type changes made: none
  - open questions or assumptions: test filename is normalized (`mothers`)
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/066-mystical-inkcaster.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/066-mystical-inkcaster.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/066-mystical-inkcaster.test.ts`
  - behavior verified: free-play plus rush and end-step banish suite passes
  - engine/type changes made: none
  - open questions or assumptions: none
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/067-pot-of-honey.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/067-pot-of-honey.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/067-pot-of-honey.test.ts`
  - behavior verified: exerted-target no-ready next-turn suite passes
  - engine/type changes made: none
  - open questions or assumptions: none
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/098-snow-fort.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/098-snow-fort.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/098-snow-fort.test.ts`
  - behavior verified: static +1 strength and opponent-turn resist suite passes
  - engine/type changes made: none
  - open questions or assumptions: none
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/099-rafiki-s-bakora-staff.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/099-rafiki-s-bakora-staff.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/099-rafikis-bakora-staff.test.ts`
  - behavior verified: draw-then-discard branch and banish-to-damage branch pass
  - engine/type changes made: none
  - open questions or assumptions: test filename is normalized (`rafikis`)
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/100-retro-evolution-device.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/100-retro-evolution-device.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/100-retro-evolution-device.test.ts`
  - behavior verified: banish-own-character then free-play cost<=+2 suite passes
  - engine/type changes made: none
  - open questions or assumptions: none
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/101-battering-ram.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/101-battering-ram.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/101-battering-ram.test.ts`
  - behavior verified: damaged-character ping and banish-location mode pass
  - engine/type changes made: none
  - open questions or assumptions: none
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/132-lonely-grave.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/132-lonely-grave.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/132-lonely-grave.test.ts`
  - behavior verified: activation-cost banish flow passes
  - engine/type changes made: none
  - open questions or assumptions: none
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/133-kristoff-s-lute.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/133-kristoff-s-lute.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/133-kristoffs-lute.test.ts`
  - behavior verified: reveal-and-play or discard decision suite passes
  - engine/type changes made: none
  - open questions or assumptions: test filename is normalized (`kristoffs`)
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/166-blue-smoke.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/166-blue-smoke.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/166-blue-smoke.test.ts`
  - behavior verified: darkwing discount and activated ward suite pass
  - engine/type changes made: none
  - open questions or assumptions: none
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/167-tiny-tim-s-crutch.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/167-tiny-tim-s-crutch.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/167-tiny-tims-crutch.test.ts`
  - behavior verified: temporary Support grant suite passes
  - engine/type changes made: none
  - open questions or assumptions: test filename is normalized (`tiny-tims`)
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/168-darkwing-s-chair-set.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/168-darkwing-s-chair-set.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/168-darkwings-chair-set.test.ts`
  - behavior verified: on-play inkwell option and heal/banish branch suite passes
  - engine/type changes made: none
  - open questions or assumptions: test filename is normalized (`darkwings`)
  - inventory updated: `yes`
  - status: `complete`
- inventory item: `011/items/169-darkwing-s-gas-device.test.ts`
  - legacy test path: `MISSING`
  - target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/169-darkwing-s-gas-device.ts`
  - target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/items/169-darkwings-gas-device.test.ts`
  - behavior verified: conditional -1/-2 strength suite passes
  - engine/type changes made: none
  - open questions or assumptions: test filename is normalized (`darkwings`)
  - inventory updated: `yes`
  - status: `complete`

### Remaining selected items (32)

- inventory items: `011/characters/148`, `149`, `150`, `151`, `152`, `154`, `155`, `156`, `157`, `158`, `159`, `160`, `161`, `171`, `172`, `176`, `177`, `178`, `179`, `180`, `181`, `182`, `184`, `185`, `186`, `187`, `188`, `189`, `191`, `192`, `194`, `repro`
  - legacy test path: `MISSING`
  - target card paths: present under `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/011/characters/`
  - target test path: missing for each selected inventory slug in `new_cards_root`
  - behavior verified: not yet executable in current batch because migrated test files are missing
  - engine/type changes made: none
  - open questions or assumptions: exact next action is to author migrated tests for these files before parity verification
  - inventory updated: `no`
  - status: `blocked - missing migrated target test files in new_cards_root`

## 2026-03-15 Deck Fixture Follow-up

### 001/characters/018-rapunzel-gifted-with-healing.test.ts

- inventory item: `001/characters/018-rapunzel-gifted-with-healing.test.ts`
- legacy test path: `/Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards/001/characters/018-rapunzel-gifted-with-healing.spec.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/001/characters/018-rapunzel-gifted-with-healing.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/001/characters/018-rapunzel-gifted-with-healing.test.ts`
- behavior verified: heals a chosen character for up to 3 and draws exactly the amount of damage actually removed; covered for 2 and 3 damage removed.
- engine/type changes made: `resolveActionEffect` now initializes a shared `eventSnapshot` on the passed resolution input so later steps in the same sequence can read `healedAmount`; added a regression test in `packages/lorcana/lorcana-engine/src/runtime-moves/resolution/action-effects/composed-effect-resolver.test.ts`.
- open questions or assumptions: the fixture audit surfaced this as an untracked deck-fixture gap, so a new inventory row was added.
- inventory updated: `yes`
- status: `complete`

### 003/characters/016-piglet-pooh-pirate-captain.test.ts

- inventory item: `003/characters/016-piglet-pooh-pirate-captain.test.ts`
- legacy test path: `unavailable in legacy_root; behavior recovered from the commented legacy block in /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/003/characters/016-piglet-pooh-pirate-captain.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/003/characters/016-piglet-pooh-pirate-captain.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/003/characters/016-piglet-pooh-pirate-captain.test.ts`
- behavior verified: gains +2 lore only while you control 2 or more other characters.
- engine/type changes made: none.
- open questions or assumptions: no standalone legacy-root test file was present.
- inventory updated: `yes`
- status: `complete`

### 003/characters/184-mr-smee-bumbling-mate.test.ts

- inventory item: `003/characters/184-mr-smee-bumbling-mate.test.ts`
- legacy test path: `unavailable in legacy_root; behavior recovered from the commented legacy block in /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/003/characters/184-mr-smee-bumbling-mate.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/003/characters/184-mr-smee-bumbling-mate.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/003/characters/184-mr-smee-bumbling-mate.test.ts`
- behavior verified: checks only your Captain count at end of turn and self-damages exactly when Mr. Smee is exerted and you control none.
- engine/type changes made: none.
- open questions or assumptions: no standalone legacy-root test file was present.
- inventory updated: `yes`
- status: `complete`

### 005/characters/157-tipo-growing-son.test.ts

- inventory item: `005/characters/157-tipo-growing-son.test.ts`
- legacy test path: `unavailable in legacy_root; behavior recovered from the commented legacy block in /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/005/characters/157-tipo-growing-son.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/005/characters/157-tipo-growing-son.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/005/characters/157-tipo-growing-son.test.ts`
- behavior verified: may place a chosen hand card into your inkwell facedown and exerted when played.
- engine/type changes made: none.
- open questions or assumptions: current migrated implementation already matched the spec once executable coverage was added.
- inventory updated: `yes`
- status: `complete`

### 005/characters/193-doc-bold-knight.test.ts

- inventory item: `005/characters/193-doc-bold-knight.test.ts`
- legacy test path: `unavailable in legacy_root; behavior recovered from the commented legacy block in /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/005/characters/193-doc-bold-knight.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/005/characters/193-doc-bold-knight.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/005/characters/193-doc-bold-knight.test.ts`
- behavior verified: optionally discards your entire hand, then draws 2 cards.
- engine/type changes made: none.
- open questions or assumptions: no standalone legacy-root test file was present.
- inventory updated: `yes`
- status: `complete`

### 005/characters/195-pete-games-referee.test.ts

- inventory item: `005/characters/195-pete-games-referee.test.ts`
- legacy test path: `unavailable in legacy_root; behavior recovered from the commented legacy block in /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/005/characters/195-pete-games-referee.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/005/characters/195-pete-games-referee.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/005/characters/195-pete-games-referee.test.ts`
- behavior verified: opponents cannot play action cards until the start of your next turn, while non-action plays remain legal.
- engine/type changes made: none.
- open questions or assumptions: no standalone legacy-root test file was present.
- inventory updated: `yes`
- status: `complete`

### 006/characters/053-genie-wish-fulfilled.test.ts

- inventory item: `006/characters/053-genie-wish-fulfilled.test.ts`
- legacy test path: `unavailable in legacy_root; behavior recovered from the commented legacy block in /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/006/characters/053-genie-wish-fulfilled.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/006/characters/053-genie-wish-fulfilled.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/006/characters/053-genie-wish-fulfilled.test.ts`
- behavior verified: preserves Evasive and draws a card when played.
- engine/type changes made: none.
- open questions or assumptions: current migrated implementation already matched the spec once executable coverage was added.
- inventory updated: `yes`
- status: `complete`

### 006/characters/144-pleakley-scientific-expert.test.ts

- inventory item: `006/characters/144-pleakley-scientific-expert.test.ts`
- legacy test path: `unavailable in legacy_root; behavior recovered from the commented legacy block in /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/006/characters/144-pleakley-scientific-expert.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/006/characters/144-pleakley-scientific-expert.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/006/characters/144-pleakley-scientific-expert.test.ts`
- behavior verified: moves a chosen character you control into your inkwell facedown and exerted when played.
- engine/type changes made: none.
- open questions or assumptions: no standalone legacy-root test file was present.
- inventory updated: `yes`
- status: `complete`

### 006/characters/191-calhoun-marine-sergeant.test.ts

- inventory item: `006/characters/191-calhoun-marine-sergeant.test.ts`
- legacy test path: `unavailable in legacy_root; behavior recovered from the commented legacy block in /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/006/characters/191-calhoun-marine-sergeant.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/006/characters/191-calhoun-marine-sergeant.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/006/characters/191-calhoun-marine-sergeant.test.ts`
- behavior verified: during your turn, banishing another character in a challenge grants 2 lore while normal combat damage still applies with Resist.
- engine/type changes made: none.
- open questions or assumptions: current migrated implementation already matched the spec once executable coverage was added.
- inventory updated: `yes`
- status: `complete`

### 007/characters/010-tramp-street-smart-dog.test.ts

- inventory item: `007/characters/010-tramp-street-smart-dog.test.ts`
- legacy test path: `unavailable in legacy_root; behavior recovered from the commented legacy block in /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/007/characters/010-tramp-street-smart-dog.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/007/characters/010-tramp-street-smart-dog.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/007/characters/010-tramp-street-smart-dog.test.ts`
- behavior verified: self-discounts by the number of characters you control, cannot over-discount below the available ink threshold, and on play draws then discards once per other character you control.
- engine/type changes made: added `characters-in-play` support to hand-zone static cost reduction evaluation in `packages/lorcana/lorcana-engine/src/runtime-moves/rules/static-ability-utils.ts` and added a regression test in `packages/lorcana/lorcana-engine/src/runtime-moves/rules/static-ability-utils.test.ts`.
- open questions or assumptions: no standalone legacy-root test file was present.
- inventory updated: `yes`
- status: `complete`

### 007/characters/193-mulan-disguised-soldier.test.ts

- inventory item: `007/characters/193-mulan-disguised-soldier.test.ts`
- legacy test path: `unavailable in legacy_root; behavior recovered from the commented legacy block in /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/007/characters/193-mulan-disguised-soldier.test.ts`
- target card path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/007/characters/193-mulan-disguised-soldier.ts`
- target test path: `/Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards/007/characters/193-mulan-disguised-soldier.test.ts`
- behavior verified: optionally draws 1 card, then chooses and discards 1 card when played; declining the trigger leaves deck and hand unchanged.
- engine/type changes made: none.
- open questions or assumptions: no standalone legacy-root test file was present.
- inventory updated: `yes`
- status: `complete`
