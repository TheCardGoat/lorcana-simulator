# Card Test Inventory

Legacy implementation base directory: /Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards
New implementation base directory: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards

**Chunk 8 of 18** | [← Previous](AUDIT_INVENTORY_CHUNK_07.md) | [Next →](AUDIT_INVENTORY_CHUNK_09.md)

- [ ] **005/items/030-healing-decanter-item.test.ts**
  - Card: `005/items/030-healing-decanter-item.ts`
    - `**RENEWING ESSENCE** {E} – Remove up to 2 damage from chosen character.`

- [ ] **005/items/030-healing-decanter.test.ts**
  - Card: `MISSING`
    - `RENEWING ESSENCE`

- [ ] **005/items/031-queen-s-sensor-core-item.test.ts**
  - Card: `MISSING`
    - `Should gain 1 lore if you have a Princess or Queen character in play`
    - `Should not gain 1 lore if you do not have a Princess or Queen character in play`
    - `**ROYAL SEARCH** {E}, 2 {I} – Reveal the top card of your deck. If it’s a Princess or Queen character card, you may put it into your hand. Otherwise, put it on the top of your deck.`

- [ ] **005/items/031-queen-s-sensor-core.test.ts**
  - Card: `MISSING`
    - `SYMBOL OF NOBILITY`
    - `Royal Search`

- [ ] **005/items/032-amber-chromicon-item.test.ts**
  - Card: `005/items/032-amber-chromicon-item.ts`
    - `**AMBER LIGHT** {E} – Remove up to 1 damage from each of your characters.`

- [ ] **005/items/032-amber-chromicon.test.ts**
  - Card: `MISSING`
    - `AMBER LIGHT`

- [ ] **005/items/064-retrosphere.test.ts**
  - Card: `005/items/064-retrosphere.ts`
    - `**EXTRACT OF AMETHYST** 2 {I}, Banish this item – Return chosen character, item, or location with cost 3 or less to their player’s hand.`

- [ ] **005/items/065-half-hexwell-crown.test.ts**
  - Card: `005/items/065-half-hexwell-crown.ts`
    - `**AN UNEXPECTED FIND**, {E}, 2 {I} — Draw a card.`
    - `**A PERILOUS POWER** {E}, 2 {I}, Discard a card – Exert chosen character.`

- [ ] **005/items/066-amethyst-chromicon.test.ts**
  - Card: `005/items/066-amethyst-chromicon.ts`
    - `**AMETHYST LIGHT** {E}− Each player may draw a card.`

- [ ] **005/items/098-prince-john-s-mirror.test.ts**
  - Card: `MISSING`
    - `**YOU LOOK REGAL** If you have a character named Prince John in play, you pay 1 {I} less to play this item.`
    - `Opponent owns the mirror`
    - `Player owns the mirror`

- [ ] **005/items/099-obscurosphere.test.ts**
  - Card: `005/items/099-obscurosphere.ts`
    - `**EXTRACT OF EMERALD** 2 {I}, Banish this item – Your characters gain **Ward** until the start of your next turn. _(Opponents can't choose them except to challenge.)_`

- [ ] **005/items/100-emerald-chromicon.test.ts**
  - Card: `005/items/100-emerald-chromicon.ts`
    - `Opponent attacking`
    - `You Attacking`
    - `Should NOT trigger when returning to hand`
    - `Should NOT trigger when card is put at the bottom`
    - `Mr Smee Interaction`
    - `Adds three layers onto the stack when removed by Sisu`

- [ ] **005/items/132-potion-of-might.test.ts**
  - Card: `005/items/132-potion-of-might.ts`
    - `**VILE CONCOCTION** 1 {I} Banish this item – Chosen character gets +3 {S} this turn. If a Villain character is chosen, they get +4 {S} instead.`

- [ ] **005/items/133-the-sword-released.test.ts**
  - Card: `005/items/133-the-sword-released.ts`
    - `**POWER APPOINTED** At the start of your turn, if you have a character in play with more {S} than each opposing character in play, each opponent loses 1 lore and you gain lore equal to the lore lost.`

- [ ] **005/items/134-ruby-chromicon.test.ts**
  - Card: `005/items/134-ruby-chromicon.ts`
    - `**RUBY LIGHT** {E} − Chosen character gets +1 {S} this turn.`

- [ ] **005/items/165-medal-of-heroes.test.ts**
  - Card: `005/items/165-medal-of-heroes.ts`
    - `**CONGRATULATIONS, SOLDIER**{E}, 2 {I}, Banish this item − Chosen character of yours gets +2 {L} this turn.`

