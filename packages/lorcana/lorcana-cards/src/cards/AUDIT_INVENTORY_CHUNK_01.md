# Card Test Inventory

Legacy implementation base directory: /Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards
New implementation base directory: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards

**Chunk 1 of 18** | [Next →](AUDIT_INVENTORY_CHUNK_02.md)

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

### characters (128 tests)

- [x] **002/characters/001-bashful-hopeless-romantic.test.ts**
  - Card: `002/characters/001-bashful-hopeless-romantic.ts`
    - `**OH, GOSH** This character can't quest unless you have another Seven Dwarfs character in play.`

- [x] **002/characters/002-christopher-robin-adventurer.test.ts**
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

- [x] **002/characters/008-gaston-baritone-bully.test.ts**
  - Card: `002/characters/008-gaston-baritone-bully.ts`
    - `Singer`

- [x] **002/characters/009-grand-duke-advisor-to-the-king.test.ts**
  - Card: `002/characters/009-grand-duke-advisor-to-the-king.ts`
    - `**YES, YOUR MAJESTY** Your Prince, Princess, King and Queen characters gain +1 {S}.`

- [x] **002/characters/010-grumpy-bad-tempered.test.ts**
  - Card: `002/characters/010-grumpy-bad-tempered.ts`
    - `**THERE'S TROUBLE A-BREWIN'** Your other Seven Dwarfs characters get +1 {S}.`

- [x] **002/characters/011-happy-good-natured.test.ts**
  - Card: `002/characters/011-happy-good-natured.ts`
    - `Support`

- [x] **002/characters/012-king-louie-jungle-vip.test.ts**
  - Card: `002/characters/012-king-louie-jungle-vip.ts`
    - `**LAY IT ON THE LINE** Whenever another character is banished, you may remove up to 2 damage from this character.`

- [x] **002/characters/013-mickey-mouse-friendly-face.test.ts**
  - Card: `002/characters/013-mickey-mouse-friendly-face.ts`
    - `**GLAD YOU’RE HERE!** Whenever this character quests, you pay 3 {I} less for the next character you play this turn.`

- [x] **002/characters/014-mufasa-betrayed-leader.test.ts**
  - Card: `002/characters/014-mufasa-betrayed-leader.ts`
    - `**THE SUN WILL SET** When this character is banished, you may reveal the top card of your deck. If it's a character card, you may play that character for free and they enter play exerted. Otherwise, put it on the top of your deck.`
    - `Removed on opponent's turn`

- [x] **002/characters/015-mulan-free-spirit.test.ts**
  - Card: `002/characters/015-mulan-free-spirit.ts`

- [x] **002/characters/016-mulan-reflecting.test.ts**
  - Card: `002/characters/016-mulan-reflecting.ts`
    - `shift`
    - `**HONOR TO THE ANCESTORS** Whenever this character quests, you may reveal the top card of your deck. If it's a song card, you may play it for free. Otherwise, put it on the top of your deck.`

- [x] **002/characters/017-nana-darling-family-pet.test.ts**
  - Card: `002/characters/017-nana-darling-family-pet.ts`
    - `Playing a floodborn`

- [x] **002/characters/019-rapunzel-gifted-artist.test.ts**
  - Card: `002/characters/019-rapunzel-gifted-artist.ts`
    - `**LET YOUR POWER SHINE** Whenever you remove 1 or more damage from one of your characters, you may draw a card.`
    - `Shift`
    - `Rapunzel, Maleficent COMBO WOMBO`

- [x] **002/characters/020-rapunzel-sunshine.test.ts**
  - Card: `002/characters/020-rapunzel-sunshine.ts`
    - `remove 2 damage`
    - `remove 1 damage`

- [x] **002/characters/021-sleepy-nodding-off.test.ts**
  - Card: `002/characters/021-sleepy-nodding-off.ts`
    - `**YAWN!** This character enters play exerted.`

- [x] **002/characters/022-sneezy-very-allergic.test.ts**
  - Card: `002/characters/022-sneezy-very-allergic.ts`
    - `playing Sneezy`
    - `playing another Seven Dwarfs character`
    - `playing another character, Not a seven dwarfs char`
    - `opponent playing a seven dwarfs char`

- [x] **002/characters/023-snow-white-lost-in-the-forest.test.ts**
  - Card: `002/characters/023-snow-white-lost-in-the-forest.ts`
    - `**I WON'T HURT YOU** When you play this character, you may remove up to 2 damage from chosen character.`

- [x] **002/characters/024-snow-white-unexpected-houseguest.test.ts**
  - Card: `002/characters/024-snow-white-unexpected-houseguest.ts`
    - `How Do You Do?`
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

- [x] **002/characters/106-donald-duck-not-again-.test.ts**
  - Card: `MISSING`
    - `Evasive`
    - `**PHOOEY!** This character gets +1 {L} for each 1 damage on him.`

- [ ] **002/characters/107-felicia-always-hungry.test.ts**
  - Card: `002/characters/107-felicia-always-hungry.ts`
    - `Reckless`
