import type { CharacterCard } from "@tcg/lorcana-types";

export const cinderellaTheRightOne: CharacterCard = {
  id: "25y",
  canonicalId: "ci_25y",
  reprints: ["set7-015"],
  cardType: "character",
  name: "Cinderella",
  version: "The Right One",
  i18n: {
    en: {
      name: "Cinderella",
      version: "The Right One",
      text: [
        {
          title: "IF THE SLIPPER FITS",
          description:
            "When you play this character, you may put an item card named The Glass Slipper from your discard on the bottom of your deck to gain 3 lore.",
        },
      ],
    },
    de: {
      name: "Cinderella",
      version: "Die Richtige",
      text: [
        {
          title: "WENN DER SCHUH PASST",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du 1 Der-gläserne-Schuh-Gegenstandskarte aus deinem Ablagestapel unter dein Deck legen, um 3 Legenden zu sammeln.",
        },
      ],
    },
    fr: {
      name: "Cendrillon",
      version: "La bonne personne",
      text: [
        {
          title: "SI LA PANTOUFLE EST À SA TAILLE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez placer une carte Objet La Pantoufle de Verre de votre défausse sous votre pioche pour gagner 3 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Cenerentola",
      version: "Quella Giusta",
      text: [
        {
          title: "SE LA SCARPETTA CALZA",
          description:
            "Quando giochi questo personaggio, puoi mettere una carta oggetto chiamata La Scarpetta di Cristallo dai tuoi scarti in fondo al tuo mazzo per ottenere 3 leggenda.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Cinderella",
  set: "007",
  cardNumber: 15,
  rarity: "rare",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7c8e2317de8840ecaa50bffbff20c87d",
    tcgPlayer: 619415,
  },
  text: [
    {
      title: "IF THE SLIPPER FITS",
      description:
        "When you play this character, you may put an item card named The Glass Slipper from your discard on the bottom of your deck to gain 3 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 3,
          type: "gain-lore",
        },
        type: "optional",
      },
      id: "doc-1",
      name: "IF THE SLIPPER FITS",
      text: "IF THE SLIPPER FITS When you play this character, you may put an item card named The Glass Slipper from your discard on the bottom of your deck to gain 3 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
