import type { CharacterCard } from "@tcg/lorcana-types";

export const coldstoneReincarnatedCyborg: CharacterCard = {
  id: "uHx",
  canonicalId: "ci_uHx",
  reprints: ["set10-051"],
  cardType: "character",
  name: "Coldstone",
  version: "Reincarnated Cyborg",
  i18n: {
    en: {
      name: "Coldstone",
      version: "Reincarnated Cyborg",
      text: [
        {
          title: "THE CANTRIPS HAVE BEEN SPOKEN",
          description:
            "When you play this character, if you have 2 or more Gargoyle character cards in your discard, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Coldstone",
      version: "Wiedergeborener Cyborg",
      text: [
        {
          title: "DIE ZAUBERFORMEL IST GESPROCHEN",
          description:
            "Wenn du diesen Charakter ausspielst und mindestens 2 Gargoyle-Charakterkarten in deinem Ablagestapel hast, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Coldstone",
      version: "Réincarné en cyborg",
      text: [
        {
          title: "J'AI PRONONCÉ LES INCANTATIONS",
          description:
            "Lorsque vous jouez ce personnage, si vous avez 2 cartes Personnage Gargouille ou plus dans votre défausse, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Pietrafredda",
      version: "Cyborg Reincarnato",
      text: [
        {
          title: "IL SORTILEGIO È STATO FATTO",
          description:
            "Quando giochi questo personaggio, se hai 2 o più carte personaggio Gargoyle nei tuoi scarti, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 51,
  rarity: "rare",
  cost: 5,
  strength: 5,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_988e3140d13242c5b38ba85e86702f91",
    tcgPlayer: 659762,
  },
  text: [
    {
      title: "THE CANTRIPS HAVE BEEN SPOKEN",
      description:
        "When you play this character, if you have 2 or more Gargoyle character cards in your discard, gain 2 lore.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Gargoyle"],
  abilities: [
    {
      effect: {
        condition: {
          expression: "you have 2 or more Gargoyle character cards in your discard",
          type: "if",
        },
        then: {
          amount: 2,
          type: "gain-lore",
        },
        type: "conditional",
      },
      id: "1uk-1",
      name: "THE CANTRIPS HAVE BEEN SPOKEN",
      text: "THE CANTRIPS HAVE BEEN SPOKEN When you play this character, if you have 2 or more Gargoyle character cards in your discard, gain 2 lore.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
