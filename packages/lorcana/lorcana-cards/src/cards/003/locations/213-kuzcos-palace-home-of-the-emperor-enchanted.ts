import type { LocationCard } from "@tcg/lorcana-types";

export const kuzcosPalaceHomeOfTheEmperorEnchanted: LocationCard = {
  id: "YPI",
  canonicalId: "ci_vRE",
  reprints: ["set3-102"],
  cardType: "location",
  name: "Kuzco's Palace",
  version: "Home of the Emperor",
  i18n: {
    en: {
      name: "Kuzco's Palace",
      version: "Home of the Emperor",
      text: [
        {
          title: "CITY WALLS",
          description:
            "Whenever a character is challenged and banished while here, banish the challenging character.",
        },
      ],
    },
    de: {
      name: "Kuscos Palast",
      version: "Heimat des Königs",
      text: [
        {
          title: "STADTMAUERN",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort herausgefordert und verbannt wird, verbanne den herausfordernden Charakter.",
        },
      ],
    },
    fr: {
      name: "Palais de Kuzco",
      version: "Résidence de l'empereur",
      text: [
        {
          title: "MURS DE LA CITÉ",
          description:
            "Chaque fois qu'un personnage sur ce lieu est défié et banni, bannissez le personnage qui l'a défié.",
        },
      ],
    },
    it: {
      name: "Il Palazzo di Kuzco",
      version: "Casa dell'Imperatore",
      text: [
        {
          title: "MURA CITTADINE",
          description:
            "Ogni volta che un personaggio viene sfidato ed esiliato mentre si trova in questo luogo, esilia il personaggio che lo ha sfidato.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Emperors New Groove",
  set: "003",
  cardNumber: 213,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 3,
  willpower: 7,
  moveCost: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a1af7dad15b64d31a696f7bbb49bfe92",
    tcgPlayer: 539165,
  },
  text: [
    {
      title: "CITY WALLS",
      description:
        "Whenever a character is challenged and banished while here, banish the challenging character.",
    },
  ],
  abilities: [
    {
      trigger: {
        event: "challenged-and-banished",
        on: "CHARACTERS_HERE",
        timing: "when",
      },
      effect: {
        target: {
          ref: "attacker",
        },
        type: "banish",
      },
      id: "aae-1",
      name: "CITY WALLS",
      text: "CITY WALLS Whenever a character is challenged and banished while here, banish the challenging character.",
      type: "triggered",
    },
  ],
};
