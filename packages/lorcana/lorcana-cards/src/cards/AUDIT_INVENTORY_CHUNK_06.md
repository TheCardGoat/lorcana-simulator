# Card Test Inventory

Legacy implementation base directory: /Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards
New implementation base directory: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards


**Chunk 6 of 18** | [← Previous](AUDIT_INVENTORY_CHUNK_05.md) | [Next →](AUDIT_INVENTORY_CHUNK_07.md)


- [ ] **004/characters/184-luisa-madrigal-rock-of-the-family.test.ts**
  - Card: `004/characters/184-luisa-madrigal-rock-of-the-family.ts`
    - `Alone`
    - `Not alone`

- [ ] **004/characters/185-magic-broom-aerial-cleaner.test.ts**
  - Card: `004/characters/185-magic-broom-aerial-cleaner.ts`
    - `**WINGED FOR A DAY** During your turn, this character gains **Evasive.** _(They can challenge characters with Evasive.)_`

- [ ] **004/characters/186-magic-broom-brigade-commander.test.ts**
  - Card: `004/characters/186-magic-broom-brigade-commander.ts`
    - `**Resist** +1 _(Damage dealt to this character is reduced by 1.)_`
    - `**ARMY OF BROOMS** This character gets +2 {S} for each other Broom character you have in play.`

- [ ] **004/characters/187-mickey-mouse-playful-sorcerer.test.ts**
  - Card: `004/characters/187-mickey-mouse-playful-sorcerer.ts`
    - `**SWEEP AWAY** When you play this character, deal damage to chosen character equal to the number of Broom characters you have in play.`
    - `**SWEEP AWAY** When you play this character, deal damage to chosen character equal to the number of Broom characters you have in play.`

- [ ] **004/characters/188-mickey-mouse-standard-bearer.test.ts**
  - Card: `004/characters/188-mickey-mouse-standard-bearer.ts`
    - `**BE STRONG** When you play this character, chosen character gains **Challenger** +2 this turn. _(They get +2 {S} while challenging.)_`

- [ ] **004/characters/190-philoctetes-no-nonsense-instructor.test.ts**
  - Card: `004/characters/190-philoctetes-no-nonsense-instructor.ts`
    - `**YOU GOTTA STAY FOCUSED** Your Hero characters gain **Challenger** +1. _(They get +1 {S} while challenging.)`
    - `**SHAMELESS PROMOTER** Whenever you play a Hero character, gain 1 lore.`

- [ ] **004/characters/191-piglet-sturdy-swordsman.test.ts**
  - Card: `004/characters/191-piglet-sturdy-swordsman.ts`
    - `**Resist +1** _(Damage dealt to this character is reduced by 1.)_**NOT SO SMALL ANYMORE** While you have no cards in your hand, this character can challenge ready characters.`

- [ ] **004/characters/192-rajah-royal-protector.test.ts**
  - Card: `004/characters/192-rajah-royal-protector.ts`
    - `**STEADY GAZE** While you have no cards in your hand, characters with cost 4 or less can't challenge this character.`

- [ ] **004/characters/193-raya-unstoppable-force.test.ts**
  - Card: `004/characters/193-raya-unstoppable-force.ts`
    - `**Challenger +2** _(While challenging, this character gets +2 {S}.)_**Resist +2** _(Damage dealt to this character is reduced by 2.)_**YOU GAVE IT YOUR BEST** During your turn, whenever this character banishes another character in a challenge, you may draw a card.`

- [ ] **004/characters/194-yao-imperial-soldier.test.ts**
  - Card: `004/characters/194-yao-imperial-soldier.ts`
    - `**Challenger +2** _(While challenging, this character gets +2 {S}.)_`

- [ ] **004/characters/223-yen-sid-powerful-sorcerer.test.ts**
  - Card: `MISSING`
    - `**TIMELY INTERVENTION** When you play this character, if you have a character named Magic Broom in play, you may draw a card.`
    - `**ARCANE STUDY** While you have 2 or more Broom characters in play, this character gets +2 {L}.`

- [ ] **004/characters/224-mulan-elite-archer.test.ts**
  - Card: `004/characters/224-mulan-elite-archer.ts`
    - `**Shift** 5 _(You may pay 5 {I} to play this on top of one of your characters named Mulan.)_`
    - `**STRAIGHT SHOOTER** When you play this character, if you used **Shift** to play her, she gets +3 {S} this turn.`
    - `During your turn`
    - `During your turn, does NOT trigger on locations`
    - `During opponent's turn`
    - `defender cannot be chosen for Triple Shot (only other characters)`

