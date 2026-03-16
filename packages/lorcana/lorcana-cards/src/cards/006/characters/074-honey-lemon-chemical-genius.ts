import type { CharacterCard } from "@tcg/lorcana-types";

export const honeyLemonChemicalGenius: CharacterCard = {
  id: "OgN",
  canonicalId: "ci_OgN",
  reprints: ["set6-074"],
  cardType: "character",
  name: "Honey Lemon",
  version: "Chemical Genius",
  i18n: {
    en: {
      name: "Honey Lemon",
      version: "Chemical Genius",
      text: [
        {
          title: "HERE'S THE BEST PART",
          description:
            "When you play this character, you may pay 2 {I} to have each opponent choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Honey Lemon",
      version: "Chemie-Genie",
      text: [
        {
          title: "JETZT KOMMT DAS BESTE",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 2 bezahlen, um alle gegnerischen Mitspielenden eine Karte aus ihrer Hand auswählen und abwerfen zu lassen.",
        },
      ],
    },
    fr: {
      name: "Honey Lemon",
      version: "Génie de la chimie",
      text: [
        {
          title: "ET T'AS ENCORE RIEN VU",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez payer 2. Si vous le faites, chacun de vos adversaires se défausse d'une carte de son choix.",
        },
      ],
    },
    it: {
      name: "Honey Lemon",
      version: "Genio della Chimica",
      text: [
        {
          title: "ORA ARRIVA IL MEGLIO",
          description:
            "Quando giochi questo personaggio, puoi pagare 2 per far scegliere e scartare una carta a ogni avversario.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 74,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 1,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f20b9f97af684d8e84eb6b017eabd8d5",
    tcgPlayer: 578178,
  },
  text: [
    {
      title: "HERE'S THE BEST PART",
      description:
        "When you play this character, you may pay 2 {I} to have each opponent choose and discard a card.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Inventor"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          chosen: true,
          target: "EACH_OPPONENT",
          type: "discard",
        },
        type: "optional",
      },
      id: "q86-1",
      name: "HERE'S THE BEST PART",
      text: "HERE'S THE BEST PART When you play this character, you may pay 2 {I} to have each opponent choose and discard a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