- [ ] **005/items/166-basil-s-magnifying-glass.test.ts**
  - Card: `MISSING`
    - `FIND WHAT’S HIDDEN`

- [ ] **005/items/167-merlin-s-carpetbag.test.ts**
  - Card: `MISSING`
    - `**Hockety Pockety**{E}, 1 {I} – Return an item card from your discard to your hand.`

- [ ] **005/items/168-sapphire-chromicon.test.ts**
  - Card: `005/items/168-sapphire-chromicon.ts`
    - `**POWERING UP** This item enters play exerted.`
    - `**SAPPHIRE LIGHT** {E}, 2 {I}, Banish one of your items – Gain 2 lore.`

- [ ] **005/items/200-shield-of-arendelle.test.ts**
  - Card: `005/items/200-shield-of-arendelle.ts`
    - `**DEFLECT** Banish this item – Chosen character gains **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_`

- [ ] **005/items/201-plate-armor.test.ts**
  - Card: `005/items/201-plate-armor.ts`
    - `**WELL CRAFTED** {E} – Chosen character gains **Resist** +2 until the start of your next turn. _(Damage dealt to them is reduced by 2.)_`

- [ ] **005/items/202-steel-chromicon.test.ts**
  - Card: `005/items/202-steel-chromicon.ts`
    - `**STEEL LIGHT** {E} – Deal 1 damage to chosen character.`

### locations (12 tests)

- [ ] **005/locations/033-rapunzel-s-tower-secluded-prison.test.ts**
  - Card: `MISSING`
    - `**SAFE AND SOUND** Characters get +3 {W}️ while here.`

- [ ] **005/locations/034-pride-lands-jungle-oasis.test.ts**
  - Card: `005/locations/034-pride-lands-jungle-oasis.ts`
    - `Shouldn't be activated if there's less than 3 chars`
    - `Activates with 3`
    - `Plays a character from discard after banishing the location`

- [ ] **005/locations/067-elsa-s-ice-palace-place-of-solitude.test.ts**
  - Card: `MISSING`
    - `**ETERNAL WINTER** When you play this location, choose an exerted character. While this location is in play, that character can't ready at the start of their turn.`

- [ ] **005/locations/068-the-library-a-gift-for-belle.test.ts**
  - Card: `005/locations/068-the-library-a-gift-for-belle.ts`
    - `Removal`
    - `Chernabog's Followers`
    - `Magic Broom - Illuminary Keeper`
    - `Moving characters to The Library costs 1 ink (Grandmother Willow doesn't reduce movement costs)`

- [ ] **005/locations/101-sherwood-forest-outlaw-hideaway.test.ts**
  - Card: `005/locations/101-sherwood-forest-outlaw-hideaway.ts`
    - `**FOREST HOME** Your characters named Robin Hood may move here for free.`
    - `{E} – Deal 2 damage to chosen damaged character.`
    - `Characters gain **Ward** _(Opponents can't choose them except to challenge.)_`

- [ ] **005/locations/102-tropical-rainforest-jaguar-lair.test.ts**
  - Card: `005/locations/102-tropical-rainforest-jaguar-lair.ts`
    - `**SNACK TIME** Opposing damaged characters gain **Reckless**. _(They can’t quest and must challenge if able.)_`

- [ ] **005/locations/135-sugar-rush-speedway-starting-line.test.ts**
  - Card: `005/locations/135-sugar-rush-speedway-starting-line.ts`
    - `**ON YOUR MARKS!** Once per turn, you may {E} chosen character here and deal them 1 damage to move them to another location for free.`
    - `Character dying while moving from starting line`

- [ ] **005/locations/136-ratigan-s-party-seedy-back-room.test.ts**
  - Card: `MISSING`
    - `Should not get +2 lore if the character on location is not damaged.`
    - `Should give +2 lore to location, and only the location.`

- [ ] **005/locations/169-the-great-illuminary-radiant-ballroom.test.ts**
  - Card: `005/locations/169-the-great-illuminary-radiant-ballroom.ts`
    - `should give characters with **Support** +1 {L} and +2 {W}️`

- [ ] **005/locations/170-merlin-s-cottage-the-wizard-s-home.test.ts**
  - Card: `MISSING`
    - `**KNOWLEDGE IS POWER** Each player plays with the top card of their deck face up.`

