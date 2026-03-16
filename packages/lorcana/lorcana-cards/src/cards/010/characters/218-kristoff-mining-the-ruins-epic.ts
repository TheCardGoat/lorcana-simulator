import type { CharacterCard } from "@tcg/lorcana-types";

export const kristoffMiningTheRuinsEpic: CharacterCard = {
  id: "lsw",
  canonicalId: "ci_3Xr",
  reprints: ["set10-159"],
  cardType: "character",
  name: "Kristoff",
  version: "Mining the Ruins",
  i18n: {
    en: {
      name: "Kristoff",
      version: "Mining the Ruins",
      text: "Boost 1 {I} WORTH MINING Whenever this character quests, if there's a card under him, put the top card of your deck into your inkwell facedown and exerted.",
    },
    de: {
      name: "Kristoff",
      version: "Baut die Ruinen ab",
      text: "Stärken 1 EIN GUTER FUND Jedes Mal, wenn dieser Charakter erkundet, falls er mindestens eine Karte unter sich hat, lege die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat.",
    },
    fr: {
      name: "Kristoff",
      version: "Minant les ruines",
      text: "Boost 1 UN TRÉSOR QU'IL FAUT MÉRITER Chaque fois que ce personnage est envoyé à l'aventure, s'il y a une carte sous lui, placez la carte du dessus de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
    },
    it: {
      name: "Kristoff",
      version: "Minatore nelle Rovine",
      text: [
        {
          title: "Potenziamento 1",
          description:
            "(Una volta durante il tuo turno, puoi pagare 1 per mettere la prima carta del tuo mazzo a faccia in giù sotto a questo personaggio.) CUORE FREDDO Ogni volta che questo personaggio va all'avventura, se c'è una carta sotto di esso, aggiungi la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "010",
  cardNumber: 218,
  rarity: "common",
  specialRarity: "epic",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c74126bc80ba4d52bc7c499ba67dce25",
    tcgPlayer: 660270,
  },
  text: "Boost 1 {I} WORTH MINING Whenever this character quests, if there's a card under him, put the top card of your deck into your inkwell facedown and exerted.",
  classifications: ["Storyborn", "Ally", "Whisper"],
  abilities: [
    {
      id: "abh-1",
      keyword: "Boost",
      text: "Boost 1 {I}",
      type: "keyword",
      value: 1,
    },
    {
      effect: {
        condition: {
          expression: "there's a card under him",
          type: "if",
        },
        then: {
          exerted: true,
          facedown: true,
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "conditional",
      },
      id: "abh-2",
      name: "WORTH MINING",
      text: "WORTH MINING Whenever this character quests, if there's a card under him, put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
