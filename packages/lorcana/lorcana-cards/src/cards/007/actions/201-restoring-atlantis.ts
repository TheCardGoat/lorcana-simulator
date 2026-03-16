import type { ActionCard } from "@tcg/lorcana-types";

export const restoringAtlantis: ActionCard = {
  id: "ADz",
  canonicalId: "ci_ndm",
  reprints: ["set7-201"],
  cardType: "action",
  name: "Restoring Atlantis",
  i18n: {
    en: {
      name: "Restoring Atlantis",
      text: "Your characters can't be challenged until the start of your next turn.",
    },
    de: {
      name: "Wiederherstellung von Atlantis",
      text: "Deine Charaktere können bis zu Beginn deines nächsten Zuges nicht herausgefordert werden.",
    },
    fr: {
      name: "Reconstruire l’Atlantide",
      text: "Vos personnages ne peuvent pas être défiés jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Ricostruire Atlantide",
      text: [
        {
          title: "I",
          description:
            "tuoi personaggi non possono essere sfidati fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Atlantis",
  set: "007",
  cardNumber: 201,
  rarity: "rare",
  cost: 5,
  inkable: false,
  externalIds: {
    lorcast: "crd_ad5f241dfb68479189af1ac3802327d7",
    tcgPlayer: 619750,
  },
  text: "Your characters can't be challenged until the start of your next turn.",
  abilities: [
    {
      effect: {
        duration: "until-start-of-next-turn",
        restriction: "cant-be-challenged",
        target: "CONTROLLER",
        type: "restriction",
      },
      id: "g4p-1",
      text: "Your characters can't be challenged until the start of your next turn.",
      type: "action",
    },
  ],
};