- [ ] **005/locations/203-bad-anon-villain-support-center.test.ts**
  - Card: `MISSING`
    - `**THERE'S NO ONE I'D RATHER BE THAN ME** Villain {E}, 3 {I} - Play a character with the same name as this character for free' while here.`

- [ ] **005/locations/204-seven-dwarfs-mine-secure-fortress.test.ts**
  - Card: `005/locations/204-seven-dwarfs-mine-secure-fortress.ts`
    - `should deal 2 damage to chosen character, when moving a Knight`
    - `should deal 1 damage to chosen character, when moving a Non-Knight`
    - `Do not trigger when moving to another location`

## Set 006

### actions (27 tests)

- [ ] **006/actions/027-good-job-.test.ts**
  - Card: `MISSING`
    - `Chosen character gets +1 {L} this turn.`

- [ ] **006/actions/028-i-won-t-give-in.test.ts**
  - Card: `MISSING`
    - `(A character with cost 2 or more can {E} to sing this song for free.)`
    - `Return a character card with cost 2 or less from your discard to your hand.`

- [ ] **006/actions/029-rescue-rangers-away-.test.ts**
  - Card: `MISSING`
    - `Count the number of characters you have in play. Chosen character loses {S} equal to that number until the start of your next turn.`
    - `Count the number of characters you have in play. Chosen character loses {S} equal to that number until the start of your next turn. (zero case)`

- [ ] **006/actions/030-safe-and-sound.test.ts**
  - Card: `006/actions/030-safe-and-sound.ts`
    - `Chosen character of yours can’t be challenged until the start of your next turn.`

- [ ] **006/actions/060-a-very-merry-unbirthday.test.ts**
  - Card: `006/actions/060-a-very-merry-unbirthday.ts`
    - `(A character with cost 1 or more can {E} to sing this song for free.)`
    - `Each opponent puts the top 2 cards of their deck into their discard.`

- [ ] **006/actions/062-make-some-magic.test.ts**
  - Card: `006/actions/062-make-some-magic.ts`
    - `Move 1 damage counter from chosen character to chosen opposing character. Draw a card.`

- [ ] **006/actions/063-lose-the-way.test.ts**
  - Card: `006/actions/063-lose-the-way.ts`
    - `Exert chosen character. Then, you may choose and discard a card. If you do, the exerted character can't ready at the start of their next turn.`
    - `Reproduction: Targeting an already exerted character should still trigger the secondary effect`

- [ ] **006/actions/064-seeking-the-half-crown.test.ts**
  - Card: `006/actions/064-seeking-the-half-crown.ts`
    - `For each Sorcerer character you have in play, you pay 1 {I} less to play this action.`
    - `Draw 2 cards.`

- [ ] **006/actions/093-submit-to-my-will.test.ts**
  - Card: `006/actions/093-submit-to-my-will.ts`
    - `Each opponent discards all cards in their hand.`

- [ ] **006/actions/094-prepare-to-board-.test.ts**
  - Card: `MISSING`
    - `[Non Pirate] Chosen character gets +2 {S} this turn.`
    - `[Pirate] Chosen character gets +3 {S} this turn.`

- [ ] **006/actions/095-heffalumps-and-woozles.test.ts**
  - Card: `006/actions/095-heffalumps-and-woozles.ts`
    - `(A character with cost 2 or more can {E} to sing this song for free.)`
    - `NO OPPOSING CHARACTER IN PLAY - Chosen opposing character can't quest during their next turn. Draw a card.`
    - `WARDED OPPOSING CHARACTER IN PLAY - Chosen opposing character can't quest during their next turn. Draw a card.`

- [ ] **006/actions/096-mosquito-bite.test.ts**
  - Card: `006/actions/096-mosquito-bite.ts`
    - `Put 1 damage counter on chosen character.`

- [ ] **006/actions/097-you-came-back.test.ts**
  - Card: `006/actions/097-you-came-back.ts`
    - `Ready chosen character.`

- [ ] **006/actions/128-thievery.test.ts**
  - Card: `006/actions/128-thievery.ts`
    - `Chosen opponent loses 1 lore. Gain 1 lore.`

- [ ] **006/actions/129-show-the-way.test.ts**
  - Card: `006/actions/129-show-the-way.ts`
    - `Your characters get +2 {S} this turn.`

- [ ] **006/actions/130-the-islands-i-pulled-from-the-sea.test.ts**
  - Card: `006/actions/130-the-islands-i-pulled-from-the-sea.ts`
    - `Search your deck for a location card, reveal that card to all players, and put it into your hand. Then, shuffle your deck.`

