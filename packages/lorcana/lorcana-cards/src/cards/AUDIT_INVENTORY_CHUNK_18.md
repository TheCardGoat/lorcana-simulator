# Card Test Inventory

Legacy implementation base directory: /Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards
New implementation base directory: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards


**Chunk 18 of 18** | [← Previous](AUDIT_INVENTORY_CHUNK_17.md)


- [x] **011/characters/103-wreck-it-ralph-raging-wrecker.test.ts**
  - Card: `011/characters/103-wreck-it-ralph-raging-wrecker.ts`
    - `should have correct stats`
    - `should not be inkwell card`
    - `should be ruby color`
    - `should be legendary rarity`
    - `should be from SET 011`
    - `should be card number 103`
    - `should have Boost ability with correct structure`
    - `should be able to use Boost ability to put a card under`
    - `should be able to use Boost multiple times across turns`
    - `should have POWERED UP ability defined`
    - `should have base strength of 3 with no cards under`
    - `should get +1 strength for each card under him`
    - `should get +2 strength with 2 cards under him`
    - `should have WHO'S COMIN' WITH ME? ability defined`
    - `should banish characters with strength ≤ 3 when banished with no cards under (uses base strength)`
    - `should banish characters based on strength including boost bonus`
    - `should also banish own characters with strength equal to or less`
    - `should not banish characters with higher strength`
    - `should banish opponent Ward character when targeting all (all effects bypass Ward)`

- [ ] **011/characters/104-scrooge-mcduck-ghostly-ebenezer.test.ts**
  - Card: `011/characters/104-scrooge-mcduck-ghostly-ebenezer.ts`
    - `should have correct stats`
    - `should not be inkwell card`
    - `should be ruby color`
    - `should be uncommon rarity`
    - `should be from SET 011`
    - `should be card number 104`
    - `should have dreamborn, villain, ghost characteristics`
    - `should have Boost ability with correct structure`
    - `should be able to use Boost ability to put a card under`
    - `should be able to use Boost multiple times across turns`
    - `should have COUNTING COINS ability defined`
    - `should have base strength of 3 and willpower of 3 with no cards under`
    - `should get +1 strength and +1 willpower for each card under him`
    - `should get +2 strength and +2 willpower with 2 cards under him`
    - `should get +3 strength and +3 willpower with 3 cards under him`

- [ ] **011/characters/105-donald-duck-nephew-fred.test.ts**
  - Card: `011/characters/105-donald-duck-nephew-fred.ts`
    - `should be a vanilla character with no abilities `
    - `should be able to quest for 1 lore`

- [ ] **011/characters/107-copper-on-the-scent.test.ts**
  - Card: `011/characters/107-copper-on-the-scent.ts`
    - `should have Rush keyword`
    - `should be able to challenge the turn it's played`
    - `should have Reckless keyword`
    - `should not be able to quest due to Reckless`
    - `should have 0 lore value`

- [ ] **011/characters/108-mulan-ready-for-battle.test.ts**
  - Card: `011/characters/108-mulan-ready-for-battle.ts`
    - `should cost full price when no damaged characters in play`
    - `should cost 1 less when a character has damage`
    - `should cost full price when no character with 5+ strength in play`
    - `should cost 1 less when a character with 5+ strength is in play`
    - `should cost 2 less when both conditions are met (damaged character AND 5+ strength character)`
    - `should cost 2 less when conditions are met by different characters`
    - `should be playable for 2 ink when both conditions are met`

- [ ] **011/characters/109-maui-snow-slider.test.ts**
  - Card: `011/characters/109-maui-snow-slider.ts`
    - `should have Rush keyword`
    - `should be able to challenge the turn it's played`

- [ ] **011/characters/110-fa-zhou-honorable-warrior.test.ts**
  - Card: `011/characters/110-fa-zhou-honorable-warrior.ts`
    - `should have 2 damage when played from hand`
    - `should have base willpower of 4 with 2 damage (2 more damage to banish)`
    - `should be banished if willpower is reduced to match damage`

- [ ] **011/characters/111-liquidator-iced-over.test.ts**
  - Card: `011/characters/111-liquidator-iced-over.ts`
    - `First Turn, Not First Player`
    - `First Turn, Not First Player, No ink`
    - `First Turn, First Player`

- [ ] **011/characters/112-elisa-maza-transformed-gargoyle.test.ts**
  - Card: `011/characters/112-elisa-maza-transformed-gargoyle.ts`
    - `should prevent Elisa's own strength from being reduced below printed value`
    - `should prevent other friendly characters' strength from being reduced below printed value`
    - `should allow strength to be increased above printed value`
    - `should work at challenge time with challenger bonus`
    - `should prevent readying when player has 3+ cards in hand`
    - `should allow readying when player has less than 3 cards in hand`

- [ ] **011/characters/114-agnarr-king-of-arendelle.test.ts**
  - Card: `011/characters/114-agnarr-king-of-arendelle.ts`
    - `should have base strength when no Queen is in play`
    - `should get +2 strength when a Queen character is in play`
    - `should get +2 strength when any Queen character is in play (different Queen)`
    - `should NOT get +2 strength when non-Queen character is in play`
    - `should still only get +2 strength when multiple Queens are in play`

