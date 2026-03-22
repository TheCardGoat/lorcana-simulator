# Card Test Inventory

Legacy implementation base directory: /Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards
New implementation base directory: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards

**Chunk 7 of 18** | [← Previous](AUDIT_INVENTORY_CHUNK_06.md) | [Next →](AUDIT_INVENTORY_CHUNK_08.md)

- [ ] **005/characters/039-archimedes-exasperated-owl.test.ts**
  - Card: `005/characters/039-archimedes-exasperated-owl.ts`

- [ ] **005/characters/040-bruni-fire-salamander.test.ts**
  - Card: `005/characters/040-bruni-fire-salamander.ts`
    - `**PARTING GIFT** When this character is banished, you may draw a card.`

- [ ] **005/characters/041-earth-giant-living-mountain.test.ts**
  - Card: `005/characters/041-earth-giant-living-mountain.ts`
    - `**UNEARTHED** When you play this character, each opponent draws a card.`

- [ ] **005/characters/042-gale-wind-spirit.test.ts**
  - Card: `005/characters/042-gale-wind-spirit.ts`
    - `Returns to hand when banished by spell (Dragon Fire)`
    - `Does not trigger on inkwell removal`
    - `Returns to hand when banished in a challenge`
    - `Returns to hand when banished by Raging Storm (THE-47 regression)`

- [ ] **005/characters/044-madam-mim-elephant.test.ts**
  - Card: `005/characters/044-madam-mim-elephant.ts`
    - `**A LITTLE GAME** When you play this character, banish her or return another chosen character of yours to your hand.`
    - `Moves 1 damage counters from Madam Mim to Lilo`
    - `Doesn't trigger effect when there's no card to move damage to`
    - `Doesn't trigger effect when there's no damage`

- [ ] **005/characters/046-anna-mystical-majesty.test.ts**
  - Card: `005/characters/046-anna-mystical-majesty.ts`
    - `**EXCEPTIONAL POWER** When you play this character, exert all opposing characters.`

- [ ] **005/characters/047-archimedes-electrified-owl.test.ts**
  - Card: `005/characters/047-archimedes-electrified-owl.ts`

- [ ] **005/characters/048-elsa-the-fifth-spirit.test.ts**
  - Card: `005/characters/048-elsa-the-fifth-spirit.ts`
    - `**CRYSTALLIZE** When you play this character, exert chosen opposing character.`

- [ ] **005/characters/049-genie-main-attraction.test.ts**
  - Card: `005/characters/049-genie-main-attraction.ts`
    - `**SPECTACULAR ENTERTAINER** When this character is exerted, opposing characters cannot ready at the start of your opponents turn.`
    - `**SPECTACULAR ENTERTAINER** Items should be able to ready even when Genie is exerted, as the ability only affects characters`

- [ ] **005/characters/050-olaf-happy-passenger.test.ts**
  - Card: `005/characters/050-olaf-happy-passenger.ts`
    - `**CLEAR THE PATH** For each exerted character opponents have in play, you pay 1 {I} less to play this character.<br/>**Evasive** _(Only characters with Evasive can challenge this character.)_`

- [ ] **005/characters/051-maleficent-vexed-partygoer.test.ts**
  - Card: `005/characters/051-maleficent-vexed-partygoer.ts`
    - `**WHAT AN AWKWARD SITUATION** Whenever this character quests, you may choose and discard a card to return chosen character, item, or location with cost 3 or less to their player’s hand.`

- [ ] **005/characters/053-magica-de-spell-cruel-sorceress.test.ts**
  - Card: `005/characters/053-magica-de-spell-cruel-sorceress.ts`
    - `**PLAYING WITH POWER** During opponents' turns, if an effect would cause you to discard one or more cards from your hand, you don't discard.`
    - `'A whole new world' interaction.`
    - `'The Bare Necessities' interaction.`
    - `Anna Diplomatic Queen Interaction`

