import type { CharacterCard } from "@tcg/lorcana-types";

export const yzmaExasperatedSchemer: CharacterCard = {
  id: "yjH",
  canonicalId: "ci_yjH",
  reprints: ["set7-101"],
  cardType: "character",
  name: "Yzma",
  version: "Exasperated Schemer",
  i18n: {
    en: {
      name: "Yzma",
      version: "Exasperated Schemer",
      text: [
        {
          title: "HOW SHALL I DO IT?",
          description:
            "When you play this character, you may draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Isma",
      version: "Verärgerte Intrigantin",
      text: [
        {
          title: "WIE SOLL ICH ES TUN?",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 Karte ziehen. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "Yzma",
      version: "Conspiratrice à cran",
      text: [
        {
          title: "OOOH, COMMENT PROCÉDER?",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez piocher une carte puis en défausser une.",
        },
      ],
    },
    it: {
      name: "Yzma",
      version: "Cospiratrice Esasperata",
      text: [
        {
          title: "COME POSSO FARE?",
          description:
            "Quando giochi questo personaggio, puoi pescare una carta, poi scegliere e scartare una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Emperors New Groove",
  set: "007",
  cardNumber: 101,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f373768f95114e078fb4d77cd3cdead2",
    tcgPlayer: 619459,
  },
  text: [
    {
      title: "HOW SHALL I DO IT?",
      description:
        "When you play this character, you may draw a card, then choose and discard a card.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          chosen: true,
          target: "CONTROLLER",
          type: "discard",
        },
        type: "optional",
      },
      id: "5wn-1",
      name: "HOW SHALL I DO IT?",
      text: "HOW SHALL I DO IT? When you play this character, you may draw a card, then choose and discard a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