- [ ] **011/characters/116-negaduck-public-enemy-number-one.test.ts**
  - Card: `011/characters/116-negaduck-public-enemy-number-one.ts`
    - `Test 1: has Shift ability`
    - `Test 2: can shift onto another Negaduck`
    - `Test 3: triggers when Negaduck challenges another character`
    - `Test 4: opponent loses 1 lore when challenged`
    - `Test 5: player gains 1 lore when challenging`
    - `Test 6: triggers multiple times for multiple challenges`
    - `Test 7: works correctly when challenging exerted characters`
    - `Test 8: opponent can have negative lore`

- [ ] **011/characters/117-hercules-spectral-demigod.test.ts**
  - Card: `011/characters/117-hercules-spectral-demigod.ts`
    - `should have Boost ability`
    - `should allow paying 2 ink to put top card of deck under this character`
    - `should have base strength of 0 without a card under`
    - `should get +3 strength when there is a card under this character`
    - `should maintain +3 strength bonus as long as card remains under`
    - `should not affect willpower (only strength)`

- [ ] **011/characters/118-beast-snowfield-troublemaker.test.ts**
  - Card: `011/characters/118-beast-snowfield-troublemaker.ts`
    - `should have Rush keyword`
    - `should take no damage when challenging while at a location`
    - `should take damage when challenging while NOT at a location`
    - `should take damage when being challenged (defender) while at a location`
    - `should NOT be protected when being challenged after having challenged earlier`
    - `should take damage if the location is banished before the ability resolves`
    - `should take damage if the location is banished before the ability resolves`

- [ ] **011/characters/120-goofy-marley-s-clumsy-spirit.test.ts**
  - Card: `011/characters/120-goofy-marley-s-clumsy-spirit.ts`
    - `should ready an exerted character when ability is accepted`
    - `should keep target exerted when ability is declined`
    - `should prevent the readied character from questing for the rest of the turn`

- [ ] **011/characters/121-goofy-klutzy-skier.test.ts**
  - Card: `011/characters/121-goofy-klutzy-skier.ts`
    - `banishes self and chosen character when activated`
    - `cannot activate if already exerted`

- [ ] **011/characters/122-olaf-snowman-of-action.test.ts**
  - Card: `011/characters/122-olaf-snowman-of-action.ts`
    - `should have ABOUT TIME! ability with correct structure`
    - `should be playable with full cost (no action cards in discard)`
    - `should not be playable with less ink than cost when no action cards in discard`
    - `should be playable with reduced cost when action cards are in discard`
    - `should count 3 action cards in discard for bigger cost reduction`
    - `should have CHAOTIC COLLISION ability defined`
    - `should cause opponent to lose 2 lore when played`
    - `should not reduce opponent lore below 0`

- [ ] **011/characters/123-elsa-ice-artisan.test.ts**
  - Card: `011/characters/123-elsa-ice-artisan.ts`
    - `on play: exerts chosen character with 3 strength or less`
    - `on location play: exerts chosen character with 3 strength or less`
    - `on play: can decline ability`
    - `on play: cannot exert character with strength > 3`
    - `gets +3 Lore when at a location`
    - `does not have bonus when not at a location`

- [ ] **011/characters/124-scrooge-mcduck-ebenezer-scrooge.test.ts**
  - Card: `011/characters/124-scrooge-mcduck-ebenezer-scrooge.ts`
    - `should make opponent lose 1 lore when questing`
    - `should draw 1 card when opponent loses 1 lore`
    - `should not draw a card if opponent has 0 lore (no lore lost)`
    - `should gain lore from questing`
    - `should gain 1 lore at end of turn when opponent has 0 lore`
    - `should not gain lore at end of turn when opponent has lore`

- [ ] **011/characters/125-elsa-concerned-sister.test.ts**
  - Card: `011/characters/125-elsa-concerned-sister.ts`
    - `Test 1: triggers when Elsa is played`
    - `Test 2: next location costs 2 less`
    - `Test 3: reduction applies only to next location (first one is free)`
    - `Test 4: reduction only applies this turn`
    - `Test 5: can play location with cost 3 for only 1 ink`
    - `Test 6: reduction does not apply to characters or items`
    - `Test 7: works with location cost 1 (becomes free with reduction)`

- [ ] **011/characters/126-willie-the-giant-ghost-of-christmas-present.test.ts**
  - Card: `011/characters/126-willie-the-giant-ghost-of-christmas-present.ts`
    - `should be able to use Boost ability`
    - `should not be able to quest unless card put under him this turn`
    - `should be able to quest after using Boost`
    - `should have quest restriction again after passing turn`
    - `should not be able to challenge unless card put under him this turn`
    - `should have challenge restriction again after passing turn`
    - `should be able to quest for lore`

- [ ] **011/characters/137-roo-little-helper.test.ts**
  - Card: `011/characters/137-roo-little-helper.ts`
    - `should put this character facedown under a character with Boost when activated`
    - `should require exerting Roo to activate the ability`
    - `should NOT be able to activate if there are no characters or locations with Boost in play`
    - `should NOT be able to activate if Roo is already exerted`
    - `should only target your own characters or locations with Boost`

- [ ] **011/characters/138-kanga-peaceful-gatherer.test.ts**
  - Card: `011/characters/138-kanga-peaceful-gatherer.ts`
    - `has Boost 2 ability`
    - `Boost 2: places the top card under Kanga when activated`
    - `EXTRA HELP: gets +1 lore while there's a card under this character`
    - `EXTRA HELP: lore bonus is removed when card under leaves`
    - `EXTRA HELP: no lore bonus without card under`