- [ ] **005/characters/055-rafiki-shaman-duelist.test.ts**
  - Card: `005/characters/055-rafiki-shaman-duelist.ts`
    - `**SURPRISING SKILL** When you play this character, he gains **Challenger** +4 this turn. _(They get +4 while challenging.)_`

- [ ] **005/characters/056-anna-eager-acolyte.test.ts**
  - Card: `005/characters/056-anna-eager-acolyte.ts`
    - `**GROWING POWERS** When you play this character, each opponent choses and exerts on of their ready characters.`

- [ ] **005/characters/057-king-of-hearts-monarch-of-wonderland.test.ts**
  - Card: `005/characters/057-king-of-hearts-monarch-of-wonderland.ts`
    - `**PLEASING THE QUEEN** {E} – Chosen exerted character can’t ready at the start of their next turn.`

- [ ] **005/characters/058-camilo-madrigal-family-copycat.test.ts**
  - Card: `005/characters/058-camilo-madrigal-family-copycat.ts`
    - `should gain lore equal to the {L} of chosen other character of yours`
    - `should NOT trigger if there's not another char`

- [ ] **005/characters/069-robin-hood-timely-contestant.test.ts**
  - Card: `005/characters/069-robin-hood-timely-contestant.ts`
    - `**TAG ME IN!** For each 1 damage on opposing characters, you pay 1 {I} less to play this character.`

- [ ] **005/characters/070-shenzi-scar-s-accomplice.test.ts**
  - Card: `MISSING`
    - `**EASY PICKINGS** While challenging a damaged character, this character gets +2 {S}.`

- [ ] **005/characters/072-zazu-advisor-to-mufasa.test.ts**
  - Card: `005/characters/072-zazu-advisor-to-mufasa.ts`

- [ ] **005/characters/073-ulf-mime.test.ts**
  - Card: `005/characters/073-ulf-mime.ts`
    - `**SILENT PERFORMANCE** This character can't {E} to sing songs.`

- [ ] **005/characters/074-ed-laughing-hyena.test.ts**
  - Card: `005/characters/074-ed-laughing-hyena.ts`
    - `**CAUSE A PANIC** When you play this character, you may deal 2 damage to chosen damaged character.`

- [ ] **005/characters/075-flora-good-fairy.test.ts**
  - Card: `005/characters/075-flora-good-fairy.ts`
    - `**FIDDLE FADDLE** While being challenged, this character gets +2 {S}.`

- [ ] **005/characters/076-merryweather-good-fairy.test.ts**
  - Card: `005/characters/076-merryweather-good-fairy.ts`
    - `**RAY OF HOPE** When you play this character, you may pay 1 {I} to give chosen character +2 {S} this turn.`

- [ ] **005/characters/077-robin-hood-archery-contestant.test.ts**
  - Card: `005/characters/077-robin-hood-archery-contestant.ts`
    - `**TRICK SHOT** When you play this character, if an opponent has a damaged character in play, gain 1 lore.`

- [ ] **005/characters/079-iago-fake-flamingo.test.ts**
  - Card: `005/characters/079-iago-fake-flamingo.ts`

- [ ] **005/characters/081-ed-hysterical-partygoer.test.ts**
  - Card: `005/characters/081-ed-hysterical-partygoer.ts`
    - `**ROWDY GUEST** Damaged characters can’t challenge this character.`

- [ ] **005/characters/082-scroop-odious-mutineer.test.ts**
  - Card: `005/characters/082-scroop-odious-mutineer.ts`
    - `**DO SAY HELLO TO MR. ARROW** When you play this character, you may pay 3 {I} to banish chosen damaged character.`

- [ ] **005/characters/083-prince-phillip-swordsman-of-the-realm.test.ts**
  - Card: `005/characters/083-prince-phillip-swordsman-of-the-realm.ts`
    - `**SLAYER OF DRAGONS** When you play this character, banish chosen opposing Dragon character.`
    - `**PRESSING THE ADVANTAGE** When he challenges a damaged character, ready this character after the challenge.`

