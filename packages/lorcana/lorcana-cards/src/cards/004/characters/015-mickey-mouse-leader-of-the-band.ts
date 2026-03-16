import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseLeaderOfTheBand: CharacterCard = {
  id: "HGH",
  canonicalId: "ci_HGH",
  reprints: ["set4-015"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Leader of the Band",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Leader of the Band",
      text: [
        {
          title: "Support",
        },
        {
          title: "STRIKE UP THE MUSIC",
          description: "When you play this character, chosen character gains Support this turn.",
        },
      ],
    },
    de: {
      name: "Micky Maus",
      version: "Dirigent",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) DIE MUSIK AUFDREHEN Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug Unterstützen.",
    },
    fr: {
      name: "Mickey Mouse",
      version: "Chef de la fanfare",
      text: "Soutien EN AVANT LA MUSIQUE! Lorsque vous jouez ce personnage, choisissez un personnage qui gagne Soutien pour le reste de ce tour.",
    },
    it: {
      name: "Topolino",
      version: "Direttore della Banda",
      text: "Aiutante ATTACCARE IL PEZZO Quando giochi questo personaggio, un personaggio a tua scelta ottiene Aiutante per questo turno.",
    },
  },
  inkType: ["amber"],
  set: "004",
  cardNumber: 15,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_74dbff9983194285973b48e74a2c3f90",
    tcgPlayer: 549522,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "STRIKE UP THE MUSIC",
      description: "When you play this character, chosen character gains Support this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1ow-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Support",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "1ow-2",
      name: "STRIKE UP THE MUSIC",
      text: "STRIKE UP THE MUSIC When you play this character, chosen character gains Support this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
