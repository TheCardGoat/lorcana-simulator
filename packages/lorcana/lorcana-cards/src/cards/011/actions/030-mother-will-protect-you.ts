import type { ActionCard } from "@tcg/lorcana-types";

export const motherWillProtectYou: ActionCard = {
  id: "30F",
  canonicalId: "ci_30F",
  reprints: ["set11-030"],
  cardType: "action",
  name: "Mother Will Protect You",
  i18n: {
    en: {
      name: "Mother Will Protect You",
      text: "Chosen character can't be challenged until the start of your next turn.",
    },
    de: {
      name: "Mutter wird dich beschützen",
      text: "Ein Charakter deiner Wahl kann bis zu Beginn deines nächsten Zuges nicht herausgefordert werden.",
    },
    fr: {
      name: "Maman te protégera",
      text: "Choisissez un personnage qui ne peut pas être défié jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Sai che ti proteggo",
      text: "(Un personaggio con costo 2 o superiore può per cantare questa canzone gratis.) Un personaggio a tua scelta non può essere sfidato fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "011",
  cardNumber: 30,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_026951e834c74886a9c05341b713b3fa",
    tcgPlayer: 677133,
  },
  text: "Chosen character can't be challenged until the start of your next turn.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      text: "Chosen character can't be challenged until the start of your next turn.",
      effect: {
        type: "restriction",
        restriction: "cant-be-challenged",
        target: "CHOSEN_CHARACTER",
        duration: "until-start-of-next-turn",
      },
    },
  ],
};