- [ ] **005/characters/084-clarabelle-light-on-her-hooves.test.ts**
  - Card: `005/characters/084-clarabelle-light-on-her-hooves.ts`
    - `Shift`
    - `Draws cards until you have the same number of cards as the opponent`
    - `You have more cards than the opponent`
    - `Double Clarabelles should let you pass your turn.`
    - `Does NOT trigger end-of-turn ability when card is in inkwell`

- [ ] **005/characters/085-anna-diplomatic-queen.test.ts**
  - Card: `005/characters/085-anna-diplomatic-queen.ts`
    - `you MUST pay 2 {I} to chose one`
    - `Each opponent chooses and discards a card.`
    - `Chosen character gets +2 {S} this turn.`
    - `Banish chosen damaged character.`
    - `should not crash when playing a card with no cost`

- [ ] **005/characters/086-clarabelle-clumsy-guest.test.ts**
  - Card: `005/characters/086-clarabelle-clumsy-guest.ts`
    - `**BUTTERFINGER** When you play this character, you may pay to {I} to banish chosen item.`

- [ ] **005/characters/087-banzai-taunting-hyena.test.ts**
  - Card: `005/characters/087-banzai-taunting-hyena.ts`
    - `**HERE KITTY, KITTY, KITTY** When you play this character, you may exert chosen damaged character.`

- [ ] **005/characters/088-robin-hood-sneaky-sleuth.test.ts**
  - Card: `005/characters/088-robin-hood-sneaky-sleuth.ts`
    - `**CLEVER PLAN** This character gets +1 {L} for each opposing damaged character in play._ **`

- [ ] **005/characters/089-mother-gothel-conceited-manipulator.test.ts**
  - Card: `005/characters/089-mother-gothel-conceited-manipulator.ts`
    - `**MOTHER KNOWS BEST** When you play this character, you may pay 3 {I} to return chosen character to their player’s hand.`

- [ ] **005/characters/090-clarabelle-contented-wallflower.test.ts**
  - Card: `005/characters/090-clarabelle-contented-wallflower.ts`
    - `**ONE STEP BEHIND** When you play this character, if an opponent has more cards in their hand than you, you may draw a card.`

- [ ] **005/characters/091-shenzi-head-hyena.test.ts**
  - Card: `005/characters/091-shenzi-head-hyena.ts`
    - `**STICK AROUND FOR DINNER** This character gets +1 {S} for each other Hyena character you have in play.`
    - `Should gain 2 lore when Shenzi challenges a damaged character`

- [ ] **005/characters/092-mother-gothel-unwavering-schemer.test.ts**
  - Card: `005/characters/092-mother-gothel-unwavering-schemer.ts`
    - `**THE WORLD IS DARK** When you play this character, each opponent chooses one of their characters and returns that card to their hand.`

- [ ] **005/characters/093-scar-vengeful-lion.test.ts**
  - Card: `005/characters/093-scar-vengeful-lion.ts`
    - `DOES trigger when challenging a damaged character`
    - `DOES NOT trigger when challenging an undamaged character`
    - `DOES NOT trigger when challenging a location (even if damaged)`

- [ ] **005/characters/104-wrech-it-ralph-demolition-dude.test.ts**
  - Card: `MISSING`
    - `Gains lore passing turn`

- [ ] **005/characters/105-maximus-team-champion.test.ts**
  - Card: `005/characters/105-maximus-team-champion.ts`
    - `No characters 5 strength on more in play`
    - `With char with 5 or more strength`
    - `With char with 10 or more strength`

- [ ] **005/characters/106-turbo-royal-hack.test.ts**
  - Card: `005/characters/106-turbo-royal-hack.ts`
    - `**GAME JUMP** This character also counts as being named King Candy for **Shift**.`

