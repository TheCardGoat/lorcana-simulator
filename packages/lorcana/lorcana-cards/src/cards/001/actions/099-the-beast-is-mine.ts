import type { ActionCard } from "@tcg/lorcana-types";

export const theBeastIsMine: ActionCard = {
  id: "4uS",
  canonicalId: "ci_4uS",
  reprints: ["set1-099"],
  cardType: "action",
  name: "The Beast is Mine!",
  i18n: {
    en: {
      name: "The Beast is Mine!",
      text: "Chosen character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
    de: {
      name: "Das Biest gehört mir!",
      text: "Ein Charakter deiner Wahl erhält in seinem nächsten Zug Impulsiv. (Er kann nicht erkunden und muss herausfordern, wenn möglich.)",
    },
    fr: {
      name: "LA BÊTE EST À MOI !",
      text: "Choisissez un personnage, il gagne Combattant durant son prochain tour. (Il ne peut pas être envoyé à l'aventure et doit défier à chaque tour s'il le peut.)",
    },
    it: {
      name: "The Beast is Mine!",
      text: "Chosen character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
  },
  inkType: ["emerald"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 99,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_7c0b98be9394466198db3610a9b64953",
    tcgPlayer: 494154,
  },
  text: "Chosen character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
  abilities: [
    {
      type: "action",
      effect: {
        duration: "their-next-turn",
        keyword: "Reckless",
        type: "gain-keyword",
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
