import type { CharacterCard } from "@tcg/lorcana-types";

export const maleficentFormidableQueen: CharacterCard = {
  id: "IEz",
  canonicalId: "ci_IEz",
  reprints: ["set5-035"],
  cardType: "character",
  name: "Maleficent",
  version: "Formidable Queen",
  i18n: {
    en: {
      name: "Maleficent",
      version: "Formidable Queen",
      text: [
        {
          title: "Shift 6",
        },
        {
          title: "LISTEN WELL, ALL OF YOU",
          description:
            "When you play this character, for each of your characters named Maleficent in play, return a chosen opposing character, item, or location with cost 3 or less to their player's hand.",
        },
      ],
    },
    de: {
      name: "Malefiz",
      version: "Furchtbare Königin",
      text: "Gestaltwandel 6 ALLE, DIE IHR HIER SEID, HÖRT MICH AN. Wenn du diesen Charakter ausspielst, schicke, für jeden deiner Malefiz-Charaktere im Spiel, je einen gegnerischen Charakter, Gegenstand oder Ort deiner Wahl, der 3 oder weniger kostet, auf die zugehörige Hand zurück.",
    },
    fr: {
      name: "Maléfique",
      version: "Redoutable reine",
      text: "Alter 6 OUVREZ BIEN VOS OREILLES Lorsque vous jouez ce personnage, pour chacun de vos personnages Maléfique en jeu, choisissez un personnage, objet ou lieu adverse avec un coût de 3 ou moins et renvoyez-le dans la main de son propriétaire.",
    },
    it: {
      name: "Malefica",
      version: "Regina Temibile",
      text: "Trasformazione 6 ASCOLTATE TUTTI QUANTI Quando giochi questo personaggio, per ogni tuo personaggio in gioco chiamato Malefica, fai riprendere in mano al suo giocatore un personaggio, un oggetto o un luogo avversario a tua scelta con costo 3 o inferiore.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Sleeping Beauty",
  set: "005",
  cardNumber: 35,
  rarity: "common",
  cost: 8,
  strength: 7,
  willpower: 7,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d3bfcff390e54c9bbd1027b57320d621",
    tcgPlayer: 561950,
  },
  text: [
    {
      title: "Shift 6",
    },
    {
      title: "LISTEN WELL, ALL OF YOU",
      description:
        "When you play this character, for each of your characters named Maleficent in play, return a chosen opposing character, item, or location with cost 3 or less to their player's hand.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Queen", "Sorcerer"],
  abilities: [
    {
      cost: {
        ink: 6,
      },
      id: "1a2-1",
      keyword: "Shift",
      text: "Shift 6",
      type: "keyword",
    },
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "return-to-hand",
      },
      id: "1a2-2",
      text: "LISTEN WELL, ALL OF YOU When you play this character, for each of your characters named Maleficent in play, return a chosen opposing character, item, or location with cost 3 or less to their player's hand.",
      type: "action",
    },
  ],
};
