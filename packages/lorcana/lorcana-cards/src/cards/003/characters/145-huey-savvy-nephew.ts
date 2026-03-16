import type { CharacterCard } from "@tcg/lorcana-types";

export const hueySavvyNephew: CharacterCard = {
  id: "iYO",
  canonicalId: "ci_Qsl",
  reprints: ["set3-145", "set9-138"],
  cardType: "character",
  name: "Huey",
  version: "Savvy Nephew",
  i18n: {
    en: {
      name: "Huey",
      version: "Savvy Nephew",
      text: [
        {
          title: "Support",
        },
        {
          title: "THREE NEPHEWS",
          description:
            "Whenever this character quests, if you have characters named Dewey and Louie in play, you may draw 3 cards.",
        },
      ],
    },
    de: {
      name: "Tick Duck",
      version: "Gerissener Neffe",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.) DIE DREI NEFFEN Jedes Mal, wenn dieser Charakter erkundet und du einen Trick-Charakter und einen Track-Charakter im Spiel hast, darfst du 3 Karten ziehen.",
    },
    fr: {
      name: "Riri",
      version: "Neveu astucieux",
      text: "Soutien TROIS NEVEUX Chaque fois que ce personnage est envoyé à l'aventure, vous pouvez piocher 3 cartes si vous avez au moins un personnage Fifi et un personnage Loulou en jeu.",
    },
    it: {
      name: "Qui",
      version: "Nipote Esperto",
      text: "Aiutante TRE NIPOTI Ogni volta che questo personaggio va all'avventura, se hai personaggi chiamati Quo e Qua in gioco, puoi pescare 3 carte.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Ducktales",
  set: "003",
  cardNumber: 145,
  rarity: "rare",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5008e2e0ceb04bb9878d2590c92b32ee",
    tcgPlayer: 650073,
  },
  text: [
    {
      title: "Support",
    },
    {
      title: "THREE NEPHEWS",
      description:
        "Whenever this character quests, if you have characters named Dewey and Louie in play, you may draw 3 cards.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      id: "aka-1",
      keyword: "Support",
      text: "Support",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          expression: "you have characters named Dewey and Louie in play",
          type: "if",
        },
        then: {
          amount: 3,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "conditional",
      },
      id: "aka-2",
      name: "THREE NEPHEWS",
      text: "THREE NEPHEWS Whenever this character quests, if you have characters named Dewey and Louie in play, you may draw 3 cards.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
