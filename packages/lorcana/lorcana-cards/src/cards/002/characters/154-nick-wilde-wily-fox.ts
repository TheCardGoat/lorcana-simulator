import type { CharacterCard } from "@tcg/lorcana-types";

export const nickWildeWilyFox: CharacterCard = {
  id: "0FC",
  canonicalId: "ci_0FC",
  reprints: ["set2-154"],
  cardType: "character",
  name: "Nick Wilde",
  version: "Wily Fox",
  i18n: {
    en: {
      name: "Nick Wilde",
      version: "Wily Fox",
      text: [
        {
          title: "IT'S CALLED A HUSTLE",
          description:
            "When you play this character, you may return an item card named Pawpsicle from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Nick Wilde",
      version: "Schlauer Fuchs",
      text: [
        {
          title: "DAS WAR EIN TRICK",
          description:
            'Wenn du diesen Charakter ausspielst, darfst du 1 "Tatziatella"-Gegenstandskarte aus deinem Ablagestapel zurück auf deine Hand nehmen.',
        },
      ],
    },
    fr: {
      name: "Nick Wilde",
      version: "Rusé comme un renard",
      text: [
        {
          title: "ÇA S'APPELLE UNE ARNAQUE",
          description:
            "Lorsque vous jouez ce personnage, vous pouvez reprendre en main un objet Glace à l'eau de votre défausse.",
        },
      ],
    },
    it: {
      name: "Nick Wilde",
      version: "Wily Fox",
      text: [
        {
          title: "IT'S CALLED A HUSTLE",
          description:
            "When you play this character, you may return an item card named Pawpsicle from your discard to your hand.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Zootropolis",
  set: "002",
  cardNumber: 154,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_e9c693252fcc405988a7aab7ec8d7a19",
    tcgPlayer: 527534,
  },
  text: [
    {
      title: "IT'S CALLED A HUSTLE",
      description:
        "When you play this character, you may return an item card named Pawpsicle from your discard to your hand.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["item"],
          },
          type: "return-to-hand",
        },
        type: "optional",
      },
      id: "1uh-1",
      name: "IT'S CALLED A HUSTLE",
      text: "IT'S CALLED A HUSTLE When you play this character, you may return an item card named Pawpsicle from your discard to your hand.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
