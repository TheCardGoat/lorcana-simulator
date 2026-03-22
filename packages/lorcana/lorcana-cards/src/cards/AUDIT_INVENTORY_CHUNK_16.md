# Card Test Inventory

Legacy implementation base directory: /Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards
New implementation base directory: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards

**Chunk 16 of 18** | [← Previous](AUDIT_INVENTORY_CHUNK_15.md) | [Next →](AUDIT_INVENTORY_CHUNK_17.md)

- [ ] **010/characters/091-goofy-emerald-champion.test.ts**
  - Card: `010/characters/091-goofy-emerald-champion.ts`
    - `should have correct properties`
    - `should grant Ward to other Emerald characters while Goofy is in play`
    - `should not grant Ward to non-Emerald characters`
    - `should have both EVEN THE SCORE and PROVIDE COVER abilities`
    - `EVEN THE SCORE - banishes challenging character when one of your other Emerald characters is banished in a challenge`
    - `EVEN THE SCORE - doesn't banish challenging character when a non-Emerald characters is banished in a challenge`
    - `EVEN THE SCORE - doesn't banish challenging character when Goofy is banished in a challenge`

- [ ] **010/characters/092-little-john-impermanent-outlaw.test.ts**
  - Card: `010/characters/092-little-john-impermanent-outlaw.ts`
    - `has Boost 3 ability`
    - `can activate Boost ability with 3 ink to put top card under character`
    - `can only use Boost once per turn`
    - `readies Little John when a card is put under him via Boost`
    - `Little John is able to quest multiple times via Boost`
    - `readies Little John even when he was not exerted`
    - `should have correct stats`
    - `should not be an inkwell card`
    - `should have correct characteristics`
    - `should be emerald color`
    - `should be super rare rarity`

- [ ] **010/characters/093-webby-vanderquack-junior-prospector.test.ts**
  - Card: `010/characters/093-webby-vanderquack-junior-prospector.ts`
    - `has Shift 2 {I}`
    - `has Ward`
    - `triggers when this character quests and opponent has more inkwell cards`
    - `does not trigger when player has equal inkwell cards to opponent`
    - `does not trigger when player has more inkwell cards than opponent`
    - `puts top card of deck into inkwell facedown and exerted when ability is accepted`
    - `triggers multiple times if character quests multiple times`

- [ ] **010/characters/103-diablo-watchful-raven.test.ts**
  - Card: `010/characters/103-diablo-watchful-raven.ts`
    - `should have correct stats`
    - `should not be inkwell card`
    - `should have correct characteristics`
    - `should be ruby color`
    - `should be playable from hand`
    - `should be able to quest when ready`

- [ ] **010/characters/104-ares-god-of-war.test.ts**
  - Card: `010/characters/104-ares-god-of-war.ts`
    - `should have Reckless ability`
    - `cannot quest due to Reckless`
    - `should trigger when a card is put under a character via Boost`
    - `should trigger when a card is put under a character when playing a character`
    - `should be optional - can decline the trigger`
    - `should only trigger once per turn`
    - `should allow the readied character to challenge but not quest`
    - `should not trigger from opponent's cards`
    - `readied character can quest on next turn`

- [ ] **010/characters/105-peter-pan-high-flyer.test.ts**
  - Card: `010/characters/105-peter-pan-high-flyer.ts`
    - `should have Evasive ability`
    - `can challenge another evasive character`
    - `can be challenged by another evasive character`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be ruby color`
    - `should be playable from hand`
    - `can quest for lore`

- [ ] **010/characters/106-tinker-bell-fancy-footwork.test.ts**
  - Card: `010/characters/106-tinker-bell-fancy-footwork.ts`
    - `should be a vanilla character with correct stats and no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`

- [ ] **010/characters/107-raksha-fearless-mother.test.ts**
  - Card: `010/characters/107-raksha-fearless-mother.ts`
    - `ON PATROL Once during your turn, you may pay 1 less to move this character to a location.`

- [ ] **010/characters/108-shere-khan-keen-eyed-hunter.test.ts**
  - Card: `010/characters/108-shere-khan-keen-eyed-hunter.ts`
    - `should be a vanilla character with correct stats and no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`

- [ ] **010/characters/109-rama-vigilant-father.test.ts**
  - Card: `010/characters/109-rama-vigilant-father.ts`
    - `1. should trigger when you play another character with strength 5 or more`
    - `2. should not trigger when you play another character with cost less than 5`
    - `3. should not trigger when you play Rama himself`
    - `4. should ready Rama when you accept the optional ability`
    - `5. should prevent Rama from questing for the rest of the turn when readied`

- [ ] **010/characters/110-mother-gothel-underhanded-schemer.test.ts**
  - Card: `010/characters/110-mother-gothel-underhanded-schemer.ts`
    - `should have base strength when no character has been banished`
    - `should get +2 strength after a character is banished`
    - `should get +2 strength after banishing own character`
    - `should maintain +2 strength for the rest of the turn after banishment`
    - `should lose +2 strength bonus at the start of next turn`
    - `should not get bonus if only non-character cards were banished`
    - `should get bonus even if multiple characters are banished`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be ruby color`
    - `should be playable from hand`