- [ ] **011/characters/139-piglet-entranced-by-snow.test.ts**
  - Card: `011/characters/139-piglet-entranced-by-snow.ts`
    - `should be a vanilla character with no abilities`
    - `should be able to quest for 1 lore`

- [ ] **011/characters/141-minnie-mouse-tiny-tim-s-mother.test.ts**
  - Card: `011/characters/141-minnie-mouse-tiny-tim-s-mother.ts`
    - `Test 1: has Support ability`
    - `Test 2: triggers when Minnie quests`
    - `Test 3: adds Minnie's strength to chosen character`
    - `Test 4: is optional - can be declined`
    - `Test 5: can target any character (including opponent's)`
    - `Test 6: strength bonus lasts only until end of turn`
    - `Test 7: can support multiple times if questing multiple turns`
    - `Test 8: can support different characters on different turns`
    - `Test 9: Minnie herself still quests for her lore value`

- [ ] **011/characters/142-sina-vigilant-parent.test.ts**
  - Card: `011/characters/142-sina-vigilant-parent.ts`
    - `should have alert ability`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be sapphire color`
    - `should be common rarity`
    - `should be from SET 011`
    - `should be card number 142`
    - `should be playable from hand`
    - `should be able to quest for lore`
    - `should be able to be used as ink`

- [ ] **011/characters/143-honker-muddlefoot-timid-genius.test.ts**
  - Card: `011/characters/143-honker-muddlefoot-timid-genius.ts`
    - `BE CAREFUL! Your characters named Darkwing Duck gain Resist +1. (Damage dealt to them is reduced by 1.)`
    - `Darkwing Duck does not gain Resist +1 when Honker is not in play`

- [ ] **011/characters/145-darkwing-duck-drake-mallard.test.ts**
  - Card: `011/characters/145-darkwing-duck-drake-mallard.ts`
    - `should have ward ability`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be sapphire color`
    - `should be uncommon rarity`
    - `should be from SET 011`
    - `should be card number 145`
    - `should have 'super' characteristic (new for Set 011)`
    - `should be playable from hand`
    - `should be able to quest for lore`
    - `should be able to be used as ink`

- [ ] **011/characters/146-jiminy-cricket-ghost-of-christmas-past.test.ts**
  - Card: `011/characters/146-jiminy-cricket-ghost-of-christmas-past.ts`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be sapphire color`
    - `should be uncommon rarity`
    - `should be from SET 011`
    - `should be card number 146`
    - `should have Boost 2 ability`
    - `can activate Boost ability with 2 ink to put top card under character`
    - `can only use Boost once per turn`
    - `should have LOOK INTO YOUR PAST ability defined`
    - `should trigger when a card is put under via Boost`
    - `should be optional - player can decline the ability`
    - `should not trigger when there are no cards in discard`
    - `should be able to quest for lore`

- [ ] **011/characters/147-piglet-cocoa-maker.test.ts**
  - Card: `011/characters/147-piglet-cocoa-maker.ts`
    - `should have correct stats`
    - `should be inkwell card`
    - `should be sapphire color`
    - `should be rare rarity`
    - `should be from SET 011`
    - `should be card number 147`
    - `should have Shift 3 ability`
    - `should have SPECIAL RECIPE ability defined`
    - `should remove up to 2 damage from each of your characters at end of turn`
    - `should remove damage from multiple characters`
    - `should not remove more damage than the character has`
    - `should be able to quest for lore`

- [ ] **011/characters/148-gramma-tala-connected-to-nature.test.ts**
  - Card: `011/characters/148-gramma-tala-connected-to-nature.ts`
    - `should have correct stats`
    - `should not be inkwell card`
    - `should have correct characteristics`
    - `should be sapphire color`
    - `should be rare rarity`
    - `should be from SET 011`
    - `should be card number 148`
    - `has cost reduction ability`
    - `cost reduction ability exists with proper structure`
    - `can be played with sufficient ink (including cost reduction)`
    - `should be able to quest for lore`

- [ ] **011/characters/149-gosalyn-mallard-curious-child.test.ts**
  - Card: `011/characters/149-gosalyn-mallard-curious-child.ts`
    - `allows tutoring an item card from top 4 cards to hand`
    - `allows putting all cards on bottom if no item is chosen`
    - `can only tutor item cards, not characters`
    - `can tutor one of multiple items if available`

- [ ] **011/characters/150-darkwing-duck-dashing-gadgeteer.test.ts**
  - Card: `011/characters/150-darkwing-duck-dashing-gadgeteer.ts`
    - `MODERN MARVEL: Should accept and resolve - move item to bottom of deck`
    - `MODERN MARVEL: If you do - should play item for free after moving item to deck`
    - `MODERN MARVEL: If you do - should skip second effect if first effect is declined`
    - `MODERN MARVEL: Should move item to deck AND play another item for free from discard`

- [ ] **011/characters/151-winnie-the-pooh-hungry-bear.test.ts**
  - Card: `011/characters/151-winnie-the-pooh-hungry-bear.ts`
    - `should return an item card from discard to hand when played`
    - `should allow choosing from multiple items in discard`

- [ ] **011/characters/152-scrooge-mcduck-reformed-ebenezer.test.ts**
  - Card: `011/characters/152-scrooge-mcduck-reformed-ebenezer.ts`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be sapphire color`
    - `should be legendary rarity`
    - `should be from SET 011`
    - `should be card number 152`
    - `should have Shift 4 ability`
    - `should have SPREADING JOY ability defined`
    - `should be optional - player can decline the ability`
    - `should put a card from top of deck under each of your other characters when played`
    - `should grant Ward to each character that received a card until start of next turn`
    - `should grant Ward to multiple other characters when played`
    - `should not put a card under Scrooge himself`
    - `should work correctly when there are no other characters in play`
    - `should be able to quest for lore`

