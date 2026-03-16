import type { ActionCard } from "@tcg/lorcana-types";

export const treasuresUntold: ActionCard = {
  id: "WWB",
  canonicalId: "ci_WWB",
  reprints: ["set4-165"],
  cardType: "action",
  name: "Treasures Untold",
  i18n: {
    en: {
      name: "Treasures Untold",
      text: "Return up to 2 item cards from your discard into your hand.",
    },
    de: {
      name: "Schätze und Zeug",
      text: "Nimm bis zu 2 Gegenstandskarten aus deinem Ablagestapel zurück auf deine Hand.",
    },
    fr: {
      name: "Tous ces Secrets",
      text: "Reprenez en main jusqu'à 2 cartes Objet de votre défausse.",
    },
    it: {
      name: "Che Ricchezze",
      text: "(Un personaggio con costo 6 o superiore può per cantare questa canzone gratis.) Riprendi in mano fino a 2 carte oggetto dai tuoi scarti.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 165,
  rarity: "rare",
  cost: 6,
  inkable: true,
  externalIds: {
    lorcast: "crd_e0862c1712b84e8eafa76836362c9870",
    tcgPlayer: 547772,
  },
  text: "Return up to 2 item cards from your discard into your hand.",
  actionSubtype: "song",
  abilities: [
    {
      type: "action",
      effect: {
        type: "return-from-discard",
        cardType: "item",
        target: "CONTROLLER",
        count: 2,
        destination: "hand",
      },
    },
  ],
};