- [ ] **010/characters/111-katrina-van-tassel-rosy-cheeked-lass.test.ts**
  - Card: `010/characters/111-katrina-van-tassel-rosy-cheeked-lass.ts`
    - `should be a vanilla character with correct stats and no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`

- [ ] **010/characters/112-hermes-harried-messenger.test.ts**
  - Card: `010/characters/112-hermes-harried-messenger.ts`
    - `should have Rush ability`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be ruby color`
    - `should be playable from hand`
    - `should be able to challenge on the turn played due to Rush`
    - `should not be able to quest on the turn played`

- [ ] **010/characters/113-beast-aggressive-lord.test.ts**
  - Card: `010/characters/113-beast-aggressive-lord.ts`
    - `should have Boost ability`
    - `should have the THAT'S MINE ability defined`
    - `should trigger when Beast challenges with a card under him`
    - `should NOT trigger when Beast challenges WITHOUT a card under him`

- [ ] **010/characters/114-bronx-ferocious-beast.test.ts**
  - Card: `010/characters/114-bronx-ferocious-beast.ts`
    - `Reckless`
    - `STONE BY DAY If you have 3 or more cards in your hand, this character can't ready.`

- [ ] **010/characters/115-tinker-bell-temperamental-fairy.test.ts**
  - Card: `010/characters/115-tinker-bell-temperamental-fairy.ts`
    - `should have Shift ability`
    - `should have shift cost of 3`
    - `should have the HARMLESS DIVERSION ability defined`
    - `should trigger when played and require a target (integration test)`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be ruby color`
    - `should be playable from hand`

- [ ] **010/characters/116-david-xanatos-charismatic-leader.test.ts**
  - Card: `010/characters/116-david-xanatos-charismatic-leader.ts`
    - `1. should draw a card when one of your characters is banished during your turn`
    - `2. should NOT draw during opponent's turn`
    - `3. should draw when one of your characters is banished as cost (e.g. Lonely Grave)`
    - `3b. round-trip: final state after Lonely Grave + draw survives serialize → sync (simulates over-the-wire)`
    - `4. should draw the turn you play Xanatos when a character is banished same turn`
    - `5. should give chosen character Rush when David quests`
    - `6. should only last for this turn`

- [ ] **010/characters/117-hans-brazen-manipulator.test.ts**
  - Card: `010/characters/117-hans-brazen-manipulator.ts`
    - `should not affect non-King/Queen characters`
    - `should prevent King characters from questing`
    - `should prevent King characters (Hades) from questing`
    - `should gain 2 lore when opponent has 2+ ready characters`
    - `should not gain lore when opponent has less than 2 ready characters`
    - `should gain lore even if characters were exerted before (they ready at start of turn)`

- [ ] **010/characters/118-hercules-mighty-leader.test.ts**
  - Card: `010/characters/118-hercules-mighty-leader.ts`
    - `should allow non-challenge damage to Hercules (protection only applies when defending)`
    - `should allow move damage to Hercules (protection only applies when defending)`
    - `should allow Hercules to take damage when being challenged (as defender)`
    - `should NOT take damage when challenging (as attacker)`
    - `should protect other Hero characters from challenge damage when Hercules is exerted (as attacker)`
    - `should allow move damage to other Hero characters when Hercules is exerted (protection only applies when defending)`
    - `should NOT protect other Hero characters when Hercules is ready`
    - `should allow other Hero characters to take damage when being challenged (as defender)`
    - `should NOT protect non-Hero characters`

- [ ] **010/characters/119-goliath-guardian-of-castle-wyvern.test.ts**
  - Card: `010/characters/119-goliath-guardian-of-castle-wyvern.ts`
    - `Character should have correct base stats`
    - `Character can be played with correct cost`
    - `STONE BY DAY - Should have the STONE BY DAY ability defined`
    - `BE CAREFUL, ALL OF YOU - Should have the BE CAREFUL, ALL OF YOU ability defined`
    - `BE CAREFUL, ALL OF YOU - Should have correct gargoyle filter`
    - `Should have correct lore effect`
    - `Should have both abilities present`

