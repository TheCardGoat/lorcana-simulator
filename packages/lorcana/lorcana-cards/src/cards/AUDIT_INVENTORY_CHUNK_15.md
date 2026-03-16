# Card Test Inventory

Legacy implementation base directory: /Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards
New implementation base directory: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards


**Chunk 15 of 18** | [← Previous](AUDIT_INVENTORY_CHUNK_14.md) | [Next →](AUDIT_INVENTORY_CHUNK_16.md)


- [ ] **009/locations/steel/204-maui-s-place-of-exile-hidden-island.test.ts**
  - Card: `009/locations/steel/204-maui-s-place-of-exile-hidden-island.ts`
    - `**ISOLATED** Characters gain **Resist** +1 while here. _(Damage dealt to them is reduced by 1.)_`

## Set 010

### abilities (1 tests)

- [ ] **010/abilities/stoneByDay.test.ts**
  - Card: `010/abilities/stoneByDay.ts`
    - `Do not ready during passing turn`
    - `Ready during turn end if less than 3 cards`

### actions (28 tests)

- [ ] **010/actions/026-search-for-clues.test.ts**
  - Card: `010/actions/026-search-for-clues.ts`
    - `should trigger discard for player with most cards and gain lore if Detective is in play`
    - `should not trigger when no players have cards in hand`
    - `should not gain lore when no Detective characters in play`

- [ ] **010/actions/027-or-rewrite-history-.test.ts**
  - Card: `010/actions/027-or-rewrite-history-.ts`
    - `(A character with cost 3 or more can {E} to sing this song for free.)`
    - `Return a character card from your discard to your hand.`

- [ ] **010/actions/028-della-s-moon-lullaby.test.ts**
  - Card: `010/actions/028-della-s-moon-lullaby.ts`
    - `Chosen opposing character gets -2 strength until the start of your next turn and draw a card`

- [ ] **010/actions/029-the-horseman-strikes-.test.ts**
  - Card: `010/actions/029-the-horseman-strikes-.ts`
    - `draws a card when played`
    - `allows banishing a character with evasive`
    - `resolves correctly even when no valid targets exist`

- [ ] **010/actions/061-begone-.test.ts**
  - Card: `010/actions/061-begone-.ts`
    - `should return opponent's character with cost 3 to their hand`
    - `should return your own character with cost 3 to your hand`
    - `should not allow returning character with cost 4 or more`
    - `should return opponent's item with cost 1 to their hand`
    - `should return opponent's location with cost 1 to their hand`
    - `should return your own location with cost 2 to your hand`
    - `should work when there are multiple valid targets in play`
    - `identifies valid targets correctly by cost`
    - `should properly handle cards in different zones`
    - `should enforce cost 3 or less restriction correctly`

- [ ] **010/actions/062-can-t-hold-it-back-anymore.test.ts**
  - Card: `010/actions/062-can-t-hold-it-back-anymore.ts`
    - `exerts chosen opposing character and moves all damage counters from all other characters to that character`
    - `moves damage from multiple characters to the target`
    - `works when no other characters have damage`
    - `triggers Aurora's Sweet Dreams ability when moving damage counters`

- [ ] **010/actions/063-swooping-strike.test.ts**
  - Card: `010/actions/063-swooping-strike.ts`
    - `exerts one ready character from opponent when they have multiple characters`
    - `exerts the single character when opponent has only one ready character`
    - `consumes ink when played normally`
    - `handles the case when opponent has no ready characters`
    - `works when opponent has no characters at all`
    - `does not affect your own characters`
    - `does not banish Vanish character when opponent chooses their own character`
    - `works correctly in multiplayer games`
    - `has correct card properties`
    - `has correct ability configuration`

- [ ] **010/actions/064-performance-review.test.ts**
  - Card: `010/actions/064-performance-review.ts`
    - `Draw cards equal to chosen ready character's lore value (lore 1)`
    - `Draw cards equal to chosen ready character's lore value (lore 2)`
    - `Draw cards equal to chosen ready character's lore value (lore 3)`
    - `Can only target ready characters (exerted character should not be valid target)`

- [ ] **010/actions/065-fragile-as-a-flower.test.ts**
  - Card: `010/actions/065-fragile-as-a-flower.ts`
    - `Draw a card. Exert chosen character with cost 2 or less. They can't ready at the start of their next turn.`

- [ ] **010/actions/094-so-be-it-.test.ts**
  - Card: `010/actions/094-so-be-it-.ts`
    - `should give all your characters +1 strength when played`
    - `should not affect opponent's characters`
    - `should buff be removed at end of turn`
    - `should work even if you have no characters in play`
    - `should allow banishing a chosen item when you choose to`
    - `should allow skipping the banish item effect (optional)`
    - `should work even if there are no items in play`
    - `should apply strength buff and banish item when both effects are used`
    - `should apply strength buff even when skipping item banish`

