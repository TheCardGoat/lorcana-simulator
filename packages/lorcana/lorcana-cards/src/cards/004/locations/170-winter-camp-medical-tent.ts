import type { LocationCard } from "@tcg/lorcana-types";

export const winterCampMedicalTent: LocationCard = {
  id: "oLN",
  canonicalId: "ci_oLN",
  reprints: ["set4-170"],
  cardType: "location",
  name: "Winter Camp",
  version: "Medical Tent",
  i18n: {
    en: {
      name: "Winter Camp",
      version: "Medical Tent",
      text: [
        {
          title: "HELP THE WOUNDED",
          description:
            "Whenever a character quests while here, remove up to 2 damage from them. If they're a Hero character, remove up to 4 damage instead.",
        },
      ],
    },
    de: {
      name: "Winter-Camp",
      version: "Sanitätszelt",
      text: [
        {
          title: "DEN VERWUNDETEN HELFEN",
          description:
            "Jedes Mal, wenn einer deiner Charaktere an diesem Ort erkundet, entferne bis zu 2 Schaden von ihm. Wenn es ein Held oder eine Heldin ist, entferne stattdessen bis zu 4 Schaden.",
        },
      ],
    },
    fr: {
      name: "Camp d'Hiver",
      version: "Tente médicale",
      text: [
        {
          title: "ASSISTANCE AUX BLESSÉS",
          description:
            "Chaque fois qu'un personnage sur ce lieu est envoyé à l'aventure, retirez-lui jusqu'à 2 jetons Dommage. Si c'est un personnage Héros, retirez-lui jusqu'à 4 jetons Dommage à la place.",
        },
      ],
    },
    it: {
      name: "Accampamento Invernale",
      version: "Tenda Medica",
      text: [
        {
          title: "AIUTARE I FERITI",
          description:
            "Ogni volta che un personaggio va all'avventura mentre si trova in questo luogo, rimuovi fino a 2 danni da quel personaggio. Se è un personaggio Eroe, rimuovi invece fino a 4 danni.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 170,
  rarity: "common",
  cost: 3,
  willpower: 8,
  moveCost: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0d7681a6ac944b5aa5606946cff8ebd5",
    tcgPlayer: 550616,
  },
  text: [
    {
      title: "HELP THE WOUNDED",
      description:
        "Whenever a character quests while here, remove up to 2 damage from them. If they're a Hero character, remove up to 4 damage instead.",
    },
  ],
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            amount: 2,
            target: {
              selector: "all",
              count: 1,
              reference: "trigger-subject",
            },
            type: "remove-damage",
            upTo: true,
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "all",
                reference: "trigger-subject",
                cardType: "character",
                filters: [
                  {
                    type: "has-classification",
                    classification: "Hero",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            then: {
              amount: 2,
              target: {
                selector: "all",
                count: 1,
                reference: "trigger-subject",
              },
              type: "remove-damage",
              upTo: true,
            },
          },
        ],
      },
      id: "129-1",
      name: "HELP THE WOUNDED",
      text: "HELP THE WOUNDED Whenever a character quests while here, remove up to 2 damage from them. If they're a Hero character, remove up to 4 damage instead.",
      trigger: {
        event: "quest",
        on: "CHARACTER_HERE",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
