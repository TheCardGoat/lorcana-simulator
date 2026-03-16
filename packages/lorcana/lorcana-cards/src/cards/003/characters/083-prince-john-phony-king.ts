import type { CharacterCard } from "@tcg/lorcana-types";

export const princeJohnPhonyKing: CharacterCard = {
  id: "UGT",
  canonicalId: "ci_UGT",
  reprints: ["set3-083"],
  cardType: "character",
  name: "Prince John",
  version: "Phony King",
  i18n: {
    en: {
      name: "Prince John",
      version: "Phony King",
      text: [
        {
          title: "COLLECT TAXES",
          description:
            "Whenever this character quests, each opponent with more lore than you loses 2 lore.",
        },
      ],
    },
    de: {
      name: "Prinz John",
      version: "Königsclown",
      text: [
        {
          title: "STEUERN EINTREIBEN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, verlieren alle gegnerischen Mitspielenden, die mehr Legenden als du haben, je 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Prince Jean",
      version: "Roi de mauvais aloi",
      text: [
        {
          title: "COLLECTE DE TAXES",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, chaque adversaire ayant plus d'éclats de Lore que vous en perd 2.",
        },
      ],
    },
    it: {
      name: "Principe Giovanni",
      version: "Re Fasullo",
      text: [
        {
          title: "RISCUOTERE LE TASSE",
          description:
            "Ogni volta che questo personaggio va all'avventura, ogni avversario con più leggenda di te perde 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Robin Hood",
  set: "003",
  cardNumber: 83,
  rarity: "uncommon",
  cost: 5,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_1af5228c0d75411ebc9eccf5cae1c086",
    tcgPlayer: 539081,
  },
  text: [
    {
      title: "COLLECT TAXES",
      description:
        "Whenever this character quests, each opponent with more lore than you loses 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Prince"],
  missingTests: true,
  abilities: [
    {
      effect: {
        amount: 2,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      id: "m61-1",
      name: "COLLECT TAXES",
      text: "COLLECT TAXES Whenever this character quests, each opponent with more lore than you loses 2 lore.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
