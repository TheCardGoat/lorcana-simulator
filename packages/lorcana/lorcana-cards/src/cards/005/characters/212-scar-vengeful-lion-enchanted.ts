import type { CharacterCard } from "@tcg/lorcana-types";

export const scarVengefulLionEnchanted: CharacterCard = {
  id: "gpM",
  canonicalId: "ci_f3P",
  reprints: ["set5-093"],
  cardType: "character",
  name: "Scar",
  version: "Vengeful Lion",
  i18n: {
    en: {
      name: "Scar",
      version: "Vengeful Lion",
      text: [
        {
          title: "Ward",
        },
        {
          title: "LIFE'S NOT FAIR, IS IT?",
          description:
            "Whenever one of your characters challenges a damaged character, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Scar",
      version: "Rachsüchtiger Löwe",
      text: "Behütet DIE WELT IST SO UNGERECHT, NICHT WAHR? Jedes Mal, wenn einer deiner Charaktere einen beschädigten Charakter herausfordert, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "Scar",
      version: "Lion revanchard",
      text: "Hors d'atteinte LA VIE N'EST PAS JUSTE, TU VOIS? Chaque fois que l'un de vos personnages défie un personnage ayant au moins un dommage sur lui, vous pouvez piocher une carte.",
    },
    it: {
      name: "Scar",
      version: "Leone Vendicativo",
      text: "Protetto LA VITA A VOLTE È INGIUSTA, NON È VERO? Ogni volta che uno dei tuoi personaggi sfida un personaggio danneggiato, puoi pescare una carta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 212,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 4,
  strength: 4,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e382f2cee40343d7ae3faed897045a66",
    tcgPlayer: 561980,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "LIFE'S NOT FAIR, IS IT?",
      description:
        "Whenever one of your characters challenges a damaged character, you may draw a card.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "15b-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "15b-2",
      text: "LIFE'S NOT FAIR, IS IT? Whenever one of your characters challenges a damaged character, you may draw a card.",
      type: "action",
    },
  ],
};