- [ ] **010/characters/120-brooklyn-second-in-command.test.ts**
  - Card: `010/characters/120-brooklyn-second-in-command.ts`
    - `should have Evasive ability`
    - `should have the STONE BY DAY ability defined`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be ruby color`
    - `should be playable from hand`

- [ ] **010/characters/121-donald-duck-ruby-champion.test.ts**
  - Card: `010/characters/121-donald-duck-ruby-champion.ts`
    - `should give +1 strength to other Ruby characters`
    - `should not give bonus to non-Ruby characters`
    - `should give +1 lore to Ruby characters with 7+ strength`
    - `should not give lore bonus to characters with less than 7 strength`
    - `should not buff Donald Duck himself`

- [ ] **010/characters/122-elisa-maza-intrepid-investigator.test.ts**
  - Card: `010/characters/122-elisa-maza-intrepid-investigator.ts`
    - `SPECIAL DETAIL - Character should have correct base stats`
    - `SPECIAL DETAIL - Gets +2 lore when you have 2 or more other characters with strength 5+`
    - `SPECIAL DETAIL - Gets no bonus when there are fewer than 2 characters with strength 5+`
    - `SPECIAL DETAIL - Gets no bonus when there are no other characters`
    - `SPECIAL DETAIL - Ability should be present and functional`

- [ ] **010/characters/123-aladdin-barreling-through.test.ts**
  - Card: `010/characters/123-aladdin-barreling-through.ts`
    - `Aladdin gains the exert ability after boosting`
    - `Aladdin can exert to gain 1 lore after boosting`
    - `Other characters with Reckless also gain the ability`
    - `Characters without Reckless do not gain the ability`

- [ ] **010/characters/124-lady-tremaine-sinister-socialite.test.ts**
  - Card: `010/characters/124-lady-tremaine-sinister-socialite.ts`
    - `should have Boost 2 ability`
    - `should not trigger when questing without boosting this turn`
    - `should trigger when questing after boosting this turn`

- [ ] **010/characters/125-the-headless-horseman-terror-of-sleepy-hollow.test.ts**
  - Card: `010/characters/125-the-headless-horseman-terror-of-sleepy-hollow.ts`
    - `should banish chosen opposing character with strength 2 or less when played`
    - `should not target opposing character with strength 3`
    - `should resolve the on-play layer when a valid target exists`
    - `should give all your characters +1 strength when an opposing character is banished during your turn`
    - `should not trigger during opponent's turn`
    - `should give +1 strength multiple times if multiple opposing characters are banished in the same turn`
    - `should reset strength bonus at the start of next turn`
    - `should not trigger when own characters are banished`
    - `should trigger GATHERING STRENGTH when LEAVES NO TRACE banishes an opposing character`
    - `Multiple headless horsemen should merge continuous effects`

- [ ] **010/characters/126-mulan-standing-her-ground.test.ts**
  - Card: `010/characters/126-mulan-standing-her-ground.ts`
    - `FLOWING BLADE During your turn, if you've put a card under one of your characters or locations this turn, this character takes no damage from challenges.`
    - `should take damage from challenges when no card was put under this turn`
    - `should not prevent damage outside your turn`

- [ ] **010/characters/127-brom-bones-burly-bully.test.ts**
  - Card: `010/characters/127-brom-bones-burly-bully.ts`
    - `should make each opponent lose 1 lore when challenging a character with 2 or less strength`
    - `should not trigger when challenging a character with more than 2 strength`

- [ ] **010/characters/128-shere-khan-fierce-and-furious.test.ts**
  - Card: `010/characters/128-shere-khan-fierce-and-furious.ts`
    - `should have Shift 5`
    - `should ready an exerted Shere Khan and prevent him from questing`
    - `should deal 1 damage to activate`
    - `should allow questing on the next turn`

- [ ] **010/characters/137-judy-hopps-on-the-case.test.ts**
  - Card: `010/characters/137-judy-hopps-on-the-case.ts`
    - `HIDDEN CLUES When you play this character, if you have another Detective character in play, you may put chosen item into its player's inkwell facedown and exerted.`

- [ ] **010/characters/138-hen-wen-prophetic-pig.test.ts**
  - Card: `010/characters/138-hen-wen-prophetic-pig.ts`
    - `allows putting the card on top of the deck`
    - `allows putting the card on bottom of the deck`

- [ ] **010/characters/139-anna-making-snow-plans.test.ts**
  - Card: `010/characters/139-anna-making-snow-plans.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)`

- [ ] **010/characters/140-chef-louis-in-over-his-head.test.ts**
  - Card: `010/characters/140-chef-louis-in-over-his-head.ts`
    - `should be a vanilla character with correct stats and no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`

- [ ] **010/characters/141-daisy-duck-ghost-finder.test.ts**
  - Card: `010/characters/141-daisy-duck-ghost-finder.ts`
    - `Support (Whenever this character quests, you may add their to another chosen character's this turn.)`

