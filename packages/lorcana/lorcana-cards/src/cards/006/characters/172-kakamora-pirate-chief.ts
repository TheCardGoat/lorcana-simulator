import type { CharacterCard } from "@tcg/lorcana-types";

export const kakamoraPirateChief: CharacterCard = {
  id: "2pj",
  canonicalId: "ci_2pj",
  reprints: ["set6-172"],
  cardType: "character",
  name: "Kakamora",
  version: "Pirate Chief",
  i18n: {
    en: {
      name: "Kakamora",
      version: "Pirate Chief",
      text: [
        {
          title: "COCONUT LEADER",
          description:
            "Whenever this character quests, you may draw a card. Then, choose and discard a card to deal 1 damage to chosen character or location. If a Pirate character card was discarded, deal 3 damage to that character or location instead.",
        },
      ],
    },
    de: {
      name: "Kokomora",
      version: "Piraten-Häuptling",
      text: [
        {
          title: "KOKOSNUSS-ANFÜHRER",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, darfst du 1 Karte ziehen. Wähle danach 1 Karte aus deiner Hand und wirf sie ab, um einem Charakter oder Ort deiner Wahl 1 Schaden zuzufügen. Wenn du so einen Piraten abgeworfen hast, füge dem Charakter oder Ort deiner Wahl stattdessen 3 Schaden zu.",
        },
      ],
    },
    fr: {
      name: "Kakamora",
      version: "Chef pirate",
      text: [
        {
          title: "À LA TÊTE DES NOIX DE COCO",
          description:
            "Chaque fois que ce personnage est envoyé à l'aventure,vous pouvez piocher une carte puis défausser une carte. Si vous le faites, choisissez un personnage ou un lieu et infligez-lui 1 dommage. Si vous avez défaussé un personnage Pirate de cette façon, infligez 3 dommages à la place.",
        },
      ],
    },
    it: {
      name: "Kakamora",
      version: "Capo Pirata",
      text: [
        {
          title: "CAPO NOCE DI COCCO",
          description:
            "Ogni volta che questo personaggio va all'avventura, puoi pescare una carta, poi scegli e scarta una carta per infliggere 1 danno a un personaggio o a un luogo a tua scelta. Se hai scartato una carta personaggio Pirata, infliggi invece 3 danni.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Moana",
  set: "006",
  cardNumber: 172,
  rarity: "rare",
  cost: 7,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_af36de00a5544c83989f3295612c0bbf",
    tcgPlayer: 593018,
  },
  text: [
    {
      title: "COCONUT LEADER",
      description:
        "Whenever this character quests, you may draw a card. Then, choose and discard a card to deal 1 damage to chosen character or location. If a Pirate character card was discarded, deal 3 damage to that character or location instead.",
    },
  ],
  classifications: ["Storyborn", "Pirate", "Captain"],
  abilities: [
    {
      effect: {
        optionLabels: [
          "you may draw a card. Then, choose and discard a card to deal 1 damage to chosen character",
          "location. If a Pirate character card was discarded, deal 3 damage to that character",
        ],
        options: [
          {
            amount: 1,
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "deal-damage",
          },
          {
            amount: 3,
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "deal-damage",
          },
        ],
        type: "choice",
      },
      id: "15x-1",
      name: "COCONUT LEADER",
      text: "COCONUT LEADER Whenever this character quests, you may draw a card. Then, choose and discard a card to deal 1 damage to chosen character or location. If a Pirate character card was discarded, deal 3 damage to that character or location instead.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
