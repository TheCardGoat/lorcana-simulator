# Card Test Inventory

Legacy implementation base directory: /Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards
New implementation base directory: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards

## Set 001

### actions (1 tests)

- [x] **001/actions/029-just-in-time.test.ts**
  - Card: `001/actions/029-just-in-time.ts`
    - `Plays character card for free`
    - `Characters with Bodyguard can be played exerted`
    - `Characters with Bodyguard can be played ready`
    - `Doesn't play for free`
    - `Doesn't shift character card for free`

### items (3 tests)

- [x] **001/items/032-dinglehopper.test.ts**
  - Card: `001/items/032-dinglehopper.ts`
    - `STRAIGHTEN HAIR - healing 1 damage`
    - `STRAIGHTEN HAIR - healing 0 damage`

- [x] **001/items/033-lantern.test.ts**
  - Card: `001/items/033-lantern.ts`
    - `First character gets a discount.`
    - `Second Character doesn't get a discount`
    - `shift`
    - `shift second`
    - `Lantern cost reduction does not change character's actual cost for Stitch - Rock Star`
    - `Lantern cost reduction should NOT apply to Dumbo activated ability ink cost`

- [x] **001/items/166-coconut-basket.test.ts**
  - Card: `001/items/166-coconut-basket.ts`
    - `Consider the Coconut - Whenever you play a character, you may remove up to 2 damage from chosen character.`
    - `it doesn't trigger when an opponent plays a character`

## Set 002

### actions (27 tests)

- [x] **002/actions/028-hold-still.test.ts**
  - Card: `002/actions/028-hold-still.ts`
    - `Remove up to 4 damage from chosen character.`

- [x] **002/actions/029-last-stand.test.ts**
  - Card: `002/actions/029-last-stand.ts`
    - `Does NOT Banish a character not involved in challenge`
    - `Does NOT Banish a character when no challenge occurred`
    - `Banishes a character that has been challenged`

- [x] **002/actions/030-painting-the-roses-red.test.ts**
  - Card: `002/actions/030-painting-the-roses-red.ts`
    - `Draw a card`
    - `Up to 2 chosen characters get -1 {S} this turn.`

- [x] **002/actions/031-world-s-greatest-criminal-mind.test.ts**
  - Card: `002/actions/031-worlds-greatest-criminal-mind.ts`
    - `Banish chosen character with 5 {S} or more.`
    - `Can't banish  character with less than 5 {S}.`

- [x] **002/actions/032-zero-to-hero.test.ts**
  - Card: `002/actions/032-zero-to-hero.ts`
    - `One character in play`
    - `Five character in play`

- [x] **002/actions/062-gruesome-and-grim.test.ts**
  - Card: `002/actions/062-gruesome-and-grim.ts`
    - `Play a character with cost 4 or less for free. They gain **Rush**. At the end of the turn, banish them. _(They can challenge the turn they're played.)_`

- [x] **002/actions/063-i-m-stuck-.test.ts**
  - Card: `002/actions/063-im-stuck.ts`
    - `Chosen exerted character can't ready at the start of their next turn.`

- [x] **002/actions/064-legend-of-the-sword-in-the-stone.test.ts**
  - Card: `002/actions/064-legend-of-the-sword-in-the-stone.ts`
    - `Chosen character gains **Challenger** +3 this turn.`

- [x] **002/actions/096-bibbidi-bobbidi-boo.test.ts**
  - Card: `002/actions/096-bibbidi-bobbidi-boo.ts`
    - `should be able to play a character with the same cost, and same color`
    - `should be able to play a character with the lower cost, and same color`
    - `should NOT be able to play a character with a higher cost`
    - `should NOT be able to play a character with a different color and same cost`
    - `should NOT be able to play again the same character`

- [x] **002/actions/097-bounce.test.ts**
  - Card: `002/actions/097-bounce.ts`
    - `Return chosen character of yours to your hand to return another chosen character to their player's hand.`

- [x] **002/actions/098-hypnotize.test.ts**
  - Card: `002/actions/098-hypnotize.ts`
    - `Each opponent chooses and discards a card. Draw a card.`
    - `Opponent no cards in hand, should still draw`

- [x] **002/actions/099-improvise.test.ts**
  - Card: `002/actions/099-improvise.ts`
    - `Chosen character gets +1 {S} this turn. Draw a card.`

- [x] **002/actions/100-pack-tactics.test.ts**
  - Card: `002/actions/100-pack-tactics.ts`
    - `Gain 1 lore for each damaged character opponents have in play.`

- [x] **002/actions/101-ring-the-bell.test.ts**
  - Card: `002/actions/101-ring-the-bell.ts`
    - `Banish chosen damaged character.`
    - `doest NOT Banish non damaged character`

- [x] **002/actions/129-go-the-distance.test.ts**
  - Card: `002/actions/129-go-the-distance.ts`
    - `Ready chosen damaged character of yours. They can't quest for the rest of this turn. Draw a card.`

- [x] **002/actions/130-teeth-and-ambitions.test.ts**
  - Card: `002/actions/130-teeth-and-ambitions.ts`
    - `Deal 2 damage to chosen character of yours to deal 2 damage to another chosen character.`

- [x] **002/actions/131-the-most-diabolical-scheme.test.ts**
  - Card: `002/actions/131-the-most-diabolical-scheme.ts`
    - `Banish chosen Villain of yours to banish chosen character.`

- [x] **002/actions/132-what-did-you-call-me-.test.ts**
  - Card: `002/actions/132-what-did-you-call-me.ts`
    - `Chosen damaged character gets +3 {S} this turn.`

- [x] **002/actions/133-you-can-fly.test.ts**
  - Card: `002/actions/133-you-can-fly.ts`
    - `Chosen character gains **Evasive** until the start of your next turn.`

- [x] **002/actions/162-falling-down-the-rabbit-hole.test.ts**
  - Card: `002/actions/162-falling-down-the-rabbit-hole.ts`
    - `Each player chooses one of their characters and puts them into their inkwell facedown and exerted.`

- [x] **002/actions/163-four-dozen-eggs.test.ts**
  - Card: `002/actions/163-four-dozen-eggs.ts`
    - `Your characters gain **Resist** +2 until the start of your next turn. _(Damage dealt to them is reduced by 2.)_`

- [x] **002/actions/164-launch.test.ts**
  - Card: `002/actions/164-launch.ts`
    - `Banish chosen item of yours to deal 5 damage to chosen character.`

- [x] **002/actions/165-nothing-to-hide.test.ts**
  - Card: `002/actions/165-nothing-to-hide.ts`
    - `Each opponent reveals their hand. Draw a card.`

- [x] **002/actions/198-charge.test.ts**
  - Card: `002/actions/198-charge.ts`
    - `Chosen character gains **Challenger** +2 and **Resist** +2 this turn. _(They get +2 {S} while challenging. Damage dealt to them is reduced by 2.)_`

- [x] **002/actions/199-let-the-storm-rage-on.test.ts**
  - Card: `002/actions/199-let-the-storm-rage-on.ts`
    - `Deal 2 damage to chosen character. Draw a card.`
    - `Can't target characters with ward`
    - `Should not draw before targeting`

- [x] **002/actions/200-pick-a-fight.test.ts**
  - Card: `002/actions/200-pick-a-fight.ts`
    - `Chosen character can challenge ready characters this turn.`

- [x] **002/actions/201-strength-of-a-raging-fire.test.ts**
  - Card: `002/actions/201-strength-of-a-raging-fire.ts`
    - `Deal damage to chosen character equal to the number of characters you have in play.`

### characters (129 tests)

- [x] **001/characters/018-rapunzel-gifted-with-healing.test.ts**
  - Card: `001/characters/018-rapunzel-gifted-with-healing.ts`
    - `**GLEAM AND GLOW** When you play this character, remove up to 3 damage from one of your characters. Draw a card for each 1 damage removed this way.`

- [ ] **002/characters/001-bashful-hopeless-romantic.test.ts**
  - Card: `002/characters/001-bashful-hopeless-romantic.ts`
    - `**OH, GOSH** This character can't quest unless you have another Seven Dwarfs character in play.`

- [ ] **002/characters/002-christopher-robin-adventurer.test.ts**
  - Card: `002/characters/002-christopher-robin-adventurer.ts`
    - `Should gain 2 lore when readying with 2 other characters in play`
    - `Should not gain 2 lore when readying with 1 other character in play`
    - `Passing the turn triggers the ability`

- [x] **002/characters/003-cinderella-ballroom-sensation.test.ts**
  - Card: `002/characters/003-cinderella-ballroom-sensation.ts`
    - `Singer`

- [x] **002/characters/005-doc-leader-of-the-seven-dwarfs.test.ts**
  - Card: `002/characters/005-doc-leader-of-the-seven-dwarfs.ts`
    - `**SHARE AND SHARE ALIKE** Whenever this character quests, you pay 1 {I} less for the next character you play this turn.`

- [x] **002/characters/006-dopey-always-playful.test.ts**
  - Card: `002/characters/006-dopey-always-playful.ts`
    - `**ODD ONE OUT** When this character is banished, your other Seven Dwarfs characters get +2 {S} until the start of your next turn.`

- [ ] **002/characters/008-gaston-baritone-bully.test.ts**
  - Card: `002/characters/008-gaston-baritone-bully.ts`
    - `Singer`

- [ ] **002/characters/009-grand-duke-advisor-to-the-king.test.ts**
  - Card: `002/characters/009-grand-duke-advisor-to-the-king.ts`
    - `**YES, YOUR MAJESTY** Your Prince, Princess, King and Queen characters gain +1 {S}.`

- [ ] **002/characters/010-grumpy-bad-tempered.test.ts**
  - Card: `002/characters/010-grumpy-bad-tempered.ts`
    - `**THERE'S TROUBLE A-BREWIN'** Your other Seven Dwarfs characters get +1 {S}.`

- [ ] **002/characters/011-happy-good-natured.test.ts**
  - Card: `002/characters/011-happy-good-natured.ts`
    - `Support`

- [ ] **002/characters/012-king-louie-jungle-vip.test.ts**
  - Card: `002/characters/012-king-louie-jungle-vip.ts`
    - `**LAY IT ON THE LINE** Whenever another character is banished, you may remove up to 2 damage from this character.`

- [ ] **002/characters/013-mickey-mouse-friendly-face.test.ts**
  - Card: `002/characters/013-mickey-mouse-friendly-face.ts`
    - `**GLAD YOU’RE HERE!** Whenever this character quests, you pay 3 {I} less for the next character you play this turn.`

- [ ] **002/characters/014-mufasa-betrayed-leader.test.ts**
  - Card: `002/characters/014-mufasa-betrayed-leader.ts`
    - `**THE SUN WILL SET** When this character is banished, you may reveal the top card of your deck. If it's a character card, you may play that character for free and they enter play exerted. Otherwise, put it on the top of your deck.`
    - `Removed on opponent's turn`

- [ ] **002/characters/015-mulan-free-spirit.test.ts**
  - Card: `002/characters/015-mulan-free-spirit.ts`

- [ ] **002/characters/016-mulan-reflecting.test.ts**
  - Card: `002/characters/016-mulan-reflecting.ts`
    - `shift`
    - `**HONOR TO THE ANCESTORS** Whenever this character quests, you may reveal the top card of your deck. If it's a song card, you may play it for free. Otherwise, put it on the top of your deck.`

- [ ] **002/characters/017-nana-darling-family-pet.test.ts**
  - Card: `002/characters/017-nana-darling-family-pet.ts`
    - `Playing a floodborn`

- [ ] **002/characters/019-rapunzel-gifted-artist.test.ts**
  - Card: `002/characters/019-rapunzel-gifted-artist.ts`
    - `**LET YOUR POWER SHINE** Whenever you remove 1 or more damage from one of your characters, you may draw a card.`
    - `Shift`
    - `Rapunzel, Maleficent COMBO WOMBO`

- [ ] **002/characters/020-rapunzel-sunshine.test.ts**
  - Card: `002/characters/020-rapunzel-sunshine.ts`
    - `remove 2 damage`
    - `remove 1 damage`

- [ ] **002/characters/021-sleepy-nodding-off.test.ts**
  - Card: `002/characters/021-sleepy-nodding-off.ts`
    - `**YAWN!** This character enters play exerted.`

- [ ] **002/characters/022-sneezy-very-allergic.test.ts**
  - Card: `002/characters/022-sneezy-very-allergic.ts`
    - `playing Sneezy`
    - `playing another Seven Dwarfs character`
    - `playing another character, Not a seven dwarfs char`
    - `opponent playing a seven dwarfs char`

- [ ] **002/characters/023-snow-white-lost-in-the-forest.test.ts**
  - Card: `002/characters/023-snow-white-lost-in-the-forest.ts`
    - `**I WON'T HURT YOU** When you play this character, you may remove up to 2 damage from chosen character.`

- [ ] **002/characters/024-snow-white-unexpected-houseguest.test.ts**
  - Card: `002/characters/024-snow-white-unexpected-houseguest.ts`
    - `How Do You Do?`

- [ ] **002/characters/024-snow-white-unexpected-househuest.test.ts**
  - Card: `MISSING`
    - `**HOW DO YOU DO?** You pay 1 {I} less to play Seven Dwarfs characters.`

- [ ] **002/characters/025-snow-white-well-wisher.test.ts**
  - Card: `002/characters/025-snow-white-well-wisher.ts`
    - `return character card to hand`
    - `no valid target`

- [ ] **002/characters/026-the-queen-commanding-presence.test.ts**
  - Card: `002/characters/026-the-queen-commanding-presence.ts`
    - `has shift`
    - `**WHO IS THE FAIREST?** Whenever this character quests, chosen opposing character gets -4 {S} this turn and chosen character gets +4 {S} this turn.`

- [ ] **002/characters/035-arthur-wizard-s-apprentice.test.ts**
  - Card: `MISSING`
    - `returning character to hand should give 2 lore`
    - `Not returning character to hand should NOT give 2 lore`

- [ ] **002/characters/036-blue-fairy-rewarding-good-deeds.test.ts**
  - Card: `002/characters/036-blue-fairy-rewarding-good-deeds.ts`
    - `Playing a floodborn`
    - `Playing a NON floodborn`

- [ ] **002/characters/038-dr-facilier-savvy-opportunist.test.ts**
  - Card: `002/characters/038-dr-facilier-savvy-opportunist.ts`
    - `Evasive`

- [ ] **002/characters/039-elsa-gloves-off.test.ts**
  - Card: `002/characters/039-elsa-gloves-off.ts`
    - `**Challenger** +3 _(While challenging, this character gets +3 {S})_`

- [ ] **002/characters/041-fairy-godmother-mystic-armorer.test.ts**
  - Card: `002/characters/041-fairy-godmother-mystic-armorer.ts`
    - `shift`
    - `Your characters gain Challenger +3`
    - `your characters gain When this character is banished in a challenge, return this card to your hand`

- [ ] **002/characters/042-fairy-godmother-pure-heart.test.ts**
  - Card: `002/characters/042-fairy-godmother-pure-heart.ts`
    - `Play a character named Cinderella`
    - `Play a character not named Cinderella`

- [ ] **002/characters/043-heihei-persistent-presence.test.ts**
  - Card: `002/characters/043-heihei-persistent-presence.ts`
    - `should not return to hand when banished out of a challenge`
    - `as an attacker, should return to hand when banished`
    - `as a defender, should return to hand when banished`

- [ ] **002/characters/044-jiminy-cricket-pinocchio-s-conscience.test.ts**
  - Card: `MISSING`
    - `should draw card if pinocchio is on play`

- [ ] **002/characters/045-kuzco-wanted-llama.test.ts**
  - Card: `002/characters/045-kuzco-wanted-llama.ts`
    - `**OK, WHERE AM I?** When this character is banished, you may draw a card.`

- [ ] **002/characters/046-madam-mim-fox.test.ts**
  - Card: `002/characters/046-madam-mim-fox.ts`
    - `**Rush** _(This character can challenge the turn they're played.)_`
    - `skipping the effect banishes her`
    - `return another chosen character of yours to your hand.`

- [ ] **002/characters/047-madam-mim-purple-dragon.test.ts**
  - Card: `002/characters/047-madam-mim-purple-dragon.ts`
    - `Evasive`
    - `skipping the effect banishes her`
    - `return another chosen character of yours to your hand.`

- [ ] **002/characters/048-madam-mim-rival-of-merlin.test.ts**
  - Card: `002/characters/048-madam-mim-rival-of-merlin.ts`
    - `**GRUESOME AND GRIM** {E} − Play a character with cost 4 or less for free. They gain **Rush**. At the end of the turn, banish them. _They can challenge the turn they're played._'`
    - `Shift`

- [ ] **002/characters/049-madam-mim-snake.test.ts**
  - Card: `002/characters/049-madam-mim-snake.ts`
    - `skipping the effect banishes her`
    - `return another chosen character of yours to your hand.`
    - `skipping the effect banishes her`

- [ ] **002/characters/050-merlin-crab.test.ts**
  - Card: `002/characters/050-merlin-crab.ts`
    - `When you play`
    - `When he leaves play`

- [ ] **002/characters/051-merlin-goat.test.ts**
  - Card: `002/characters/051-merlin-goat.ts`
    - `When you play`
    - `When he leaves play`

- [ ] **002/characters/052-merlin-rabbit.test.ts**
  - Card: `002/characters/052-merlin-rabbit.ts`
    - `When you play`
    - `When he leaves play`

- [ ] **002/characters/053-merlin-shapeshifter.test.ts**
  - Card: `002/characters/053-merlin-shapeshifter.ts`
    - `Effect only active until end of turn`
    - `accumulates previous effects`

- [ ] **002/characters/054-merlin-squirrel.test.ts**
  - Card: `002/characters/054-merlin-squirrel.ts`
    - `When you play`
    - `When he leaves play`

- [ ] **002/characters/055-peter-pan-s-shadow-not-sewn-on.test.ts**
  - Card: `MISSING`
    - `Evasive`
    - `Rush`
    - `**TIPTOE** Your other characters with **Rush** gain **Evasive**.`

- [ ] **002/characters/057-pinocchio-on-the-run.test.ts**
  - Card: `002/characters/057-pinocchio-on-the-run.ts`
    - `return target item to owners hand`
    - `return target character to owners hand`
    - `skip for invalid targets`

- [ ] **002/characters/058-pinocchio-talkative-puppet.test.ts**
  - Card: `002/characters/058-pinocchio-talkative-puppet.ts`
    - `**TELLING LIES** When you play this character, you may exert chosen opposing character.`

- [ ] **002/characters/060-yzma-scary-beyond-all-reason.test.ts**
  - Card: `002/characters/060-yzma-scary-beyond-all-reason.ts`
    - `Targeting opponent's card`
    - `Targeting your own card`
    - `Shift`
    - `When no target is available, it should igore layer`

- [ ] **002/characters/070-beast-relentless.test.ts**
  - Card: `002/characters/070-beast-relentless.ts`
    - `Beast himself challenging other`
    - `Damaged in combat`
    - `Damaged by action`
    - `Self character being damaged`
    - `Opposing character being banished`
    - `Beast vs Beast`

- [ ] **002/characters/071-belle-bookworm.test.ts**
  - Card: `002/characters/071-belle-bookworm.ts`
    - `No Cards in Hand`
    - `Cards in Hand`

- [ ] **002/characters/072-belle-hidden-archer.test.ts**
  - Card: `002/characters/072-belle-hidden-archer.ts`
    - `Shift`
    - `as defender, discards all cards in hand`
    - `as attacker, discards none`

- [ ] **002/characters/073-bucky-squirrel-squeak-tutor.test.ts**
  - Card: `002/characters/073-bucky-squirrel-squeak-tutor.ts`
    - `Playing a Floodborn character without Shift`
    - `Playing a Floodborn character with Shift`

- [ ] **002/characters/075-cheshire-cat-from-the-shadows.test.ts**
  - Card: `002/characters/075-cheshire-cat-from-the-shadows.ts`
    - `Shift`
    - `Evasive`
    - `**WICKED SMILE** {E} − Banish chosen damaged character.`

- [ ] **002/characters/076-daisy-duck-secret-agent.test.ts**
  - Card: `002/characters/076-daisy-duck-secret-agent.ts`
    - `**THWART** Whenever this character quests, each opponent chooses and discards a card.`

- [ ] **002/characters/077-donald-duck-perfect-gentleman.test.ts**
  - Card: `002/characters/077-donald-duck-perfect-gentleman.ts`
    - `Shifts`
    - `**ALLOW ME** At the start of your turn, each player may draw a card.`

- [ ] **002/characters/078-donald-duck-sleepwalker.test.ts**
  - Card: `002/characters/078-donald-duck-sleepwalker.ts`
    - `**STARTLED AWAKE** Whenever you play an action, this character gets +2 {S} this turn.`

- [ ] **002/characters/079-dr-facilier-fortune-teller.test.ts**
  - Card: `002/characters/079-dr-facilier-fortune-teller.ts`
    - `**YOU'RE IN MY WORLD** Whenever this character quests, chosen opposing character can't quest during their next turn.`
    - `Evasive`

- [ ] **002/characters/080-enchantress-unexpected-judge.test.ts**
  - Card: `002/characters/080-enchantress-unexpected-judge.ts`
    - `**TRUE FORM** While being challenged, this character gets +2 {S}.`

- [ ] **002/characters/082-flynn-rider-his-own-biggest-fan.test.ts**
  - Card: `002/characters/082-flynn-rider-his-own-biggest-fan.ts`
    - `Shift`
    - `Evasive`
    - `Zero cards in opponent's hand`
    - `One card in opponent's hand`
    - `Two cards in opponent's hand`
    - `Four cards in opponent's hand`

- [ ] **002/characters/083-gaston-scheming-suitor.test.ts**
  - Card: `002/characters/083-gaston-scheming-suitor.ts`
    - `No Cards in Hand`
    - `Cards in Hand`

- [ ] **002/characters/085-lucifer-cunning-cat.test.ts**
  - Card: `002/characters/085-lucifer-cunning-cat.ts`
    - `Discard action card`
    - `Discard a NON-action card`

- [ ] **002/characters/086-pain-underworld-imp.test.ts**
  - Card: `002/characters/086-pain-underworld-imp.ts`
    - `**COMING, YOUR MOST LUGUBRIOUSNESS** While this character has 5 {S} or more, he gets + 2 {L}.`

- [ ] **002/characters/087-panic-underworld-imp.test.ts**
  - Card: `002/characters/087-panic-underworld-imp.ts`
    - `Targets Pain`
    - `NOT Targeting Pain`

- [ ] **002/characters/088-pete-bad-guy.test.ts**
  - Card: `002/characters/088-pete-bad-guy.ts`
    - `Ward`
    - `**TAKE THAT!** Whenever you play an action, this character gets +2 {S} this turn.`

- [ ] **002/characters/089-prince-john-greediest-of-all.test.ts**
  - Card: `002/characters/089-prince-john-greediest-of-all.ts`
    - `Ward`
    - `Doesn't trigger when you discard a card`
    - `Opponent discarding one card`
    - `Opponent discarding Two cards`

- [ ] **002/characters/090-queen-of-hearts-quick-tempered.test.ts**
  - Card: `002/characters/090-queen-of-hearts-quick-tempered.ts`
    - `**ROYALE RAGE** When you play this character, deal 1 damage to chosen damaged opposing character.`

- [ ] **002/characters/091-ratigan-criminal-mastermind.test.ts**
  - Card: `002/characters/091-ratigan-criminal-mastermind.ts`

- [ ] **002/characters/092-ray-easygoing-firefly.test.ts**
  - Card: `002/characters/092-ray-easygoing-firefly.ts`

- [ ] **002/characters/093-the-queen-disguised-peddler.test.ts**
  - Card: `002/characters/093-the-queen-disguised-peddler.ts`
    - `**A PERFECT DISGUISE** {E}, Choose and discard a character card − Gain lore equal to the discarded character's {L}.`

- [ ] **002/characters/106-donald-duck-not-again-.test.ts**
  - Card: `MISSING`
    - `Evasive`
    - `**PHOOEY!** This character gets +1 {L} for each 1 damage on him.`

- [ ] **002/characters/107-felicia-always-hungry.test.ts**
  - Card: `002/characters/107-felicia-always-hungry.ts`
    - `Reckless`

- [ ] **002/characters/108-fidget-ratigan-s-henchman.test.ts**
  - Card: `MISSING`

- [ ] **002/characters/109-honest-john-not-that-honest.test.ts**
  - Card: `002/characters/109-honest-john-not-that-honest.ts`
    - `**EASY STREET** Whenever you play a Floodborn character, each opponent loses 1 lore.`

- [ ] **002/characters/110-lady-tremaine-imperious-queen.test.ts**
  - Card: `002/characters/110-lady-tremaine-imperious-queen.ts`
    - `Shift`
    - `**POWER TO RULE AT LAST** When you play this character, each opponent chooses and banishes one of their characters.`
    - `Opponent being able to choose their own character with ward.`

- [ ] **002/characters/111-lady-tremaine-overbearing-matriarch.test.ts**
  - Card: `002/characters/111-lady-tremaine-overbearing-matriarch.ts`
    - `**NOT FOR YOU** When you play this character, each opponent with more lore than you loses 1 lore.`

- [ ] **002/characters/113-minnie-mouse-stylish-surfer.test.ts**
  - Card: `002/characters/113-minnie-mouse-stylish-surfer.ts`

- [ ] **002/characters/114-minnie-mouse-wide-eyed-diver.test.ts**
  - Card: `002/characters/114-minnie-mouse-wide-eyed-diver.ts`
    - `Shift`
    - `Evasive`
    - `**UNDERSEA ADVENTURE** Whenever you play a second action in a turn, this character gets +2 {L} this turn.`

- [ ] **002/characters/116-mother-gothel-withered-and-wicked.test.ts**
  - Card: `002/characters/116-mother-gothel-withered-and-wicked.ts`
    - `**WHAT HAVE YOU DONE?!** This character enters play with 3 damage.`

- [ ] **002/characters/117-mulan-soldier-in-training.test.ts**
  - Card: `002/characters/117-mulan-soldier-in-training.ts`

- [ ] **002/characters/118-namaari-nemesis.test.ts**
  - Card: `002/characters/118-namaari-nemesis.ts`
    - `**THIS SHOULDN'T TAKE LONG** {E}, Banish this character − Banish chosen character.`

- [ ] **002/characters/119-queen-of-hearts-impulsive-ruler.test.ts**
  - Card: `002/characters/119-queen-of-hearts-impulsive-ruler.ts`

- [ ] **002/characters/119-queen-of-hearts-impulsive-rules.test.ts**
  - Card: `MISSING`

- [ ] **002/characters/120-queen-of-hearts-sensing-weakness.test.ts**
  - Card: `002/characters/120-queen-of-hearts-sensing-weakness.ts`
    - `Shift`
    - `Challenges another character`
    - `Challenges a location`
    - `Let the Game Begin draws card before challenge damage, affecting Jafar's strength`

- [ ] **002/characters/121-ratigan-very-large-mouse.test.ts**
  - Card: `002/characters/121-ratigan-very-large-mouse.ts`
    - `**THIS IS MY KINGDOM** When you play this character, exert chosen opposing character with 3 {S} or less. Chose one of your characters and ready them. They can't quest for the rest of this turn.`
    - `should NOT block the game if there is not valid cards, on the opponent side`
    - `should NOT block the game if there is not valid cards on your side`

- [ ] **002/characters/122-raya-headstrong.test.ts**
  - Card: `002/characters/122-raya-headstrong.ts`
    - `**NOTE TO SELF, DON'T DIE** During your turn, whenever this character banishes another character in a challenge, you may ready this character. She can't quest for the rest of this turn.`

- [ ] **002/characters/123-raya-leader-of-heart.test.ts**
  - Card: `002/characters/123-raya-leader-of-heart.ts`
    - `Shift`
    - `**CHAMPION OF KUMANDRA** Whenever this character challenges a damaged character, she takes no damage from the challenge.`
    - `**CHAMPION OF KUMANDRA** Damaged character target.`

- [ ] **002/characters/125-scar-vicious-cheater.test.ts**
  - Card: `002/characters/125-scar-vicious-cheater.ts`
    - `Rush`
    - `**DADDY ISN'T HERE TO SAVE YOU** During your turn, whenever this character banishes another character in a challenge, you may ready this character. He can't quest for the rest of this turn.`
    - `challenging a location does not ready Scar or set quest restriction`

- [ ] **002/characters/126-shere-khan-menacing-predator.test.ts**
  - Card: `002/characters/126-shere-khan-menacing-predator.ts`
    - `**DON'T INSULT MY INTELLIGENCE** Whenever one of your characters challenges another character, gain 1 lore.`

- [ ] **002/characters/127-tigger-one-of-a-kind.test.ts**
  - Card: `002/characters/127-tigger-one-of-a-kind.ts`
    - `**ENERGETIC** Whenever you play an action, this character gets +2 {S} this turn.`

- [ ] **002/characters/128-tuk-tuk-wrecking-ball.test.ts**
  - Card: `002/characters/128-tuk-tuk-wrecking-ball.ts`

- [ ] **002/characters/137-alice-growing-girl.test.ts**
  - Card: `002/characters/137-alice-growing-girl.ts`
    - `**GOOD ADVICE** Your other characters gain **Support**.`
    - `**WHAT DID I DO?** While this character has 10 {S} or more, she gets +4 {L}.`

- [ ] **002/characters/138-basil-great-mouse-detective.test.ts**
  - Card: `002/characters/138-basil-great-mouse-detective.ts`
    - `Shift`
    - `Not Shift`
    - `Shift`

- [ ] **002/characters/139-basil-of-baker-street.test.ts**
  - Card: `002/characters/139-basil-of-baker-street.ts`

- [ ] **002/characters/142-cogsworth-grandfather-clock.test.ts**
  - Card: `002/characters/142-cogsworth-grandfather-clock.ts`
    - `Shift`
    - `Ward`
    - `Other characters gain Resist`
    - `Multiple Cogsworth should stack resist`
    - `Cogsworth himself doesn't have resist`
    - `Two Cogsworths give resist to one another`
    - `should not be targeted by Let the Storm Rage On`
    - `Resist not working`
    - `Resist not working`

- [ ] **002/characters/143-cogsworth-talking-clock.test.ts**
  - Card: `002/characters/143-cogsworth-talking-clock.ts`
    - `**WAIT A MINUTE** Your character with **Reckless** gain {E} − Gain 1 lore.`

- [ ] **002/characters/144-cruella-de-vil-fashionable-cruiser.test.ts**
  - Card: `002/characters/144-cruella-de-vil-fashionable-cruiser.ts`
    - `Now Get Going`

- [ ] **002/characters/145-cruella-de-vil-perfectly-wretched.test.ts**
  - Card: `002/characters/145-cruella-de-vil-perfectly-wretched.ts`
    - `**OH, NO YOU DON'T** Whenever this character quests, chosen opposing character gets -2 {S} this turn.`
    - `Shift`

- [ ] **002/characters/146-duke-weaselton-small-time-crook.test.ts**
  - Card: `002/characters/146-duke-weaselton-small-time-crook.ts`

- [ ] **002/characters/147-gaston-intellectual-powerhouse.test.ts**
  - Card: `002/characters/147-gaston-intellectual-powerhouse.ts`
    - `has shift`
    - `**DEVELOPED BRAIN** When you play this character, look at the top 3 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **002/characters/148-grand-pabbie-oldest-and-wisest.test.ts**
  - Card: `002/characters/148-grand-pabbie-oldest-and-wisest.ts`
    - `**ANCIENT INSIGHT** Whenever you remove 1 or more damage from one of your characters, gain 2 lore.`
    - `Ancient Insight triggers separately for each character healed`

- [ ] **002/characters/149-hiram-flaversham-toymaker.test.ts**
  - Card: `002/characters/149-hiram-flaversham-toymaker.ts`
    - `When you play this character`
    - `Whenever he quests`
    - `No valid target`

- [ ] **002/characters/150-james-role-model.test.ts**
  - Card: `002/characters/150-james-role-model.ts`
    - `**NEVER, EVER LOSE SIGHT** When this character is banished, you may put this card into your inkwell facedown and exerted.`

- [ ] **002/characters/151-jasmine-heir-of-agrabah.test.ts**
  - Card: `002/characters/151-jasmine-heir-of-agrabah.ts`
    - `**I'M A FAST LEARNER** When you play this character, remove up to 1 damage from chosen character of yours.`
    - `Should not get people stuck when playing alone`

- [ ] **002/characters/152-judy-hopps-optimistic-officer.test.ts**
  - Card: `002/characters/152-judy-hopps-optimistic-officer.ts`
    - `banishing your own item`
    - `banishing your opponent's item`

- [ ] **002/characters/153-mrs-judson-housekeeper.test.ts**
  - Card: `002/characters/153-mrs-judson-housekeeper.ts`
    - `**TIDY UP** Whenever you play a Floodborn character, you may put the top card of your deck into your inkwell facedown and exerted.`

- [ ] **002/characters/154-nick-wilde-wily-fox.test.ts**
  - Card: `002/characters/154-nick-wilde-wily-fox.ts`
    - `should return Pawpsicle from discard to hand`
    - `should NOT return any item from discard to hand`

- [ ] **002/characters/155-noi-orphaned-thief.test.ts**
  - Card: `002/characters/155-noi-orphaned-thief.ts`
    - `item in play`
    - `NO item in play`

- [ ] **002/characters/159-sisu-divine-water-dragon.test.ts**
  - Card: `002/characters/159-sisu-divine-water-dragon.ts`
    - `**I TRUST YOU** Whenever this character quests, look at the top 2 cards of your deck. You may put one into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **002/characters/160-the-nokk-water-spirit.test.ts**
  - Card: `002/characters/160-the-nokk-water-spirit.ts`
    - `has ward`

- [ ] **002/characters/161-winnie-the-pooh-having-a-think.test.ts**
  - Card: `002/characters/161-winnie-the-pooh-having-a-think.ts`
    - `**HUNNY POT** Whenever this character quests, you may put a card from your hand into your inkwell facedown.`

- [ ] **002/characters/171-beast-forbidding-recluse.test.ts**
  - Card: `002/characters/171-beast-forbidding-recluse.ts`
    - `**YOU'RE NOT WELCOME HERE** When you play this character, you may deal 1 damage to chosen character.`

- [ ] **002/characters/172-beast-selfless-protector.test.ts**
  - Card: `002/characters/172-beast-selfless-protector.ts`
    - `**SHIELD ANOTHER** Whenever one of your other characters would be dealt damage, put that many damage counters on this character instead.`

- [ ] **002/characters/173-beast-tragic-hero.test.ts**
  - Card: `002/characters/173-beast-tragic-hero.ts`
    - `No damage`
    - `With Damage`
    - `Drawing a card when the character was banished`

- [ ] **002/characters/174-benja-guardian-of-the-dragon-gem.test.ts**
  - Card: `002/characters/174-benja-guardian-of-the-dragon-gem.ts`
    - `**WE HAVE A CHOICE** When you play this character, you may banish chosen item.`

- [ ] **002/characters/175-chief-bogo-respected-officer.test.ts**
  - Card: `002/characters/175-chief-bogo-respected-officer.ts`
    - `**INSUBORDINATION!** Whenever you play a Floodborn character, deal 1 damage to each opposing character.`
    - `Doesn't trigger opponent's bogo abilitiy when playing a floodborn`

- [ ] **002/characters/176-cinderella-knight-in-training.test.ts**
  - Card: `002/characters/176-cinderella-knight-in-training.ts`
    - `**HAVE COURAGE** When you play this character, you may draw a card, then choose and discard a card.`

- [ ] **002/characters/177-cinderella-stouthearted.test.ts**
  - Card: `002/characters/177-cinderella-stouthearted.ts`
    - `Shift`
    - `Resist`
    - `**THE SINGING SWORD** Whenever you play a song, this character may challenge ready characters this turn.`

- [ ] **002/characters/181-hercules-divine-hero.test.ts**
  - Card: `002/characters/181-hercules-divine-hero.ts`

- [ ] **002/characters/183-jafar-dreadnought.test.ts**
  - Card: `002/characters/183-jafar-dreadnought.ts`
    - `**NOW WHERE WERE WE?** During your turn, whenever this character banishes another character in a challenge, you may draw a card.`

- [ ] **002/characters/184-jafar-royal-vizier.test.ts**
  - Card: `002/characters/184-jafar-royal-vizier.ts`
    - `I don't trust him, sire`

- [ ] **002/characters/185-kronk-junior-chipmunk.test.ts**
  - Card: `002/characters/185-kronk-junior-chipmunk.ts`
    - `Resist 1`
    - `Banish another character in a challenge`

- [ ] **002/characters/186-lawrence-jealous-manservant.test.ts**
  - Card: `002/characters/186-lawrence-jealous-manservant.ts`
    - `has no damage`
    - `damaged`

- [ ] **002/characters/187-li-shang-archery-instructor.test.ts**
  - Card: `002/characters/187-li-shang-archery-instructor.ts`
    - `**ARCHERY LESSON** Whenever this character quests, your characters gain **Evasive** this turn. _(They can challenge characters with Evasive.)_`

- [ ] **002/characters/188-magic-broom-industrial-model.test.ts**
  - Card: `002/characters/188-magic-broom-industrial-model.ts`
    - `**MAKE IT SHINE** When you play this character, chosen character gains **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_`