- [ ] **006/actions/131-energy-blast.test.ts**
  - Card: `006/actions/131-energy-blast.ts`
    - `Banish chosen character. Draw a card.`

- [ ] **006/actions/162-we-could-be-immortals.test.ts**
  - Card: `006/actions/162-we-could-be-immortals.ts`
    - `_(A character with cost 4 or more can {E} to sing this song for free.)_Your Inventor characters gain **Resist** +6 this turn. Then, put this card into your inkwell facedown and exerted. _(Damage dealt to them is reduced by 6.)_`

- [ ] **006/actions/163-sail-the-azurite-sea.test.ts**
  - Card: `006/actions/163-sail-the-azurite-sea.ts`
    - `This turn, you may put an additional card from your hand into your inkwell facedown. Draw a card.`

- [ ] **006/actions/164-helping-hand.test.ts**
  - Card: `006/actions/164-helping-hand.ts`
    - `Chosen character gains Support this turn. Draw a card.`

- [ ] **006/actions/165-prepare-your-bot.test.ts**
  - Card: `006/actions/165-prepare-your-bot.ts`
    - `Choose one:`
    - `* Ready chosen item.`
    - `* Ready chosen Robot character. They can't quest for the rest of this turn.`

- [ ] **006/actions/195-hot-potato.test.ts**
  - Card: `006/actions/195-hot-potato.ts`
    - `Choose one:`
    - `· Deal 2 damage to chosen character.`
    - `· Banish chosen item.`

- [ ] **006/actions/196-i-m-still-here.test.ts**
  - Card: `MISSING`
    - `(A character with cost 3 or more can {E} to sing this song for free.)`
    - `Chosen character gains Resist +2 until the start of your next turn. Draw a card. (Damage dealt to them is reduced by 2.)`

- [ ] **006/actions/197-twin-fire.test.ts**
  - Card: `006/actions/197-twin-fire.ts`
    - `Deal 2 damage to chosen character. Then, you may choose and discard a card to deal 2 damage to another chosen character.`
    - `Should allow targeting the same character twice (current behavior)`
    - `Should work correctly when there's only one character in play`

- [ ] **006/actions/198-ambush-.test.ts**
  - Card: `MISSING`
    - `{E} one of your characters to deal damage equal to their {S} to chosen character.`
    - `Should not target Wet Characters`

- [ ] **006/actions/199-hot-potato.test.ts**
  - Card: `MISSING`
    - `Deal 2 damage to chosen character`
    - `Banish chosen item`

- [ ] **006/actions/199-unfortunate-situation.test.ts**
  - Card: `006/actions/199-unfortunate-situation.ts`
    - `Each opponent chooses one of their characters and deals 4 damage to them.`

### characters (125 tests)

- [ ] **006/characters/001-owl-pirate-lookout.test.ts**
  - Card: `006/characters/001-owl-pirate-lookout.ts`
    - `WELL SPOTTED During your turn, whenever a card is put into your inkwell, chosen opposing character gets -1 {S} until the start of your next turn.`

- [ ] **006/characters/002-lilo-escape-artist.test.ts**
  - Card: `006/characters/002-lilo-escape-artist.ts`
    - `On discard`
    - `More than one lilo in discard`
    - `applies Grandmother Willow discount when played from discard`
    - `On play`
    - `Declining the optional ability should leave Lilo in discard, NOT move her to hand`
    - `Repro: After being banished in a challenge, at start of next turn should prompt to play from discard`

- [ ] **006/characters/003-winnie-the-pooh-honey-pirate-lookout.test.ts**
  - Card: `006/characters/003-winnie-the-pooh-honey-pirate-lookout.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)`
    - `WE'RE PIRATES, YOU SEE Whenever this character quests, the next Pirate character you play this turn costs 1 {I} less.`

- [ ] **006/characters/006-chip-friend-indeed.test.ts**
  - Card: `006/characters/006-chip-friend-indeed.ts`
    - `**DALE'S PARTNER** When you play this character, chosen character gets +1 {L} this turn.`

- [ ] **006/characters/007-dale-friend-in-need.test.ts**
  - Card: `006/characters/007-dale-friend-in-need.ts`
    - `No Chip in play`
    - `Chip in play`

- [ ] **006/characters/008-david-impressive-surfer.test.ts**
  - Card: `006/characters/008-david-impressive-surfer.ts`
    - `SHOWING OFF While you have a character named Nani in play, this character gets +2 {L}.`

