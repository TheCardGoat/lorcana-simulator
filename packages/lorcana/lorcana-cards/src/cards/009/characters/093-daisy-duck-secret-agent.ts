import type { CharacterCard } from "@tcg/lorcana-types";

export const daisyDuckSecretAgent: CharacterCard = {
  id: "TtR",
  canonicalId: "ci_BEH",
  reprints: ["set2-076", "set9-093"],
  cardType: "character",
  name: "Daisy Duck",
  version: "Secret Agent",
  i18n: {
    en: {
      name: "Daisy Duck",
      version: "Secret Agent",
      text: [
        {
          title: "THWART",
          description: "Whenever this character quests, each opponent chooses and discards a card.",
        },
      ],
    },
    de: {
      name: "Daisy Duck",
      version: "Geheimagentin",
      text: [
        {
          title: "SABOTIEREN",
          description:
            "Jedes Mal, wenn dieser Charakter erkundet, wählen alle gegnerischen Mitspielenden je 1 Karte aus ihrer Hand und werfen diese ab.",
        },
      ],
    },
    fr: {
      name: "Daisy",
      version: "Agente secrète",
      text: [
        {
          title: "DÉJOUER",
          description:
            "Lorsque ce personnage est envoyé à l'aventure, chaque adversaire choisit une carte et la défausse.",
        },
      ],
    },
    it: {
      name: "Daisy Duck",
      version: "Secret Agent",
      text: [
        {
          title: "THWART",
          description: "Whenever this character quests, each opponent chooses and discards a card.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  set: "009",
  cardNumber: 93,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_2da1b21d6bdc4b29b5e04bacfa14eded",
    tcgPlayer: 650032,
  },
  text: [
    {
      title: "THWART",
      description: "Whenever this character quests, each opponent chooses and discards a card.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      effect: {
        amount: 1,
        chosen: true,
        target: "EACH_OPPONENT",
        type: "discard",
      },
      id: "1wn-1",
      name: "THWART",
      text: "THWART Whenever this character quests, each opponent chooses and discards a card.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
