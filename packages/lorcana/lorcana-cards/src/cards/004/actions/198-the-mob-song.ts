import type { ActionCard } from "@tcg/lorcana-types";

export const theMobSong: ActionCard = {
  id: "FC7",
  canonicalId: "ci_f4c",
  reprints: ["set4-198", "set9-202"],
  cardType: "action",
  name: "The Mob Song",
  i18n: {
    en: {
      name: "The Mob Song",
      text: [
        {
          title: "Sing Together 10",
          description:
            "(Any number of your or your teammates' characters with total cost 10 or more may {E} to sing this song for free.)",
        },
        {
          title: "Deal 3 damage to up to 3 chosen characters and/or locations.",
        },
      ],
    },
    de: {
      name: "Tod dem Biest",
      text: "Gemeinsam singen 10 (Du kannst beliebig viele deiner Charaktere oder Charaktere deiner Teammitglieder, die zusammen 10 oder mehr kosten,, damit sie dieses Lied kostenlos singen.) Wähle bis zu 3 Charaktere und/oder Orte und füge jedem davon 3 Schaden zu.",
    },
    fr: {
      name: "Tous avec moi !",
      text: [
        {
          title: "À",
          description:
            "l'unisson 10 (Vous pouvez n'importe quel nombre de vos personnages ou de personnages de vos coéquipiers coûtant au total 10 ou plus pour chanter cette chanson gratuitement.) Choisissez jusqu'à 3 personnages et/ou lieux et infligez-leur 3 dommages chacun.",
        },
      ],
    },
    it: {
      name: "Attacco al Castello",
      text: [
        {
          title: "Cantare Insieme 10",
          description:
            "(Un qualsiasi numero di personaggi tuoi o dei tuoi compagni di squadra con costo totale 10 o superiore può per cantare questa canzone gratis.) Infliggi 3 danni a fino a 3 personaggi e/o luoghi a tua scelta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Beauty and the Beast",
  set: "004",
  cardNumber: 198,
  rarity: "uncommon",
  cost: 10,
  inkable: false,
  externalIds: {
    lorcast: "crd_3145e83418b2482291dc9687d76a4057",
    tcgPlayer: 650134,
  },
  text: [
    {
      title: "Sing Together 10",
      description:
        "(Any number of your or your teammates' characters with total cost 10 or more may {E} to sing this song for free.)",
    },
    {
      title: "Deal 3 damage to up to 3 chosen characters and/or locations.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "deal-damage",
        amount: 3,
        target: {
          selector: "chosen",
          count: {
            upTo: 3,
          },
          owner: "any",
          zones: ["play"],
          cardTypes: ["character", "location"],
        },
      },
    },
  ],
};
