import type { CharacterCard } from "@tcg/lorcana-types";

export const cogsworthIlluminaryWatchman: CharacterCard = {
  id: "Usw",
  canonicalId: "ci_Usw",
  reprints: ["set5-037"],
  cardType: "character",
  name: "Cogsworth",
  version: "Illuminary Watchman",
  i18n: {
    en: {
      name: "Cogsworth",
      version: "Illuminary Watchman",
      text: [
        {
          title: "TIME TO MOVE IT!",
          description:
            "When you play this character, chosen character gains Rush this turn. (They can challenge the turn they're played.)",
        },
      ],
    },
    de: {
      name: "Von Unruh",
      version: "Uhralter Wächter des Illuminariums",
      text: [
        {
          title: "ZEIT, SICH ZU BEWEGEN!",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug Rasant. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
        },
      ],
    },
    fr: {
      name: "Big Ben",
      version: "Gardien de l'Illuminarium",
      text: [
        {
          title: "IL FAUT ARRÊTER ÇA!",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui gagne Charge pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Tockins",
      version: "Sentinella dell'Illuminarium",
      text: [
        {
          title: "È ORA DI MUOVERSI!",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta ottiene Lesto per questo turno. (Può sfidare nel turno in cui viene giocato.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Beauty and the Beast",
  set: "005",
  cardNumber: 37,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5004569c2e0246e8bc9014bc00c21cd1",
    tcgPlayer: 561610,
  },
  text: [
    {
      title: "TIME TO MOVE IT!",
      description:
        "When you play this character, chosen character gains Rush this turn. (They can challenge the turn they're played.)",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Rush",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "1n5-1",
      name: "TIME TO MOVE IT!",
      text: "TIME TO MOVE IT! When you play this character, chosen character gains Rush this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