- [ ] **002/characters/189-namaari-morning-mist.test.ts**
  - Card: `002/characters/189-namaari-morning-mist.ts`
    - `Bodyguard`
    - `**BLADES** This character can challenge ready characters.`

- [ ] **002/characters/192-queen-of-hearts-capricious-monarch.test.ts**
  - Card: `002/characters/192-queen-of-hearts-capricious-monarch.ts`
    - `on challenge`
    - `on removal`

- [ ] **002/characters/193-robin-hood-capable-fighter.test.ts**
  - Card: `002/characters/193-robin-hood-capable-fighter.ts`
    - `**SKIRMISH** {E} − Deal 1 damage to chosen character.`

- [ ] **002/characters/194-the-huntsman-reluctant-enforcer.test.ts**
  - Card: `002/characters/194-the-huntsman-reluctant-enforcer.ts`
    - `**CHANGE OF HEART** Whenever this character quests, you may draw a card, then choose and discard a card.`

- [ ] **002/characters/195-the-prince-never-gives-up.test.ts**
  - Card: `002/characters/195-the-prince-never-gives-up.ts`
    - `Bodyguard`
    - `Resist 1`

- [ ] **002/characters/196-tiana-celebrating-princess.test.ts**
  - Card: `002/characters/196-tiana-celebrating-princess.ts`
    - `Resist 2`
    - `Exerted, No Cards in Hand`
    - `Exerted, With Cards in Hand`
    - `Ready, No Cards in Hand`
    - `Ready, With Cards in Hand`

### items (18 tests)

- [ ] **002/items/033-dragon-gem.test.ts**
  - Card: `002/items/033-dragon-gem.ts`
    - `Returns a character with Support`
    - `Returns a character without Support`
    - `Dragon Gem cannot return Alice - Growing Girl (she doesn't have Support)`
    - `Dragon Gem CAN return Alice if another Alice gives her Support`

- [ ] **002/items/034-sleepy-s-flute.test.ts**
  - Card: `MISSING`
    - `should gain 1 lore if a song was played this turn`
    - `should not gain 1 lore if a song was NOT played this turn`

- [ ] **002/items/065-binding-contract.test.ts**
  - Card: `002/items/065-binding-contract.ts`
    - `**FOR ALL ETERNITY** {E}, {E} one of your characters − Exert chosen character.`

- [ ] **002/items/066-croquet-mallet.test.ts**
  - Card: `002/items/066-croquet-mallet.ts`
    - `**HURTLING HEDGEHOG** Banish this item − Chosen character gains **Rush** this turn. _(They can challenge the turn they're played.)_`

- [ ] **002/items/067-perplexing-signposts.test.ts**
  - Card: `002/items/067-perplexing-signposts.ts`
    - `**TO WONDERLAND** Banish this item – Return chosen character of yours to your hand.`

- [ ] **002/items/068-the-sorcerer-s-spellbook.test.ts**
  - Card: `MISSING`
    - `**KNOWLEDGE** {E}, 1 {I} − Gain 1 lore.`

- [ ] **002/items/102-ratigan-s-marvelous-trap.test.ts**
  - Card: `MISSING`
    - `**SNAP! BOOM! TWANG!** Banish this item − Each opponent loses 2 lore.`

- [ ] **002/items/134-dinner-bell.test.ts**
  - Card: `002/items/134-dinner-bell.ts`
    - `**YOU KNOW WHAT HAPPENS** {E}, 2 {I} − Draw cards equal to the damage on chosen character of yours, then banish them.`
    - `Can target character with 0 damage - draws 0 cards but still banishes`

- [ ] **002/items/135-peter-pan-s-dagger.test.ts**
  - Card: `MISSING`
    - `[Native ability] Your characters with **Evasive** get +1 {S}.`
    - `[Gained ability] Your characters with **Evasive** get +1 {S}.`

- [ ] **002/items/136-sword-in-the-stone.test.ts**
  - Card: `002/items/136-sword-in-the-stone.ts`
    - `{E}, 2 {I} - Chosen character gets +1 {S} this turn for each 1 damage on them.`

- [ ] **002/items/166-fang-crossbow.test.ts**
  - Card: `002/items/166-fang-crossbow.ts`
    - `**CAREFUL AIM** {E}, 2 {I} – Chosen character gets -2 {S} this turn.`
    - `should banish a dragon`
    - `should NOT banish a NON-dragon`

- [ ] **002/items/167-gumbo-pot.test.ts**
  - Card: `002/items/167-gumbo-pot.ts`
    - `should remove 1 damage from 2 characters`
    - `should remove 1 damage from 1 characters`

- [ ] **002/items/168-maurice-s-workshop.test.ts**
  - Card: `MISSING`
    - `**LOOKING FOR THIS?** Whenever you play another item, you may pay 1 {I} to draw a card.`

- [ ] **002/items/169-pawpsicle.test.ts**
  - Card: `002/items/169-pawpsicle.ts`
    - `**JUMBO POP** When you play this item, you may draw a card.`
    - `**THAT'S REDWOOD** Banish this item − Remove up to 2 damage from chosen character.`

- [ ] **002/items/170-sardine-can.test.ts**
  - Card: `002/items/170-sardine-can.ts`
    - `**FLIGHT CABIN** Your exerted characters gain **Ward**. _(Opponents can't choose them except to challenge.)_`

- [ ] **002/items/202-last-cannon.test.ts**
  - Card: `002/items/202-last-cannon.ts`
    - `**ARM YOURSELF** 1 {I}, Banish this item − Chosen character gains **Challenger** +3 this turn. _(They get +3 {S} while challenging.)_`

- [ ] **002/items/203-mouse-armor.test.ts**
  - Card: `002/items/203-mouse-armor.ts`
    - `**PROTECTION** {E} − Chosen character gains **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_`

- [ ] **002/items/204-weight-set.test.ts**
  - Card: `002/items/204-weight-set.ts`
    - `should trigger when playing a character with 4 or more strength`
    - `should not trigger when playing a character with less than 4 strength`

## Set 003

### actions (25 tests)

- [ ] **003/actions/024-99-puppies.test.ts**
  - Card: `003/actions/024-99-puppies.ts`
    - `Whenever one of your characters quests this turn, gain 1 lore.`

- [ ] **003/actions/025-boss-s-orders.test.ts**
  - Card: `003/actions/025-boss-s-orders.ts`
    - `Chosen character gains **Support** this turn. _(Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)_`

- [ ] **003/actions/026-heal-what-has-been-hurt.test.ts**
  - Card: `003/actions/026-heal-what-has-been-hurt.ts`
    - `_(A character with cost 3 or more can {E} to sing this song for free.)_ Remove up to 3 damage from chosen character. Draw a card.`

- [ ] **003/actions/027-quick-patch.test.ts**
  - Card: `003/actions/027-quick-patch.ts`
    - `Remove up to 3 damage from chosen location.`

- [ ] **003/actions/028-the-bare-necessities.test.ts**
  - Card: `003/actions/028-the-bare-necessities.ts`
    - `Chosen opponent reveals their hand and discards a non-character card of your choice.`

- [ ] **003/actions/060-bestow-a-gift.test.ts**
  - Card: `003/actions/060-bestow-a-gift.ts`
    - `Move 1 damage counter from chosen character to chosen opposing character.`

- [ ] **003/actions/061-it-calls-me.test.ts**
  - Card: `003/actions/061-it-calls-me.ts`
    - `Draw a card. Shuffle up to 3 cards from your opponent’s discard into your opponent’s deck.`
    - `Still draws when opp has no cards in discard`

- [ ] **003/actions/062-last-ditch-effort.test.ts**
  - Card: `003/actions/062-last-ditch-effort.ts`
    - `Can play when opponent only has Ward characters - still grants Challenger +2`

- [ ] **003/actions/063-the-boss-is-on-a-roll.test.ts**
  - Card: `003/actions/063-the-boss-is-on-a-roll.ts`
    - `_(A character with cost 3 or more can {E} to sing this song for free.)_Look at the top 5 cards of your deck. Put any number of them on the top or the bottom of your deck in any order. Gain 1 lore.`

- [ ] **003/actions/094-has-set-my-heaaaaaaart-.test.ts**
  - Card: `MISSING`
    - `Banish chosen item.`

- [ ] **003/actions/094-touched-my-heart.test.ts**
  - Card: `003/actions/094-touched-my-heart.ts`
    - `_(A character with cost 2 or more can {E} to sing this song for free.)_Banish chosen item.`

- [ ] **003/actions/095-i-will-find-my-way.test.ts**
  - Card: `003/actions/095-i-will-find-my-way.ts`
    - `_(A character with cost 1 or more can {E} to sing this song for free.)_Chosen character of yours gets +2 {S} this turn. They may move to a location for free.`

- [ ] **003/actions/096-strike-a-good-match.test.ts**
  - Card: `003/actions/096-strike-a-good-match.ts`
    - `Draw 2 cards, then choose and discard a card.`
    - `should not allow resolving discard before draw`

- [ ] **003/actions/128-divebomb.test.ts**
  - Card: `003/actions/128-divebomb.ts`
    - `Banish one of your characters with **Reckless** to banish chosen character with less {S} than that character.`

- [ ] **003/actions/129-i-ve-got-a-dream.test.ts**
  - Card: `003/actions/129-i-ve-got-a-dream.ts`
    - `Ready chosen character of yours at a location. They can't quest for the rest of this turn. Gain lore equal to that location {L}.`

- [ ] **003/actions/130-on-your-feet-now-.test.ts**
  - Card: `MISSING`
    - `Ready all your characters and deal 1 damage to each of them. They can't quest for the rest of this turn.`

- [ ] **003/actions/131-voyage.test.ts**
  - Card: `003/actions/131-voyage.ts`
    - `Moving two characters`
    - `Moving one character`

- [ ] **003/actions/159-distract.test.ts**
  - Card: `003/actions/159-distract.ts`
    - `Chosen character gets -2 {S} this turn. Draw a card.`

- [ ] **003/actions/160-friend-like-me.test.ts**
  - Card: `003/actions/160-friend-like-me.ts`
    - `_(A character with cost 5 or more can exert to sing this song for free.)_Each player puts the top 3 cards of their deck into their inkwell facedown and exerted.`

- [ ] **003/actions/161-how-far-i-ll-go.test.ts**
  - Card: `003/actions/161-how-far-i-ll-go.ts`
    - `Look at the top 2 cards of your deck. Put one into your hand and the other into your inkwell facedown and exerted.`

- [ ] **003/actions/162-repair.test.ts**
  - Card: `003/actions/162-repair.ts`
    - `Remove up to 3 damage from one of your locations or characters.`

- [ ] **003/actions/195-and-then-along-came-zeus.test.ts**
  - Card: `003/actions/195-and-then-along-came-zeus.ts`
    - `should deal 5 damage to chosen character`
    - `should deal 5 damage to chosen location`

- [ ] **003/actions/196-ba-boom-.test.ts**
  - Card: `MISSING`
    - `Deal 2 damage to chosen character.`
    - `Deal 2 damage to chosen location.`

- [ ] **003/actions/197-olympus-would-be-that-way.test.ts**
  - Card: `003/actions/197-olympus-would-be-that-way.ts`
    - `Your characters get +3 {S} this turn while challenging a location.`

- [ ] **003/actions/198-rise-of-the-titans.test.ts**
  - Card: `003/actions/198-rise-of-the-titans.ts`
    - `Banish chosen item.`
    - `Banish chosen location.`

### characters (123 tests)

- [ ] **003/characters/001-baloo-von-bruinwald-xiii.test.ts**
  - Card: `003/characters/001-baloo-von-bruinwald-xiii.ts`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_**LET'S MAKE LIKE A TREE** When this character is banished, gain 2 lore.`

- [ ] **003/characters/002-bernard-brand-new-agent.test.ts**
  - Card: `003/characters/002-bernard-brand-new-agent.ts`
    - `**I’LL CHECK IT OUT** At the end of your turn, if this character is exerted, you may ready another chosen character of yours.`

- [ ] **003/characters/003-chernabog-evildoer.test.ts**
  - Card: `003/characters/003-chernabog-evildoer.ts`
    - `Playing full cost`
    - `One damaged Character`
    - `Five damaged Character`
    - `**SUMMON THE SPIRITS** When you play this character, shuffle all character cards from your discard into your deck.`

- [ ] **003/characters/004-dalmatian-puppy-tail-wagger.test.ts**
  - Card: `003/characters/004-dalmatian-puppy-tail-wagger.ts`
    - `**WHERE DID THEY ALL COME FROM?** You may have up to 99 copies of Dalmatian Puppy - Tail Wagger in your deck.`

- [ ] **003/characters/005-joshua-sweet-the-doctor.test.ts**
  - Card: `003/characters/005-joshua-sweet-the-doctor.ts`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_`

- [ ] **003/characters/007-kida-protector-of-atlantis.test.ts**
  - Card: `MISSING`
    - `**Shift** 3 _(You may pay 3 {I} to play this on top of one of your characters named Kida.)_**PERHAPS WE CAN SAVE OUR FUTURE** When you play this character, all characters get -3 {S} until the start of your next turn.`
    - `**PERHAPS WE CAN SAVE OUR FUTURE** When you play this character, all characters get -3 {S} until the start of your next turn.`

- [ ] **003/characters/008-lucky-the-15th-puppy.test.ts**
  - Card: `MISSING`
    - `**GOOD AS NEW** {E} – Reveal the top 3 cards of your deck. You may put each character card with cost 2 or less into your hand. Put the rest on the bottom of your deck in any order.**PUPPY LOVE** Whenever this character quests, if you have 4 or more other characters in play, your other characters get +1 {L} this turn.`

- [ ] **003/characters/009-minnie-mouse-musical-artist.test.ts**
  - Card: `MISSING`
    - `**Singer** 3 _(This character counts as cost 3 to sing songs.)`
    - `**ENTOURAGE** Whenever you play a character with **Bodyguard**, you may remove up to 2 damage from chosen character.`

- [ ] **003/characters/010-miss-bianca-international-rescue-aid-society-agent.test.ts**
  - Card: `MISSING`
    - `**Singer** 4 _(This character counts as cost 4 to sing songs.)`

- [ ] **003/characters/012-nani-protective-sister.test.ts**
  - Card: `MISSING`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_`

- [ ] **003/characters/014-patch-intimidating-pup.test.ts**
  - Card: `MISSING`
    - `**BARK** {E} – Chosen character gets -2 {S} until the start of your next turn.`

- [ ] **003/characters/015-perdita-devoted-mother.test.ts**
  - Card: `MISSING`
    - `**COME ALONG, CHILDREN** When you play this character and whenever she quests, you may play a character with cost 2 or less from your discard for free.`

- [x] **003/characters/016-piglet-pooh-pirate-captain.test.ts**
  - Card: `003/characters/016-piglet-pooh-pirate-captain.ts`
    - `**AND I'M THE CAPTAIN!** While you have 2 or more other characters in play, this characters gets +2 {L}.`

- [ ] **003/characters/017-pluto-determined-defender.test.ts**
  - Card: `MISSING`
    - `Has Shift`
    - `Guard Dog allows choosing to remove 0 damage`
    - `Has Bodyguard ability`

- [ ] **003/characters/018-pluto-friendly-pooch.test.ts**
  - Card: `MISSING`
    - `**GOOD DOG** {E} – You pay 1 {I} less for the next character you play this turn.`
    - `Good Dog cost reduction applies to Shift cost`

- [ ] **003/characters/019-pongo-determined-father.test.ts**
  - Card: `MISSING`
    - `**TWILIGHT BARK** Once per turn, you may pay 2 {I} to reveal the top card of your deck. If it's a character card, put it into your hand. Otherwise, put it on the bottom of your deck.`
    - `Multiple copies of Pongo can each use Twilight Bark once per turn`
    - `Same Pongo cannot use Twilight Bark twice in one turn`
    - `Pongo returned to hand and replayed can use Twilight Bark again`

- [ ] **003/characters/020-queen-of-hearts-wonderland-empress.test.ts**
  - Card: `MISSING`
    - `**All Ways Here Are My Ways** Whenever this character quests, your other Villain characters get +1 {L} this turn.`

- [ ] **003/characters/021-rolly-hungry-pup.test.ts**
  - Card: `MISSING`
    - `**Support** _(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)_`

- [ ] **003/characters/022-tinker-bell-generous-fairy.test.ts**
  - Card: `MISSING`
    - `**MAKE A NEW FRIEND** When you play this character, look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Place the rest on the bottom of your deck in any order.`

- [ ] **003/characters/035-alice-tea-alchemist.test.ts**
  - Card: `MISSING`
    - `**CURIOUSER AND CURIOUSER** {E} – Exert chosen opposing character and all other opposing characters with the same name.`

- [ ] **003/characters/036-chernabog-s-followers-creatures-of-evil.test.ts**
  - Card: `MISSING`
    - `should banish this character to draw a card`
    - `should not banish this character and not draw`

- [ ] **003/characters/037-diablo-loyal-familiar.test.ts**
  - Card: `MISSING`
    - `**IN SEARCH OF AURORA** Whenever you play a character named Maleficent, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.`

- [ ] **003/characters/038-genie-supportive-friend.test.ts**
  - Card: `MISSING`
    - `**THREE WISHES** Whenever this character quests, you may shuffle this card into your deck to draw 3 cards.`

- [ ] **003/characters/039-hydros-ice-titan.test.ts**
  - Card: `MISSING`
    - `**BLIZZARD** {E} − Exert chosen character.`

