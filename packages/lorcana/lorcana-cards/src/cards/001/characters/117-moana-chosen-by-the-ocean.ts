import type { CharacterCard } from "@tcg/lorcana-types";

export const moanaChosenByTheOcean: CharacterCard = {
  id: "c4p",
  canonicalId: "ci_c4p",
  reprints: ["set1-117"],
  cardType: "character",
  name: "Moana",
  version: "Chosen by the Ocean",
  i18n: {
    en: {
      name: "Moana",
      version: "Chosen by the Ocean",
      text: [
        {
          title: "THIS IS NOT WHO YOU ARE",
          description: "When you play this character, you may banish chosen character named Te Kā.",
        },
      ],
    },
    de: {
      name: "Vaiana",
      version: "Vom Ozean auserwählt",
      text: [
        {
          title: "DU BIST NICHT, WAS MAN SIEHT",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen Te-Kā-Charakter deiner Wahl verbannen.",
        },
      ],
    },
    fr: {
      name: "VAIANA",
      version: "Choisie par l'Océan",
      text: [
        {
          title: "MOI, JE SAIS QUI TU ES",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage Te Kā et le bannir.",
        },
      ],
    },
    it: {
      name: "Moana",
      version: "Chosen by the Ocean",
      text: [
        {
          title: "THIS IS NOT WHO YOU ARE",
          description: "When you play this character, you may banish chosen character named Te Kā.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "001",
  cardNumber: 117,
  rarity: "uncommon",
  cost: 5,
  strength: 2,
  willpower: 6,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_49b96ca319434f588d5d36b30597c832",
    tcgPlayer: 508786,
  },
  text: [
    {
      title: "THIS IS NOT WHO YOU ARE",
      description: "When you play this character, you may banish chosen character named Te Kā.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "banish",
        },
        type: "optional",
      },
      id: "176-1",
      name: "THIS IS NOT WHO YOU ARE",
      text: "THIS IS NOT WHO YOU ARE When you play this character, you may banish chosen character named Te Kā.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
