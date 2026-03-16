# Card Test Inventory

Legacy implementation base directory: /Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards
New implementation base directory: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards


**Chunk 17 of 18** | [← Previous](AUDIT_INVENTORY_CHUNK_16.md) | [Next →](AUDIT_INVENTORY_CHUNK_18.md)


- [ ] **010/locations/202-illuminary-tunnels-linked-caverns.test.ts**
  - Card: `010/locations/202-illuminary-tunnels-linked-caverns.ts`
    - `SUBTERRANEAN NETWORK While you have a character here, this location gets +1 {L} for each other location you have in play.`
    - `LOCUS While you have a character here, you pay 1 {I} less to play locations.`

- [ ] **010/locations/203-zootopia-police-headquarters.test.ts**
  - Card: `010/locations/203-zootopia-police-headquarters.ts`
    - `should trigger and draw a card when moving a character to the location after playing`

- [ ] **010/locations/204-castle-wyvern-above-the-clouds.test.ts**
  - Card: `010/locations/204-castle-wyvern-above-the-clouds.ts`
    - `gives characters at the location Resist +1 - reduces damage taken by 1`
    - `gives characters at the location Challenger +1 - deals +1 damage when challenging`
    - `gives both abilities to multiple characters at the location`
    - `does not give abilities to characters not at the location`
    - `abilities are removed when character leaves the location`

## Set 011

### actions (25 tests)

- [ ] **011/actions/028-raging-storm.test.ts**
  - Card: `011/actions/028-raging-storm.ts`
    - `Banish all characters`
    - `banishes all characters even with lots of triggers`

- [ ] **011/actions/029-akood-et-emuti.test.ts**
  - Card: `011/actions/029-akood-et-emuti.ts`
    - `You pay 2 {I} less for the next character you play this turn. Draw a card.`
    - `Ariel's AMPLIFIED VOICE ability should still cost 2 ink after Akood Et Emuti cost reduction`

- [ ] **011/actions/030-mother-will-protect-you.test.ts**
  - Card: `011/actions/030-mother-will-protect-you.ts`
    - `Chosen character can't be challenged until the start of your next turn.`
    - `When targeting a bodyguard, the bodyguard is protected but other characters can still be challenged`

- [ ] **011/actions/031-wisdom-of-the-willow.test.ts**
  - Card: `011/actions/031-wisdom-of-the-willow.ts`
    - `should have correct cost`
    - `should be inkable`
    - `should have correct characteristics`
    - `should be amber color`
    - `should be uncommon rarity`
    - `should be from SET 011`
    - `should be card number 31`
    - `should be an action card`
    - `should have ability defined`
    - `should be able to play the action`
    - `should grant quest draw ability to characters`
    - `should be implemented`

- [ ] **011/actions/032-ohana-means-family.test.ts**
  - Card: `011/actions/032-ohana-means-family.ts`
    - `Should remove all damage from chosen character and draw a card for each 1 damage removed`
    - `Should draw no cards if character has no damage`

- [ ] **011/actions/061-do-you-want-to-build-a-snowman-.test.ts**
  - Card: `011/actions/061-do-you-want-to-build-a-snowman-.ts`
    - `gains you 3 lore if opponent chooses YES`
    - `puts chosen opponent character on bottom of their deck if they choose NO`

- [ ] **011/actions/062-come-out-and-fight-.test.ts**
  - Card: `011/actions/062-come-out-and-fight-.ts`
    - `moves cards from under a character to the bottom of the deck and draws a card`
    - `still draws a card even if there are no cards under the target`

- [ ] **011/actions/063-swordplay.test.ts**
  - Card: `011/actions/063-swordplay.ts`
    - `Chosen character gains Challenger +3 this turn. (They get +3 while challenging.)`

- [ ] **011/actions/064-colors-of-the-wind.test.ts**
  - Card: `011/actions/064-colors-of-the-wind.ts`
    - `should draw 2 cards when both players reveal cards with different colors`
    - `should draw 1 card when both players reveal cards with the same color`
    - `should draw 1 card when only self has a card in deck`
    - `should draw 1 card when only opponent has a card in deck`
    - `should draw 0 cards when both decks are empty`
    - `should reveal both players' top cards`
    - `should draw 2 cards when revealing a single dual-ink card (counts both colors)`
    - `should draw 3 cards when revealing a dual-ink card and a different single-ink card`
    - `should draw 2 cards when dual-ink card shares one color with opponent's card`

- [ ] **011/actions/095-snowball-fight.test.ts**
  - Card: `011/actions/095-snowball-fight.ts`
    - `Each opponent chooses and discards a card`
    - `If you have a character with Evasive in play, gain 1 lore`

- [ ] **011/actions/096-freeze-the-vine.test.ts**
  - Card: `011/actions/096-freeze-the-vine.ts`
    - `Banishes all locations, draws 2 cards, then discards a card`

