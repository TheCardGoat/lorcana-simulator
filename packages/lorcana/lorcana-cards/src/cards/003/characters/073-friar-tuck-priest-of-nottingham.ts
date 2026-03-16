import type { CharacterCard } from "@tcg/lorcana-types";

export const friarTuckPriestOfNottingham: CharacterCard = {
  id: "29m",
  canonicalId: "ci_29m",
  reprints: ["set3-073"],
  cardType: "character",
  name: "Friar Tuck",
  version: "Priest of Nottingham",
  i18n: {
    en: {
      name: "Friar Tuck",
      version: "Priest of Nottingham",
      text: [
        {
          title: "YOU THIEVING SCOUNDREL",
          description:
            "When you play this character, the player or players with the most cards in their hand chooses and discards a card.",
        },
      ],
    },
    de: {
      name: "Bruder Tack",
      version: "Pfarrer von Nottingham",
      text: [
        {
          title: "DU DIEBISCHER SCHURKE",
          description:
            "Wenn du diesen Charakter ausspielst, wählen alle Mitspielenden (auch du), mit den meisten Karten auf der Hand, je 1 Karte aus ihrer Hand und werfen sie ab.",
        },
      ],
    },
    fr: {
      name: "Frère Tuck",
      version: "Prêtre de Nottingham",
      text: [
        {
          title: "IMMONDE COQUIN",
          description:
            "Lorsque vous jouez ce personnage, le joueur ou les joueurs ayant le plus de cartes en main choisissent une carte et la défaussent.",
        },
      ],
    },
    it: {
      name: "Frà Tac",
      version: "Sacerdote di Nottingham",
      text: [
        {
          title: "BRUTTA CANAGLIA DI UN LADRO",
          description:
            "Quando giochi questo personaggio, il giocatore o i giocatori con più carte in mano ne sceglie una e la scarta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Robin Hood",
  set: "003",
  cardNumber: 73,
  rarity: "uncommon",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f6b07239b4384329b151160a80691d1b",
    tcgPlayer: 539080,
  },
  text: [
    {
      title: "YOU THIEVING SCOUNDREL",
      description:
        "When you play this character, the player or players with the most cards in their hand chooses and discards a card.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        amount: 1,
        chosen: true,
        target: "CONTROLLER",
        type: "discard",
      },
      id: "f7m-1",
      name: "YOU THIEVING SCOUNDREL",
      text: "YOU THIEVING SCOUNDREL When you play this character, the player or players with the most cards in their hand chooses and discards a card.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