- [ ] **011/characters/154-pete-ghost-of-christmas-future.test.ts**
  - Card: `011/characters/154-pete-ghost-of-christmas-future.ts`
    - `with 0 cards under him, should look at 0 cards (no scry effect)`
    - `should not trigger if another character has cards under them`
    - `with 1 card under him, should look at 1 card and put it in hand`
    - `with 2 card under him, should look at 2 card and put it in hand`

- [ ] **011/characters/155-moana-curious-explorer.test.ts**
  - Card: `011/characters/155-moana-curious-explorer.ts`
    - `should allow inking cards with inkwell from discard when Moana is in play`
    - `should allow inking from discard when an ink-permission effect is active`
    - `should NOT allow inking from discard when Moana is NOT in play`
    - `should NOT allow inking cards without inkwell symbol from discard even when Moana is in play`
    - `should NOT allow inking twice in the same turn (one from hand, one from discard)`

- [ ] **011/characters/156-tamatoa-seeker-of-shine.test.ts**
  - Card: `011/characters/156-tamatoa-seeker-of-shine.ts`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be sapphire color`
    - `should be super_rare rarity`
    - `should be from SET 011`
    - `should be card number 156`
    - `should have Boost 2 ability`
    - `should be able to use Boost ability`
    - `should have Ward ability`
    - `should have ANYTHING THAT GLITTERS ability defined`
    - `should gain +1 lore when putting a card under this character via Boost`
    - `should reset lore bonus at end of turn`
    - `should gain +2 lore when using Boost and Emily Quackfaster adds another card`
    - `should be able to quest for lore`

- [ ] **011/characters/157-morty-fieldmouse-tiny-tim.test.ts**
  - Card: `011/characters/157-morty-fieldmouse-tiny-tim.ts`
    - `should put a card under Morty when putting a card under another character`
    - `should only trigger once per turn`
    - `does not trigger on the opponent's turn`
    - `should gain +1 {L} for each card under him`
    - `should be able to quest for lore`

- [ ] **011/characters/158-belle-snowfield-strategist.test.ts**
  - Card: `011/characters/158-belle-snowfield-strategist.ts`
    - `Resolving the ability puts the card from the discard into the inkwell facedown and exerted`
    - `Resolving the ability after the card leaves the discard, should not put the card into the inkwell`

- [ ] **011/characters/159-mickey-mouse-bob-cratchit.test.ts**
  - Card: `011/characters/159-mickey-mouse-bob-cratchit.ts`
    - `puts a card under Mickey when he quests`
    - `puts multiple cards under Mickey when he quests multiple times`
    - `does not put a card under Mickey if deck is empty`
    - `transfers cards under Mickey to another character when banished in a challenge`
    - `places transferred cards faceup under the chosen character (per FAQ)`
    - `transfers cards under Mickey to a location when banished in a challenge`
    - `transfers multiple cards under Mickey when banished`
    - `does nothing if Mickey has no cards under him when banished`
    - `allows player to decline the optional ability`
    - `transfers cards under Mickey to another character when Mickey is banished as attacker in a challenge`
    - `does not trigger when Mickey is banished outside of a challenge`
    - `transfers cards after state sync (e.g. simulator/multiplayer rehydration)`

- [ ] **011/characters/160-scrooge-mcduck-miserly-ebenezer.test.ts**
  - Card: `011/characters/160-scrooge-mcduck-miserly-ebenezer.ts`
    - `Test 1: should have the BAH, HUMBUG ability defined`
    - `Test 2: should trigger when a card is put into inkwell during your turn`
    - `Test 3: should reduce chosen character's strength by 1 this turn`
    - `Test 4: should only trigger during your turn (not opponent's turn)`
    - `Test 5: strength reduction should last only until end of turn`
    - `Test 6: can target any character in play (including opponent's)`
    - `Test 7: can target Scrooge himself`
    - `should have correct stats`
    - `should not be inkwell card`
    - `should be sapphire color`
    - `should be common rarity`
    - `should be from SET 011`
    - `should be card number 160`
    - `should have storyborn and villain characteristics`

