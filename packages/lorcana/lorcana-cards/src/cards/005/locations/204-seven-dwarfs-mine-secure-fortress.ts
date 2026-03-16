import type { LocationCard } from "@tcg/lorcana-types";

export const sevenDwarfsMineSecureFortress: LocationCard = {
  id: "1uO",
  canonicalId: "ci_1uO",
  reprints: ["set5-204"],
  cardType: "location",
  name: "Seven Dwarfs' Mine",
  version: "Secure Fortress",
  i18n: {
    en: {
      name: "Seven Dwarfs' Mine",
      version: "Secure Fortress",
      text: [
        {
          title: "MOUNTAIN DEFENSE",
          description:
            "During your turn, the first time you move a character here, you may deal 1 damage to chosen character. If the moved character is a Knight, deal 2 damage instead.",
        },
      ],
    },
    de: {
      name: "Mine der Sieben Zwerge",
      version: "Sicheres Bollwerk",
      text: [
        {
          title: "GEBIRGSVERTEIDIGUNG",
          description:
            "Jedes erste Mal, wenn einer deiner Charaktere in deinem Zug an diesen Ort bewegt wird, darfst du einem Charakter deiner Wahl 1 Schaden zufügen. Wenn du so einen Ritter bewegt hast, darfst du einem Charakter deiner Wahl stattdessen 2 Schaden zufügen.",
        },
      ],
    },
    fr: {
      name: "Mine des sept Nains",
      version: "Forteresse sécurisée",
      text: [
        {
          title: "DÉFENSE EN MONTAGNE",
          description:
            "Durant votre tour, la première fois que vous déplacez un personnage sur ce lieu, vous pouvez choisir un personnage et lui infliger 1 dommage. Si le personnage déplacé est un Chevalier, infligez 2 dommages à la place.",
        },
      ],
    },
    it: {
      name: "Miniera dei Sette Nani",
      version: "Fortezza Inespugnabile",
      text: [
        {
          title: "DIFESA MONTANA",
          description:
            "Durante il tuo turno, la prima volta che sposti un personaggio in questo luogo, puoi infliggere 1 danno a un personaggio a tua scelta. Se il personaggio spostato è un Cavaliere, infliggi invece 2 danni.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Snow White",
  set: "005",
  cardNumber: 204,
  rarity: "uncommon",
  cost: 2,
  willpower: 6,
  moveCost: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_30df26498319433588a4ee13b1397ea1",
    tcgPlayer: 561853,
  },
  text: [
    {
      title: "MOUNTAIN DEFENSE",
      description:
        "During your turn, the first time you move a character here, you may deal 1 damage to chosen character. If the moved character is a Knight, deal 2 damage instead.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          selfReplacement: {
            condition: {
              type: "trigger-subject-classification",
              classification: "Knight",
            },
            value: 2,
          },
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
      id: "135-1",
      text: "MOUNTAIN DEFENSE During your turn, the first time you move a character here, you may deal 1 damage to chosen character. If the moved character is a Knight, deal 2 damage instead.",
      trigger: {
        event: "move",
        on: "CHARACTERS_HERE",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
          {
            type: "first-time-each-turn",
          },
        ],
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