### items (18 tests)

- [ ] **004/items/031-miracle-candle.test.ts**
  - Card: `004/items/031-miracle-candle.ts`
    - `**ABUELA'S GIFT** Banish this item − If you have 3 or more characters in play, gain 2 lore and remove up to 2 damage from chosen location.`
    - `Under 3 characters in play`

- [ ] **004/items/032-record-player.test.ts**
  - Card: `004/items/032-record-player.ts`
    - `**LOOK AT THIS!** Whenever you play a song, chosen character gets -2 {S} until the start of your next turn.`
    - `**HIT PARADE** Your characters named Stitch count as having +1 cost to sing songs.`

- [ ] **004/items/064-mystical-rose.test.ts**
  - Card: `004/items/064-mystical-rose.ts`
    - `**DISPEL THE ENTANGLEMENT** Banish this item − Chosen character named Beast gets +2 {L} this turn. If you have a character named Belle in play, move up to 3 damage counters from chosen character to chosen opposing character.`

- [ ] **004/items/065-rose-lantern.test.ts**
  - Card: `004/items/065-rose-lantern.ts`
    - `MYSTERICAL PETALS  {E}, 2 {I} − Move 1 damage counter from chosen character to chosen opposing character.`

- [ ] **004/items/066-triton-s-trident.test.ts**
  - Card: `MISSING`
    - `**SYMBOL OF POWER** Banish this item — Chosen character gets +1 {S} this turn for each card in your hand.`

- [ ] **004/items/098-hidden-inkcaster.test.ts**
  - Card: `004/items/098-hidden-inkcaster.ts`
    - `should allow inking cards without inkwell symbol from hand when Hidden Inkcaster is in play`
    - `should NOT affect cards in discard (only hand)`
    - `should NOT allow inking cards without inkwell when Hidden Inkcaster is NOT in play`
    - `should still allow normal inking of cards with inkwell symbol`
    - `should NOT allow inking cards without inkwell from discard even with both cards in play`

- [ ] **004/items/099-signed-contract.test.ts**
  - Card: `004/items/099-signed-contract.ts`
    - `**FINE PRINT** Whenever an opponent plays a song, you may draw a card.`

- [ ] **004/items/100-vision-slab.test.ts**
  - Card: `004/items/100-vision-slab.ts`
    - `Prevent Removing Damage`
    - `Prevent Moving Damage`
    - `Applies to both players' cards`
    - `Gives 1 lore if opponent has damaged character`

- [ ] **004/items/131-imperial-proclamation.test.ts**
  - Card: `004/items/131-imperial-proclamation.ts`
    - `**CALL TO THE FRONT** Whenever one of your characters challenges another character, you pay 1 {I} less for the next character you play this turn.`

- [ ] **004/items/132-medallion-weights.test.ts**
  - Card: `004/items/132-medallion-weights.ts`
    - `**DISCIPLINE AND STRENGTH** {E}, 2 {I} - Chosen character gets +2 {S} this turn. Whenever they challenge another character this turn, you may draw a card.`

- [ ] **004/items/133-the-plank.test.ts**
  - Card: `004/items/133-the-plank.ts`
    - `**WALK!** 2 {I}, Banish this item: Banish chosen Hero character.`
    - `**WALK!** 2 {I}, Banish this item: Ready chosen Villain character. They can't quest for the rest of this turn.`

- [ ] **004/items/134-vitalisphere.test.ts**
  - Card: `004/items/134-vitalisphere.ts`
    - `**EXTRACT OF RUBY** 1 {I}, Banish this item - Chosen chracter gains **Rush** and gets +2 {S} this turn. _(They can challenge the turn they're played.)_`

- [ ] **004/items/166-field-of-ice.test.ts**
  - Card: `004/items/166-field-of-ice.ts`
    - `**ICY DEFENSE** Whenever you play a character, they gain **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_`

- [ ] **004/items/167-great-stone-dragon.test.ts**
  - Card: `004/items/167-great-stone-dragon.ts`
    - `should enter play exerted`
    - `Put a character card from your discard into your inkwell facedown and exerted.`

- [ ] **004/items/168-ice-block.test.ts**
  - Card: `004/items/168-ice-block.ts`
    - `**CHILLY LABOR** {E} − Chosen character gets -1 {S} this turn.`

