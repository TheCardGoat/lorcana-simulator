import type { CharacterCard } from "@tcg/lorcana-types";

export const heiheiBumblingRooster: CharacterCard = {
  id: "gv1",
  canonicalId: "ci_Vh7",
  reprints: ["set4-075", "set9-086"],
  cardType: "character",
  name: "Heihei",
  version: "Bumbling Rooster",
  i18n: {
    en: {
      name: "Heihei",
      version: "Bumbling Rooster",
      text: [
        {
          title: "FATTEN YOU UP",
          description:
            "When you play this character, if an opponent has more cards in their inkwell than you, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "HeiHei",
      version: "Ungeschickter Hahn",
      text: [
        {
          title: "DANN MÄSTEN WIR DICH MAL",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens eine gegnerische Person mehr Karten in ihrem Tintenvorrat hat als du, darfst du die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Heihei",
      version: "Coq empoté",
      text: [
        {
          title: "MANGE UN PEU AVANT",
          description:
            "Lorsque vous jouez ce personnage, si un adversaire possède plus de cartes que vous dans sa réserve d'encre, vous pouvez placer la première carte de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Heihei",
      version: "Gallo Imbranato",
      text: [
        {
          title: "CERCA DI INGRASSARE UN PO'",
          description:
            "Quando giochi questo personaggio, se un avversario ha più carte di te nel suo calamaio, puoi aggiungere la prima carta del tuo mazzo al tuo calamaio a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Moana",
  set: "009",
  cardNumber: 86,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_fe534ba2bc92411385d7176097db4f43",
    tcgPlayer: 650026,
  },
  text: [
    {
      title: "FATTEN YOU UP",
      description:
        "When you play this character, if an opponent has more cards in their inkwell than you, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "an opponent has more cards in their inkwell than you",
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
      id: "td9-1",
      name: "FATTEN YOU UP",
      text: "FATTEN YOU UP When you play this character, if an opponent has more cards in their inkwell than you, you may put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
