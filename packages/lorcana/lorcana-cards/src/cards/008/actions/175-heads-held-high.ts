import type { ActionCard } from "@tcg/lorcana-types";

export const headsHeldHigh: ActionCard = {
  id: "41j",
  canonicalId: "ci_41j",
  reprints: ["set8-175"],
  cardType: "action",
  name: "Heads Held High",
  i18n: {
    en: {
      name: "Heads Held High",
      text: [
        {
          title: "Sing Together 6",
          description:
            "(Any number of your or your teammates' characters with total cost 6 or more may {E} to sing this song for free.)",
        },
        {
          title:
            "Remove up to 3 damage from any number of chosen characters. All opposing characters get -3 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Himmelwärts jauchzt das Herz",
      text: "Gemeinsam singen 6 (Du kannst beliebig viele deiner Charaktere oder Charaktere deiner Teammitglieder, die zusammen 6 oder mehr kosten,, damit sie dieses Lied kostenlos singen.) Entferne bis zu 3 Schaden von beliebig vielen Charakteren deiner Wahl. Gib allen gegnerischen Charakteren in diesem Zug -3.",
    },
    fr: {
      name: "Nous sommes là pour vous aider",
      text: [
        {
          title: "À",
          description:
            "l'unisson 6 (Vous pouvez n'importe quel nombre de vos personnages ou de personnages de vos coéquipiers coûtant au total 6 ou plus pour chanter cette chanson gratuitement.) Choisissez n'importe quel nombre de personnages et retirez jusqu'à 3 dommages de chacun. Tous les personnages adverses subissent -3 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Petto in Fuor",
      text: [
        {
          title: "Cantare Insieme 6",
          description:
            "(Un qualsiasi numero di personaggi tuoi o dei tuoi compagni di squadra con costo totale 6 o superiore può per cantare questa canzone gratis.) Rimuovi fino a 3 danni da un qualsiasi numero di personaggi a tua scelta. Tutti i personaggi avversari ricevono -3 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Rescuers",
  set: "008",
  cardNumber: 175,
  rarity: "rare",
  cost: 6,
  inkable: true,
  externalIds: {
    lorcast: "crd_9a3f7df243294b3f9247aec8128be37a",
    tcgPlayer: 631348,
  },
  text: [
    {
      title: "Sing Together 6",
      description:
        "(Any number of your or your teammates' characters with total cost 6 or more may {E} to sing this song for free.)",
    },
    {
      title:
        "Remove up to 3 damage from any number of chosen characters. All opposing characters get -3 {S} this turn.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      effect: {
        steps: [
          {
            amount: 3,
            target: {
              selector: "chosen",
              count: "all",
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "remove-damage",
            upTo: true,
          },
          {
            duration: "this-turn",
            modifier: -3,
            stat: "strength",
            target: "ALL_OPPOSING_CHARACTERS",
            type: "modify-stat",
          },
        ],
        type: "sequence",
      },
      id: "x39-1",
      text: "Sing Together 6 Remove up to 3 damage from any number of chosen characters. All opposing characters get -3 {S} this turn.",
      type: "action",
    },
  ],
};
