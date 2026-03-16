import type { CharacterCard } from "@tcg/lorcana-types";

export const flynnRiderCharmingRogue: CharacterCard = {
  id: "a9K",
  canonicalId: "ci_a9K",
  reprints: ["set1-074"],
  cardType: "character",
  name: "Flynn Rider",
  version: "Charming Rogue",
  i18n: {
    en: {
      name: "Flynn Rider",
      version: "Charming Rogue",
      text: [
        {
          title: "HERE COMES THE SMOLDER",
          description:
            "Whenever this character is challenged, the challenging player chooses and discards a card.",
        },
      ],
    },
    de: {
      name: "Flynn Rider",
      version: "Charmanter Gauner",
      text: [
        {
          title: "WER KANN HIERZU SCHON NEIN SAGEN?",
          description:
            "Jedes Mal, wenn dieser Charakter herausgefordert wird, wählt die herausfordernde Person 1 Karte aus ihrer Hand und wirft sie ab.",
        },
      ],
    },
    fr: {
      name: "FLYNN RIDER",
      version: "Charmant voleur",
      text: [
        {
          title: "LE GRAND JEU",
          description:
            "Chaque fois que ce personnage est défié, le joueur qui a lancé le défi choisit et défausse une de ses cartes.",
        },
      ],
    },
    it: {
      name: "Flynn Rider",
      version: "Charming Rogue",
      text: [
        {
          title: "HERE COMES THE SMOLDER",
          description:
            "Whenever this character is challenged, the challenging player chooses and discards a card.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Tangled",
  set: "001",
  cardNumber: 74,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_c0742f7731e04b749870bceb5c6b133b",
    tcgPlayer: 506833,
  },
  text: [
    {
      title: "HERE COMES THE SMOLDER",
      description:
        "Whenever this character is challenged, the challenging player chooses and discards a card.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      effect: {
        amount: 1,
        chosen: true,
        target: "CONTROLLER",
        type: "discard",
      },
      id: "qk8-1",
      name: "HERE COMES THE SMOLDER",
      text: "HERE COMES THE SMOLDER Whenever this character is challenged, the challenging player chooses and discards a card.",
      trigger: {
        event: "challenged",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