- [ ] **005/characters/107-donald-duck-pie-slinger.test.ts**
  - Card: `005/characters/107-donald-duck-pie-slinger.ts`
    - `**HUMBLE PIE** When you play this character, if you used **Shift** to play him, each opponent loses 2 lore.`
    - `**RAGING DUCK** While an opponent has 10 or more lore, this character gets +6 {S}.`

- [ ] **005/characters/109-scar-betrayer.test.ts**
  - Card: `005/characters/109-scar-betrayer.ts`
    - `**LONG LIVE THE KING** When you play this character, you may banish chosen character named Mufasa.`

- [ ] **005/characters/110-snowanna-rainbeau-cool-competitor.test.ts**
  - Card: `005/characters/110-snowanna-rainbeau-cool-competitor.ts`

- [ ] **005/characters/111-daisy-duck-spotless-food-fighter.test.ts**
  - Card: `MISSING`

- [ ] **005/characters/112-mickey-mouse-enthusiastic-dancer.test.ts**
  - Card: `005/characters/112-mickey-mouse-enthusiastic-dancer.ts`
    - `**PERFECT PARTNERS** While you have a character named Minnie Mouse in play, this character gets +2 {S}.`

- [ ] **005/characters/113-ratigan-raging-rat.test.ts**
  - Card: `005/characters/113-ratigan-raging-rat.ts`
    - `should get +2 {S} while having damage`

- [ ] **005/characters/114-taffyta-muttonfudge-crowd-favorite.test.ts**
  - Card: `005/characters/114-taffyta-muttonfudge-crowd-favorite.ts`
    - `Has location in play`
    - `Doesn't have location in play`

- [ ] **005/characters/116-pete-steamboat-rival.test.ts**
  - Card: `005/characters/116-pete-steamboat-rival.ts`
    - `Pete in play`
    - `No Pete in play`

- [ ] **005/characters/117-taffyta-muttonfudge-sour-speedster.test.ts**
  - Card: `005/characters/117-taffyta-muttonfudge-sour-speedster.ts`
    - `**NEW ROSTER** Once per turn, when this character moves to a location, gain 2 lore.`

- [ ] **005/characters/118-robin-hood-sharpshooter.test.ts**
  - Card: `005/characters/118-robin-hood-sharpshooter.ts`
    - `**MY GREATEST PERFORMANCE** Additional test with friends on the other side`

- [ ] **005/characters/119-gaston-pure-paragon.test.ts**
  - Card: `005/characters/119-gaston-pure-paragon.ts`
    - `Playing full cost`
    - `One damaged Character`
    - `Five damaged Character`

- [ ] **005/characters/121-arthur-novice-sparrow.test.ts**
  - Card: `005/characters/121-arthur-novice-sparrow.ts`

- [ ] **005/characters/122-donald-duck-daisy-s-date.test.ts**
  - Card: `MISSING`
    - `**PLUCKY PLAY** Whenever this character challenges another character, each opponent loses 1 lore.`

- [ ] **005/characters/123-ratigan-party-crasher.test.ts**
  - Card: `005/characters/123-ratigan-party-crasher.ts`
    - `**DELIGHTFULLY WICKED** Your damaged characters get -2 {S}.`

- [ ] **005/characters/124-vanellope-von-schweetz-random-roster-racer.test.ts**
  - Card: `005/characters/124-vanellope-von-schweetz-random-roster-racer.ts`
    - `**PIXLEXIA** When you play this character, she gains **Evasive** until the start of your next turn. _(Only characters with Evasive can challenge them.)_`

- [ ] **005/characters/125-simba-adventurous-successor.test.ts**
  - Card: `005/characters/125-simba-adventurous-successor.ts`
    - `should have correct stats`
    - `should be ruby hero storyborn prince`
    - `should be common rarity`
    - `should give +2 strength to another character when Simba is played`
    - `should give +2 strength to Simba himself when played`
    - `strength bonus should last only this turn`
    - `should be able to target opponent's characters`
    - `multiple Simbas should stack +2 strength bonuses`

