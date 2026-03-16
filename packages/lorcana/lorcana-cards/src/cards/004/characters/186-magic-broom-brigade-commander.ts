import type { CharacterCard } from "@tcg/lorcana-types";

export const magicBroomBrigadeCommander: CharacterCard = {
  id: "g7O",
  canonicalId: "ci_g7O",
  reprints: ["set4-186"],
  cardType: "character",
  name: "Magic Broom",
  version: "Brigade Commander",
  i18n: {
    en: {
      name: "Magic Broom",
      version: "Brigade Commander",
      text: [
        {
          title: "Resist +1",
        },
        {
          title: "ARMY OF BROOMS",
          description:
            "This character gets +2 {S} for each other character named Magic Broom you have in play.",
        },
      ],
    },
    de: {
      name: "Zauberbesen",
      version: "Marschmeister",
      text: "Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.) ARMEE VON BESEN Dieser Charakter erhält +2 für jeden weiteren Zauberbesen-Charakter, den du im Spiel hast.",
    },
    fr: {
      name: "Balais Magiques",
      version: "Commandant de brigade",
      text: "Résistance +1 ARMÉE DE BALAIS Ce personnage gagne +2 pour chaque autre personnage Balais magiques que vous avez en jeu.",
    },
    it: {
      name: "Scopa Magica",
      version: "Capitano di Brigata",
      text: "Resistere +1 ARMATA DI SCOPE Questo personaggio riceve +2 per ogni altro personaggio chiamato Scopa Magica che hai in gioco.",
    },
  },
  inkType: ["steel"],
  franchise: "Fantasia",
  set: "004",
  cardNumber: 186,
  rarity: "common",
  cost: 6,
  strength: 2,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_989cc7ce93b04fae9388328e9f46d840",
    tcgPlayer: 550618,
  },
  text: [
    {
      title: "Resist +1",
    },
    {
      title: "ARMY OF BROOMS",
      description:
        "This character gets +2 {S} for each other character named Magic Broom you have in play.",
    },
  ],
  classifications: ["Dreamborn", "Broom"],
  abilities: [
    {
      id: "pct-1",
      keyword: "Resist",
      text: "Resist +1",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "pct-2",
      text: "ARMY OF BROOMS This character gets +2 {S} for each other character named Magic Broom you have in play.",
      type: "static",
    },
  ],
};