- [ ] **004/items/200-fortisphere.test.ts**
  - Card: `004/items/200-fortisphere.ts`
    - `should allow the player to draw a card when played`
    - `should allow the player to banish the item and give a character Bodyguard`

- [ ] **004/items/201-imperial-bow.test.ts**
  - Card: `004/items/201-imperial-bow.ts`
    - `**WITHIN RANGE** {E}, 1 {I} − Chosen Hero character gains **Challenger** +2 and **Evasive** this turn. _(They get +2 {S} while challenging. They can challenge characters with Evasive.)_`

- [ ] **004/items/202-rls-legacy-s-cannon.test.ts**
  - Card: `MISSING`
    - `**BA-BOOM!** {E}, 2 {I}, Discard a card - Deal 2 damage to chosen character or location.`

### locations (13 tests)

- [ ] **004/locations/033-atlantica-concert-hall.test.ts**
  - Card: `MISSING`
    - `Underwater Acoustics - Characters count as having +2 cost to sing songs while here.`

- [ ] **004/locations/034-the-underworld-river-styx.test.ts**
  - Card: `MISSING`
    - `**SAVE A SOUL** Whenever a character quests while here, you may pay 3 {I} to return a character card from your discard to your hand.`

- [ ] **004/locations/067-casa-madrigal-casita.test.ts**
  - Card: `MISSING`
    - `TODO`

- [ ] **004/locations/068-ursula-s-lair-eye-of-the-storm.test.ts**
  - Card: `MISSING`
    - `TODO`

- [ ] **004/locations/101-hidden-cove-tranquil-haven.test.ts**
  - Card: `004/locations/101-hidden-cove-tranquil-haven.ts`
    - `**REVITALIZING WATERS** Characters get +1 {S} and +1 {W}️ while here.`
    - `Doesn't give the bonus to itself`

- [ ] **004/locations/102-ursula-s-garden-full-of-the-unfortunate.test.ts**
  - Card: `MISSING`
    - `**Abandon Hope** While you have an exerted character here, opposing characters get -1 {L}.`

- [ ] **004/locations/135-snuggly-duckling-disreputable-pub.test.ts**
  - Card: `004/locations/135-snuggly-duckling-disreputable-pub.ts`
    - `should not gain lore when a character with 2 {S} challenges another character`
    - `should gain 1 lore when a character with 3 {S} challenges another character`
    - `should gain 3 lore when a character with 6 {S} challenges another character`

- [ ] **004/locations/136-training-grounds-impossible-pillar.test.ts**
  - Card: `004/locations/136-training-grounds-impossible-pillar.ts`
    - `TODO`

- [ ] **004/locations/169-ariel-s-grotto-a-secret-place.test.ts**
  - Card: `MISSING`
    - `(no items) While you have 3 or more items in play, this location gets +2 {L}.`
    - `(3 items) While you have 3 or more items in play, this location gets +2 {L}.`

- [ ] **004/locations/170-winter-camp-medical-tent.test.ts**
  - Card: `004/locations/170-winter-camp-medical-tent.ts`
    - `TODO`

- [ ] **004/locations/203-the-wall-border-fortress.test.ts**
  - Card: `004/locations/203-the-wall-border-fortress.ts`
    - `TODO`

- [ ] **004/locations/204-thebes-the-big-olive.test.ts**
  - Card: `004/locations/204-thebes-the-big-olive.ts`
    - `During your turn, whenever a character banishes another character in a challenge while here, you gain 2 lore.`
    - `Doesnt trigger when characters are not in the location`

- [ ] **004/locations/216-snuggly-duckling-disreputable-pub.test.ts**
  - Card: `MISSING`
    - `TODO`

## Set 005

### actions (32 tests)

- [ ] **005/actions/025-try-everything.test.ts**
  - Card: `005/actions/025-try-everything.ts`
    - `_(A character with cost 4 or more can {E} to sing this song for free.)_`
    - `Remove up to 3 damage from chosen character and ready them. They can’t quest or challenge for the rest of this turn.`

- [ ] **005/actions/026-healing-touch.test.ts**
  - Card: `005/actions/026-healing-touch.ts`
    - `Remove up to 4 damage from chosen character. Draw a card.`

- [ ] **005/actions/027-revive.test.ts**
  - Card: `005/actions/027-revive.ts`
    - `Play a character card with cost 5 or less from your discard for free.`