- [ ] **005/characters/126-minnie-mouse-dazzling-dancer.test.ts**
  - Card: `005/characters/126-minnie-mouse-dazzling-dancer.ts`
    - `**DANCE-OFF** Whenever this character or one of your characters named Mickey Mouse challenges another character, gain 1 lore.`

- [ ] **005/characters/139-the-queen-cruelest-of-all.test.ts**
  - Card: `005/characters/139-the-queen-cruelest-of-all.ts`

- [ ] **005/characters/141-prince-john-opportunistic-briber.test.ts**
  - Card: `005/characters/141-prince-john-opportunistic-briber.ts`
    - `**TAXES NEVER FAIL ME** Whenever you play an item, this character gets +2 {S} this turn.`

- [ ] **005/characters/142-merlin-back-from-the-bermudas.test.ts**
  - Card: `005/characters/142-merlin-back-from-the-bermudas.ts`
    - `**LONG LIVE THE KING!** Your Arthur characters give **Resist** +1 _(Damage dealt to this character is reduced by 1)_`

- [ ] **005/characters/143-pacha-emperor-s-guide.test.ts**
  - Card: `MISSING`
    - `**HELPFUL SUPPLIES** At the start of your turn, if you have an item in play, gain 1 lore.`
    - `**PERFECT DIRECTIONS** At the start of your turn, if you have a location in play, gain 1 lore.`
    - `Having both`
    - `Having none`
    - `should let opponent pass turn when there's no valid target`

- [ ] **005/characters/144-the-queen-fairest-of-all.test.ts**
  - Card: `005/characters/144-the-queen-fairest-of-all.ts`
    - `**REFLECTIONS OF VANITY** For each other character named The Queen you have in play, this character gets +1 {L}.`

- [ ] **005/characters/145-sheriff-of-nottingham-bushel-britches.test.ts**
  - Card: `005/characters/145-sheriff-of-nottingham-bushel-britches.ts`
    - `**EVERY LITTLE BIT HELPS** For each item you have in play, you pay 1 {I} less to play this character.`

- [ ] **005/characters/146-chicha-dedicated-mother.test.ts**
  - Card: `005/characters/146-chicha-dedicated-mother.ts`
    - `During your turn, when you put a card into your inkwell, if it’s the second card you’ve put into your inkwell this turn, you may draw a card.`
    - `It should also trigger when putting inkwell cards from other zones that not hand`
    - `should trigger when All Is Found puts the second card from discard into inkwell`

- [ ] **005/characters/147-prince-john-gold-lover.test.ts**
  - Card: `005/characters/147-prince-john-gold-lover.ts`
    - `**BEAUTIFUL, LOVELY TAXES** {E} – Play an item from your hand or discard with cost 5 or less for free, exerted.`