- [ ] **011/actions/097-education-or-elimination.test.ts**
  - Card: `011/actions/097-education-or-elimination.ts`
    - `draws a card when mode 1 is chosen`
    - `chosen character of yours gets +1 lore`
    - `chosen character of yours gains Evasive`
    - `lore bonus and Evasive last until the start of your next turn`
    - `can only target your own characters for mode 1`
    - `should apply both +1 lore and Evasive to the SAME character (not allow selecting different characters)`
    - `banishes a damaged character`
    - `can banish your own damaged character`
    - `cannot banish an undamaged character`

- [ ] **011/actions/127-nani-s-payback.test.ts**
  - Card: `011/actions/127-nani-s-payback.ts`
    - `should make opponent lose lore equal to damage on chosen character`
    - `should cap lore loss at maximum of 4`
    - `should make opponent lose 0 lore when character has no damage`
    - `should draw a card even when opponent loses 0 lore`
    - `should only target characters you control`

- [ ] **011/actions/128-force-of-a-great-typhoon.test.ts**
  - Card: `011/actions/128-force-of-a-great-typhoon.ts`
    - `Chosen character gets +5 {S} this turn when played normally`
    - `can be played by paying ink cost`
    - `effect lasts only until end of turn`
    - `handles gracefully when no valid targets`

- [ ] **011/actions/129-marching-off-to-battle.test.ts**
  - Card: `011/actions/129-marching-off-to-battle.ts`
    - `should draw 2 cards`
    - `Should not draw 2 cards`

- [ ] **011/actions/130-the-cold-never-bothered-me.test.ts**
  - Card: `011/actions/130-the-cold-never-bothered-me.ts`
    - `should have correct stats`
    - `should be a song action`
    - `should have correct name and illustrator`
    - `should look at top 4 cards and put location into hand`
    - `should reduce cost of next location played this turn by 3`
    - `should have resolution ability`
    - `should have correct card text`

- [ ] **011/actions/131-grab-your-bow.test.ts**
  - Card: `011/actions/131-grab-your-bow.ts`
    - `should banish chosen opposing characters with strength 2 or less when played`
    - `should not target opposing character with strength 3`
    - `should be able to target a single character`
    - `should be able to target own characters`

- [ ] **011/actions/162-visiting-christmas-past.test.ts**
  - Card: `011/actions/162-visiting-christmas-past.ts`
    - `should move cards from under a character to inkwell exerted`
    - `should allow selecting multiple cards from under different characters`
    - `should allow selecting zero cards (optional selection)`
    - `should work when no cards are under any characters`
    - `should only target cards under YOUR characters (not opponent's)`

- [ ] **011/actions/164-distract.test.ts**
  - Card: `011/actions/164-distract.ts`
    - `Chosen character gets -2 this turn. Draw a card.`

- [ ] **011/actions/165-wipe-out-.test.ts**
  - Card: `011/actions/165-wipe-out-.ts`
    - `should put a character with Bodyguard into their player's inkwell exerted`
    - `should put an item into their player's inkwell exerted`
    - `should put opponent's character with Bodyguard into their inkwell exerted`
    - `should put opponent's item into their inkwell exerted`
    - `should NOT be able to target a character without Bodyguard`

- [ ] **011/actions/196-keep-the-ancient-ways.test.ts**
  - Card: `011/actions/196-keep-the-ancient-ways.ts`
    - `Opponents can't play actions or items until the start of your next turn`

- [ ] **011/actions/197-the-terror-that-flaps-in-the-night.test.ts**
  - Card: `011/actions/197-the-terror-that-flaps-in-the-night.ts`
    - `should deal 2 damage to chosen opposing character when Darkwing Duck is NOT in play`
    - `should deal 3 damage to chosen opposing character when Darkwing Duck IS in play`
    - `should not deal damage to your own characters`

- [ ] **011/actions/198-let-s-get-dangerous.test.ts**
  - Card: `011/actions/198-let-s-get-dangerous.ts`
    - `Player reveals a character card and plays it for free`
    - `Player reveals a non-character card and puts it on bottom of deck`
    - `Player reveals a character but declines to play it`
    - `Both players reveal characters and can play them`
    - `Card moved to hand before modal resolution should not be played`
    - `Card moved to hand before modal resolution - bottom mode should not move it`

- [ ] **011/actions/199-winterspell.test.ts**
  - Card: `011/actions/199-winterspell.ts`
    - `prevents chosen location from being challenged until your next turn and draws a card`

- [ ] **011/actions/200-nearly-indestructible.test.ts**
  - Card: `011/actions/200-nearly-indestructible.ts`
    - `should grant Resist +2 to chosen character of yours`
    - `should persist through opponent's turn`
    - `should expire at the start of your next turn`
    - `should reduce damage dealt to the character by 2 in a challenge`
    - `should send the action card to discard after playing`

### characters (137 tests)

