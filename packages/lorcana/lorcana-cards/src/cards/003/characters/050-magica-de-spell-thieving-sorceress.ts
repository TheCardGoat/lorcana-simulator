import type { CharacterCard } from "@tcg/lorcana-types";

export const magicaDeSpellThievingSorceress: CharacterCard = {
  id: "iq5",
  canonicalId: "ci_iq5",
  reprints: ["set3-050"],
  cardType: "character",
  name: "Magica De Spell",
  version: "Thieving Sorceress",
  i18n: {
    en: {
      name: "Magica De Spell",
      version: "Thieving Sorceress",
      text: [
        {
          title: "TELEKINESIS",
          description:
            "{E} — Return chosen item with cost equal to or less than this character's {S} to its player's hand.",
        },
      ],
    },
    de: {
      name: "Gundel Gaukeley",
      version: "Diebische Hexe",
      text: [
        {
          title: "TELEKINESE",
          description:
            "— Schicke einen Gegenstand deiner Wahl auf die zugehörige Hand zurück, der genauso viel oder weniger kostet wie der -Wert dieses Charakters beträgt.",
        },
      ],
    },
    fr: {
      name: "Miss Tick",
      version: "Sorcière en plein larcin",
      text: [
        {
          title: "TÉLÉKINÉSIE",
          description:
            "— Choisissez un objet ayant un coût inférieur ou égal à la de ce personnage et renvoyez-le dans la main de son propriétaire.",
        },
      ],
    },
    it: {
      name: "Amelia",
      version: "Strega Ladruncola",
      text: [
        {
          title: "TELECINESI",
          description:
            "— Fai tornare un oggetto a tua scelta con costo pari o inferiore alla di questo personaggio in mano al suo giocatore.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Ducktales",
  set: "003",
  cardNumber: 50,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_177102be31464591b1637a5b9b2b5aca",
    tcgPlayer: 538255,
  },
  text: [
    {
      title: "TELEKINESIS",
      description:
        "{E} — Return chosen item with cost equal to or less than this character's {S} to its player's hand.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  missingImplementation: true,
  missingTests: true,
  abilities: [],
};
