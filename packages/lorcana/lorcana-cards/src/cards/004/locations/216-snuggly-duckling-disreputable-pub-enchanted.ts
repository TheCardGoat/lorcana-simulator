import type { LocationCard } from "@tcg/lorcana-types";

export const snugglyDucklingDisreputablePubEnchanted: LocationCard = {
  id: "NpZ",
  canonicalId: "ci_0Wx",
  reprints: ["set4-135"],
  cardType: "location",
  name: "Snuggly Duckling",
  version: "Disreputable Pub",
  i18n: {
    en: {
      name: "Snuggly Duckling",
      version: "Disreputable Pub",
      text: [
        {
          title: "ROUTINE RUCKUS",
          description:
            "Whenever a character with 3 {S} or more challenges another character while here, gain 1 lore. If the challenging character has 6 {S} or more, gain 3 lore instead.",
        },
      ],
    },
    de: {
      name: "Zum Quietscheentchen",
      version: "Verrufene Kneipe",
      text: [
        {
          title: "ROUTINIERTER KRAWALL",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort, mit 3 oder mehr, einen anderen Charakter herausfordert, sammelst du 1 Legende. Wenn der herausfordernde Charakter 6 oder mehr hat, sammelst du stattdessen 3 Legenden.",
        },
      ],
    },
    fr: {
      name: "Le Canard Boiteux",
      version: "Taverne malfamée",
      text: [
        {
          title: "REMUE-MÉNAGE ROUTINIER",
          description:
            "Chaque fois qu'un personnage sur ce lieu avec 3 ou plus en défie un autre, gagnez 1 éclat de Lore. Si le personnage qui défie a 6 ou plus, gagnez 3 éclats de Lore à la place.",
        },
      ],
    },
    it: {
      name: "Il Bell'Anatroccolo",
      version: "Pub Poco Raccomandabile",
      text: [
        {
          title: "TRAMBUSTO QUOTIDIANO",
          description:
            "Ogni volta che un personaggio con 3 o superiore sfida un altro personaggio mentre si trova in questo luogo, ottieni 1 leggenda. Se il personaggio sfidante ha 6 o superiore, ottieni invece 3 leggenda.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Tangled",
  set: "004",
  cardNumber: 216,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 2,
  willpower: 9,
  moveCost: 2,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_016db7e8b21348aca4b407fb6d2ce26d",
    tcgPlayer: 550838,
  },
  text: [
    {
      title: "ROUTINE RUCKUS",
      description:
        "Whenever a character with 3 {S} or more challenges another character while here, gain 1 lore. If the challenging character has 6 {S} or more, gain 3 lore instead.",
    },
  ],
  abilities: [
    {
      effect: {
        amount: 1,
        selfReplacement: {
          condition: {
            type: "trigger-subject-strength-gte",
            value: 6,
          },
          value: 3,
        },
        type: "gain-lore",
      },
      id: "1o0-1",
      name: "ROUTINE RUCKUS",
      text: "ROUTINE RUCKUS Whenever a character with 3 {S} or more challenges another character while here, gain 1 lore. If the challenging character has 6 {S} or more, gain 3 lore instead.",
      trigger: {
        event: "challenge",
        on: {
          cardType: "character",
          controller: "any",
          filters: [
            {
              type: "strength-comparison",
              comparison: "greater-or-equal",
              value: 3,
            },
            {
              type: "at-location",
              location: "this",
            },
          ],
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
