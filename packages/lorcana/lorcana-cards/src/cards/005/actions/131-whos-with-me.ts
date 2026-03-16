import type { ActionCard } from "@tcg/lorcana-types";

export const whosWithMe: ActionCard = {
  id: "OM9",
  canonicalId: "ci_OM9",
  reprints: ["set5-131"],
  cardType: "action",
  name: "Who's With Me?",
  i18n: {
    en: {
      name: "Who's With Me?",
      text: [
        {
          title: "Your characters get +2 {S} this turn.",
        },
        {
          title:
            "Whenever one of your characters with Reckless challenges another character this turn, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Wer kommt mit mir?",
      text: "Deine Charaktere erhalten in diesem Zug +2. Jedes Mal, wenn einer deiner Charaktere mit Impulsiv in diesem Zug einen anderen Charakter herausfordert, sammelst du 2 Legenden.",
    },
    fr: {
      name: "Qui est avec moi ?",
      text: "Vos personnages gagnent +2 pour le reste de ce tour. Chaque fois qu'un personnage avec Combattant défie un personnage ce tour-ci, gagnez 2 éclats de Lore.",
    },
    it: {
      name: "Chi Viene con Me?",
      text: [
        {
          title: "I",
          description:
            "tuoi personaggi ricevono +2 per questo turno. Ogni volta che uno dei tuoi personaggi con Attaccabrighe sfida un altro personaggio per questo turno, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "005",
  cardNumber: 131,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_534a9b86f32b472ab15ec30d254d76e3",
    tcgPlayer: 560637,
  },
  text: [
    {
      title: "Your characters get +2 {S} this turn.",
    },
    {
      title:
        "Whenever one of your characters with Reckless challenges another character this turn, gain 2 lore.",
    },
  ],
  abilities: [
    {
      id: "4hv-1",
      type: "action",
      text: "Your characters get +2 {S} this turn. Whenever one of your characters with Reckless challenges another character this turn, gain 2 lore.",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "modify-stat",
            duration: "this-turn",
            modifier: 2,
            stat: "strength",
            target: "YOUR_CHARACTERS",
          },
          {
            type: "create-triggered-ability",
            lifecycle: {
              kind: "floating",
              duration: "this-turn",
            },
            ability: {
              trigger: {
                event: "challenge",
                on: "YOUR_CHARACTERS",
                timing: "whenever",
                attacker: {
                  filters: [
                    {
                      type: "has-keyword",
                      keyword: "Reckless",
                    },
                  ],
                },
                defender: {},
              },
              effect: {
                type: "gain-lore",
                amount: 2,
                target: "CONTROLLER",
              },
            },
          },
        ],
      },
    },
  ],
};
