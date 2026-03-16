import type { CharacterCard } from "@tcg/lorcana-types";

export const ratiganGreedyGenius: CharacterCard = {
  id: "Ca0",
  canonicalId: "ci_Ca0",
  reprints: ["set8-167"],
  cardType: "character",
  name: "Ratigan",
  version: "Greedy Genius",
  i18n: {
    en: {
      name: "Ratigan",
      version: "Greedy Genius",
      text: [
        {
          title: "Ward",
        },
        {
          title: "TIME RUNS OUT",
          description:
            "At the end of your turn, if you didn't put any cards into your inkwell this turn, banish this character.",
        },
      ],
    },
    de: {
      name: "Rattenzahn",
      version: "Gieriges Genie",
      text: "Behütet DIE ZEIT LÄUFT AB Am Ende deines Zuges, falls du in diesem Zug keine Karte in deinen Tintenvorrat gelegt hast, verbanne diesen Charakter.",
    },
    fr: {
      name: "Ratigan",
      version: "Génie cupide",
      text: "Hors d'atteinte LE TEMPS PRESSE À la fin de votre tour, si vous n'avez placé aucune carte dans votre réserve d'encre ce tour-ci, bannissez ce personnage.",
    },
    it: {
      name: "Rattigan",
      version: "Avido Genio",
      text: "Protetto TEMPO SCADUTO Alla fine del tuo turno, se non hai aggiunto nessuna carta al tuo calamaio in questo turno, esilia questo personaggio.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Great Mouse Detective",
  set: "008",
  cardNumber: 167,
  rarity: "legendary",
  cost: 8,
  strength: 6,
  willpower: 7,
  lore: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_6119229219f04cdaa2650c87645a1bf4",
    tcgPlayer: 631464,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "TIME RUNS OUT",
      description:
        "At the end of your turn, if you didn't put any cards into your inkwell this turn, banish this character.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "e9z-1",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          type: "turn-metric",
          metric: "cards-inked",
          comparison: {
            operator: "eq",
            value: 0,
          },
        },
        then: {
          target: {
            selector: "self",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "banish",
        },
        type: "conditional",
      },
      id: "e9z-2",
      text: "TIME RUNS OUT At the end of your turn, if you didn't put any cards into your inkwell this turn, banish this character.",
      type: "action",
    },
  ],
};