- [ ] **010/characters/142-cri-kee-good-luck-charm.test.ts**
  - Card: `010/characters/142-cri-kee-good-luck-charm.ts`
    - `should have Alert ability`
    - `should have Alert ability with correct type`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be sapphire color`
    - `should be common rarity`

- [ ] **010/characters/143-rapunzel-creative-captor.test.ts**
  - Card: `010/characters/143-rapunzel-creative-captor.ts`
    - `ENSNARL When you play this character, chosen opposing character gets -3 this turn.`

- [ ] **010/characters/144-fergus-mcduck-scrooge-s-father.test.ts**
  - Card: `010/characters/144-fergus-mcduck-scrooge-s-father.ts`
    - `TOUGHEN UP When you play this character, chosen character of yours gains Ward until the start of your next turn. (Opponents can't choose them except to challenge.)`

- [ ] **010/characters/146-genie-investigative-mind.test.ts**
  - Card: `010/characters/146-genie-investigative-mind.ts`
    - `should have no special abilities`
    - `should be playable`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics for Detective synergy`
    - `should be sapphire color`

- [ ] **010/characters/147-eureka-scatterbrain.test.ts**
  - Card: `010/characters/147-eureka-scatterbrain.ts`
    - `should have ward ability`
    - `should have ward in abilities array`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be sapphire color`

- [ ] **010/characters/147-scuttle-birdbrained.test.ts**
  - Card: `MISSING`
    - `WARD (Opponents can't choose this character except to challenge.)`

- [ ] **010/characters/148-ichabod-crane-bookish-schoolmaster.test.ts**
  - Card: `010/characters/148-ichabod-crane-bookish-schoolmaster.ts`
    - `WELL-READ Whenever this character quests, if you've played a character with cost 5 or more this turn, put the top card of your deck into your inkwell facedown and exerted.`
    - `Do not trigger when char with cost less than 5 is played`

- [ ] **010/characters/149-jasmine-soothing-princess.test.ts**
  - Card: `010/characters/149-jasmine-soothing-princess.ts`
    - `has Boost 2 ability`
    - `Boosted`
    - `NOT boosted`

- [ ] **010/characters/150-judy-hopps-lead-detective.test.ts**
  - Card: `010/characters/150-judy-hopps-lead-detective.ts`
    - `should have shift ability`
    - `should have shift 4 in abilities array`
    - `should grant Alert to Detective characters during your turn`
    - `should grant Resist +2 to Detective characters during your turn`
    - `should only apply to Detective characters (Judy herself)`

- [ ] **010/characters/151-the-sultan-playful-monarch.test.ts**
  - Card: `010/characters/151-the-sultan-playful-monarch.ts`
    - `should have no special abilities`
    - `should be playable`
    - `should have correct stats`
    - `should not be inkwell card`
    - `should have correct characteristics for synergy`
    - `should be sapphire color`
    - `should be rare rarity`

- [ ] **010/characters/152-ichabod-crane-scared-out-of-his-mind.test.ts**
  - Card: `010/characters/152-ichabod-crane-scared-out-of-his-mind.ts`
    - `should allow moving the card to inkwell facedown and exerted when banished`
    - `should be optional - can decline and leave in discard`
    - `should trigger when banished via direct banish effect`

- [ ] **010/characters/153-scar-eerily-prepared.test.ts**
  - Card: `010/characters/153-scar-eerily-prepared.ts`
    - `Boost 2 `
    - ` SURVIVAL OF THE FITTEST Whenever you put a card under this character, chosen opposing character gets -5 this turn.`

- [ ] **010/characters/154-daisy-duck-paranormal-investigator.test.ts**
  - Card: `010/characters/154-daisy-duck-paranormal-investigator.ts`
    - `does NOT exert opponent cards entering inkwell when Daisy is NOT exerted`
    - `exerts opponent cards entering inkwell when Daisy IS exerted`
    - `does NOT exert opponent cards entering play when Daisy IS exerted`

- [ ] **010/characters/155-cinderella-dream-come-true.test.ts**
  - Card: `010/characters/155-cinderella-dream-come-true.ts`
    - `WHATEVER YOU WISH FOR At the end of your turn, if you played a Princess character this turn, you may put a card from your hand into your inkwell facedown to draw a card.`
    - `Skipping layer`
    - `Playing Cinderella herself should trigger her own effect (she is a Princess)`

- [ ] **010/characters/156-judy-hopps-uncovering-clues.test.ts**
  - Card: `010/characters/156-judy-hopps-uncovering-clues.ts`
    - `THOROUGH INVESTIGATION When you play this character and whenever she quests, look at the top 3 cards of your deck. You may reveal a Detective character card and put it into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **010/characters/157-pluto-clever-cluefinder.test.ts**
  - Card: `010/characters/157-pluto-clever-cluefinder.ts`
    - `should return an item card from discard to hand when Detective is in play`
    - `should put an item card on top of deck when no Detective is in play`
    - `should not activate when already exerted`
    - `should require an item card in discard to activate`
    - `should only target item cards, not characters or actions`
    - `should detect Detective characteristic on any character in play`
    - `should work correctly when Detective enters play after Pluto`
    - `should put item on top of deck if Detective leaves play before activation`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be sapphire color`
    - `should be uncommon rarity`
    - `should have activated ability with exert cost`

- [ ] **010/characters/158-daisy-duck-sapphire-champion.test.ts**
  - Card: `010/characters/158-daisy-duck-sapphire-champion.ts`
    - `should grant Resist +1 to other Sapphire characters while Daisy is in play`
    - `should grant Resist +1 to multiple other Sapphire characters`
    - `should not grant Resist to non-Sapphire characters`
    - `should remove Resist when Daisy leaves play`
    - `should allow putting the top card on the top of the deck`
    - `should allow putting the top card on the bottom of the deck`
    - `should not trigger when Daisy herself quests`
    - `should not trigger when non-Sapphire character quests`
    - `should trigger multiple times for multiple Sapphire characters questing`
    - `should create correct number of triggers when using Quest with All with multiple Daisys`
    - `should trigger when another Daisy copy quests`

- [ ] **010/characters/159-kristoff-mining-the-ruins.test.ts**
  - Card: `010/characters/159-kristoff-mining-the-ruins.ts`
    - `should have boost ability`
    - `should have the ability defined with correct structure`
    - `should have condition checking for card under character`
    - `should trigger when character quests`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be sapphire color`
    - `should be rare rarity`

- [ ] **010/characters/160-mickey-mouse-detective.test.ts**
  - Card: `010/characters/160-mickey-mouse-detective.ts`
    - `should have the ability defined with correct structure`
    - `should be optional ability`
    - `should trigger when you play this character`
    - `should have correct stats`
    - `should not be inkwell card`
    - `should have correct characteristics for Detective synergy`
    - `should be sapphire color`
    - `should be common rarity`

- [ ] **010/characters/171-robin-hood-ephemeral-archer.test.ts**
  - Card: `010/characters/171-robin-hood-ephemeral-archer.ts`
    - `Boost 1 (Once during your turn, you may pay 1 to put the top card of your deck facedown under this character.) `
    - `EXPERT SHOT Whenever this character quests, if there's a card under him, deal 1 damage to up to 2 chosen characters.`

- [ ] **010/characters/172-donald-duck-ghost-hunter.test.ts**
  - Card: `MISSING`
    - `RAISE A RUCKUS When you play this character, choose a Detective character to gain Challenger +2 for the rest of this turn. (While challenging, that character gets +2 {S}.)`

- [ ] **010/characters/172-donald-ghost-hunter.test.ts**
  - Card: `010/characters/172-donald-ghost-hunter.ts`
    - `should grant Challenger +2 to chosen Detective character when played`
    - `should allow Donald to target himself (he is a Detective)`
    - `should only target Detective characters`
    - `should grant Challenger +2 for the rest of the turn only`
    - `should apply +2 strength when the Detective challenges`
    - `should have the ability defined with correct structure`
    - `should grant Challenger +2`
    - `should target Detective characters`
    - `should trigger when you play this character`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics for Detective synergy`
    - `should be steel color`
    - `should be common rarity`

- [ ] **010/characters/173-goliath-clan-leader.test.ts**
  - Card: `010/characters/173-goliath-clan-leader.ts`
    - `When player has more than 2 cards in hand should discard down to 2 cards at end of turn`
    - `When player has fewer than 2 cards in hand should draw up to 2 cards at end of turn`
    - `should draw up to 2 cards when player has 0 cards`
    - `When player has exactly 2 cards in hand should not change hand size`
    - `When player has more than 2 cards in hand should discard down to 2 cards at end of turn`
    - `should draw up to 2 cards when player has 0 cards`
    - `When player has fewer than 2 cards in hand should draw up to 2 cards at end of turn`
    - `When player has exactly 2 cards in hand should not change hand size`
    - `When player one controls 2 Goliaths and opponent has >2 cards should discard down to 2 only once`
    - `When player one controls two Goliaths and opponent has <2 cards should draw up to 2 only once`
    - `When each player controls one Goliath and opponent has >2 cards should discard down to 2`
    - `When each player controls one Goliath and opponent has <2 cards should draw up to 2 (single resolution)`
    - `Clarabelle ordering: active player's Clarabelle effects must resolve before opponent's Goliath effects`
    - `Clarabelle ordering: active player's Clarabelle effects must resolve before opponent's Goliath's effects`

- [ ] **010/characters/174-the-headless-horseman-cursed-rider.test.ts**
  - Card: `010/characters/174-the-headless-horseman-cursed-rider.ts`
    - `both players draw 3 cards and discard 3 cards at random - no action cards`
    - `deals 2 damage per action card discarded - 1 action card from player`
    - `deals 2 damage per action card discarded - multiple action cards from both players`
    - `deals 2 damage per action card discarded - all 6 cards are action cards`
    - `targets only opposing characters for damage`
    - `Kronk prevents discards from WITCHING HOUR effect`

- [ ] **010/characters/175-clawhauser-donut-detective.test.ts**
  - Card: `010/characters/175-clawhauser-donut-detective.ts`
    - `Challenger +2`

- [ ] **010/characters/176-francine-eyeing-the-evidence.test.ts**
  - Card: `010/characters/176-francine-eyeing-the-evidence.ts`
    - `Resist +1 (Damage dealt to this character is reduced by 1.)`

- [ ] **010/characters/177-inspector-tezuka-resolute-officer.test.ts**
  - Card: `010/characters/177-inspector-tezuka-resolute-officer.ts`
    - `should have bodyguard ability`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics for Detective synergy`
    - `should be steel color`
    - `should be common rarity`

- [ ] **010/characters/179-basil-tenacious-mouse.test.ts**
  - Card: `010/characters/179-basil-tenacious-mouse.ts`
    - `should have the ability defined with correct structure`
    - `should trigger when you play another Detective character`
    - `should apply effect to this character`
    - `should grant Resist +1 to Basil when another Detective is played`
    - `should NOT trigger when Basil himself is played (excludeSelf)`
    - `should NOT trigger when playing a non-Detective character`
    - `resist should last until the start of your next turn`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics for Detective synergy`
    - `should be steel color`
    - `should be common rarity`

- [ ] **010/characters/180-hudson-determined-reader.test.ts**
  - Card: `010/characters/180-hudson-determined-reader.ts`
    - `should allow drawing a card then discarding a card when played`
    - `should allow declining the optional ability`
    - `should trigger when you play this character`
    - `should be optional`
    - `should have ready restriction effect`
    - `should have condition for 3 or more cards in hand`
    - `should have Stone By Day ability defined`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be steel color`
    - `should be common rarity`

- [ ] **010/characters/181-minnie-mouse-ghost-hunter.test.ts**
  - Card: `010/characters/181-minnie-mouse-ghost-hunter.ts`
    - `should grant Alert to chosen Detective character when played`
    - `should allow Minnie to target herself (she is a Detective)`
    - `should only target Detective characters`
    - `should grant Alert for the rest of the turn only`
    - `should trigger when you play this character`
    - `should have the ability defined with correct structure`
    - `should target Detective characters in play`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics for Detective synergy`
    - `should be steel color`
    - `should be common rarity`

- [ ] **010/characters/182-black-heron-real-bad-egg.test.ts**
  - Card: `010/characters/182-black-heron-real-bad-egg.ts`
    - `should be a vanilla character with correct stats and no special abilities`
    - `should be able to quest for lore`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`

- [ ] **010/characters/183-lexington-small-in-stature.test.ts**
  - Card: `010/characters/183-lexington-small-in-stature.ts`
    - `should have Alert ability`
    - `should have Alert ability with correct type`
    - `should have STONE BY DAY ability that restricts readying when you have 3+ cards in hand`
    - `STONE BY DAY ability should be defined with correct text`
    - `should have Stone By Day ability defined`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be steel color`
    - `should be uncommon rarity`

- [ ] **010/characters/184-david-xanatos-steel-clan-leader.test.ts**
  - Card: `010/characters/184-david-xanatos-steel-clan-leader.ts`
    - `should deal 2 damage to chosen character after discarding a card`
    - `should allow declining the optional ability`
    - `should trigger when you play this character`
    - `should be optional`
    - `should have damage and discard effects`
    - `should deal 2 damage`
    - `should discard 1 card from hand`
    - `should target any character in play`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be steel color`
    - `should be uncommon rarity`

- [ ] **010/characters/185-chief-bogo-calling-the-shots.test.ts**
  - Card: `010/characters/185-chief-bogo-calling-the-shots.ts`
    - `should not take damage during your turn`
    - `should take damage during opponent's turn`
    - `should grant Detective classification to other characters`
    - `should not grant Detective classification to itself`
    - `should remove Detective classification when Chief Bogo leaves play`
    - `should grant Detective classification to characters played after Chief Bogo`

- [ ] **010/characters/186-the-twins-lost-boys.test.ts**
  - Card: `010/characters/186-the-twins-lost-boys.ts`
    - `should deal 2 damage when you have a location in play`
    - `should not trigger when you don't have a location in play`
    - `should be optional`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be steel color`
    - `should be super rare rarity`

- [ ] **010/characters/187-nick-wilde-persistent-investigator.test.ts**
  - Card: `010/characters/187-nick-wilde-persistent-investigator.ts`
    - `Shift 3 (You may pay 3 to play this on top of one of your characters named Nick Wilde.) CASE CLOSED During your turn, whenever one of your Detective characters banishes another character in a challenge, draw a card.`

- [ ] **010/characters/189-prince-charming-protector-of-the-realm.test.ts**
  - Card: `010/characters/189-prince-charming-protector-of-the-realm.ts`
    - `Bodyguard`
    - `player_one has Prince Charming`
    - `player_two has Prince Charming`
    - `same character can challenge multiple times if readied`

- [ ] **010/characters/190-broadway-sturdy-and-strong.test.ts**
  - Card: `010/characters/190-broadway-sturdy-and-strong.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.) STONE BY DAY If you have 3 or more cards in your hand, this character can’t ready.`

- [ ] **010/characters/191-pluto-steel-champion.test.ts**
  - Card: `010/characters/191-pluto-steel-champion.ts`
    - `WINNER TAKE ALL During your turn, whenever one of your other Steel characters banishes another character in a challenge, gain 2 lore. MAKE ROOM Whenever you play another Steel character, you may banish chosen item.`
    - `MAKE ROOM Whenever you play another Steel character, you may banish chosen item.`
    - `Do not banish item when playing pluto`

- [ ] **010/characters/192-fairy-godmother-magical-benefactor.test.ts**
  - Card: `010/characters/192-fairy-godmother-magical-benefactor.ts`
    - `Boost 3 {I} (Once during your turn, you may pay 3 {I} to put the top card of your deck facedown under this character.) `
    - `Top card is a character`
    - `Top card is an action - put on bottom of opponent deck`

- [ ] **010/characters/193-zeus-missing-his-spark.test.ts**
  - Card: `010/characters/193-zeus-missing-his-spark.ts`
    - `Boost 2 (Once during your turn, you may pay 2 to put the top card of your deck facedown under this character.) `
    - `I NEED MORE THUNDERBOLTS! While there's a card under this character, he gets +2 {S} and +2 {W} - with boost`
    - `I NEED MORE THUNDERBOLTS! While there's a card under this character, he gets +2 {S} and +2 {W} - without boost`

