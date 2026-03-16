import type { CharacterCard } from "@tcg/lorcana-types";

export const tipoGrowingSon: CharacterCard = {
  id: "gPY",
  canonicalId: "ci_gPY",
  reprints: ["set5-157"],
  cardType: "character",
  name: "Tipo",
  version: "Growing Son",
  i18n: {
    en: {
      name: "Tipo",
      version: "Growing Son",
      text: [
        {
          title: "MEASURE ME AGAIN",
          description:
            "When you play this character, you may put a card from your hand into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Tipo",
      version: "Wachsender Sohn",
      text: [
        {
          title: "WIE GROSS BIN ICH JETZT?",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 beliebige Karte aus deiner Hand verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Tipo",
      version: "Fils en croissance",
      text: [
        {
          title: "REMESURE-MOI ENCORE!",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez placer une carte de votre main dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Tipo",
      version: "Figlio in Crescita",
      text: [
        {
          title: "MISURAMI",
          description:
            "Quando giochi questo personaggio, puoi aggiungere una carta dalla tua mano al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Emperors New Groove",
  set: "005",
  cardNumber: 157,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_bef15d42bda94a50a0fea05384b4cd72",
    tcgPlayer: 560584,
  },
  text: [
    {
      title: "MEASURE ME AGAIN",
      description:
        "When you play this character, you may put a card from your hand into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "hand",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "1wt-1",
      name: "MEASURE ME AGAIN",
      text: "MEASURE ME AGAIN When you play this character, you may put a card from your hand into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
