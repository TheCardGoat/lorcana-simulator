import type { CharacterCard } from "@tcg/lorcana-types";

export const madamMimRivalOfMerlin: CharacterCard = {
  id: "RM2",
  canonicalId: "ci_RM2",
  reprints: ["set2-048"],
  cardType: "character",
  name: "Madam Mim",
  version: "Rival of Merlin",
  i18n: {
    en: {
      name: "Madam Mim",
      version: "Rival of Merlin",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "GRUESOME AND GRIM",
          description:
            "{E} — Play a character with cost 4 or less for free. They gain Rush. At the end of the turn, banish them. (They can challenge the turn they're played.)",
        },
      ],
    },
    de: {
      name: "Madame Mim",
      version: "Merlins Rivalin",
      text: "Gestaltwandel 3 GRAUSAM UND SCHLIMM — Spiele einen Charakter, der 4 oder weniger kostet, kostenlos aus. Er erhält Rasant. Verbanne ihn am Ende deines Zuges. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
    },
    fr: {
      name: "Madame Mime",
      version: "Rivale de Merlin",
      text: "Alter 3 LE MACABRE ET LA TERREUR — Jouez gratuitement un personnage coûtant 4 ou moins. Celui-ci gagne Charge. À la fin de votre tour, bannissez-le. (Il peut défier le tour où il est joué.)",
    },
    it: {
      name: "Maga Magò",
      version: "Rivale di Merlino",
      text: "Trasformazione 3 SOLO IL DEMONIO UGUAGLIARE MI PUÒ — Gioca un personaggio con costo 4 o inferiore, gratis. Quel personaggio ottiene Lesto. Alla fine del turno, esilialo. (Può sfidare nel turno in cui viene giocato.)",
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "002",
  cardNumber: 48,
  rarity: "rare",
  cost: 5,
  strength: 2,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_06dda85b506e4a448ce0615f07758bfa",
    tcgPlayer: 527737,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "GRUESOME AND GRIM",
      description:
        "{E} — Play a character with cost 4 or less for free. They gain Rush. At the end of the turn, banish them. (They can challenge the turn they're played.)",
    },
  ],
  classifications: ["Floodborn", "Villain", "Sorcerer"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "dz2-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      cost: {
        exert: true,
      },
      effect: {
        keyword: "Rush",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "dz2-2",
      text: "GRUESOME AND GRIM {E} — Play a character with cost 4 or less for free. They gain Rush. At the end of the turn, banish them.",
      type: "activated",
    },
  ],
};
