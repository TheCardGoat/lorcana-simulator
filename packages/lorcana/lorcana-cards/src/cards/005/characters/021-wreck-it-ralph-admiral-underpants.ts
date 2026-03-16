import type { CharacterCard } from "@tcg/lorcana-types";

export const wreckitRalphAdmiralUnderpants: CharacterCard = {
  id: "rui",
  canonicalId: "ci_rui",
  reprints: ["set5-021"],
  cardType: "character",
  name: "Wreck-It Ralph",
  version: "Admiral Underpants",
  i18n: {
    en: {
      name: "Wreck-It Ralph",
      version: "Admiral Underpants",
      text: [
        {
          title: "I'VE GOT THE COOLEST FRIEND",
          description:
            "When you play this character, return a character card from your discard to your hand. If that card is a Princess character card, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Randale Ralph",
      version: "Admiral Unterbuxe",
      text: [
        {
          title: "ICH HABE DIE COOLSTE FREUNDIN",
          description:
            "Wenn du diesen Charakter ausspielst, nimm 1 Charakterkarte aus deinem Ablagestapel zurück auf deine Hand. Falls jene Karte eine Prinzessin-Charakterkarte ist, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Ralph la Casse",
      version: "Amiral Couche-culotte",
      text: [
        {
          title: "LA MEILLEURE AMIE DU MONDE",
          description:
            "Lorsque vous jouez ce personnage, renvoyez une carte Personnage de votre défausse dans votre main. S'il s'agit d'un personnage Princesse, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Ralph Spaccatutto",
      version: "Ammiraglio Mutandoni",
      text: [
        {
          title: "HO L'AMICA PIÙ STRAORDINARIA",
          description:
            "Quando giochi questo personaggio, riprendi in mano una carta personaggio dai tuoi scarti. Se quella carta è una carta personaggio Principessa, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 21,
  rarity: "rare",
  cost: 7,
  strength: 6,
  willpower: 7,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_4bb6eeb124574cc6ac3695e255598cfb",
    tcgPlayer: 559783,
  },
  text: [
    {
      title: "I'VE GOT THE COOLEST FRIEND",
      description:
        "When you play this character, return a character card from your discard to your hand. If that card is a Princess character card, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "that card is a Princess character card",
          type: "if",
        },
        then: {
          amount: 2,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "147-1",
      name: "I'VE GOT THE COOLEST FRIEND",
      text: "I'VE GOT THE COOLEST FRIEND When you play this character, return a character card from your discard to your hand. If that card is a Princess character card, gain 2 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
