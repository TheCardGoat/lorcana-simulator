import type { CharacterCard } from "@tcg/lorcana-types";

export const gazelleAngelWithHorns: CharacterCard = {
  id: "pGq",
  canonicalId: "ci_pGq",
  reprints: ["set6-088"],
  cardType: "character",
  name: "Gazelle",
  version: "Angel with Horns",
  i18n: {
    en: {
      name: "Gazelle",
      version: "Angel with Horns",
      text: [
        {
          title: "YOU ARE A REALLY HOT DANCER",
          description:
            "When you play this character, chosen character gains Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Gazelle",
      version: "Engel mit Hörnern",
      text: [
        {
          title: "DU BIST EIN RICHTIG HEISSER TÄNZER",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl bis zu Beginn deines nächsten Zuges Wendig.",
        },
      ],
    },
    fr: {
      name: "Gazelle",
      version: "Ange avec des cornes",
      text: [
        {
          title: "VOUS SAVEZ BOUGER",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui gagne Insaisissable jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Gazelle",
      version: "Angelo con le Corna",
      text: [
        {
          title: "SEI UN GRAN BALLERINO",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Zootropolis",
  set: "006",
  cardNumber: 88,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c53a704a909445f5b2837b51f29faa47",
    tcgPlayer: 591117,
  },
  text: [
    {
      title: "YOU ARE A REALLY HOT DANCER",
      description:
        "When you play this character, chosen character gains Evasive until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      effect: {
        keyword: "Evasive",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "1b1-1",
      name: "YOU ARE A REALLY HOT DANCER",
      text: "YOU ARE A REALLY HOT DANCER When you play this character, chosen character gains Evasive until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