- [ ] **005/characters/148-the-queen-crown-of-the-council.test.ts**
  - Card: `005/characters/148-the-queen-crown-of-the-council.ts`
    - `When you play this character, look at the top 3 cards of your deck. You may reveal any number of character cards named The Queen and put them into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **005/characters/149-kuzco-selfish-emperor.test.ts**
  - Card: `005/characters/149-kuzco-selfish-emperor.ts`
    - `**OUTPLACEMENT** When you play this character, you may put chosen item or location into its player’s inkwell facedown and exerted.<br/>**BY INVITE ONLY** 4 {I} − Your other characters gain **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_`
    - `**OUTPLACEMENT** Opt out`
    - `**BY INVITE ONLY** 4 {I} − Your other characters gain **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_`

- [ ] **005/characters/150-mufasa-ruler-of-pride-rock.test.ts**
  - Card: `005/characters/150-mufasa-ruler-of-pride-rock.ts`
    - `**A DELICATE BALANCE** When you play this character, exert all cards in your inkwell, then return 2 cards at random from your inkwell to your hand.`
    - `**EVERYTHING THE LIGHT TOUCHES** Whenever this character quests, ready all cards in your inkwell.`

- [ ] **005/characters/152-minnie-mouse-quick-thinking-inventor.test.ts**
  - Card: `MISSING`
    - `**CAKE CATAPULT** When you play this character, chosen character gets -2 {S} this turn.`

- [ ] **005/characters/153-basil-practiced-detective.test.ts**
  - Card: `005/characters/153-basil-practiced-detective.ts`

- [ ] **005/characters/154-king-candy-sweet-abomination.test.ts**
  - Card: `005/characters/154-king-candy-sweet-abomination.ts`
    - `Shift`
    - `**CHANGING THE CODE** When you play this character, you may draw 2 cards, then put a card from your hand on the bottom of your deck.`

- [ ] **005/characters/155-donald-duck-focused-flatfoot.test.ts**
  - Card: `005/characters/155-donald-duck-focused-flatfoot.ts`
    - `**BAFFLING MYSTERY** When you play this character, you may put the top card of your deck into your inkwell facedown and exerted.`

- [ ] **005/characters/156-tanana-wise-woman.test.ts**
  - Card: `005/characters/156-tanana-wise-woman.ts`
    - `**YOUR BROTHERS NEED GUIDANCE** When you play this character, you may remove up to 1 damage from chosen character or location.`

- [ ] **005/characters/157-tipo-growing-son.test.ts**
  - Card: `005/characters/157-tipo-growing-son.ts`
    - `**MEASURE ME AGAIN** When you play this character, you may put a card from your hand into your inkwell facedown and exerted.`

- [ ] **005/characters/158-belle-of-the-ball.test.ts**
  - Card: `005/characters/158-belle-of-the-ball.ts`
    - `**USHERED INTO THE PARTY** When you play this character, your other characters gain **Ward** until the start of your next turn.`

- [ ] **005/characters/159-merlin-intellectual-visionary.test.ts**
  - Card: `005/characters/159-merlin-intellectual-visionary.ts`
    - `should let you play Merlin - Intellectual Visionary`

- [ ] **005/characters/166-basil-s-magnifying-glass.test.ts**
  - Card: `MISSING`
    - `**FIND WHAT’S HIDDEN** {E}, 2 {I} - Look at the top 3 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **005/characters/171-stitch-team-underdog.test.ts**
  - Card: `005/characters/171-stitch-team-underdog.ts`
    - `**HEAVE HO!** lets you decline the chosen-character targeting`

- [ ] **005/characters/172-jafar-tyrannical-hypnotist.test.ts**
  - Card: `005/characters/172-jafar-tyrannical-hypnotist.ts`
    - `Intimidating Gaze`

- [ ] **005/characters/172-jarar-tyrannical-hypnotist.test.ts**
  - Card: `MISSING`
    - `Challenger`
    - `Opposing characters with cost 4 or less can’t challenge.`
    - `Opposing characters with cost 5 or more can challenge.`

- [ ] **005/characters/173-simba-lost-prince.test.ts**
  - Card: `005/characters/173-simba-lost-prince.ts`
    - `**FACE THE PAST** During your turn, whenever this character banishes another character in a challenge, you may draw a card.`

- [ ] **005/characters/176-mickey-mouse-food-fight-defender.test.ts**
  - Card: `005/characters/176-mickey-mouse-food-fight-defender.ts`

- [ ] **005/characters/177-sleepy-sluggish-knight.test.ts**
  - Card: `005/characters/177-sleepy-sluggish-knight.ts`

- [ ] **005/characters/178-kronk-unlicensed-investigator.test.ts**
  - Card: `005/characters/178-kronk-unlicensed-investigator.ts`

- [ ] **005/characters/179-heihei-protective-rooster.test.ts**
  - Card: `005/characters/179-heihei-protective-rooster.ts`

