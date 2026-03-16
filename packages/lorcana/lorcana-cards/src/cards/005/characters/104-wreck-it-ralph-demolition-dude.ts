import type { CharacterCard } from "@tcg/lorcana-types";

export const wreckitRalphDemolitionDude: CharacterCard = {
  id: "N3o",
  canonicalId: "ci_N3o",
  reprints: ["set5-104"],
  cardType: "character",
  name: "Wreck-It Ralph",
  version: "Demolition Dude",
  i18n: {
    en: {
      name: "Wreck-It Ralph",
      version: "Demolition Dude",
      text: [
        {
          title: "REFRESHING BREAK",
          description: "Whenever you ready this character, gain 1 lore for each 1 damage on him.",
        },
      ],
    },
    de: {
      name: "Randale Ralph",
      version: "Abrissbirne",
      text: [
        {
          title: "ERHOLSAME AUSZEIT",
          description:
            "Jedes Mal, wenn du diesen Charakter bereit machst, sammlest du 1 Legende für jeden Schaden auf ihm.",
        },
      ],
    },
    fr: {
      name: "Ralph la Casse",
      version: "Démolisseur",
      text: [
        {
          title: "PAUSE RAFRAÎCHISSANTE",
          description:
            "Chaque fois que ce personnage se redresse, gagnez 1 éclat de Lore par dommage sur lui.",
        },
      ],
    },
    it: {
      name: "Ralph Spaccatutto",
      version: "Il Tipo delle Demolizioni",
      text: [
        {
          title: "PAUSA RITEMPRANTE",
          description:
            "Ogni volta che prepari questo personaggio, ottieni 1 leggenda per ogni singolo danno su di esso.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 104,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_f41934191f364d68bc66e64860cc0c92",
    tcgPlayer: 555259,
  },
  text: [
    {
      title: "REFRESHING BREAK",
      description: "Whenever you ready this character, gain 1 lore for each 1 damage on him.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "co0-1",
      name: "REFRESHING BREAK",
      text: "REFRESHING BREAK Whenever you ready this character, gain 1 lore for each 1 damage on him.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