- [ ] **010/actions/095-trust-in-me.test.ts**
  - Card: `010/actions/095-trust-in-me.ts`
    - `reduces lore of all opposing characters by 1 when played`
    - `lore reduction lasts until start of next turn`
    - `affects multiple opposing characters`
    - `does not affect your own characters`
    - `works even when opponent has no characters`
    - `BUG: Piglet loses 2 lore instead of 1 when Trust in Me is played`
    - `has discard ability configuration`
    - `can be sung for free by character with cost 6`
    - `can still be played normally by paying ink cost`
    - `singing works with both modal choices`
    - `has correct card properties`
    - `has modal ability with two choices`

- [ ] **010/actions/096-chomp-.test.ts**
  - Card: `010/actions/096-chomp-.ts`
    - `deals 2 damage to a chosen damaged character`
    - `can target damaged friendly characters`
    - `cannot target undamaged characters`
    - `can banish character if damage exceeds willpower`
    - `works when multiple characters are damaged`
    - `requires exactly 1 damage on character to be valid target`

- [ ] **010/actions/097-frighteningly-terrible.test.ts**
  - Card: `MISSING`
    - `places 1 damage counter on each opposing character when played normally`
    - `consumes 3 ink when played normally`
    - `can be sung for free by a character with cost 3 or more`
    - `can be sung for free even by characters with cost less than 3`
    - `can be sung by character with cost exactly 3`
    - `does not consume ink when sung for free`
    - `does nothing when there are no opposing characters`
    - `damages only one opposing character when there is exactly one`
    - `adds damage to existing damage counters on opposing characters`

- [ ] **010/actions/097-malicious-mean-and-scary.test.ts**
  - Card: `010/actions/097-malicious-mean-and-scary.ts`
    - `puts 1 damage counter on each opposing character`
    - `Rapunzel's Act of Kindness shield prevents only the supported character once (MMS still damages others)`

- [ ] **010/actions/129-next-stop-olympus.test.ts**
  - Card: `010/actions/129-next-stop-olympus.ts`
    - `cost reduction not active if no character with 5+ strength in play`
    - `cost reduction is active if a character with 5+ strength in play`
    - `Ready chosen character. They can't quest for the rest of this turn. The next time they challenge another character this turn, gain 1 lore.`
    - `only triggers once on the first challenge (not multiple challenges)`
    - `triggers again when the card is played a second time targeting a different character`
    - `triggers again when played twice on the SAME character (Maui - Half Shark scenario)`

- [ ] **010/actions/130-get-to-safety-.test.ts**
  - Card: `010/actions/130-get-to-safety-.ts`
    - `plays a location with cost 3 or less from discard for free`
    - `does not draw a card when no Sleepy Hollow is in play`
    - `Get to Safety! + Sleepy Hollow - The Bridge`

- [ ] **010/actions/131-time-to-go-.test.ts**
  - Card: `010/actions/131-time-to-go-.ts`
    - `Having a card under them`
    - `Not having a card under them`

- [ ] **010/actions/132-ghostly-tale.test.ts**
  - Card: `010/actions/132-ghostly-tale.ts`
    - `exerts all opposing characters with 2 or less strength`
    - `does not exert opposing characters with more than 2 strength`
    - `does not affect your own characters`
    - `affects only opposing characters, not friendly characters in play`

- [ ] **010/actions/133-dragon-fire.test.ts**
  - Card: `010/actions/133-dragon-fire.ts`
    - `should banish chosen opposing character when played`
    - `should banish chosen own character when played`
    - `should work with multiple characters to choose from`
    - `should allow choosing which character to banish when multiple targets exist`
    - `should cost 5 ink to play`
    - `should have correct card properties`
    - `should reference original card as reprint`
    - `should handle empty board state with auto-resolution`

- [ ] **010/actions/161-hen-wen-s-visions.test.ts**
  - Card: `010/actions/161-hen-wen-s-visions.ts`
    - `looks at top 4 cards and puts exactly 1 on top, rest on bottom`
    - `triggers scry effect when played`
    - `moves card to discard after being played`
    - `can be played with correct ink cost`
    - `has correct card properties`
    - `has correct ability structure`
    - `has correct card text`

- [ ] **010/actions/162-promising-lead.test.ts**
  - Card: `010/actions/162-promising-lead.ts`
    - `gives only the chosen Detective +2 lore and Support when two Detectives are in play`
    - `gives chosen character +2 lore this turn when target is not a Detective`
    - `gives chosen Detective character +2 lore AND Support this turn`
    - `gives Support only to chosen Detective when both detective and non-detective are in play`

- [ ] **010/actions/163-might-solve-a-mystery.test.ts**
  - Card: `010/actions/163-might-solve-a-mystery.ts`
    - `Happy Case - takes 1 character and 1 item to hand, rest go to bottom`
    - `Choosing only a character, no item`
    - `Choosing only an item, no character`
    - `Choosing neither character nor item (all go to bottom)`
    - `Trying to take 2 characters (should only take 1)`
    - `Trying to take 2 items (should only take 1)`
    - `Takes 1 character and 1 item (correct limit)`
    - `No valid targets chosen (all go to bottom)`

