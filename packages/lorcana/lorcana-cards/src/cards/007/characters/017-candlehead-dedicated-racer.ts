import type { CharacterCard } from "@tcg/lorcana-types";

export const candleheadDedicatedRacer: CharacterCard = {
  id: "isc",
  canonicalId: "ci_isc",
  reprints: ["set7-017"],
  cardType: "character",
  name: "Candlehead",
  version: "Dedicated Racer",
  i18n: {
    en: {
      name: "Candlehead",
      version: "Dedicated Racer",
      text: [
        {
          title: "WINNING ISN'T EVERYTHING",
          description:
            "When this character is banished, you may remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Candlehead",
      version: "Engagierte Rennfahrerin",
      text: [
        {
          title: "GEWINNEN IST NICHT ALLES",
          description:
            "Wenn dieser Charakter verbannt wird, darfst du bis zu 2 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Adèle Machandelle",
      version: "Pilote passionnée",
      text: [
        {
          title: "LA VICTOIRE NE FAIT PAS TOUT",
          description:
            "Lorsque ce personnage est banni, vous pouvez choisir un personnage et lui retirer jusqu'à 2 dommages.",
        },
      ],
    },
    it: {
      name: "Candlehead",
      version: "Pilota Altruista",
      text: [
        {
          title: "VINCERE NON È TUTTO",
          description:
            "Quando questo personaggio viene esiliato, puoi rimuovere fino a 2 danni da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Wreck It Ralph",
  set: "007",
  cardNumber: 17,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_71551dd2d3334d509ce2f72fb84bd5fe",
    tcgPlayer: 618717,
  },
  text: [
    {
      title: "WINNING ISN'T EVERYTHING",
      description:
        "When this character is banished, you may remove up to 2 damage from chosen character.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Racer"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "w07-1",
      name: "WINNING ISN'T EVERYTHING",
      text: "WINNING ISN'T EVERYTHING When this character is banished, you may remove up to 2 damage from chosen character.",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