- [ ] **011/characters/161-chief-tui-weaving-a-tale.test.ts**
  - Card: `011/characters/161-chief-tui-weaving-a-tale.ts`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be sapphire color`
    - `should be common rarity`
    - `should be from SET 011`
    - `should be card number 161`
    - `should have AND THEN... ability defined`
    - `should have timesPerTurn flag set`
    - `should have during-your-turn condition`
    - `Test 1: should trigger when adding a card to inkwell during your turn`
    - `Test 2: should allow putting top card on top of deck`
    - `Test 3: should allow putting top card on bottom of deck`
    - `Test 4: should only trigger once per turn (timesPerTurn)`
    - `Test 5: should only trigger during your turn`
    - `Test 6: should reset timesPerTurn at start of new turn`
    - `should be able to quest for lore`

- [ ] **011/characters/171-rapunzel-ethereal-protector.test.ts**
  - Card: `011/characters/171-rapunzel-ethereal-protector.ts`
    - `should have Boost 2 ability`
    - `can activate Boost ability with 2 ink to put top card under character`
    - `should have hasBoost property`
    - `should have CLONK! ability defined`
    - `should trigger when questing with a card under her`
    - `should NOT trigger when questing without a card under her`
    - `should gain lore when questing`
    - `should have correct stats`
    - `should NOT be inkwell card`
    - `should have correct characteristics`
    - `should be steel color`
    - `should be rare rarity`
    - `should be from SET 011`
    - `should be card number 171`

- [ ] **011/characters/172-launchpad-hideout-defender.test.ts**
  - Card: `011/characters/172-launchpad-hideout-defender.ts`
    - `should grant Resist +1 to your locations while Launchpad is in play`
    - `should grant Resist +1 to multiple locations`
    - `should not grant Resist to opponent's locations`
    - `should remove Resist when Launchpad leaves play`
    - `should not grant Resist to characters`

- [x] **011/characters/175-li-shang-solemn-son.test.ts**
  - Card: `011/characters/175-li-shang-solemn-son.ts`
    - `should have Challenger ability`
    - `should get +2 strength while challenging`

- [ ] **011/characters/176-gantu-hamsterviel-s-accomplice.test.ts**
  - Card: `011/characters/176-gantu-hamsterviel-s-accomplice.ts`
    - `should prompt to discard a card from hand when played`
    - `should allow choosing any card from hand to discard`
    - `should handle playing with only Gantu in hand (no other cards to discard)`
    - `should have the ability defined with correct structure`
    - `should target cards in player's hand`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be steel color`
    - `should be uncommon rarity`

- [ ] **011/characters/177-launchpad-trusty-sidekick.test.ts**
  - Card: `011/characters/177-launchpad-trusty-sidekick.ts`
    - `Test 1: should draw and auto-discard when no Darkwing Duck in play`
    - `Test 2: should result in net zero hand change without Darkwing Duck`
    - `Test 3: should NOT require discarding when Darkwing Duck is in play`
    - `Test 4: should work with different Darkwing Duck versions`
    - `Test 5: should have no net hand change without Darkwing Duck`
    - `Test 6: should complete successfully with 1 ink available`
    - `should be able to quest for lore`

- [ ] **011/characters/178-donald-duck-along-for-the-ride.test.ts**
  - Card: `011/characters/178-donald-duck-along-for-the-ride.ts`
    - `should banish chosen item when accepting the optional ability`
    - `should be able to banish opponent's item`
    - `should not banish item when declining the optional ability`
    - `should still trigger when there are no items in play (but have no valid targets)`

- [ ] **011/characters/179-chief-seasoned-tracker.test.ts**
  - Card: `011/characters/179-chief-seasoned-tracker.ts`
    - `should have correct cost, strength, willpower, and lore`
    - `should have correct characteristics`
    - `should be a Steel character`
    - `should allow activation and draw 1 card when an opposing character was banished in a challenge this turn`
    - `should NOT allow activation if no opposing character was banished in a challenge this turn`
    - `should NOT allow activation if opposing character was banished but NOT in a challenge`
    - `should reset condition after turn ends - ability should NOT work next turn without new banish`
    - `should allow multiple activations in the same turn if Chief is readied (e.g., with a card effect)`

- [ ] **011/characters/180-amos-slade-tenacious-tracker.test.ts**
  - Card: `011/characters/180-amos-slade-tenacious-tracker.ts`
    - `should have alert ability`
    - `should have correct stats`
    - `should not be inkwell card`
    - `should have correct characteristics`
    - `should be steel color`
    - `should be common rarity`
    - `should be from SET 011`
    - `should be card number 180`
    - `should be playable from hand`
    - `should be able to quest for lore`

- [ ] **011/characters/181-mchorn-ice-cold-officer.test.ts**
  - Card: `011/characters/181-mchorn-ice-cold-officer.ts`
    - `should have bodyguard ability`
    - `should have correct stats`
    - `should be inkwell card`
    - `should be steel color`
    - `should be common rarity`
    - `should be from SET 011`
    - `should be card number 181`
    - `should be playable from hand`
    - `should be able to quest for lore`
    - `should be able to be used as ink`

- [ ] **011/characters/182-duke-weaselton-surly-crook.test.ts**
  - Card: `011/characters/182-duke-weaselton-surly-crook.ts`
    - `should allow playing a character with cost 2 or less for free when banished`
    - `should allow declining the optional ability`
    - `should NOT trigger when no valid targets exist (cost > 2)`
    - `should play the character for free (no ink required)`

- [x] **011/characters/183-li-shang-valiant-leader.test.ts**
  - Card: `011/characters/183-li-shang-valiant-leader.ts`
    - `should have shift ability`
    - `should have shift 4 in abilities array`
    - `should have shift ability text mentioning Li Shang`

- [ ] **011/characters/184-nani-no-worries.test.ts**
  - Card: `011/characters/184-nani-no-worries.ts`
    - `While this character has no damage, she gets +1 lore.`
    - `While this character has damage, she doesn't get +1 lore.`