- [ ] **010/actions/164-sudden-scare.test.ts**
  - Card: `010/actions/164-sudden-scare.ts`
    - `Put chosen opposing character into their player's inkwell facedown. That player puts the top card of their deck into their inkwell facedown.`

- [ ] **010/actions/165-spooky-sight.test.ts**
  - Card: `010/actions/165-spooky-sight.ts`
    - `puts all characters with cost 3 or less into their players' inkwells facedown and exerted - mixed costs`
    - `affects both players' characters with cost 3 or less`
    - `exerts all affected characters when moving them to inkwell`
    - `does not affect characters with cost 4 or more`
    - `affects characters with cost exactly 3`
    - `works when no qualifying characters are in play`
    - `works when only one player has qualifying characters`
    - `puts cards into correct player's inkwell (not caster's inkwell)`
    - `fulfills the complete card text: Put all characters with cost 3 or less into their players' inkwells facedown and exerted`

- [ ] **010/actions/195-but-i-m-much-faster.test.ts**
  - Card: `010/actions/195-but-i-m-much-faster.ts`
    - `Chosen character gains Alert and Challenger +2 this turn`

- [ ] **010/actions/196-putting-it-all-together.test.ts**
  - Card: `010/actions/196-putting-it-all-together.ts`
    - `applies challenge restriction to chosen opposing character and draws a card`
    - `draws exactly one card when played`
    - `applies restriction to any opposing character`
    - `can target opposing character using card model`
    - `restriction persists during opponent's turn`
    - `restriction expires after opponent's turn`
    - `only affects targeted character, not other opposing characters`
    - `works when deck is empty (should not fail)`
    - `works with single card in deck`
    - `has correct card characteristics`
    - `has correct ability configuration`

- [ ] **010/actions/197-he-hurled-his-thunderbolt.test.ts**
  - Card: `010/actions/197-he-hurled-his-thunderbolt.ts`
    - `should deal 4 damage to chosen opponent character`
    - `should be able to target your own character and deal 4 damage`
    - `should give Deity characters Challenger +2 this turn`
    - `should only affect Deity characters, not other characters`
    - `should work with multiple Deity characters`
    - `should have no effect when there are no Deity characters in play`
    - `should be able to sing the song with sufficient ink`
    - `should have correct song characteristics`
    - `should give Deity characters +2 strength while challenging`
    - `should only apply the +2 during challenges, not regular strength`
    - `should only last for the current turn`
    - `should work when Deity character is exerted`
    - `should not affect opponent's Deity characters`

- [ ] **010/actions/198-the-game-s-afoot-.test.ts**
  - Card: `010/actions/198-the-game-s-afoot-.ts`
    - `Moving two characters to a location and the location gains Resist +2`
    - `Moving one character to a location (upTo: true)`
    - `Resist effect lasts until the start of your next turn`
    - `Resist effect reduces damage to location`

### characters (146 tests)

- [ ] **010/characters/001-baloo-friend-and-guardian.test.ts**
  - Card: `010/characters/001-baloo-friend-and-guardian.ts`
    - `should have Bodyguard ability`
    - `should have Support ability`

- [ ] **010/characters/002-gaston-frightful-bully.test.ts**
  - Card: `010/characters/002-gaston-frightful-bully.ts`
    - `should have correct metadata`
    - `should have boost 2 ability`
    - `should trigger whenever this character quests`
    - `should only trigger if there is a card under Gaston`
    - `should grant must-quest ability to opponent`
    - `should prevent challenging with must-quest`
    - `should not affect questing with must-quest ability`

- [ ] **010/characters/003-rapunzel-ready-for-adventure.test.ts**
  - Card: `010/characters/003-rapunzel-ready-for-adventure.ts`
    - `Support (Whenever this character quests, you may add their {S} this turn to the {S} of another character of your choice.)`
    - `Do not trigger without rapunzel`
    - `Last until next turn`
    - `Shield should NOT be consumed by 0 damage attack`
    - `Shield should NOT be consumed if Resist reduces damage to 0`
    - `Should NOT trigger when Opponent supports their character`
    - `Does NOT trigger when only the opponent has Rapunzel in play`
    - `Protection is NOT consumed when damage is already 0 (e.g., from Tiana's Resist)`
    - `Supports a reckless character without leaving pending layers`

- [ ] **010/characters/006-rajah-devoted-protector.test.ts**
  - Card: `010/characters/006-rajah-devoted-protector.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`

- [ ] **010/characters/007-eilonwy-princess-of-llyr.test.ts**
  - Card: `010/characters/007-eilonwy-princess-of-llyr.ts`
    - `should be a Support character with correct stats`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`
    - `should provide Support when questing`

- [ ] **010/characters/008-scrooge-mcduck-on-the-right-track.test.ts**
  - Card: `010/characters/008-scrooge-mcduck-on-the-right-track.ts`
    - `should have FABULOUS WEALTH ability defined`
    - `When you play this character, chosen character with a card under them gets +1 this turn`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be amber color`
    - `should be uncommon rarity`

