import type { ActionCard } from "@tcg/lorcana-types";

export const shesYourPerson: ActionCard = {
  id: "znP",
  canonicalId: "ci_znP",
  reprints: ["set8-040"],
  cardType: "action",
  name: "She's Your Person",
  i18n: {
    en: {
      name: "She's Your Person",
      text: "Choose one:\n- Remove up to 3 damage from chosen character.\n- Remove up to 3 damage from each of your characters with Bodyguard.",
    },
    de: {
      name: "Sie ist dein Mensch",
      text: "Wähle eine Möglichkeit aus: • Entferne bis zu 3 Schaden von einem Charakter deiner Wahl. • Entferne bis zu 3 Schaden von jedem deiner Charaktere mit Beschützen.",
    },
    fr: {
      name: "C’est ta maîtresse",
      text: "Choisissez entre: • Choisissez un personnage et retirez-lui jusqu'à 3 dommages. • Retirez jusqu'à 3 dommages de chacun de vos personnages avec Rempart.",
    },
    it: {
      name: "È la tua Penny",
      text: "Scegli uno: • Rimuovi fino a 3 danni da un personaggio a tua scelta. • Rimuovi fino a 3 danni da ogni tuo personaggio con Guardiano.",
    },
  },
  inkType: ["amber", "steel"],
  franchise: "Bolt",
  set: "008",
  cardNumber: 40,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_45f97fb5ff014a158519e81b63e644c5",
    tcgPlayer: 631378,
  },
  text: "Choose one:\n- Remove up to 3 damage from chosen character.\n- Remove up to 3 damage from each of your characters with Bodyguard.",
  abilities: [
    {
      type: "action",
      text: "Choose one:\n- Remove up to 3 damage from chosen character.\n- Remove up to 3 damage from each of your characters with Bodyguard.",
      effect: {
        type: "choice",
        options: [
          {
            type: "remove-damage",
            amount: 3,
            upTo: true,
            target: "CHOSEN_CHARACTER",
          },
          {
            type: "remove-damage",
            amount: 3,
            upTo: true,
            target: {
              selector: "all",
              count: "all",
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "has-keyword",
                  keyword: "Bodyguard",
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
