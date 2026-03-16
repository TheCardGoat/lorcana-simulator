import type { CharacterCard } from "@tcg/lorcana-types";

export const hadesFastTalker: CharacterCard = {
  id: "Ubd",
  canonicalId: "ci_Ubd",
  reprints: ["set7-052"],
  cardType: "character",
  name: "Hades",
  version: "Fast Talker",
  i18n: {
    en: {
      name: "Hades",
      version: "Fast Talker",
      text: [
        {
          title: "FOR JUST A LITTLE PAIN",
          description:
            "When you play this character, you may deal 2 damage to another chosen character of yours to banish chosen character with cost 3 or less.",
        },
      ],
    },
    de: {
      name: "Hades",
      version: "Meister im Schnellsprechen",
      text: [
        {
          title: "AUCH WENN'S DIR LEID SCHAFFT",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du einen deiner Charaktere wählen und ihm 2 Schaden zufügen, um einen Charakter deiner Wahl, der 3 oder weniger kostet, zu verbannen.",
        },
      ],
    },
    fr: {
      name: "Hadès",
      version: "Débit d’enfer",
      text: [
        {
          title: "CONTRE UN TOUT PETIT SUPPLICE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un autre de vos personnages et lui infliger 2 dommages. Si vous le faites, choisissez un personnage coûtant 3 ou moins et bannissez-le.",
        },
      ],
    },
    it: {
      name: "Ade",
      version: "Dalla Parlantina Veloce",
      text: [
        {
          title: "CON SOLO UN PO' DI DOLORE",
          description:
            "Quando giochi questo personaggio, puoi infliggere 2 danni a un tuo altro personaggio a tua scelta per esiliare un personaggio a tua scelta con costo 3 o inferiore.",
        },
      ],
    },
  },
  inkType: ["amethyst", "ruby"],
  franchise: "Hercules",
  set: "007",
  cardNumber: 52,
  rarity: "rare",
  cost: 6,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5dd4b7c75d134e76998535e1f8ec6b6c",
    tcgPlayer: 618133,
  },
  text: [
    {
      title: "FOR JUST A LITTLE PAIN",
      description:
        "When you play this character, you may deal 2 damage to another chosen character of yours to banish chosen character with cost 3 or less.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Deity"],
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
          type: "deal-damage",
        },
        type: "optional",
      },
      id: "1px-1",
      name: "FOR JUST A LITTLE PAIN",
      text: "FOR JUST A LITTLE PAIN When you play this character, you may deal 2 damage to another chosen character of yours to banish chosen character with cost 3 or less.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
