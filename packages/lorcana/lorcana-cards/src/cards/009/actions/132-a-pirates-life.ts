import type { ActionCard } from "@tcg/lorcana-types";

export const aPiratesLife: ActionCard = {
  id: "rJQ",
  canonicalId: "ci_rfx",
  reprints: ["set4-128", "set9-132"],
  cardType: "action",
  name: "A Pirate’s Life",
  i18n: {
    en: {
      name: "A Pirate’s Life",
      text: [
        {
          title: "Sing Together 6",
          description:
            "(Any number of your or your teammates' characters with total cost 6 or more may to sing this song for free.) Each opponent loses 2 lore. You gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Seeräuberleben",
      text: "Gemeinsam singen 6 (Du kannst beliebig viele deiner Charaktere oder Charaktere deiner Teammitglieder, die zusammen 6 oder mehr kosten,, damit sie dieses Lied kostenlos singen.) Alle gegnerischen Mitspielenden verlieren je 2 Legenden. Du sammelst 2 Legenden.",
    },
    fr: {
      name: "La vie d'un pirate",
      text: [
        {
          title: "À",
          description:
            "l'unisson 6 (Vous pouvez n'importe quel nombre de vos personnages ou de personnages de vos coéquipiers coûtant au total 6 ou plus pour chanter cette chanson gratuitement.) Chaque adversaire perd 2 éclats de Lore et vous gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "La Vita del Bucanier",
      text: [
        {
          title: "Cantare Insieme 6",
          description:
            "(Un qualsiasi numero di personaggi tuoi o dei tuoi compagni di squadra con costo totale 6 o superiore può per cantare questa canzone gratis.) Ogni avversario perde 2 leggenda. Tu ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "009",
  cardNumber: 132,
  rarity: "uncommon",
  cost: 6,
  inkable: true,
  externalIds: {
    lorcast: "crd_480463cc9e3f4f7b9cb1c96a83d69544",
    tcgPlayer: 650067,
  },
  text: [
    {
      title: "Sing Together 6",
      description:
        "(Any number of your or your teammates' characters with total cost 6 or more may to sing this song for free.) Each opponent loses 2 lore. You gain 2 lore.",
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
            type: "lose-lore",
            amount: 2,
            target: "EACH_OPPONENT",
          },
          {
            type: "gain-lore",
            amount: 2,
            target: "CONTROLLER",
          },
        ],
      },
    },
  ],
};
