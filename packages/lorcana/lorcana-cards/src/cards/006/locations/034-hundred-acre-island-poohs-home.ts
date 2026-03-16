import type { LocationCard } from "@tcg/lorcana-types";

export const hundredAcreIslandPoohsHome: LocationCard = {
  id: "QM4",
  canonicalId: "ci_QM4",
  reprints: ["set6-034"],
  cardType: "location",
  name: "Hundred Acre Island",
  version: "Pooh's Home",
  i18n: {
    en: {
      name: "Hundred Acre Island",
      version: "Pooh's Home",
      text: [
        {
          title: "FRIENDS FOREVER",
          description:
            "During an opponent's turn, whenever a character is banished here, gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Hundertmorgeninsel",
      version: "Puuhs Zuhause",
      text: [
        {
          title: "FREUNDE FÜR IMMER",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort im Zug einer gegnerischen Person verbannt wird, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "Île des Rêves Bleus",
      version: "Maison de Winnie",
      text: [
        {
          title: "AMIS POUR LA VIE",
          description:
            "Pendant le tour de vos adversaires, chaque fois qu'un personnage sur ce lieu est banni, vous gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Isola dei Cento Acri",
      version: "Casa di Pooh",
      text: [
        {
          title: "AMICI PER SEMPRE",
          description:
            "Durante il turno di un avversario, ogni volta che un personaggio viene esiliato mentre si trova in questo luogo, ottieni 1 leggenda.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Winnie the Pooh",
  set: "006",
  cardNumber: 34,
  rarity: "common",
  cost: 1,
  willpower: 5,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_2fd6877d711c45f68ad61690d224306a",
    tcgPlayer: 591985,
  },
  text: [
    {
      title: "FRIENDS FOREVER",
      description: "During an opponent's turn, whenever a character is banished here, gain 1 lore.",
    },
  ],
  abilities: [
    {
      id: "5uo-1",
      name: "FRIENDS FOREVER",
      trigger: {
        event: "banish",
        on: "CHARACTERS_HERE",
        restrictions: [
          {
            type: "during-turn",
            whose: "opponent",
          },
        ],
        timing: "whenever",
      },
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      text: "FRIENDS FOREVER During an opponent's turn, whenever a character is banished here, gain 1 lore.",
      type: "triggered",
    },
  ],
};