- [ ] **011/characters/185-stitch-high-badness-level.test.ts**
  - Card: `011/characters/185-stitch-high-badness-level.ts`
    - `should have Challenger +3 when Lilo is in play`
    - `should not have Challenger when Lilo is not in play`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be steel color`
    - `should be common rarity`
    - `should be from SET 011`
    - `should be card number 185`
    - `should be playable from hand`
    - `should be able to quest for lore`
    - `should be able to be used as ink`

- [ ] **011/characters/186-dr-hamsterviel-infamous-scientist.test.ts**
  - Card: `011/characters/186-dr-hamsterviel-infamous-scientist.ts`
    - `should have CONTROLLED VARIABLES ability with correct structure`
    - `should be playable with full cost (no Alien in discard)`
    - `should be playable with 1 Alien character in discard (cost 7)`
    - `should be playable with 3 Alien characters in discard (cost 5)`
    - `should have cost reduction ability with dynamic amount for Alien characters`
    - `should have AWESTRUCK ability defined`
    - `should apply can't challenge restriction when played`
    - `should ONLY apply restriction to the chosen character, not other characters`
    - `should NOT apply restriction to newly played characters with Rush`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be steel color`
    - `should be rare rarity`
    - `should be from SET 011`
    - `should be card number 186`
    - `should be playable from hand with enough ink and Alien discount`
    - `should be able to quest for lore`

- [ ] **011/characters/187-angela-night-warrior.test.ts**
  - Card: `011/characters/187-angela-night-warrior.ts`
    - `should trigger when Angela is played`
    - `should give chosen character Challenger +2 and Resist +2`
    - `should be optional - can decline`
    - `should apply effects until start of next turn`
    - `should keep effects during opponent's turn (until start of your next turn)`
    - `should be able to target Angela herself`
    - `should be able to target opponent's character`
    - `should expire at the start of your next turn even if Angela is played during opponent's turn`
    - `should allow Gargoyle to ready when Angela is in play (even with 3+ cards in hand)`
    - `should NOT allow Gargoyle to ready when Angela is NOT in play (with 3+ cards in hand)`
    - `should only affect owner's Gargoyles, not opponent's`
    - `should affect all owner's Gargoyles with Stone by Day`

- [ ] **011/characters/188-darkwing-duck-darkwarrior.test.ts**
  - Card: `011/characters/188-darkwing-duck-darkwarrior.ts`
    - `should have Challenger ability`
    - `should deal base strength + 2 when challenging`
    - `should trigger when an item is banished during your turn`
    - `should stack Resist when multiple items are banished`
    - `should NOT trigger during opponent's turn`
    - `should keep Resist during opponent's turn (until start of your next turn)`
    - `should lose Resist at the start of your next turn`
    - `should trigger when opponent's item is banished during your turn`

- [ ] **011/characters/189-gigi-best-in-snow.test.ts**
  - Card: `011/characters/189-gigi-best-in-snow.ts`
    - `should have Alert ability`
    - `should have +2 strength when undamaged`
    - `should lose +2 strength when damaged`

- [ ] **011/characters/191-angel-experiment-624.test.ts**
  - Card: `011/characters/191-angel-experiment-624.ts`
    - `should have Resist +2 when hand is empty`
    - `should not have Resist when hand has cards`
    - `should have UNTOUCHABLE ability defined`
    - `should have activated ability defined`
    - `should have discard cost in GOOD AIM ability`
    - `should deal 2 damage to chosen character (not self)`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be steel color`
    - `should be legendary rarity`
    - `should be from SET 011`
    - `should be card number 191`
    - `should be playable from hand`
    - `should be able to quest for lore`

- [ ] **011/characters/192-darkwing-duck-cool-under-pressure.test.ts**
  - Card: `011/characters/192-darkwing-duck-cool-under-pressure.ts`
    - `should have 'super' characteristic`
    - `should have 'detective' characteristic`
    - `SHIFT: Should have shift ability`
    - `SHIFT: Should be able to shift onto another Darkwing Duck`
    - `EVILDOERS BEWARE!: Should have challenge-ready-villain-chars static ability`
    - `TAKE THAT!: Should trigger when item is banished during your turn`
    - `TAKE THAT!: Should decline trigger - banish item, no damage`
    - `TAKE THAT!: Should not trigger during opponent's turn`
    - `EVILDOERS BEWARE!: can challenge a ready Villain character`

- [x] **011/characters/193-john-smith-undaunted-protector.test.ts**
  - Card: `011/characters/193-john-smith-undaunted-protector.ts`
    - `should have Bodyguard ability`
    - `should have do-your-worst ability`
    - `should force opponent to target this character with action cards`
    - `should reject targeting non-do-your-worst character when John Smith is available`
    - `should reject targeting non-do-your-worst character with activated abilities`
    - `should allow targeting either when two John Smiths are in play`
    - `should reject targeting non-do-your-worst character when two John Smiths are in play`
    - `should not affect targeting by the card's own player`
    - `should not affect effects that target all characters`
    - `should allow targeting others when John Smith has Ward ('if able')`

- [ ] **011/characters/194-judy-hopps-snowball-patrol.test.ts**
  - Card: `011/characters/194-judy-hopps-snowball-patrol.ts`
    - `should reduce cost by 1 on first turn when not first player`
    - `should NOT reduce cost on first turn when first player`
    - `should NOT reduce cost on second turn even when not first player`
    - `should require no ink when UNDERDOG applies to a 1-cost character (edge case)`
    - `should have Resist ability`
    - `should have damage reduction of 1`
    - `should reduce damage taken in a challenge by 1`
    - `should reduce 1 damage to 0 damage when challenged by 1-strength character`

