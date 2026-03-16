import type { CharacterCard } from "@tcg/lorcana-types";

export const johnSilverShipsCook: CharacterCard = {
  id: "d07",
  canonicalId: "ci_d07",
  reprints: ["set6-181"],
  cardType: "character",
  name: "John Silver",
  version: "Ship's Cook",
  i18n: {
    en: {
      name: "John Silver",
      version: "Ship's Cook",
      text: [
        {
          title: "HUNK OF HARDWARE",
          description:
            "When you play this character, chosen character can't challenge during their next turn.",
        },
      ],
    },
    de: {
      name: "John Silver",
      version: "Schiffskoch",
      text: [
        {
          title: "EIN EISENWARENLADEN",
          description:
            "Wenn du diesen Charakter ausspielst, wähle einen Charakter. Er kann in seinem nächsten Zug nicht herausfordern.",
        },
      ],
    },
    fr: {
      name: "John Silver",
      version: "Maître-coq du vaisseau",
      text: [
        {
          title: "BELLE QUINCAILLERIE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui ne peut pas défier lors de son prochain tour.",
        },
      ],
    },
    it: {
      name: "John Silver",
      version: "Cuoco di Bordo",
      text: [
        {
          title: "STRANA FERRAGLIA",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta non può sfidare durante il suo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 181,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_fef968cf2e0d47fbb8f241fa7d91fd27",
    tcgPlayer: 587755,
  },
  text: [
    {
      title: "HUNK OF HARDWARE",
      description:
        "When you play this character, chosen character can't challenge during their next turn.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Alien", "Pirate", "Captain"],
  abilities: [
    {
      effect: {
        restriction: "cant-challenge",
        target: "SELF",
        type: "restriction",
      },
      id: "1r7-1",
      name: "HUNK OF HARDWARE",
      text: "HUNK OF HARDWARE When you play this character, chosen character can't challenge during their next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