- [ ] **011/characters/002-lilo-snow-artist.test.ts**
  - Card: `011/characters/002-lilo-snow-artist.ts`
    - `should have base lore of 1 when Stitch is not in play`
    - `should have lore of 2 when Stitch is in play`
    - `should gain 2 lore when questing with Stitch in play`
    - `should gain 1 lore when questing without Stitch in play`

- [ ] **011/characters/004-pumbaa-winter-warthog.test.ts**
  - Card: `011/characters/004-pumbaa-winter-warthog.ts`
    - `SHAKE THINGS UP When you play this character, each opponent chooses and discards a card.`

- [ ] **011/characters/005-tiana-warm-and-happy.test.ts**
  - Card: `011/characters/005-tiana-warm-and-happy.ts`
    - `should provide Support when questing`

- [ ] **011/characters/006-nakoma-waiting-out-the-storm.test.ts**
  - Card: `011/characters/006-nakoma-waiting-out-the-storm.ts`
    - `Should be playable (vanilla character)`

- [ ] **011/characters/007-stitch-carefree-snowboarder.test.ts**
  - Card: `011/characters/007-stitch-carefree-snowboarder.ts`
    - `BRING YOUR FRIENDS - Should draw a card when questing with 2 or more other characters in play`
    - `BRING YOUR FRIENDS - Should be optional when condition is met`
    - `BRING YOUR FRIENDS - Should not trigger when there are less than 2 other characters in play`
    - `BRING YOUR FRIENDS - Should not trigger when Stitch is the only character in play`

- [ ] **011/characters/008-pocahontas-finding-the-way.test.ts**
  - Card: `011/characters/008-pocahontas-finding-the-way.ts`
    - `Test 1: triggers when Pocahontas is played`
    - `Test 2: gives chosen character +1 lore this turn`
    - `Test 3: target can quest for increased lore`
    - `Test 4: can target own characters`
    - `Test 5: can target opponent's characters`
    - `Test 6: bonus lasts only until end of turn`
    - `Test 7: can target Pocahontas herself`
    - `Test 8: works with multiple characters in play`

- [ ] **011/characters/009-david-protective-snowboarder.test.ts**
  - Card: `011/characters/009-david-protective-snowboarder.ts`
    - `Test 1: has Bodyguard ability`
    - `Test 2: can enter play ready`
    - `Test 3: can enter play exerted (optional)`

- [ ] **011/characters/010-fangmeyer-icy-officer.test.ts**
  - Card: `011/characters/010-fangmeyer-icy-officer.ts`
    - `Test 1: triggers when Fangmeyer is played`
    - `Test 2: is optional - can be declined`
    - `Test 3: returns a Detective character from discard to hand`
    - `Test 4: only targets Detective characters`
    - `Test 5: works with multiple Detective characters in discard`
    - `Test 6: verifies Detective characteristic is required`
    - `Test 7: increases hand count correctly after returning card`
    - `Test 8: does not create stack layer when no Detective characters in discard`
    - `Test 9: updates zone counts correctly`

- [ ] **011/characters/011-chief-powhatan-protective-leader.test.ts**
  - Card: `011/characters/011-chief-powhatan-protective-leader.ts`
    - `should have Bodyguard ability`
    - `should be able to enter play exerted (Bodyguard)`
    - `should be able to enter play ready (Bodyguard optional)`
    - `should not be able to challenge an exerted character`
    - `should not be able to challenge a ready character`
    - `should not deal damage when attempting to challenge`
    - `should be able to be challenged by opponent`
    - `should have STANDS HIS GROUND ability`

- [ ] **011/characters/012-sarabi-protecting-the-pride.test.ts**
  - Card: `011/characters/012-sarabi-protecting-the-pride.ts`
    - `reduces chosen opposing character's strength by 4`
    - `can only target opposing characters`
    - `strength reduction expires at the start of controller's next turn`
    - `can reduce strength to 0 (floored)`
    - `exerts Sarabi when using FEARSOME SNARL`

- [ ] **011/characters/013-grandmother-willow-ancient-advisor.test.ts**
  - Card: `011/characters/013-grandmother-willow-ancient-advisor.ts`
    - `should automatically reduce the cost of the first character played by 1`
    - `should only apply discount to the first character played (mandatory, cannot skip)`
    - `should apply even to characters played for free (eats the reduction)`
    - `should apply discount when Willow enters play mid-turn`
    - `should only discount ONE character after mid-turn entry (not all characters)`
    - `should have both whenPlayed and startOfTurn abilities`
    - `should NOT make all 1-drops free when Willow is played mid-turn (regression test)`
    - `reduction applied once: paid ink equals modified cost`
    - `two reduction sources stack correctly (no double-apply)`

