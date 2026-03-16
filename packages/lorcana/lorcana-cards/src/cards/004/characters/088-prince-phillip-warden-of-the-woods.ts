import type { CharacterCard } from "@tcg/lorcana-types";

export const princePhillipWardenOfTheWoods: CharacterCard = {
  id: "vCW",
  canonicalId: "ci_eM1",
  reprints: ["set4-088", "set9-072"],
  cardType: "character",
  name: "Prince Phillip",
  version: "Warden of the Woods",
  i18n: {
    en: {
      name: "Prince Phillip",
      version: "Warden of the Woods",
      text: [
        {
          title: "SHINING BEACON",
          description: "Your other Hero characters gain Ward.",
        },
      ],
    },
    de: {
      name: "Prinz Phillip",
      version: "Hüter des Waldes",
      text: [
        {
          title: "STRAHLENDES LEUCHTFEUER",
          description:
            "Deine anderen Heldinnen und Helden erhalten Behütet. (Gegnerische Karten können diese Charaktere nicht auswählen, außer um sie herauszufordern.)",
        },
      ],
    },
    fr: {
      name: "Prince Philippe",
      version: "Gardien de la forêt",
      text: [
        {
          title: "FLAMBEAU RAYONNANT",
          description:
            "Vos autres personnages Héros gagnent Hors d'atteinte. (Les adversaires ne peuvent pas choisir ces personnages, hormis pour un défi.)",
        },
      ],
    },
    it: {
      name: "Principe Filippo",
      version: "Guardiano delle Foreste",
      text: [
        {
          title: "FARO SPLENDENTE I",
          description:
            "tuoi altri personaggi Eroe ottengono Protetto. (Gli avversari non possono sceglierli se non per sfidarli.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Sleeping Beauty",
  set: "004",
  cardNumber: 88,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_330073fee4914065839565db68acf025",
    tcgPlayer: 650014,
  },
  text: [
    {
      title: "SHINING BEACON",
      description: "Your other Hero characters gain Ward.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Prince"],
  abilities: [
    {
      effect: {
        keyword: "Ward",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "1kf-1",
      name: "SHINING BEACON Your other Hero",
      text: "SHINING BEACON Your other Hero characters gain Ward.",
      type: "static",
    },
  ],
};
