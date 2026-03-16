import type { CharacterCard } from "@tcg/lorcana-types";

export const peterPanNeverLandHero: CharacterCard = {
  id: "kk3",
  canonicalId: "ci_kk3",
  reprints: ["set3-119"],
  cardType: "character",
  name: "Peter Pan",
  version: "Never Land Hero",
  i18n: {
    en: {
      name: "Peter Pan",
      version: "Never Land Hero",
      text: [
        {
          title: "Rush",
        },
        {
          title: "OVER HERE, TINK",
          description:
            "While you have a character named Tinker Bell in play, this character gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Peter Pan",
      version: "Held aus Nimmerland",
      text: "Rasant HIER DRÜBEN, NASEWEIS Solange du mindestens einen Naseweis-Charakter im Spiel hast, erhält dieser Charakter +2.",
    },
    fr: {
      name: "Peter Pan",
      version: "Héros du Pays Imaginaire",
      text: "Charge PAR ICI, FÉE CLOCHETTE Tant que vous avez un personnage La Fée Clochette en jeu, ce personnage gagne +2.",
    },
    it: {
      name: "Peter Pan",
      version: "Eroe dell'Isola Che Non C'è",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) DA QUESTA PARTE, TRILLI Mentre hai un personaggio chiamato Trilli in gioco, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "003",
  cardNumber: 119,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ffccea571e7e4efb9b5258ecc03e847b",
    tcgPlayer: 537951,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "OVER HERE, TINK",
      description:
        "While you have a character named Tinker Bell in play, this character gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      id: "h1y-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "h1y-2",
      text: "OVER HERE, TINK While you have a character named Tinker Bell in play, this character gets +2 {S}.",
      type: "action",
    },
  ],
};
