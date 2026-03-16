import type { CharacterCard } from "@tcg/lorcana-types";

export const ludwigVonDrakeAllaroundExpert: CharacterCard = {
  id: "T22",
  canonicalId: "ci_T22",
  reprints: ["set8-007"],
  cardType: "character",
  name: "Ludwig Von Drake",
  version: "All-Around Expert",
  i18n: {
    en: {
      name: "Ludwig Von Drake",
      version: "All-Around Expert",
      text: [
        {
          title: "SUPERIOR MIND",
          description:
            "When you play this character, chosen opponent reveals their hand and discards a non-character card of your choice.",
        },
        {
          title: "LASTING LEGACY",
          description:
            "When this character is banished, you may put this card into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Primus von Quack",
      version: "Vielseitiger Experte",
      text: [
        {
          title: "ÜBERLEGENER VERSTAND",
          description:
            "Wenn du diesen Charakter ausspielst, zeigt einer der gegnerischen Mitspielenden deiner Wahl alle Handkarten für alle sichtbar vor und wirft eine Karte deiner Wahl, die keine Charakterkarte ist, ab.",
        },
        {
          title: "EWIGES ERBE",
          description:
            "Wenn dieser Charakter verbannt wird, darfst du diese Karte verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Ludwig von Drake",
      version: "Expert polyvalent",
      text: [
        {
          title: "ESPRIT SUPÉRIEUR",
          description:
            "Lorsque vous jouez ce personnage, choisissez un adversaire qui révèle sa main. Choisissez-y une carte non-Personnage dont il se défausse.",
        },
        {
          title: "HÉRITAGE DURABLE",
          description:
            "Lorsque ce personnage est banni, vous pouvez le placer dans votre réserve d'encre, face cachée et épuisé.",
        },
      ],
    },
    it: {
      name: "Pico de Paperis",
      version: "Esperto a Tutto Tondo",
      text: [
        {
          title: "MENTE SUPERIORE",
          description:
            "Quando giochi questo personaggio, un avversario a tua scelta rivela la sua mano e scarta una carta non personaggio a tua scelta.",
        },
        {
          title: "EREDITÀ DURATURA",
          description:
            "Quando questo personaggio viene esiliato, puoi aggiungere questa carta al tuo calamaio, a faccia in giù e impegnata.",
        },
      ],
    },
  },
  inkType: ["amber", "sapphire"],
  set: "008",
  cardNumber: 7,
  rarity: "rare",
  cost: 2,
  strength: 1,
  willpower: 1,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_a22eb000866a46439fd736cd7a8ec535",
    tcgPlayer: 631353,
  },
  text: [
    {
      title: "SUPERIOR MIND",
      description:
        "When you play this character, chosen opponent reveals their hand and discards a non-character card of your choice.",
    },
    {
      title: "LASTING LEGACY",
      description:
        "When this character is banished, you may put this card into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [],
};
