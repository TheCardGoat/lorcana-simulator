import type { CharacterCard } from "@tcg/lorcana-types";

export const theQueenFairestOfAll: CharacterCard = {
  id: "Wpl",
  canonicalId: "ci_Wpl",
  reprints: ["set5-144"],
  cardType: "character",
  name: "The Queen",
  version: "Fairest of All",
  i18n: {
    en: {
      name: "The Queen",
      version: "Fairest of All",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "Ward",
        },
        {
          title: "REFLECTIONS OF VANITY",
          description:
            "For each other character named The Queen you have in play, this character gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Die Königin",
      version: "Die Schönste von allen",
      text: "Gestaltwandel 3 Behütet SPIEGELBILDER DER EITELKEIT Für jeden deiner anderen Die-Königin-Charaktere im Spiel, erhält dieser Charakter +1.",
    },
    fr: {
      name: "La Reine",
      version: "La plus belle",
      text: "Alter 3 Hors d'atteinte REFLETS DE LA VANITÉ Pour chaque autre personnage La Reine que vous avez en jeu, ce personnage-ci gagne +1.",
    },
    it: {
      name: "Regina",
      version: "La Più Bella del Reame",
      text: "Trasformazione 3 Protetto RIFLESSI DI VANITÀ Per ogni altro personaggio chiamato Regina che hai in gioco, questo personaggio riceve +1.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Snow White",
  set: "005",
  cardNumber: 144,
  rarity: "common",
  cost: 5,
  strength: 2,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_cf5e4f99f9c44d91b44ba607d640173b",
    tcgPlayer: 561967,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "Ward",
    },
    {
      title: "REFLECTIONS OF VANITY",
      description:
        "For each other character named The Queen you have in play, this character gets +1 {L}.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Queen", "Sorcerer"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "1ho-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      id: "1ho-2",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1ho-3",
      text: "REFLECTIONS OF VANITY For each other character named The Queen you have in play, this character gets +1 {L}.",
      type: "action",
    },
  ],
};
