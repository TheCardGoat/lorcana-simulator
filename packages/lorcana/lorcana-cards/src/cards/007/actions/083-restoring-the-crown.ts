import type { ActionCard } from "@tcg/lorcana-types";

export const restoringTheCrown: ActionCard = {
  id: "X4B",
  canonicalId: "ci_X4B",
  reprints: ["set7-083"],
  cardType: "action",
  name: "Restoring the Crown",
  i18n: {
    en: {
      name: "Restoring the Crown",
      text: "Exert all opposing characters. Whenever one of your characters banishes another character in a challenge this turn, gain 2 lore.",
    },
    de: {
      name: "Die Krone wiederherstellen",
      text: "Erschöpfe alle gegnerischen Charaktere. Jedes Mal, wenn einer deiner Charaktere in diesem Zug durch eine Herausforderung einen anderen Charakter verbannt, sammelst du 2 Legenden.",
    },
    fr: {
      name: "Restaurer la Couronne",
      text: "Épuisez tous les personnages adverses. Chaque fois que l'un de vos personnages en bannit un autre via un défi ce tour-ci, gagnez 2 éclats de Lore.",
    },
    it: {
      name: "Ripristinare la Corona",
      text: "Impegna tutti i personaggi avversari. Ogni volta che uno dei tuoi personaggi esilia un altro personaggio in una sfida per questo turno, ottieni 2 leggenda.",
    },
  },
  inkType: ["amethyst", "steel"],
  franchise: "Aladdin",
  set: "007",
  cardNumber: 83,
  rarity: "rare",
  cost: 6,
  inkable: false,
  externalIds: {
    lorcast: "crd_73e72e4fa154400f892e295a0eaffb40",
    tcgPlayer: 619450,
  },
  text: "Exert all opposing characters. Whenever one of your characters banishes another character in a challenge this turn, gain 2 lore.",
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "all",
              count: "all",
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "exert",
          },
          {
            type: "create-triggered-ability",
            lifecycle: {
              kind: "floating",
              duration: "this-turn",
            },
            ability: {
              trigger: {
                event: "banish-in-challenge",
                on: "YOUR_CHARACTERS",
                timing: "whenever",
              },
              effect: {
                amount: 2,
                target: "CONTROLLER",
                type: "gain-lore",
              },
            },
          },
        ],
        type: "sequence",
      },
      id: "1ss-1",
      text: "Exert all opposing characters. Whenever one of your characters banishes another character in a challenge this turn, gain 2 lore.",
      type: "action",
    },
  ],
};
