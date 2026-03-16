import type { CharacterCard } from "@tcg/lorcana-types";

export const fairyGodmotherMysticArmorer: CharacterCard = {
  id: "1WY",
  canonicalId: "ci_1WY",
  reprints: ["set2-041"],
  cardType: "character",
  name: "Fairy Godmother",
  version: "Mystic Armorer",
  i18n: {
    en: {
      name: "Fairy Godmother",
      version: "Mystic Armorer",
      text: [
        {
          title: "Shift 2",
        },
        {
          title: "FORGET THE COACH, HERE'S A SWORD",
          description:
            'Whenever this character quests, your characters gain Challenger +3 and "When this character is banished in a challenge, return this card to your hand" this turn. (They get +3 {S} while challenging.)',
        },
      ],
    },
    de: {
      name: "Gute Fee",
      version: "Magische Waffenschmiedin",
      text: 'Gestaltwandel 2 VERGISS DIE KUTSCHE, NIMM EIN SCHWERT Jedes Mal, wenn dieser Charakter erkundet, erhalten deine Charaktere in diesem Zug: "Wenn dieser Charakter durch eine Herausforderung verbannt wird, nimm ihn zurück auf deine Hand" und Herausfordern +3. (Während die Charaktere herausfordern, erhalten sie +3.)',
    },
    fr: {
      name: "La Bonne Fée",
      version: "Armurière mystique",
      text: 'Alter 2 OUBLIE LE CARROSSE, VOICI UNE ÉPÉE Lorsque ce personnage est envoyé à l\'aventure, vos personnages gagnent "Lorsque ce personnage est banni via un défi, renvoyez cette carte dans votre main" et Offensif +3, pour le reste du tour.',
    },
    it: {
      name: "Fairy Godmother",
      version: "Mystic Armorer",
      text: [
        {
          title: "Shift 2",
          description:
            '(You may pay 2 to play this on top of one of your characters named Fairy Godmother.) FORGET THE COACH, HERE\'S A SWORD Whenever this character quests, your characters gain Challenger +3 and "When this character is banished in a challenge, return this card to your hand" this turn. (They get +3 while challenging.)',
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Cinderella",
  set: "002",
  cardNumber: 41,
  rarity: "legendary",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ea4fdeec62324b1eac04465ca25a1fbc",
    tcgPlayer: 527734,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "FORGET THE COACH, HERE'S A SWORD",
      description:
        'Whenever this character quests, your characters gain Challenger +3 and "When this character is banished in a challenge, return this card to your hand" this turn. (They get +3 {S} while challenging.)',
    },
  ],
  classifications: ["Floodborn", "Mentor", "Fairy"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "fq8-1",
      keyword: "Shift",
      text: "Shift 2",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            keyword: "Challenger",
            target: "SELF",
            type: "gain-keyword",
            value: 3,
          },
          {
            target: "SELF",
            type: "return-to-hand",
          },
        ],
        type: "sequence",
      },
      id: "fq8-2",
      text: "FORGET THE COACH, HERE'S A SWORD Whenever this character quests, your characters gain Challenger +3 and “When this character is banished in a challenge, return this card to your hand” this turn.",
      type: "static",
    },
  ],
};
