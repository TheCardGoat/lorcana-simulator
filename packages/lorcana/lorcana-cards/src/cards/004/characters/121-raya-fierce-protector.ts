import type { CharacterCard } from "@tcg/lorcana-types";

export const rayaFierceProtector: CharacterCard = {
  id: "l0K",
  canonicalId: "ci_l0K",
  reprints: ["set4-121"],
  cardType: "character",
  name: "Raya",
  version: "Fierce Protector",
  i18n: {
    en: {
      name: "Raya",
      version: "Fierce Protector",
      text: [
        {
          title: "DON'T CROSS ME",
          description:
            "Whenever this character challenges another character, gain 1 lore for each other damaged character you have in play.",
        },
      ],
    },
    de: {
      name: "Raya",
      version: "Treue Beschützerin",
      text: [
        {
          title: "KOMM MIR NICHT IN DIE QUERE",
          description:
            "Jedes Mal, wenn dieser Charakter einen anderen Charakter herausfordert, sammelst du 1 Legende für jeden deiner anderen Charaktere, der beschädigt ist.",
        },
      ],
    },
    fr: {
      name: "Raya",
      version: "Protectrice acharnée",
      text: [
        {
          title: "NE ME CONTRARIEZ PAS",
          description:
            "Chaque fois que ce personnage en défie un autre, gagnez 1 éclat de Lore pour chaque autre personnage que vous avez en jeu ayant au moins un jeton Dommage.",
        },
      ],
    },
    it: {
      name: "Raya",
      version: "Protettrice Feroce",
      text: [
        {
          title: "NON PROVOCARMI",
          description:
            "Ogni volta che questo personaggio sfida un altro personaggio, ottieni 1 leggenda per ogni altro personaggio danneggiato che hai in gioco.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "004",
  cardNumber: 121,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e79d0ba09f4342b5a7a3ffe96ebef508",
    tcgPlayer: 550598,
  },
  text: [
    {
      title: "DON'T CROSS ME",
      description:
        "Whenever this character challenges another character, gain 1 lore for each other damaged character you have in play.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "arj-1",
      name: "DON'T CROSS ME",
      text: "DON'T CROSS ME Whenever this character challenges another character, gain 1 lore for each other damaged character you have in play.",
      trigger: {
        event: "challenge",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