- [ ] **011/characters/014-cobra-bubbles-dedicated-official.test.ts**
  - Card: `011/characters/014-cobra-bubbles-dedicated-official.ts`
    - `should trigger when Cobra Bubbles quests`
    - `should apply must-quest restriction during opponent's next turn`
    - `should apply both restrictions (can't challenge AND must quest)`
    - `should trigger every time Cobra Bubbles quests (no condition required)`
    - `should NOT allow restricted opponent character to sing (must quest)`

- [ ] **011/characters/015-john-smith-snow-tracker.test.ts**
  - Card: `011/characters/015-john-smith-snow-tracker.ts`
    - `Should gain 1 lore at end of turn when exerted and no characters challenged`
    - `Should not gain lore when character is not exerted`
    - `Should not gain lore when John Smith has challenged this turn`
    - `Should not gain lore when characters have challenged this turn`

- [ ] **011/characters/016-timon-snowball-swiper.test.ts**
  - Card: `011/characters/016-timon-snowball-swiper.ts`
    - `should reveal opponent's hand and allow choosing a non-character card to discard`
    - `should only allow discarding non-character cards, not characters`
    - `should work when opponent has no non-character cards in hand`

- [ ] **011/characters/017-lilo-rock-star.test.ts**
  - Card: `011/characters/017-lilo-rock-star.ts`
    - `can be played on top of a character named Lilo for 4 ink`
    - `cannot shift onto a character not named Lilo`
    - `should allow playing a character with cost 2 or less from discard when questing`
    - `should not allow playing a character with cost greater than 2`
    - `should not trigger when ability is declined`
    - `should play the character for free (no ink cost)`
    - `should only target characters in your own discard`
    - `should work with cost 2 characters`
    - `should trigger each time Lilo quests`

- [ ] **011/characters/018-pleakley-arctic-naturalist.test.ts**
  - Card: `011/characters/018-pleakley-arctic-naturalist.ts`
    - `SIGNS OF LIFE When you play this character, if you have another Alien character in play, draw a card`
    - `Should not draw a card when no other Alien character is in play`

- [ ] **011/characters/019-jumba-jookiba-prolific-inventor.test.ts**
  - Card: `011/characters/019-jumba-jookiba-prolific-inventor.ts`
    - `WELCOMING CROWD - Should reduce cost by 1 for each character in play`
    - `I AM HELPING - Should allow removing all damage from chosen character when questing`

- [ ] **011/characters/020-nani-stage-manager.test.ts**
  - Card: `011/characters/020-nani-stage-manager.ts`
    - `allows tutoring a character card with cost 2 or less from top 4 cards to hand`
    - `allows putting all cards on bottom if no valid character is chosen`
    - `cannot tutor a character with cost greater than 2`

- [ ] **011/characters/021-reuben-sandwich-expert.test.ts**
  - Card: `011/characters/021-reuben-sandwich-expert.ts`
    - `Removing 2 damage should reduce next character cost by 2`
    - `Removing 1 damage should reduce next character cost by 1`
    - `paid ink equals expected reduced cost (no double-apply)`

- [ ] **011/characters/022-pocahontas-peacekeeper.test.ts**
  - Card: `011/characters/022-pocahontas-peacekeeper.ts`
    - `should prevent characters in play from challenging after CALMING WORDS triggers`
    - `should prevent characters played after the effect from challenging`
    - `should prevent Rush characters played AFTER the effect from challenging`
    - `should allow challenging after the effect expires (at start of next turn)`

- [ ] **011/characters/023-simba-playful-pouncer.test.ts**
  - Card: `011/characters/023-simba-playful-pouncer.ts`
    - `YOU DON'T STAND A CHANCE effect - Chosen opposing character gets -2 {S} until start of next turn`
    - `Should have correct ability structure`
    - `Should be implemented`

- [ ] **011/characters/024-bambi-ethereal-fawn.test.ts**
  - Card: `011/characters/024-bambi-ethereal-fawn.ts`
    - `should only trigger once per turn`
    - `should trigger when questing with cards under`
    - `should put non-character cards on bottom of deck`
    - `should NOT trigger when no cards are under`
    - `should reveal multiple cards when multiple cards are under`
    - `should trigger when challenging (exerting)`
    - `should trigger when singing a song (exerting)`
    - `should not trigger when exerted on opponents turn`
    - `should trigger when exerted as a cost (e.g., The Sword of Shan Yu)`

- [ ] **011/characters/025-angel-siren-singer.test.ts**
  - Card: `011/characters/025-angel-siren-singer.ts`
    - `First Turn, Not First Player`
    - `First Turn, Not First Player, No ink`
    - `First Turn, First Player`

- [ ] **011/characters/026-widow-tweed-kindly-soul.test.ts**
  - Card: `011/characters/026-widow-tweed-kindly-soul.ts`
    - `returns a character card from discard to hand`
    - `returns Tod from discard to hand and plays him for free`
    - `does not offer to play for free when returning a non-Tod character`
    - `plays Tod for free without requiring additional ink`

