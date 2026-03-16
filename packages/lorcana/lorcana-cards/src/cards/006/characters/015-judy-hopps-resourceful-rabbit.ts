import type { CharacterCard } from "@tcg/lorcana-types";

export const judyHoppsResourcefulRabbit: CharacterCard = {
  id: "Z78",
  canonicalId: "ci_Z78",
  reprints: ["set6-015"],
  cardType: "character",
  name: "Judy Hopps",
  version: "Resourceful Rabbit",
  i18n: {
    en: {
      name: "Judy Hopps",
      version: "Resourceful Rabbit",
      text: [
        {
          title: "Support",
        },
        {
          title: "NEED SOME HELP?",
          description: "At the end of your turn, you may ready another chosen character of yours.",
        },
      ],
    },
    de: {
      name: "Judy Hopps",
      version: "Einfallsreiche Häsin",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) BRAUCHST DU HILFE? Am Ende deines Zuges darfst du einen deiner anderen Charaktere wählen und bereit machen.",
    },
    fr: {
      name: "Judy Hopps",
      version: "Lapine pleine de ressources",
      text: "Soutien UN P'TIT COUP DE PATTE? À la fin de votre tour, vous pouvez choisir et redresser un autre de vos personnages.",
    },
    it: {
      name: "Judy Hopps",
      version: "Coniglietta Intraprendente",
      text: "Aiutante UN AIUTINO? Alla fine del tuo turno, puoi preparare un tuo altro personaggio a tua scelta.",
    },
  },
  inkType: ["amber"],
  franchise: "Zootropolis",
  set: "006",
  cardNumber: 15,
  rarity: "rare",
  cost: 6,
  strength: 3,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_17a352bad7df43d2bfd36a9c2c475c6c",
    tcgPlayer: 579923,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "NEED SOME HELP?",
      description: "At the end of your turn, you may ready another chosen character of yours.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1r5-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "ready",
        },
        type: "optional",
      },
      id: "1r5-2",
      text: "NEED SOME HELP? At the end of your turn, you may ready another chosen character of yours.",
      trigger: {
        event: "end-turn",
        on: "YOU",
        timing: "at",
      },
      type: "triggered",
    },
  ],
};