- [ ] **010/characters/194-the-headless-horseman-relentless-spirit.test.ts**
  - Card: `010/characters/194-the-headless-horseman-relentless-spirit.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`

### items (18 tests)

- [ ] **010/items/030-recovered-page.test.ts**
  - Card: `010/items/030-recovered-page.ts`
    - `allows tutoring a character card from top 4 cards to hand`
    - `allows putting all cards on bottom if no character is chosen`
    - `allows boosting a character with Boost ability by exerting and banishing the item`

- [ ] **010/items/031-webby-s-diary.test.ts**
  - Card: `010/items/031-webby-s-diary.ts`
    - `LATEST ENTRY Whenever you put a card under one of your characters or locations, you may pay 1 {I} to draw a card.`

- [ ] **010/items/032-the-black-cauldron.test.ts**
  - Card: `010/items/032-the-black-cauldron.ts`
    - `THE CAULDRON CALLS - {E}, 1 {I} — Put a character card from your discard under this item faceup.`
    - `RISE AND JOIN ME! - {E}, 1 {I} — This turn, you may play characters from under this item.`
    - `RISE AND JOIN ME! - Should only be able to play characters from under the specific cauldron`
    - `RISE AND JOIN ME! - Should allow shift when card is under cauldron`
    - `RISE AND JOIN ME! - Should apply cost reduction effects when playing from under cauldron`
    - `RISE AND JOIN ME! - play from under applies cost reduction once (exact ink paid)`
    - `RISE AND JOIN ME! - Should not persist between turns`
    - `PLAY CARDS UNDER - Should allow viewing cards even when play-permission is not active`

