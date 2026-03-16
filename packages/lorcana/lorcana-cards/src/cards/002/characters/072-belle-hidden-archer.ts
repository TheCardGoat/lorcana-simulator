import type { CharacterCard } from "@tcg/lorcana-types";

export const belleHiddenArcher: CharacterCard = {
  id: "df2",
  canonicalId: "ci_df2",
  reprints: ["set2-072"],
  cardType: "character",
  name: "Belle",
  version: "Hidden Archer",
  i18n: {
    en: {
      name: "Belle",
      version: "Hidden Archer",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "THORNY ARROWS",
          description:
            "Whenever this character is challenged, the challenging character's player discards all cards in their hand.",
        },
      ],
    },
    de: {
      name: "Belle",
      version: "Versteckte Bogenschützin",
      text: "Gestaltwandel 3 DORNENPFEILE Jedes Mal, wenn dieser Charakter herausgefordert wird, wirft die herausfordernde Person alle Karten aus ihrer Hand ab.",
    },
    fr: {
      name: "Belle",
      version: "Archère dissimulée",
      text: "Alter 3 FLÈCHES ÉPINEUSES Lorsque ce personne est défié, le propriétaire du personnage qui l'a défié défausse toute sa main.",
    },
    it: {
      name: "Belle",
      version: "Hidden Archer",
      text: [
        {
          title: "Shift 3",
          description:
            "(You may pay 3 to play this on top of one of your characters named Belle.) THORNY ARROWS Whenever this character is challenged, the challenging character's player discards all cards in their hand.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 72,
  rarity: "legendary",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_db68b32c197d4f808a46afc957338877",
    tcgPlayer: 516417,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "THORNY ARROWS",
      description:
        "Whenever this character is challenged, the challenging character's player discards all cards in their hand.",
    },
  ],
  missingImplementation: true,
  missingTests: true,
  classifications: ["Floodborn", "Hero", "Princess"],
  abilities: [
    {
      id: "cyn-1",
      keyword: "Shift",
      type: "keyword",
      cost: {
        ink: 3,
      },
      text: "Shift 3",
    },
    {
      id: "cyn-2",
      name: "THORNY ARROWS",
      text: "THORNY ARROWS Whenever this character is challenged, the challenging character's player discards all cards in their hand.",
      type: "triggered",
      trigger: {
        event: "challenged",
        on: "SELF",
        timing: "whenever",
      },
      effect: {
        amount: {
          type: "cards-in-hand",
          controller: "opponent",
        },
        chosen: true,
        target: "CHALLENGING_PLAYER",
        type: "discard",
      },
    },
  ],
};
