import type { CharacterCard } from "@tcg/lorcana-types";

export const jasmineHeirOfAgrabah: CharacterCard = {
  id: "kVO",
  canonicalId: "ci_OtD",
  reprints: ["set2-151", "set9-155"],
  cardType: "character",
  name: "Jasmine",
  version: "Heir of Agrabah",
  i18n: {
    en: {
      name: "Jasmine",
      version: "Heir of Agrabah",
      text: [
        {
          title: "I'M A FAST LEARNER",
          description:
            "When you play this character, remove up to 1 damage from chosen character of yours.",
        },
      ],
    },
    de: {
      name: "Jasmin",
      version: "Thronerbin von Agrabah",
      text: [
        {
          title: "ICH BEGREIFE SEHR SCHNELL",
          description:
            "Wenn du diesen Charakter ausspielst, entferne bis zu 1 Schaden von einem deiner Charaktere.",
        },
      ],
    },
    fr: {
      name: "Jasmine",
      version: "Héritière d'Agrabah",
      text: [
        {
          title: "J'APPRENDS VITE",
          description:
            "Lorsque vous jouez ce personnage, choisissez l'un de vos personnages et retirez-lui 1 jeton Dommage.",
        },
      ],
    },
    it: {
      name: "Jasmine",
      version: "Erede di Agrabah",
      text: [
        {
          title: "IMPARO IN FRETTA",
          description:
            "Quando giochi questo personaggio, rimuovi fino a 1 danno da un tuo personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Aladdin",
  set: "002",
  cardNumber: 151,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_76abbf408f4940dea3dc5daf5afdd314",
    tcgPlayer: 650090,
  },
  text: [
    {
      title: "I'M A FAST LEARNER",
      description:
        "When you play this character, remove up to 1 damage from chosen character of yours.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  missingTests: true,
  abilities: [
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      id: "1sv-1",
      name: "I'M A FAST LEARNER",
      text: "I'M A FAST LEARNER When you play this character, remove up to 1 damage from chosen character of yours.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