- [ ] **010/items/033-munchings-and-crunchings.test.ts**
  - Card: `010/items/033-munchings-and-crunchings.ts`
    - `removes exactly 2 damage from a damaged character`
    - `removes exactly 1 damage from a character with 1 damage`
    - `does not heal a character with no damage`
    - `can heal any character in play`
    - `exerts the card when activated`
    - `reduces Gurgi's cost by 1 ink when Munchings And Crunchings is in play`
    - `Gurgi costs normal 2 ink without Munchings And Crunchings`
    - `does not affect other characters' costs`
    - `cost reduction only applies while Munchings And Crunchings is in play`

- [ ] **010/items/066-junior-woodchuck-guidebook.test.ts**
  - Card: `010/items/066-junior-woodchuck-guidebook.ts`
    - `should pay 1 ink and banish this item to draw 2 cards`
    - `can activate ability but will fail due to insufficient ink during resolution`
    - `can activate ability even when item is exerted`
    - `should draw cards even when deck has exactly 2 cards remaining`

- [ ] **010/items/067-grimorum-arcanorum.test.ts**
  - Card: `010/items/067-grimorum-arcanorum.ts`
    - `DOCTRINA ADDUCERE During your turn, whenever an opposing character becomes exerted, gain 1 lore.`
    - `CELERITAS Your characters named Demona gain Rush.`

