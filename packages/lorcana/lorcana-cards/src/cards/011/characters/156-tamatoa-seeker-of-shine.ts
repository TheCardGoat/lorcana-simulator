import type { CharacterCard } from "@tcg/lorcana-types";

export const tamatoaSeekerOfShine: CharacterCard = {
  id: "lED",
  canonicalId: "ci_zL3",
  reprints: ["set11-156"],
  cardType: "character",
  name: "Tamatoa",
  version: "Seeker of Shine",
  i18n: {
    en: {
      name: "Tamatoa",
      version: "Seeker of Shine",
      text: [
        {
          title: "Boost 2 {I}",
        },
        {
          title: "Ward",
        },
        {
          title: "ANYTHING THAT GLITTERS",
          description:
            "Whenever you put a card under one of your characters or locations, this character gets +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Tamatoa",
      version: "Sucher des Glanzes",
      text: "Stärken 2 Behütet MACHE ES GLÄNZEND Jedes Mal, wenn du eine Karte unter einen deiner Charaktere oder Orte legst, erhält dieser Charakter in diesem Zug +1.",
    },
    fr: {
      name: "Tamatoa",
      version: "Chercheur de bling-bling",
      text: "Boost 2 Hors d'atteinte TOUT CE QUI EST BRILLANT Chaque fois que vous placez une carte sous l'un de vos personnages ou de vos lieux, ce personnage-ci gagne +1 pour le reste de ce tour.",
    },
    it: {
      name: "Tamatoa",
      version: "Cercatore di Splendore",
      text: "Potenziamento 2, Protetto DIETRO UN LUCCICHIO Ogni volta che metti una carta sotto a uno dei tuoi personaggi o luoghi, questo personaggio riceve +1 per questo turno.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "011",
  cardNumber: 156,
  rarity: "common",
  cost: 7,
  strength: 6,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_82807328c2514c0d8f22366b4720a583",
    tcgPlayer: 677168,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "Ward",
    },
    {
      title: "ANYTHING THAT GLITTERS",
      description:
        "Whenever you put a card under one of your characters or locations, this character gets +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Whisper"],
  abilities: [
    {
      id: "v4g-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "v4g-2",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
    {
      id: "v4g-3",
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
        duration: "this-turn",
      },
      name: "ANYTHING THAT GLITTERS",
      trigger: {
        event: "banish",
        timing: "whenever",
        on: "YOUR_OTHER_CHARACTERS",
      },
      type: "triggered",
      text: "ANYTHING THAT GLITTERS Whenever you put a card under one of your characters or locations, this character gets +1 {L} this turn.",
    },
  ],
};
