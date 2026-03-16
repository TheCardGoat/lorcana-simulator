import type { ActionCard } from "@tcg/lorcana-types";

export const safeAndSound: ActionCard = {
  id: "JNT",
  canonicalId: "ci_JNT",
  reprints: ["set6-030"],
  cardType: "action",
  name: "Safe and Sound",
  i18n: {
    en: {
      name: "Safe and Sound",
      text: "Chosen character of yours can't be challenged until the start of your next turn.",
    },
    de: {
      name: "Gesund und munter",
      text: "Wähle einen deiner Charaktere. Jener kann bis zu Beginn deines nächsten Zuges nicht herausgefordert werden.",
    },
    fr: {
      name: "Sain et sauf",
      text: "Choisissez l'un de vos personnages qui ne pourra pas être défié jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Al Sicuro",
      text: "Un tuo personaggio a tua scelta non può essere sfidato fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Winnie the Pooh",
  set: "006",
  cardNumber: 30,
  rarity: "rare",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_cf72db3ded534d7086fb4ead70250f95",
    tcgPlayer: 593041,
  },
  text: "Chosen character of yours can't be challenged until the start of your next turn.",
  abilities: [
    {
      type: "action",
      text: "Chosen character of yours can't be challenged until the start of your next turn.",
      effect: {
        type: "restriction",
        restriction: "cant-be-challenged",
        duration: "until-start-of-next-turn",
        target: "CHOSEN_CHARACTER_OF_YOURS",
      },
    },
  ],
};
