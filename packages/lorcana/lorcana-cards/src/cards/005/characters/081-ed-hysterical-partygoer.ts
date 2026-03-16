import type { CharacterCard } from "@tcg/lorcana-types";

export const edHystericalPartygoer: CharacterCard = {
  id: "28X",
  canonicalId: "ci_28X",
  reprints: ["set5-081"],
  cardType: "character",
  name: "Ed",
  version: "Hysterical Partygoer",
  i18n: {
    en: {
      name: "Ed",
      version: "Hysterical Partygoer",
      text: [
        {
          title: "ROWDY GUEST",
          description: "Damaged characters can't challenge this character.",
        },
      ],
    },
    de: {
      name: "Ed",
      version: "Hysterischer Partygast",
      text: [
        {
          title: "UNGEHOBELTER GAST",
          description: "Beschädigte Charaktere können diesen Charakter nicht herausfordern.",
        },
      ],
    },
    fr: {
      name: "Ed",
      version: "Fêtard hystérique",
      text: [
        {
          title: "INVITÉ CHAHUTEUR",
          description:
            "Ce personnage ne peut pas être défié par des personnages ayant au moins un dommage sur eux.",
        },
      ],
    },
    it: {
      name: "Ed",
      version: "Festaiolo Svalvolato",
      text: [
        {
          title: "OSPITE RUMOROSO I",
          description: "personaggi danneggiati non possono sfidare questo personaggio.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lion King",
  set: "005",
  cardNumber: 81,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_f291329542f04339988b4051333a446e",
    tcgPlayer: 559626,
  },
  text: [
    {
      title: "ROWDY GUEST",
      description: "Damaged characters can't challenge this character.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Hyena"],
  abilities: [
    {
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      id: "q6u-1",
      text: "ROWDY GUEST Damaged characters can't challenge this character.",
      type: "static",
    },
  ],
};
