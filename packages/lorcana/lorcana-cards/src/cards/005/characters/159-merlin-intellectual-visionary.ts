import type { CharacterCard } from "@tcg/lorcana-types";

export const merlinIntellectualVisionary: CharacterCard = {
  id: "ngW",
  canonicalId: "ci_ngW",
  reprints: ["set5-159"],
  cardType: "character",
  name: "Merlin",
  version: "Intellectual Visionary",
  i18n: {
    en: {
      name: "Merlin",
      version: "Intellectual Visionary",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "OVERDEVELOPED BRAIN",
          description:
            "When you play this character, if you used Shift to play him, you may search your deck for any card, put that card into your hand, then shuffle your deck.",
        },
      ],
    },
    de: {
      name: "Merlin",
      version: "Intellektueller Visionär",
      text: "Gestaltwandel 5 ÜBERENTWICKELTES GEHIRN Wenn du diesen Charakter ausspielst, falls du Gestaltwandel benutzt hast, um diesen Charakter auszuspielen, darfst du dein Deck nach einer beliebigen Karte durchsuchen und diese auf deine Hand nehmen. Mische danach dein Deck.",
    },
    fr: {
      name: "Merlin",
      version: "Visionnaire éclairé",
      text: "Alter 5 CERVEAU SURDÉVELOPPÉ Si vous jouez ce personnage en utilisant sa capacité Alter, vous pouvez chercher une carte dans votre pioche et la placer dans votre main. Ensuite, mélangez votre pioche.",
    },
    it: {
      name: "Merlino",
      version: "Intellettuale Visionario",
      text: "Trasformazione 5 INTELLIGENZA SUPERSVILUPPATA Quando giochi questo personaggio, se hai usato Trasformazione per giocarlo, puoi cercare una qualsiasi carta nel tuo mazzo, aggiungere quella carta alla tua mano e poi rimescolare il tuo mazzo.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 159,
  rarity: "legendary",
  cost: 6,
  strength: 3,
  willpower: 7,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_0a8dca5feb454968a2d13e5917127c45",
    tcgPlayer: 555272,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "OVERDEVELOPED BRAIN",
      description:
        "When you play this character, if you used Shift to play him, you may search your deck for any card, put that card into your hand, then shuffle your deck.",
    },
  ],
  classifications: ["Floodborn", "Mentor", "Sorcerer"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "1g2-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          expression: "you used Shift to play him",
          type: "if",
        },
        then: {
          putInto: "hand",
          shuffle: true,
          type: "search-deck",
        },
        type: "conditional",
      },
      id: "1g2-2",
      name: "OVERDEVELOPED BRAIN",
      text: "OVERDEVELOPED BRAIN When you play this character, if you used Shift to play him, you may search your deck for any card, put that card into your hand, then shuffle your deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
