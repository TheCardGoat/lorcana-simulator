import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseMusicalArtist: CharacterCard = {
  id: "8V8",
  canonicalId: "ci_8V8",
  reprints: ["set3-009"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Musical Artist",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Musical Artist",
      text: [
        {
          title: "Singer 3",
        },
        {
          title: "ENTOURAGE",
          description:
            "Whenever you play a character with Bodyguard, you may remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Minnie Maus",
      version: "Musikalische Künstlerin",
      text: [
        {
          title: "Singen 3",
          description:
            "(Die Kosten dieses Charakters gelten als 3 für das Singen von Liedern.) ENTOURAGE Jedes Mal, wenn du einen Charakter mit Beschützen ausspielst, darfst du bis zu 2 Schaden von einem Charakter deiner Wahl entfernen.",
        },
      ],
    },
    fr: {
      name: "Minnie",
      version: "Artiste musicale",
      text: "Mélomane 3 (Ce personnage est considéré comme ayant un coût de 3 pour chanter des chansons.) GARDE DU CORPS Chaque fois que vous jouez un personnage avec Rempart, vous pouvez choisir un personnage et lui retirer jusqu'à 2 jetons Dommage.",
    },
    it: {
      name: "Minni",
      version: "Musicista",
      text: "Melodioso 3 ENTOURAGE Ogni volta che giochi un personaggio con Guardiano, puoi rimuovere fino a 2 danni da un personaggio a tua scelta.",
    },
  },
  inkType: ["amber"],
  set: "003",
  cardNumber: 9,
  rarity: "rare",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a6d0aaef05744b279192132d481af4be",
    tcgPlayer: 539062,
  },
  text: [
    {
      title: "Singer 3",
    },
    {
      title: "ENTOURAGE",
      description:
        "Whenever you play a character with Bodyguard, you may remove up to 2 damage from chosen character.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
  missingTests: true,
  abilities: [
    {
      id: "egy-1",
      keyword: "Singer",
      text: "Singer 3",
      type: "keyword",
      value: 3,
    },
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 2,
          target: {
            selector: "chosen",
            count: 1,
            owner: "any",
            zones: ["play"],
            cardTypes: ["character"],
          },
          type: "remove-damage",
          upTo: true,
        },
        type: "optional",
      },
      id: "egy-2",
      name: "ENTOURAGE",
      text: "ENTOURAGE Whenever you play a character with Bodyguard, you may remove up to 2 damage from chosen character.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