- [ ] **011/characters/027-percy-pupsicle.test.ts**
  - Card: `011/characters/027-percy-pupsicle.ts`
    - `Should not be able to challenge an exerted character`
    - `Should not be able to challenge a ready character`
    - `Should not deal damage when attempting to challenge`
    - `Should be able to be challenged by opponent`
    - `Should have correct ability structure`

- [ ] **011/characters/035-nala-romping-in-the-snow.test.ts**
  - Card: `011/characters/035-nala-romping-in-the-snow.ts`
    - `Should trigger when Nala is played`
    - `Should give chosen character Evasive`
    - `Should apply Evasive until start of next turn`
    - `Should be able to target Nala herself with Evasive`
    - `Character with Evasive can only be challenged by characters with Evasive or Alert`
    - `Should have correct ability structure`
    - `should keep Evasive during opponent's turn (until start of your next turn)`

- [ ] **011/characters/036-alice-well-read-whisper.test.ts**
  - Card: `011/characters/036-alice-well-read-whisper.ts`
    - `should have Boost 2 ability`
    - `should only trigger once per turn`
    - `should put all cards from under Alice into hand when questing`
    - `should put multiple cards from under Alice into hand`
    - `should NOT trigger when no cards are under Alice`
    - `should trigger ability after questing even if Alice is exerted`

- [ ] **011/characters/037-tigger-bouncing-all-the-way.test.ts**
  - Card: `011/characters/037-tigger-bouncing-all-the-way.ts`
    - `should return own character with cost 2 or less to own hand when played`
    - `should return opponents character with cost 2 or less to opponents hand when played`
    - `should not target characters with cost greater than 2`
    - `should allow skipping the optional ability`

- [ ] **011/characters/038-isis-vanderchill-ice-queen-of-st-canard.test.ts**
  - Card: `011/characters/038-isis-vanderchill-ice-queen-of-st-canard.ts`
    - `CHILL OUT - Should exert chosen opposing character when played`

- [ ] **011/characters/039-flit-reflective-hummingbird.test.ts**
  - Card: `011/characters/039-flit-reflective-hummingbird.ts`
    - `Should trigger when Flit is played`
    - `Should move 1 damage from chosen character to chosen opposing character`
    - `Should move up to 1 damage (can move 0 if source has no damage)`
    - `Should only move 1 damage even if source has more`
    - `Should be implemented`

- [ ] **011/characters/040-morgana-macawber-self-centered-spellcaster.test.ts**
  - Card: `011/characters/040-morgana-macawber-self-centered-spellcaster.ts`
    - `Should be playable (vanilla character)`

- [ ] **011/characters/041-rabbit-fed-up.test.ts**
  - Card: `011/characters/041-rabbit-fed-up.ts`
    - `Challenger +3 (While challenging, this character gets +3 {}.)`

- [ ] **011/characters/042-pocahontas-following-the-wind.test.ts**
  - Card: `011/characters/042-pocahontas-following-the-wind.ts`
    - `should trigger when Pocahontas quests`
    - `should gain lore equal to chosen exerted character's lore (3 lore)`
    - `should only target exerted characters, not ready characters`
    - `should work with opponent's exerted characters`
    - `should not trigger if there are no other exerted characters`
    - `should not target Pocahontas herself even if she's exerted`
    - `should gain 0 lore if choosing a character with 0 lore`

