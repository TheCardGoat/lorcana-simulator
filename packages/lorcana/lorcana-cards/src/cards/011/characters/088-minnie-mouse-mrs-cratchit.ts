import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseMrsCratchit: CharacterCard = {
  id: "g4Z",
  canonicalId: "ci_mKu",
  reprints: ["set11-088"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Mrs. Cratchit",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Mrs. Cratchit",
      text: [
        {
          title: "Ward",
        },
        {
          title: "A MOTHER'S LOVE",
          description:
            "When you play this character, you may put the top card of your deck facedown under one of your characters or locations with Boost. If you do, draw a card.",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Frau Cratchit",
      text: "Behütet DIE LIEBE EINER MUTTER Wenn du diesen Charakter ausspielst, darfst du die oberste Karte deines Decks verdeckt unter einen deiner Charaktere oder Orte mit Stärken legen. Wenn du dies tust, ziehe 1 Karte.",
    },
    fr: {
      name: "Minnie",
      version: "Mme Cratchit",
      text: "Hors d'atteinte L'AMOUR D'UNE MÈRE Lorsque vous jouez ce personnage, vous pouvez placer la carte du dessus de votre pioche, face cachée, sous l'un de vos personnages ou de vos lieux avec Boost. Si vous le faites, piochez une carte.",
    },
    it: {
      name: "Minni",
      version: "Signora Cratchit",
      text: "Protetto L'AMORE DI UNA MADRE Quando giochi questo personaggio, puoi mettere la prima carta del tuo mazzo a faccia in giù sotto a uno dei tuoi personaggi o luoghi con Potenziamento. Se lo fai, pesca una carta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 88,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_84aa488aa433406493abed00a9d99611",
    tcgPlayer: 677148,
  },
  text: [
    {
      title: "Ward",
    },
    {
      title: "A MOTHER'S LOVE",
      description:
        "When you play this character, you may put the top card of your deck facedown under one of your characters or locations with Boost. If you do, draw a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "18q-1",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
    {
      id: "18q-2",
      effect: {
        optionLabels: [
          "A MOTHER’S LOVE When you play this character, you may put the top card of your deck facedown under one of your characters",
          "locations with Boost. If you do, draw a card.",
        ],
        options: [
          {
            from: "hand",
            type: "play-card",
          },
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
        ],
        type: "choice",
      },
      type: "action",
      text: "A MOTHER’S LOVE When you play this character, you may put the top card of your deck facedown under one of your characters or locations with Boost. If you do, draw a card.",
    },
  ],
};
