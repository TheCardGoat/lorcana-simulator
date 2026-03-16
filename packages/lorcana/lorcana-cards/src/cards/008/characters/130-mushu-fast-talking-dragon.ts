import type { CharacterCard } from "@tcg/lorcana-types";

export const mushuFasttalkingDragon: CharacterCard = {
  id: "Ffp",
  canonicalId: "ci_Ffp",
  reprints: ["set8-130"],
  cardType: "character",
  name: "Mushu",
  version: "Fast-Talking Dragon",
  i18n: {
    en: {
      name: "Mushu",
      version: "Fast-Talking Dragon",
      text: [
        {
          title: "LET'S GET THIS SHOW ON THE ROAD",
          description:
            "{E} — Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
        },
      ],
    },
    de: {
      name: "Mushu",
      version: "Schnellsprechender Drache",
      text: [
        {
          title: "BRINGEN WIR DAS",
          description:
            "ÜBER DIE BÜHNE — Ein Charakter deiner Wahl erhält in diesem Zug Rasant. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
        },
      ],
    },
    fr: {
      name: "Mushu",
      version: "Dragon jacasseur",
      text: [
        {
          title: "EN AVANT POUR LA GRANDE AVENTURE",
          description: "— Choisissez un personnage qui gagne Charge pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Mushu",
      version: "Drago Loquace",
      text: [
        {
          title: "BUTTIAMOCI NELLA MISCHIA",
          description:
            "— Un personaggio a tua scelta ottiene Lesto per questo turno. (Può sfidare nel turno in cui viene giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "008",
  cardNumber: 130,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ea0d142942ae47fb8d5840fedf77bd08",
    tcgPlayer: 631435,
  },
  text: [
    {
      title: "LET'S GET THIS SHOW ON THE ROAD",
      description:
        "{E} — Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
    },
  ],
  classifications: ["Storyborn", "Ally", "Dragon"],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "this-turn",
        keyword: "Rush",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "17r-1",
      text: "LET'S GET THIS SHOW ON THE ROAD {E} — Chosen character gains Rush this turn.",
      type: "activated",
    },
  ],
};
