import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckFocusedFlatfoot: CharacterCard = {
  id: "X12",
  canonicalId: "ci_X12",
  reprints: ["set5-155"],
  cardType: "character",
  name: "Donald Duck",
  version: "Focused Flatfoot",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Focused Flatfoot",
      text: [
        {
          title: "BAFFLING MYSTERY",
          description:
            "When you play this character, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Donald Duck",
      version: "Konzentrierter Plattfuß",
      text: [
        {
          title: "GEHEIMNISVOLLES RÄTSEL",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Donald",
      version: "Pied-plat concentré",
      text: [
        {
          title: "MYSTÈRE MYSTIFIANT",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez placer la carte du dessus de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
      ],
    },
    it: {
      name: "Paperino",
      version: "Piedipiatti Concentrato",
      text: [
        {
          title: "MISTERO SCONCERTANTE",
          description:
            "Quando giochi questo personaggio, puoi aggiungere la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  set: "005",
  cardNumber: 155,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d82ace7e03d34ca587519f2c089dc515",
    tcgPlayer: 561650,
  },
  text: [
    {
      title: "BAFFLING MYSTERY",
      description:
        "When you play this character, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "htc-1",
      name: "BAFFLING MYSTERY",
      text: "BAFFLING MYSTERY When you play this character, you may put the top card of your deck into your inkwell facedown and exerted.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