- [ ] **010/characters/009-webby-vanderquack-knowledge-seeker.test.ts**
  - Card: `010/characters/009-webby-vanderquack-knowledge-seeker.ts`
    - `I'VE READ ABOUT THIS - Character should have correct base stats`
    - `I'VE READ ABOUT THIS - Gets no bonus when there are no characters or locations with cards under them`
    - `I'VE READ ABOUT THIS - Ability should be present and functional`

- [ ] **010/characters/010-gurgi-apple-lover.test.ts**
  - Card: `010/characters/010-gurgi-apple-lover.ts`
    - `HAPPY DAY - triggers when you play this character`
    - `HAPPY DAY - removes up to 2 damage from chosen character`
    - `HAPPY DAY - removes exactly the remaining damage if less than 2`
    - `HAPPY DAY - ability is optional (may)`
    - `HAPPY DAY - can target characters in play`
    - `HAPPY DAY - has no effect on undamaged character`
    - `HAPPY DAY - works when character has exactly 2 damage`

- [ ] **010/characters/011-mrs-beakley-former-s-h-u-s-h-agent.test.ts**
  - Card: `010/characters/011-mrs-beakley-former-s-h-u-s-h-agent.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`

- [ ] **010/characters/012-bagheera-cautious-explorer.test.ts**
  - Card: `010/characters/012-bagheera-cautious-explorer.ts`
    - `should be a vanilla character with correct stats and no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`

- [ ] **010/characters/013-shanti-village-girl.test.ts**
  - Card: `010/characters/013-shanti-village-girl.ts`
    - `Singer 5 (This character counts as cost 5 to sing songs.)`

- [ ] **010/characters/014-flash-records-specialist.test.ts**
  - Card: `010/characters/014-flash-records-specialist.ts`
    - `HOLD... YOUR HORSES - This character enters play exerted`
    - `DEEP RESEARCH - Should give chosen Detective character +2 {S} this turn`
    - `DEEP RESEARCH - Should be optional`
    - `DEEP RESEARCH - Should only target Detective characters`

- [ ] **010/characters/015-taran-pig-keeper.test.ts**
  - Card: `010/characters/015-taran-pig-keeper.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)`
    - `FOLLOW THE PIG Whenever this character quests, you may return a character card named Hen Wen from your discard to your hand.`

- [ ] **010/characters/017-ariel-ethereal-voice.test.ts**
  - Card: `010/characters/017-ariel-ethereal-voice.ts`
    - `Boost 1 (Once during your turn, you may pay 1 to put the top card of your deck facedown under this character.) `
    - `opponent can resolve Be King Undisputed even when Ariel's optional trigger is on the stack`

- [ ] **010/characters/018-scrooge-mcduck-cavern-prospector.test.ts**
  - Card: `010/characters/018-scrooge-mcduck-cavern-prospector.ts`
    - `Has Shift 4 ability`
    - `SPECULATION Whenever you play a character or location with Boost, you may put the top card of your deck facedown under them.`

- [ ] **010/characters/019-mowgli-man-cub.test.ts**
  - Card: `010/characters/019-mowgli-man-cub.ts`
    - `When you play this character, chosen opponent reveals their hand and discards a non-character card of their choice.`

- [ ] **010/characters/020-simba-king-in-the-making.test.ts**
  - Card: `010/characters/020-simba-king-in-the-making.ts`
    - `Boost 3 (Once during your turn, you may pay 3 to put the top card of your deck facedown under this character.) `
    - `Top card is a character`
    - `Top card is NOT a character`

- [ ] **010/characters/021-goofy-ghost-hunter.test.ts**
  - Card: `010/characters/021-goofy-ghost-hunter.ts`
    - `THE PERFECT TRAP - reduces chosen opposing character's strength by 1`
    - `THE PERFECT TRAP - strength reduction lasts until the start of your next turn`
    - `THE PERFECT TRAP - can only target opposing characters`
    - `THE PERFECT TRAP - reduces strength correctly regardless of original value`
    - `THE PERFECT TRAP - triggers when card enters play`

- [ ] **010/characters/022-della-duck-returning-mother.test.ts**
  - Card: `010/characters/022-della-duck-returning-mother.ts`
    - `should have correct stats`
    - `should have correct characteristics`
    - `should be amber color and inkwell card`
    - `should have proper card identification`
    - `should have HERE TO HELP ability defined`
    - `should be optional ability`
    - `should have correct ability type for when you play this character`
    - `should target characters with Boost ability`
    - `should be playable from hand`
    - `should work with Boost characters as targets`
    - `should have proper ability text matching card definition`
    - `should have correct ability structure`

- [ ] **010/characters/023-mickey-mouse-amber-champion.test.ts**
  - Card: `010/characters/023-mickey-mouse-amber-champion.ts`
    - `should give other Amber characters +2 willpower`
    - `should not give willpower bonus to non-Amber characters`
    - `should buff multiple Amber characters`
    - `should not have Singer 8 when alone`
    - `should not have Singer 8 with only 1 other Amber character`
    - `should gain Singer 8 when you have 2 or more other Amber characters in play`
    - `should not count non-Amber characters towards the condition`
    - `should work correctly when both abilities are active`

