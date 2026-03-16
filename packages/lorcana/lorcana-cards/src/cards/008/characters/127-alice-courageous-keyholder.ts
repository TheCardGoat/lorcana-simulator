import type { CharacterCard } from "@tcg/lorcana-types";

export const aliceCourageousKeyholder: CharacterCard = {
  id: "x8u",
  canonicalId: "ci_x8u",
  reprints: ["set8-127"],
  cardType: "character",
  name: "Alice",
  version: "Courageous Keyholder",
  i18n: {
    en: {
      name: "Alice",
      version: "Courageous Keyholder",
      text: [
        {
          title: "THIS WAY OUT",
          description:
            "When you play this character, you may ready chosen damaged character of yours. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Alice",
      version: "Mutige Schlüsselträgerin",
      text: [
        {
          title: "HIERLANG GEHT'S RAUS",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen deiner beschädigten Charaktere bereit machen. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "Alice",
      version: "Courageuse porteuse de clé",
      text: [
        {
          title: "PAR ICI LA SORTIE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir l'un de vos personnages avec un dommage ou plus et le redresser. Ce personnage ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Alice",
      version: "Coraggiosa Custode della Chiave",
      text: [
        {
          title: "DA QUESTA PARTE",
          description:
            "Quando giochi questo personaggio, puoi preparare un tuo personaggio danneggiato a tua scelta. Non può andare all'avventura per il resto di questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Alice in Wonderland",
  set: "008",
  cardNumber: 127,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_4269fd204f144eb4b5044df82a899bd1",
    tcgPlayer: 631433,
  },
  text: [
    {
      title: "THIS WAY OUT",
      description:
        "When you play this character, you may ready chosen damaged character of yours. They can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          duration: "this-turn",
          restriction: "cant-quest",
          target: "SELF",
          type: "restriction",
        },
        type: "optional",
      },
      id: "65f-1",
      name: "THIS WAY OUT",
      text: "THIS WAY OUT When you play this character, you may ready chosen damaged character of yours. They can't quest for the rest of this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
