# Card Test Inventory

Legacy implementation base directory: /Users/wazar/projects/lorcanito/packages/lorcana-engine/src/cards
New implementation base directory: /Users/wazar/projects/the-card-goat-online/packages/lorcana/lorcana-cards/src/cards


**Chunk 13 of 18** | [← Previous](AUDIT_INVENTORY_CHUNK_12.md) | [Next →](AUDIT_INVENTORY_CHUNK_14.md)


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
