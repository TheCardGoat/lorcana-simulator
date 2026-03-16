import type { CharacterCard } from "@tcg/lorcana-types";

export const iagoLoudmouthedParrot: CharacterCard = {
  id: "4Om",
  canonicalId: "ci_4Om",
  reprints: ["set1-080"],
  cardType: "character",
  name: "Iago",
  version: "Loud-Mouthed Parrot",
  i18n: {
    en: {
      name: "Iago",
      version: "Loud-Mouthed Parrot",
      text: [
        {
          title: "YOU GOT A PROBLEM?",
          description:
            "{E} — Chosen character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Jago",
      version: "Großmäuliger Papagei",
      text: [
        {
          title: "HAST DU'N PROBLEM?",
          description:
            "— Ein Charakter deiner Wahl erhält in seinem nächsten Zug Impulsiv. (Der Charakter kann nicht erkunden und muss herausfordern, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "IAGO",
      version: "Perroquet braillard",
      text: [
        {
          title: "T'AS UN",
          description:
            "PROBLÈME? — Choisissez un personnage, il gagne Combattant durant son prochain tour. (Il ne peut pas être envoyé à l'aventure et doit défier à chaque tour s'il le peut.)",
        },
      ],
    },
    it: {
      name: "Iago",
      version: "Loud-Mouthed Parrot",
      text: [
        {
          title: "YOU GOT A PROBLEM?",
          description:
            "— Chosen character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 80,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_fb67b53a2df44bff96ca7fff2d607437",
    tcgPlayer: 497207,
  },
  text: [
    {
      title: "YOU GOT A PROBLEM?",
      description:
        "{E} — Chosen character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "until-start-of-next-turn",
        keyword: "Reckless",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "j24-1",
      name: "YOU GOT A PROBLEM?",
      text: "YOU GOT A PROBLEM? {E} — Chosen character gains Reckless during their next turn.",
      type: "activated",
    },
  ],
};
