import type { CharacterCard } from "@tcg/lorcana-types";

export const goGoTomagoCuttingEdge: CharacterCard = {
  id: "Di2",
  canonicalId: "ci_Di2",
  reprints: ["set8-107"],
  cardType: "character",
  name: "Go Go Tomago",
  version: "Cutting Edge",
  i18n: {
    en: {
      name: "Go Go Tomago",
      version: "Cutting Edge",
      text: [
        {
          title: "Shift 4",
        },
        {
          title: "Evasive",
        },
        {
          title: "ZERO RESISTANCE",
          description:
            "When you play this character, if you used Shift to play her, you may put chosen character into their player's inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Go Go Tomago",
      version: "Messerscharf",
      text: "Gestaltwandel 4 Wendig NULL WIDERSTAND Wenn du diesen Charakter mithilfe von Gestaltwandel ausspielst, darfst du einen Charakter deiner Wahl verdeckt und erschöpft in den zugehörigen Tintenvorrat legen.",
    },
    fr: {
      name: "Go Go Tomago",
      version: "À la pointe",
      text: "Alter 4 Insaisissable ZÉRO RÉSISTANCE Si vous jouez ce personnage en utilisant sa capacité Alter, vous pouvez choisir un personnage et le placer dans la réserve d'encre de son propriétaire, face cachée et épuisé.",
    },
    it: {
      name: "Go Go Tomago",
      version: "All'Avanguardia",
      text: "Trasformazione 4 Sfuggente ZERO RESISTENZA Quando giochi questo personaggio, se hai usato Trasformazione per giocarlo, puoi aggiungere un personaggio a tua scelta al calamaio del suo giocatore, a faccia in giù e impegnato.",
    },
  },
  inkType: ["emerald", "sapphire"],
  franchise: "Big Hero 6",
  set: "008",
  cardNumber: 107,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_85baf02feabb47349db98e61d2437f71",
    tcgPlayer: 631687,
  },
  text: [
    {
      title: "Shift 4",
    },
    {
      title: "Evasive",
    },
    {
      title: "ZERO RESISTANCE",
      description:
        "When you play this character, if you used Shift to play her, you may put chosen character into their player's inkwell facedown and exerted.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Inventor"],
  abilities: [
    {
      cost: {
        ink: 4,
      },
      id: "1l3-1",
      keyword: "Shift",
      text: "Shift 4",
      type: "keyword",
    },
    {
      id: "1l3-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          expression: "you used Shift to play her",
          type: "if",
        },
        then: {
          exerted: true,
          facedown: true,
          source: "chosen-character",
          target: "OPPONENT",
          type: "put-into-inkwell",
        },
        type: "conditional",
      },
      id: "1l3-3",
      name: "ZERO RESISTANCE",
      text: "ZERO RESISTANCE When you play this character, if you used Shift to play her, you may put chosen character into their player's inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
