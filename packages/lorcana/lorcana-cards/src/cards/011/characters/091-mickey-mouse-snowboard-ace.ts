import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseSnowboardAce: CharacterCard = {
  id: "FDn",
  canonicalId: "ci_FDn",
  reprints: ["set11-091"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Snowboard Ace",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Snowboard Ace",
      text: [
        {
          title: "SLIPPERY SLOPE",
          description:
            "When you play this character and when he leaves play, each opponent chooses and discards a card.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Snowboard-Ass",
      text: [
        {
          title: "RUTSCHIGE PISTE",
          description:
            "Wenn du diesen Charakter ausspielst und wenn er das Spiel verlässt, wählen alle gegnerischen Mitspielenden je 1 Karte aus ihrer Hand und werfen sie ab.",
        },
      ],
    },
    fr: {
      name: "Mickey Mouse",
      version: "As du snowboard",
      text: [
        {
          title: "PENTE GLISSANTE",
          description:
            "Lorsque vous jouez ce personnage et quand il quitte la zone de jeu, chaque adversaire défausse une carte.",
        },
      ],
    },
    it: {
      name: "Topolino",
      version: "Asso dello Snowboard",
      text: [
        {
          title: "PISTA SCIVOLOSA",
          description:
            "Quando giochi questo personaggio e quando lascia il gioco, ogni avversario sceglie e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "011",
  cardNumber: 91,
  rarity: "uncommon",
  cost: 6,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_23f005944c784e158b9709de1c587d1e",
    tcgPlayer: 673081,
  },
  text: [
    {
      title: "SLIPPERY SLOPE",
      description:
        "When you play this character and when he leaves play, each opponent chooses and discards a card.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  abilities: [
    {
      id: "720-1",
      effect: {
        amount: 1,
        chosen: true,
        target: "EACH_OPPONENT",
        type: "discard",
      },
      name: "SLIPPERY SLOPE When you play this character and",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "SLIPPERY SLOPE When you play this character and when he leaves play, each opponent chooses and discards a card.",
    },
  ],
};