- [ ] **010/characters/024-goofy-galumphing-gumshoe.test.ts**
  - Card: `010/characters/024-goofy-galumphing-gumshoe.ts`
    - `has shift ability`
    - `triggers when you play the character`
    - `triggers when the character quests`
    - `affects ALL opposing characters in play`
    - `applies effect each time Goofy quests`

- [ ] **010/characters/025-gazelle-ballad-singer.test.ts**
  - Card: `010/characters/025-gazelle-ballad-singer.ts`
    - `should have Singer 7 ability`
    - `should allow putting a song card from discard on top of deck`
    - `should work with different song cards`
    - `should only target song cards in discard`

- [ ] **010/characters/035-minnie-mouse-amethyst-champion.test.ts**
  - Card: `010/characters/035-minnie-mouse-amethyst-champion.ts`
    - `should trigger and draw a card when another Amethyst character is banished in a challenge`
    - `should NOT trigger when Minnie Mouse herself is banished`
    - `should NOT trigger when a non-Amethyst character is banished`
    - `should NOT trigger when an Amethyst character is banished outside of a challenge`

- [ ] **010/characters/036-the-horned-king-wicked-ruler.test.ts**
  - Card: `010/characters/036-the-horned-king-wicked-ruler.ts`
    - `Shift 2 (You may pay 2 to play this on top of one of your characters named The Horned King.) ARISE! Whenever one of your other characters is banished in a challenge, you may return that card to your hand, then choose and discard a card.`
    - `ARISE! Whenever one of your other characters is banished in a challenge, you may return that card to your hand, then choose and discard a card.`
    - `ARISE! Can be skipped - when skipped, character stays banished and no card is discarded`

- [ ] **010/characters/037-gwythaint-savage-hunter.test.ts**
  - Card: `010/characters/037-gwythaint-savage-hunter.ts`
    - `should have Evasive keyword`
    - `should have SWOOPING STRIKE ability`
    - `SWOOPING STRIKE - Whenever this character quests, each opponent chooses and exerts one of their ready characters`
    - `SWOOPING STRIKE - Should not require a target when opponent has no ready characters`

- [ ] **010/characters/038-the-horned-king-heartless-devil.test.ts**
  - Card: `010/characters/038-the-horned-king-heartless-devil.ts`
    - `should be a vanilla character with no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`

- [ ] **010/characters/039-cauldron-born-mindless-horde.test.ts**
  - Card: `010/characters/039-cauldron-born-mindless-horde.ts`
    - `should be a vanilla character with correct stats and no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`

- [ ] **010/characters/040-demona-betrayer-of-the-clan.test.ts**
  - Card: `010/characters/040-demona-betrayer-of-the-clan.ts`
    - `should have Challenger +2 ability`
    - `should have challenger value of 2`
    - `should have STONE BY DAY ability that restricts readying when you have 3+ cards in hand`
    - `STONE BY DAY ability should be defined with correct text`
    - `should have both Challenger and STONE BY DAY abilities`
    - `should have correct base stats`

- [ ] **010/characters/041-magica-de-spell-shadowy-and-sinister.test.ts**
  - Card: `010/characters/041-magica-de-spell-shadowy-and-sinister.ts`
    - `DARK INCANTATION - Should shuffle a card from your own discard into your deck`
    - `DARK INCANTATION - Should shuffle a card from opponent's discard into their deck`
    - `DARK INCANTATION - Should be optional`

- [ ] **010/characters/042-lena-sabrewing-mysterious-duck.test.ts**
  - Card: `010/characters/042-lena-sabrewing-mysterious-duck.ts`
    - `should gain 1 lore when played if you have a character with a card under it`
    - `should NOT gain 1 lore when played if you have no character with a card under it`
    - `should work when there are multiple cards in the deck to boost`

- [ ] **010/characters/043-iago-furious.test.ts**
  - Card: `010/characters/043-iago-furious.ts`
    - `should have Challenger +5 ability`
    - `should have challenger value of 5`

- [ ] **010/characters/043-iago-stompin-mad.test.ts**
  - Card: `MISSING`
    - `Challenger +5`