- [ ] **010/items/098-potion-of-malice.test.ts**
  - Card: `010/items/098-potion-of-malice.ts`
    - `puts 1 damage counter on chosen character when activated`
    - `can target any character in play`
    - `grants Reckless to all opposing damaged characters until start of next turn`
    - `does not grant Reckless to own damaged characters`
    - `does not affect characters if no opposing characters are damaged`

- [ ] **010/items/099-inscrutable-map.test.ts**
  - Card: `010/items/099-inscrutable-map.ts`
    - `BACKTRACK , 1 — Chosen opposing character gets -1 lore until the start of your next turn.`

- [ ] **010/items/100-enigmatic-inkcaster.test.ts**
  - Card: `010/items/100-enigmatic-inkcaster.ts`
    - `should NOT gain lore when only Inkcaster has been played (1 card)`
    - `should gain 1 lore when 1 card + Inkcaster have been played (2 cards)`
    - `should gain 1 lore when 2 cards + Inkcaster have been played (3 cards)`

- [ ] **010/items/101-blessed-bagpipes.test.ts**
  - Card: `010/items/101-blessed-bagpipes.ts`
    - `MCDUCK HEIRLOOM - When you play this item, you may put the top card of your deck facedown under one of your characters or locations with Boost.`
    - `should gain 1 lore when a character with a card under them is challenged`
    - `should NOT gain lore when a character WITHOUT a card under them is challenged`

