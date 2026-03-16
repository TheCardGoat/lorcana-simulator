import type { CharacterCard } from "@tcg/lorcana-types";

export const moanaKakamoraLeader: CharacterCard = {
  id: "OXn",
  canonicalId: "ci_OXn",
  reprints: ["set6-121"],
  cardType: "character",
  name: "Moana",
  version: "Kakamora Leader",
  i18n: {
    en: {
      name: "Moana",
      version: "Kakamora Leader",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "GATHERING FORCES",
          description:
            "When you play this character, you may move any number of your characters to the same location for free. Gain 1 lore for each character you moved.",
        },
      ],
    },
    de: {
      name: "Vaiana",
      version: "Anführerin der Kokomora",
      text: "Gestaltwandel 5 KRÄFTE VEREINEN Wenn du diesen Charakter ausspielst, darfst du beliebig viele deiner Charaktere kostenlos zu demselben Ort bewegen. Sammle 1 Legende für jeden Charakter, den du auf diese Weise bewegt hast.",
    },
    fr: {
      name: "Vaiana",
      version: "Cheffe des Kakamora",
      text: "Alter 5 RASSEMBLEMENT DES FORCES Lorsque vous jouez ce personnage, vous pouvez déplacer gratuitement n'importe quel nombre de vos personnages sur le même lieu. Gagnez 1 éclat de Lore par personnage déplacé de cette façon.",
    },
    it: {
      name: "Vaiana",
      version: "Leader dei Kakamora",
      text: "Trasformazione 5 RADUNARE LE TRUPPE Quando giochi questo personaggio, puoi spostare un qualsiasi numero di tuoi personaggi nello stesso luogo, gratis. Ottieni 1 leggenda per ogni personaggio che hai spostato.",
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "006",
  cardNumber: 121,
  rarity: "rare",
  cost: 7,
  strength: 6,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ea56665b30604ff0977e95ad7442f5f5",
    tcgPlayer: 588360,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "GATHERING FORCES",
      description:
        "When you play this character, you may move any number of your characters to the same location for free. Gain 1 lore for each character you moved.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess", "Pirate", "Captain"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "cew-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          type: "gain-lore",
        },
        type: "optional",
      },
      id: "cew-2",
      name: "GATHERING FORCES",
      text: "GATHERING FORCES When you play this character, you may move any number of your characters to the same location for free. Gain 1 lore for each character you moved.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
