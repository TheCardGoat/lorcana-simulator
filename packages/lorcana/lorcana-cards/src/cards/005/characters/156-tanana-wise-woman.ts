import type { CharacterCard } from "@tcg/lorcana-types";

export const tananaWiseWoman: CharacterCard = {
  id: "PPy",
  canonicalId: "ci_PPy",
  reprints: ["set5-156"],
  cardType: "character",
  name: "Tanana",
  version: "Wise Woman",
  i18n: {
    en: {
      name: "Tanana",
      version: "Wise Woman",
      text: [
        {
          title: "YOUR BROTHERS NEED GUIDANCE",
          description:
            "When you play this character, you may remove up to 1 damage from chosen character or location.",
        },
      ],
    },
    de: {
      name: "Tanana",
      version: "Weise Frau",
      text: [
        {
          title: "DEINE BRÜDER BEDÜRFEN DEINER FÜHRUNG",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du bis zu 1 Schaden von einem Charakter oder Ort deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Nanaka",
      version: "Femme avisée",
      text: [
        {
          title: "TES FRÈRES ONT BESOIN D'ÊTRE GUIDÉS",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage ou un lieu et lui retirer jusqu'à 1 dommage.",
        },
      ],
    },
    it: {
      name: "Tanana",
      version: "Saggia Donna",
      text: [
        {
          title: "I TUOI FRATELLI HANNO BISOGNO DELLA TUA GUIDA",
          description:
            "Quando giochi questo personaggio, puoi rimuovere fino a 1 danno da un personaggio o da un luogo a tua scelta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Brother Bear",
  set: "005",
  cardNumber: 156,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6746b8da59f742ad83ff79efdcbe35a7",
    tcgPlayer: 560493,
  },
  text: [
    {
      title: "YOUR BROTHERS NEED GUIDANCE",
      description:
        "When you play this character, you may remove up to 1 damage from chosen character or location.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
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
      id: "1b7-1",
      name: "YOUR BROTHERS NEED GUIDANCE",
      text: "YOUR BROTHERS NEED GUIDANCE When you play this character, you may remove up to 1 damage from chosen character or location.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
