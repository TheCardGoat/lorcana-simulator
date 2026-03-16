import type { CharacterCard } from "@tcg/lorcana-types";

export const heiheiNotsotrickyChicken: CharacterCard = {
  id: "jj9",
  canonicalId: "ci_jj9",
  reprints: ["set6-146"],
  cardType: "character",
  name: "Heihei",
  version: "Not-So-Tricky Chicken",
  i18n: {
    en: {
      name: "Heihei",
      version: "Not-So-Tricky Chicken",
      text: [
        {
          title: "EAT ANYTHING",
          description:
            "When you play this character, exert chosen opposing item. It can't ready at the start of its next turn.",
        },
        {
          title: "OUT TO LUNCH",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "HeiHei",
      version: "Weniger trickreiches Hühnchen",
      text: [
        {
          title: "ISST ALLES",
          description:
            "Wenn du diesen Charakter ausspielst, erschöpfe einen gegnerischen Gegenstand deiner Wahl. Er wird zu Beginn seines nächsten Zuges nicht bereit gemacht.",
        },
        {
          title: "ZUM ESSEN UNTERWEGS",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Heihei",
      version: "Poulet pas si malin",
      text: [
        {
          title: "MANGER N'IMPORTE QUOI",
          description:
            "Lorsque vous jouez ce personnage, choisissez un objet adverse et épuisez-le. Il ne se redresse pas au début de son prochain tour.",
        },
        {
          title: "PAUSE DÉJEUNER",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier des personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Heihei",
      version: "Pollo Non Particolarmente Furbo",
      text: [
        {
          title: "MANGIARE QUALSIASI COSA",
          description:
            "Quando giochi questo personaggio, impegna un oggetto avversario a tua scelta. Non si può preparare all'inizio del suo prossimo turno.",
        },
        {
          title: "FUORI A PRANZO",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "006",
  cardNumber: 146,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e4908765126742488bab30dd0beb2c12",
    tcgPlayer: 588363,
  },
  text: [
    {
      title: "EAT ANYTHING",
      description:
        "When you play this character, exert chosen opposing item. It can't ready at the start of its next turn.",
    },
    {
      title: "OUT TO LUNCH",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["item"],
            },
            type: "exert",
          },
          {
            duration: "next-turn",
            restriction: "cant-ready",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "1qk-1",
      name: "EAT ANYTHING",
      text: "EAT ANYTHING When you play this character, exert chosen opposing item. It can't ready at the start of its next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
    {
      condition: {
        type: "turn",
        whose: "your",
      },
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1qk-2",
      text: "OUT TO LUNCH During your turn, this character gains Evasive.",
      type: "static",
    },
  ],
};
