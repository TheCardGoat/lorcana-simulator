import type { CharacterCard } from "@tcg/lorcana-types";

export const kingCandyRoyalRacer: CharacterCard = {
  id: "oc8",
  canonicalId: "ci_oc8",
  reprints: ["set7-020"],
  cardType: "character",
  name: "King Candy",
  version: "Royal Racer",
  i18n: {
    en: {
      name: "King Candy",
      version: "Royal Racer",
      text: [
        {
          title: "SWEET REVENGE",
          description:
            "Whenever one of your other Racer characters is banished, each opponent chooses and banishes one of their characters.",
        },
      ],
    },
    de: {
      name: "King Candy",
      version: "Königlicher Rennfahrer",
      text: [
        {
          title: "SÜSSE RACHE",
          description:
            "Jedes Mal, wenn einer deiner anderen Rennfahrer verbannt wird, wählen alle gegnerischen Mitspielenden je einen ihrer Charaktere und verbannen ihn.",
        },
      ],
    },
    fr: {
      name: "Sa Sucrerie",
      version: "Pilote royal",
      text: [
        {
          title: "DOUCE REVANCHE",
          description:
            "Chaque fois que l'un de vos autres personnages Pilote est banni, chaque adversaire choisit l'un de ses personnages et le bannit.",
        },
      ],
    },
    it: {
      name: "Re Candito",
      version: "Pilota Reale",
      text: [
        {
          title: "DOLCE VENDETTA",
          description:
            "Ogni volta che uno dei tuoi altri personaggi Pilota viene esiliato, ogni avversario sceglie ed esilia uno dei suoi personaggi.",
        },
      ],
    },
  },
  inkType: ["amber", "ruby"],
  franchise: "Wreck It Ralph",
  set: "007",
  cardNumber: 20,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_68c5e563c4774f3f94a16eed86475c95",
    tcgPlayer: 618737,
  },
  text: [
    {
      title: "SWEET REVENGE",
      description:
        "Whenever one of your other Racer characters is banished, each opponent chooses and banishes one of their characters.",
    },
  ],
  classifications: ["Storyborn", "Villain", "King", "Racer"],
  abilities: [],
};
