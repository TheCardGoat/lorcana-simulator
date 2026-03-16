import type { CharacterCard } from "@tcg/lorcana-types";

export const boltHeadstrongDog: CharacterCard = {
  id: "MIh",
  canonicalId: "ci_MIh",
  reprints: ["set7-184"],
  cardType: "character",
  name: "Bolt",
  version: "Headstrong Dog",
  i18n: {
    en: {
      name: "Bolt",
      version: "Headstrong Dog",
      text: [
        {
          title: "THERE'S NO TURNING BACK",
          description:
            "Whenever this character quests, if he has no damage, you may draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Bolt",
      version: "Starrköpfiger Hund",
      text: [
        {
          title: "ES GIBT KEIN ZURÜCK",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, falls er unbeschädigt ist, darfst du 1 Karte ziehen. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "Volt",
      version: "Chien obstiné",
      text: [
        {
          title: "LA ROUTE SERA LONGUE",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure, s'il n'a aucun dommage, vous pouvez piocher une carte puis en défausser une.",
        },
      ],
    },
    it: {
      name: "Bolt",
      version: "Cane Caparbio",
      text: [
        {
          title: "NON SI PUÒ TORNARE INDIETRO",
          description:
            "Ogni volta che questo personaggio va all'avventura, se non ha danno, puoi pescare una carta, poi scegli e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Bolt",
  set: "007",
  cardNumber: 184,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b6cecef16e364dc6bbc9b538aaa52226",
    tcgPlayer: 618158,
  },
  text: [
    {
      title: "THERE'S NO TURNING BACK",
      description:
        "Whenever this character quests, if he has no damage, you may draw a card, then choose and discard a card.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "he has no damage",
          type: "if",
        },
        then: {
          amount: 1,
          chosen: true,
          target: "CONTROLLER",
          type: "discard",
        },
        type: "conditional",
      },
      id: "131-1",
      name: "THERE'S NO TURNING BACK",
      text: "THERE'S NO TURNING BACK Whenever this character quests, if he has no damage, you may draw a card, then choose and discard a card.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