- [x] **011/characters/195-lilo-bundled-up.test.ts**
  - Card: `011/characters/195-lilo-bundled-up.ts`
    - `should prevent the first damage during opponent's turn`
    - `should NOT prevent damage during your own turn`
    - `should only prevent the FIRST damage during opponent's turn`
    - `should reset protection at the start of each opponent's turn`
    - `should not consume protection when 0 damage is dealt`
    - `should prevent moved damage as the first instance, then take challenge damage as second instance`
    - `should allow moved damage after protection is consumed by a challenge`
    - `should prevent put-damage as the first instance, then allow second put-damage`
    - `should prevent put-damage when Lilo has no prior damage`

- [ ] **011/characters/repro.test.ts**
  - Card: `MISSING`
    - `should allow/disallow picking cards from different players (investigation)`
    - `should update Evasive dynamically when hand size changes`
    - `should update Evasive dynamically - with real cards`

### items (18 tests)

- [x] **011/items/033-john-smith-s-compass.test.ts**
  - Card: `011/items/033-john-smith-s-compass.ts`
    - `should banish the compass when a character challenged this turn`
    - `should NOT banish the compass when no character challenged this turn`
    - `should put a character card with cost 3 or less into hand`
    - `should put a character named Pocahontas into hand regardless of cost`
    - `should put a character with cost > 3 that is NOT named Pocahontas on the bottom of the deck`
    - `should NOT trigger YOUR PATH when a character challenged this turn`

- [x] **011/items/065-mother-s-necklace.test.ts**
  - Card: `011/items/065-mother-s-necklace.ts`
    - `should trigger at end of turn when no characters challenged`
    - `should grant Evasive to chosen character`
    - `should NOT trigger when a character challenged this turn`
    - `should keep Evasive during opponent's turn (until start of your next turn)`
    - `should remove Evasive at start of your next turn`
    - `character with Evasive can only be challenged by characters with Evasive`
    - `should have correct ability structure`

- [x] **011/items/066-mystical-inkcaster.test.ts**
  - Card: `011/items/066-mystical-inkcaster.ts`
    - `should play a character with cost 5 or less for free and give them Rush`
    - `should banish the played character at the end of your turn`
    - `should not banish the item itself at end of turn`

- [x] **011/items/067-pot-of-honey.test.ts**
  - Card: `011/items/067-pot-of-honey.ts`
    - `I'M STUCK! - Should banish this item and prevent chosen exerted character from readying at start of next turn`

- [x] **011/items/098-snow-fort.test.ts**
  - Card: `011/items/098-snow-fort.ts`
    - `should give +1 strength to characters while Snow Fort is in play`
    - `should remove strength bonus when Snow Fort leaves play`
    - `should give Resist +1 to characters during opponent's turn`
    - `should NOT give Resist during your own turn`
    - `should reduce damage taken during opponent's turn`

- [x] **011/items/099-rafiki-s-bakora-staff.test.ts**
  - Card: `011/items/099-rafiki-s-bakora-staff.ts`
    - `should exert, pay 1 ink, draw a card, then choose and discard a card`
    - `should pay 1 ink, banish item, and deal 1 damage to chosen character`
    - `should be able to target own character`

- [x] **011/items/100-retro-evolution-device.test.ts**
  - Card: `011/items/100-retro-evolution-device.ts`
    - `TURN INTO DINOSAUR {E}, 1 {I}, Banish chosen character of yours — Play a character with cost up to 2 more than the banished character for free.`
    - `does not allow playing a character that costs more than banished character + 2`

- [x] **011/items/101-battering-ram.test.ts**
  - Card: `011/items/101-battering-ram.ts`
    - `FULL FORCE - deals 1 damage to chosen damaged character`
    - `BREAK THROUGH - banishes this item to banish chosen location`

- [x] **011/items/132-lonely-grave.test.ts**
  - Card: `011/items/132-lonely-grave.ts`
    - `should banish a character and put top card under a character with Boost`

- [x] **011/items/133-kristoff-s-lute.test.ts**
  - Card: `011/items/133-kristoff-s-lute.ts`
    - `should allow playing a revealed character card (paying its cost)`
    - `should allow playing a revealed action card (paying its cost)`
    - `should put the card in discard if player declines to play`
    - `should put the card in discard if player cannot afford to play it`

- [x] **011/items/166-blue-smoke.test.ts**
  - Card: `011/items/166-blue-smoke.ts`
    - `costs 1 less when Darkwing Duck is in play`
    - `costs full price without Darkwing Duck in play`
    - `can be played at full cost without Darkwing Duck`
    - `grants Ward to chosen character until start of your next turn`
    - `requires exerting the item`
    - `requires 1 ink to activate`
    - `can target any character (yours or opponent's)`

- [x] **011/items/167-tiny-tim-s-crutch.test.ts**
  - Card: `011/items/167-tiny-tim-s-crutch.ts`
    - `should give chosen character Support this turn`
    - `should allow the character with Support to add strength when questing`
    - `Support should only last this turn`

