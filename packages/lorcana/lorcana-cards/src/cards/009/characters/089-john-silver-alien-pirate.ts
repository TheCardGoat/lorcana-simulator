import type { CharacterCard } from "@tcg/lorcana-types";

export const johnSilverAlienPirate: CharacterCard = {
  id: "a2V",
  canonicalId: "ci_Jdb",
  reprints: ["set1-082", "set9-089"],
  cardType: "character",
  name: "John Silver",
  version: "Alien Pirate",
  i18n: {
    en: {
      name: "John Silver",
      version: "Alien Pirate",
      text: [
        {
          title: "PICK YOUR FIGHTS",
          description:
            "When you play this character and whenever he quests, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "John Silver",
      version: "Außerirdischer Pirat",
      text: [
        {
          title: "STREIT ANFANGEN",
          description:
            "Wenn du diesen Charakter ausspielst und jedes Mal, wenn er erkundet, erhält ein gegnerischer Charakter deiner Wahl in seinem nächsten Zug Impulsiv. (Er kann nicht erkunden und muss herausfordern, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "JOHN SILVER",
      version: "Pirate extraterrestre",
      text: [
        {
          title: "CHERCHEZ LA BAGARRE",
          description:
            "Lorsque vous jouez ce personnage ou qu'il est envoyé à l'aventure, choisissez un personnage adverse qui gagne Combattant durant son prochain tour. (Il ne peut pas être envoyé à l'aventure et doit défier à chaque tour s'il le peut.)",
        },
      ],
    },
    it: {
      name: "John Silver",
      version: "Alien Pirate",
      text: [
        {
          title: "PICK YOUR FIGHTS",
          description:
            "When you play this character and whenever he quests, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Treasure Planet",
  set: "009",
  cardNumber: 89,
  rarity: "legendary",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e775c2ea351d4c3ca09630ade10092de",
    tcgPlayer: 647668,
  },
  text: [
    {
      title: "PICK YOUR FIGHTS",
      description:
        "When you play this character and whenever he quests, chosen opposing character gains Reckless during their next turn. (They can't quest and must challenge if able.)",
    },
  ],
  classifications: ["Storyborn", "Villain", "Alien", "Pirate", "Captain"],
  abilities: [
    {
      id: "n4l-1",
      name: "PICK YOUR FIGHTS",
      text: "PICK YOUR FIGHTS When you play this character, chosen opposing character gains Reckless during their next turn.",
      type: "triggered",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      effect: {
        duration: "their-next-turn",
        keyword: "Reckless",
        target: "CHOSEN_OPPOSING_CHARACTER",
        type: "gain-keyword",
      },
    },
    {
      id: "n4l-2",
      name: "PICK YOUR FIGHTS",
      text: "PICK YOUR FIGHTS Whenever this character quests, chosen opposing character gains Reckless during their next turn.",
      type: "triggered",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      effect: {
        duration: "their-next-turn",
        keyword: "Reckless",
        target: "CHOSEN_OPPOSING_CHARACTER",
        type: "gain-keyword",
      },
    },
  ],
};