- [ ] **010/items/134-mushu-s-rocket.test.ts**
  - Card: `010/items/134-mushu-s-rocket.ts`
    - `grants Rush to a chosen character when the item is played`
    - `allows the chosen character to challenge immediately after gaining Rush`
    - `can be activated after playing the item`
    - `banishes the item when the ability is activated`
    - `grants Rush to the chosen character when activated`

- [ ] **010/items/166-detective-s-badge.test.ts**
  - Card: `010/items/166-detective-s-badge.ts`
    - `PROTECT AND SERVE {E}, 1 {I} — Chosen character gains Resist +1 and the Detective classification until the start of your next turn.`

- [ ] **010/items/167-ink-amplifier.test.ts**
  - Card: `010/items/167-ink-amplifier.ts`
    - `ENERGY CAPTURE - Triggers when opponent draws their second card during their turn`
    - `ENERGY CAPTURE - Does NOT trigger when opponent draws their first card`
    - `ENERGY CAPTURE - Does NOT trigger during your own turn`

- [ ] **010/items/168-fairy-godmother-s-wand.test.ts**
  - Card: `010/items/168-fairy-godmother-s-wand.ts`
    - `ONLY TILL MIDNIGHT - chosen Princess character gains Ward until the start of your next turn`
    - `ONLY TILL MIDNIGHT - should only trigger during your turn`
    - `ONLY TILL MIDNIGHT - should only target Princess characters of yours`

- [ ] **010/items/169-inkrunner.test.ts**
  - Card: `010/items/169-inkrunner.ts`
    - `PREFLIGHT CHECK When you play this item, draw a card.`
    - `READY TO RIDE {E}, 1 {I} - Chosen character gains Alert this turn. (They can challenge as if they had Evasive.)`

- [ ] **010/items/199-the-robot-queen.test.ts**
  - Card: `010/items/199-the-robot-queen.ts`
    - `MAJOR MALFUNCTION - Triggers when you play a character and deals 2 damage`
    - `MAJOR MALFUNCTION - Can decline the optional ability`

- [ ] **010/items/200-the-sword-of-hercules.test.ts**
  - Card: `010/items/200-the-sword-of-hercules.ts`
    - `banishes chosen opposing Deity character when played`
    - `gains 1 lore when your character banishes another character in a challenge during your turn`

- [ ] **010/items/201-ingenious-device.test.ts**
  - Card: `010/items/201-ingenious-device.ts`
    - `should exert, pay 2 ink, banish item, draw a card, then choose and discard a card`
    - `should deal 3 damage to chosen character when item is banished during your turn`
    - `should deal 3 damage to chosen location when item is banished during your turn`

### locations (9 tests)

- [ ] **010/locations/034-duckburg-funsos-funzone.test.ts**
  - Card: `010/locations/034-duckburg-funsos-funzone.ts`
    - `can be played from hand with sufficient ink`
    - `reduces cost of next character by 2 when a character quests while at this location`

- [ ] **010/locations/068-the-great-illuminary-abandoned-laboratory.test.ts**
  - Card: `010/locations/068-the-great-illuminary-abandoned-laboratory.ts`

- [ ] **010/locations/102-white-agony-plains-golden-lagoon.test.ts**
  - Card: `010/locations/102-white-agony-plains-golden-lagoon.ts`
    - `should have base willpower of 7 with no characters at the location`
    - `should have willpower of 8 with 1 character at the location`
    - `should have willpower of 9 with 2 characters at the location`

- [ ] **010/locations/135-the-bitterwood-underground-forest.test.ts**
  - Card: `010/locations/135-the-bitterwood-underground-forest.ts`
    - `should trigger and draw a card when moving a character with 5+ strength to the location`
    - `should not trigger when moving a character with less than 5 strength`
    - `should only trigger once per turn`
    - `should be optional - ability is triggered but can be declined`

- [ ] **010/locations/136-sleepy-hollow-the-bridge.test.ts**
  - Card: `010/locations/136-sleepy-hollow-the-bridge.ts`
    - `should gain 2 lore, give Evasive, and banish the location when a character quests here`
    - `should not trigger if character quests elsewhere`
    - `should allow declining the optional ability`

- [ ] **010/locations/170-castle-of-the-horned-king-bastion-of-evil.test.ts**
  - Card: `010/locations/170-castle-of-the-horned-king-bastion-of-evil.ts`
    - `should have correct basic stats`
    - `should be emerald location card`
    - `should be inkwell card`
    - `should be rare rarity`
    - `should have correct set and number`
    - `should have the correct ability text`
    - `should be playable from hand with correct ink cost`
    - `should be able to be used as ink`
    - `should have the INTO THE GLOOM ability properly implemented`
    - `should have correct ability structure`
