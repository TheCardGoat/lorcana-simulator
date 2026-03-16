import type { CharacterCard } from "@tcg/lorcana-types";

export const rooLittlestPirate: CharacterCard = {
  id: "JPo",
  canonicalId: "ci_JPo",
  reprints: ["set6-023"],
  cardType: "character",
  name: "Roo",
  version: "Littlest Pirate",
  i18n: {
    en: {
      name: "Roo",
      version: "Littlest Pirate",
      text: [
        {
          title: "I'M A PIRATE TOO!",
          description:
            "When you play this character, you may give chosen character -2 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Ruh",
      version: "Jüngster Pirat",
      text: [
        {
          title: "ICH BIN AUCH EIN PIRAT!",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einem Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -2 geben.",
        },
      ],
    },
    fr: {
      name: "Petit Gourou",
      version: "Le plus petit des pirates",
      text: [
        {
          title: "MOI AUSSI, J'SUIS UN PIRATE!",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage qui subit -2 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Ro",
      version: "Piccolissimo Pirata",
      text: [
        {
          title: "ANCHE IO SONO UN PIRATA!",
          description:
            "Quando giochi questo personaggio, puoi dare a un personaggio a tua scelta -2 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Winnie the Pooh",
  set: "006",
  cardNumber: 23,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8497d60197bd451c91b4c2468f85b156",
    tcgPlayer: 587967,
  },
  text: [
    {
      title: "I'M A PIRATE TOO!",
      description:
        "When you play this character, you may give chosen character -2 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Pirate"],
  abilities: [
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "q64-1",
      name: "I'M A PIRATE TOO!",
      text: "I'M A PIRATE TOO! When you play this character, you may give chosen character -2 {S} until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
