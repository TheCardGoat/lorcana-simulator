import type { CharacterCard } from "@tcg/lorcana-types";

export const kenaiProtectiveBrother: CharacterCard = {
  id: "k5M",
  canonicalId: "ci_k5M",
  reprints: ["set7-030"],
  cardType: "character",
  name: "Kenai",
  version: "Protective Brother",
  i18n: {
    en: {
      name: "Kenai",
      version: "Protective Brother",
      text: [
        {
          title: "HE NEEDS ME",
          description:
            "At the end of your turn, if this character is exerted, you may ready another chosen character of yours and remove all damage from them.",
        },
      ],
    },
    de: {
      name: "Kenai",
      version: "Beschützender Bruder",
      text: [
        {
          title: "ER BRAUCHT MICH",
          description:
            "Am Ende deines Zuges, falls dieser Charakter erschöpft ist, darfst du einen deiner anderen Charaktere wählen. Mache ihn bereit und entferne jeglichen Schaden von ihm.",
        },
      ],
    },
    fr: {
      name: "Kinaï",
      version: "Frère protecteur",
      text: [
        {
          title: "IL A BESOIN DE MOI À",
          description:
            "la fin de votre tour, si ce personnage est épuisé, vous pouvez choisir un autre de vos personnages. Redressez-le et retirez-lui tous ses dommages.",
        },
      ],
    },
    it: {
      name: "Kenai",
      version: "Fratello Protettivo",
      text: [
        {
          title: "HA BISOGNO DI ME",
          description:
            "Alla fine del tuo turno, se questo personaggio è impegnato, puoi preparare un tuo altro personaggio a tua scelta e rimuovere tutti i danni da esso.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Brother Bear",
  set: "007",
  cardNumber: 30,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_11827c57989a4d9c961b1c5b08c42945",
    tcgPlayer: 619423,
  },
  text: [
    {
      title: "HE NEEDS ME",
      description:
        "At the end of your turn, if this character is exerted, you may ready another chosen character of yours and remove all damage from them.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "ready",
        },
        type: "optional",
      },
      id: "eiu-1",
      text: "HE NEEDS ME At the end of your turn, if this character is exerted, you may ready another chosen character of yours and remove all damage from them.",
      type: "action",
    },
  ],
};