- [ ] **006/characters/009-prince-naveen-vigilant-first-mate.test.ts**
  - Card: `006/characters/009-prince-naveen-vigilant-first-mate.ts`
    - `Shift 3 (You may pay 3 {I} to play this on top of one of your characters named Prince Naveen.)`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`

- [ ] **006/characters/011-chief-bogo-gazelle-fan.test.ts**
  - Card: `006/characters/011-chief-bogo-gazelle-fan.ts`
    - `YOU LIKE GAZELLE TOO? While you have a character named Gazelle in play, this character gains Singer 6. (He counts as cost 6 to sing songs.)`

- [ ] **006/characters/012-chip-ranger-leader.test.ts**
  - Card: `006/characters/012-chip-ranger-leader.ts`
    - `should have support when Dale is in play`
    - `should not have support when Dale is not in play`

- [ ] **006/characters/014-chip-n-dale-recovery-rangers.test.ts**
  - Card: `006/characters/014-chip-n-dale-recovery-rangers.ts`
    - `Shifts from Dale`
    - `Shifts from Chip`
    - `During your turn, whenever a card is put into your inkwell, you may return a character card from your discard to your hand.`

- [ ] **006/characters/015-judy-hopps-resourceful-rabbit.test.ts**
  - Card: `006/characters/015-judy-hopps-resourceful-rabbit.ts`
    - `NEED SOME HELP? At the end of your turn, you may ready another chosen character of yours.`

- [ ] **006/characters/016-tiana-restaurant-owner.test.ts**
  - Card: `006/characters/016-tiana-restaurant-owner.ts`
    - `should apply the strength penalty if the player does not pay 3 {I}`
    - `should NOT apply the strength penalty if the player pays 3 {I}`
    - `should apply the strength penalty if the player cannot pay the cost`
    - `should not trigger if tiana is not exerted`

- [ ] **006/characters/017-grand-councilwoman-federation-leader.test.ts**
  - Card: `006/characters/017-grand-councilwoman-federation-leader.ts`
    - `FIND IT! Whenever this character quests, your other Alien characters get +1 {L} this turn.`

- [ ] **006/characters/018-dale-mischievous-ranger.test.ts**
  - Card: `006/characters/018-dale-mischievous-ranger.ts`
    - `should put the top 3 cards of your deck into your discard to give chosen character -3 {S} until the start of your next turn`

- [ ] **006/characters/019-nani-caring-sister.test.ts**
  - Card: `006/characters/019-nani-caring-sister.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character’s {S} this turn.)`
    - `I AM SO SORRY 2 {I} - Chosen character gets -1 {S} until the start of your next turn.`

- [ ] **006/characters/020-simba-pride-protector.test.ts**
  - Card: `006/characters/020-simba-pride-protector.ts`
    - `Shift 3 (You may pay 3 {I} to play this on top of one of your characters named Simba.)`
    - `UNDERSTAND THE BALANCE At the end of your turn, if this character is exerted, you may ready your other characters.`
    - `Untapping reckless should not ask to challenge again`
    - `Two Simbas should not untap each other`

- [ ] **006/characters/021-kanga-nurturing-mother.test.ts**
  - Card: `006/characters/021-kanga-nurturing-mother.ts`
    - `SAFE AND SOUND Whenever this character quests, choose a character of yours and that character can't be challenged until the start of your next turn.`

- [ ] **006/characters/022-rabbit-indignant-pirate.test.ts**
  - Card: `006/characters/022-rabbit-indignant-pirate.ts`
    - `BE MORE CAREFUL When you play this character, you may remove up to 1 damage from chosen character.`

- [ ] **006/characters/023-roo-littlest-pirate.test.ts**
  - Card: `006/characters/023-roo-littlest-pirate.ts`
    - `I'M A PIRATE TOO! When you play this character, you may give chosen character -2 {S} until the start of your next turn.`

- [ ] **006/characters/024-mr-litwak-arcade-owner.test.ts**
  - Card: `006/characters/024-mr-litwak-arcade-owner.ts`
    - `THE GANG'S ALL HERE Once during your turn, whenever you play another character, you may ready this character. He can’t quest or challenge for the rest of this turn.`

- [ ] **006/characters/025-jim-hawkins-honorable-pirate.test.ts**
  - Card: `006/characters/025-jim-hawkins-honorable-pirate.ts`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_**HIRE A CREW** When you play this character, look at the top 4 cards of your deck. You may reveal any number of Pirate character cards and put them into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **006/characters/026-stitch-little-trickster.test.ts**
  - Card: `006/characters/026-stitch-little-trickster.ts`
    - `NEED A HAND? 1 {I} - This character gets +1 {S} this turn.`

