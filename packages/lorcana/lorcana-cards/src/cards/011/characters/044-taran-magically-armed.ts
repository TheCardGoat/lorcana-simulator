import type { CharacterCard } from "@tcg/lorcana-types";

export const taranMagicallyArmed: CharacterCard = {
  id: "8Qz",
  canonicalId: "ci_8Qz",
  reprints: ["set11-044"],
  cardType: "character",
  name: "Taran",
  version: "Magically Armed",
  i18n: {
    en: {
      name: "Taran",
      version: "Magically Armed",
      text: "Rush WEAKEN THE CAULDRON When you play this character, put up to 2 cards from chosen player's discard on the bottom of their deck in any order.",
    },
    de: {
      name: "Taran",
      version: "Magisch bewaffnet",
      text: "Rasant SCHWÄCHE DEN KESSEL Wenn du diesen Charakter ausspielst, lege bis zu 2 Karten aus einem Ablagestapel deiner Wahl in beliebiger Reihenfolge unter das zugehörige Deck.",
    },
    fr: {
      name: "Taram",
      version: "Magiquement armé",
      text: "Charge AFFAIBLIR LE CHAUDRON Lorsque vous jouez ce personnage, choisissez un joueur et placez jusqu'à 2 cartes de sa défausse sous sa pioche, dans l'ordre de votre choix.",
    },
    it: {
      name: "Taron",
      version: "Armato Magicamente",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) INDEBOLIRE LA PENTOLA Quando giochi questo personaggio, metti fino a 2 carte dagli scarti di un giocatore a tua scelta in fondo al suo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Black Cauldron",
  set: "011",
  cardNumber: 44,
  rarity: "uncommon",
  cost: 5,
  strength: 5,
  willpower: 5,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_b0231e5ba8c34691ac5bf29e6fc96c46",
    tcgPlayer: 673420,
  },
  text: "Rush WEAKEN THE CAULDRON When you play this character, put up to 2 cards from chosen player's discard on the bottom of their deck in any order.",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "u75-1",
      effect: {
        target: {
          cardTypes: ["card"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "put-on-bottom",
      },
      name: "Rush WEAKEN THE CAULDRON",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "Rush WEAKEN THE CAULDRON When you play this character, put up to 2 cards from chosen player's discard on the bottom of their deck in any order.",
    },
  ],
};