- [ ] **005/characters/180-sneezy-noisy-knight.test.ts**
  - Card: `005/characters/180-sneezy-noisy-knight.ts`
    - `**HEADWIND** When you play this character, chosen Knight character gains **Challenger** +2 this turn. _(They get +2 {S} while challenging.)_`

- [ ] **005/characters/181-dopey-knight-apprentice.test.ts**
  - Card: `005/characters/181-dopey-knight-apprentice.ts`
    - `Doesn't trigger when he's the only knight in play`

- [ ] **005/characters/182-namaari-resolute-daughter.test.ts**
  - Card: `005/characters/182-namaari-resolute-daughter.ts`
    - `**I DON’T HAVE ANY OTHER CHOICE** For each opposing character banished in a challenge this turn, you pay 2 {I} less to play this character.<br/>**Resist** +3 _(Damage dealt to this character is reduced by 3.)_`

- [ ] **005/characters/183-snow-white-fair-hearted.test.ts**
  - Card: `MISSING`
    - `gets Resist +0 if no other Knight is in play beside Snow White `
    - `gets Resist +1 if exactly 1 other Knight is in play beside Snow White`
    - `gets Resist +2 if 2 other Knight are in play beside Snow White`

- [ ] **005/characters/184-yzma-unjustly-treated.test.ts**
  - Card: `005/characters/184-yzma-unjustly-treated.ts`
    - `**I'M WARNING YOU!** During your turn, whenever one of your characters banishes a character in a challenge, you may deal 1 damage to chosen character.`
    - `**I'M WARNING YOU!** Does not trigger when your character is banished`
    - `**I'M WARNING YOU!** Does not trigger during opponent's turn`

- [ ] **005/characters/185-kronk-head-of-security.test.ts**
  - Card: `005/characters/185-kronk-head-of-security.ts`

- [ ] **005/characters/186-grumpy-skeptical-knight.test.ts**
  - Card: `005/characters/186-grumpy-skeptical-knight.ts`
    - `**BOON OF RESILIENCE** While one of your Knight characters is at a location, that character gains Resist +2. _(Damage dealt to them is reduced by 2)._`
    - `**BURST OF SPEED** During your turn, this character gains Evasive. _(They can challenge characters with Evasive.)_`

- [ ] **005/characters/187-pete-wrestling-champ.test.ts**
  - Card: `005/characters/187-pete-wrestling-champ.ts`
    - `Pete on top`
    - `Peter Pan on top`

- [ ] **005/characters/189-bashful-adoring-knight.test.ts**
  - Card: `005/characters/189-bashful-adoring-knight.ts`
    - `**IMPRESS THE PRINCESS** While you have a character named Snow White in play, this character gains **Bodyguard**. _(An opposing character who challenges one of your character must chose one with Bodyguard if able.)_`

- [ ] **005/characters/191-happy-lively-knight.test.ts**
  - Card: `005/characters/191-happy-lively-knight.ts`
    - `**BURST OF SPEED** During your turn, this character gains Evasive. _(They can challenge characters with Evasive.)_`

- [ ] **005/characters/192-simba-son-of-mufasa.test.ts**
  - Card: `005/characters/192-simba-son-of-mufasa.ts`
    - `**FEARSOME ROAR** When you play this character, you may banish chosen item or location.`

- [ ] **005/characters/193-doc-bold-knight.test.ts**
  - Card: `005/characters/193-doc-bold-knight.ts`
    - `**DRASTIC MEASURES** When you play this character, you may discard your hand to draw 2 cards.`

- [ ] **005/characters/194-arthur-king-victorious.test.ts**
  - Card: `005/characters/194-arthur-king-victorious.ts`
    - `KNIGHTED BY THE KING should only let the chosen character challenge ready characters this turn`

- [ ] **005/characters/195-pete-games-referee.test.ts**
  - Card: `005/characters/195-pete-games-referee.ts`
    - `**BLOW THE WHISTLE** When you play this character, opponents can’t play actions until the start of your next turn.`

### items (22 tests)
