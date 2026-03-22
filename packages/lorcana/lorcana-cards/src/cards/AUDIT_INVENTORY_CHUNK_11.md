# Card Test Inventory

Legacy implementation base directory: /Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards
New implementation base directory: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards

**Chunk 11 of 18** | [← Previous](AUDIT_INVENTORY_CHUNK_10.md) | [Next →](AUDIT_INVENTORY_CHUNK_12.md)

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

- [ ] **007/characters/193-mulan-disguised-soldier.test.ts**
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
