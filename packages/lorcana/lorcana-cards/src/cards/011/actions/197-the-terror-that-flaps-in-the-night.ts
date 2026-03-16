import type { ActionCard } from "@tcg/lorcana-types";

export const theTerrorThatFlapsInTheNight: ActionCard = {
  id: "Jrb",
  canonicalId: "ci_Jrb",
  reprints: ["set11-197"],
  cardType: "action",
  name: "The Terror That Flaps in the Night",
  i18n: {
    en: {
      name: "The Terror That Flaps in the Night",
      text: "Deal 2 damage to chosen opposing character. If you have a character named Darkwing Duck in play, deal 3 damage instead.",
    },
    de: {
      name: "Der Schrecken in der Nacht",
      text: "Füge einem gegnerischen Charakter deiner Wahl 2 Schaden zu. Falls du einen Darkwing-Duck-Charakter im Spiel hast, füge dem gewählten Charakter stattdessen 3 Schaden zu.",
    },
    fr: {
      name: "La terreur qui corrige les erreurs",
      text: "Choisissez un personnage adverse et infligez-lui 2 dommages. Si vous avez un personnage Myster Mask en jeu, infligez 3 dommages à la place.",
    },
    it: {
      name: "Il Terrore che Svolazza nella Notte",
      text: "Infliggi 2 danni a un personaggio avversario a tua scelta. Se hai in gioco un personaggio chiamato Darkwing Duck, infliggi invece 3 danni.",
    },
  },
  inkType: ["steel"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 197,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e615766ea0d647aba10803d596d3adb7",
    tcgPlayer: 677141,
  },
  text: "Deal 2 damage to chosen opposing character. If you have a character named Darkwing Duck in play, deal 3 damage instead.",
  abilities: [
    {
      type: "action",
      text: "Deal 2 damage to chosen opposing character. If you have a character named Darkwing Duck in play, deal 3 damage instead.",
      effect: {
        type: "conditional",
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            filters: [
              {
                type: "name",
                equals: "Darkwing Duck",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          type: "deal-damage",
          amount: 3,
          target: "CHOSEN_OPPOSING_CHARACTER",
        },
        else: {
          type: "deal-damage",
          amount: 2,
          target: "CHOSEN_OPPOSING_CHARACTER",
        },
      },
    },
  ],
};