- [ ] **006/characters/036-hades-lord-of-the-underworld.test.ts**
  - Card: `006/characters/036-hades-lord-of-the-underworld.ts`
    - `SOUL COLLECTOR Whenever one of your other characters is banished during the opponent's turn, gain 2 lore.`

- [ ] **006/characters/037-madam-mim-tiny-adversary.test.ts**
  - Card: `006/characters/037-madam-mim-tiny-adversary.ts`
    - `Challenger +1 (While challenging, this character gets +1 {S}.)`
    - `ZIM ZABBERIM ZIM Your other characters gain Challenger +1.`

- [ ] **006/characters/039-sisu-in-her-element.test.ts**
  - Card: `006/characters/039-sisu-in-her-element.ts`
    - `**Challenger +2** _(While challenging, this character gets +2 {S}.)_`

- [ ] **006/characters/040-the-white-rose-gem-of-the-garden.test.ts**
  - Card: `006/characters/040-the-white-rose-gem-of-the-garden.ts`
    - `THE BEAUTY OF THE WORLD When you play this character, gain 1 lore.`

- [ ] **006/characters/041-juju-mama-odie-s-companion.test.ts**
  - Card: `MISSING`
    - `BEES' KNEES When you play this character, move 1 damage counter from chosen character to chosen opposing character.`

- [ ] **006/characters/043-tinker-bell-flying-at-full-speed.test.ts**
  - Card: `006/characters/043-tinker-bell-flying-at-full-speed.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **006/characters/044-the-carpenter-dinner-companion.test.ts**
  - Card: `006/characters/044-the-carpenter-dinner-companion.ts`
    - `I'LL GET YOU! When this character is banished, you may exert chosen character.`

- [ ] **006/characters/045-iago-reappearing-parrot.test.ts**
  - Card: `006/characters/045-iago-reappearing-parrot.ts`
    - `GUESS WHO When this character is banished in a challenge, return this card to your hand.`

- [ ] **006/characters/047-scar-tempestuous-lion.test.ts**
  - Card: `006/characters/047-scar-tempestuous-lion.ts`
    - `Rush (This character can challenge the turn they're played.)`
    - `Challenger +3 (While challenging, this character gets +3 {S}.)`

- [ ] **006/characters/048-tinker-bell-queen-of-the-azurite-fairies.test.ts**
  - Card: `006/characters/048-tinker-bell-queen-of-the-azurite-fairies.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named Tinker Bell.)`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `SHINING EXAMPLE Whenever this character quests, your other Fairy characters get +1 {L} this turn.`

- [ ] **006/characters/049-diablo-obedient-raven.test.ts**
  - Card: `006/characters/049-diablo-obedient-raven.ts`
    - `should draw a card when banished`
    - `should not draw a card when banished after shifting`

- [ ] **006/characters/050-march-hare-absurd-host.test.ts**
  - Card: `006/characters/050-march-hare-absurd-host.ts`
    - `Rush (This character can challenge the turn they're played.)`

- [ ] **006/characters/052-rafiki-ethereal-guide.test.ts**
  - Card: `006/characters/052-rafiki-ethereal-guide.ts`
    - `Shift 7 (You may pay 7 {I} to play this on top of one of your characters named Rafiki.)`
    - `ASTRAL ATTUNEMENT During your turn, whenever a card is put into your inkwell, you may draw a card.`

- [ ] **006/characters/053-genie-wish-fulfilled.test.ts**
  - Card: `006/characters/053-genie-wish-fulfilled.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `WHAT HAPPENS NOW? When you play this character, draw a card.`

- [ ] **006/characters/054-sisu-uniting-dragon.test.ts**
  - Card: `006/characters/054-sisu-uniting-dragon.ts`
    - `Two dragons on top`

- [ ] **006/characters/055-madam-mim-truly-marvelous.test.ts**
  - Card: `006/characters/055-madam-mim-truly-marvelous.ts`
    - `OH, BAT GIZZARDS 2 {I}, Choose and discard a card - Gain 1 lore.`

- [ ] **006/characters/056-yzma-conniving-chemist.test.ts**
  - Card: `006/characters/056-yzma-conniving-chemist.ts`
    - `**FEEL THE POWER** – _If you have fewer than 3 cards in your hand, draw until you have 3 cards in your hand._`