- [x] **011/items/168-darkwing-s-chair-set.test.ts**
  - Card: `011/items/168-darkwing-s-chair-set.ts`
    - `When played, top card moves to inkwell exerted`
    - `Optional ability can be declined`
    - `Heal up to 2 damage from non-Darkwing character`
    - `Heal up to 4 damage when targeting Darkwing Duck`
    - `Item is banished after activation`

- [x] **011/items/169-darkwing-s-gas-device.test.ts**
  - Card: `011/items/169-darkwing-s-gas-device.ts`
    - `should give chosen character -1 strength this turn when Darkwing Duck is NOT in play`
    - `should give chosen character -2 strength this turn when Darkwing Duck IS in play`
    - `should have correct costs defined (exert + 1 ink)`

- [x] **011/items/170-hidden-trap.test.ts**
  - Card: `011/items/170-hidden-trap.ts`
    - `ALMOST READY - This item enters play exerted`
    - `SNAP! - can banish a chosen item`
    - `SNAP! - gives chosen opposing character -2 strength this turn`

- [x] **011/items/201-infra-pink-ultra-scan-specs.test.ts**
  - Card: `011/items/201-infra-pink-ultra-scan-specs.ts`
    - `should draw a card and then discard a card when played`
    - `should give chosen character Alert when item is banished`
    - `Alert should only last this turn`

- [x] **011/items/202-the-thunderquack.test.ts**
  - Card: `011/items/202-the-thunderquack.ts`
    - `should have the VIGILANTE JUSTICE ability defined`
    - `should grant Villain classification to opposing characters when in play`
    - `should grant Villain classification to all opposing characters`
    - `should not grant Villain classification to own characters`
    - `should remove Villain classification when The Thunderquack leaves play`
    - `should grant Villain classification to characters played after The Thunderquack`
    - `should have the LAY OF THE LAND ability defined as an activated ability`
    - `should gain 1 lore when exerted if an opposing character was banished in a challenge this turn`
    - `should NOT gain lore when exerted if no character was banished in a challenge this turn`
    - `should NOT gain lore when only a location was banished in a challenge this turn`
    - `should NOT trigger when the item is played`
    - `should gain 1 lore when exerted if own character was banished in a challenge this turn`

- [x] **011/items/203-containment-unit.test.ts**
  - Card: `011/items/203-containment-unit.ts`
    - `chosen character can't challenge while item is in play`
    - `chosen character can't quest while item is in play`
    - `restrictions are removed when item leaves play`
    - `only the chosen character should have restrictions, not all characters`
    - `player's own characters can still challenge after playing Containment Unit`
    - `when targeting own character, only that character should be restricted`
    - `choosing to discard a card keeps the item in play`
    - `choosing to banish the item banishes it`
    - `when player has no cards in hand and chooses discard, the item must be banished`

### locations (6 tests)

- [x] **011/locations/068-the-frozen-vine-monstrous-plant.test.ts**
  - Card: `011/locations/068-the-frozen-vine-monstrous-plant.ts`
    - `returns to hand when banished if an exerted character was there`
    - `does not return to hand when banished if character was not exerted`
    - `does not return to hand when banished if no character was there`

- [x] **011/locations/102-game-preserve-protected-land.test.ts**
  - Card: `011/locations/102-game-preserve-protected-land.ts`
    - `should NOT have Evasive when no character is at the location`
    - `should NOT have Evasive when a character WITHOUT Evasive is at the location`
    - `should GAIN Evasive when a character WITH Evasive is at the location`
    - `should only be challengeable by characters with Evasive when condition is met`

- [x] **011/locations/134-scrooges-counting-house-ebenezer-s-office.test.ts**
  - Card: `011/locations/134-scrooges-counting-house-ebenezers-office.ts`
    - `should get +1 willpower and +1 lore after boosting once`

- [x] **011/locations/135-graveyard-of-christmas-future-lonely-resting-place.test.ts**
  - Card: `011/locations/135-graveyard-of-christmas-future-lonely-resting-place.ts`
    - `Should be playable as a location`
    - `NEW ARRIVAL - Should put top card of deck under location when character moves here`
    - `ANOTHER CHANCE - Should allow putting all cards from under location into hand at start of turn, then banish location`

- [x] **011/locations/136-beasts-castle-winter-gardens.test.ts**
  - Card: `011/locations/136-beasts-castle-winter-gardens.ts`
    - `should gain 1 lore when a character at the location challenges another character`
    - `should not gain lore when a character NOT at the location challenges another character`
    - `should gain 1 lore for each challenge when multiple characters at the location challenge`

- [x] **011/locations/204-darkwing-tower-icy-headquarters.test.ts**
  - Card: `011/locations/204-darkwing-tower-icy-headquarters.ts`
    - `should trigger when an opposing Villain character is banished during your turn`
    - `should NOT trigger when a non-Villain opposing character is banished`
    - `should trigger when The Thunderquack makes an opposing character a Villain`
    - `should trigger when a Villain is banished in a challenge`
    - `should NOT trigger during opponent's turn`
    - `should only target characters at this location`
    - `should be optional - can decline the ability`
    - `should apply quest restriction only when ability is used`
    - `should trigger multiple times if multiple Villain characters are banished`

## Summary Statistics

- **Total Test Files**: 1789
- **Sets Covered**: 001-011 (11 sets)
- **Card Types**: Actions, Characters, Items, Locations, Songs, Abilities