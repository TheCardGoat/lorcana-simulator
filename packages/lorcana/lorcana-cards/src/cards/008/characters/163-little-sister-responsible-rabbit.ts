import type { CharacterCard } from "@tcg/lorcana-types";

export const littleSisterResponsibleRabbit: CharacterCard = {
  id: "gBt",
  canonicalId: "ci_gBt",
  reprints: ["set8-163"],
  cardType: "character",
  name: "Little Sister",
  version: "Responsible Rabbit",
  i18n: {
    en: {
      name: "Little Sister",
      version: "Responsible Rabbit",
      text: [
        {
          title: "LET ME HELP",
          description:
            "When you play this character, you may remove up to 1 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Kleine Schwester",
      version: "Verantwortungsvolles Kaninchen",
      text: [
        {
          title: "LASS MICH HELFEN",
          description:
            "Wenn du diesen Charakter ausspielst, darfst du bis zu 1 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Soeur de Bobby",
      version: "Lapine responsable",
      text: [
        {
          title: "LAISSEZ-MOI VOUS AIDER",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez choisir un personnage et lui retirer jusqu'à 1 dommage.",
        },
      ],
    },
    it: {
      name: "Sorellina",
      version: "Coniglietta Responsabile",
      text: [
        {
          title: "LASCIA CHE TI AIUTI",
          description:
            "Quando giochi questo personaggio, puoi rimuovere fino a 1 danno da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Robin Hood",
  set: "008",
  cardNumber: 163,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_fe47a07a0f14415284cb6ad8cbdd190e",
    tcgPlayer: 631460,
  },
  text: [
    {
      title: "LET ME HELP",
      description:
        "When you play this character, you may remove up to 1 damage from chosen character.",
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
      id: "g97-1",
      name: "LET ME HELP",
      text: "LET ME HELP When you play this character, you may remove up to 1 damage from chosen character.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