- [ ] **003/characters/040-iago-pretty-polly.test.ts**
  - Card: `MISSING`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`

- [ ] **003/characters/041-jafar-lamp-thief.test.ts**
  - Card: `MISSING`
    - `**I AM YOUR MASTER NOW** When you play this character, look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.`

- [ ] **003/characters/042-jafar-striking-illusionist.test.ts**
  - Card: `MISSING`
    - `**Shift** 5 _(You may pay 5 {I} to play this on top of one of your characters named Jafar.)_**Evasive** _(Only characters with Evasive can challenge this character.)_**POWER BEYOND MEASURE** During your turn, while this character is exerted, whenever you draw a card, gain 1 lore.`
    - `_**Evasive** _(Only characters with Evasive can challenge this character.)`
    - `draw a card`
    - `draws many cards`

- [ ] **003/characters/043-lena-sabrewing-rebellious-teenager.test.ts**
  - Card: `MISSING`
    - `**Rush** _(This character can challenge the turn they're played.)_`

- [ ] **003/characters/044-magic-broom-dancing-duster.test.ts**
  - Card: `MISSING`
    - `**ENERGETIC CLEANING** When you play this character, if you have a Sorcerer character in play, exert an opposing character. The chosen character doesn't ready at the start of their next turn.`

- [ ] **003/characters/045-magic-broom-fast-cleaner.test.ts**
  - Card: `MISSING`
    - `**Rush** _(This character can challenge the turn they’re played.)_**CLEAN THIS, CLEAN THAT** When you play this character, you may shuffle all Broom characters from your discard to your deck.`

- [ ] **003/characters/046-magic-broom-the-big-sweeper.test.ts**
  - Card: `MISSING`
    - `**CLEAN SWEEP** While this character is at a location, it gets +2 {S}.`

- [ ] **003/characters/047-magic-carpet-flying-rug.test.ts**
  - Card: `MISSING`
    - `should move a character to a location for free`
    - `Should trigger enter location triggers`

- [ ] **003/characters/049-magica-de-spell-the-midas-touch.test.ts**
  - Card: `MISSING`
    - `All Mine Whenever this character quests, gain lore equal to the cost of one of your items in play.`

- [ ] **003/characters/050-magica-de-spell-thieving-sorceress.test.ts**
  - Card: `MISSING`
    - `**TELEKINESIS** {E} – Return chosen item with cost equal to or less than this character's {S} to its player's hand.`

- [ ] **003/characters/051-maleficent-mistress-of-all-evil.test.ts**
  - Card: `MISSING`
    - `**DARK KNOWLEDGE** Whenever this character quests, you may draw a card.**DIVINATION** During your turn, whenever you draw a card, you may move 1 damage counter from a chosen character to a chosen opposing character.`

- [ ] **003/characters/051-maleficent-mistress-of-evil.test.ts**
  - Card: `MISSING`
    - `**DARK KNOWLEDGE** Whenever this character quests, you may draw a card.**DIVINATION** During your turn, whenever you draw a card, you may move 1 damage counter from a chosen character to a chosen opposing character.`

- [ ] **003/characters/052-mama-odie-voice-of-wisdom.test.ts**
  - Card: `003/characters/052-mama-odie-voice-of-wisdom.ts`
    - `**LISTEN TO YOUR MAMA NOW** Whenever this character quests, you may move up to 2 damage counters from chosen character to chosen opposing character.`

- [ ] **003/characters/053-pua-potbellied-buddy.test.ts**
  - Card: `MISSING`
    - `**ALWAYS THERE** When this character is banished, you may shuffle this card into your deck.`

- [ ] **003/characters/054-rafiki-mystical-fighter.test.ts**
  - Card: `MISSING`
    - `**Challenger** +3 _(While challenging, this character gets +3 {S}.)_**ANCIENT SKILLS** Whenever he challenges a Hyena character, this character takes no damage from the challenge.`
    - `Ancient Skills - Whenever he challenges a Hyena character, this character takes no damage from the challenge.`
    - `can challenge a character with no damage`

- [ ] **003/characters/055-stratos-tornado-titan.test.ts**
  - Card: `MISSING`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_**CYCLONE** {E} – Gain lore equal to the number of Titan characters you have in play.`

- [ ] **003/characters/058-treasure-guardian-protector-of-the-cave.test.ts**
  - Card: `MISSING`
    - `**WHO DISTURBS MY SLUMBER?** This character can't challenge or quest unless it is at a location.`

- [ ] **003/characters/059-ursula-sea-witch.test.ts**
  - Card: `MISSING`
    - `Can target a ready character with You're Too Late`
    - `You're Too Late does not exert the chosen character`
    - `Targeted character cannot ready at start of their next turn if exerted`

- [ ] **003/characters/069-cubby-mighty-lost-boy.test.ts**
  - Card: `MISSING`
    - `**THE BEAR** Whenever this character moves to a location, he gets +3 {S} this turn.`

- [ ] **003/characters/070-cursed-merfolk-ursula-s-handiwork.test.ts**
  - Card: `MISSING`
    - `**POOR SOULS** Whenever this character is challenged, each opponent chooses and discards a card.`
    - `Not having card to discard`
    - `Accepting the draw`
    - `Skipping the draw`

- [ ] **003/characters/071-don-karnage-pirate-prince.test.ts**
  - Card: `MISSING`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`

- [ ] **003/characters/072-flotsam-riffraff.test.ts**
  - Card: `MISSING`
    - `**EERIE PAIR** Your characters named Jetsam get +3 {S}.`

- [ ] **003/characters/073-friar-tuck-priest-of-nottingham.test.ts**
  - Card: `MISSING`
    - `Same amount of cards in hand`
    - `No cards in hand`
    - `opponent has more`
    - `active player has more`

- [ ] **003/characters/074-helga-sinclair-femme-fatale.test.ts**
  - Card: `MISSING`
    - `**Shift** 3 _(You may pay 3 {I} to play this on top of one of your characters named Helga Sinclair.)_**THIS CHANGES EVERYTHING** Whenever this character quests, you may deal 3 damage to chosen damaged character.`

- [ ] **003/characters/075-helga-sinclair-vengeful-partner.test.ts**
  - Card: `MISSING`
    - `**NOTHING PERSONAL** When this character is challenged and banished, banish the challenging character.`

- [ ] **003/characters/076-jetsam-riffraff.test.ts**
  - Card: `MISSING`
    - `**Ward** _(Opponents can't choose this character except to challenge.)_**EERIE PAIR** Your characters named Flotsam gain **Ward**.`

- [ ] **003/characters/077-kit-cloudkicker-tough-guy.test.ts**
  - Card: `MISSING`
    - `**SKYSURFING** When you play this character, you may return chosen opposing character with 2 {S} or less to their player's hand.`
    - `regression check - cannot bounce targets with 3 attack or more`

- [ ] **003/characters/078-lyle-tiberius-rourke-cunning-mercenary.test.ts**
  - Card: `MISSING`
    - `**WELL, NOW YOU KNOW** When you play this character, chosen opposing character gains **Reckless** during their next turn. _(They can’t quest and must challenge if able.)`
    - `Whenever one of your other characters is banished, each opponent loses 1 lore.`
    - `Whenever one of your other characters is banished, each opponent loses 1 lore. (Should not trigger on himself)`
    - `Grab your Sword Interaction`
    - `Be prepared interaction`
    - `Be prepared interaction + 2 Lyles`

- [ ] **003/characters/080-milo-thatch-king-of-atlantis.test.ts**
  - Card: `MISSING`
    - `**Shift** 4 _(You may pay 4 ink to play this on top of one of your characters named Milo Thatch.)_**TAKE THEM BY SURPRISE** When this character is banished, return all opposing characters to their players’ hands.`

- [ ] **003/characters/081-morph-space-goo.test.ts**
  - Card: `MISSING`
    - `**MIMICRY** You may play any character with **Shift** on this character as if this character had any name.`

- [ ] **003/characters/082-peter-pan-lost-boy-leader.test.ts**
  - Card: `003/characters/082-peter-pan-lost-boy-leader.ts`
    - `**I CAME TO LISTEN TO THE STORIES** Once per turn, when this character moves to a location, gain lore equal to that location's {L}.`

- [ ] **003/characters/083-prince-john-false-king.test.ts**
  - Card: `MISSING`
    - `Same lore`
    - `Opponent with more lore`

- [ ] **003/characters/085-shenzi-hyena-pack-leader.test.ts**
  - Card: `MISSING`
    - `**I WILL DO IT** When this character is at a location, she gets +3 {S}.`
    - `**WHAT’S THE HURRY?** When this character is at a location, when she challenges another character, you may draw a card.`

- [ ] **003/characters/086-sir-hiss-aggravating-asp.test.ts**
  - Card: `MISSING`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`

- [ ] **003/characters/087-skippy-energetic-rabbit.test.ts**
  - Card: `MISSING`
    - `**Ward** _(Opponents can't choose this character except to challenge.)_`

- [ ] **003/characters/089-stitch-covert-agent.test.ts**
  - Card: `MISSING`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_**HIDE** While this character is at a location, he gains **Ward**. _(Opponents can't choose them except to challenge.)_`

- [ ] **003/characters/090-ursula-deceiver.test.ts**
  - Card: `MISSING`
    - `**YOU'LL NEVER EVEN MISS IT** When you play this character, chosen opponent reveals their hand and discards a song card of your choice.`

- [ ] **003/characters/091-ursula-deceiver-of-all.test.ts**
  - Card: `MISSING`
    - `**WHAT A DEAL** Whenever this character sings a song, you may play that song again from your discard for free, then put it on the bottom of your deck.`

- [ ] **003/characters/092-wildcat-mechanic.test.ts**
  - Card: `MISSING`
    - `**DISASSEMBLE** {E} – Banish chosen item.`

- [ ] **003/characters/093-zazu-pride-land-s-manager.test.ts**
  - Card: `MISSING`
    - `**IT’S TIME TO LEAVE!** While this character is at a location, he gets +1 lore.`

- [ ] **003/characters/103-ariel-adventurous-collector.test.ts**
  - Card: `MISSING`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_**INSPIRING VOICE** Whenever you play a song, chosen character of yours gains **Evasive** until the start of your next turn.`

- [ ] **003/characters/105-captain-hook-master-swordsman.test.ts**
  - Card: `MISSING`
    - `**NEMESIS** During your turn, whenever this character banishes another character in a challenge, ready this character. He can't quest for the rest of this turn.`

- [ ] **003/characters/106-della-duck-unstoppable-mom.test.ts**
  - Card: `MISSING`
    - `**Reckless** _(This character can't quest and must challenge each turn if able.)_`

- [ ] **003/characters/107-heihei-accidental-explorer.test.ts**
  - Card: `MISSING`
    - `**MINDLESS WANDERING** Once per turn, when this character moves to a location, each opponent loses 1 lore.`

- [ ] **003/characters/108-hydra-deadly-serpent.test.ts**
  - Card: `MISSING`
    - `receives damage from action card`
    - `receives damage from challenge and dies`
    - `Cancels effect when it doesn't find a valid target`

- [ ] **003/characters/109-jim-hawkins-space-traveler.test.ts**
  - Card: `MISSING`
    - `**THIS IS IT!** When you play this character, you may play a location with cost 4 or less for free.`
    - `**TAKE THE HELM** Whenever you play a location, this character may move there for free.`

- [ ] **003/characters/111-kakamora-menacing-sailor.test.ts**
  - Card: `MISSING`
    - `**PLUNDER** When you play this character, each opponent loses 1 Lore.`

- [ ] **003/characters/112-madame-medusa-the-boss.test.ts**
  - Card: `MISSING`
    - `**THAT TERRIBLE WOMAN** When you play this character, banish chosen opposing character with 3 {S} or less.`

- [ ] **003/characters/113-maui-winged-demigod.test.ts**
  - Card: `MISSING`
    - `**Reckless** _(They can’t quest and must challenge if able.)_`
    - `**IN MY STOMACH** Whenever one of your characters named Heihei quests, this character gets +1 {L} and loses **Reckless** for this turn.`

- [ ] **003/characters/114-maui-whale.test.ts**
  - Card: `MISSING`
    - `**THIS MISSION IS CURSED** This character doesn’t ready at the start of the turn.`
    - `**DON’T WORRY, I’M HERE** 2 {I} - Ready this character, this character can’t quest for the rest of this turn.`

- [ ] **003/characters/115-milo-thatch-spirited-scholar.test.ts**
  - Card: `MISSING`
    - `**I’M YOUR MAN!** While this character is at a location, he gets +2 {S}.`

- [ ] **003/characters/116-moana-born-leader.test.ts**
  - Card: `MISSING`
    - `**Shift** 3 (_You may pay 3 {I} to play this on top of one of your characters named Moana._)`
    - `**WELCOME TO MY BOAT** Whenever this character quests while at a location, ready all other characters here. They can't quest for the rest of this turn.`

- [ ] **003/characters/117-moana-undeterred-voyager.test.ts**
  - Card: `MISSING`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`

- [ ] **003/characters/119-peter-pan-never-land-hero.test.ts**
  - Card: `MISSING`
    - `**Rush** _(This character can challenge the turn they're played.)_**OVER HERE, TINK** While you have a character named Tinker Bell in play, this character gets +2 {S}.`

- [ ] **003/characters/120-peter-pan-pirate-s-bane.test.ts**
  - Card: `MISSING`
    - `**Shift** 4 _(You may pay 4 ink to play this on top of one of your characters named Peter Pan.)_**Evasive** _(Only characters with Evasive can challenge this character.)_**YOU’RE NEXT!** Whenever he challenges a Pirate character, this character takes no damage from the challenge.`

- [ ] **003/characters/121-prince-eric-expert-helmsman.test.ts**
  - Card: `MISSING`
    - `**SURPRISE MANEUVER** When this character is banished, you may banish chosen character.`

- [ ] **003/characters/122-scroop-backstabber.test.ts**
  - Card: `MISSING`
    - `**BRUTE** While this character has damage, he gets +3 {S}.`

- [ ] **003/characters/124-slightly-lost-boy.test.ts**
  - Card: `MISSING`
    - `**THE FOX** If you have a character named Peter Pan in play, you pay 1 {I} less to play this character.**Evasive** _(Only characters with Evasive can challenge this character.)_`

- [ ] **003/characters/125-stitch-little-rocket.test.ts**
  - Card: `MISSING`
    - `**Rush** _(This character can challenge the turn they’re played.)_`

- [ ] **003/characters/126-trigger-imprecise-shooter.test.ts**
  - Card: `MISSING`
    - `**MY OL' BETSY** Your characters named Nutsy gain +1 {L}.`

- [ ] **003/characters/137-audrey-ramirez-the-engineer.test.ts**
  - Card: `MISSING`
    - `**SPARE PARTS** Whenever this character quests, ready one of your items.`

- [ ] **003/characters/138-captain-amelia-first-in-command.test.ts**
  - Card: `MISSING`
    - `**DISCIPLINE** During your turn, this character gains **Evasive**. _(They can challenge characters with Evasive.)_`

- [ ] **003/characters/139-dewey-showy-nephew.test.ts**
  - Card: `MISSING`
    - `**Support** _(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)_`

- [ ] **003/characters/140-flintheart-glomgold-lone-cheater.test.ts**
  - Card: `MISSING`
    - `**THEY'LL NEVER SEE IT COMING!** During your turn, this character gains **Evasive**. _(They can challenge characters with Evasive.)_`

- [ ] **003/characters/142-gramma-tala-keeper-of-ancient-stories.test.ts**
  - Card: `MISSING`
    - `**THERE WAS ONLY OCEAN** When you play this character, look at the top 2 cards of your deck. You may add one into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **003/characters/143-gramma-tala-spirit-of-the-ocean.test.ts**
  - Card: `MISSING`
    - `Adding card from hand to inkwell should give +1 lore`
    - `cards with effect that add to inkwell should also trigger ability`
    - `should gain lore when opponent puts cards into your inkwell`
    - `should not gain lore when opponent puts gramma into your inkweel`

- [ ] **003/characters/144-gyro-gearloose-gadget-genius.test.ts**
  - Card: `MISSING`
    - `**FOLLOW THE TWISTS OF MY GENIUS BRAIN** {E} - Put an item card from your discard to the top of your deck.`

- [ ] **003/characters/145-huey-savvy-nephew.test.ts**
  - Card: `MISSING`
    - `**Support** _(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)_**THREE NEPHEWS** Whenever this character quests, if you have characters named Dewey and Louie in play, you may draw 3 cards.`

- [ ] **003/characters/147-kit-cloudkicker-navigator.test.ts**
  - Card: `MISSING`
    - `**Shift** 3 _(You may pay 3 {I} to play this on top of one of your characters named Kit Cloudkicker.)_**Ward** _(Opponents can't choose this character except to challenge.)_`

- [ ] **003/characters/148-kit-cloudkicker-spunky-bear-cub.test.ts**
  - Card: `MISSING`
    - `**Ward** (Opponents can't choose this character except to challenge.)`

- [ ] **003/characters/149-louie-chill-nephew.test.ts**
  - Card: `MISSING`
    - `**Support** _(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)_`

- [ ] **003/characters/150-lady-marian-adorable-dreamer.test.ts**
  - Card: `MISSING`
    - `ELEGANT AND NOBLE LADY: When you play this character, chosen character gets -2 {S} for this turn.`

- [ ] **003/characters/151-mama-odie-mystical-maven.test.ts**
  - Card: `MISSING`
    - `**THIS GOING TO BE GOOD** Whenever you play a song, you may put the top card of your deck into your inkwell facedown and exerted.`

- [ ] **003/characters/153-rufus-orphanage-cat.test.ts**
  - Card: `MISSING`
    - `**A LITTLE TOO OLD TO HUNT MICE** When this character is banished, you may put this card into your inkwell facedown and exerted.`

- [ ] **003/characters/154-scrooge-mcduck-richest-duck-in-the-world.test.ts**
  - Card: `MISSING`
    - `**I DIDN'T GET RICH BY BEING STUPID** During your turn, whenever this character banishes another character in a challenge, you may play an item for free.`

- [ ] **003/characters/155-scrooge-mcduck-uncle-moneybags.test.ts**
  - Card: `MISSING`
    - `TREASURE FINDER  Whenever this character quests, you pay 1 {I} less for the next item you play this turn.`

- [ ] **003/characters/156-the-queen-mirror-seeker.test.ts**
  - Card: `MISSING`
    - `**CALCULATING AND VAIN** Whenever this character quests, you may look at the top 3 cards of your deck and put them back in any order.`

- [ ] **003/characters/157-tinker-bell-very-clever-fairy.test.ts**
  - Card: `MISSING`
    - `**I CAN USE THAT** Whenever one of your items is banished, you may put that card into your inkwell facedown and exerted.`

- [ ] **003/characters/158-wendy-darling-authority-on-peter-pan.test.ts**
  - Card: `003/characters/158-wendy-darling-authority-on-peter-pan.ts`
    - `**Ward** _(Opponents can't choose this character except to challenge.)`
    - `**Support** _(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)_`

- [ ] **003/characters/172-eeyore-overstuffed-donkey.test.ts**
  - Card: `003/characters/172-eeyore-overstuffed-donkey.ts`
    - `**Resist** +1 _(Damage dealt to this character is reduced by 1.)_`

- [ ] **003/characters/173-gustav-the-giant-terror-of-the-kingdom.test.ts**
  - Card: `MISSING`
    - `**ALL TIED UP** This character enters play exerted and can't ready at the start of your turn.`
    - `Banished in a challenge`
    - `Banished by an action card`

- [ ] **003/characters/174-hades-wrathful-ruler.test.ts**
  - Card: `MISSING`
    - `**CALLING THE TITANS** {E} – Ready your Titan characters.`

- [ ] **003/characters/175-helga-sinclair-right-hand-woman.test.ts**
  - Card: `MISSING`
    - `**Challenger** +2 _(While challenging, this character gets +2 {S}.)_`

- [ ] **003/characters/176-john-silver-greedy-treasure-seeker.test.ts**
  - Card: `MISSING`
    - `For each location you have in play, this character gets +1 {L}.`
    - `For each location you have in play, this character gains **Resist** +1.`

- [ ] **003/characters/177-kida-royal-warrior.test.ts**
  - Card: `MISSING`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_`

- [ ] **003/characters/178-little-john-resourceful-outlaw.test.ts**
  - Card: `MISSING`
    - `**Shift** 4 _(You may pay 4 {I} to play this on top of one of your characters named Little John.)_**OKAY, BIG SHOT** While this character is exerted, your characters with **Bodyguard** gain **Resist** +1 and get +1 {L}. _(Damage dealt to them is reduced by 1.)_`

- [ ] **003/characters/179-little-john-robin-s-companion.test.ts**
  - Card: `MISSING`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_**DISGUISED** During your turn, this character gains **Evasive**. _(They can challenge characters with Evasive.)_`

- [ ] **003/characters/180-lythos-rock-titan.test.ts**
  - Card: `MISSING`
    - `**Resist** +2 _(Damage dealt to this character is reduced by 2.)_**STONE SKIN** {E} − Chosen character gains **Resist** +2 this turn.`

- [ ] **003/characters/181-mickey-mouse-stalwart-explorer.test.ts**
  - Card: `MISSING`
    - `**LET'S TAKE A LOOK** This character gets +1 {S} for each location you have in play.`

- [ ] **003/characters/182-mickey-mouse-trumpeter.test.ts**
  - Card: `MISSING`
    - `Sound the Call allows playing character normally for free`

- [ ] **003/characters/183-minnie-mouse-funky-spelunker.test.ts**
  - Card: `003/characters/183-minnie-mouse-funky-spelunker.ts`
    - `**JOURNEY** While this character is at a location, she gets +2 {S}.`

- [x] **003/characters/184-mr-smee-bumbling-mate.test.ts**
  - Card: `003/characters/184-mr-smee-bumbling-mate.ts`
    - `Mr. Smee is exerted, Opponent has a Captain in play`
    - `when a captain in play, does NOT deal one damage to itself`
    - `when a captain in NOT in play, deals one damage to itself`
    - `when a captain in play, does NOT deal one damage to itself`
    - `when a captain in NOT in play, does NOT deal one damage to itself`
    - `Mr Smee is not taking damage`
    - `Sing`

- [ ] **003/characters/187-pyros-lava-titan.test.ts**
  - Card: `MISSING`
    - `**ERUPTION** During your turn, whenever this character banishes another character in a challenge, you may ready chosen character.`

- [ ] **003/characters/188-razoul-palace-guard.test.ts**
  - Card: `MISSING`
    - `**LOOKY HERE** While this character has no damage, he gets +2 {S}.`

- [ ] **003/characters/190-robin-hood-champion-of-sherwood.test.ts**
  - Card: `MISSING`
    - `should gain 2 lore when banishes another character in a challenge during your turn`
    - `should not gain 2 lore when banishes another character in a challenge during opponents turn`
    - `should not trigger from its own banish during challenge`
    - `When is banished in a challenge in your turn, you may draw a card.`
    - `When is banished in a challenge you may draw a card.`

- [ ] **003/characters/191-sheriff-of-nottingham-corrupt-official.test.ts**
  - Card: `MISSING`
    - `**TAXES SHOULD HURT** Whenever you discard a card, you may deal 1 damage to chosen opposing character.`
    - `should not trigger if opponent discards`

- [ ] **003/characters/192-simba-fighting-prince.test.ts**
  - Card: `MISSING`
    - `On play`

- [ ] **003/characters/193-simba-rightful-king.test.ts**
  - Card: `MISSING`
    - `**TRIUMPHANT STANCE** During your turn, whenever this character banishes another character in a challenge, chosen opposing character can't challenge during their next turn.`

- [ ] **003/characters/194-thaddeus-e-klang-metal-head.test.ts**
  - Card: `MISSING`
    - `**SHARP JAW** Whenever this character quests while at a location, you may deal 1 damage to chosen character.`

### items (18 tests)

- [ ] **003/items/029-cleansing-rainwater.test.ts**
  - Card: `003/items/029-cleansing-rainwater.ts`
    - `Remove 2 damage from characters`
    - `Remove up to 2 damage from characters`

- [ ] **003/items/030-heart-of-atlantis.test.ts**
  - Card: `003/items/030-heart-of-atlantis.ts`
    - `**LIFE GIVER** {E} – You pay 2 {I} less for the next character you play this turn.`

- [ ] **003/items/031-wildcat-s-wrench.test.ts**
  - Card: `003/items/031-wildcat-s-wrench.ts`
    - `**REBUILD** {E} – Remove up to 2 damage from chosen location.`

- [ ] **003/items/064-the-lamp.test.ts**
  - Card: `003/items/064-the-lamp.ts`
    - `should draw 2 cards if you have a character named Jafar in play`
    - `should return a character with cost 4 or less to their player's hand if you have a character named Genie in play`
    - `should do both if you have both characters in play`
    - `should do nothing if you don't have a character named Jafar or Genie in play`
    - `Cost reduction should not be applied to the Lamp's effect`

- [ ] **003/items/065-the-sorcerer-s-hat.test.ts**
  - Card: `003/items/065-the-sorcerer-s-hat.ts`
    - `Hit`
    - `Miss`

- [ ] **003/items/097-airfoil.test.ts**
  - Card: `003/items/097-airfoil.ts`
    - `**I GOT TO BE GOING** -> Do nothing on <2 actions played`
    - `**I GOT TO BE GOING** -> Draw 1`

- [ ] **003/items/098-robin-s-bow.test.ts**
  - Card: `003/items/098-robin-s-bow.ts`
    - `**A BIT OF A LARK** Whenever a character of yours named Robin Hood quests, you may ready this item.`
    - `**FOREST’S GIFT** {E} – Deal 1 damage to chosen damaged character or location.**A BIT OF A LARK** Whenever a character of yours named Robin Hood quests, you may ready this item.`

- [ ] **003/items/099-starlight-vial.test.ts**
  - Card: `003/items/099-starlight-vial.ts`
    - `**EFFICIENT ENERGY** {E} – You pay 2 {I} less for the next action you play this turn.**TRAP** 2 {I}, Banish this item – Draw 2 cards, then choose and discard a card.`

- [ ] **003/items/132-maui-s-fish-hook.test.ts**
  - Card: `003/items/132-maui-s-fish-hook.ts`
    - `**IT'S MAUI TIME!** If you have a character named Maui in play, you may use this item's Shapeshift ability for free.`
    - `Mode one`
    - `Mode two`

- [ ] **003/items/133-sumerian-talisman.test.ts**
  - Card: `003/items/133-sumerian-talisman.ts`
    - `**SOURCE OF MAGIC** During your turn, whenever one of your characters is banished in a challenge, you may draw a card.`

- [ ] **003/items/163-aurelian-gyrosensor.test.ts**
  - Card: `003/items/163-aurelian-gyrosensor.ts`
    - `**SEEKING KNOWLEDGE** Whenever one of your characters quests, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.`

- [ ] **003/items/164-heart-of-te-fiti.test.ts**
  - Card: `003/items/164-heart-of-te-fiti.ts`
    - `**CREATE LIFE** {E}, 2 {I} – Put the top card of your deck into your inkwell facedown and exerted.`

- [ ] **003/items/165-lucky-dime.test.ts**
  - Card: `003/items/165-lucky-dime.ts`
    - `**NUMBER ONE** {E}, 2 {I} − Choose a character of yours and gain lore equal to their {L}.`

- [ ] **003/items/166-scrooge-s-top-hat.test.ts**
  - Card: `003/items/166-scrooge-s-top-hat.ts`
    - `**BUSINESS EXPERTISE** {E} – You pay 1 {I} less for the next item you play this turn.`

- [ ] **003/items/167-vault-door.test.ts**
  - Card: `003/items/167-vault-door.ts`
    - `Your locations gain **Resist** +1`
    - `Your characters at locations gain **Resist** +1`
    - `Your characters outside locations DONT gain **Resist** +1`

- [ ] **003/items/199-captain-hook-s-rapier.test.ts**
  - Card: `003/items/199-captain-hook-s-rapier.ts`
    - `**GET THOSE SCURVY BRATS!** During your turn, whenever one of your characters banishes another character in a challenge, you may pay 1 {I} to draw a card.**LET’S HAVE AT IT!</** Your characters named Captain Hook gain **Challenger** +1. _(They get +1 {S} while challenging.)_`

- [ ] **003/items/200-gizmosuit.test.ts**
  - Card: `003/items/200-gizmosuit.ts`
    - `**CYBERNETIC ARMOR** Banish this item – Chosen character gains **Resist** +2 until the start of your next turn. (Damage dealt to them is reduced by 2.)`

- [ ] **003/items/201-map-of-treasure-planet.test.ts**
  - Card: `003/items/201-map-of-treasure-planet.ts`
    - `**KEY TO THE PORTAL** {E} – You pay 1 {I} less for the next location you play this turn.`
    - `**Show the Way** You pay 1 {I} less to move your characters to a location.`

### locations (17 tests)

- [ ] **003/locations/032-never-land-mermaid-lagoon.test.ts**
  - Card: `003/locations/032-never-land-mermaid-lagoon.ts`
    - `TODO`

- [ ] **003/locations/033-pride-lands-pride-rock.test.ts**
  - Card: `003/locations/033-pride-lands-pride-rock.ts`
    - `**WE ARE ALL CONNECTED** Characters get +2 {W} while here.**LION HOME** If you have a Prince or King character here, you pay 1 {I} less to play characters.`
    - `**LION HOME** If you have a Prince or King character here, you pay 1 {I} less to play characters.`

- [ ] **003/locations/034-tiana-s-palace-jazz-restaurant.test.ts**
  - Card: `MISSING`
    - `**NIGHT OUT** Characters can't be challenged while here.`

- [ ] **003/locations/066-forbidden-mountain-maleficent-s-castle.test.ts**
  - Card: `MISSING`
    - `TODO`

- [ ] **003/locations/067-the-queen-s-castle-mirror-chamber.test.ts**
  - Card: `MISSING`
    - `**USING THE MIRROR** At the start of your turn, for each character you have here, you may draw a card.`

- [ ] **003/locations/068-the-sorcerer-s-tower-wondrous-workspace.test.ts**
  - Card: `MISSING`
    - `**BROOM CLOSET** Your characters named Magic Broom may move here for free.`
    - `**MAGICAL POWER** Characters get +1 {L} while here.`

- [ ] **003/locations/101-fang-river-city.test.ts**
  - Card: `003/locations/101-fang-river-city.ts`
    - `Characters gain **Ward** and **Evasive** while here.`
    - `Characters gain **Evasive** while here.`

- [ ] **003/locations/102-kuzco-s-palace-home-of-the-emperor.test.ts**
  - Card: `MISSING`
    - `**CITY WALLS** Whenever a character is challenged and banished while here, banish the challenging character.`

- [ ] **003/locations/134-agrabah-marketplace.test.ts**
  - Card: `003/locations/134-agrabah-marketplace.ts`
    - `TODO`

- [ ] **003/locations/135-jolly-roger-hook-s-ship.test.ts**
  - Card: `MISSING`
    - `should grant Rush to characters`
    - `should allow Pirate characters to move for free`

- [ ] **003/locations/136-rls-legacy-solar-galleon.test.ts**
  - Card: `003/locations/136-rls-legacy-solar-galleon.ts`
    - `**THIS IS OUR SHIP** Characters gain **Evasive** while here. _(Only characters with Evasive can challenge them.)_`
    - `**HEAVE TOGETHER NOW** If you have a character here, you pay 2 {I} less to move a character of yours here.`

- [ ] **003/locations/168-belle-s-house-maurice-s-workshop.test.ts**
  - Card: `MISSING`
    - `**LABORATORY** If you have a character here, you pay 1 {I} less to play items.`

- [ ] **003/locations/169-mcduck-manor-scrooge-s-mansion.test.ts**
  - Card: `MISSING`
    - `TOdo`

- [ ] **003/locations/170-motunui-island-paradise.test.ts**
  - Card: `003/locations/170-motunui-island-paradise.ts`
    - `**REINCARNATION** Whenever a character is banished while here, you may put that card into your inkwell facedown and exerted.`

- [ ] **003/locations/202-maui-s-place-of-exile-hidden-island.test.ts**
  - Card: `MISSING`
    - `**ISOLATED** Characters gain **Resist** +1 while here. _(Damage dealt to them is reduced by 1.)_`

- [ ] **003/locations/203-nottingham-prince-john-s-castle.test.ts**
  - Card: `MISSING`
    - `TODO`

- [ ] **003/locations/204-the-bayou-mysterious-swamp.test.ts**
  - Card: `003/locations/204-the-bayou-mysterious-swamp.ts`
    - `**SHOW ME THE WAY** Whenever a character quests while here, you may draw a card, then choose and discard a card.`

## Set 004

### actions (28 tests)

- [ ] **004/actions/026-bruno-s-return.test.ts**
  - Card: `MISSING`
    - `Return a character card from your discard to your hand. Then remove up to 2 damage from chosen character.`

- [ ] **004/actions/027-first-aid.test.ts**
  - Card: `004/actions/027-first-aid.ts`
    - `Remove up to 1 damage from each of your characters.`

- [ ] **004/actions/028-look-at-this-family.test.ts**
  - Card: `004/actions/028-look-at-this-family.ts`
    - `**Sing Together** 7 _(Any number of your of your teammates' characters with total cost 7 or more may {E} to sing this song for free.)_Look at the top 5 cards of your deck. You may reveal up to 2 character cards and put them into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **004/actions/029-lost-in-the-woods.test.ts**
  - Card: `004/actions/029-lost-in-the-woods.ts`
    - `_(A character with cost 4 or more can {E} to sing this song for free.)_All opposing characters get -2 {S} until the start of your next turn.`

- [ ] **004/actions/030-sign-the-scroll.test.ts**
  - Card: `004/actions/030-sign-the-scroll.ts`
    - `Each opponent may chose and discard a chard. For each opponent who doesn't, you gain 2 lore.`

- [ ] **004/actions/060-poor-unfortunate-souls.test.ts**
  - Card: `004/actions/060-poor-unfortunate-souls.ts`
    - `_(A character with cost 2 or more can {E} to sing this song for free.)_Return a character, item or location with cost 2 or less to their player's hand.`

- [ ] **004/actions/061-second-star-to-the-right.test.ts**
  - Card: `004/actions/061-second-star-to-the-right.ts`
    - `**Sing Together** 10 _(Any number of your of your teammates' characters with total cost 10 or more may {E} to sing this song for free.)_`
    - `Opponent draws 5`
    - `Active player draws 5`

- [ ] **004/actions/062-swing-into-action.test.ts**
  - Card: `004/actions/062-swing-into-action.ts`
    - `Chosen character gains **Rush** this turn. _(They can challenge the turn they're played.)_`

- [ ] **004/actions/063-ursula-s-plan.test.ts**
  - Card: `MISSING`
    - `Each opponent chooses and exerts one of their characters. Those characters can't ready at the start of their next turn.`

- [ ] **004/actions/093-dodge-.test.ts**
  - Card: `MISSING`
    - `Chosen character gains **Ward** and **Evasive** until the start of your next turn. _(Opponents can't choose them except to challenge. Only characters with Evasive can challenge them.)_`

- [ ] **004/actions/093-dodge.test.ts**
  - Card: `004/actions/093-dodge.ts`
    - `Chosen character gains **Ward** and **Evasive** until the start of your next turn. _(Opponents can't choose them except to challenge. Only characters with Evasive can challenge them.)_`

- [ ] **004/actions/094-make-the-potion.test.ts**
  - Card: `004/actions/094-make-the-potion.ts`
    - `Choose one:· Banish chosen item.· Deal 2 damage to chosen damaged character.`

- [ ] **004/actions/095-under-the-sea.test.ts**
  - Card: `004/actions/095-under-the-sea.ts`
    - `Put all opposing characters with 2 {S} or less on the bottom of their players' decks in any order.`
    - `When oppo plays lilo that give 2 {S} all char only for this turn`

- [ ] **004/actions/096-ursula-s-trickery.test.ts**
  - Card: `MISSING`
    - `Each opponent may choose and discard a card. For each opponent who doesn't, you draw a card.`

- [ ] **004/actions/097-we-don-t-talk-about-bruno.test.ts**
  - Card: `MISSING`
    - `should return  opponent chosen character to their player's hand and discard opponent card`
    - `should return  opponent chosen character to their player's hand and discard opponent card`
    - `Return chosen character to their player's hand, then that player discards a card at random.`
    - `No cards in hand and a single card in play`
    - `Should not discard from hand if no valid target to return to hand`

- [ ] **004/actions/128-a-pirate-s-life.test.ts**
  - Card: `MISSING`
    - `Each opponent loses 2 lore. You gain 2 lore.`

- [ ] **004/actions/129-be-king-undisputed.test.ts**
  - Card: `004/actions/129-be-king-undisputed.ts`
    - `Each opponent chooses and banishes one of their characters.`
    - `Only targetable character has ward`

- [ ] **004/actions/130-brawl.test.ts**
  - Card: `004/actions/130-brawl.ts`
    - `Banish chosen character with 2 {S} or less.`

- [ ] **004/actions/162-dig-a-little-deeper.test.ts**
  - Card: `004/actions/162-dig-a-little-deeper.ts`
    - `**Sing Together** 8 _(Any number of your of your teammates' characters with total cost 8 or more may {E} to sing this song for free.)_Look at the top 7 cards of your deck. Put 2 into your hand. Put the rest on teh bottom of your deck in any order.`

- [ ] **004/actions/163-glaner.test.ts**
  - Card: `MISSING`
    - `Choisissez un objet et bannissez-le. Son propriétaire gagne 2 éclats de Lore.`

- [ ] **004/actions/163-glean.test.ts**
  - Card: `004/actions/163-glean.ts`
    - `Targeting your own card`
    - `Targeting opponent's card`

- [ ] **004/actions/164-seldom-all-they-seem.test.ts**
  - Card: `004/actions/164-seldom-all-they-seem.ts`
    - `_(A character with cost 2 or more can {E} to sing this song for free.)_Chosen character gets -3 {S} this turn.`

- [ ] **004/actions/165-treasures-untold.test.ts**
  - Card: `004/actions/165-treasures-untold.ts`
    - `_(A character with cost 6 or more can {E} to sing this song for free.)_Return up to 2 item cards from your discard into your hand.`

- [ ] **004/actions/195-avalanche.test.ts**
  - Card: `004/actions/195-avalanche.ts`
    - `Deal 1 damage to each opposing character. You may banish chosen location.`

- [ ] **004/actions/196-i-find-em-i-flatten-em.test.ts**
  - Card: `004/actions/196-i-find-em-i-flatten-em.ts`
    - `_(A character with cost 4 or more can {E} to sing this song for free.)_Banish all items.`

- [ ] **004/actions/197-one-last-hope.test.ts**
  - Card: `004/actions/197-one-last-hope.ts`
    - `Chosen character gains **Resist** +2 until the start of your next turn. If a Hero character is chosen, they may also challenge ready characters this turn.`
    - `Chosen character gains **Resist** +2 until the start of your next turn.`

- [ ] **004/actions/198-the-mob-song.test.ts**
  - Card: `004/actions/198-the-mob-song.ts`
    - `**Sing Together** 10 _(Any number of your of your teammates' characters with total cost 10 or more may {E} to sing this song for free.)_Deal 3 damage to up to 3 chosen characters and/or locations.`

- [ ] **004/actions/199-triton-s-decree.test.ts**
  - Card: `MISSING`
    - `Each opponent chooses one of their characters and deals 2 damage to them.`

### characters (124 tests)

- [ ] **004/characters/002-alma-madrigal-family-matriarch.test.ts**
  - Card: `004/characters/002-alma-madrigal-family-matriarch.ts`
    - `**ALL AT THE TABLE** When you play this character, look at your deck. You may reveal a Madrigal character card. Shuffle your deck and put that card on top of your deck.`

- [ ] **004/characters/003-ariel-singing-mermaid.test.ts**
  - Card: `004/characters/003-ariel-singing-mermaid.ts`
    - `**Singer** 7 _(This character counts as cost 7 to sing songs.)_`

- [ ] **004/characters/004-cinderella-melody-weaver.test.ts**
  - Card: `004/characters/004-cinderella-melody-weaver.ts`
    - `**Singer** 9 _(This character counts as cost 9 to sing songs.)_**BEAUTIFUL VOICE** Whenever this character sings a song, your other Princess characters get +1 {L} this turn.`

- [ ] **004/characters/005-cogsworth-majordomo.test.ts**
  - Card: `004/characters/005-cogsworth-majordomo.ts`
    - `AS YOU WERE! Whenever this character quests, you may give chosen character -2 {S} until the start of your next turn.`

- [ ] **004/characters/007-daisy-duck-musketeer-spy.test.ts**
  - Card: `MISSING`
    - `**INFILTRATION** When you play this character, each opponent chooses and discards a card.`

- [ ] **004/characters/008-donald-duck-musketeer-soldier.test.ts**
  - Card: `MISSING`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_**WAIT FOR ME!** When you play this character, chosen character gets +1 {L} this turn.`

- [ ] **004/characters/010-gaston-despicable-dealer.test.ts**
  - Card: `MISSING`
    - `should reduce the cost of the next character played by 2`
    - `Effect should last only for the turn`
    - `should cost 3 lore`

- [ ] **004/characters/011-golden-harp-enchanter-of-the-land.test.ts**
  - Card: `MISSING`
    - `should banish the character if no song was played this turn`
    - `should not banish the character if a song was played this turn`

- [ ] **004/characters/012-goofy-musketeer-swordsman.test.ts**
  - Card: `MISSING`
    - `**EN GAWRSH!** Whenever you play a character with **Bodyguard**, ready this character. He can't quest for the rest of this turn.`

- [ ] **004/characters/013-julieta-madrigal-excellent-cook.test.ts**
  - Card: `MISSING`
    - `**SIGNATURE RECIPE** When you play this character, you may remove up to 2 damage from chosen character. If you removed damage this way, you may draw a card.`
    - `No damage healed`

- [ ] **004/characters/014-max-loyal-sheepdog.test.ts**
  - Card: `MISSING`
    - `If you have a character named Prince Eric in play, you pay 1 {I} less to play this character.`
    - `Without Prince Eric in play, you pay full cost.`

- [ ] **004/characters/015-mickey-mouse-leader-of-the-band.test.ts**
  - Card: `MISSING`
    - `**Support** _(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)_`
    - `When you play this character, chosen character gains **Support ** this turn.`

- [ ] **004/characters/016-mickey-mouse-musketeer-captain.test.ts**
  - Card: `MISSING`
    - `**Shift** 5 _You may pay 5 {I} to play this on top of one of your characters named Mickey Mouse.)_**Bodyguard**, **Support****MUSKETEERS UNITED** When you play this character, if you used **Shift** to play him, you may draw a chard for each character with **Bodyguard** you have in play.`

- [ ] **004/characters/017-minnie-mouse-musketeer-champion.test.ts**
  - Card: `MISSING`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your character must chose one with Bodyguard if able.)`
    - `**DRAMATIC ENTERANCE** When you play this character, banish chosen opposing character with 5  {S} or more.`

- [ ] **004/characters/018-mirabel-madrigal-gift-of-the-family.test.ts**
  - Card: `MISSING`
    - `**Support** _(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)_`
    - `**SAVING THE MIRACLE** Whenever this character quests, your other Madrigal characters get +1 {L} this turn.`

- [ ] **004/characters/019-mirabel-madrigal-prophecy-finder.test.ts**
  - Card: `MISSING`
    - `**Support** _(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)_`

- [ ] **004/characters/020-pluto-rescue-dog.test.ts**
  - Card: `MISSING`
    - `**TO THE RESCUE** When you play this character, you may remove up to 3 damage from chosen character.`

- [ ] **004/characters/021-prince-eric-seafaring-prince.test.ts**
  - Card: `MISSING`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your character must chose one with Bodyguard if able.)_`

- [ ] **004/characters/022-prince-eric-ursula-s-groom.test.ts**
  - Card: `MISSING`
    - `****UNDER VANESSA'S SPELL** While you have a character named Ursula in play, this character gains **Bodyguard** and gets +2 {W}️. _(An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_`

- [ ] **004/characters/024-ursula-eric-s-bride.test.ts**
  - Card: `MISSING`
    - `**Shift: Discard a song card** _(You may discard a song card to play this on top of one of your characters named Ursula.)_**VANESSA'S DESIGN** Whenever this character quests, chosen opponent reveals their hand and discards a non-character card of your choice.`

- [ ] **004/characters/025-ursula-vanessa.test.ts**
  - Card: `MISSING`
    - `**Singer** 4 _(This character counts as cost 4 to sing songs.)_`

- [ ] **004/characters/036-belle-accomplished-mystic.test.ts**
  - Card: `004/characters/036-belle-accomplished-mystic.ts`
    - `**ENHANCED HEALING** When you play this character, move up to 3 damage counters from chosen character to chosen opposing character.`
    - `Should be able to move less than 3 damage`

- [ ] **004/characters/037-belle-untrained-mystic.test.ts**
  - Card: `004/characters/037-belle-untrained-mystic.ts`
    - `**HERE NOW, DON'T DO THAT** When you play this character, move up to 1 damage counter from chosen character to chosen opposing character.`

- [ ] **004/characters/038-bruno-madrigal-out-of-the-shadows.test.ts**
  - Card: `004/characters/038-bruno-madrigal-out-of-the-shadows.ts`
    - `**IT WAS YOUR VISION** When you play this character, chosen character gains 'When this character is banished in a challenge, you may return this card to your hand' this turn.`

- [ ] **004/characters/039-bruno-madrigal-undetected-uncle.test.ts**
  - Card: `004/characters/039-bruno-madrigal-undetected-uncle.ts`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`
    - `Hit`
    - `Miss`

- [ ] **004/characters/040-camilo-madrigal-prankster.test.ts**
  - Card: `004/characters/040-camilo-madrigal-prankster.ts`
    - `**MANY FORMS** At the start of your turn, you may chose one:• This character gets +1 {L} this turn.• This character gain **Challenger** +2 this turn. _(While challenging, this character gets +2 {S}.)_`

- [ ] **004/characters/041-dolores-madrigal-easy-listener.test.ts**
  - Card: `004/characters/041-dolores-madrigal-easy-listener.ts`
    - `**MAGICAL INFORMANT** When you play this character, if an opponent has an exerted character in play, you may draw a card.`

- [ ] **004/characters/042-elsa-storm-chaser.test.ts**
  - Card: `004/characters/042-elsa-storm-chaser.ts`
    - `**TEMPEST** {E}− Chosen character gains **Challenger** +2 and **Rush** this turn. _(They get +2 {S} while challenging. They can challenge the turn they're played.)_`

- [ ] **004/characters/043-flotsam-ursula-s-baby-.test.ts**
  - Card: `MISSING`
    - `**QUICK ESCAPE** When this character is banished in a challenge, return this card to your hand.**OMINOUS PAIR** Your characters named Jetsam gain 'When this character is banished in a challenge, return this card to your hand.'`

- [ ] **004/characters/044-flotsam-jetsam-entangling-eels.test.ts**
  - Card: `004/characters/044-flotsam-jetsam-entangling-eels.ts`
    - `**Shift: Discard 2 cards** _(You may discard 2 cards to play this on top of one of your characters named Flotsam or Jetsam.)__(This character counts as being named both Flotsam and Jetsam)_`

- [ ] **004/characters/045-isabela-madrigal-golden-child.test.ts**
  - Card: `004/characters/045-isabela-madrigal-golden-child.ts`
    - `**LEAVE IT TO ME** Whenever this character quests, your other characters can't quest for the rest of this turn.`
    - `**LADIES FIRST** During your turn, if no other character has quested this turn, this character gets +3 {L}.`
    - `**LADIES FIRST** During your turn, if no other character has quested this turn, this character gets +3 {L}.`

- [ ] **004/characters/046-jetsam-ursula-s-baby-.test.ts**
  - Card: `MISSING`
    - `**Challenger** +2 _(While challenging, this character gets +2 {S}.)_**OMINOUS PAIR** Your characters named Flotsam gain **Challenger** +2.`

- [ ] **004/characters/047-luisa-madrigal-magically-strong-one.test.ts**
  - Card: `004/characters/047-luisa-madrigal-magically-strong-one.ts`
    - `**Rush** _(This character can challenge the turn they're played.)_`

- [ ] **004/characters/048-magic-broom-illuminary-keeper.test.ts**
  - Card: `004/characters/048-magic-broom-illuminary-keeper.ts`
    - `should banish Magic Broom - Illuminary Keeper and draw a card when playing Aladdin - Resolute Swordsman`
    - `should not banish Magic Broom - Illuminary Keeper and draw a card when playing Aladdin - Brave Rescuer`
    - `Should not bounce AND draw at the same time`

- [ ] **004/characters/051-marshmallow-terrifying-snowman.test.ts**
  - Card: `004/characters/051-marshmallow-terrifying-snowman.ts`
    - `**BEHEMOTH** This character gets +1 {S} for each card in your hand.`

- [ ] **004/characters/052-mrs-potts-enchanted-teapot.test.ts**
  - Card: `004/characters/052-mrs-potts-enchanted-teapot.ts`
    - `**IT'LL TURN OUT ALL RIGHT** When you play this characters, if you have a character named Lumiere or Cogsworth in play, you may draw a card.`

- [ ] **004/characters/053-pepa-madrigal-weather-maker.test.ts**
  - Card: `004/characters/053-pepa-madrigal-weather-maker.ts`
    - `**IT LOOKS LIKE RAIN** When you play this character, you may exert chosen opposing character. That character can't ready at the start of their next turn unless you're at a location.`

- [ ] **004/characters/054-peter-pan-shadow-finder.test.ts**
  - Card: `004/characters/054-peter-pan-shadow-finder.ts`
    - `**Rush** _(This character can challenge the turn they're played.)_`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`
    - `**FLY, OF COURSE!** Your other characters with **Evasive** gain **Rush.**`

- [ ] **004/characters/056-tick-tock-ever-present-pursuer.test.ts**
  - Card: `004/characters/056-tick-tock-ever-present-pursuer.ts`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`

- [ ] **004/characters/057-ursula-mad-sea-witch.test.ts**
  - Card: `004/characters/057-ursula-mad-sea-witch.ts`
    - `**Challenger +2** _(While challenging, this character gets +2 {S}.)_`

- [ ] **004/characters/058-ursula-sea-witch-queen.test.ts**
  - Card: `004/characters/058-ursula-sea-witch-queen.ts`
    - `**NOW I'M THE RULER** Whenever this character quests, exert chosen character.`
    - `Other characters can't exert to sing songs.`
    - `She's able to sing`

- [ ] **004/characters/059-yen-sid-powerful-sorcerer.test.ts**
  - Card: `004/characters/059-yen-sid-powerful-sorcerer.ts`
    - `**TIMELY INTERVENTION** When you play this character, if you have a character named Magic Broom in play, you may draw a card.`
    - `**ARCANE STUDY** While you have 2 or more Broom characters in play, this character gets +2 {L}.`

- [ ] **004/characters/069-cri-kee-lucky-cricket.test.ts**
  - Card: `004/characters/069-cri-kee-lucky-cricket.ts`
    - `**SPREADING GOOD FORTUNE** When you play this character, your other characters get +3 {S} this turn.`

- [ ] **004/characters/070-diablo-devoted-herald.test.ts**
  - Card: `004/characters/070-diablo-devoted-herald.ts`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`
    - `**Shift: Discard an action card** _(You may discard an action card to play this on top of one of your characters named Diablo.)`
    - `Should trigger when opponent draws a card`
    - `Should not trigger when Diablo is not exerted`
    - `Should not trigger on player's turn`
    - `Whole new world test case`
    - `Let the Storm Rage On, Interaction`
    - `Should NOT draw a card when player puts a card in card (instead of drawing)`
    - `Should draw multiple cards, when opponent draws multiple`

- [ ] **004/characters/071-diablo-maleficent-s-spy.test.ts**
  - Card: `004/characters/071-diablo-maleficent-s-spy.ts`
    - `**SCOUT AHEAD** When you play this character, you may look at each opponent's hand.`

- [ ] **004/characters/072-gunther-interior-designer.test.ts**
  - Card: `004/characters/072-gunther-interior-designer.ts`
    - `**SAD-EYED PUPPY** When this character is challenged and banished, each opponent chooses one of their characters and returns that card to their hand.`

- [ ] **004/characters/074-hades-double-dealer.test.ts**
  - Card: `004/characters/074-hades-double-dealer.ts`
    - `**GET DOWN TO BUSINESS** {E},  Banish chosen character of yours - Play another character from your hand with the same name.`
    - `Cannot play a character with a different name`

- [ ] **004/characters/075-heihei-bumbling-rooster.test.ts**
  - Card: `004/characters/075-heihei-bumbling-rooster.ts`
    - `Opponent has more than you`
    - `Opponent has same as you`

- [ ] **004/characters/076-hera-queen-of-the-gods.test.ts**
  - Card: `004/characters/076-hera-queen-of-the-gods.ts`
    - `**Ward** _(Opponents can't choose this character except to challenge.)_**PROTECTIVE GODDESS** Your characters named Zeus gain **Ward**.**YOU'RE A TRUE HERO** Your characters named Hercules gain **Evasive**. _(Only characters with Evasive can challenge them.)_`

- [ ] **004/characters/077-jaq-connoisseur-of-climbing.test.ts**
  - Card: `004/characters/077-jaq-connoisseur-of-climbing.ts`
    - `**SNEAKY IDEA** When you play this character, chosen opposing character gains **Reckless** during their next turn. _(They can't quest and must challenge if able.)_`

- [ ] **004/characters/078-jasmine-desert-warrior.test.ts**
  - Card: `004/characters/078-jasmine-desert-warrior.ts`
    - `**SMART MANEUVER** When you play this character and each time she is challenged, each opponent chooses and discards a card.`

- [ ] **004/characters/079-megara-captivating-cynic.test.ts**
  - Card: `004/characters/079-megara-captivating-cynic.ts`
    - `skipping the effect banishes her`
    - `discarding chosen card of yours`

- [ ] **004/characters/080-megara-liberated-one.test.ts**
  - Card: `004/characters/080-megara-liberated-one.ts`
    - `**PEOPLE ALWAYS DO CRAZY THINGS** Whenever you play a character named Hercules, you may ready this character.`

- [ ] **004/characters/082-panic-immortal-sidekick.test.ts**
  - Card: `004/characters/082-panic-immortal-sidekick.ts`
    - `**REPORTING FOR DUTY** While this character is exerted, if you have a character named Pain in play, your Villain characters can't be challenged.`

- [ ] **004/characters/083-pegasus-cloud-racer.test.ts**
  - Card: `004/characters/083-pegasus-cloud-racer.ts`
    - `Playing a new character should not cancel the effect on existing characters`

- [ ] **004/characters/084-pegasus-gift-for-hercules.test.ts**
  - Card: `004/characters/084-pegasus-gift-for-hercules.ts`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`

- [ ] **004/characters/085-pete-born-to-cheat.test.ts**
  - Card: `004/characters/085-pete-born-to-cheat.ts`
    - `**I CLOBBER YOU!** Whenever this character quests while he has 5 {S} or more, return chosen character with 2 {S} or less to their player's hand.`

- [ ] **004/characters/087-prince-phillip-vanquisher-of-foes.test.ts**
  - Card: `004/characters/087-prince-phillip-vanquisher-of-foes.ts`
    - `**Shift** 6 _You may pay 6 {I} to play this on top of one of your characters named Prince Phillip.)_**Evasive** _(Only characters with Evasive can challenge this character.)_**STRIKE TO THE HEART** When you play this character, banish all opposing characters with at least 1 damage counter.`

- [ ] **004/characters/088-prince-phillip-warden-of-the-woods.test.ts**
  - Card: `004/characters/088-prince-phillip-warden-of-the-woods.ts`
    - `**SHINING BEACON** Your other Hero characters gain **Ward**. _(Opponents can't chose them except to challenge.)_`

- [ ] **004/characters/089-the-fates-only-one-eye.test.ts**
  - Card: `004/characters/089-the-fates-only-one-eye.ts`
    - `**ALL WILL BE SEEN** When you play this character, look at the top card of each opponent's deck.`

- [ ] **004/characters/090-the-muses-proclaimers-of-heroes.test.ts**
  - Card: `004/characters/090-the-muses-proclaimers-of-heroes.ts`
    - `should return own character with 2 {S} or less to own hand when a song is played`
    - `should return opponents character with 2 {S} or less to opponents hand when a song is played`
    - `Skipping muses effect during an song that requires response from opponent`

- [ ] **004/characters/092-zeus-mr-lightning-bolts.test.ts**
  - Card: `004/characters/092-zeus-mr-lightning-bolts.ts`
    - `**TARGET PRACTICE** Whenever this character challenges another character, he gets + {S} equal to the {S} of chosen character this turn.`

- [ ] **004/characters/103-beast-wounded.test.ts**
  - Card: `004/characters/103-beast-wounded.ts`
    - `**THAT HURTS!** This character enters play with 4 damage.`

- [ ] **004/characters/105-fa-zhou-mulan-s-father.test.ts**
  - Card: `004/characters/105-fa-zhou-mulan-s-father.ts`
    - `**WAR WOUND** This character cannot challenge.**HEAD OF FAMILY** {E} - Ready chosen character named Mulan. They can’t quest for the rest of the turn.`

- [ ] **004/characters/106-flynn-rider-frenemy.test.ts**
  - Card: `004/characters/106-flynn-rider-frenemy.ts`
    - `meets the condition`
    - `does NOT meet the condition`
    - `Should trigger when alone`
    - `Should trigger when alone`
    - `Should not trigger on tie, after being removed`
    - `Tie is not a a win`

- [ ] **004/characters/107-goofy-super-goof.test.ts**
  - Card: `004/characters/107-goofy-super-goof.ts`
    - `**Rush** _(This character can challenge the turn they're played)_`
    - `should gain lore when challenging another character`
    - `should NOT gain lore when challenging a location`

- [ ] **004/characters/108-hercules-clumsy-kid.test.ts**
  - Card: `004/characters/108-hercules-clumsy-kid.ts`
    - `**Rush** _(This character can challenge the turn they're played.)_`

- [ ] **004/characters/109-hercules-daring-demigod.test.ts**
  - Card: `004/characters/109-hercules-daring-demigod.ts`
    - `**Rush** _(This character can challenge the turn they're played.)_**Reckless** _(This character can't quest and must challenge each turn if able.)_`
    - `Can challenge with fresh ink`

- [ ] **004/characters/112-li-shang-valorous-general.test.ts**
  - Card: `004/characters/112-li-shang-valorous-general.ts`
    - `has Shift ability`
    - `LEAD THE CHARGE: Your characters with 4 {S} or more get +1 {L}`

- [ ] **004/characters/113-lumiere-fiery-friend.test.ts**
  - Card: `004/characters/113-lumiere-fiery-friend.ts`
    - `**FERVENT ADDRESS** Your other characters get +1 {S}.`
    - `Gives strength to characters with ward`
    - `Doesn't give bonus to enemies`

- [ ] **004/characters/115-mulan-enemy-of-entanglement.test.ts**
  - Card: `004/characters/115-mulan-enemy-of-entanglement.ts`
    - `**TIME TO SHINE** Whenever you play an action, this character gets +2 {S} this turn.`

- [ ] **004/characters/116-mulan-injured-soldier.test.ts**
  - Card: `004/characters/116-mulan-injured-soldier.ts`
    - `**BLESSURE AU COMBAT** This character enters play with 2 damage.`
    - `Mulan + Hercules interaction`

- [ ] **004/characters/117-namaari-heir-of-fang.test.ts**
  - Card: `004/characters/117-namaari-heir-of-fang.ts`
    - `During your turn, deals damage to another chosen character`
    - `During opponent's turn`

- [ ] **004/characters/119-noi-acrobatic-baby.test.ts**
  - Card: `004/characters/119-noi-acrobatic-baby.ts`
    - `**FANCY FOOTWORK** Whenever you play an action, this character takes no damage from challenges this turn.`

- [ ] **004/characters/120-pegasus-flying-steed.test.ts**
  - Card: `004/characters/120-pegasus-flying-steed.ts`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`

- [ ] **004/characters/121-raya-fierce-protector.test.ts**
  - Card: `004/characters/121-raya-fierce-protector.ts`
    - `**DON'T CROSS ME** Whenever this character challenges another character, gain 1 lore for each other damaged character you have in play.`

- [ ] **004/characters/122-raya-guardian-of-the-dragon-gem.test.ts**
  - Card: `004/characters/122-raya-guardian-of-the-dragon-gem.ts`
    - `**WE MUST JOIN FORCES** When you play this character, ready chosen character of yours at a location. They can’t quest for the rest of this turn.`

- [ ] **004/characters/123-sisu-daring-visitor.test.ts**
  - Card: `004/characters/123-sisu-daring-visitor.ts`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`
    - `**BRING ON THE HEAT!** When you play this character, banish chosen opposing character with 1 {S} or less.`

- [ ] **004/characters/124-sisu-emboldened-warrior.test.ts**
  - Card: `004/characters/124-sisu-emboldened-warrior.ts`
    - `**SURGE OF POWER** This character gets +1 {S} for each card in opponent's hands.`

- [ ] **004/characters/125-sisu-empowered-sibling.test.ts**
  - Card: `004/characters/125-sisu-empowered-sibling.ts`
    - `**LET ME HANDLE THIS!** When you play this character, banish all opposing characters with 2 {S} or less.`
    - `Should combo correctly with Ice block`

- [ ] **004/characters/126-tong-survivor.test.ts**
  - Card: `004/characters/126-tong-survivor.ts`
    - `**Reckless** _(This character can't quest and must challenge each turn if able.)_`

- [ ] **004/characters/127-tuk-tuk-lively-partner.test.ts**
  - Card: `004/characters/127-tuk-tuk-lively-partner.ts`
    - `**ON A ROLL** When you play this character, you may move him and one of your other characters to the same location for free. The other character gets +2 {S} this turn.`
    - `Should be able to enter the mines`

- [ ] **004/characters/137-anna-braving-the-storm.test.ts**
  - Card: `004/characters/137-anna-braving-the-storm.ts`
    - `**I WAS BORN READY** If you have another Hero character in play, this character gets +1 {L}.`

- [ ] **004/characters/138-anna-true-hearted.test.ts**
  - Card: `004/characters/138-anna-true-hearted.ts`
    - `**LET ME HELP YOU** Whenever this character quests, your other Hero characters get +1 {L} this turn.`

- [ ] **004/characters/139-ariel-treasure-collector.test.ts**
  - Card: `004/characters/139-ariel-treasure-collector.ts`
    - `should give +2 {L} when you have more items in play than each opponent`

- [ ] **004/characters/140-aurora-lore-guardian.test.ts**
  - Card: `004/characters/140-aurora-lore-guardian.ts`
    - `**ROYAL ASSORTMENT** {E} one of your items – look at the top card of your deck. Put it on either the top or the bottom of your deck.`

- [ ] **004/characters/141-aurora-tranquil-princess.test.ts**
  - Card: `004/characters/141-aurora-tranquil-princess.ts`
    - `**Ward** _(Opponents can't choose this character except to challenge.)_`

- [ ] **004/characters/142-dang-hu-talon-chief.test.ts**
  - Card: `004/characters/142-dang-hu-talon-chief.ts`
    - `**YOU BETTER TALK FAST** Your other Villain characters gain **Support.** _(Whenever they quest, you mad add their {S} to another chosen character's {S} this turn.)_`

- [ ] **004/characters/144-flounder-collector-s-companion.test.ts**
  - Card: `004/characters/144-flounder-collector-s-companion.ts`
    - `**Support** _(Whenever this character quests, you mad add their {S} to another chosen character's {S} this turn.)_**I'M NOT A GUPPY** If you have a character named Ariel in play, you pay 1 {I} less to play this character.`

- [ ] **004/characters/146-hans-noble-scoundrel.test.ts**
  - Card: `004/characters/146-hans-noble-scoundrel.ts`
    - `**ROYAL SCHEMES** When you play this characer, if a Princess or Queen character is in play, gain 1 lore.`

- [ ] **004/characters/147-iduna-caring-mother.test.ts**
  - Card: `004/characters/147-iduna-caring-mother.ts`
    - `**ENDURING LOVE** When this character is banished, you may put this card into your inkwell facedown and exerted.`

- [ ] **004/characters/149-olaf-carrot-enthusiast.test.ts**
  - Card: `004/characters/149-olaf-carrot-enthusiast.ts`
    - `**CARROTS ALL AROUND!** Whenever he quests, each of your other characters gets +{S} equal to this character's {S} this turn.`

- [ ] **004/characters/150-olaf-trusting-companion.test.ts**
  - Card: `004/characters/150-olaf-trusting-companion.ts`
    - `**Support** _(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)_`

- [ ] **004/characters/151-pascal-inquisitive-pet.test.ts**
  - Card: `004/characters/151-pascal-inquisitive-pet.ts`
    - `**COLORFUL TACTICS** When you play this character, look at the top 3 cards of your deck and put them back in any order.`

- [ ] **004/characters/152-prince-phillip-gallant-defender.test.ts**
  - Card: `004/characters/152-prince-phillip-gallant-defender.ts`
    - `**Support** _(Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)_ **BEST DEFENSE** Whenver one of your characters is chosen for **Support**, they gain **Resist** +1 this turn. _(Damage dealt to them is reduced by 1.)_`

- [ ] **004/characters/153-rapunzel-appreciative-artist.test.ts**
  - Card: `004/characters/153-rapunzel-appreciative-artist.ts`
    - `**PERCEPTIVE PARTNER** While you have a character named Pascal in play, this character gains **Ward.** _(Opponents can't chose them except to challenge.)_`

- [ ] **004/characters/154-scuttle-expert-on-humans.test.ts**
  - Card: `004/characters/154-scuttle-expert-on-humans.ts`
    - `**LET ME SEE** When you play this character, look at the top 4 cards of your deck. You may reveal an item card and put it in your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **004/characters/156-the-queen-diviner.test.ts**
  - Card: `004/characters/156-the-queen-diviner.ts`
    - `should allow the player to play an item card for free if it costs 3 or less`
    - `should allow the player to put in hand an item card if it costs 3 or more`
    - `should put the rest of the cards to the bottom`

- [ ] **004/characters/157-transformed-chef-castle-stove.test.ts**
  - Card: `004/characters/157-transformed-chef-castle-stove.ts`
    - `**SMOOTH SMALL DISHES** When you play this character, remove up to 2 damage from chosen character.`

- [ ] **004/characters/158-triton-champion-of-atlantica.test.ts**
  - Card: `004/characters/158-triton-champion-of-atlantica.ts`
    - `**Shift** 6 _You may pay 6 {I} to play this on top of one of your characters named Triton.)_**IMPOSING PRESENCE** Opposing characters get -1 {S} for each location you have in play.`

- [ ] **004/characters/159-triton-discerning-king.test.ts**
  - Card: `004/characters/159-triton-discerning-king.ts`
    - `**CONSIGN TO THE DEPTHS** {E}, Banish one of your items − Gain 3 lore.`

- [ ] **004/characters/160-triton-young-prince.test.ts**
  - Card: `004/characters/160-triton-young-prince.ts`
    - `**SUPERIOR SWIMMER** During your turn, this character gains **Evasive**. _(They can challenge characters with Evasive.)_**KEEPER OF ATLANTICA** Whenever one of your locations is banished, you may put that card into your inkwell facedown and exerted.`

- [ ] **004/characters/171-aladdin-brave-rescuer.test.ts**
  - Card: `004/characters/171-aladdin-brave-rescuer.ts`
    - `**Shift: Discard a location card** _(You may discard a location card to play this on top of one of your characters named Aladdin.)_`
    - `**CRASHING THROUGH** Whenever this character quests, you may banish chosen item.`

- [ ] **004/characters/174-ariel-determined-mermaid.test.ts**
  - Card: `004/characters/174-ariel-determined-mermaid.ts`
    - `**I WANT MORE** Whenever you play a song, you may draw a card, then choose and discard a card.`

- [ ] **004/characters/175-ariel-sonic-warrior.test.ts**
  - Card: `004/characters/175-ariel-sonic-warrior.ts`
    - `**Shift** 4 _(You may pay 4 {I} to play this on top of one of your characters named Ariel.)_`
    - `**AMPLIFIED VOICE** Whenever you play a song, you may pay {I} to deal 3 daamge to chosen character.`

- [ ] **004/characters/176-beast-thick-skinned.test.ts**
  - Card: `004/characters/176-beast-thick-skinned.ts`
    - `**Resist** +1 _(Damage dealt to this character is reduced by 1 )_`

- [ ] **004/characters/177-chi-fu-imperial-advisor.test.ts**
  - Card: `004/characters/177-chi-fu-imperial-advisor.ts`
    - `**OVERLY CAUTIOUS** While this character has no damage, he gets +2 {L}.`

- [ ] **004/characters/178-chien-po-imperial-soldier.test.ts**
  - Card: `004/characters/178-chien-po-imperial-soldier.ts`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must chose one with Bodyguard if able.)_`

- [ ] **004/characters/179-donald-duck-buccaneer.test.ts**
  - Card: `004/characters/179-donald-duck-buccaneer.ts`
    - `should deal two damage`
    - `opponent's don't get the bonus`
    - `Mulan itself doesn't get the bonus`

- [ ] **004/characters/180-hercules-beloved-hero.test.ts**
  - Card: `004/characters/180-hercules-beloved-hero.ts`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_**Resist +1** _(Damage dealt to this character is reduced by 1.)_`

- [ ] **004/characters/181-lefou-opportunistic-flunky.test.ts**
  - Card: `004/characters/181-lefou-opportunistic-flunky.ts`
    - `**I LEARNED FROM THE BEST** During your turn, you may play this character for free if an opposing character was banished in a challenge this turn.`

- [ ] **004/characters/183-ling-imperial-soldier.test.ts**
  - Card: `004/characters/183-ling-imperial-soldier.ts`
    - `**FULL OF SPIRIT** Your Hero characters get +1 {S}.`

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

- [x] **005/characters/157-tipo-growing-son.test.ts**
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

- [x] **005/characters/193-doc-bold-knight.test.ts**
  - Card: `005/characters/193-doc-bold-knight.ts`
    - `**DRASTIC MEASURES** When you play this character, you may discard your hand to draw 2 cards.`

- [ ] **005/characters/194-arthur-king-victorious.test.ts**
  - Card: `005/characters/194-arthur-king-victorious.ts`
    - `KNIGHTED BY THE KING should only let the chosen character challenge ready characters this turn`

- [x] **005/characters/195-pete-games-referee.test.ts**
  - Card: `005/characters/195-pete-games-referee.ts`
    - `**BLOW THE WHISTLE** When you play this character, opponents can’t play actions until the start of your next turn.`

### items (22 tests)

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

- [x] **006/characters/053-genie-wish-fulfilled.test.ts**
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

- [ ] **006/characters/057-mamma-odie-lone-sage.test.ts**
  - Card: `006/characters/057-mamma-odie-lone-sage.ts`
    - `I HAVE TO DO EVERYTHING AROUND HERE Whenever you play a song, you may move up to 2 damage counters from chosen character to chosen opposing character.`

- [ ] **006/characters/058-peter-pan-shadow-catcher.test.ts**
  - Card: `006/characters/058-peter-pan-shadow-catcher.ts`
    - `GOTCHA! During your turn, whenever a card is put into your inkwell, exert chosen opposing character.`

- [ ] **006/characters/059-mad-hatter-eccentric-host.test.ts**
  - Card: `006/characters/059-mad-hatter-eccentric-host.ts`
    - `Looking at opponent's deck`
    - `Looking at your own deck`

- [ ] **006/characters/061-genie-wonderful-trickster.test.ts**
  - Card: `006/characters/061-genie-wonderful-trickster.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named Genie.)`
    - `YOUR REWARD AWAITS Whenever you play a card, draw a card.`
    - `FORBIDDEN TREASURE At the end of your turn, put all the cards in your hand on the bottom of your deck in any order.`

- [ ] **006/characters/070-jasmine-royal-seafarer.test.ts**
  - Card: `006/characters/070-jasmine-royal-seafarer.ts`
    - `BY ORDER OF THE PRINCESS When you play this character, choose one: \n* Exert chosen damaged character. \n* Chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)`

- [ ] **006/characters/071-captain-hook-underhanded.test.ts**
  - Card: `006/characters/071-captain-hook-underhanded.ts`
    - `INSPIRES DREAD While this character is exerted, opposing Pirate characters can't quest.`
    - `UPPER HAND Whenever this character is challenged, draw a card.`

- [ ] **006/characters/072-stitch-alien-buccaneer.test.ts**
  - Card: `006/characters/072-stitch-alien-buccaneer.ts`
    - `**READY FOR ACTION** _When you play this character, if you used Shift to play him, you may put an action card from your discard on the top of your deck._`

- [ ] **006/characters/073-go-go-tomago-darting-dynamo.test.ts**
  - Card: `006/characters/073-go-go-tomago-darting-dynamo.ts`
    - `**STOP WHINING, WOMAN UP** When you play this character, you may pay 2 {I} to gain lore equal to the damage on chosen opposing character.`

- [ ] **006/characters/074-honey-lemon-chemical-genius.test.ts**
  - Card: `006/characters/074-honey-lemon-chemical-genius.ts`
    - `**HERE'S THE BEST PART** When you play this character, you may pay 2 {I} to have each opponent choose and discard a card.`

- [ ] **006/characters/075-fred-mascot-by-day.test.ts**
  - Card: `006/characters/075-fred-mascot-by-day.ts`
    - `**HOW COOL IS THAT** Whenever this character is challenged, gain 2 lore.`

- [ ] **006/characters/078-heathcliff-stoic-butler.test.ts**
  - Card: `006/characters/078-heathcliff-stoic-butler.ts`
    - `Ward (Opponents can't choose this character except to challenge.)`

- [ ] **006/characters/079-basil-hypnotized-mouse.test.ts**
  - Card: `006/characters/079-basil-hypnotized-mouse.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **006/characters/080-donald-duck-first-mate.test.ts**
  - Card: `006/characters/080-donald-duck-first-mate.ts`
    - `CAPTAIN ON DECK While you have a Captain character in play, this character gets +2 {L}.`

- [ ] **006/characters/081-daisy-duck-pirate-captain.test.ts**
  - Card: `006/characters/081-daisy-duck-pirate-captain.ts`
    - `Whenever one of your Pirate characters quests while at a location, draw a card.`
    - `Questing character is not a pirate`

- [ ] **006/characters/083-prince-phillip-royal-explorer.test.ts**
  - Card: `006/characters/083-prince-phillip-royal-explorer.ts`
    - `Ward (Opponents can't choose this character except to challenge.)`

- [ ] **006/characters/084-jasmine-royal-commodore.test.ts**
  - Card: `006/characters/084-jasmine-royal-commodore.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named Jasmine.)`
    - `RULER OF THE SEAS When you play this character, if you used Shift to play her, return all other exerted characters to their players’ hands.`

- [ ] **006/characters/085-peter-pan-never-land-prankster.test.ts**
  - Card: `006/characters/085-peter-pan-never-land-prankster.ts`
    - `LOOK INNOCENT This character enters play exerted.`
    - `CAN'T TAKE A JOKE? While this character is exerted, each opposing player can't gain lore unless one of their characters has challenged this turn.`

- [ ] **006/characters/086-hercules-baby-demigod.test.ts**
  - Card: `006/characters/086-hercules-baby-demigod.ts`
    - `Ward (Opponents can't choose this character except to challenge.)`
    - `STRONG LIKE HIS DAD 3 {I} - Deal 1 damage to chosen damaged character.`

- [ ] **006/characters/087-alistair-krei-ambitious-entrepreneur.test.ts**
  - Card: `006/characters/087-alistair-krei-ambitious-entrepreneur.ts`
    - `AN EYE FOR TECH When you play this character, if an opponent has an item in play, gain 1 lore.`

- [ ] **006/characters/088-gazelle-angel-with-horns.test.ts**
  - Card: `006/characters/088-gazelle-angel-with-horns.ts`
    - `YOU ARE A REALLY HOT DANCER When you play this character, chosen character gains Evasive until the start of your next turn. (Only characters with Evasive can challenge them.)`

- [ ] **006/characters/089-goofy-expert-shipwright.test.ts**
  - Card: `006/characters/089-goofy-expert-shipwright.ts`
    - `Ward (Opponents can't choose this character except to challenge.)`
    - `CLEVER DESIGN Whenever this character quests, chosen character gains Ward until the start of your next turn.`

- [ ] **006/characters/090-bellwether-assistant-mayor.test.ts**
  - Card: `006/characters/090-bellwether-assistant-mayor.ts`
    - `FEAR ALWAYS WORKS During your turn, whenever a card is put into your inkwell, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)`

- [ ] **006/characters/091-basil-disguised-detective.test.ts**
  - Card: `006/characters/091-basil-disguised-detective.ts`
    - `Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Basil.)`
    - `TWISTS AND TURNS During your turn, whenever a card is put into your inkwell, you may pay 1 {I} to have chosen opponent choose and discard a card.`

- [ ] **006/characters/103-mickey-mouse-pirate-captain.test.ts**
  - Card: `006/characters/103-mickey-mouse-pirate-captain.ts`
    - `Shift 3 (You may pay 3 {I} to play this on top of one of your characters named Mickey Mouse.)`
    - `MARINER’S MIGHT Whenever this character quests, chosen Pirate character gets +2 {S} and gains 'This character takes no damage from challenges' this turn.`

- [ ] **006/characters/104-kakamora-boarding-party.test.ts**
  - Card: `006/characters/104-kakamora-boarding-party.ts`
    - `**Rush** _(This character can challenge the turn they’re played.)_`

- [ ] **006/characters/105-kakamora-pirate-pitcher.test.ts**
  - Card: `006/characters/105-kakamora-pirate-pitcher.ts`
    - `DIZZYING SPEED When you play this character, chosen Pirate character gains Evasive until the start of your next turn. (Only characters with Evasive can challenge them.)`
    - `Cannot target non-pirate character.)`

- [ ] **006/characters/106-jasmine-rebellious-princess.test.ts**
  - Card: `006/characters/106-jasmine-rebellious-princess.ts`
    - `YOU'LL NEVER MISS IT Whenever this character quests, each opponent loses 1 lore.`

- [ ] **006/characters/107-raya-kumandran-rider.test.ts**
  - Card: `006/characters/107-raya-kumandran-rider.ts`
    - `can't ready itself`
    - `Doesn't trigger on opponent's turn`
    - `COME ON, LET'S DO THIS Once during your turn, whenever a card is put into your inkwell, you may ready another chosen character of yours. They can't quest for the rest of this turn.`
    - `can't do it twice`

- [ ] **006/characters/108-wendy-darling-courageous-captain.test.ts**
  - Card: `006/characters/108-wendy-darling-courageous-captain.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `LOOK LIVELY, CREW! While you have another Pirate character in play, this character gets +1 {S} and +1 {L}.`

- [ ] **006/characters/109-john-silver-dangerous-friend.test.ts**
  - Card: `006/characters/109-john-silver-dangerous-friend.ts`
    - `YOU HAVE TO CHART YOUR OWN COURSE Whenever this character quests, you may deal 1 damage to one of your other characters. If you do, ready that character. They cannot quest this turn.`

- [ ] **006/characters/110-vanellope-von-schweetz-gutsy-go-getter.test.ts**
  - Card: `MISSING`
    - `AS READY AS I'LL EVER BE At the start of your turn, if this character is at a location, draw a card and gain 1 lore.`

- [ ] **006/characters/113-markowski-space-trooper.test.ts**
  - Card: `006/characters/113-markowski-space-trooper.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **006/characters/114-abu-bold-helmsman.test.ts**
  - Card: `006/characters/114-abu-bold-helmsman.ts`
    - `Rush (This character can challenge the turn they’re played.)`

- [ ] **006/characters/115-mickey-mouse-courageous-sailor.test.ts**
  - Card: `006/characters/115-mickey-mouse-courageous-sailor.ts`
    - `SOLID GROUND While this character is at a location, he gets +2 {S}.`

- [ ] **006/characters/116-adorabeezle-winterpop-ice-rocket-racer.test.ts**
  - Card: `006/characters/116-adorabeezle-winterpop-ice-rocket-racer.ts`
    - `KEEP DRIVING While this character has damage, she gets +1 {L}.`

- [ ] **006/characters/117-moana-self-taught-sailor.test.ts**
  - Card: `MISSING`
    - `No captain in play`
    - `With captain in play`

- [ ] **006/characters/119-aladdin-intrepid-commander.test.ts**
  - Card: `006/characters/119-aladdin-intrepid-commander.ts`
    - `Shift 2 (You may pay 2 {I} to play this on top of one of your characters named Aladdin.)`
    - `REMEMBER YOUR TRAINING When you play this character, your characters get +2 {S} this turn.`

- [ ] **006/characters/120-minnie-mouse-pirate-lookout.test.ts**
  - Card: `006/characters/120-minnie-mouse-pirate-lookout.ts`
    - `LAND, HO! Once during your turn, whenever a card is put into your inkwell, you may return a location card from your discard to your hand.`

- [ ] **006/characters/121-moana-kakamora-leader.test.ts**
  - Card: `006/characters/121-moana-kakamora-leader.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named Moana.)`
    - `GATHERING FORCES When you play this character, you may move any number of your characters to the same location for free. Gain 1 lore for each character you moved.`

- [ ] **006/characters/123-goofy-flying-fool.test.ts**
  - Card: `006/characters/123-goofy-flying-fool.ts`
    - `Rush (This character can challenge the turn they're played.)`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **006/characters/124-maui-half-shark.test.ts**
  - Card: `MISSING`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `CHEEEEOHOOOO! Whenever this character challenges another character, you may return an action card from your discard to your hand.`
    - `WAYFINDING Whenever you play an action, gain 1 lore.`

- [ ] **006/characters/124-maui-halfshark.test.ts**
  - Card: `006/characters/124-maui-halfshark.ts`
    - `WAYFINDING: Should gain 1 lore when playing an action, even if Maui is banished by that action`
    - `It shouldn't trigger if Maiu was already in the graveyard`

- [ ] **006/characters/125-hades-strong-arm.test.ts**
  - Card: `006/characters/125-hades-strong-arm.ts`
    - `WHAT ARE YOU GONNA DO? {E}, 3 {I}, Banish one of your characters – Banish chosen character.`

- [ ] **006/characters/126-tigger-in-the-crow-s-nest.test.ts**
  - Card: `MISSING`
    - `**SWASH YOUR BUCKLES** Whenever you play an action, this character gets +1 {S} and +1 {L} this turn.`

- [ ] **006/characters/127-scar-heartless-hunter.test.ts**
  - Card: `006/characters/127-scar-heartless-hunter.ts`
    - `BARED TEETH When you play this character, deal 2 damage to chosen character of yours to deal 2 damage to chosen character.`

- [ ] **006/characters/137-b-e-n--eccentric-robot.test.ts**
  - Card: `MISSING`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)`

- [ ] **006/characters/138-aunt-cass-biggest-fan.test.ts**
  - Card: `006/characters/138-aunt-cass-biggest-fan.ts`
    - `HAPPY TO HELP Whenever this character quests, chosen Inventor character gets +1 {L} this turn.`

- [ ] **006/characters/139-gadget-hackwrench-creative-thinker.test.ts**
  - Card: `006/characters/139-gadget-hackwrench-creative-thinker.ts`
    - `BRAINSTORM Whenever you play an item, this character gets +1 {L} this turn.`

- [ ] **006/characters/140-gadget-hackwrench-brilliant-bosun.test.ts**
  - Card: `006/characters/140-gadget-hackwrench-brilliant-bosun.ts`
    - `**MECHANICALLY SAVVY** While you have 3 or more items in play, you pay 1 {I} less to play Inventor characters.`

- [ ] **006/characters/141-zipper-astute-decoy.test.ts**
  - Card: `006/characters/141-zipper-astute-decoy.ts`
    - `Ward (Opponents can't choose this character except to challenge.)`
    - `RUN INTERFERENCE During your turn, whenever a card is put into your inkwell, another chosen character gains Resist +1 until the start of your next turn. (Damage dealt to them is reduced by 1.)`

- [ ] **006/characters/142-oswald-the-lucky-rabbit.test.ts**
  - Card: `006/characters/142-oswald-the-lucky-rabbit.ts`
    - `FAVORABLE CHANCE During your turn, whenever a card is put into your inkwell, you may reveal the top card of your deck. If it's an item card, you may play that item for free and they enter play exerted. Otherwise put it on the bottom of your deck.`
    - `Draw item but choose not to play`
    - `if NOT an item card then put onto bottom of deck`

- [ ] **006/characters/143-yokai-enigmatic-inventor.test.ts**
  - Card: `006/characters/143-yokai-enigmatic-inventor.ts`
    - `TIME TO UPGRADE Whenever this character quests, you may return one of your items to your hand to pay 2 {I} less for the next item you play this turn.`

- [x] **006/characters/144-pleakley-scientific-expert.test.ts**
  - Card: `006/characters/144-pleakley-scientific-expert.ts`
    - `REPORTING FOR DUTY When you play this character, put chosen character of yours into your inkwell facedown and exerted.`

- [ ] **006/characters/145-hiro-hamada-robotics-prodigy.test.ts**
  - Card: `006/characters/145-hiro-hamada-robotics-prodigy.ts`
    - `**SWEET TECH**  {E}, 2 {I} − Search your deck for an item card or a Robot character card and reveal it to all players. Shuffle your deck and put that card on top of it.`

- [ ] **006/characters/146-heihei-not-so-tricky-chicken.test.ts**
  - Card: `MISSING`
    - `EAT ANYTHING When you play this character, exert chosen opposing item. It can't ready at the start of its next turn.`
    - `OUT TO LUNCH During your turn, this character gains Evasive. (They can challenge characters with Evasive.)`

- [ ] **006/characters/147-sour-bill-surly-henchman.test.ts**
  - Card: `006/characters/147-sour-bill-surly-henchman.ts`
    - `UNPALATABLE When you play this character, chosen opposing character gets -2 {S} this turn.`

- [ ] **006/characters/148-nick-wilde-soggy-fox.test.ts**
  - Card: `006/characters/148-nick-wilde-soggy-fox.ts`
    - `NICE TO HAVE A PARTNER While you have another character with Support in play, this character gets +2 {S}.`

- [ ] **006/characters/149-wasabi-methodical-engineer.test.ts**
  - Card: `006/characters/149-wasabi-methodical-engineer.ts`
    - `Targeting your own card`
    - `Targeting opponent's card`

- [ ] **006/characters/150-nick-wilde-clever-fox.test.ts**
  - Card: `006/characters/150-nick-wilde-clever-fox.ts`
    - `Shift 1 (You may pay 1 {I} to play this on top of one of your characters named Nick Wilde.)`
    - `CAN'T TOUCH ME While you have an item in play, this character can't be challenged.`

- [ ] **006/characters/153-tadashi-hamada-baymax-inventor.test.ts**
  - Card: `006/characters/153-tadashi-hamada-baymax-inventor.ts`
    - `LET'S GET BACK TO WORK This character gets +1 {S} and +1 {W} for each item you have in play.`

- [ ] **006/characters/154-hiro-hamada-team-leader.test.ts**
  - Card: `006/characters/154-hiro-hamada-team-leader.ts`
    - `**I NEED TO UPGRADE ALL OF YOU** Your other Inventor characters gain **Resist** +1. _(Damage dealt to them is reduced by 1.)_**SHAPE THE FUTURE** 2 {I} − Look at the top card of your deck. Put it on either the top or the bottom of your deck.`
    - `**SHAPE THE FUTURE** 2 {I} − Look at the top card of your deck. Put it on either the top or the bottom of your deck.`

- [ ] **006/characters/155-tadashi-hamada-gifted-roboticist.test.ts**
  - Card: `006/characters/155-tadashi-hamada-gifted-roboticist.ts`
    - `SOMEONE HAS TO HELP During an opponent’s turn, when this character is banished, you may put the top card of your deck into your inkwell facedown. Then, put this card into your inkwell facedown.`

- [ ] **006/characters/156-baymax-personal-healthcare-companion.test.ts**
  - Card: `006/characters/156-baymax-personal-healthcare-companion.ts`
    - `**FULLY CHARGED** If you have an Inventor character in play, you pay 1 {I} less to play this character.`
    - `**FULLY CHARGED** If you have an Inventor character in play, you pay 1 {I} less to play this character.**YOU SAID 'OW'** 2 {I} - Remove up to 1 damage from another chosen character.`

- [ ] **006/characters/157-baymax-armored-companion.test.ts**
  - Card: `006/characters/157-baymax-armored-companion.ts`
    - `**THE TREATMENT IS WORKING** When you play this character and whenever he quests, you may remove up to 2 damage from another chosen character of yours. Gain 1 lore for each 1 damage removed this way.`

- [ ] **006/characters/160-yokai-scientific-supervillain.test.ts**
  - Card: `006/characters/160-yokai-scientific-supervillain.ts`
    - `Shift 6 (You may pay 6 {I} to play this on top of one of your characters named Yokai.)`
    - `NEUROTRANSMITTER You may play items named Microbots for free.`
    - `TECHNICAL GAIN Whenever this character quests, draw a card for each opposing character with {S}.`

- [ ] **006/characters/161-alice-savvy-sailor.test.ts**
  - Card: `006/characters/161-alice-savvy-sailor.ts`
    - `Ward (Opponents can't choose this character except to challenge.)`
    - `AHOY! Whenever this character quests, another chosen character of yours gets +1 {L} and gains Ward until the start of your next turn.`

- [ ] **006/characters/171-kakamora-long-range-specialist.test.ts**
  - Card: `MISSING`
    - `A LITTLE HELP - deals 1 damage to chosen character when another Pirate is in play`
    - `A LITTLE HELP - deals 1 damage to chosen location when another Pirate is in play`
    - `A LITTLE HELP - does not trigger when no other Pirate is in play`

- [ ] **006/characters/172-kokomora-pirate-chief.test.ts**
  - Card: `006/characters/172-kokomora-pirate-chief.ts`
    - `Discard a non-pirate card`
    - `Discard a pirate card`

- [ ] **006/characters/173-jim-hawkins-stubborn-cabin-boy.test.ts**
  - Card: `006/characters/173-jim-hawkins-stubborn-cabin-boy.ts`
    - `COME HERE, COME HERE, COME HERE! During your turn, whenever a card is put into your inkwell, this character gets Challenger +2 this turn. (While challenging, this character gets +2 {S}.)`

- [ ] **006/characters/174-mr-big-shrewd-tycoon.test.ts**
  - Card: `006/characters/174-mr-big-shrewd-tycoon.ts`
    - `REPUTATION This character can't be challenged by characters with 2 {S} or more.`

- [ ] **006/characters/175-mr-smee-steadfast-mate.test.ts**
  - Card: `006/characters/175-mr-smee-steadfast-mate.ts`
    - `GOOD CATCH During your turn, this character gains Evasive. (They can challenge characters with Evasive.)`

- [ ] **006/characters/176-mr-smee-captain-of-the-jolly-roger.test.ts**
  - Card: `006/characters/176-mr-smee-captain-of-the-jolly-roger.ts`
    - `Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Mr. Smee.)`
    - `RAISE THE COLORS When you play this character, you may deal damage to chosen character equal to the number of your other Pirate characters in play.`

- [ ] **006/characters/177-mullins-seasoned-shipmate.test.ts**
  - Card: `006/characters/177-mullins-seasoned-shipmate.ts`
    - `FALL IN LINE While you have a character named Mr. Smee in play, this character gains Resist +1. (Damage dealt to them is reduced by 1.)`
    - `FALL IN LINE ability is dynamic and updates when Mr. Smee enters or leaves play`

- [ ] **006/characters/180-hercules-unwavering-demigod.test.ts**
  - Card: `006/characters/180-hercules-unwavering-demigod.ts`
    - `Challenger +2 (While challenging, this character gets +2 {S}.)`

- [ ] **006/characters/181-john-silver-ship-s-cook.test.ts**
  - Card: `MISSING`
    - `Should apply a challenge restriction to opponents character`
    - `Should not persist past the opponents next turn`
    - `Should not apply to other characters`

- [ ] **006/characters/182-mr-arrow-legacy-s-first-mate.test.ts**
  - Card: `MISSING`
    - `Resist +1 (Damage dealt to this character is reduced by 1.)`

- [ ] **006/characters/183-jim-hawkins-rigger-specialist.test.ts**
  - Card: `006/characters/183-jim-hawkins-rigger-specialist.ts`
    - `Shift 3 (You may pay 3 {I} to play this on top of one of your characters named Jim Hawkins.)`
    - `BATTLE STATION When you play this character, you may deal 1 damage to chosen character or location.`

- [ ] **006/characters/185-billy-bones-space-sailor.test.ts**
  - Card: `006/characters/185-billy-bones-space-sailor.ts`
    - `KEEP IT HIDDEN When this character is banished, you may banish chosen item or location.`

- [ ] **006/characters/186-pluto-guard-dog.test.ts**
  - Card: `006/characters/186-pluto-guard-dog.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`
    - `BRAVO While this character has no damage, he gets +4 {S}.`

- [ ] **006/characters/187-mickey-mouse-night-watchman.test.ts**
  - Card: `006/characters/187-mickey-mouse-night-watchman.ts`
    - `SUPPORT Your Pluto characters get Resist +1. (Damage dealt to them is reduced by 1.)`

- [ ] **006/characters/188-cobra-bubbles-former-cia.test.ts**
  - Card: `006/characters/188-cobra-bubbles-former-cia.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`
    - `THINK ABOUT WHAT'S BEST 2 {I} – Draw a card, then choose and discard a card.`

- [ ] **006/characters/190-wreck-it-ralph-ham-hands.test.ts**
  - Card: `MISSING`
    - `I WRECK THINGS Whenever this character quests, you may banish chosen item or location to gain 2 lore.`

- [x] **006/characters/191-calhoun-marine-sergeant.test.ts**
  - Card: `006/characters/191-calhoun-marine-sergeant.ts`
    - `should gain 2 lore when banishes another character in a challenge during your turn`

- [ ] **006/characters/192-captain-amelia-commander-of-the-legacy.test.ts**
  - Card: `006/characters/192-captain-amelia-commander-of-the-legacy.ts`
    - `DRIVELING GALOOTS This character can't be challenged by Pirate characters.`
    - `EVERYTHING SHIPSHAPE While being challenged, your other characters gain Resist +1. (Damage dealt to them is reduced by 1.)`
    - `EVERYTHING SHIPSHAPE Does not trigger when challenging`

- [ ] **006/characters/193-jafar-power-hungry-vizier.test.ts**
  - Card: `MISSING`
    - `YOU WILL BE PAID WHEN THE TIME COMES During your turn, whenever a card is put into your inkwell, deal 1 damage to chosen character.`

- [ ] **006/characters/194-john-silver-stern-captain.test.ts**
  - Card: `006/characters/194-john-silver-stern-captain.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named John Silver.)`
    - `Resist +2 (Damage dealt to this character is reduced by 2.)`
    - `DON'T JUST SIT THERE! At the start of your turn, deal 1 damage to each opposing ready character.`

### items (18 tests)

- [ ] **006/items/031-naveen-s-ukulele.test.ts**
  - Card: `MISSING`
    - `MAKE IT SING 1 {I}, Banish this item - Chosen character counts as having +3 cost to sing songs this turn.`

- [ ] **006/items/032-pooh-pirate-ship.test.ts**
  - Card: `006/items/032-pooh-pirate-ship.ts`
    - `MAKE A RESCUE {E}, 3 {I} – Return a Pirate character card from your discard to your hand.`

- [ ] **006/items/033-scrump.test.ts**
  - Card: `006/items/033-scrump.ts`
    - `I MADE HER {E} one of your characters - Chosen character gets -2 {S} until the start of your next turn.`

- [ ] **006/items/065-maleficent-s-staff.test.ts**
  - Card: `MISSING`
    - `should gain 1 lore when an opponent's ITEM is returned to their hand`
    - `should gain 1 lore when an opponent's CHARACTER is returned to their hand`
    - `should gain 1 lore when an opponent's LOCATION is returned to their hand`
    - `should not gain lore when a card is returned to hand from discard`

- [ ] **006/items/066-mad-hatter-s-teapot.test.ts**
  - Card: `MISSING`
    - `**NO ROOM, NO ROOM**, {E}, 1 {I} – Each opponent puts the top card of their deck into their discard.`

- [ ] **006/items/067-pixie-dust.test.ts**
  - Card: `006/items/067-pixie-dust.ts`
    - `FAITH AND TRUST {E}, {2} {I} - Chosen character gains Challenger +2 and Evasive until the start of your next turn. (While challenging, they get +2 {1}. Only characters with Evasive can challenge them.)`

- [ ] **006/items/098-megabot.test.ts**
  - Card: `006/items/098-megabot.ts`
    - `HAPPY FACE This item enters play exerted.`
    - `DESTROY! {E}, Banish this item - Choose one:`
    - `* Banish chosen item.`
    - `* Banish chosen damaged character.`

- [ ] **006/items/099-galactic-communicator.test.ts**
  - Card: `006/items/099-galactic-communicator.ts`
    - `RESOURCE ALLOCATION 1 {I}, Banish this item - Return chosen character with 2 {S} or less to their player's hand.`
    - `regression check - cannot bounce targets with 3 attack or more.`

- [ ] **006/items/100-transport-pod.test.ts**
  - Card: `006/items/100-transport-pod.ts`
    - `GIVE 'EM A SHOW At the start of your turn, you may move a character of yours to a location for free.`

- [ ] **006/items/132-longboat.test.ts**
  - Card: `006/items/132-longboat.ts`
    - `TAKE IT FOR A SPIN 2 {I} – Chosen character of yours gains Evasive until the start of your next turn. (Only characters with Evasive can challenge them.)`

- [ ] **006/items/133-gold-coin.test.ts**
  - Card: `006/items/133-gold-coin.ts`
    - `GLITTERING ACCESS {E}, 1 {I}, Banish this item – Ready chosen character of yours. They can't quest for the rest of this turn.`

- [ ] **006/items/134-card-soldier-s-spear.test.ts**
  - Card: `MISSING`
    - `A SUITABLE WEAPON Your damaged characters get +1 {S}.`

- [ ] **006/items/166-baymax-s-healthcare-chip.test.ts**
  - Card: `MISSING`
    - `10,000 MEDICAL PROCEDURES {E} - Choose one:`
    - `* Remove up to 1 damage from chosen character. `
    - `* If you have a Robot character in play, remove up to 3 damage from chosen character.`

- [ ] **006/items/167-microbots.test.ts**
  - Card: `006/items/167-microbots.ts`
    - `LIMITLESS APPLICATIONS You may have any number of cards named Microbots in your deck.`
    - `INSPIRED TECH When you play this item, chosen character gets -1 {S} this turn for each item named Microbots you have in play.`

- [ ] **006/items/168-jumbo-pop.test.ts**
  - Card: `006/items/168-jumbo-pop.ts`
    - `HERE YOU GO Banish this item – Remove up to 2 damage from each of your characters. Draw a card.`

- [ ] **006/items/200-king-s-sensor-core.test.ts**
  - Card: `MISSING`
    - `Should give resist to your Prince and King characters in play`
    - `**ROYAL SEARCH** {E}, 2 {I} – Reveal the top card of your deck. If it’s a Prince or King character card, you may put it into your hand. Otherwise, put it on the top of your deck.`

- [ ] **006/items/201-training-dummy.test.ts**
  - Card: `006/items/201-training-dummy.ts`
    - `HANDLE WITH CARE {E}, 2 {I} – Chosen character gains Bodyguard until the start of your next turn. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`

- [ ] **006/items/202-sunglasses.test.ts**
  - Card: `006/items/202-sunglasses.ts`
    - `SPYCRAFT {E} - Draw a card, then choose and discard a card.`

### locations (12 tests)

- [ ] **006/locations/034-hundred-acre-island-pooh-s-home.test.ts**
  - Card: `MISSING`
    - `FRIENDS FOREVER During an opponent's turn, whenever a character is banished here, gain 1 lore.`

- [ ] **006/locations/035-sugar-rush-speedway-finish-line.test.ts**
  - Card: `006/locations/035-sugar-rush-speedway-finish-line.ts`
    - `Moving from another location`
    - `NOT Moving from another location`

- [ ] **006/locations/068-fairy-ship-royal-vessel.test.ts**
  - Card: `006/locations/068-fairy-ship-royal-vessel.ts`
    - `LOOK INNOCENT This location enters play exerted.`

- [ ] **006/locations/069-mystical-tree-mama-odie-s-home.test.ts**
  - Card: `MISSING`
    - `NOT BAD At the start of your turn, you may move 1 damage counter from chosen character here to chosen opposing character.`
    - `HARD-EARNED WISDOM At the start of your turn, if you have a character named Mama Odie here, gain 1 lore.`

- [ ] **006/locations/101-perilous-maze-watery-labyrinth.test.ts**
  - Card: `006/locations/101-perilous-maze-watery-labyrinth.ts`
    - `LOST IN THE WAVES Whenever a character is challenged while here, each opponent chooses and discards a card.`

- [ ] **006/locations/102-owl-island-secluded-entrance.test.ts**
  - Card: `006/locations/102-owl-island-secluded-entrance.ts`
    - `TEAMWORK For each character you have here, you pay 1 {I} less for the first action you play each turn.`
    - `LOTS TO LEARN Whenever you play a second action in a turn, gain 3 lore.`

- [ ] **006/locations/135-flotilla-coconut-armada.test.ts**
  - Card: `006/locations/135-flotilla-coconut-armada.ts`
    - `TINY THIEVES At the start of your turn, if you have a character here, all opponents lose 1 lore and you gain lore equal to the lore lost this way.`

- [ ] **006/locations/136-skull-rock-isolated-fortress.test.ts**
  - Card: `006/locations/136-skull-rock-isolated-fortress.ts`
    - `FAMILIAR GROUND Characters get +1 {S} while here.`
    - `SAFE HAVEN At the start of your turn, if you have a Pirate character here, gain 1 lore.`

- [ ] **006/locations/169-rescue-rangers-submarine-mobile-headquarters.test.ts**
  - Card: `006/locations/169-rescue-rangers-submarine-mobile-headquarters.ts`
    - `PLANNING SESSION At the start of your turn, if you have a character here, you may put the top card of your deck into your inkwell facedown and exerted.`

- [ ] **006/locations/170-institute-of-technology-prestigious-university.test.ts**
  - Card: `006/locations/170-institute-of-technology-prestigious-university.ts`
    - `WELCOME TO THE LAB Inventor characters get +1 {W} while here.`
    - `PUSH THE BOUNDARIES At the start of your turn, if you have a character here, gain 1 lore.`

- [ ] **006/locations/203-treasure-mountain-azurite-sea-island.test.ts**
  - Card: `006/locations/203-treasure-mountain-azurite-sea-island.ts`
    - `SECRET WEAPON At the start of your turn, deal damage to chosen character or location equal to the number of characters here.`

- [ ] **006/locations/204-galactic-council-chamber-courtroom.test.ts**
  - Card: `MISSING`
    - `**FEDERATION DECREE** While you have an Alien or Robot character here, this location can’t be challenged.`

## Set 007

### actions (17 tests)

- [ ] **007/actions/038-so-much-to-give.test.ts**
  - Card: `007/actions/038-so-much-to-give.ts`
    - `Draw a card. Chosen character gains Bodyguard until the start of your next turn. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`

- [ ] **007/actions/039-restoring-the-heart.test.ts**
  - Card: `007/actions/039-restoring-the-heart.ts`
    - `Draw a card`
    - `Remove up to 3 damage from chosen character`
    - `Remove up to 3 damage from chosen location`
    - `No targets available should give you a card draw`

- [ ] **007/actions/040-the-family-madrigal.test.ts**
  - Card: `007/actions/040-the-family-madrigal.ts`
    - `Happy Case`
    - `Choosing only one potential target`
    - `Choosing one correct target and one incorrect`
    - `choosing 2 songs`
    - `Choosing more than they should`

- [ ] **007/actions/080-magical-maneuvers.test.ts**
  - Card: `007/actions/080-magical-maneuvers.ts`
    - `Return chosen character of yours to your hand. Exert chosen character.`

- [ ] **007/actions/081-this-is-my-family.test.ts**
  - Card: `007/actions/081-this-is-my-family.ts`
    - `(A character with cost 2 or more can {E} to sing this song for free.)`
    - `Gain 1 lore. Draw a card.`

- [ ] **007/actions/082-show-me-more-.test.ts**
  - Card: `MISSING`
    - `Each player draws 3 cards`

- [ ] **007/actions/083-restoring-the-crown.test.ts**
  - Card: `007/actions/083-restoring-the-crown.ts`
    - `Exert all opposing characters. Whenever one of your characters banishes another character in a challenge this turn, gain 2 lore.`

- [ ] **007/actions/116-wake-up-alice-.test.ts**
  - Card: `MISSING`
    - `Return chosen damaged character to their player's hand.`

- [ ] **007/actions/117-he-s-a-tramp.test.ts**
  - Card: `MISSING`
    - `Chosen character gets +1 {S} this turn for each character you have in play.`

- [ ] **007/actions/118-the-return-of-hercules.test.ts**
  - Card: `007/actions/118-the-return-of-hercules.ts`
    - `Each player may reveal a character card from their hand and play it for free`
    - `Return of Hercules + When you play this character effects`
    - `Return of Hercules + When you play this character effects`

- [ ] **007/actions/119-ink-geyser.test.ts**
  - Card: `007/actions/119-ink-geyser.ts`
    - `Both have more than 3`
    - `Only active player has`
    - `Only opponent has`

- [ ] **007/actions/147-we-ve-got-company-.test.ts**
  - Card: `MISSING`
    - `Ready all your characters. They gain Reckless this turn. (They can't quest and must challenge if able.)`

- [ ] **007/actions/148-out-of-order.test.ts**
  - Card: `007/actions/148-out-of-order.ts`
    - `Banish chosen character`

- [ ] **007/actions/177-water-has-memory.test.ts**
  - Card: `007/actions/177-water-has-memory.ts`
    - `Own deck`
    - `Opponent deck`

- [ ] **007/actions/178-all-is-found.test.ts**
  - Card: `007/actions/178-all-is-found.ts`
    - `Put up to 2 cards from your discard into your inkwell, facedown and exerted`

- [ ] **007/actions/201-restoring-atlantis.test.ts**
  - Card: `007/actions/201-restoring-atlantis.ts`
    - `Your characters can't be challenged until the start of your next turn.`

- [ ] **007/actions/202-les-problemes-vont-par-paire.test.ts**
  - Card: `MISSING`
    - `Deal 1 damage to up to 2 chosen characters`

### characters (155 tests)

- [ ] **007/characters/001-rhino-motivational-speaker.test.ts**
  - Card: `007/characters/001-rhino-motivational-speaker.ts`
    - `DESTINY CALLING Your other characters get +2 {W}.`

- [ ] **007/characters/002-perdita-playful-mother.test.ts**
  - Card: `007/characters/002-perdita-playful-mother.ts`
    - `should pay 2 less for the next Puppy character you play this turn`
    - `should not discount the cost of non-Puppy characters`
    - `should give Ward only to Puppy characters`

- [ ] **007/characters/004-bolt-superdog.test.ts**
  - Card: `007/characters/004-bolt-superdog.ts`
    - `Shift 3`
    - `When you ready this character, gain 1 lore for each other undamaged character you have in play.`
    - `When you ready this character, gain 1 lore for each other undamaged character you have in play. (damaged characters not counted)`
    - `Banish chosen Illusion character.`
    - `Cannot banish a character that is not an illusion.`
    - `We should add effect to the bag even when there's no undamaged character`

- [ ] **007/characters/005-roger-radcliffe-dog-lover.test.ts**
  - Card: `007/characters/005-roger-radcliffe-dog-lover.ts`
    - `THERE YOU GO Whenever this character quests, you may remove up to 1 damage from each of your Puppy characters.`

- [ ] **007/characters/006-trusty-loyal-bloodhound.test.ts**
  - Card: `007/characters/006-trusty-loyal-bloodhound.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)`

- [ ] **007/characters/007-peg-natural-performer.test.ts**
  - Card: `007/characters/007-peg-natural-performer.ts`
    - `Draws a card if there are at least 3 other characters in play.`
    - `Does not draw a card if there are less than 3 other characters in play.`

- [ ] **007/characters/009-mittens-sassy-street-cat.test.ts**
  - Card: `007/characters/009-mittens-sassy-street-cat.ts`
    - `Bodyguard`
    - `Once during your turn, whenever a card is put into your inkwell, your other characters with Bodyguard get +1 {L} this turn.`
    - `Checking once during your turn`
    - `Not your turn, doesn't trigger`

- [x] **007/characters/010-tramp-street-smart-dog.test.ts**
  - Card: `007/characters/010-tramp-street-smart-dog.ts`
    - `For each of your characters in play you pay 1 {} less to play this character.`
    - `Can't play for cheaper if no characters in play`
    - `When you play this character, you may draw a card for each of your other characters in play. Then choose the same number of cards from your hand and discard them.`
    - `We're able to play Tramp even when we don't have enough ink`

- [ ] **007/characters/011-the-troubadour-musical-narrator.test.ts**
  - Card: `007/characters/011-the-troubadour-musical-narrator.ts`
    - `Resist +1 (Damage dealt to this character is reduced by 1.)`
    - `Singer 4 (This character counts as cost 4 to sing songs.)`

- [ ] **007/characters/012-wendy-darling-pirate-queen.test.ts**
  - Card: `007/characters/012-wendy-darling-pirate-queen.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `TELL NO TALES Whenever one of your other characters is banished, you may remove all damage from chosen character.`

- [ ] **007/characters/013-mirabel-madrigal-hopeful-dreamer.test.ts**
  - Card: `007/characters/013-mirabel-madrigal-hopeful-dreamer.ts`
    - `Evasive (Only characters with Evasive can challenge this character.) Singer 5 (This character counts as cost 5 to sing songs.)`

- [ ] **007/characters/014-aurora-waking-beauty.test.ts**
  - Card: `007/characters/014-aurora-waking-beauty.ts`
    - `should ready the character when you heal your character`
    - `should ready the character when you heal opponent's character`
    - `should not ready the character when you don't heal any damage`
    - `should not ready when opponents heal a character`
    - `Singer 5 (This character counts as cost 5 to sing songs.)`

- [ ] **007/characters/015-cinderella-the-right-one.test.ts**
  - Card: `007/characters/015-cinderella-the-right-one.ts`
    - `Returning The Glass Slipper`
    - `Not Returning The Glass Slipper`

- [ ] **007/characters/016-mariano-guzm-n-seductive-pretender.test.ts**
  - Card: `MISSING`
    - `I SEE YOU As long as you have a Dolores Madrigal character in play, this character gets +1 {L}.`
    - `Ensure only 1 lore is gained when Dolores Madrigal is not in play.`

- [ ] **007/characters/017-candlehead-dedicated-racer.test.ts**
  - Card: `007/characters/017-candlehead-dedicated-racer.ts`
    - `WINNING ISN'T EVERYTHING When this character is banished, you may remove up to 2 damage from chosen character.`

- [ ] **007/characters/018-bolt-dependable-friend.test.ts**
  - Card: `007/characters/018-bolt-dependable-friend.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character’s {S} this turn.)`

- [ ] **007/characters/019-pascal-garden-chameleon.test.ts**
  - Card: `007/characters/019-pascal-garden-chameleon.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **007/characters/020-king-candy-royal-racer.test.ts**
  - Card: `007/characters/020-king-candy-royal-racer.ts`
    - `SWEET REVENGE Whenever one of your other Racer characters is banished, each opponent chooses and banishes one of their characters.`

- [ ] **007/characters/021-penny-bolt-s-person.test.ts**
  - Card: `MISSING`
    - `Heal and Resist`

- [ ] **007/characters/022-fix-it-felix-jr--pint-sized-hero.test.ts**
  - Card: `MISSING`
    - `LET’S GET TO WORK Whenever you return a Racer character card from your discard to your hand, you may ready chosen Racer character. They can’t quest for the rest of this turn.`
    - `LET’S GET TO WORK GET TO WORK Try selecting a pilot to make ready from deck, I expect an exception`

- [ ] **007/characters/023-thunderbolt-wonder-dog.test.ts**
  - Card: `007/characters/023-thunderbolt-wonder-dog.ts`
    - `should shift in a Puppy character`
    - `should not shift in a non-Puppy character`

- [ ] **007/characters/024-the-prince-challenger-of-the-rise.test.ts**
  - Card: `MISSING`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`

- [ ] **007/characters/025-isabela-madrigal-in-the-moment.test.ts**
  - Card: `007/characters/025-isabela-madrigal-in-the-moment.ts`
    - `I WILL NOT BE PERFECT Every time one of your characters sings a song, this character cannot be challenged until the start of your next turn.`

- [ ] **007/characters/026-calhoun-courageous-rescuer.test.ts**
  - Card: `007/characters/026-calhoun-courageous-rescuer.ts`
    - `Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Calhoun.)`
    - `BACK TO START POSITIONS! Whenever this character challenges another character, you may return a Racer character card from your discard to your hand.`

- [ ] **007/characters/027-wreck-it-ralph-hero-s-duty.test.ts**
  - Card: `MISSING`
    - `OUTFLANK During your turn, whenever one of your other characters is banished, this character gets +1 {L} this turn.`

- [ ] **007/characters/028-lady-miss-park-avenue.test.ts**
  - Card: `007/characters/028-lady-miss-park-avenue.ts`
    - `Shift 3 (You may pay 3 {I} to play this on top of one of your characters named Lady.)`
    - `SOMETHING WONDERFUL When you play this character, you may return up to 2 character cards with cost 2 or less each from your discard to your hand.`
    - `SOMETHING WONDERFUL - Allows 1 character`
    - `Strength bonus persists after shifting onto Lady - Decisive Dog, and shift triggers Lady's own ability`

- [ ] **007/characters/029-pongo-dear-old-dad.test.ts**
  - Card: `007/characters/029-pongo-dear-old-dad.ts`
    - `FOUND YOU, YOU LITTLE RASCAL At the start of your turn, look at the cards in your inkwell. You may play a Puppy character from there for free.`

- [ ] **007/characters/030-kenai-protective-brother.test.ts**
  - Card: `007/characters/030-kenai-protective-brother.ts`
    - `HE NEEDS ME At the end of your turn, if this character is exerted, you may ready another chosen character of yours and remove all damage from them.`

- [ ] **007/characters/031-minnie-mouse-storyteller.test.ts**
  - Card: `007/characters/031-minnie-mouse-storyteller.ts`
    - `GATHER AROUND Whenever you play a character, this character gets +1 {L} this turn.`
    - `JUST ONE MORE Whenever this character quests, chosen opposing character loses {S} equal to this character's {L} until the start of your next turn.`

- [ ] **007/characters/032-perla-nimble-seamstress.test.ts**
  - Card: `007/characters/032-perla-nimble-seamstress.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character’s {S} this turn.)`

- [ ] **007/characters/033-snow-white-fairest-in-the-land.test.ts**
  - Card: `007/characters/033-snow-white-fairest-in-the-land.ts`
    - `HIDDEN AWAY This character can't be challenged.`

- [ ] **007/characters/035-mirabel-madrigal-musically-talented.test.ts**
  - Card: `007/characters/035-mirabel-madrigal-musically-talented.ts`
    - `Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Mirabel Madrigal.)`
    - `HER OWN SPECIAL GIFT Whenever this character quests, you may return a song card with cost 3 or less from your discard to your hand.`

- [ ] **007/characters/036-calhoun-battle-tested.test.ts**
  - Card: `007/characters/036-calhoun-battle-tested.ts`
    - `TACTICAL ADVANTAGE When you play this character, you may choose and discard a card to give chosen opposing character -3 {S} until the start of your next turn.`

- [ ] **007/characters/037-pepa-madrigal-sensitive-sister.test.ts**
  - Card: `007/characters/037-pepa-madrigal-sensitive-sister.ts`
    - `Singing a song`
    - `Casting a song`

- [ ] **007/characters/045-kuzco-temporary-whale.test.ts**
  - Card: `007/characters/045-kuzco-temporary-whale.ts`
    - `DON'T YOU SAY A WORD Once during your turn, whenever a card is put into your inkwell, you may return chosen character, item, or location with cost 2 or less to their player's hand, then that player draws a card.`
    - `DON'T YOU SAY A WORD Case when the card bounced is of the oppo.`

- [ ] **007/characters/047-treasure-guardian-foreboding-sentry.test.ts**
  - Card: `007/characters/047-treasure-guardian-foreboding-sentry.ts`
    - `UNTOLD TREASURE When you play this character, if you have an Illusion character in play, you may draw a card.`
    - `Regression - ensure card is not drawn on non-illusion characters`

- [ ] **007/characters/048-honeymaren-northuldra-guide.test.ts**
  - Card: `007/characters/048-honeymaren-northuldra-guide.ts`
    - `gain 1 lore when the opponent has an exerted character in play`
    - `does NOT gain 1 lore if the opponent has no exerted character in play`
    - `does NOT gain 1 lore if player own character is exerted`
    - `does NOT gain 1 lore for location`

- [ ] **007/characters/049-iago-giant-spectral-parrot.test.ts**
  - Card: `007/characters/049-iago-giant-spectral-parrot.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `Vanish (When an opponent chooses this character for an action, banish them.)`
    - `should vanish when hitted by and the came along zeus`
    - `should NOT vanish when targeted by an item's ability (vanish only triggers for actions)`
    - `should NOT vanish when targeted by Sapphire Coil's BRILLIANT SHINE ability (vanish only triggers for actions, not item abilities)`
    - `CHITBA should move damage to Iago before Vanish banishes him`
    - `when use Into the unknown, and iago is in location The Library, library owner don't draw a card and iago goes to the inkwell`

- [ ] **007/characters/050-chernabog-creature-of-the-night.test.ts**
  - Card: `007/characters/050-chernabog-creature-of-the-night.ts`
    - `MIDNIGHT FESTIVITIES When you play this character, each opponent chooses one of their readied characters and exhausts it. Characters exhausted this way do not ready at the start of their next turn.`
    - `should only allow opponent to choose ready characters, not already exerted ones`
    - `should reject selecting an already exerted character`

- [ ] **007/characters/051-jafar-newly-crowned.test.ts**
  - Card: `007/characters/051-jafar-newly-crowned.ts`
    - `THIS IS NOT DONE YET During an opponent’s turn, whenever one of your Illusion characters is banished, you may return that card to your hand.`

- [ ] **007/characters/052-hades-fast-talker.test.ts**
  - Card: `007/characters/052-hades-fast-talker.ts`
    - `should banish a character with cost 3 or less when you deal damage to your own character`
    - `should banish own character with cost 3 or less if it's the only valid target`

- [ ] **007/characters/053-madame-m-dusa-diamond-lover.test.ts**
  - Card: `MISSING`
    - `Milling opponent`
    - `Milling yourself`

- [ ] **007/characters/054-te-k--elemental-terror.test.ts**
  - Card: `MISSING`
    - `Shift 7 (You may pay 7 {I} to play this on top of one of your characters named Te Kā.)`
    - `ANCIENT RAGE During your turn, whenever an opposing character is exerted, banish them.`

- [ ] **007/characters/055-elsa-trusted-sister.test.ts**
  - Card: `007/characters/055-elsa-trusted-sister.ts`
    - `WHAT DO WE DO NOW? Whenever this character quests, if you have a character named Anna in play, gain 1 lore.`

- [ ] **007/characters/056-madam-mim-cheating-spellcaster.test.ts**
  - Card: `007/characters/056-madam-mim-cheating-spellcaster.ts`
    - `PLAY ROUGH Whenever this character quests, exert chosen opposing character.`

- [ ] **007/characters/057-giant-cobra-ghostly-serpent.test.ts**
  - Card: `007/characters/057-giant-cobra-ghostly-serpent.ts`
    - `Vanish (When an opponent chooses this character for an action, banish them.)`
    - `MYSTERIOUS ADVANTAGE When you play this character, you may choose and discard a card to gain 2 lore.`
    - `Giant Cobra + Broom Interaction`

- [ ] **007/characters/058-te-ka-lava-monster.test.ts**
  - Card: `007/characters/058-te-ka-lava-monster.ts`
    - `Challenger +2 (While challenging, this character gets +2 {S}).`

- [ ] **007/characters/059-yzma-changed-into-a-kitten.test.ts**
  - Card: `MISSING`
    - `should NOT return to hand when banished if player does not have more cards in hand`
    - `should return to hand when banished if player has more cards in hand`

- [ ] **007/characters/060-bucky-nutty-rascal.test.ts**
  - Card: `007/characters/060-bucky-nutty-rascal.ts`
    - `POP! When this character is banished in a challenge, you may draw a card.`

- [ ] **007/characters/062-rajah-ghostly-tiger.test.ts**
  - Card: `007/characters/062-rajah-ghostly-tiger.ts`
    - `should be banished when is targeted by an action`
    - `should NOT be banished when is targeted by an action from themselves`
    - `should not be banished when is play an area action and damage is not greater or equal as its willpower`

- [ ] **007/characters/063-kronk-relaxed.test.ts**
  - Card: `MISSING`
    - `Ward`
    - `I LOVE IT If an effect would make you discard one or more cards, don't discard any.`

- [ ] **007/characters/064-mother-gothel-vain-sorceress.test.ts**
  - Card: `007/characters/064-mother-gothel-vain-sorceress.ts`
    - `should move 1 damage counter from chosen character to chosen opposing character when ability is accepted`
    - `should not move damage when ability is declined`
    - `should move 1 damage counter from chosen character to chosen opposing character when challenging a location`
    - `moves damage before challenge is resolved`
    - `It cannot move damage caused during combat`

- [ ] **007/characters/065-sven-keen-eyed-reindeer.test.ts**
  - Card: `007/characters/065-sven-keen-eyed-reindeer.ts`
    - `Rush (This character can challenge the turn they’re played.)`
    - `FORMIDABLE GLARE When you play this character, chosen character gets -3 {S} this turn.`

- [ ] **007/characters/066-diablo-spiteful-raven.test.ts**
  - Card: `007/characters/066-diablo-spiteful-raven.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `Challenger +2 (While challenging, this character gets +2 {S})`

- [ ] **007/characters/067-merlin-clever-clairvoyant.test.ts**
  - Card: `007/characters/067-merlin-clever-clairvoyant.ts`
    - `PRESTIDIGITONIUM Whenever this character quests, name a card, then reveal the top card of your deck. If it's the named card, put it into your inkwell facedown and exerted. Otherwise, put it on the top of your deck.`

- [ ] **007/characters/068-yzma-above-it-all.test.ts**
  - Card: `007/characters/068-yzma-above-it-all.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named Yzma.)`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `Your character is banished`
    - `Opponent's character is banished`

- [ ] **007/characters/069-elsa-ice-maker.test.ts**
  - Card: `007/characters/069-elsa-ice-maker.ts`
    - `Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Elsa.)`
    - `Anna is in play`
    - `Anna is in NOT play`

- [ ] **007/characters/070-kenai-magical-bear.test.ts**
  - Card: `007/characters/070-kenai-magical-bear.ts`
    - `Challenger +2 (While challenging, this character gets +2 {}). WISDOM OF HIS STORY During your turn, when this character is banished in a challenge, return this card to your hand and gain 1 lore.`

- [ ] **007/characters/071-kuzco-panicked-llama.test.ts**
  - Card: `007/characters/071-kuzco-panicked-llama.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `• Each player draws a card. `
    - `• Each player chooses and discards a card.`

- [ ] **007/characters/072-anna-ice-breaker.test.ts**
  - Card: `007/characters/072-anna-ice-breaker.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character’s {S} this turn.)`
    - `WINTER AMBUSH When you play this character, chosen opposing character can’t ready at the start of their next turn.`

- [ ] **007/characters/073-donald-duck-flustered-sorcerer.test.ts**
  - Card: `007/characters/073-donald-duck-flustered-sorcerer.ts`
    - `OBFUSCATE! Opponents need 25 lore to win the game.`

- [ ] **007/characters/074-the-queen-jealous-beauty.test.ts**
  - Card: `007/characters/074-the-queen-jealous-beauty.ts`
    - `Moving a princess`
    - `NOT Moving a princess`

- [ ] **007/characters/075-panique-tense-imp.test.ts**
  - Card: `MISSING`
    - `FRIGHTENED SCREAM When you play this character, you can choose a character and move up to 2 of its damage to an opposing character of your choice.`

- [ ] **007/characters/076-archimedes-exceptional-owl.test.ts**
  - Card: `007/characters/076-archimedes-exceptional-owl.ts`
    - `LEARN MORE Every time this character is targeted by an action or ability of an opposing person, you may draw 1 card.`

- [ ] **007/characters/078-dolores-madrigal-within-earshot.test.ts**
  - Card: `007/characters/078-dolores-madrigal-within-earshot.ts`
    - `I HEAR YOU Whenever one of your characters sings a song, chosen opponent reveals their hand.`

- [ ] **007/characters/079-mufasa-among-the-stars.test.ts**
  - Card: `007/characters/079-mufasa-among-the-stars.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named Mufasa.)`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `Resist +1 (Damage dealt to this character is reduced by 1.)`

- [ ] **007/characters/086-grewnge-cannon-expert.test.ts**
  - Card: `007/characters/086-grewnge-cannon-expert.ts`
    - `should pay 1 {i} less for the next action`

- [ ] **007/characters/087-baymax-low-battery.test.ts**
  - Card: `007/characters/087-baymax-low-battery.ts`
    - `should enter exerted`

- [ ] **007/characters/088-thomas-o-malley-feline-charmer.test.ts**
  - Card: `MISSING`
    - `Ward (Opponents can't choose this character except to challenge.)`

- [ ] **007/characters/089-pete-pirate-scoundrel.test.ts**
  - Card: `007/characters/089-pete-pirate-scoundrel.ts`
    - `should banish chosen item when playing an action not a song`
    - `should not banish chosen item when playing a song`

- [ ] **007/characters/090-hiro-hamada-future-champion.test.ts**
  - Card: `007/characters/090-hiro-hamada-future-champion.ts`
    - `ORIGIN STORY When you play a Floodborn character on this card, draw a card.`
    - `should not trigger when Hiro is not the target`

- [ ] **007/characters/091-cheshire-cat-perplexing-feline.test.ts**
  - Card: `007/characters/091-cheshire-cat-perplexing-feline.ts`
    - `should deal 2 damage to chosend damaged character, when played`

- [ ] **007/characters/092-shere-khan-infamous-tiger.test.ts**
  - Card: `007/characters/092-shere-khan-infamous-tiger.ts`

- [ ] **007/characters/093-basil-secret-informer.test.ts**
  - Card: `007/characters/093-basil-secret-informer.ts`
    - `should give Reckless to damaged opposing characters, when questing`

- [ ] **007/characters/094-mad-hatter-unruly-eccentric.test.ts**
  - Card: `007/characters/094-mad-hatter-unruly-eccentric.ts`
    - `UNBIRTHDAY PRESENT Whenever a damaged character challenges another character, you may draw a card.`

- [ ] **007/characters/095-queen-of-hearts-unpredictable-bully.test.ts**
  - Card: `007/characters/095-queen-of-hearts-unpredictable-bully.ts`
    - `Shift 3 (You may pay 3 {I} to play this on top of one of your characters named Queen of Hearts.)`
    - `IF I LOSE MY TEMPER… Whenever another character is played, put a damage counter on them.`

- [ ] **007/characters/096-hiro-hamada-armor-designer.test.ts**
  - Card: `007/characters/096-hiro-hamada-armor-designer.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named Hiro Hamada.)`
    - `YOU CAN BE WAY MORE Your Floodborn characters that have a card under them gain Evasive and Ward. (Only characters with Evasive can challenge them. Opponents can’t choose them except to challenge.)`

- [ ] **007/characters/097-yokai-intellectual-schemer.test.ts**
  - Card: `007/characters/097-yokai-intellectual-schemer.ts`
    - `should reduce shift cost`
    - `should not reduce cost`
    - `should not reduce shift cost for opponent`

- [ ] **007/characters/098-donald-duck-lively-pirate.test.ts**
  - Card: `007/characters/098-donald-duck-lively-pirate.ts`
    - `should return an Action card that is not a song from discard to hand`

- [ ] **007/characters/100-lady-elegant-spaniel.test.ts**
  - Card: `007/characters/100-lady-elegant-spaniel.ts`
    - `should have +1 {L} with Tramp in play`
    - `should 1 {L} without Tramp in play`

- [ ] **007/characters/101-yzma-exasperated-schemer.test.ts**
  - Card: `007/characters/101-yzma-exasperated-schemer.ts`
    - `HOW SHALL I DO IT? When you play this character, you may draw a card, then choose and discard a card.`

- [ ] **007/characters/102-pacha-trekmate.test.ts**
  - Card: `007/characters/102-pacha-trekmate.ts`
    - `should have +2 {L} if having more cards in hand`
    - `should not have +2 {L} if not having more cards in hand`

- [ ] **007/characters/103-tweedle-dee-tweedle-dum-strange-storytellers.test.ts**
  - Card: `007/characters/103-tweedle-dee-tweedle-dum-strange-storytellers.ts`
    - `should return damaged character`

- [ ] **007/characters/104-baymax-giant-robot.test.ts**
  - Card: `007/characters/104-baymax-giant-robot.ts`
    - `should shift in any character`

- [ ] **007/characters/105-gizmoduck-suited-up.test.ts**
  - Card: `007/characters/105-gizmoduck-suited-up.ts`
    - `can challenge ready damaged characters`
    - `can't challenge ready not damaged characters`

- [ ] **007/characters/106-fidget-sneaky-bat.test.ts**
  - Card: `007/characters/106-fidget-sneaky-bat.ts`
    - `another character should gain Evasive`

- [ ] **007/characters/107-mr-smee-efficient-captain.test.ts**
  - Card: `007/characters/107-mr-smee-efficient-captain.ts`
    - `PIPE UP THE CREW Whenever you play an action that isn’t a song, you may ready chosen Pirate character.`

- [ ] **007/characters/108-daisy-duck-multitalented-pirate.test.ts**
  - Card: `007/characters/108-daisy-duck-multitalented-pirate.ts`
    - `FOWL PLAY Once during your turn, whenever a card is put into your inkwell, chosen opponent chooses one of their characters and returns that card to their hand.`

- [ ] **007/characters/109-john-silver-vengeful-pirate.test.ts**
  - Card: `MISSING`
    - `Doesn't not reduce the cost if there's no damage`
    - `reduces the cost when opponent's char is damaged`
    - `Resist +1 (Damage dealt to this character is reduced by 1.)`
    - `deals 1 damage to chosen character when playing a action not song`
    - `does NOT deal 1 damage to chosen character when playing a  song`

- [ ] **007/characters/110-tramp-enterprising-dog.test.ts**
  - Card: `007/characters/110-tramp-enterprising-dog.ts`
    - `HEY, PIDGE If you have a character named Lady in play, you pay 1 {I} less to play this character.`
    - `NO TIME FOR WISECRACKS When you play this character, chosen character of yours gets +1 {S} this turn for each other character you have in play.`
    - `NO TIME FOR WISECRACKS - Playing two Tramps gives each buff based on character count at time of play`

- [ ] **007/characters/111-king-of-hearts-picky-ruler.test.ts**
  - Card: `MISSING`
    - `OBJECTIONABLE STATE Damaged characters can't challenge your characters.`
    - `Characters with Reckless affect by the effect should NOT prevent players passing the turn.`
    - `Characters with Reckless affect by the effect should prevent players passing the turn if there's location in play.`

- [ ] **007/characters/113-anastasia-bossy-stepsister.test.ts**
  - Card: `007/characters/113-anastasia-bossy-stepsister.ts`
    - `OH, I HATE THIS! Whenever this character is challenged, the challenging player chooses and discards a card.`

- [ ] **007/characters/114-pete-space-pirate.test.ts**
  - Card: `MISSING`
    - `Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Pete.)`
    - `While this character is exerted, opposing characters can't exert to sing songs.`
    - `While this character is exerted, your Pirate characters gain Resist +1. (Damage dealt to them is reduced by 1.)`
    - `should apply resist to itself while challenging`
    - `Should prevent Singing Together`

- [ ] **007/characters/115-lady-tremaine-bitterly-jealous.test.ts**
  - Card: `007/characters/115-lady-tremaine-bitterly-jealous.ts`
    - `THAT'S QUITE ENOUGH {E} – Return chosen damaged character to their player's hand. Then, each opponent discards a card at random.`

- [ ] **007/characters/121-grand-m-re-fa-ancienne-pleine-d-entrain.test.ts**
  - Card: `MISSING`
    - `I HAVE ALL THE LUCK WE NEED Each time this character is sent on an adventure, you can choose one of your characters to gain +2 {S} for the rest of the turn.`

- [ ] **007/characters/122-queen-of-hearts-losing-her-temper.test.ts**
  - Card: `007/characters/122-queen-of-hearts-losing-her-temper.ts`
    - `ROYAL PAIN While this character has damage, she gets +3 {S}.`

- [ ] **007/characters/123-the-matchmaker-unforgiving-expert.test.ts**
  - Card: `007/characters/123-the-matchmaker-unforgiving-expert.ts`
    - `YOU ARE A DISGRACE! Whenever this character challenges another character, each opponent loses 1 lore.`

- [ ] **007/characters/124-denahi-impatient-hunter.test.ts**
  - Card: `007/characters/124-denahi-impatient-hunter.ts`
    - `Reckless (This character can’t quest and must challenge each turn if able.)`
    - `Resist +2 (Damage dealt to this character is reduced by 2.)`

- [ ] **007/characters/125-stabbington-brother-without-a-patch.test.ts**
  - Card: `007/characters/125-stabbington-brother-without-a-patch.ts`
    - `Rush (This character can challenge the turn they're played.) GET 'EM! Your other characters named Stabbington Brother gain Rush.`

- [ ] **007/characters/126-belle-mechanic-extraordinaire.test.ts**
  - Card: `007/characters/126-belle-mechanic-extraordinaire.ts`
    - `Shift 7`
    - `SALVAGE For each item card in your discard, you pay 1 {I} less to play this character using her Shift ability.`
    - `Moving 3`
    - `Moving 1`

- [ ] **007/characters/127-cy-bug-invasive-enemy.test.ts**
  - Card: `007/characters/127-cy-bug-invasive-enemy.ts`
    - `HIVE MIND This character gets +1 {S} for each other character you have in play.`

- [ ] **007/characters/128-stabbington-brother-with-a-patch.test.ts**
  - Card: `007/characters/128-stabbington-brother-with-a-patch.ts`
    - `CRIME OF OPPORTUNITY When you play this character, chosen opponent loses 1 lore.`

- [ ] **007/characters/129-card-soldiers-royal-troops.test.ts**
  - Card: `MISSING`
    - `TAKE POINT While a damaged character is in play, this character gets +2 {S}.`

- [ ] **007/characters/130-cogsworth-climbing-clock.test.ts**
  - Card: `007/characters/130-cogsworth-climbing-clock.ts`
    - `STILL USEFUL While you have an item card in your discard, this character gets +2 {S}.`
    - `No item in discard`

- [ ] **007/characters/132-beagle-boys-small-time-crooks.test.ts**
  - Card: `007/characters/132-beagle-boys-small-time-crooks.ts`
    - `HURRY IT UP! Whenever this character quests, chosen character of yours gains Rush and Resist +1 this turn. (They can challenge the turn they're played. Damage dealt to them is reduced by 1.)`

- [ ] **007/characters/133-li-shang-newly-promoted.test.ts**
  - Card: `007/characters/133-li-shang-newly-promoted.ts`
    - `I WON'T LET YOU DOWN This character can challenge ready characters.`
    - `BIG RESPONSIBILITY While this character is damaged, he gets +2 {S}.`

- [ ] **007/characters/134-moana-island-explorer.test.ts**
  - Card: `007/characters/134-moana-island-explorer.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `ADVENTUROUS SPIRIT Whenever this character challenges another character, another chosen character of yours gets +3 {S} this turn.`

- [ ] **007/characters/135-the-phantom-blot-shadowy-figure.test.ts**
  - Card: `007/characters/135-the-phantom-blot-shadowy-figure.ts`
    - `Rush (This character can challenge the turn they're played.)`

- [ ] **007/characters/136-beast-frustrated-designer.test.ts**
  - Card: `MISSING`
    - `I'VE HAD IT! {E}, 2 {I}, Banish 2 of your items – Deal 5 damage to chosen character.`

- [ ] **007/characters/137-mushu-majestic-dragon.test.ts**
  - Card: `007/characters/137-mushu-majestic-dragon.ts`
    - `INTIMIDATING AND AWE-INSPIRING Whenever one of your characters challenges, they gain Resist +2 during that challenge. (Damage dealt to them is reduced by 2.)`
    - `GUARDIAN OF LOST SOULS During your turn, whenever one of your characters banishes another character in a challenge, gain 2 lore.`
    - `Ensure lore is only gained during players turn`

- [ ] **007/characters/138-maurice-unconventional-inventor.test.ts**
  - Card: `007/characters/138-maurice-unconventional-inventor.ts`
    - `Choosing Maurice's Machine`
    - `NOT choosing Maurice's Machine`

- [ ] **007/characters/139-goofy-extreme-athlete.test.ts**
  - Card: `007/characters/139-goofy-extreme-athlete.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `STAR POWER Whenever this character challenges another character, your other characters get +1 {L} this turn.`

- [ ] **007/characters/140-lyle-tiberius-rourke-crystallized-mercenary.test.ts**
  - Card: `007/characters/140-lyle-tiberius-rourke-crystallized-mercenary.ts`
    - `EXPLOSIVE Once during your turn, whenever a card is put into your inkwell, deal 2 damage to each character in play.`

- [ ] **007/characters/141-mulan-imperial-general.test.ts**
  - Card: `007/characters/141-mulan-imperial-general.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named Mulan.)`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **007/characters/142-baloo-ol-iron-paws.test.ts**
  - Card: `007/characters/142-baloo-ol-iron-paws.ts`
    - `Only gives effect while in play`
    - `As Attacker`
    - `As Defender`
    - `Damage from a single target card`
    - `Damage from a multi target cards`
    - `Does not prevent 'put' damage effects`
    - `Does not prevent 'move' damage effects`

- [ ] **007/characters/143-ratigan-nefarious-criminal.test.ts**
  - Card: `007/characters/143-ratigan-nefarious-criminal.ts`
    - `A MARVELOUS PERFORMANCE Whenever you play an action while this character is exerted, gain 1 lore.`

- [ ] **007/characters/145-milo-thatch-undaunted-scholar.test.ts**
  - Card: `007/characters/145-milo-thatch-undaunted-scholar.ts`
    - `I'M YOUR GUY Whenever you play an action, you may give chosen character +2 {S} this turn.`

- [ ] **007/characters/153-clarabelle-news-reporter.test.ts**
  - Card: `007/characters/153-clarabelle-news-reporter.ts`
    - `SUPPORT (When this character is sent on an adventure, you can add its {S} to that of another character of your choice for the rest of this turn.)`
    - `SCOOP Your other characters with Support gain +1 {S}.`

- [ ] **007/characters/154-scrooge-mcduck-resourceful-miser.test.ts**
  - Card: `MISSING`
    - `PUT IT TO GOOD USE You may exert 4 items of yours to play this character for free.`
    - `FORTUNE HUNTER When you play this character, look at the top 4 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **007/characters/155-mattias-arendelle-general.test.ts**
  - Card: `007/characters/155-mattias-arendelle-general.ts`
    - `PROUD TO SERVE Your Queen characters gain Ward. (Opponents can't choose them except to challenge.)`

- [ ] **007/characters/157-monsieur-d-arque-despicable-propietor.test.ts**
  - Card: `MISSING`
    - `I'M HERE TO COLLECT MY DUE Whenever this character is sent on an adventure, you can choose one of your items and banish it to draw a card.`

- [ ] **007/characters/159-belle-apprentice-inventor.test.ts**
  - Card: `MISSING`
    - `WHAT A MESS During your turn, you may banish chosen item of yours to play this character for free.`

- [ ] **007/characters/160-lucky-runt-of-the-litter.test.ts**
  - Card: `007/characters/160-lucky-runt-of-the-litter.ts`
    - `FOLLOW MY VOICE Whenever this character quests, look at the top 2 cards of your deck. You may reveal any number of Puppy character cards and put them in your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **007/characters/161-dawson-puzzling-sleuth.test.ts**
  - Card: `007/characters/161-dawson-puzzling-sleuth.ts`
    - `BE SENSIBLE Once during your turn, whenever a card is put into your inkwell, look at the top card of your deck. You may put it on either the top or the bottom of your deck.`

- [ ] **007/characters/162-tamatoa-happy-as-a-clam.test.ts**
  - Card: `007/characters/162-tamatoa-happy-as-a-clam.ts`
    - `COOLEST COLLECTION When you play this character, return up to 2 item cards from your discard to your hand.`
    - `I'M BEAUTIFUL, BABY! Whenever this character quests, you may play an item for free.`

- [ ] **007/characters/163-heihei-expanded-consciousness.test.ts**
  - Card: `007/characters/163-heihei-expanded-consciousness.ts`
    - `Shift 3 (You may pay 3 {I} to play this on top of one of your characters named Heihei.)`
    - `Resist +1 (Damage dealt to this character is reduced by 1.)`
    - `CLEAR YOUR MIND When you play this character, put all cards from your hand into your inkwell facedown and exerted.`

- [ ] **007/characters/164-kida-creative-thinker.test.ts**
  - Card: `MISSING`
    - `Ward (Opponents can't choose this character except to challenge.)`
    - `KEY TO THE PUZZLE {E} – Look at the top 2 cards of your deck. Put one into your ink supply, face down and exerted, and the other on top of your deck.`

- [ ] **007/characters/166-marie-favored-kitten.test.ts**
  - Card: `007/characters/166-marie-favored-kitten.ts`
    - `I'LL SHOW YOU Whenever this character quests, you may give chosen character -2 {S} this turn.`

- [ ] **007/characters/167-pepper-quick-thinking-puppy.test.ts**
  - Card: `007/characters/167-pepper-quick-thinking-puppy.ts`
    - `IN THE NICK OF TIME Whenever one of your Puppy characters is banished, you may put that card into your inkwell facedown and exerted.`
    - `Pepper to the inkwell`

- [ ] **007/characters/168-freckles-good-boy.test.ts**
  - Card: `007/characters/168-freckles-good-boy.ts`
    - `JUST SO CUTE! When you play this character, chosen opposing character gets -1 {S} this turn.`

- [ ] **007/characters/169-honey-lemon-chemistry-whiz.test.ts**
  - Card: `007/characters/169-honey-lemon-chemistry-whiz.ts`
    - `PRETTY GREAT, HUH? Whenever you play a Floodborn character, if you used Shift to play them, you may remove up to 2 damage from chosen character.`

- [ ] **007/characters/170-robin-hood-eye-for-detail.test.ts**
  - Card: `007/characters/170-robin-hood-eye-for-detail.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character’s {S} this turn.)`

- [ ] **007/characters/171-penny-the-orphan-clever-child.test.ts**
  - Card: `MISSING`
    - `OUR BOTTLE WORKED! While you have a Hero character in play, this character gains Ward. (Opponents can't choose them except to challenge.)`

- [ ] **007/characters/172-lady-kluck-protective-confidant.test.ts**
  - Card: `007/characters/172-lady-kluck-protective-confidant.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`
    - `Ward (Opponents can’t choose this character except to challenge.)`

- [ ] **007/characters/173-jasmine-inspired-researcher.test.ts**
  - Card: `007/characters/173-jasmine-inspired-researcher.ts`
    - `EXTRA ASSISTANCE Whenever this character quests, if you have no cards in your hand, draw a card for each Ally character you have in play.`
    - `EXTRA ASSISTANCE Whenever this character quests, if you have no cards in your hand, draw a card for each Ally character you have in play.`

- [ ] **007/characters/174-jebidiah-farnsworth-expedition-cook.test.ts**
  - Card: `007/characters/174-jebidiah-farnsworth-expedition-cook.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)`
    - `I GOT YOUR FOUR BASIC FOOD GROUPS When you play this character, chosen character gains Resist +1 until the start of your next turn. (Damage dealt to them is reduced by 1.)`

- [ ] **007/characters/175-baymax-upgraded-robot.test.ts**
  - Card: `007/characters/175-baymax-upgraded-robot.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)`
    - `ADVANCED SCANNER When you play this character, look at the top 4 cards of your deck. You may reveal a Floodborn character card and put it into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **007/characters/176-maid-marian-badminton-ace.test.ts**
  - Card: `007/characters/176-maid-marian-badminton-ace.ts`
    - `During an opponent’s turn, whenever one of your Ally characters is damaged, deal 1 damage to chosen opposing character.`
    - `Your characters named Lady Kluck gain Resist +1. (Damage dealt to them is reduced by 1.)`

- [ ] **007/characters/181-dr-calico-green-eyed-man.test.ts**
  - Card: `007/characters/181-dr-calico-green-eyed-man.ts`
    - `YOU'RE BEGINNING TO IRK ME While this character has no damage, he gains Resist +2. (Damage dealt to them is reduced by 2.)`

- [ ] **007/characters/183-helga-sinclair-tough-as-nails.test.ts**
  - Card: `007/characters/183-helga-sinclair-tough-as-nails.ts`
    - `Challenger +3 (While challenging, this character gets +3 {S}).`
    - `QUICK REFLEXES During your turn, this character gains Evasive. (They can challenge characters with Evasive.)`

- [ ] **007/characters/184-bolt-headstrong-dog.test.ts**
  - Card: `007/characters/184-bolt-headstrong-dog.ts`
    - `THERE'S NO TURNING BACK Whenever this character quests, if he has no damage, you may draw a card, then choose and discard a card.`

- [ ] **007/characters/186-raya-guidance-seeker.test.ts**
  - Card: `007/characters/186-raya-guidance-seeker.ts`
    - `A GREATER PURPOSE During your turn, whenever a card is put into your inkwell, this character gains Resist +1 until the start of your next turn. (Damage dealt to them is reduced by 1.)`

- [ ] **007/characters/187-tuk-tuk-disarmingly-cute.test.ts**
  - Card: `007/characters/187-tuk-tuk-disarmingly-cute.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`
    - `Resist +2 (Damage dealt to this character is reduced by 2.)`

- [ ] **007/characters/188-fa-zhou-war-hero.test.ts**
  - Card: `007/characters/188-fa-zhou-war-hero.ts`
    - `TRAINING EXERCISES Each time one of your characters challenges another, if it is the second challenge of this turn, gain 3 lore shards.`

- [ ] **007/characters/189-razoul-menacing-guard.test.ts**
  - Card: `MISSING`
    - `MY ORDERS COME FROM JAFAR When you play this character, if you have a character named Jafar in play, you may banish chosen item.`

- [ ] **007/characters/190-jafar-aspiring-ruler.test.ts**
  - Card: `007/characters/190-jafar-aspiring-ruler.ts`
    - `THAT'S BETTER When you play this character, chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)`

- [ ] **007/characters/191-tick-tock-relentless-crocodile.test.ts**
  - Card: `007/characters/191-tick-tock-relentless-crocodile.ts`
    - `LOOKING FOR LUNCH During your turn, this character gains Evasive while a Pirate character is in play. (They can challenge characters with Evasive.)`

- [ ] **007/characters/192-kakamora-band-of-pirates.test.ts**
  - Card: `007/characters/192-kakamora-band-of-pirates.ts`
    - `should not have challenger if you don't have another pirate`
    - `should have challenger if you have another pirate`

- [x] **007/characters/193-mulan-disguised-soldier.test.ts**
  - Card: `007/characters/193-mulan-disguised-soldier.ts`
    - `WHERE DO I SIGN IN? When you play this character, you may draw a card, then choose and discard a card.`

- [ ] **007/characters/194-orville-albatross-air.test.ts**
  - Card: `007/characters/194-orville-albatross-air.ts`
    - `Should not have Evasive when no Miss Bianca or Bernard in play`
    - `Should gain Evasive during your turn when Miss Bianca is in play`
    - `Should gain Evasive during your turn when Bernard is in play`

- [ ] **007/characters/195-miss-bianca-indefectible-agent.test.ts**
  - Card: `MISSING`
    - `KEEP HOPE Playing this character costs you 2 {I} less if you have an Ally character in play.`

- [ ] **007/characters/197-aladdin-research-assistant.test.ts**
  - Card: `007/characters/197-aladdin-research-assistant.ts`
    - `should play an Ally character of cost 3 or less for free`
    - `should not play an Ally character of cost 3 or more for free`
    - `should not discount the cost of non-Ally characters`
    - `should give +1 {S} only to Ally characters`
    - `should not give +1 {S} only to non-Ally characters`
    - `Should trigger 'whenever played' effects for played card`

- [ ] **007/characters/198-bagheera-guardian-jaguar.test.ts**
  - Card: `007/characters/198-bagheera-guardian-jaguar.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`
    - `deals 2 damage to each opposing character when Bagheera is banished on the opponent's turn`
    - `does NOT deal 2 damage if Bagheera is banished on your own turn`
    - `does NOT trigger if Bagheera leaves play another way (e.g., returned to hand)`
    - `only damages opposing characters, not your own, when Bagheera is banished on the opponent's turn`
    - `BUG-REPORT - Banish bagheera with a song on my opponents turn`
    - `Trying to replicate a bug, this test is not relevant`

- [ ] **007/characters/199-gantu-experienced-enforcer.test.ts**
  - Card: `007/characters/199-gantu-experienced-enforcer.ts`
    - `CLOSE ALL CHANNELS When you play this character, characters can’t exert to sing songs until the start of your next turn.`
    - `[Active Player] Increase cost for items and actions, but not for characters`
    - `[Opponent] Increase cost for items and actions, but not for characters`
    - `Effect Accumulates`
    - `This doesn't apply to singing songs.`
    - `Prince Naveen - Ukulele Player + Gantu - Experienced Enforcer`

- [ ] **007/characters/200-mickey-mouse-inspirational-warrior.test.ts**
  - Card: `007/characters/200-mickey-mouse-inspirational-warrior.ts`
    - `STIRRING SPIRIT During your turn, whenever this character banishes another character in a challenge, you may play a character for free.`

### items (14 tests)

- [ ] **007/items/041-amber-coil.test.ts**
  - Card: `007/items/041-amber-coil.ts`
    - `HEALING AURA During your turn, whenever a card is put into your inkwell, you may remove up to 2 damage from chosen character.`

- [ ] **007/items/042-spaghetti-dinner.test.ts**
  - Card: `007/items/042-spaghetti-dinner.ts`
    - `FINE DINING {E}, 1 {I} – If you have 2 or more characters in play, gain 1 lore.`

- [ ] **007/items/043-kanine-krunchies.test.ts**
  - Card: `007/items/043-kanine-krunchies.ts`
    - `YOU CAN BE A CHAMPION, TOO Your Puppy characters get +1 {W}.`

- [ ] **007/items/044-the-glass-slipper.test.ts**
  - Card: `007/items/044-the-glass-slipper.ts`
    - `SEARCH THE KINGDOM Banish this item, {E} one of your Prince characters – Search your deck for a Princess character card and reveal it to all players. Put that card into your hand and shuffle your deck.`
    - `should allow using a wet (played this turn) Prince character to pay the exert cost`

- [ ] **007/items/084-amethyst-coil.test.ts**
  - Card: `007/items/084-amethyst-coil.ts`
    - `MAGICAL TOUCH During your turn, whenever a card is put into your inkwell, you may move 1 damage counter from chosen character to chosen opposing character.`

- [ ] **007/items/120-emerald-coil.test.ts**
  - Card: `007/items/120-emerald-coil.ts`
    - `SHIMMERING WINGS During your turn, whenever a card is put into your inkwell, chosen character gains Evasive until the start of your next turn. (Only characters with Evasive can challenge them.)`

- [ ] **007/items/149-ruby-coil.test.ts**
  - Card: `007/items/149-ruby-coil.ts`
    - `CRIMSON SPARK During your turn, whenever a card is put into your inkwell, chosen character gets +2 {S} this turn.`

- [ ] **007/items/150-unconventional-tool.test.ts**
  - Card: `007/items/150-unconventional-tool.ts`
    - `FIXED IN NO TIME When this item is banished, you pay 2 {I} less for the next item you play this turn.`

- [ ] **007/items/151-maurice-s-machine.test.ts**
  - Card: `MISSING`
    - `BREAK DOWN When this item is banished, you may return an item card with cost 2 or less from your discard to your hand.`

- [ ] **007/items/152-devil-s-eye-diamond.test.ts**
  - Card: `MISSING`
    - `THE PRICE OF POWER {E} - If one of your characters was damaged this turn, gain 1 lore.`
    - `Should be able to activate Devil's Eye Diamond when characters are banished by damage`

- [ ] **007/items/179-sapphire-coil.test.ts**
  - Card: `007/items/179-sapphire-coil.ts`
    - `BRILLIANT SHINE During your turn, whenever a card is put into your inkwell, you may give chosen character -2 {S} this turn.`

- [ ] **007/items/180-baymax-s-charging-station.test.ts**
  - Card: `MISSING`
    - `ENERGY CONVERTER Whenever you play a Floodborn character, if you used Shift to play them, you may draw a card.`

- [ ] **007/items/203-steel-coil.test.ts**
  - Card: `007/items/203-steel-coil.ts`
    - `METALLIC FLOW During your turn, whenever a card is put into your inkwell, you may draw a card, then choose and discard a card.`
    - `should be able to discard the card that was drawn`

- [ ] **007/items/204-training-staff.test.ts**
  - Card: `007/items/204-training-staff.ts`
    - `PRECISION STRIKE {E}, 1 {I} – Chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)`

## Set 008

### action (27 tests)

- [ ] **008/action/039-candy-drift.test.ts**
  - Card: `008/action/039-candy-drift.ts`
    - `Draw a card. Chosen character of yours gets +5 {S} this turn. At the end of your turn, banish them.`
    - `Draws a card without a target for rest of it`

- [ ] **008/action/040-she-s-your-person.test.ts**
  - Card: `008/action/040-she-s-your-person.ts`
    - `- Remove up to 3 damage from chosen character.`
    - `- Remove up to 3 damage from each of your characters with Bodyguard.`

- [ ] **008/action/041-only-so-much-room.test.ts**
  - Card: `008/action/041-only-so-much-room.ts`
    - `Return chosen character with 2 {S} or less to their player's hand. Return a character card from your discard to your hand.`

- [ ] **008/action/042-it-means-no-worries.test.ts**
  - Card: `008/action/042-it-means-no-worries.ts`
    - `Return up to 3 character cards from your discard to your hand.`
    - ` You pay 2 {I} less for the next character you play this turn.`

- [ ] **008/action/043-trials-and-tribulations.test.ts**
  - Card: `008/action/043-trials-and-tribulations.ts`
    - `(A character with cost 2 or more can {E} to sing this song for free.)`
    - `Chosen character gets -4 {S} until the start of your next turn.`

- [ ] **008/action/077-forest-duel.test.ts**
  - Card: `008/action/077-forest-duel.ts`
    - `Your characters gain Challenger +2 and “When this character is banished in a challenge, return this card to your hand” this turn. (They get +2 {S} while challenging.)`

- [ ] **008/action/078-they-never-come-back.test.ts**
  - Card: `008/action/078-they-never-come-back.ts`
    - `Up to 2 chosen characters can’t ready at the start of their next turn. Draw a card.`

- [ ] **008/action/079-fantastical-and-magical.test.ts**
  - Card: `008/action/079-fantastical-and-magical.ts`
    - `Sing Together 9`
    - `For each character that sang this song, draw a card and gain 1 lore.`

- [ ] **008/action/080-pull-the-lever-.test.ts**
  - Card: `MISSING`
    - `- Draw 2 cards.`
    - `- Each opponent chooses and discards a card.`

- [ ] **008/action/081-into-the-unknown.test.ts**
  - Card: `008/action/081-into-the-unknown.ts`
    - `(A character with cost 3 or more can {E} to sing this song for free.)`
    - `Put chosen exerted character into their player's inkwell facedown and exerted.`
    - `No characters in play`

- [ ] **008/action/082-everybody-s-got-a-weakness.test.ts**
  - Card: `008/action/082-everybody-s-got-a-weakness.ts`
    - `Move 1 damage counter from each damaged character you have in play to chosen opposing character. Draw a card for each damage counter moved this way.`

- [ ] **008/action/114-he-who-steals-and-runs-away.test.ts**
  - Card: `008/action/114-he-who-steals-and-runs-away.ts`
    - `Banish chosen item. Draw a card.`

- [ ] **008/action/115-stopped-chaos-in-its-tracks.test.ts**
  - Card: `008/action/115-stopped-chaos-in-its-tracks.ts`
    - `Return up to 2 chosen characters with 3 {S} or less each to their player's hand.`

- [ ] **008/action/116-wrong-lever-.test.ts**
  - Card: `MISSING`
    - `- Return chosen character to their player's hand.`
    - `- Put a Pull the Lever! card from your discard pile on the bottom of your deck to put chosen character on the bottom of their owner's deck.`
    - `Selecting second mode without Pull the Lever on discard`

- [ ] **008/action/117-undermine.test.ts**
  - Card: `008/action/117-undermine.ts`
    - `Chosen opponent chooses and discards a card. Chosen character gets +2 {S} this turn.`

- [ ] **008/action/118-walk-the-plank-.test.ts**
  - Card: `MISSING`
    - `Your Pirate characters gain '{E} – Banish chosen damaged character' this turn.`

- [ ] **008/action/147-nothing-we-won-t-do.test.ts**
  - Card: `MISSING`
    - `Sing Together 8 (Any number of your or your teammates' characters with total cost 8 or more may {E} to sing this song for free.)`
    - `Ready all your characters. For the rest of this turn, they take no damage from challenges and can't quest.`

- [ ] **008/action/148-get-out-.test.ts**
  - Card: `MISSING`
    - `Banish chosen character, then return an item card from your discard to your hand.`

- [ ] **008/action/149-light-the-fuse.test.ts**
  - Card: `008/action/149-light-the-fuse.ts`
    - `Deal 1 damage to chosen character for each exerted character you have in play.`

- [ ] **008/action/150-twitterpated.test.ts**
  - Card: `008/action/150-twitterpated.ts`
    - `Chosen character gains Evasive until the start of your next turn. (Only characters with Evasive can challenge them.)`

- [ ] **008/action/151-most-everyone-s-mad-here.test.ts**
  - Card: `MISSING`
    - `Gain lore equal to the damage on chosen character, then banish them.`
    - `Character with no damage`

- [ ] **008/action/175-heads-held-high.test.ts**
  - Card: `008/action/175-heads-held-high.ts`
    - `Remove up to 3 damage from any number of chosen characters. All opposing characters get -3 {S} this turn.`

- [ ] **008/action/176-pouncing-practice.test.ts**
  - Card: `008/action/176-pouncing-practice.ts`
    - `Chosen character gets -2 {S} this turn. Chosen character of yours gains Evasive this turn. (They can challenge characters with Evasive.)`

- [ ] **008/action/177-down-in-new-orleans.test.ts**
  - Card: `008/action/177-down-in-new-orleans.ts`
    - `Look at the top 3 cards of your deck. You may reveal a character, item, or location card with cost 6 or less and play it for free. Put the rest on the bottom of your deck in any order.`
    - `Playing a character`
    - `Should not crash when playing Down In New Orleans with no valid cards`

- [ ] **008/action/201-desperate-plan.test.ts**
  - Card: `008/action/201-desperate-plan.ts`
    - `No cards in hand`
    - `With cards in hand`

- [ ] **008/action/202-beyond-the-horizon.test.ts**
  - Card: `008/action/202-beyond-the-horizon.ts`
    - `Sing Together 7 (Any number of your or your teammates' characters with total cost 7 or more may {E} to sing this song for free.)`
    - `Both Discard their hands`
    - `Only player discards`
    - `Only opponent discards`

- [ ] **008/action/203-quick-shot.test.ts**
  - Card: `008/action/203-quick-shot.ts`
    - `Deal 1 damage to chosen character. Draw a card.`

### character (151 tests)

- [ ] **008/character/001-louie-one-cool-duck.test.ts**
  - Card: `008/character/001-louie-one-cool-duck.ts`
    - `SPRING THE TRAP While this character is being challenged, the challenging character gets -1 {S}.`

- [ ] **008/character/003-huey-reliable-leader.test.ts**
  - Card: `008/character/003-huey-reliable-leader.ts`
    - `I KNOW THE WAY Whenever this character quests, you pay 1 {I} less for the next character you play this turn.`
    - `Player1 have hueyReliableLeader in play and 3 ink. He will can play 2 cards with cost 2 ink, only after quest of hueyReliableLeader. First card will be cost 1 ink and for second card pay full cost.`

- [ ] **008/character/004-goofy-groundbreaking-chef.test.ts**
  - Card: `008/character/004-goofy-groundbreaking-chef.ts`
    - `PLENTY TO GO AROUND At the end of your turn, you may remove up to 1 damage from each of your other characters. Ready each character you removed damage from this way.`
    - `Goofy + Mr Smee`

- [ ] **008/character/005-antonio-madrigal-friend-to-all.test.ts**
  - Card: `008/character/005-antonio-madrigal-friend-to-all.ts`
    - `OF COURSE THEY CAN COME Once during your turn, whenever one of your characters sings a song, you may search your deck for a character card with cost 3 or less and reveal that card to all players. Put that card into your hand and shuffle your deck.`

- [ ] **008/character/006-minnie-mouse-daring-defender.test.ts**
  - Card: `008/character/006-minnie-mouse-daring-defender.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`
    - `TRUE VALOR This character gets +1 {S} for each 1 damage on her.`

- [ ] **008/character/007-ludwig-von-drake-allaround-expert.test.ts**
  - Card: `008/character/007-ludwig-von-drake-allaround-expert.ts`
    - `SUPERIOR MIND When you play this character, chosen opponent reveals their hand and discards a non-character card of your choice.`
    - `LASTING LEGACY When this character is banished, you may put this card into your inkwell facedown and exerted.`

- [ ] **008/character/009-tiana-natural-talent.test.ts**
  - Card: `008/character/009-tiana-natural-talent.ts`
    - `Singer 6 (This character counts as cost 6 to sing songs.)`
    - `CAPTIVATING MELODY Whenever you play a song, each opposing character gets -1 {S} until the start of your next turn.`
    - `should NOT apply the str reduction before resolving the action cards (Under the sea interaction)`
    - `should not apply -1 {S} to characters that are not in play`

- [ ] **008/character/010-mirabel-madrigal-curious-child.test.ts**
  - Card: `008/character/010-mirabel-madrigal-curious-child.ts`
    - `YOU ARE A JEWEL When you play this character, you may reveal a song card in your hand to gain 1 lore.`
    - `YOU ARE A JEWEL No reveal, no lore`
    - `YOU ARE A JEWEL No song in hand, no lore`

- [ ] **008/character/011-lady-family-dog.test.ts**
  - Card: `008/character/011-lady-family-dog.ts`
    - `SOMEONE TO CARE FOR When you play this character, you may play a character with cost 2 or less for free.`
    - `Tramp interaction`

- [ ] **008/character/012-jim-dear-beloved-husband.test.ts**
  - Card: `008/character/012-jim-dear-beloved-husband.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`

- [ ] **008/character/013-gene-niceland-resident.test.ts**
  - Card: `008/character/013-gene-niceland-resident.ts`
    - `I GUESS YOU EARNED THIS Whenever this character quests, you may remove up to 2 damage from chosen character.`

- [ ] **008/character/014-perdita-on-the-lookout.test.ts**
  - Card: `008/character/014-perdita-on-the-lookout.ts`
    - `KEEPING WATCH While you have a Puppy character in play, this character gets +1 {W}.`

- [ ] **008/character/015-rhino-onesixteenth-wolf.test.ts**
  - Card: `008/character/015-rhino-onesixteenth-wolf.ts`
    - `TINY HOWL When you play this character, chosen opposing character gets -1 {S} until the start of your next turn.`

- [ ] **008/character/016-darling-dear-beloved-wife.test.ts**
  - Card: `008/character/016-darling-dear-beloved-wife.ts`
    - `HOW SWEET When you play this character, chosen character gets +2 {L} this turn.`

- [ ] **008/character/017-the-colonel-old-sheepdog.test.ts**
  - Card: `008/character/017-the-colonel-old-sheepdog.ts`
    - `WE'VE GOT 'EM OUTNUMBERED While you have 3 or more Puppy characters in play, this character gets +2 {S} and +2 {L}.`

- [ ] **008/character/018-chief-bogo-commanding-officer.test.ts**
  - Card: `008/character/018-chief-bogo-commanding-officer.ts`
    - `SENDING BACKUP During an opponent’s turn, whenever one of your characters with Bodyguard is banished, you may reveal the top card of your deck. If it’s a character card with cost 5 or less, you may play that character for free. Otherwise, put it on the top of your deck.`

- [ ] **008/character/019-pua-protective-pig.test.ts**
  - Card: `008/character/019-pua-protective-pig.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`
    - `FREE FRUIT When this character is banished, you may draw a card.`

- [ ] **008/character/020-bruno-madrigal-singing-seer.test.ts**
  - Card: `008/character/020-bruno-madrigal-singing-seer.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named Bruno Madrigal.)`
    - `BRIGHT FUTURE Whenever this character sings a song, you may draw a card for each character you have in play.`

- [ ] **008/character/021-kaa-hypnotizing-python.test.ts**
  - Card: `008/character/021-kaa-hypnotizing-python.ts`
    - `LOOK ME IN THE EYE Whenever this character quests, chosen opposing character gets -2 {S} and gains Reckless until the start of your next turn. (They can't quest and must challenge if able.)`

- [ ] **008/character/022-tramp-dapper-rascal.test.ts**
  - Card: `008/character/022-tramp-dapper-rascal.ts`
    - `Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Tramp.)`
    - `PLAY IT COOL During an opponent’s turn, whenever one of your characters is banished, you may draw a card.`

- [ ] **008/character/023-king-candy-sugar-rush-nightmare.test.ts**
  - Card: `008/character/023-king-candy-sugar-rush-nightmare.ts`
    - `A NEW ROSTER When this character is banished, you may return another Racer character card from your discard to your hand.`
    - `A NEW ROSTER Only racers return`
    - `Cannot Return Himself`

- [ ] **008/character/024-wreckit-ralph-big-lug.test.ts**
  - Card: `008/character/024-wreckit-ralph-big-lug.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named Wreck-It Ralph.)`
    - `BACK ON TRACK When you play this character you may return a Racer character card with cost 6 or less from your discard to your hand. If you do, gain 1 lore.`
    - `BACK ON TRACK - Play - No Lore when you cannot return card`
    - `BACK ON TRACK Whenever he quests you may return a Racer character card with cost 6 or less from your discard to your hand. If you do, gain 1 lore.`
    - `BACK ON TRACK - Quest - No Lore when you cannot return card`

- [ ] **008/character/025-patch-playful-pup.test.ts**
  - Card: `008/character/025-patch-playful-pup.ts`
    - `Ward (Opponents can't choose this character except to challenge.)`
    - `PUPPY BARKING While you have another Puppy character in play, this character gets +1 {L}.`

- [ ] **008/character/026-rolly-chubby-puppy.test.ts**
  - Card: `008/character/026-rolly-chubby-puppy.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)`
    - `ADORABLE ANTICS When you play this character, you may put a character card from your discard in your inkwell facedown and exerted.`
    - `ADORABLE ANTICS When you play this character, you may put a character card from your discard in your inkwell facedown and exerted.`

- [ ] **008/character/027-perdita-determined-mother.test.ts**
  - Card: `008/character/027-perdita-determined-mother.ts`
    - `Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Perdita.)`
    - `QUICK, EVERYONE HIDE When you play this character, you may put all Puppy character cards from your discard into your inkwell facedown and exerted.`

- [ ] **008/character/028-pluto-tried-and-true.test.ts**
  - Card: `008/character/028-pluto-tried-and-true.ts`
    - `HAPPY HELPER While this character has no damage, he gets +2 {S} and gains Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)`

- [ ] **008/character/029-bolt-down-but-not-out.test.ts**
  - Card: `008/character/029-bolt-down-but-not-out.ts`
    - `NONE OF YOUR POWERS ARE WORKING This character enters play exerted.`

- [ ] **008/character/030-rhino-power-hamster.test.ts**
  - Card: `008/character/030-rhino-power-hamster.ts`
    - `Shift 2 (You may pay 2 {I} to play this on top of one of your characters named Rhino.)`
    - `EPIC BALL OF AWESOME While this character has no damage, he gains Resist +2. (Damage dealt to them is reduced by 2.)`
    - `EPIC BALL OF AWESOME While this character has damage, he does not have resist`
    - `EPIC BALL OF AWESOME While this character has damage, he does not have resist`

- [ ] **008/character/031-antonios-jaguar-faithful-companion.test.ts**
  - Card: `008/character/031-antonios-jaguar-faithful-companion.ts`
    - `YOU WANT TO GO WHERE? When you play this character, if you have a character in play named Antonio Madrigal, gain 1 lore.`
    - `YOU WANT TO GO WHERE? When you play this character, if you have a character in play named Antonio Madrigal, gain 1 lore.`

- [ ] **008/character/032-calhoun-hardnosed-leader.test.ts**
  - Card: `008/character/032-calhoun-hardnosed-leader.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`
    - `LOOT DROP When this character is banished, gain 1 lore.`

- [ ] **008/character/033-lady-decisive-dog.test.ts**
  - Card: `008/character/033-lady-decisive-dog.ts`
    - `TAKE THE LEAD While this character has 3 {S} or more, she gets +2 {L}. + PACK OF HER OWN Whenever you play a character, this character gets +1 {S} this turn.`
    - `Shifting her should keep the strenght but not the lore gained`

- [ ] **008/character/034-alma-madrigal-accepting-grandmother.test.ts**
  - Card: `008/character/034-alma-madrigal-accepting-grandmother.ts`
    - `THE MIRACLE IS YOU Once during your turn, whenever one or more of your characters sings a song, you may ready those characters.`
    - `Should trigger when it's only one character singing a song`

- [ ] **008/character/035-clawhauser-front-desk-officer.test.ts**
  - Card: `008/character/035-clawhauser-front-desk-officer.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`
    - `Singer 4 (This character counts as cost 4 to sing songs.)`

- [ ] **008/character/036-joey-blue-pigeon.test.ts**
  - Card: `008/character/036-joey-blue-pigeon.ts`
    - `I'VE GOT JUST THE THING Whenever this character quests, you may remove up to 1 damage from each of your characters with Bodyguard.`

- [ ] **008/character/037-donald-duck-coin-collector.test.ts**
  - Card: `MISSING`
    - `HERE, PIGGY, PIGGY For each item named The Nephews' Piggy Bank you have in play, you pay 2 {I} less to play this character.`
    - `MONEY EVERYWHERE When you play this character, your other characters gain '{E} – Draw a card' this turn.`

- [ ] **008/character/038-dalmatian-puppy-tail-wagger.test.ts**
  - Card: `008/character/038-dalmatian-puppy-tail-wagger.ts`
    - `WHERE DID THEY ALL COME FROM? You may have up to 99 copies of Dalmatian Puppy - Tail Wagger in your deck.`

- [ ] **008/character/045-palace-guard-spectral-sentry.test.ts**
  - Card: `008/character/045-palace-guard-spectral-sentry.ts`
    - `Vanish (When an opponent chooses this character for an action, banish them.)`

- [ ] **008/character/046-druun-ravenous-plague.test.ts**
  - Card: `008/character/046-druun-ravenous-plague.ts`
    - `Challenger +4 (While challenging, this character gets +4 {S}.)`

- [ ] **008/character/047-madame-medusa-deceiving-partner.test.ts**
  - Card: `008/character/047-madame-medusa-deceiving-partner.ts`
    - `DOUBLE-CROSS When you play this character, you may deal 2 damage to another chosen character of yours to return chosen character with cost 2 or less to their player's hand.`

- [ ] **008/character/048-hades-ruthless-tyrant.test.ts**
  - Card: `008/character/048-hades-ruthless-tyrant.ts`
    - `SHORT ON PATIENCE When you play this character and whenever he quests, you may deal 2 damage to another chosen character of yours to draw 2 cards.`

- [ ] **008/character/049-lena-sabrewing-pure-energy.test.ts**
  - Card: `008/character/049-lena-sabrewing-pure-energy.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `SUPERNATURAL VENGEANCE {E} – Deal 1 damage to chosen character.`

- [ ] **008/character/050-abu-illusory-pachyderm.test.ts**
  - Card: `008/character/050-abu-illusory-pachyderm.ts`
    - `Vanish (When an opponent chooses this character for an action, banish them.)`
    - `GRASPING TRUNK Whenever this character quests, gain lore equal to the {L} of chosen opposing character.`

- [ ] **008/character/051-bruno-madrigal-singleminded.test.ts**
  - Card: `008/character/051-bruno-madrigal-singleminded.ts`
    - `STANDING TALL When you play this character, chosen opposing character can’t ready at the start of their next turn.`

- [ ] **008/character/052-royal-guard-octopus-soldier.test.ts**
  - Card: `008/character/052-royal-guard-octopus-soldier.ts`
    - `HEAVILY ARMED Every time you draw a card, this character gains Challenger +1 for this turn. (Gains +1 {S} while challenging.)`

- [ ] **008/character/053-kuzco-bored-royal.test.ts**
  - Card: `008/character/053-kuzco-bored-royal.ts`
    - `LLAMA BREATH When you play this character, you may return chosen character, item, or location with cost 2 or less to their player's hand.`

- [ ] **008/character/054-megara-part-of-the-plan.test.ts**
  - Card: `008/character/054-megara-part-of-the-plan.ts`
    - `CONTENTIOUS ALLIANCE While you have a character named Hades in play, this character gains Challenger +2. (They get +2 {S} while challenging.)`

- [ ] **008/character/055-yelana-northuldra-leader.test.ts**
  - Card: `008/character/055-yelana-northuldra-leader.ts`
    - `WE ONLY TRUST NATURE When you play this character, chosen character gains Challenger +2 this turn. (They get +2 {S} while challenging.)`

- [ ] **008/character/056-ryder-fleetfooted-infiltrator.test.ts**
  - Card: `008/character/056-ryder-fleetfooted-infiltrator.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **008/character/060-elsa-fierce-protector.test.ts**
  - Card: `008/character/060-elsa-fierce-protector.ts`
    - `ICE OVER 1 {I}, Choose and discard a card – Exert chosen opposing character.`

- [ ] **008/character/061-pinocchio-strings-attached.test.ts**
  - Card: `008/character/061-pinocchio-strings-attached.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `GOT TO KEEP REAL QUIET Once during your turn, whenever you ready this character, you may draw a card.`

- [ ] **008/character/062-jiminy-cricket-levelheaded-and-wise.test.ts**
  - Card: `008/character/062-jiminy-cricket-levelheaded-and-wise.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `ENOUGH'S ENOUGH While this character is not exerted, opposing characters with Rush do not enter play exerted.`
    - `ENOUGH'S ENOUGH While this character is exerted, opposing characters with Rush enter play exerted.`
    - `ENOUGH'S ENOUGH does not effect non-rush characters`
    - `ENOUGH'S ENOUGH does not effect your own characters`

- [ ] **008/character/063-bambi-little-prince.test.ts**
  - Card: `008/character/063-bambi-little-prince.ts`
    - `SAY HELLO When you play this character, gain 1 lore.`
    - `KIND OF BASHFUL When an opponent plays a character, return this character to your hand.`
    - `Sisu Interaction, banish should happen first.`

- [ ] **008/character/064-monstro-infamous-whale.test.ts**
  - Card: `008/character/064-monstro-infamous-whale.ts`
    - `Rush (This character can challenge the turn they're played.)`
    - `FULL BREACH Choose and discard a card – Ready this character. He can't quest for the rest of this turn.`
    - `Adds a helper function to RootStore`
    - `Should not create infinite continuous effects, or else it breaks the transport mechanism`
    - `should NOT be blocked by 'cant ready at the start of the turn' effects`

- [ ] **008/character/065-nero-fearsome-crocodile.test.ts**
  - Card: `008/character/065-nero-fearsome-crocodile.ts`
    - `AND MEAN {E} – Move 1 damage counter from this character to chosen opposing character.`

- [ ] **008/character/066-magica-de-spell-shadow-form.test.ts**
  - Card: `008/character/066-magica-de-spell-shadow-form.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `DANCE OF DARKNESS When you play this character, you may return one of your other characters to your hand to draw a card.`
    - `DANCE OF DARKNESS When you play this character, you may return one of your OTHER characters to your hand to draw a card.`

- [ ] **008/character/067-kuzco-impulsive-llama.test.ts**
  - Card: `008/character/067-kuzco-impulsive-llama.ts`
    - `Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Kuzco.)`
    - `WHAT DOES THIS DO? When you play this character, each opponent chooses one of their characters and puts that card on the bottom of their deck. Then, each opponent may draw a card.`

- [ ] **008/character/068-yzma-on-edge.test.ts**
  - Card: `008/character/068-yzma-on-edge.ts`
    - `WHY DO WE EVEN HAVE THAT LEVER? When you play this character, if you have a card named Pull the Lever! in your discard, you may search your deck for a card named Wrong Lever! and reveal that card to all players. Put that card into your hand and shuffle your deck.`

- [ ] **008/character/069-madam-mim-as-rhinoceros.test.ts**
  - Card: `008/character/069-madam-mim-as-rhinoceros.ts`
    - `SHIFT 2 (You can pay 2 {I} to play this character on one of your Madame Mime characters.)`
    - `return another chosen character of yours to your hand.`
    - `skipping the effect banishes her.`
    - `MAKE WAY, I'M COMING! When you play this character, banish it or return one of your other characters in play to your hand.`

- [ ] **008/character/070-mother-gothel-knows-whats-best.test.ts**
  - Card: `008/character/070-mother-gothel-knows-whats-best.ts`
    - `LOOK WHAT YOU'VE DONE When you play this character, you may deal 2 damage to another chosen character of yours to give that character Challenger +1 and “When this character is banished in a challenge, return this card to your hand” this turn. (They get +1 {S} while challenging.)`

- [ ] **008/character/071-blue-fairy-guiding-light.test.ts**
  - Card: `008/character/071-blue-fairy-guiding-light.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)`

- [ ] **008/character/072-anna-magical-mission.test.ts**
  - Card: `008/character/072-anna-magical-mission.ts`
    - `Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Anna.)`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character’s {S} this turn.)`
    - `COORDINATED PLAN Whenever this character quests, if you have a character named Elsa in play, you may draw a card.`

- [ ] **008/character/073-the-sultan-royal-apparition.test.ts**
  - Card: `008/character/073-the-sultan-royal-apparition.ts`
    - `COMMANDING PRESENCE Whenever one of your Illusion characters quests, exert chosen opposing character.`
    - `Vanish (When an opponent chooses this character for an action, banish them.)`

- [ ] **008/character/074-jafar-high-sultan-of-lorcana.test.ts**
  - Card: `008/character/074-jafar-high-sultan-of-lorcana.ts`
    - `DARK POWER Whenever this character quests, you may draw a card, then choose and discard a card. If an Illusion character card is discarded this way, you may play that character for free.`

- [ ] **008/character/075-camilo-madrigal-at-the-center-of-attention.test.ts**
  - Card: `008/character/075-camilo-madrigal-at-the-center-of-attention.ts`
    - `BIS! BIS! When this character is banished in a challenge, return this card to your hand.`

- [ ] **008/character/076-flower-shy-skunk.test.ts**
  - Card: `008/character/076-flower-shy-skunk.ts`
    - `LOOKING FOR FRIENDS Whenever you play another character, look at the top card of your deck. Put it on either the top or the bottom of your deck.`

- [ ] **008/character/086-basil-undercover-detective.test.ts**
  - Card: `008/character/086-basil-undercover-detective.ts`
    - `INCAPACITATE When you play this character, you may return chosen character to their player's hand.`
    - `INTERFERE Whenever this character quests, chosen opponent discards a card at random.`

- [ ] **008/character/087-tramp-observant-guardian.test.ts**
  - Card: `008/character/087-tramp-observant-guardian.ts`
    - `HOW DO I GET IN? When you play this character, chosen character gains Ward until the start of your next turn. (Opponents can't choose them except to challenge.)`

- [ ] **008/character/088-chaca-junior-chipmunk.test.ts**
  - Card: `008/character/088-chaca-junior-chipmunk.ts`
    - `IN CAHOOTS When you play this character, if you have a character named Tipo in play, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)`

- [ ] **008/character/089-tipo-junior-chipmunk.test.ts**
  - Card: `008/character/089-tipo-junior-chipmunk.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **008/character/090-bill-the-lizard-chimney-sweep.test.ts**
  - Card: `008/character/090-bill-the-lizard-chimney-sweep.ts`
    - `NOTHING TO IT While another character in play has damage, this character gains Evasive. (Only characters with Evasive can challenge them.)`

- [ ] **008/character/091-march-hare-hare-brained-eccentric.test.ts**
  - Card: `008/character/091-march-hare-hare-brained-eccentric.ts`
    - `LIGHT THE CANDLES When you play this character, you may choose a character with one or more damage and deal 2 damage to it.`

- [ ] **008/character/092-fred-major-science-enthusiast.test.ts**
  - Card: `008/character/092-fred-major-science-enthusiast.ts`
    - `SPITTING FIRE! When you play this character, you may banish chosen item.`

- [ ] **008/character/093-mad-dog-karnages-first-mate.test.ts**
  - Card: `008/character/093-mad-dog-karnages-first-mate.ts`
    - `ARE YOU SURE THIS IS SAFE, CAPTAIN? If you have a character named Don Karnage in play, you pay 1 {I} less to play this character.`

- [ ] **008/character/095-louis-endearing-alligator.test.ts**
  - Card: `008/character/095-louis-endearing-alligator.ts`
    - `SENSITIVE SOUL This character enters play exerted.`
    - `FRIENDLIER THAN HE LOOKS When you play this character, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)`
    - `Future effect flag is set`

- [ ] **008/character/097-chip-quick-thinker.test.ts**
  - Card: `008/character/097-chip-quick-thinker.ts`
    - `I'LL HANDLE IT When you play this character, choose an opponent to discard a card.`

- [ ] **008/character/098-fred-giant-sized.test.ts**
  - Card: `008/character/098-fred-giant-sized.ts`
    - `Shift 5 (You may pay 5 {I} to play this on top of one of your characters named Fred.)`
    - `Happy Path`
    - `Sad Path`
    - `Mixed`

- [ ] **008/character/099-gadget-hackwrench-quirky-scientist.test.ts**
  - Card: `008/character/099-gadget-hackwrench-quirky-scientist.ts`
    - `GOLLY! When you play this character, if an opponent has more cards in their hand than you, you may draw a card.`
    - `Start with 1 card player one e 1 card player 2`
    - `Don't Draw`

- [ ] **008/character/100-raya-infiltration-expert.test.ts**
  - Card: `008/character/100-raya-infiltration-expert.ts`
    - `UNCONVENTIONAL TACTICS Whenever this character quests, you may pay 2 {I} to ready another chosen character.`

- [ ] **008/character/101-rapunzel-high-climber.test.ts**
  - Card: `008/character/101-rapunzel-high-climber.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `WRAPPED UP Whenever this character quests, chosen opposing character can't quest during their next turn.`

- [ ] **008/character/102-flynn-rider-breaking-and-entering.test.ts**
  - Card: `008/character/102-flynn-rider-breaking-and-entering.ts`
    - `Discarding a card`
    - `gain lore`
    - `Should not trigger when opponent has no cards`

- [ ] **008/character/103-dormouse-easily-agitated.test.ts**
  - Card: `008/character/103-dormouse-easily-agitated.ts`
    - `VERY RUDE INDEED When you play this character, you may put 1 damage counter on chosen character.`

- [ ] **008/character/104-alice-clumsy-as-can-be.test.ts**
  - Card: `008/character/104-alice-clumsy-as-can-be.ts`
    - `Shift 3 (You may pay 3 {I} to play this on top of one of your characters named Alice.)`
    - `ACCIDENT PRONE Whenever this character quests, put 1 damage counter on each other character.`

- [ ] **008/character/105-queen-of-hearts-haughty-monarch.test.ts**
  - Card: `008/character/105-queen-of-hearts-haughty-monarch.ts`
    - `COUNT OFF! While there are 5 or more characters with damage in play, this character gets +3 {L}.`

- [ ] **008/character/106-hiro-hamada-intuitive-thinker.test.ts**
  - Card: `008/character/106-hiro-hamada-intuitive-thinker.ts`
    - `LOOK FOR A NEW ANGLE {E} - Ready chosen Floodborn character.`

- [ ] **008/character/107-go-go-tomago-cutting-edge.test.ts**
  - Card: `008/character/107-go-go-tomago-cutting-edge.ts`
    - `Shift 4)`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `ZERO RESISTANCE When you play this character, if you used Shift to play her, you may put chosen character into their player's inkwell facedown and exerted.`

- [ ] **008/character/108-don-karnage-air-pirate-leader.test.ts**
  - Card: `008/character/108-don-karnage-air-pirate-leader.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `SCORNFUL TAUNT Whenever you play an action that isn’t a song, chosen opposing character gains Reckless during their next turn. (They can’t quest and must challenge if able.)`

- [ ] **008/character/109-captain-hook-the-pirate-king.test.ts**
  - Card: `008/character/109-captain-hook-the-pirate-king.ts`
    - `SHIFT 3 (You may pay 3 {I} to play this on top of one of your characters named Captain Hook.)`
    - `should increase strength and grant resist to all Pirates when an opposing character is damaged`
    - `should not increase strength during an opposing player's turn`
    - `challenging pirate should not gain resist before damage`

- [ ] **008/character/110-maui-stubborn-trickster.test.ts**
  - Card: `008/character/110-maui-stubborn-trickster.ts`
    - `I'M NOT FINISHED YET When this character is banished, choose one:`
    - `- Put 2 damage counters on all opposing characters.`
    - `- Put 2 damage counters on all opposing characters. RESIST`
    - `- Banish all opposing items.`
    - `- Banish all opposing locations.`

- [ ] **008/character/111-honey-lemon-costumed-catalyst.test.ts**
  - Card: `008/character/111-honey-lemon-costumed-catalyst.ts`
    - `LET'S DO THIS! Whenever you play a Floodborn character, if you used Shift to play them, you may return chosen character to their player's hand.`

- [ ] **008/character/112-jock-attentive-uncle.test.ts**
  - Card: `008/character/112-jock-attentive-uncle.ts`
    - `VOICE OF EXPERIENCE When you play this character, if you have 3 or more other characters in play, gain 2 lore.`
    - `VOICE OF EXPERIENCE When you play this character, if you have 3 total in play, do not gain 2 lore.`

- [ ] **008/character/113-archimedes-resourceful-owl.test.ts**
  - Card: `008/character/113-archimedes-resourceful-owl.ts`
    - `should trigger during your turn when you banish an item`
    - `should NOT trigger during opponent's turn when opponent banishes an item`
    - `should NOT trigger during opponent's turn when opponent uses Belle's alternate cost to banish an item`

- [ ] **008/character/121-gloyd-orangeboar-fierce-competitor.test.ts**
  - Card: `008/character/121-gloyd-orangeboar-fierce-competitor.ts`
    - `PUMPKIN SPICE When you play this character, each opponent loses 1 lore and you gain 1 lore.`

- [ ] **008/character/123-gyro-gearloose-eccentric-inventor.test.ts**
  - Card: `008/character/123-gyro-gearloose-eccentric-inventor.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `I'LL SHOW YOU! When you play this character, chosen opposing character gets -3 {S} this turn.`

- [ ] **008/character/124-vanellope-von-schweetz-spunky-speedster.test.ts**
  - Card: `008/character/124-vanellope-von-schweetz-spunky-speedster.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`

- [ ] **008/character/125-brutus-fearsome-crocodile.test.ts**
  - Card: `008/character/125-brutus-fearsome-crocodile.ts`
    - `SPITEFUL During your turn, when this character is banished, if one of your characters was damaged this turn, gain 2 lore.`

- [ ] **008/character/126-the-dodo-outlandish-storyteller.test.ts**
  - Card: `008/character/126-the-dodo-outlandish-storyteller.ts`
    - `AN EXTREMELY FATAL SITUATION This character receives +1 {S} for each damage on it.`

- [ ] **008/character/127-alice-courageous-keyholder.test.ts**
  - Card: `008/character/127-alice-courageous-keyholder.ts`
    - `THIS WAY OUT When you play this character, you may ready chosen damaged character of yours. They can't quest for the rest of this turn.`

- [ ] **008/character/128-lumiere-nimble-candelabra.test.ts**
  - Card: `008/character/128-lumiere-nimble-candelabra.ts`
    - `QUICK-STEP While you have an item card in your discard, this character gains Evasive. (Only characters with Evasive can challenge them.)`

- [ ] **008/character/129-gaston-arrogant-showoff.test.ts**
  - Card: `008/character/129-gaston-arrogant-showoff.ts`
    - `BREAK APART When you play this character, you may banish one of your items to give chosen character +2 {S} this turn.`

- [ ] **008/character/130-mushu-fasttalking-dragon.test.ts**
  - Card: `008/character/130-mushu-fasttalking-dragon.ts`
    - `LET’S GET THIS SHOW ON THE ROAD {E} – Chosen character gains Rush this turn. (They can challenge the turn they're played.)`

- [ ] **008/character/131-crikee-part-of-the-team.test.ts**
  - Card: `008/character/131-crikee-part-of-the-team.ts`
    - `AT HER SIDE While you have 2 or more other exerted characters in play, this character gets +2 {L}.`

- [ ] **008/character/133-figaro-tuxedo-cat.test.ts**
  - Card: `008/character/133-figaro-tuxedo-cat.ts`
    - `PLAYFULNESS Opposing items enter play exerted.`

- [ ] **008/character/134-thumper-young-bunny.test.ts**
  - Card: `008/character/134-thumper-young-bunny.ts`
    - `YOU CAN DO IT! {E} – Chosen character gets +3 {S} this turn.`

- [ ] **008/character/135-wreckit-ralph-back-seat-driver.test.ts**
  - Card: `008/character/135-wreckit-ralph-back-seat-driver.ts`
    - `CHARGED UP When you play this character, chosen Racer character gets +4 {S} this turn.`

- [ ] **008/character/136-tinker-bell-insistent-fairy.test.ts**
  - Card: `008/character/136-tinker-bell-insistent-fairy.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `Valid target`
    - `Invalid target`
    - `Skipping effects`
    - `Double Triggers should not gain double lore`

- [ ] **008/character/137-lilo-causing-an-uproar.test.ts**
  - Card: `008/character/137-lilo-causing-an-uproar.ts`
    - `STOMPIN' TIME! During your turn, if you've played 3 or more actions this turn, you may play this character for free.`
    - `RAAAWR! When you play this character, ready chosen character. They can't quest for the rest of this turn.`

- [ ] **008/character/138-lefou-cake-thief.test.ts**
  - Card: `008/character/138-lefou-cake-thief.ts`
    - ` ALL FOR ME {E}, banish one of your items – Chosen opponent loses 1 lore and you gain 1 lore.`

- [ ] **008/character/139-lumiere-fired-up.test.ts**
  - Card: `008/character/139-lumiere-fired-up.ts`
    - `Shift 3 (You may pay 3 {I} to play this on top of one of your characters named Lumiere.)`
    - `Evasive`
    - `SACREBLEU!: Whenever one of your items is banished, this character gets +1 {L} this turn.`

- [ ] **008/character/140-the-coachman-greedy-deceiver.test.ts**
  - Card: `008/character/140-the-coachman-greedy-deceiver.ts`
    - `RECKLESS RUN While you have 2 or more characters exerted, this character gets +2 {S} and Evasive.`

- [ ] **008/character/141-mulan-charging-ahead.test.ts**
  - Card: `008/character/141-mulan-charging-ahead.ts`
    - `Reckless (This character can’t quest and must challenge each turn if able.)`
    - `BURST OF SPEED During your turn, this character gains Evasive. (They can challenge characters with Evasive.)`
    - `LONG RANGE This character can challenge ready characters.`

- [ ] **008/character/142-mushu-your-worst-nightmare.test.ts**
  - Card: `008/character/142-mushu-your-worst-nightmare.ts`
    - `Shift 4 (You may pay 4 {I} to play this on top of one of your characters named Mushu.)`
    - `ALL FIRED UP Whenever you play another character, they gain Rush, Reckless, and Evasive this turn.`

- [ ] **008/character/143-mr-snoops-betrayed-partner.test.ts**
  - Card: `008/character/143-mr-snoops-betrayed-partner.ts`
    - `Your turn`
    - `Opponent's turn`

- [ ] **008/character/145-faline-playful-fawn.test.ts**
  - Card: `008/character/145-faline-playful-fawn.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `PRECOCIOUS FRIEND While you have a character in play with more {S} than each opposing character, this character gets +2 {L}.`

- [ ] **008/character/146-prince-john-fraidycat.test.ts**
  - Card: `008/character/146-prince-john-fraidycat.ts`
    - `HELP! HELP! Whenever an opponent plays a character, deal 1 damage to this character.`

- [ ] **008/character/154-sir-pellinore-seasoned-knight.test.ts**
  - Card: `008/character/154-sir-pellinore-seasoned-knight.ts`
    - `CODE OF HONOR Whenever this character quests, your other characters gain Support this turn. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)`

- [ ] **008/character/155-anita-radcliffe-dog-lover.test.ts**
  - Card: `008/character/155-anita-radcliffe-dog-lover.ts`
    - `I'LL TAKE CARE OF YOU When you play this character, you may give chosen Puppy character Resist +1 until the start of your next turn. (Damage dealt to them is reduced by 1.)`

- [ ] **008/character/156-olaf-recapping-the-story.test.ts**
  - Card: `008/character/156-olaf-recapping-the-story.ts`
    - `ENDLESS TALE When you play this character, chosen opposing character gets -1 {S} this turn.`

- [ ] **008/character/157-anna-trusting-sister.test.ts**
  - Card: `008/character/157-anna-trusting-sister.ts`
    - `WE CAN DO THIS TOGETHER When you play this character, if you have a character named Elsa in play, you may put the top card of your deck into your inkwell facedown and exerted.`
    - `should NOT put a card into inkwell if Elsa is NOT in play`
    - `should NOT put a card into inkwell if Elsa is in play but player declines`

- [ ] **008/character/158-wasabi-always-prepared.test.ts**
  - Card: `008/character/158-wasabi-always-prepared.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)`

- [ ] **008/character/159-go-go-tomago-mechanical-engineer.test.ts**
  - Card: `008/character/159-go-go-tomago-mechanical-engineer.ts`
    - `NEED THIS! When you play a Floodborn character on this card, you may put the top card of your deck into your inkwell facedown and exerted.`

- [ ] **008/character/160-the-wardrobe-perceptive-friend.test.ts**
  - Card: `008/character/160-the-wardrobe-perceptive-friend.ts`
    - `I HAVE JUST THE THING {E}, Choose and discard an item card - Draw 2 cards`
    - `The Wardrobe - Perceptive Friend should not draw then there's no items in hand`

- [ ] **008/character/161-mrs-potts-head-housekeeper.test.ts**
  - Card: `008/character/161-mrs-potts-head-housekeeper.ts`
    - `CLEAN UP {E}, Banish one of your items – Draw a card.`

- [ ] **008/character/162-jasmine-resourceful-infiltrator.test.ts**
  - Card: `008/character/162-jasmine-resourceful-infiltrator.ts`
    - `JUST WHAT YOU NEED When you play this character, you may give another chosen character Resist +1 until the start of your next turn. (Damage dealt to them is reduced by 1.)`

- [ ] **008/character/163-little-sister-responsible-rabbit.test.ts**
  - Card: `008/character/163-little-sister-responsible-rabbit.ts`
    - `LET ME HELP When you play this character, you may remove up to 1 damage from chosen character.`

- [ ] **008/character/165-nani-heist-mastermind.test.ts**
  - Card: `008/character/165-nani-heist-mastermind.ts`
    - `STICK TO THE PLAN {E} – Another chosen character gains Resist +2 this turn. (Damage dealt to them is reduced by 2.)`
    - `IT'S UP TO YOU, LILO Your characters named Lilo gain Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)`

- [ ] **008/character/166-stitch-experiment_626.test.ts**
  - Card: `008/character/166-stitch-experiment_626.ts`
    - `SO NAUGHTY When you play this character, each opponent puts the top card of their deck into their inkwell.`
    - `STEALTH MODE At the start of your turn, if this card is in your discard, you may choose and discard a card with {IW} to play him for free and he enters play exerted.`
    - `STEALTH MODE - Cancelling effect`

- [ ] **008/character/167-ratigan-greedy-genius.test.ts**
  - Card: `008/character/167-ratigan-greedy-genius.ts`
    - `Ward (Opponents can't choose this character except to challenge.)`
    - `Not putting anything into inkwell`
    - `Not putting anything into inkwell`
    - `does not banish if Cinderella inks a card first`

- [ ] **008/character/168-arthur-determined-squire.test.ts**
  - Card: `008/character/168-arthur-determined-squire.ts`
    - `NO MORE BOOKS Skip your turn's Draw step.`
    - `NO MORE BOOKS Allows your opponent to draw.`
    - `NO MORE BOOKS Is no longer active when shifted.`

- [ ] **008/character/169-bernard-overprepared.test.ts**
  - Card: `008/character/169-bernard-overprepared.ts`
    - `GO DOWN THERE AND INVESTIGATE When you play this character, if you have an Ally character in play, you may draw a card.`

- [ ] **008/character/170-aladdin-vigilant-guard.test.ts**
  - Card: `008/character/170-aladdin-vigilant-guard.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`
    - `SAFE PASSAGE Whenever one of your Ally characters quests, you may remove up to 2 damage from this character.`

- [ ] **008/character/171-jasmine-steady-strategist.test.ts**
  - Card: `008/character/171-jasmine-steady-strategist.ts`
    - `Shift 2 (You may pay 2 {I} to play this on top of one of your characters named Jasmine.)`
    - `ALWAYS PLANNING Whenever this character quests, look at the top 3 cards of your deck. You may reveal an Ally character card and put it into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **008/character/172-roquefort-lock-expert.test.ts**
  - Card: `008/character/172-roquefort-lock-expert.ts`
    - `SAFEKEEPING Whenever this character quests, you may put chosen item into its player's inkwell facedown and exerted.`

- [ ] **008/character/174-geppetto-skilled-craftsman.test.ts**
  - Card: `008/character/174-geppetto-skilled-craftsman.ts`
    - `SEEKING INSPIRATION Whenever this character quests, you may choose and discard any number of item cards to gain 1 lore for each item card discarded this way.`

- [ ] **008/character/182-bobby-purple-pigeon.test.ts**
  - Card: `008/character/182-bobby-purple-pigeon.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`

- [ ] **008/character/183-magic-carpet-phantom-rug.test.ts**
  - Card: `008/character/183-magic-carpet-phantom-rug.ts`
    - `Vanish (When an opponent chooses this character for an action, banish them.)`
    - `SPECTRAL FORCE Your other Illusion characters gain Challenger +1. (They get +1 {S} while challenging.)`

- [ ] **008/character/184-prince-achmed-rival-suitor.test.ts**
  - Card: `008/character/184-prince-achmed-rival-suitor.ts`
    - `UNWELCOME PROPOSAL When you play this character, you may exert chosen Princess character.`

- [ ] **008/character/185-dumptruck-karnage-s-second-mate.test.ts**
  - Card: `MISSING`
    - `LET ME AT 'EM When you play this character, you may deal 1 damage to chosen character.`

- [ ] **008/character/185-dumptruck-karnages-second-mate.test.ts**
  - Card: `008/character/185-dumptruck-karnages-second-mate.ts`
    - `LET ME AT 'EM When you play this character, you may deal 1 damage to chosen character.`

- [ ] **008/character/186-captain-hook-forceful-duelist.test.ts**
  - Card: `008/character/186-captain-hook-forceful-duelist.ts`
    - `Challenger +2 (While challenging, this character gets +2 {S}.)`

- [ ] **008/character/187-general-li-head-of-the-imperial-army.test.ts**
  - Card: `008/character/187-general-li-head-of-the-imperial-army.ts`
    - `Resist +1 (Damage dealt to this character is reduced by 1.)`

- [ ] **008/character/188-monterey-jack-defiant-protector.test.ts**
  - Card: `008/character/188-monterey-jack-defiant-protector.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`

- [ ] **008/character/189-genie-satisfied-dragon.test.ts**
  - Card: `008/character/189-genie-satisfied-dragon.ts`
    - `BUG CATCHER During your turn, this character gains Evasive. (They can challenge characters with Evasive.)`

- [ ] **008/character/190-toby-turtle-wary-friend.test.ts**
  - Card: `008/character/190-toby-turtle-wary-friend.ts`
    - `HARD SHELL While this character is exerted, he gains Resist +1. (Damage dealt to them is reduced by 1.)`

- [ ] **008/character/192-zipper-flying-ranger.test.ts**
  - Card: `008/character/192-zipper-flying-ranger.ts`
    - `BEST MATES If you have a character named Monterey Jack in play, you pay 1 {I} less to play this character.`
    - `BURST OF SPEED During your turn, this character gains Evasive. (They can challenge characters with Evasive.)`

- [ ] **008/character/194-vinnie-green-pigeon.test.ts**
  - Card: `008/character/194-vinnie-green-pigeon.ts`
    - `LEARNING EXPERIENCE During an opponent's turn, whenever one of your other characters is banished, gain 1 lore.`
    - `LEARNING EXPERIENCE Does not trigger during your turn`

- [ ] **008/character/195-iago-out-of-reach.test.ts**
  - Card: `008/character/195-iago-out-of-reach.ts`
    - `SELF-PRESERVATION While you have another exerted character in play, this character can't be challenged.`

- [ ] **008/character/196-nathaniel-flint-notorious-pirate.test.ts**
  - Card: `008/character/196-nathaniel-flint-notorious-pirate.ts`
    - `PREDATORY INSTINCT You can't play this character unless an opposing character was damaged this turn.`
    - `PREDATORY INSTINCT When damage has been dealt to opposing character this turn, you can play this character.`
    - `PREDATORY INSTINCT When damage has been dealt to owner's character this turn, you cannot play this character.`
    - `PREDATORY INSTINCT When opposing character is banished by the damage`

- [ ] **008/character/197-vincenzo-santorini-the-explosives-expert.test.ts**
  - Card: `008/character/197-vincenzo-santorini-the-explosives-expert.ts`
    - `I JUST LIKE TO BLOW THINGS UP When you play this character, you may deal 3 damage to chosen character.`

- [ ] **008/character/198-namaari-single-minded-rival.test.ts**
  - Card: `MISSING`
    - `STRATEGIC EDGE When you play this character and at the start of your turn, you may draw a card, then choose and discard a card.`
    - `EXTREME FOCUS This character gets +1 {S} for each card in your discard.`

- [ ] **008/character/199-mickey-mouse-giant-mouse.test.ts**
  - Card: `008/character/199-mickey-mouse-giant-mouse.ts`
    - `Bodyguard (This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)`
    - `THE BIGGEST STAR EVER When this character is banished, deal 5 damage to each opposing character.`

- [ ] **008/character/200-stitch-alien-troublemaker.test.ts**
  - Card: `008/character/200-stitch-alien-troublemaker.ts`
    - `I WIN! During your turn, whenever this character banishes another character in a challenge, you may draw a card and gain 1 lore.`

### item (10 tests)

- [ ] **008/item/044-the-nephews-piggy-bank.test.ts**
  - Card: `008/item/044-the-nephews-piggy-bank.ts`
    - `INSIDE JOB If you have a character named Donald Duck in play, you pay 1 {I} less to play this item.`
    - `PAYOFF {e} – Chosen character gets -1 {S} until the start of your next turn.`

- [ ] **008/item/083-scarab.test.ts**
  - Card: `008/item/083-scarab.ts`
    - `SEARCH THE SANDS {E} 2 {I} – Return an Illusion character card from your discard to your hand.`

- [ ] **008/item/084-ice-spikes.test.ts**
  - Card: `008/item/084-ice-spikes.ts`
    - `HOLD STILL When you play this item, exert chosen opposing character.`
    - `IT'S STUCK {E}, 1 {I} – Exert chosen opposing item. It can’t ready at the start of its next turn.`

- [ ] **008/item/119-chem-purse.test.ts**
  - Card: `008/item/119-chem-purse.ts`
    - `HERE'S THE BEST PART Whenever you play a character, if you used Shift to play them, they get +4 {S} this turn.`

- [ ] **008/item/120-jeweled-collar.test.ts**
  - Card: `008/item/120-jeweled-collar.ts`
    - `WELCOME EXTRAVAGANCE Whenever one of your characters is challenged, you may put the top card of your deck into your inkwell facedown and exerted.`

- [ ] **008/item/152-the-sword-of-shan-yu.test.ts**
  - Card: `008/item/152-the-sword-of-shan-yu.ts`
    - `WORTHY WEAPON {E}, {E} one of your characters - Ready chosen character. They can't quest for the rest of this turn.`
    - `WORTHY WEAPON {E}, {E} one of your characters - Ready chosen character. They can't quest for the rest of this turn. (no drying characters)`

- [ ] **008/item/178-television-set.test.ts**
  - Card: `008/item/178-television-set.ts`
    - `IS IT ON YET? {E}, 1 {I} – Look at the top card of your deck. If it's a Puppy character card, you may reveal it and put it into your hand. Otherwise, put it on the bottom of your deck.`
    - `Not a puppy on top`

- [ ] **008/item/179-belle-s-favorite-book.test.ts**
  - Card: `008/item/179-belle-s-favorite-book.ts`
    - `CHAPTER THREE {E}, Banish one of your other items – Put the top card of your deck into your inkwell facedown and exerted.`

- [ ] **008/item/180-atlantean-crystal.test.ts**
  - Card: `008/item/180-atlantean-crystal.ts`
    - `SHIELDING LIGHT {E}, 2 {I} – Chosen character gains Resist +2 and Support until the start of your next turn. (Damage dealt to them is reduced by 2. Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)`

- [ ] **008/item/204-hamster-ball.test.ts**
  - Card: `008/item/204-hamster-ball.ts`
    - `ROLL WITH THE PUNCHES {E}, 1 {I} – Chosen character with no damage gains Resist +2 until the start of your next turn. (Damage dealt to them is reduced by 2.)`

## Set 009

### actions (26 tests)

- [ ] **009/actions/amber/025-look-at-this-family.test.ts**
  - Card: `009/actions/amber/025-look-at-this-family.ts`
    - `**Sing Together** 7 _(Any number of your of your teammates' characters with total cost 7 or more may {E} to sing this song for free.)_`
    - `Look at the top 5 cards of your deck. You may reveal up to 2 character cards and put them into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **009/actions/amber/026-circle-of-life.test.ts**
  - Card: `009/actions/amber/026-circle-of-life.ts`
    - `Sing Together 8 (Any number of your or your teammates' characters with total cost 8 or more may {E} to sing this song for free.)`
    - `Play a character from your discard for free.`

- [ ] **009/actions/amber/027-heal-what-has-been-hurt.test.ts**
  - Card: `009/actions/amber/027-heal-what-has-been-hurt.ts`
    - `(A character with cost 3 or more can {E} to sing this song for free.)`
    - `Remove up to 3 damage from chosen character. Draw a card.`

- [ ] **009/actions/amber/028-lost-in-the-woods.test.ts**
  - Card: `009/actions/amber/028-lost-in-the-woods.ts`
    - `_(A character with cost 4 or more can {E} to sing this song for free.)_`
    - `All opposing characters get -2 {S} until the start of your next turn.`

- [ ] **009/actions/amber/029-bruno-s-return.test.ts**
  - Card: `009/actions/amber/029-bruno-s-return.ts`
    - `Return a character card from your discard to your hand. Then remove up to 2 damage from chosen character.`

- [ ] **009/actions/amber/030-world-s-greatest-criminal-mind.test.ts**
  - Card: `009/actions/amber/030-world-s-greatest-criminal-mind.ts`
    - `(A character with cost 3 or more can {E} to sing this song for free.)`
    - `Banish chosen character with 5 {S} or more.`

- [ ] **009/actions/amber/031-be-our-guest.test.ts**
  - Card: `009/actions/amber/031-be-our-guest.ts`
    - `Look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **009/actions/amethyst/060-second-star-to-the-right.test.ts**
  - Card: `009/actions/amethyst/060-second-star-to-the-right.ts`
    - `Sing Together 10 (Any number of your or your teammates’ characters with total cost 10 or more may {E} to sing this song for free.)`
    - `Chosen player draws 5 cards.`

- [ ] **009/actions/amethyst/061-poor-unfortunate-souls.test.ts**
  - Card: `009/actions/amethyst/061-poor-unfortunate-souls.ts`
    - `(A character with cost 2 or more can {E} to sing this song for free.)`
    - `Return chosen character, item, or location with cost 2 or less to their player's hand.`

- [ ] **009/actions/amethyst/062-last-ditch-effort.test.ts**
  - Card: `009/actions/amethyst/062-last-ditch-effort.ts`
    - `Exert chosen opposing character. Then chosen character of yours gains Challenger +2 this turn. (They get +2 {S} while challenging.)`

- [ ] **009/actions/emerald/094-stand-out.test.ts**
  - Card: `009/actions/emerald/094-stand-out.ts`
    - `(A character with cost 3 or more can {E} to sing this song for free.)`
    - `Chosen character gets +3 {S} and gains Evasive until the start of your next turn. (Only characters with Evasive can challenge them.)`

- [ ] **009/actions/emerald/096-improvise.test.ts**
  - Card: `009/actions/emerald/096-improvise.ts`
    - `Chosen character gets +1 {S} this turn. Draw a card.`

- [ ] **009/actions/emerald/097-under-the-sea.test.ts**
  - Card: `009/actions/emerald/097-under-the-sea.ts`
    - `Sing Together 8 (Any number of your or your teammates’ characters with total cost 8 or more may {E} to sing this song for free.)`
    - `Put all opposing characters with 2 {S} or less on the bottom of their players’ decks in any order.`

- [ ] **009/actions/ruby/130-i2i.test.ts**
  - Card: `009/actions/ruby/130-i2i.ts`
    - `Sing Together 9 (Any number of your or your teammates’ characters with total cost 9 or more may {E} to sing this song for free.)`
    - `Each player draws 2 cards and gains 2 lore. If 2 or more characters sang this song, ready them. They can’t quest for the rest of this turn.`
    - `If 2 or more characters sang this song, ready them. They can’t quest for the rest of this turn.`
    - `Doesn't trigger if only one character sings.`
    - `Doesn't trigger if sang by only one character. Powerline - World's Greatest Rock Star interaction`

- [ ] **009/actions/ruby/132-a-pirate-s-life.test.ts**
  - Card: `009/actions/ruby/132-a-pirate-s-life.ts`
    - `SING TOGETHER 6 (Any number of your or your teammates’ characters with total cost 6 or more may {E} to sing this song for free.)`
    - `Each opponent loses 2 lore. You gain 2 lore.`

- [ ] **009/actions/ruby/133-be-king-undisputed.test.ts**
  - Card: `009/actions/ruby/133-be-king-undisputed.ts`
    - `_(A character with cost 4 or more can {E} to sing this song for free.)_`
    - `Each opponent chooses and banishes one of their characters (even if you have triggers pending).`

- [ ] **009/actions/sapphire/163-develop-your-brain.test.ts**
  - Card: `009/actions/sapphire/163-develop-your-brain.ts`
    - `Look at the top 2 cards of your deck. Put one into your hand and the other on the bottom of the deck.`

- [ ] **009/actions/sapphire/164-four-dozen-eggs.test.ts**
  - Card: `009/actions/sapphire/164-four-dozen-eggs.ts`
    - `_(A character with cost 4 or more can {E} to sing this`
    - `song for free.)_`
    - `Your characters gain **Resist** +2 until the start of your next turn. _(Damage dealt to them is reduced by 2.)_`

- [ ] **009/actions/sapphire/165-one-jump-ahead.test.ts**
  - Card: `009/actions/sapphire/165-one-jump-ahead.ts`
    - `_(A character with cost 2 or more can {E} to sing this song for free.)_`
    - `Put the top card of your deck into your inkwell facedown and exerted.`

- [ ] **009/actions/sapphire/166-dig-a-little-deeper.test.ts**
  - Card: `009/actions/sapphire/166-dig-a-little-deeper.ts`
    - `**Sing Together** 8 _(Any number of your of your teammates' characters with total cost 8 or more may {E} to sing this song for free.)_`
    - `Look at the top 7 cards of your deck. Put 2 into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **009/actions/steel/197-one-last-hope.test.ts**
  - Card: `009/actions/steel/197-one-last-hope.ts`
    - `_(A character with cost 3 or more can {E} to sing this song for free.)_`
    - `Chosen character gains **Resist** +2 until the start of your next turn. If a Hero character is chosen, they may also challenge ready characters this turn. _(Damage dealt to them is reduced by 2.)_`

- [ ] **009/actions/steel/198-smash.test.ts**
  - Card: `009/actions/steel/198-smash.ts`
    - `Deal 3 damage to chosen character.`

- [ ] **009/actions/steel/199-i-find-em-i-flatten-em.test.ts**
  - Card: `009/actions/steel/199-i-find-em-i-flatten-em.ts`
    - `_(A character with cost 4 or more can {E} to sing this song for free.)_`
    - `Banish all items.`

- [ ] **009/actions/steel/200-fire-the-cannons-.test.ts**
  - Card: `009/actions/steel/200-fire-the-cannons-.ts`
    - `Deal 2 damage to chosen character.`

- [ ] **009/actions/steel/201-strength-of-a-raging-fire.test.ts**
  - Card: `009/actions/steel/201-strength-of-a-raging-fire.ts`
    - `_A character with cost 3 or more can {E} to sing this song for free.)_`
    - `Deal damage to chosen character equal to the number of characters you have in play.`

- [ ] **009/actions/steel/202-the-mob-song.test.ts**
  - Card: `009/actions/steel/202-the-mob-song.ts`
    - `**Sing Together** 10 _(Any number of your of your teammates' characters with total cost 10 or more may {E} to sing this song for free.)_`
    - `Deal 3 damage to up to 3 chosen characters and/or locations.`

### characters (76 tests)

- [ ] **009/characters/amber/001-the-queen-conceited-ruler.test.ts**
  - Card: `009/characters/amber/001-the-queen-conceited-ruler.ts`
    - `Support (Whenever this character quests, you may add their {S} to another chosen character's {S} this turn.)`
    - `ROYAL SUMMONS At the start of your turn, you may choose and discard a Princess or Queen character card to return a character card from your discard to your hand.`

- [ ] **009/characters/amber/004-beast-gracious-prince.test.ts**
  - Card: `009/characters/amber/004-beast-gracious-prince.ts`
    - `FULL DANCE CARD Your Princess characters get +1 {S} and +1 {W}.`

- [ ] **009/characters/amber/005-minnie-mouse-sweetheart-princess.test.ts**
  - Card: `009/characters/amber/005-minnie-mouse-sweetheart-princess.ts`
    - `ROYAL FAVOR Your characters named Mickey Mouse gain Support. (Whenever they quest, you may add their {S} to another chosen character's {S} this turn.)`
    - `BYE BYE, NOW Whenever this character quests, you may banish chosen exerted character with 5 {S} or more.`
    - `Should banish only one character`

- [ ] **009/characters/amber/006-aurora-holding-court.test.ts**
  - Card: `009/characters/amber/006-aurora-holding-court.ts`
    - `[QUEEN] ROYAL WELCOME Whenever this character quests, you pay 1 {I} less for the next Princess or Queen character you play this turn.`
    - `[PRINCESS] ROYAL WELCOME Whenever this character quests, you pay 1 {I} less for the next Princess or Queen character you play this turn.`
    - `ROYAL WELCOME reduces shift cost for the next Princess or Queen (e.g. shifting Pocahontas - Peacekeeper)`
    - `Double Aurora Playing Double Princess`

- [ ] **009/characters/amber/011-daisy-duck-musketeer-spy.test.ts**
  - Card: `009/characters/amber/011-daisy-duck-musketeer-spy.ts`
    - `INFILTRATION When you play this character, each opponent chooses and discards a card.`

- [ ] **009/characters/amber/012-tinker-bell-generous-fairy.test.ts**
  - Card: `009/characters/amber/012-tinker-bell-generous-fairy.ts`
    - `MAKE A NEW FRIEND When you play this character, look at the top 4 cards of your deck. You may reveal a character card and put it into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **009/characters/amber/014-pluto-determined-defender.test.ts**
  - Card: `009/characters/amber/014-pluto-determined-defender.ts`
    - `**Shift** 5 _(You may pay 5 {I} to play this on top of one of your characters named Pluto.)_`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_`
    - `**GUARD DOG** At the start of your turn, remove up to 3 damage from this character.`

- [ ] **009/characters/amber/016-pluto-rescue-dog.test.ts**
  - Card: `009/characters/amber/016-pluto-rescue-dog.ts`
    - `**TO THE RESCUE** When you play this character, you may remove up to 3 damage from chosen character.`

- [ ] **009/characters/amber/017-nani-protective-sister.test.ts**
  - Card: `009/characters/amber/017-nani-protective-sister.ts`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_`

- [ ] **009/characters/amber/018-julieta-madrigal-excellent-cook.test.ts**
  - Card: `009/characters/amber/018-julieta-madrigal-excellent-cook.ts`
    - `**SIGNATURE RECIPE** When you play this character, you may remove up to 2 damage from chosen character. If you removed damage this way, you may draw a card.`

- [ ] **009/characters/amber/019-cinderella-gentle-and-kind.test.ts**
  - Card: `009/characters/amber/019-cinderella-gentle-and-kind.ts`
    - `**Singer** 4 _(This character counts as cost 4 to sing songs.)_`
    - `**A WONDERFUL DREAM** {E}− Remove up to 3 damage from chosen Princess character.`

- [ ] **009/characters/amber/020-moana-of-motunui.test.ts**
  - Card: `009/characters/amber/020-moana-of-motunui.ts`
    - `**WE CAN FIX IT** Whenever this character quests, you may ready your other Princess characters. They can't quest for the rest of this turn.`

- [ ] **009/characters/amber/021-pluto-friendly-pooch.test.ts**
  - Card: `009/characters/amber/021-pluto-friendly-pooch.ts`
    - `**GOOD DOG** {E} – You pay 1 {I} less for the next character you play this turn.`

- [ ] **009/characters/amber/022-ursula-vanessa.test.ts**
  - Card: `009/characters/amber/022-ursula-vanessa.ts`
    - `**Singer** 4 _(This character counts as cost 4 to sing songs.)_`

- [ ] **009/characters/amber/023-queen-of-hearts-wonderland-empress.test.ts**
  - Card: `009/characters/amber/023-queen-of-hearts-wonderland-empress.ts`
    - `**ALL WAYS HERE ARE MY WAYS** Whenever this character quests, your other Villain characters get +1 {L} this turn.`

- [ ] **009/characters/amber/024-stitch-carefree-surfer.test.ts**
  - Card: `009/characters/amber/024-stitch-carefree-surfer.ts`
    - `**OHANA** When you play this character, if you have 2 or more other characters in play, you may draw 2 cards.`

- [ ] **009/characters/amethyst/000-bruno-madrigal-undetected-uncle.test.ts**
  - Card: `009/characters/amethyst/000-bruno-madrigal-undetected-uncle.ts`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`
    - `**YOU JUST HAVE TO SEE IT** {E} − Name a card, then reveal the top card of your deck. If it's the named card, put that card into your hand and gain 3 lore. Otherwise, put it on the top of your deck.`

- [ ] **009/characters/amethyst/036-rafiki-mystical-fighter.test.ts**
  - Card: `009/characters/amethyst/036-rafiki-mystical-fighter.ts`
    - `**Challenger** +3 _(While challenging, this character gets +3 {S}.)_`
    - `**ANCIENT SKILLS** Whenever he challenges a Hyena character, this character takes no damage from the challenge.`

- [ ] **009/characters/amethyst/037-ursula-sea-witch.test.ts**
  - Card: `009/characters/amethyst/037-ursula-sea-witch.ts`
    - `YOU'RE TOO LATE Whenever this character quests, chosen opposing character can't ready at the start of their next turn.`

- [ ] **009/characters/amethyst/038-jafar-keeper-of-secrets.test.ts**
  - Card: `009/characters/amethyst/038-jafar-keeper-of-secrets.ts`
    - `**HIDDEN WONDERS** This character gets +1 {S} for each card in your hand.`

- [ ] **009/characters/amethyst/039-belle-untrained-mystic.test.ts**
  - Card: `009/characters/amethyst/039-belle-untrained-mystic.ts`
    - `**HERE NOW, DON'T DO THAT** When you play this character, move up to 1 damage counter from chosen character to chosen opposing character.`

- [ ] **009/characters/amethyst/040-belle-accomplished-mystic.test.ts**
  - Card: `009/characters/amethyst/040-belle-accomplished-mystic.ts`
    - `**Shift** 3`
    - `**ENHANCED HEALING** When you play this character, move up to 3 damage counters from chosen character to chosen opposing character.`

- [ ] **009/characters/amethyst/042-peter-pan-s-shadow-not-sewn-on.test.ts**
  - Card: `009/characters/amethyst/042-peter-pan-s-shadow-not-sewn-on.ts`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`
    - `**Rush** _(This character can challenge the turn they're played.)_`
    - `**TIPTOE** Your other characters with **Rush** gain **Evasive**.`

- [ ] **009/characters/amethyst/043-elsa-spirit-of-winter.test.ts**
  - Card: `009/characters/amethyst/043-elsa-spirit-of-winter.ts`
    - `**Shift** 6 _(You may pay 6 {I} to play this on top of one of your characters named Elsa.)_`
    - `**DEEP FREEZE** When you play this character, exert up to 2 chosen characters. They can't ready at the start of their next turn.`
    - `Deep Freeze prevents readying at Ready step but not by other effects`

- [ ] **009/characters/amethyst/044-ursula-voice-stealer.test.ts**
  - Card: `009/characters/amethyst/044-ursula-voice-stealer.ts`
    - `SING FOR ME When you play this character, exert chosen opposing ready character. Then, you may play a song with cost equal to or less than the exerted character's cost for free.`
    - `Cannot play song if no opposing ready character exists`
    - `Clarabelle interaction`

- [ ] **009/characters/amethyst/045-dumbo-ninth-wonder-of-the-universe.test.ts**
  - Card: `009/characters/amethyst/045-dumbo-ninth-wonder-of-the-universe.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `BREAKING RECORDS {E}, 1 {I} – Draw a card and gain 1 lore.`
    - `MAKING HISTORY Your other characters with Evasive gain '{E}, 1 {I} – Draw a card and gain 1 lore.'`
    - `Only give the ability to other characters`
    - `A Pirate's Life interaction`

- [ ] **009/characters/amethyst/046-dumbo-the-flying-elephant.test.ts**
  - Card: `009/characters/amethyst/046-dumbo-the-flying-elephant.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `AERIAL DUO When you play this character, chosen character gains Evasive until the start of your next turn.`

- [ ] **009/characters/amethyst/047-timothy-q-mouse-flight-instructor.test.ts**
  - Card: `009/characters/amethyst/047-timothy-q-mouse-flight-instructor.ts`
    - `LET'S SHOW 'EM, DUMBO! While you have a character with Evasive in play, this character gets +1 {L}.`

- [ ] **009/characters/amethyst/049-kuzco-wanted-llama.test.ts**
  - Card: `009/characters/amethyst/049-kuzco-wanted-llama.ts`
    - `**OK, WHERE AM I?** When this character is banished, you may draw a card.`

- [ ] **009/characters/amethyst/050-tick-tock-ever-present-pursuer.test.ts**
  - Card: `009/characters/amethyst/050-tick-tock-ever-present-pursuer.ts`
    - `**Evasive** _(Only characters with Evasive can challenge this character.)_`

- [ ] **009/characters/amethyst/051-dolores-madrigal-easy-listener.test.ts**
  - Card: `009/characters/amethyst/051-dolores-madrigal-easy-listener.ts`
    - `**MAGICAL INFORMANT** When you play this character, if an opponent has an exerted character in play, you may draw a card.`

- [ ] **009/characters/amethyst/052-camilo-madrigal-prankster.test.ts**
  - Card: `009/characters/amethyst/052-camilo-madrigal-prankster.ts`
    - `**MANY FORMS** At the start of your turn, you may chose one:`
    - `• This character gets +1 {L} this turn.`
    - `• This character gain **Challenger** +2 this turn. _(While challenging, this character gets +2 {S}.)_`

- [ ] **009/characters/amethyst/057-mama-odie-voice-of-wisdom.test.ts**
  - Card: `009/characters/amethyst/057-mama-odie-voice-of-wisdom.ts`
    - `**LISTEN TO YOUR MAMA NOW** Whenever this character quests, you may move up to 2 damage counters from chosen character to chosen opposing character.`

- [ ] **009/characters/emerald/071-cursed-merfolk-ursula-s-handiwork.test.ts**
  - Card: `009/characters/emerald/071-cursed-merfolk-ursula-s-handiwork.ts`
    - `**POOR SOULS** Whenever this character is challenged, each opponent chooses and discards a card.`

- [ ] **009/characters/emerald/074-goofy-set-for-adventure.test.ts**
  - Card: `009/characters/emerald/074-goofy-set-for-adventure.ts`
    - `FAMILY VACATION - should move another character and draw a card when character is moved`
    - `FAMILY VACATION - should NOT draw a card when no other character is available to move`

- [ ] **009/characters/emerald/075-max-goof-rebellious-teen.test.ts**
  - Card: `009/characters/emerald/075-max-goof-rebellious-teen.ts`
    - `PERSONAL SOUNDTRACK When you play this character, you may pay 1 {I} to return a song card with cost 3 or less from your discard to your hand.`
    - `Interaction with Mother Knows Best`

- [ ] **009/characters/emerald/076-genie-of-the-lamp.test.ts**
  - Card: `009/characters/emerald/076-genie-of-the-lamp.ts`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `LET'S MAKE SOME MAGIC While this character is exerted, your other characters get +2 {S}.`

- [ ] **009/characters/emerald/077-max-goof-chart-topper.test.ts**
  - Card: `009/characters/emerald/077-max-goof-chart-topper.ts`
    - `Shift 4 {I} (You may pay 4 {I} to play this on top of one of your characters named Max Goof.)`
    - `NUMBER ONE HIT Whenever this character quests, you may play a song card with cost 4 or less from your discard for free, then put it on the bottom of your deck instead of into your discard.`

- [ ] **009/characters/emerald/078-bobby-zimuruski-spray-cheese-kid.test.ts**
  - Card: `009/characters/emerald/078-bobby-zimuruski-spray-cheese-kid.ts`
    - `SO CHEESY When you play this character, you may draw a card, then choose and discard a card.`

- [ ] **009/characters/emerald/079-megara-pulling-the-strings.test.ts**
  - Card: `009/characters/emerald/079-megara-pulling-the-strings.ts`
    - `WONDER BOY When you play this character, chosen character gets +2 {S} this turn.`

- [ ] **009/characters/emerald/083-donald-duck-sleepwalker.test.ts**
  - Card: `009/characters/emerald/083-donald-duck-sleepwalker.ts`
    - `**STARTLED AWAKE** Whenever you play an action, this character gets +2 {S} this turn.`

- [ ] **009/characters/emerald/093-daisy-duck-secret-agent.test.ts**
  - Card: `009/characters/emerald/093-daisy-duck-secret-agent.ts`
    - `**THWART** Whenever this character quests, each opponent chooses and discards a card.`

- [ ] **009/characters/ruby/103-lefou-instigator.test.ts**
  - Card: `009/characters/ruby/103-lefou-instigator.ts`
    - `**FAN THE FLAMES** When you play this character, ready chosen character. They can't quest for the rest of this turn.`

- [ ] **009/characters/ruby/104-shere-khan-menacing-predator.test.ts**
  - Card: `009/characters/ruby/104-shere-khan-menacing-predator.ts`
    - `**DON'T INSULT MY INTELLIGENCE** Whenever one of your characters challenges another character, gain 1 lore.`

- [ ] **009/characters/ruby/109-powerline-taking-the-stage.test.ts**
  - Card: `009/characters/ruby/109-powerline-taking-the-stage.ts`
    - `Singer 4 (This character counts as cost 4 to sing songs.)`

- [ ] **009/characters/ruby/110-powerline-world-s-greatest-rock-star.test.ts**
  - Card: `009/characters/ruby/110-powerline-world-s-greatest-rock-star.ts`
    - `Shift 4 {I} (You may pay 4 {I} to play this on top of one of your characters named Powerline.)`
    - `Singer 9`
    - `MASH-UP Once during your turn, whenever this character sings a song, look at the top 4 cards of your deck. You may reveal a song card with cost 9 or less and play it for free. Put the rest on the bottom of your deck in any order.`
    - `Be King Undisputed must fully resolve before MASH-UP can resolve`
    - `MASH-UP triggers when singing Be Prepared (which banishes Powerline)`

- [ ] **009/characters/ruby/111-mickey-mouse-brave-little-prince.test.ts**
  - Card: `009/characters/ruby/111-mickey-mouse-brave-little-prince.ts`
    - `Shift 5 {I} (You may pay 5 {I} to play this on top of one of your characters named Mickey Mouse.)`
    - `Evasive (Only characters with Evasive can challenge this character.)`
    - `CROWNING ACHIEVEMENT While this character has a card under him, he gets +3 {S}, +3 {W}, and +3 {L}.`
    - `CROWNING ACHIEVEMENT: no shift`
    - `Only gives the buff for the instance, do not give bonus to other mickeys on board`

- [ ] **009/characters/ruby/112-max-goof-rockin-teen.test.ts**
  - Card: `009/characters/ruby/112-max-goof-rockin-teen.ts`
    - `Singer 5 (This character counts as cost 5 to sing songs.)`
    - `I JUST WANNA STAY HOME This character can't move to locations.`

- [ ] **009/characters/ruby/113-roxanne-powerline-fan.test.ts**
  - Card: `009/characters/ruby/113-roxanne-powerline-fan.ts`
    - `CONCERT LOVER While you have a character with Singer in play, this character gets +1 {S} and +1 {L}.`

- [ ] **009/characters/ruby/114-p-j-pete-caught-up-in-the-music.test.ts**
  - Card: `009/characters/ruby/114-p-j-pete-caught-up-in-the-music.ts`
    - `SHOUT OUT LOUD! Whenever you play a song, this character gets +2 {S} this turn.`

- [ ] **009/characters/ruby/117-powerline-musical-superstar.test.ts**
  - Card: `009/characters/ruby/117-powerline-musical-superstar.ts`
    - `ELECTRIC MOVE If you've played a song this turn, this character gains Rush this turn. (They can challenge the turn they're played.)`
    - `Powerline gains Rush even if played AFTER the song`

- [ ] **009/characters/ruby/123-queen-of-hearts-impulsive-ruler.test.ts**
  - Card: `009/characters/ruby/123-queen-of-hearts-impulsive-ruler.ts`
    - `**Rush** _(This character can challenge the turn they're played.)_`

- [ ] **009/characters/sapphire/137-anna-true-hearted.test.ts**
  - Card: `009/characters/sapphire/137-anna-true-hearted.ts`
    - `**LET ME HELP YOU** Whenever this character quests, your other Hero characters get +1 {L} this turn.`

- [ ] **009/characters/sapphire/141-alice-accidentally-adrift.test.ts**
  - Card: `009/characters/sapphire/141-alice-accidentally-adrift.ts`
    - `WASHED AWAY When you play this character, you may put chosen item into its player's inkwell facedown and exerted.`
    - `MAKING WAVES Whenever this character quests, chosen opposing character gets -2 {S} this turn.`

- [ ] **009/characters/sapphire/142-mulan-considerate-diplomat.test.ts**
  - Card: `009/characters/sapphire/142-mulan-considerate-diplomat.ts`
    - `IMPERIAL INVITATION Whenever this character quests, look at the top 4 cards of your deck. You may reveal a Princess character card and put it into your hand. Put the rest on the bottom of your deck in any order.`

- [ ] **009/characters/sapphire/143-cruella-de-vil-style-icon.test.ts**
  - Card: `009/characters/sapphire/143-cruella-de-vil-style-icon.ts`
    - `OUT OF SEASON Once during your turn, whenever a character with cost 2 or less is banished, put the top card of your deck into your inkwell facedown and exerted.`
    - `INSULTING REMARK During your turn, each opposing character with cost 2 or less gets...`

- [ ] **009/characters/sapphire/145-cruella-de-vil-fashionable-cruiser.test.ts**
  - Card: `009/characters/sapphire/145-cruella-de-vil-fashionable-cruiser.ts`
    - `**NOW GET GOING** During your turn, this character gains **Evasive**. _(They can challenge characters with Evasive.)_`

- [ ] **009/characters/sapphire/149-the-queen-mirror-seeker.test.ts**
  - Card: `009/characters/sapphire/149-the-queen-mirror-seeker.ts`
    - `**CALCULATING AND VAIN** Whenever this character quests, you may look at the top 3 cards of your deck and put them back in any order.`

- [ ] **009/characters/sapphire/150-grand-pabbie-oldest-and-wisest.test.ts**
  - Card: `009/characters/sapphire/150-grand-pabbie-oldest-and-wisest.ts`
    - `**ANCIENT INSIGHT** Whenever you remove 1 or more damage from one of your characters, gain 2 lore.`

- [ ] **009/characters/sapphire/152-mama-odie-mystical-maven.test.ts**
  - Card: `009/characters/sapphire/152-mama-odie-mystical-maven.ts`
    - `**THIS GOING TO BE GOOD** Whenever you play a song, you may put the top card of your deck into your inkwell facedown and exerted.`

- [ ] **009/characters/sapphire/157-judy-hopps-optimistic-officer.test.ts**
  - Card: `009/characters/sapphire/157-judy-hopps-optimistic-officer.ts`
    - `**DON'T CALL ME CUTE** When you play this character, you may banish chosen item. Its player draws a card.`

- [ ] **009/characters/sapphire/159-winnie-the-pooh-having-a-think.test.ts**
  - Card: `009/characters/sapphire/159-winnie-the-pooh-having-a-think.ts`
    - `**HUNNY POT** Whenever this character quests, you may put a card from your hand into your inkwell facedown.`

- [ ] **009/characters/sapphire/162-robin-hood-unrivaled-archer.test.ts**
  - Card: `009/characters/sapphire/162-robin-hood-unrivaled-archer.ts`
    - `**Feed The Poor** When you play this character, if an opponent has more cards in their hand than you, draw a card./n/n**Good Shot** During your turn, this character gains **Evasive**. (_They can challenge characters with Evasive._)`

- [ ] **009/characters/steel/171-philoctetes-no-nonsense-instructor.test.ts**
  - Card: `009/characters/steel/171-philoctetes-no-nonsense-instructor.ts`
    - `**YOU GOTTA STAY FOCUSED** Your Hero characters gain **Challenger** +1. _(They get +1 {S} while challenging.)_`
    - `**SHAMELESS PROMOTER** Whenever you play a Hero character, gain 1 lore.`

- [ ] **009/characters/steel/172-mickey-mouse-trumpeter.test.ts**
  - Card: `009/characters/steel/172-mickey-mouse-trumpeter.ts`
    - `**BUGLE CALL** {E}, 2 {I} - Play a character for free.`

- [ ] **009/characters/steel/173-nala-undaunted-lioness.test.ts**
  - Card: `009/characters/steel/173-nala-undaunted-lioness.ts`
    - `DETERMINED DIVERSION While this character has no damage, she gets +1 {L} and gains Resist +1. (Damage dealt to them is reduced by 1.)`
    - `DETERMINED DIVERSION While this character has no damage, she gets +1 {L} and gains Resist +1. (Damage dealt to them is reduced by 1.)`

- [ ] **009/characters/steel/174-lilo-best-explorer-ever.test.ts**
  - Card: `009/characters/steel/174-lilo-best-explorer-ever.ts`
    - `COME ON, PEOPLE, LET'S MOVE When you play this character, your other characters gain Challenger +2 this turn. (They get +2 {S} while challenging.)`
    - `GO GET 'EM Whenever this character quests, chosen Alien character gains Challenger +2 and 'This character can challenge ready characters' this turn.`

- [ ] **009/characters/steel/175-scar-finally-king.test.ts**
  - Card: `009/characters/steel/175-scar-finally-king.ts`
    - `BE GRATEFUL Your Ally characters get +1 {S}.`
    - `STICK WITH ME At the end of your turn, if this character is exerted, you may draw cards equal to the {S} of a chosen Ally character of yours. If you do, choose and discard 2 cards and banish that character.`
    - `Draw 2 Discard 2`
    - `STICK WITH ME can target Roxanne - Powerline Fan (Storyborn Ally)`

- [ ] **009/characters/steel/176-little-john-sir-reginald.test.ts**
  - Card: `009/characters/steel/176-little-john-sir-reginald.ts`
    - `WHAT A BEAUTIFUL BRAWL! When you play this character, choose one:`
    - `- Chosen Hero character gains Resist +2 this turn. (Damage dealt to them is reduced by 2.)`
    - `- Deal 2 damage to chosen Villain character.`

- [ ] **009/characters/steel/177-robin-hood-champion-of-sherwood.test.ts**
  - Card: `009/characters/steel/177-robin-hood-champion-of-sherwood.ts`
    - `**Shift** 3 _(You may pay 3 {I} to play this on top of one of your characters named Robin Hood.)_`
    - `**SKILLED COMBATANT** During your turn, whenever this character banishes another character in a challenge, gain 2 lore.`
    - `**THE GOOD OF OTHERS** When this character is banished in a challenge, you may draw a card.`

- [ ] **009/characters/steel/178-jasmine-fearless-princess.test.ts**
  - Card: `009/characters/steel/178-jasmine-fearless-princess.ts`
    - `TAKE THE LEAP During your turn, this character gains Evasive. (They can challenge characters with Evasive.)`
    - `NOW'S MY CHANCE Choose and discard a card — This character gains Challenger +3 this turn. (They get +3 {S} while challenging.)`

- [ ] **009/characters/steel/189-tinker-bell-tiny-tactician.test.ts**
  - Card: `009/characters/steel/189-tinker-bell-tiny-tactician.ts`
    - `**Battle plans** {E} - Draw a card, then choose and discard a card.`

- [ ] **009/characters/steel/190-captain-hook-captain-of-the-jolly-roger.test.ts**
  - Card: `009/characters/steel/190-captain-hook-captain-of-the-jolly-roger.ts`
    - `**DOUBLE THE POWDER!** When you play this character, you may return an action card named Fire the Cannons! from your discard to your hand.`

- [ ] **009/characters/steel/191-hercules-true-hero.test.ts**
  - Card: `009/characters/steel/191-hercules-true-hero.ts`
    - `**Bodyguard** _(This character may enter play exerted. An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_`

- [ ] **009/characters/steel/192-john-silver-greedy-treasure-seeker.test.ts**
  - Card: `009/characters/steel/192-john-silver-greedy-treasure-seeker.ts`
    - `**CHART YOUR OWN COURSE** For each location you have in play, this character gains **Resist** +1 and gets +1 {L}. _(Damage dealt to them is reduced by 1.)_`

- [ ] **009/characters/steel/194-prince-eric-dashing-and-brave.test.ts**
  - Card: `009/characters/steel/194-prince-eric-dashing-and-brave.ts`
    - `**Challenger** +2 _(While challenging, this character gets +2 {S}.)_`

### items (6 tests)

- [ ] **009/items/amethyst/064-the-magic-feather.test.ts**
  - Card: `009/items/amethyst/064-the-magic-feather.ts`
    - `NOW YOU CAN FLY! When you play this item, choose a character of yours. While this item is in play, that character gains Evasive. (Only characters with Evasive can challenge them.)`
    - `GROUNDED 3 {I} – Return this item to your hand.`
    - `Character loses Evasive when the item leaves play`

- [ ] **009/items/emerald/100-family-fishing-pole.test.ts**
  - Card: `009/items/emerald/100-family-fishing-pole.ts`
    - `WATCH CLOSELY This item enters play exerted.`
    - `THE PERFECT CAST {E}, 1 {I}, Banish this item – Return chosen exerted character of yours to your hand to gain 2 lore.`

- [ ] **009/items/ruby/134-medallion-weights.test.ts**
  - Card: `009/items/ruby/134-medallion-weights.ts`
    - `**DISCIPLINE AND STRENGTH** {E}, 2 {I} - Chosen character gets +2 {S} this turn. Whenever they challenge another character this turn, you may draw a card.`

- [ ] **009/items/ruby/135-dinner-bell.test.ts**
  - Card: `009/items/ruby/135-dinner-bell.ts`
    - `**YOU KNOW WHAT HAPPENS** {E}, 2 {I} − Draw cards equal to the damage on chosen character of yours, then banish them.`

- [ ] **009/items/sapphire/167-aurelian-gyrosensor.test.ts**
  - Card: `009/items/sapphire/167-aurelian-gyrosensor.ts`
    - `**SEEKING KNOWLEDGE** Whenever one of your characters quests, you may look at the top card of your deck. Put it on either the top or the bottom of your deck.`

- [ ] **009/items/steel/203-beast-s-mirror.test.ts**
  - Card: `009/items/steel/203-beast-s-mirror.ts`
    - `**SHOW ME** {E}, 3 {I} - If you have no cards in your hand, draw a card.`

### locations (3 tests)

- [ ] **009/locations/amethyst/068-casa-madrigal-casita.test.ts**
  - Card: `009/locations/amethyst/068-casa-madrigal-casita.ts`
    - `**OUR HOME** At the start of your turn, if you have a character here, gain 1 lore.`

- [ ] **009/locations/sapphire/170-motunui-island-paradise.test.ts**
  - Card: `009/locations/sapphire/170-motunui-island-paradise.ts`
    - `**REINCARNATION** Whenever a character is banished while here, you may put that card into your inkwell facedown and exerted.`

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

- [ ] **011/characters/103-wreck-it-ralph-raging-wrecker.test.ts**
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