- [ ] **011/characters/043-darkwing-duck-darkwolf-dog.test.ts**
  - Card: `011/characters/043-darkwing-duck-darkwolf-dog.ts`
    - `has Rush keyword`
    - `can challenge the turn it's played`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be amethyst color`

- [ ] **011/characters/044-taran-magically-armed.test.ts**
  - Card: `011/characters/044-taran-magically-armed.ts`
    - `Rush (This character can challenge the turn they're played.)`
    - `should put up to 2 cards from self's discard on bottom of own deck`
    - `should put up to 2 cards from opponent's discard on bottom of their deck`

- [ ] **011/characters/045-eeyore-in-the-way.test.ts**
  - Card: `011/characters/045-eeyore-in-the-way.ts`
    - `should have THANKS FOR NOTICIN' ME ability with correct structure`
    - `should be playable with full cost (no exerted characters)`
    - `should be playable with 2 exerted characters in play (cost 7)`
    - `should count opponent's exerted characters too`
    - `should have SORRY ABOUT THAT ability defined`
    - `should apply can't ready restriction when played and accepted`
    - `should be optional - can decline the ability`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be amethyst color`

- [ ] **011/characters/046-meeko-skittish-scrounger.test.ts**
  - Card: `011/characters/046-meeko-skittish-scrounger.ts`
    - `has Evasive`
    - `triggers at end of turn when exerted - choose to discard a card`
    - `triggers at end of turn when exerted - choose to banish him`
    - `does NOT trigger when not exerted`
    - `when player has no cards in hand and chooses discard, Meeko must be banished`

- [ ] **011/characters/047-morgana-macawber-reformed-spellcaster.test.ts**
  - Card: `011/characters/047-morgana-macawber-reformed-spellcaster.ts`
    - `should have correct base stats`
    - `can be played using Shift 4 on Morgana Macawber - Self-centered Spellcaster`
    - `is optional - can decline the ability`
    - `moves 1 damage from each other character to chosen opposing character`
    - `only moves 1 damage per character even if they have more`
    - `does not move damage from characters with 0 damage`
    - `moves damage from opponent's characters too (each OTHER character)`
    - `can only target opposing characters - not own characters`
    - `does not move damage from the target character to itself`
    - `triggers when played via Shift`

- [ ] **011/characters/048-tinker-bell-snowflake-collector.test.ts**
  - Card: `011/characters/048-tinker-bell-snowflake-collector.ts`
    - `should gain Evasive when hand has exactly 4 cards`
    - `should not have Evasive when hand has less than 4 cards`
    - `should have Evasive when hand has more than 4 cards`
    - `should get +3 lore when hand has exactly 7 cards`
    - `should not get lore bonus when hand has less than 7 cards`
    - `should get +3 lore when hand has more than 7 cards`

- [ ] **011/characters/049-genie-magical-researcher.test.ts**
  - Card: `011/characters/049-genie-magical-researcher.ts`
    - `Boost 1 {} (Once during your turn, you may pay 1 {} to put the top card of your deck facedown under this character.)`
    - `INCREASING WISDOM - Should get +1 {} for each card under him`

- [ ] **011/characters/050-anna-soothing-sister.test.ts**
  - Card: `011/characters/050-anna-soothing-sister.ts`
    - `should be able to shift onto Anna when a card left discard this turn`
    - `should NOT be able to shift when no card left discard this turn`
    - `should work when opponent's card leaves their discard`
    - `should gain lore equal to character lore and move card to bottom of deck when accepted`
    - `should not gain extra lore when declined`
    - `should only target character cards in discard`
    - `should work with different lore characters`
    - `should use printed lore for character in discard (e.g. Flynn - One Last Big Score does not apply)`

- [ ] **011/characters/051-kristoff-icy-explorer.test.ts**
  - Card: `011/characters/051-kristoff-icy-explorer.ts`
    - `should have correct stats`
    - `should NOT be inkwell card`
    - `should be amethyst color`
    - `should be rare rarity`
    - `should be from SET 011`
    - `should be card number 51`
    - `should put a card from own discard on bottom of own deck when Anna is in play`
    - `should put a card from opponent's discard on bottom of their deck when Anna is in play`
    - `should NOT trigger if Anna is NOT in play`
    - `should be optional - can decline the ability when Anna is in play`
    - `should draw a card when a card leaves your discard during your turn`
    - `should only trigger once per turn`
    - `should NOT trigger during opponent's turn`
    - `should trigger when HIDDEN DEPTHS moves a card from discard to deck`
    - `should be able to quest for lore`

- [ ] **011/characters/052-anna-little-sister.test.ts**
  - Card: `011/characters/052-anna-little-sister.ts`
    - `should put a card from own discard on bottom of own deck when accepted`
    - `should put a card from opponent's discard on bottom of their deck`
    - `should be optional - can decline the ability`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be amethyst color`

- [ ] **011/characters/053-marshmallow-cranky-climber.test.ts**
  - Card: `011/characters/053-marshmallow-cranky-climber.ts`
    - `should have ICY BLAST ability defined`
    - `should trigger when questing and gain lore`
    - `should apply can't ready restriction to all opponent characters when questing`
    - `should allow opponent to choose which character to ready`
    - `should work normally when opponent has only 1 exerted character`
    - `should not affect opponent when they have no exerted characters`
    - `should only affect opponent's next turn, not subsequent turns`
    - `should allow opponent to ready 1 character when two Marshmallows quest (ICY BLAST does not stack to block all)`
    - `should NOT allow selecting a character that has 'can't ready' restriction from another source (I'm Stuck!)`
    - `should create 2 ICY BLAST layers when 2 Marshmallows quest (documents bug before fix)`
    - `should work correctly with 2 Marshmallows questing - opponent can ready ONLY 1 character total`

- [ ] **011/characters/055-christopher-robin-joining-the-fun.test.ts**
  - Card: `011/characters/055-christopher-robin-joining-the-fun.ts`
    - `should reduce cost by 1 on first turn if not first player`
    - `should not be playable without enough ink even with UNDERDOG`
    - `should not reduce cost if first player (even on first turn)`
    - `should require full cost if first player`

- [ ] **011/characters/056-lumpy-playful-heffalump.test.ts**
  - Card: `011/characters/056-lumpy-playful-heffalump.ts`
    - `has Evasive keyword`
    - `should have correct stats`
    - `should be inkwell card`
    - `should have correct characteristics`
    - `should be amethyst color`
    - `should be able to quest for lore`

- [ ] **011/characters/057-witches-of-morva-orddu-orwen-and-orgoch.test.ts**
  - Card: `011/characters/057-witches-of-morva-orddu-orwen-and-orgoch.ts`
    - `returns chosen character to hand and gains 1 lore when accepting the optional ability`
    - `does NOT return character or gain lore when declining the optional ability`
    - `does not gain lore when there are no other characters in play`

- [ ] **011/characters/058-heihei-persistent-presence.test.ts**
  - Card: `011/characters/058-heihei-persistent-presence.ts`
    - `should NOT return to hand when banished outside a challenge (e.g., by Dragon Fire)`
    - `should return to hand when banished as attacker`
    - `should return to hand when banished as defender`

- [ ] **011/characters/060-sven-leaping-reindeer.test.ts**
  - Card: `011/characters/060-sven-leaping-reindeer.ts`
    - `has Rush keyword`
    - `has Challenger keyword`
    - `has Evasive keyword`

- [ ] **011/characters/069-mulan-resourceful-recruit.test.ts**
  - Card: `011/characters/069-mulan-resourceful-recruit.ts`
    - `should gain lore equal to her strength when questing`
    - `should gain more lore when strength is higher`
    - `should cap ability lore gain at 6 when strength exceeds 6`
    - `should gain exactly 6 from ability when strength is exactly 6`

- [ ] **011/characters/070-stitch-naughty-experiment.test.ts**
  - Card: `011/characters/070-stitch-naughty-experiment.ts`
    - `grants Reckless to chosen opposing character immediately`
    - `target cannot quest while having Reckless`
    - `Reckless expires at the start of controller's next turn`

- [ ] **011/characters/071-big-mama-clever-and-calming.test.ts**
  - Card: `011/characters/071-big-mama-clever-and-calming.ts`
    - `Ward (Opponents can't choose this character except to challenge.)`

- [ ] **011/characters/072-minnie-mouse-spinning-skater.test.ts**
  - Card: `011/characters/072-minnie-mouse-spinning-skater.ts`
    - `Should be playable (vanilla character)`

- [ ] **011/characters/073-yao-snow-warrior.test.ts**
  - Card: `011/characters/073-yao-snow-warrior.ts`
    - `should have Resist +2 during opponent's turn`
    - `should NOT have Resist during your own turn`
    - `should reduce damage taken during opponent's turn`

- [ ] **011/characters/075-ling-snow-warrior.test.ts**
  - Card: `011/characters/075-ling-snow-warrior.ts`
    - `BUILDING MUSCLES 1 — Chosen character gets +1 this turn.`
    - `BUILDING MUSCLES 1 — Chosen character gets +3 this turn.`

- [ ] **011/characters/076-boomer-has-the-beak.test.ts**
  - Card: `011/characters/076-boomer-has-the-beak.ts`
    - `exerts chosen damaged character when played`
    - `is optional - can decline the ability`
    - `can target own damaged characters`
    - `cannot target undamaged characters`
    - `plays successfully even with no damaged characters to target`

- [ ] **011/characters/077-chernabog-unnatural-force.test.ts**
  - Card: `011/characters/077-chernabog-unnatural-force.ts`
    - `should shuffle chosen opposing character into their deck`
    - `should be optional - can decline the ability`
    - `should allow opponent to play a character from discard for free after shuffling`
    - `opponent can decline to play a character from discard`
    - `should not trigger 'If you do' effect when ability is declined`

- [ ] **011/characters/078-dinky-has-the-brains.test.ts**
  - Card: `011/characters/078-dinky-has-the-brains.ts`
    - `deals 1 damage to opponent's chosen character when played`
    - `opponent can choose any of their characters to take damage`
    - `does nothing if opponent has no characters in play`

- [ ] **011/characters/079-stegmutt-clumsy-dinosaur.test.ts**
  - Card: `011/characters/079-stegmutt-clumsy-dinosaur.ts`
    - `should reduce cost by 1 for each item in discard`
    - `should be playable for free with 8+ items in discard`
    - `should have full cost with no items in discard`
    - `should deal 3 damage when putting 3 items on bottom of deck`
    - `should be optional - can decline the ability`
    - `should not trigger if there are fewer than 3 items in discard`

- [ ] **011/characters/080-squeaks-cozy-caterpillar.test.ts**
  - Card: `011/characters/080-squeaks-cozy-caterpillar.ts`
    - `has Evasive keyword`

- [ ] **011/characters/081-aladdin-on-the-edge-of-adventure.test.ts**
  - Card: `011/characters/081-aladdin-on-the-edge-of-adventure.ts`
    - `should trigger when an action is played`
    - `should keep Evasive during opponent's turn`
    - `should lose Evasive at the start of your next turn`
    - `should prevent non-Evasive characters from challenging Aladdin`
    - `should trigger each time an action is played`
    - `should have correct ability structure`

- [ ] **011/characters/082-mushu-sneaky-dragon.test.ts**
  - Card: `011/characters/082-mushu-sneaky-dragon.ts`
    - `deals 2 damage to chosen character when played`
    - `can target own characters`
    - `can target opposing characters`
    - `can banish character if damage exceeds willpower`
    - `triggers only when Mushu is played, not when already in play`
    - `plays successfully even with no valid targets`
    - `deals exactly 2 damage`

- [ ] **011/characters/083-goofy-ghost-of-jacob-marley.test.ts**
  - Card: `011/characters/083-goofy-ghost-of-jacob-marley.ts`
    - `One card under`
    - `Two cards under`

- [ ] **011/characters/084-copper-champion-of-the-forest.test.ts**
  - Card: `011/characters/084-copper-champion-of-the-forest.ts`
    - `can be played on top of a character named Copper for 3 ink`
    - `cannot shift onto a character not named Copper`
    - `gives +1 lore to characters with Evasive when questing`
    - `gives +1 lore to multiple characters with Evasive`
    - `does not give +1 lore to characters without Evasive`
    - `lore bonus lasts only for the turn`
    - `Copper itself gets +1 lore if it has Evasive`

- [ ] **011/characters/085-copper-hound-pup.test.ts**
  - Card: `011/characters/085-copper-hound-pup.ts`
    - `should reveal chosen player's hand when played`
    - `should work when opponent has empty hand`
    - `should reveal own hand when chosen`

- [ ] **011/characters/086-vixey-forest-friend.test.ts**
  - Card: `011/characters/086-vixey-forest-friend.ts`
    - `costs 1 less when Tod is in play`
    - `costs full price when Tod is not in play`
    - `can be played at full cost without Tod`
    - `has Evasive keyword`

- [ ] **011/characters/088-minnie-mouse-mrs-cratchit.test.ts**
  - Card: `011/characters/088-minnie-mouse-mrs-cratchit.ts`
    - `should have Ward ability`
    - `should allow putting top card of deck under a character with Boost and draw a card when played`
    - `should be optional - can decline the trigger and not draw a card`
    - `should NOT trigger if there are no characters or locations with Boost in play`

- [ ] **011/characters/089-white-rabbit-late-again.test.ts**
  - Card: `011/characters/089-white-rabbit-late-again.ts`
    - `should reduce cost by 1 on first turn if not first player`
    - `should not be playable without enough ink even with UNDERDOG`
    - `should not reduce cost if first player (even on first turn)`
    - `should require full cost if first player`
    - `should have Evasive (Only characters with Evasive can challenge this character)`

- [ ] **011/characters/090-tod-playful-kit.test.ts**
  - Card: `011/characters/090-tod-playful-kit.ts`
    - `Should trigger when Tod quests`
    - `Should allow choosing to gain 1 lore`
    - `Should allow choosing to give chosen character Evasive until next turn`
    - `Should only allow targeting own characters for Evasive`
    - `Should apply Evasive until start of next turn`
    - `Should be able to target Tod himself with Evasive`

- [ ] **011/characters/091-mickey-mouse-snowboard-ace.test.ts**
  - Card: `011/characters/091-mickey-mouse-snowboard-ace.ts`
    - `SLIPPERY SLOPE - Should make each opponent discard a card when played`
    - `SLIPPERY SLOPE - Should trigger when Mickey is put into inkwell by Let It Go (leaves play)`

- [ ] **011/characters/092-tod-knows-all-the-tricks.test.ts**
  - Card: `011/characters/092-tod-knows-all-the-tricks.ts`
    - `should ready Tod when targeted by an action`
    - `should allow triggering twice per turn`
    - `should not trigger a third time per turn`
    - `should not count declined triggers toward the per-turn limit`
    - `should ready Tod when targeted by an item ability`
    - `should allow triggering twice when item ability targets Tod twice (different items)`
    - `should ready Tod when targeted by Darkwing's Chair Set`
    - `should ready Tod when targeted by Mother Will Protect You (played directly)`
    - `should ready Tod when targeted by Mother Will Protect You (sung by a character)`
    - `should only trigger once when targeted by Education Or Elimination mode 1`
    - `should ready twice per turn`

- [ ] **011/characters/093-donald-duck-fred-honeywell.test.ts**
  - Card: `011/characters/093-donald-duck-fred-honeywell.ts`
    - `should draw 1 card when a character with 1 card under is banished during opponent's turn`
    - `should draw 2 cards when a character with 2 cards under is banished during opponent's turn`
    - `should NOT draw cards when a character with no cards under is banished`
    - `should NOT trigger during your own turn`
    - `should NOT trigger when Donald himself is banished`
    - `should put the top card of the deck under the character`
    - `should NOT trigger when you use the Boost ability of a location`
