import type { ActionCard } from "@tcg/lorcana-types";

export const secondStarToTheRight: ActionCard = {
  id: "jXk",
  canonicalId: "ci_oGQ",
  reprints: ["set4-061", "set9-060"],
  cardType: "action",
  name: "Second Star to the Right",
  i18n: {
    en: {
      name: "Second Star to the Right",
      text: [
        {
          title: "Sing Together 10",
          description:
            "(Any number of your or your teammates' characters with total cost 10 or more may {E} to sing this song for free.)",
        },
        {
          title: "Chosen player draws 5 cards.",
        },
      ],
    },
    de: {
      name: "Der Kleine Stern Naseweis",
      text: "Gemeinsam singen 10 (Du kannst beliebig viele deiner Charaktere oder Charaktere deiner Teammitglieder, die zusammen 10 oder mehr kosten,, damit sie dieses Lied kostenlos singen.) Eine Person deiner Wahl zieht 5 Karten.",
    },
    fr: {
      name: "La Deuxième Étoile sur la Droite",
      text: [
        {
          title: "À",
          description:
            "l'unisson 10 (Vous pouvez n'importe quel nombre de vos personnages ou de personnages de vos coéquipiers coûtant au total 10 ou plus pour chanter cette chanson gratuitement.) Choisissez un joueur qui pioche 5 cartes.",
        },
      ],
    },
    it: {
      name: "Ci Son Due Stelle nel Ciel",
      text: [
        {
          title: "Cantare Insieme 10",
          description:
            "(Un qualsiasi numero di personaggi tuoi o dei tuoi compagni di squadra con costo totale 10 o superiore può per cantare questa canzone gratis.) Un giocatore a tua scelta pesca 5 carte.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "009",
  cardNumber: 60,
  rarity: "rare",
  cost: 10,
  inkable: false,
  externalIds: {
    lorcast: "crd_07d43fd911d2476caa9c4aa982d29405",
    tcgPlayer: 650004,
  },
  text: [
    {
      title: "Sing Together 10",
      description:
        "(Any number of your or your teammates' characters with total cost 10 or more may {E} to sing this song for free.)",
    },
    {
      title: "Chosen player draws 5 cards.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "draw",
        amount: 5,
        target: "CHOSEN_PLAYER",
      },
    },
  ],
};
