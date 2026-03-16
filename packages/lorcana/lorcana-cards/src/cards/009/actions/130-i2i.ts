import type { ActionCard } from "@tcg/lorcana-types";

export const i2i: ActionCard = {
  id: "9NO",
  canonicalId: "ci_buH",
  reprints: ["set9-130"],
  cardType: "action",
  name: "I2I",
  i18n: {
    en: {
      name: "I2I",
      text: [
        {
          title: "Sing Together 9",
          description:
            "(Any number of your or your teammates' characters with total cost 9 or more may {E} to sing this song for free.)",
        },
        {
          title:
            "Each player draws 2 cards and gains 2 lore. If 2 or more characters sang this song, ready them. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "I2I",
      text: "Gemeinsam singen 9 (Du kannst beliebig viele deiner Charaktere oder Charaktere deiner Teammitglieder, die zusammen 9 oder mehr kosten,, damit sie dieses Lied kostenlos singen.) Alle Mitspielenden (auch du) ziehen je 2 Karten und sammeln 2 Legenden. Wenn 2 oder mehr deiner Charaktere dieses Lied gemeinsam gesungen haben, mache sie bereit. Sie können in diesem Zug nicht mehr erkunden.",
    },
    fr: {
      name: "I2I",
      text: [
        {
          title: "À",
          description:
            "l'unisson 9 Chaque joueur pioche 2 cartes et gagne 2 éclats de Lore. Si 2 personnages ou plus ont chanté cette chanson, redressez-les. Ces personnages ne peuvent pas être envoyés à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "I2I",
      text: [
        {
          title: "Cantare Insieme 9",
          description:
            "(Un qualsiasi numero di personaggi tuoi o dei tuoi compagni di squadra con costo totale 9 o superiore può per cantare questa canzone gratis.) Ogni giocatore pesca 2 carte e ottiene 2 leggenda. Se 2 o più personaggi hanno cantato questa canzone, preparali. Non possono andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Goofy Movie",
  set: "009",
  cardNumber: 130,
  rarity: "rare",
  cost: 9,
  inkable: true,
  externalIds: {
    lorcast: "crd_d2d94d7cffe349d9a618f8bdb6695f29",
    tcgPlayer: 651116,
  },
  text: [
    {
      title: "Sing Together 9",
      description:
        "(Any number of your or your teammates' characters with total cost 9 or more may {E} to sing this song for free.)",
    },
    {
      title:
        "Each player draws 2 cards and gains 2 lore. If 2 or more characters sang this song, ready them. They can't quest for the rest of this turn.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "draw",
            amount: 2,
            target: "EACH_PLAYER",
          },
          {
            type: "gain-lore",
            amount: 2,
            target: "EACH_PLAYER",
          },
          {
            type: "conditional",
            condition: {
              type: "play-context",
              context: "characters-sang-this-song",
              comparison: {
                operator: "gte",
                value: 2,
              },
            },
            then: {
              type: "sequence",
              steps: [
                {
                  type: "ready",
                  target: {
                    selector: "all",
                    count: "all",
                    reference: "singers",
                  },
                },
                {
                  type: "restriction",
                  restriction: "cant-quest",
                  duration: "this-turn",
                  target: {
                    selector: "all",
                    count: "all",
                    reference: "singers",
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
