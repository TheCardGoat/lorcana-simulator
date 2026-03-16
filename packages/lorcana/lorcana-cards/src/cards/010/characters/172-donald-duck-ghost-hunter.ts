import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckGhostHunter: CharacterCard = {
  id: "8QA",
  canonicalId: "ci_8QA",
  reprints: ["set10-172"],
  cardType: "character",
  name: "Donald Duck",
  version: "Ghost Hunter",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Ghost Hunter",
      text: [
        {
          title: "RAISE A RUCKUS",
          description:
            "When you play this character, chosen Detective character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Geisterjäger",
      text: [
        {
          title: "EINEN AUFSTAND ANZETTELN",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Detektiv deiner Wahl in diesem Zug Herausfordern +2. (Während der Charakter herausfordert, erhält er +2.)",
        },
      ],
    },
    fr: {
      name: "Donald",
      version: "Chasseur de fantômes",
      text: [
        {
          title: "FAIRE DU GRABUGE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage Détective qui gagne Offensif +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Paperino",
      version: "Cacciatore di Fantasmi",
      text: [
        {
          title: "ALZARE UN POLVERONE",
          description:
            "Quando giochi questo personaggio, un personaggio Detective a tua scelta ottiene Sfidante +2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "010",
  cardNumber: 172,
  rarity: "common",
  cost: 4,
  strength: 5,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_54826b5dca034c2d8afd142a96fedf58",
    tcgPlayer: 659396,
  },
  text: [
    {
      title: "RAISE A RUCKUS",
      description:
        "When you play this character, chosen Detective character gains Challenger +2 this turn. (They get +2 {S} while challenging.)",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        keyword: "Challenger",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 2,
      },
      id: "1u3-1",
      name: "RAISE A RUCKUS",
      text: "RAISE A RUCKUS When you play this character, chosen Detective character gains Challenger +2 this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
