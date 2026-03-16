import type { CharacterCard } from "@tcg/lorcana-types";

export const rufusOrphanageCat: CharacterCard = {
  id: "Lpq",
  canonicalId: "ci_Lpq",
  reprints: ["set3-153"],
  cardType: "character",
  name: "Rufus",
  version: "Orphanage Cat",
  i18n: {
    en: {
      name: "Rufus",
      version: "Orphanage Cat",
      text: [
        {
          title: "TOO OLD TO BE CHASING MICE",
          description:
            "When this character is banished, you may put this card into your inkwell facedown and exerted.",
        },
      ],
    },
    de: {
      name: "Rufus",
      version: "Katze aus dem Waisenhaus",
      text: [
        {
          title: "ZU ALT, ZUR MÄUSEJAGD",
          description:
            "Wenn dieser Charakter verbannt wird, darfst du diese Karte verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
      ],
    },
    fr: {
      name: "Rufus",
      version: "Chat d'orphelinat",
      text: [
        {
          title: "JE N'AI PLUS L'ÂGE POUR JOUER AU CHAT ET À LA SOURIS",
          description:
            "Lorsque ce personnage est banni, vous pouvez le placer dans votre réserve d'encre, face cachée et épuisé.",
        },
      ],
    },
    it: {
      name: "Rufus",
      version: "Gatto da Orfanotrofio",
      text: [
        {
          title: "UN TANTINO TROPPO VECCHIO PER DAR LA CACCIA AI TOPI",
          description:
            "Quando questo personaggio viene esiliato, puoi aggiungerlo al tuo calamaio, a faccia in giù e impegnato.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Rescuers",
  set: "003",
  cardNumber: 153,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c914737245874c918af51cac073d6d36",
    tcgPlayer: 539100,
  },
  text: [
    {
      title: "TOO OLD TO BE CHASING MICE",
      description:
        "When this character is banished, you may put this card into your inkwell facedown and exerted.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          exerted: true,
          facedown: true,
          source: "this-card",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "1us-1",
      name: "TOO OLD TO BE CHASING MICE",
      text: "TOO OLD TO BE CHASING MICE When this character is banished, you may put this card into your inkwell facedown and exerted.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
