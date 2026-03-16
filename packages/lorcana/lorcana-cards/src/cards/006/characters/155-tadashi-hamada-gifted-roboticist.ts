import type { CharacterCard } from "@tcg/lorcana-types";

export const tadashiHamadaGiftedRoboticist: CharacterCard = {
  id: "dkB",
  canonicalId: "ci_dkB",
  reprints: ["set6-155"],
  cardType: "character",
  name: "Tadashi Hamada",
  version: "Gifted Roboticist",
  i18n: {
    en: {
      name: "Tadashi Hamada",
      version: "Gifted Roboticist",
      text: [
        {
          title: "SOMEONE HAS TO HELP",
          description:
            "During an opponent's turn, when this character is banished, you may put the top card of your deck into your inkwell facedown. Then, put this card into your inkwell facedown.",
        },
      ],
    },
    de: {
      name: "Tadashi Hamada",
      version: "Talentierter Robotiker",
      text: [
        {
          title: "JEMAND MUSS IHM HELFEN",
          description:
            "Wenn dieser Charakter im Zug einer gegnerischen Person verbannt wird, darfst du die oberste Karte deines Decks verdeckt in deinen Tintenvorrat legen. Lege danach diese Karte verdeckt in deinen Tintenvorrat.",
        },
      ],
    },
    fr: {
      name: "Tadashi Hamada",
      version: "Roboticien doué",
      text: [
        {
          title: "IL FAUT BIEN QU'ON LE SAUVE",
          description:
            "Durant le tour des adversaires, lorsque ce personnage est banni, vous pouvez placer la carte du dessus de votre pioche dans votre réserve d'encre, face cachée. Ensuite, placez cette carte dans votre réserve d'encre, face cachée.",
        },
      ],
    },
    it: {
      name: "Tadashi Hamada",
      version: "Robotista Dotato",
      text: [
        {
          title: "QUALCUNO DEVE AIUTARLO",
          description:
            "Durante il turno di un avversario, quando questo personaggio viene esiliato, puoi aggiungere la prima carta del tuo mazzo al tuo calamaio, a faccia in giù. Poi aggiungi questa carta al tuo calamaio, a faccia in giù.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "006",
  cardNumber: 155,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d27f3196f81b4b17a0134b39608aefe7",
    tcgPlayer: 588328,
  },
  text: [
    {
      title: "SOMEONE HAS TO HELP",
      description:
        "During an opponent's turn, when this character is banished, you may put the top card of your deck into your inkwell facedown. Then, put this card into your inkwell facedown.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Inventor"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          facedown: true,
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
        },
        type: "optional",
      },
      id: "36l-1",
      text: "SOMEONE HAS TO HELP During an opponent’s turn, when this character is banished, you may put the top card of your deck into your inkwell facedown. Then, put this card into your inkwell facedown.",
      type: "action",
    },
  ],
};
