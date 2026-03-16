import type { CharacterCard } from "@tcg/lorcana-types";

export const turboRoyalHack: CharacterCard = {
  id: "42e",
  canonicalId: "ci_42e",
  reprints: ["set5-106"],
  cardType: "character",
  name: "Turbo",
  version: "Royal Hack",
  i18n: {
    en: {
      name: "Turbo",
      version: "Royal Hack",
      text: [
        {
          title: "Rush",
        },
        {
          title: "GAME JUMP",
          description: "This character also counts as being named King Candy for Shift.",
        },
      ],
    },
    de: {
      name: "Turbo",
      version: "Königlicher Hack",
      text: "Rasant SPRUNG INS SPIEL Du kannst einen King-Candy-Charakter mit der Gestaltwandel-Fähigkeit auf diesen Charakter ausspielen.",
    },
    fr: {
      name: "Turbo le Pilote",
      version: "Hack royal",
      text: "Charge SAUT DE JEU Lorsque vous utilisez une capacité Alter, ce personnage peut aussi être considéré comme un personnage nommé Sa Sucrerie.",
    },
    it: {
      name: "Turbo",
      version: "Impostore Regale",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) SCAMBIOGIOCHISTA Questo personaggio conta come se si chiamasse anche Re Candito per Trasformazione.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "005",
  cardNumber: 106,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_c53a525669114b578666906f5adff421",
    tcgPlayer: 555260,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "GAME JUMP",
      description: "This character also counts as being named King Candy for Shift.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Racer"],
  abilities: [],
};
