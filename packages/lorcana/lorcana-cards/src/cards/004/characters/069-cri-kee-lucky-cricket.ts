import type { CharacterCard } from "@tcg/lorcana-types";

export const crikeeLuckyCricket: CharacterCard = {
  id: "pGG",
  canonicalId: "ci_pGG",
  reprints: ["set4-069"],
  cardType: "character",
  name: "Cri-Kee",
  version: "Lucky Cricket",
  i18n: {
    en: {
      name: "Cri-Kee",
      version: "Lucky Cricket",
      text: [
        {
          title: "SPREADING GOOD FORTUNE",
          description: "When you play this character, your other characters get +3 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Kriki",
      version: "Glücksgrille",
      text: [
        {
          title: "GLÜCK BRINGEN",
          description:
            "Wenn du diesen Charakter ausspielst, erhalten deine anderen Charaktere in diesem Zug +3.",
        },
      ],
    },
    fr: {
      name: "Cri-Kee",
      version: "Criquet porte-bonheur",
      text: [
        {
          title: "PROPAGEANT LA BONNE FORTUNE",
          description:
            "Lorsque vous jouez ce personnage, vos autres personnages gagnent +3 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Cri-Cri",
      version: "Grillo Fortunato",
      text: [
        {
          title: "PORTARE FORTUNA",
          description:
            "Quando giochi questo personaggio, i tuoi altri personaggi ricevono +3 per questo turno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 69,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_38b8a802fe784ee286fd81ddc09ea7ec",
    tcgPlayer: 547783,
  },
  text: [
    {
      title: "SPREADING GOOD FORTUNE",
      description: "When you play this character, your other characters get +3 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 3,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "dzo-1",
      name: "SPREADING GOOD FORTUNE",
      text: "SPREADING GOOD FORTUNE When you play this character, your other characters get +3 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