- [ ] **005/actions/028-blast-from-your-past.test.ts**
  - Card: `005/actions/028-blast-from-your-past.ts`
    - `Name a card. Return all character cards with that name from your discard to your hand.`

- [ ] **005/actions/029-invited-to-the-ball-action.test.ts**
  - Card: `005/actions/029-invited-to-the-ball-action.ts`
    - `Reveal the top 2 cards of your deck. Put revealed character cards into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **005/actions/029-invited-to-the-ball.test.ts**
  - Card: `MISSING`

- [ ] **005/actions/059-hypnotic-strength.test.ts**
  - Card: `005/actions/059-hypnotic-strength.ts`
    - `Draw a card. Chosen character gains **Challenger** +2 this turn. _(They get +2 {S} while challenging.)_`

- [ ] **005/actions/060-finders-keepers.test.ts**
  - Card: `005/actions/060-finders-keepers.ts`
    - `Draw 3 cards.`

- [ ] **005/actions/061-we-know-the-way.test.ts**
  - Card: `005/actions/061-we-know-the-way.ts`
    - `Revealed card has the same name as the chosen card`
    - `Revealed card DOES NOT have the same name as the chosen card`

- [ ] **005/actions/062-gathering-knowledge-and-wisdom.test.ts**
  - Card: `005/actions/062-gathering-knowledge-and-wisdom.ts`
    - `Gain 2 lore.`

- [ ] **005/actions/063-magical-aid.test.ts**
  - Card: `005/actions/063-magical-aid.ts`
    - `Chosen character gains **Challenger** +3 and When this character is banished in a challenge, return this card to your hand this turn. _(They get +3 {S} while challenging.)_`

- [ ] **005/actions/094-hypnotic-deduction.test.ts**
  - Card: `005/actions/094-hypnotic-deduction.ts`
    - `Draw 3 cards, then put 2 cards from your hand on the top of your deck in any order.`

- [ ] **005/actions/095-night-howler-rage.test.ts**
  - Card: `005/actions/095-night-howler-rage.ts`
    - `Draw a card. Chosen character gains **Reckless** during their next turn._(They can't quest and must challenge if able.)_`

- [ ] **005/actions/096-you-re-welcome.test.ts**
  - Card: `MISSING`
    - `Shuffling your own`
    - `Shuffling opponent's cards`
    - `Shuffles before drawing`

- [ ] **005/actions/097-remember-who-you-are.test.ts**
  - Card: `005/actions/097-remember-who-you-are.ts`
    - `If chosen opponent has more cards in their hand than you, draw cards until you have the same number.`

- [ ] **005/actions/127-break-free.test.ts**
  - Card: `005/actions/127-break-free.ts`
    - `Deal 1 damage to chosen character of yours. They gain **Rush** and get +1 {S} this turn. _(They can challenge the turn they're played.)_`

- [ ] **005/actions/128-evil-comes-prepared.test.ts**
  - Card: `005/actions/128-evil-comes-prepared.ts`
    - `Ready chosen character of yours. They can’t quest for the rest of this turn. If a Villain character is chosen, gain 1 lore.`
    - `If a Villain character is chosen, gain 1 lore.`
    - `If a Villain character not chosen but in play, gain 0 lore.`

- [ ] **005/actions/129-don-t-let-the-frostbite-bite.test.ts**
  - Card: `MISSING`
    - `_(A character with cost 7 or more can  {E} to sing this song for free.)_`
    - `Ready all your characters. They can’t quest for the rest of this turn.`

- [ ] **005/actions/130-glimmer-vs-glimmer.test.ts**
  - Card: `005/actions/130-glimmer-vs-glimmer.ts`
    - `Banish chosen character of yours to banish chosen character.`

- [ ] **005/actions/131-who-s-with-me-.test.ts**
  - Card: `MISSING`
    - `Your characters get +2 {S} this turn.`
    - `Whenever one of your characters with **Reckless** challenges another character this turn, gain 2 lore.`

- [ ] **005/actions/160-vision-of-the-future.test.ts**
  - Card: `005/actions/160-vision-of-the-future.ts`
    - `Look at the top 5 cards of your deck. Put one into your hand and the rest on the bottom of your deck in any order. - Take one card`

- [ ] **005/actions/161-royal-tantrum.test.ts**
  - Card: `005/actions/161-royal-tantrum.ts`
    - `Banishes just one item`
    - `Banishing more than one, but not all`

- [ ] **005/actions/162-ever-as-before.test.ts**
  - Card: `005/actions/162-ever-as-before.ts`
    - `_(A character with cost 2 or more can {E} to sing this song for free.)_<br/>Remove up to 2 damage from any number of chosen characters.`

- [ ] **005/actions/163-hide-away.test.ts**
  - Card: `005/actions/163-hide-away.ts`
    - `Put chosen item or location into its player’s inkwell facedown and exerted.`

- [ ] **005/actions/164-all-funned-out.test.ts**
  - Card: `005/actions/164-all-funned-out.ts`
    - `Put chosen character of yours into your inkwell facedown and exerted.`

- [ ] **005/actions/196-tug-of-war.test.ts**
  - Card: `MISSING`
    - `• Deal 1 damage to each opposing character without **Evasive**.`
    - `• Deal 3 damage to each opposing character with **Evasive**.`

- [ ] **005/actions/197-when-will-my-life-begin-.test.ts**
  - Card: `MISSING`
    - `Chosen character can’t challenge during their next turn. Draw a card.`
    - `draws a card when played with no characters in play`

- [ ] **005/actions/198-duck-for-cover-.test.ts**
  - Card: `MISSING`
    - `Chosen character gains **Resist** +1 and **Evasive** this turn. _(Damage dealt to them is reduced by 1. They can challenge characters with Evasive.)_`

- [ ] **005/actions/198-duck-for-cover.test.ts**
  - Card: `005/actions/198-duck-for-cover.ts`
    - `Chosen character gains **Resist** +1 and **Evasive** this turn. _(Damage dealt to them is reduced by 1. They can challenge characters with Evasive.)_`

- [ ] **005/actions/199-food-fight-.test.ts**
  - Card: `MISSING`

- [ ] **005/actions/199-food-fight.test.ts**
  - Card: `005/actions/199-food-fight.ts`
    - `Your characters gain {E}, 1 {I} – Deal 1 damage to chosen character this turn.`

- [ ] **005/actions/199-tug-of-war.test.ts**
  - Card: `MISSING`
    - `Choose one: Deal 1 damage to each opposing character without **Evasive**. Deal 3 damage to each opposing character with **Evasive**.`

### characters (125 tests)

- [ ] **005/characters/001-koda-talkative-cub.test.ts**
  - Card: `005/characters/001-koda-talkative-cub.ts`
    - `**TELL EVERYBODY** During opponents’ turns, you can’t lose lore.`

- [ ] **005/characters/003-prince-naveen-ukulele-player.test.ts**
  - Card: `005/characters/003-prince-naveen-ukulele-player.ts`
    - `**IT’S BEAUTIFUL NO?** When you play this character, you may play a song with cost 6 or less for free.`
    - `Can't play if there's play restrictions`

- [ ] **005/characters/004-rutt-northern-moose.test.ts**
  - Card: `005/characters/004-rutt-northern-moose.ts`

- [ ] **005/characters/005-kenai-big-brother.test.ts**
  - Card: `005/characters/005-kenai-big-brother.ts`
    - `**BROTHERS FOREVER** While this character is exerted, your characters named Koda can’t be challenged.`
    - `**BROTHERS FOREVER** While this character is exerted, your characters named Koda can’t be challenged. But if Kenai will be banished, koda can be challenged.`

- [ ] **005/characters/008-lilo-junior-cake-decorator.test.ts**
  - Card: `005/characters/008-lilo-junior-cake-decorator.ts`

- [ ] **005/characters/009-vanellope-von-schweetz-candy-mechanic.test.ts**
  - Card: `005/characters/009-vanellope-von-schweetz-candy-mechanic.ts`
    - `**YOU’VE GOT TO PAY TO PLAY** Whenever this character quests, chosen opposing character gets -1 {S} until the start of your next turn.`

- [ ] **005/characters/010-fix-it-felix-jr--trusty-builder.test.ts**
  - Card: `MISSING`

- [ ] **005/characters/011-gazelle-pop-star.test.ts**
  - Card: `005/characters/011-gazelle-pop-star.ts`

- [ ] **005/characters/012-fix-it-felix-jr--niceland-steward.test.ts**
  - Card: `MISSING`
    - `**BUILDING TOGETHER** Your locations get +2 {W}️.`

- [ ] **005/characters/013-kristoff-reindeer-keeper.test.ts**
  - Card: `005/characters/013-kristoff-reindeer-keeper.ts`
    - `Should pay 'N' less 'n' being the number os songs on discard`
    - `Should pay full cost if no song is on the discard`
    - `Does NOT reduce cost of the next card played`

- [ ] **005/characters/014-mirabel-madrigal-family-gatherer.test.ts**
  - Card: `005/characters/014-mirabel-madrigal-family-gatherer.ts`
    - `Can't be played with fewer than 5 characters in play`
    - `Can be played with 5 or more characters in play`

- [ ] **005/characters/015-minnie-mouse-drum-major.test.ts**
  - Card: `005/characters/015-minnie-mouse-drum-major.ts`
    - `**PARADE ORDER** When you play this character, if you used **Shift** to play her, you may search your deck for a character card and reveal that card to all players. Shuffle your deck and put that card on top of it.`

- [ ] **005/characters/016-daisy-duck-donald-s-date.test.ts**
  - Card: `MISSING`
    - `reveals a character card and puts it into the hand`
    - `reveals a NON character card and puts it into the hand`
    - `targets characters with ward from top of the deck`

- [ ] **005/characters/017-fix-it-felix-jr--delighted-sightseer.test.ts**
  - Card: `MISSING`
    - `**OH, MY LAND!** When you play this character, if you have a location in play, draw a card.`
    - `Doest draw a card if there is no location in play`

- [ ] **005/characters/019-vanellope-von-schweetz-sugar-rush-princess.test.ts**
  - Card: `005/characters/019-vanellope-von-schweetz-sugar-rush-princess.ts`
    - `Shift`
    - `**I HEARBY DECREE** Whenever you play another Princess character, all opposing characters get -1 {S} until the start of your next turn.`
    - `Triggers when playing Ariel - Spectacular Singer (another Princess)`
    - `Triggers when playing another copy of Vanellope von Schweetz - Sugar Rush Princess`
    - `Triggers when Shifting another Princess`

- [ ] **005/characters/020-alan-a-dale-rockin-rooster.test.ts**
  - Card: `MISSING`
    - `**FAN FAVORITE** Whenever you play a song, gain 1 lore.`

- [ ] **005/characters/021-wreck-it-ralph-admiral-underpants.test.ts**
  - Card: `MISSING`
    - `Returning a princess`
    - `Returning a non-princess character when a princess is also in discard`

- [ ] **005/characters/022-maid-marian-lady-of-the-lists.test.ts**
  - Card: `005/characters/022-maid-marian-lady-of-the-lists.ts`
    - `IF THE LADY WANTS IT`

- [ ] **005/characters/022-maid-marian-mistress-of-the-range.test.ts**
  - Card: `MISSING`
    - `**IF IT PLEASES HTE LADY** When you play this character, opposing character of your choice gets -5 {S} until the start of your next turn.`

- [ ] **005/characters/023-sven-reindeer-steed.test.ts**
  - Card: `005/characters/023-sven-reindeer-steed.ts`
    - `**REINDEER GAMES** When you play this character, you may ready chosen character. They can’t quest or challenge for the rest of this turn.`

- [ ] **005/characters/024-minnie-mouse-compassionate-friend.test.ts**
  - Card: `005/characters/024-minnie-mouse-compassionate-friend.ts`
    - `**PATCH THEM UP** Whenever this character quests, you may remove up to 2 damage from chosen character.`

- [ ] **005/characters/035-maleficent-fearsome-queen.test.ts**
  - Card: `005/characters/035-maleficent-fearsome-queen.ts`
    - `**EVERYONE LISTEN** When you play this character, for each character named Maleficent you have in play, return chosen opposing character, item, or location of cost 3 or less to their player's hand.`

- [ ] **005/characters/036-the-nokk-mythical-spirit.test.ts**
  - Card: `005/characters/036-the-nokk-mythical-spirit.ts`
    - `**TURNING TIDES** When you play this character, you may move up to 2 damage counters from chosen character to chosen opposing character.`

- [ ] **005/characters/037-cogsworth-illuminary-watchman.test.ts**
  - Card: `005/characters/037-cogsworth-illuminary-watchman.ts`
    - `**TIME TO MOVE IT!** When you play this character, chosen character gains **Rush** this turn. _(They can challenge the turn they’re played.)_`

- [ ] **005/characters/038-merlin-turtle.test.ts**
  - Card: `005/characters/038-merlin-turtle.ts`
    - `**GIVE ME TIME TO THINK** When you play this character and when he leaves play, look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.`
