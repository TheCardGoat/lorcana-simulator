import type { ActionCard } from "@tcg/lorcana-types";

export const stoppedChaosInItsTracks: ActionCard = {
  id: "1ft",
  canonicalId: "ci_1ft",
  reprints: ["set8-115"],
  cardType: "action",
  name: "Stopped Chaos in Its Tracks",
  i18n: {
    en: {
      name: "Stopped Chaos in Its Tracks",
      text: [
        {
          title: "Sing Together 8",
          description:
            "(Any number of your or your teammates' characters with total cost 8 or more may {E} to sing this song for free.)",
        },
        {
          title: "Return up to 2 chosen characters with 3 {S} or less each to their player's hand.",
        },
      ],
    },
    de: {
      name: "Alles Böse biss dabei ins Gras",
      text: "Gemeinsam singen 8 (Du kannst beliebig viele deiner Charaktere oder Charaktere deiner Teammitglieder, die zusammen 8 oder mehr kosten,, damit sie dieses Lied kostenlos singen.) Schicke bis zu 2 Charaktere deiner Wahl mit je 3 oder weniger auf die zugehörige Hand zurück.",
    },
    fr: {
      name: "Foudroyant d'un éclair ces brutes",
      text: [
        {
          title: "À",
          description:
            "l'unisson 8 (Vous pouvez n'importe quel nombre de vos personnages ou de personnages de vos coéquipiers coûtant au total 8 ou plus pour chanter cette chanson gratuitement.) Choisissez jusqu'à 2 personnages avec 3 ou moins et renvoyez-les dans la main de leur propriétaire.",
        },
      ],
    },
    it: {
      name: "Tutto Tornò Tranquillo Come Mai",
      text: [
        {
          title: "Cantare Insieme 8",
          description:
            "(Un qualsiasi numero di personaggi tuoi o dei tuoi compagni di squadra con costo totale 8 o superiore può per cantare questa canzone gratis.) Fai riprendere in mano al suo giocatore fino a 2 personaggi a tua scelta con 3 o inferiore ciascuno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "008",
  cardNumber: 115,
  rarity: "uncommon",
  cost: 8,
  inkable: true,
  externalIds: {
    lorcast: "crd_655c8f27d9fa48ce9e7ff33c0bf4f6c8",
    tcgPlayer: 631424,
  },
  text: [
    {
      title: "Sing Together 8",
      description:
        "(Any number of your or your teammates' characters with total cost 8 or more may {E} to sing this song for free.)",
    },
    {
      title: "Return up to 2 chosen characters with 3 {S} or less each to their player's hand.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: {
            upTo: 2,
          },
          owner: "any",
          selector: "chosen",
          zones: ["play"],
          filter: [
            {
              type: "strength-comparison",
              comparison: "less-or-equal",
              value: 3,
            },
          ],
        },
        type: "return-to-hand",
      },
      id: "pmx-1",
      text: "Sing Together 8 Return up to 2 chosen characters with 3 {S} or less each to their player's hand.",
      type: "action",
    },
  ],
};