- [ ] **010/characters/044-violet-sabrewing-senior-junior-woodchuck.test.ts**
  - Card: `010/characters/044-violet-sabrewing-senior-junior-woodchuck.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **010/characters/045-elsa-exploring-the-unknown.test.ts**
  - Card: `010/characters/045-elsa-exploring-the-unknown.ts`

- [ ] **010/characters/047-duckworth-ghost-butler.test.ts**
  - Card: `010/characters/047-duckworth-ghost-butler.ts`
    - `Rush (This character can challenge the turn they're played.) FINAL ACT During your turn, when this character is banished, you may put the top card of your deck facedown under one of your characters or locations with Boost.`

- [ ] **010/characters/048-nibs-lost-boy.test.ts**
  - Card: `010/characters/048-nibs-lost-boy.ts`
    - `Has LOOK WHO'S BACK ability`

- [ ] **010/characters/049-the-horned-king-triumphant-ghoul.test.ts**
  - Card: `010/characters/049-the-horned-king-triumphant-ghoul.ts`
    - `should have base lore value when no cards have left any discard pile`
    - `should get +2 lore when a card leaves own discard pile this turn`
    - `should get +2 lore when a card leaves opponent's discard pile this turn`
    - `should get +2 lore when multiple cards leave discard pile (not stacking)`
    - `should lose the +2 lore bonus when the turn ends`
    - `should not get bonus during opponent's turn`

- [ ] **010/characters/050-creeper-loyal-lackey.test.ts**
  - Card: `010/characters/050-creeper-loyal-lackey.ts`
    - `should be a vanilla character with correct stats and no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`

- [ ] **010/characters/051-coldstone-reincarnated-cyborg.test.ts**
  - Card: `010/characters/051-coldstone-reincarnated-cyborg.ts`
    - `THE CANTRIPS HAVE BEEN SPOKEN When you play this character, if you have 2 or more Gargoyle character cards in your discard, gain 2 lore.`

- [ ] **010/characters/052-magica-de-spell-spiteful-sorceress.test.ts**
  - Card: `010/characters/052-magica-de-spell-spiteful-sorceress.ts`
    - `Character should have correct base stats`
    - `Character can be played with correct cost`
    - `Should have inkwell ability`
    - `MYSTICAL MANIPULATION - Should have the ability defined`
    - `MYSTICAL MANIPULATION - Should have move damage effect`
    - `MYSTICAL MANIPULATION - Should be optional`
    - `Should have correct rarity and set info`
    - `Should have the MYSTICAL MANIPULATION ability present`
    - `MYSTICAL MANIPULATION - Should have correct text`
    - `Should have correct trigger text`

- [ ] **010/characters/053-nana-canine-caregiver.test.ts**
  - Card: `010/characters/053-nana-canine-caregiver.ts`
    - `HELPFUL INSTINCTS When you play this character, you may choose and discard a card to return chosen character with cost 2 or less to their player's hand.`

- [ ] **010/characters/054-magica-de-spell-conniving-sorceress.test.ts**
  - Card: `010/characters/054-magica-de-spell-conniving-sorceress.ts`
    - `should have Shift 7`
    - `SHADOW'S GRASP - Should draw 4 cards when played with Shift`
    - `SHADOW'S GRASP - Should be optional`
    - `SHADOW'S GRASP - Should NOT trigger when played normally (without Shift)`

- [ ] **010/characters/055-demona-scourge-of-the-wyvern-clan.test.ts**
  - Card: `010/characters/055-demona-scourge-of-the-wyvern-clan.ts`
    - `Exerts all opponsing characters.`
    - `Both Players 0 cards in hand`
    - `Both Players 3 cards in hand`
    - `Mixture of hand sizes`

- [ ] **010/characters/056-hades-looking-for-a-deal.test.ts**
  - Card: `010/characters/056-hades-looking-for-a-deal.ts`
    - `should allow opponent to put their character on bottom of deck`
    - `should put character and cards under it on bottom of deck when opponent chooses put on bottom`
    - `should allow opponent to let you draw 2 cards`
    - `Shouldn't target characters with ward`

- [ ] **010/characters/057-olaf-helping-hand.test.ts**
  - Card: `010/characters/057-olaf-helping-hand.ts`
    - `SECOND CHANCE - Should trigger when character is banished`
    - `SECOND CHANCE - Should be optional`
    - `SECOND CHANCE - Should work when multiple characters in play`

- [ ] **010/characters/058-merlin-completing-his-research.test.ts**
  - Card: `010/characters/058-merlin-completing-his-research.ts`
    - `Boost 2 {I} (Once during your turn, you may pay 2 {I} to put the top card of your deck facedown under this character.)`
    - `LEGACY OF LEARNING - Character should have correct base stats`
    - `LEGACY OF LEARNING - Character can be played with correct cost`
    - `LEGACY OF LEARNING - Ability should be present and functional`
    - `LEGACY OF LEARNING - Draw 2 cards when banished by opponent in a challenge with card under him`
    - `LEGACY OF LEARNING - Draw 2 cards when Merlin challenges and gets banished with card under him`
    - `LEGACY OF LEARNING - Should NOT draw cards when banished without card under him`

- [ ] **010/characters/059-ursula-whisper-of-vanessa.test.ts**
  - Card: `010/characters/059-ursula-whisper-of-vanessa.ts`
    - `SLIPPERY SPELL While there's a card under this character, she gets +1 {L} and gains Evasive.`

- [ ] **010/characters/060-cheshire-cat-inexplicable.test.ts**
  - Card: `010/characters/060-cheshire-cat-inexplicable.ts`
    - `should have correct metadata`
    - `should have two abilities`
    - `should have Boost 2 ability`
    - `should use Boost ability with sufficient ink`
    - `should work when deck has exactly one card`
    - `should trigger when card is put under via Boost ability`
    - `should trigger with characters available for damage movement`
    - `should work with multiple characters available`
    - `should work end-to-end: boost then trigger ability`
    - `should maintain proper game state throughout the interaction`

- [ ] **010/characters/069-baloo-laid-back-bear.test.ts**
  - Card: `010/characters/069-baloo-laid-back-bear.ts`
    - `should be a vanilla character with correct stats and no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`

- [ ] **010/characters/070-big-nose-lovesick-poet.test.ts**
  - Card: `010/characters/070-big-nose-lovesick-poet.ts`
    - `should be a vanilla character with correct stats and no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`

- [ ] **010/characters/071-flotsam-slippery-as-an-eel.test.ts**
  - Card: `010/characters/071-flotsam-slippery-as-an-eel.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **010/characters/072-kaa-suspicious-serpent.test.ts**
  - Card: `010/characters/072-kaa-suspicious-serpent.ts`
    - `Ward (Opponents can't choose this character except to challenge.)`

- [ ] **010/characters/073-webby-vanderquack-mystery-enthusiast.test.ts**
  - Card: `010/characters/073-webby-vanderquack-mystery-enthusiast.ts`
    - `CONTAGIOUS ENERGY - Character should have correct base stats`
    - `CONTAGIOUS ENERGY - Character can be played with correct cost`
    - `CONTAGIOUS ENERGY - When you play this character, chosen character gets +1 {S} this turn`
    - `CONTAGIOUS ENERGY - Can target herself for the +1 {S} bonus`
    - `CONTAGIOUS ENERGY - Ability should be present and functional`

- [ ] **010/characters/074-finnick-tiny-terror.test.ts**
  - Card: `010/characters/074-finnick-tiny-terror.ts`
    - `returns chosen opposing character with 2 strength or less to their player's hand when paying 2 ink`
    - `can return character with exactly 2 strength`
    - `can return character with 1 strength`
    - `cannot target characters with 3 strength or more`
    - `ability is optional - can decline to activate`
    - `requires paying 2 ink to activate`
    - `cannot activate if insufficient ink available`
    - `works when opponent has no valid targets`
    - `can only target opposing characters, not own characters`

- [ ] **010/characters/075-vladimir-ceramic-unicorn-fan.test.ts**
  - Card: `010/characters/075-vladimir-ceramic-unicorn-fan.ts`
    - `triggers when character quests and banishes chosen item`
    - `can banish any item in play`
    - `can banish opponent's items`
    - `can banish own items`
    - `ability is optional - can decline to banish`
    - `only triggers when Vladimir quests, not other characters`
    - `does not trigger when character is played`
    - `triggers every time Vladimir quests`
    - `works when no items are in play`
    - `only banishes one item per quest`
    - `cannot target characters, only items`
    - `allows player to choose which item to banish when multiple are available`

- [ ] **010/characters/076-flintheart-glomgold-scheming-billionaire.test.ts**
  - Card: `010/characters/076-flintheart-glomgold-scheming-billionaire.ts`
    - `Character should have correct base stats`
    - `Character can be played with correct cost`
    - `Should have inkwell ability`
    - `TRY ME - Should have the ability defined`
    - `TRY ME - Should have Ward ability effect`
    - `TRY ME - Should target this character`
    - `TRY ME - Should have correct condition for cards under characters/locations`
    - `Should have correct rarity and set info`
    - `Should have the TRY ME ability present`
    - `TRY ME - Should have correct text`
    - `Should have correct trigger text`
    - `TRY ME - Should be a static ability`

- [ ] **010/characters/077-jetsam-opportunistic-eel.test.ts**
  - Card: `010/characters/077-jetsam-opportunistic-eel.ts`
    - `deals 3 damage to chosen opposing damaged character when played`
    - `deals 3 damage to damaged character without banishing if it survives`
    - `cannot target undamaged characters`
    - `can only target opposing characters, not own damaged characters`
    - `must be a damaged character to be targeted`
    - `allows player to choose which damaged opposing character to damage`
    - `works when opponent has no valid targets`
    - `can banish character if damage exceeds willpower`
    - `triggers only when Jetsam is played, not when already in play`
    - `deals exactly 3 damage`

- [ ] **010/characters/078-hook-hand-unexpectedly-friendly.test.ts**
  - Card: `010/characters/078-hook-hand-unexpectedly-friendly.ts`
    - `should be a vanilla character with correct stats and no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`

- [ ] **010/characters/079-kaa-hidden-serpent.test.ts**
  - Card: `010/characters/079-kaa-hidden-serpent.ts`
    - `should have Evasive ability`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be emerald color`
    - `should be uncommon rarity`
    - `should be from SET 10`
    - `should be card number 79`
    - `should be playable from hand`
    - `should be able to quest for lore`
    - `should be able to be used as ink`

- [ ] **010/characters/079-kaa-secretive-snake.test.ts**
  - Card: `MISSING`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **010/characters/080-emily-quackfaster-level-headed-librarian.test.ts**
  - Card: `010/characters/080-emily-quackfaster-level-headed-librarian.ts`
    - `should allow putting top card of deck under a character with Boost when played`
    - `should be optional - can decline the trigger`
    - `should NOT trigger if there are no characters or locations with Boost in play`
    - `declining the optional ability leaves deck unchanged`
    - `when no valid Boost targets exist nothing happens`

- [ ] **010/characters/081-flynn-rider-spectral-scoundrel.test.ts**
  - Card: `010/characters/081-flynn-rider-spectral-scoundrel.ts`
    - `Boost 2 (Once during your turn, you may pay 2 to put the top card of your deck facedown under this character.) I'LL TAKE THAT While there's a card under this character, he gets +2 and +1. `
    - `Boost: places the top card under Flynn and grants +2 strength and +1 lore while present`
    - `Buffs are removed when the card under Flynn leaves (return to hand)`

- [ ] **010/characters/082-bellwether-master-manipulator.test.ts**
  - Card: `010/characters/082-bellwether-master-manipulator.ts`
    - `puts 1 damage counter on each opposing character when challenged and banished`
    - `triggers even when all opposing characters are banished in the challenge`
    - `affects all opposing characters in play`
    - `only damages opposing characters, not own characters`
    - `damages all other opposing characters when attacker is also banished in the challenge`
    - `damages surviving opposing characters that were already damaged`
    - `can banish characters if damage exceeds willpower`

- [ ] **010/characters/083-launchpad-exceptional-pilot.test.ts**
  - Card: `010/characters/083-launchpad-exceptional-pilot.ts`
    - `triggers when character is played and banishes chosen location`
    - `can banish any location in play`
    - `can banish opponent's locations`
    - `can banish own locations`
    - `ability is optional - can decline to banish`
    - `only triggers when Launchpad is played, not other characters`
    - `does not trigger when character is already in play`
    - `works when no locations are in play`
    - `only banishes one location per play`
    - `cannot target characters, only locations`
    - `allows player to choose which location to banish when multiple are available`

- [ ] **010/characters/085-baloo-carefree-bear.test.ts**
  - Card: `010/characters/085-baloo-carefree-bear.ts`
    - `has shift 3`
    - `chooses mode 1: Each player draws a card`
    - `chooses mode 2: Each player chooses and discards a card`

- [ ] **010/characters/086-megara-secret-keeper.test.ts**
  - Card: `010/characters/086-megara-secret-keeper.ts`
    - `should have Boost 1 ability`
    - `should get +1 lore while there's a card under this character`
    - `should trigger discard ability when challenged if there's a card under this character`

- [ ] **010/characters/087-goldie-o-gilt-cunning-prospector.test.ts**
  - Card: `010/characters/087-goldie-o-gilt-cunning-prospector.ts`
    - `should reveal opponent's hand and allow choosing a location to discard`
    - `should only allow discarding location cards, not characters`
    - `should work when opponent has no locations in hand`
    - `should allow putting a location from opponent's discard to bottom of their deck and gain 1 lore`
    - `should allow putting a location from own discard to bottom of own deck and gain 1 lore`
    - `should be optional - can decline to use the ability`
    - `should only target location cards from discard, not other card types`
    - `should work when there are no locations in any discard`

- [ ] **010/characters/088-shere-khan-fearsome-tiger.test.ts**
  - Card: `010/characters/088-shere-khan-fearsome-tiger.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `ON THE HUNT Whenever this character quests, banish chosen opposing damaged character. Then, you may put 1 damage counter on another chosen character.`
    - `ON THE HUNT - Second effect should activate even if no opposing damaged characters to banish`

- [ ] **010/characters/089-scrooge-mcduck-s-h-u-s-h-agent.test.ts**
  - Card: `010/characters/089-scrooge-mcduck-s-h-u-s-h-agent.ts`
    - `Character should have correct base stats`
    - `Character can be played with correct cost`
    - `BACKUP PLAN - Should trigger draw effect when played`
    - `ON THE MOVE - Should return to hand when challenged`
    - `ON THE MOVE - Should not return to hand when banished via damage`
    - `BACKUP PLAN - Should have the BACKUP PLAN ability defined`
    - `ON THE MOVE - Should have the ON THE MOVE ability defined`
    - `ON THE MOVE - Should have return to hand effect`
    - `Should have both abilities present`
    - `BACKUP PLAN - Should resolve effects individually`
    - `Should have correct rarity and set info`

- [ ] **010/characters/090-akela-forest-runner.test.ts**
  - Card: `010/characters/090-akela-forest-runner.ts`
    - `should have an activated ability that costs 1 ink`
    - `should have base strength of 2`
    - `should gain +1 strength this turn when activated`
    - `should not be able to activate without enough ink`
    - `should be able to activate multiple times with enough ink`
    - `should lose the strength bonus at the end of the turn`
    - `should maintain the strength bonus during the turn`
    - `should stack with other strength modifiers`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be emerald color`
    - `should be common rarity`
    - `should be playable from hand`
    - `should be able to activate ability on the same turn it's played`
    - `should be able to activate ability even when exerted`
