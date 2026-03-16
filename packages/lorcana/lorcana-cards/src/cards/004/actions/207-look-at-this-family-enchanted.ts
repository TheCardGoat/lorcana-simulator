import type { ActionCard } from "@tcg/lorcana-types";

export const lookAtThisFamilyEnchanted: ActionCard = {
  id: "M3W",
  canonicalId: "ci_ClP",
  reprints: ["set4-028", "set9-025"],
  cardType: "action",
  name: "Look at This Family",
  i18n: {
    en: {
      name: "Look at This Family",
      text: [
        {
          title: "Sing Together 7",
          description:
            "(Any number of your or your teammates' characters with total cost 7 or more may {E} to sing this song for free.)",
        },
        {
          title:
            "Look at the top 5 cards of your deck. You may reveal up to 2 character cards and put them into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Diese Familie",
      text: "Gemeinsam singen 7 (Du kannst beliebig viele deiner Charaktere oder Charaktere deiner Teammitglieder, die zusammen 7 oder mehr kosten,, damit sie dieses Lied kostenlos singen.) Schaue dir die obersten 5 Karten deines Decks an. Du darfst bis zu 2 Charakterkarten daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
    },
    fr: {
      name: "On est une Famille",
      text: [
        {
          title: "À",
          description:
            "l'unisson 7 (Vous pouvez n'importe quel nombre de vos personnages ou de personnages de vos coéquipiers coûtant au total 7 ou plus pour chanter cette chanson gratuitement.) Regardez les 5 premières cartes de votre pioche. Vous pouvez révéler jusqu'à 2 cartes Personnage parmi elles et les ajouter à votre main. Remettez le reste sous votre pioche, dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Questa Famiglia",
      text: [
        {
          title: "Cantare Insieme 7",
          description:
            "(Un qualsiasi numero di personaggi tuoi o dei tuoi compagni di squadra con costo totale 7 o superiore può per cantare questa canzone gratis.) Guarda le prime 5 carte del tuo mazzo. Puoi rivelare fino a 2 carte personaggio e aggiungerle alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Encanto",
  set: "004",
  cardNumber: 207,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 7,
  inkable: true,
  externalIds: {
    lorcast: "crd_c8a627814d404f46ad87c09ece866017",
    tcgPlayer: 649973,
  },
  text: [
    {
      title: "Sing Together 7",
      description:
        "(Any number of your or your teammates' characters with total cost 7 or more may {E} to sing this song for free.)",
    },
    {
      title:
        "Look at the top 5 cards of your deck. You may reveal up to 2 character cards and put them into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "scry",
        amount: 5,
        target: "CONTROLLER",
        destinations: [
          {
            zone: "hand",
            min: 0,
            max: 2,
            reveal: true,
            filter: {
              type: "card-type",
              cardType: "character",
            },
          },
          {
            zone: "deck-bottom",
            remainder: true,
            ordering: "player-choice",
          },
        ],
      },
    },
  ],
};
