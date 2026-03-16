import type { CharacterCard } from "@tcg/lorcana-types";

export const cursedMerfolkUrsulasHandiwork: CharacterCard = {
  id: "c1H",
  canonicalId: "ci_8Dp",
  reprints: ["set3-070", "set9-071"],
  cardType: "character",
  name: "Cursed Merfolk",
  version: "Ursula's Handiwork",
  i18n: {
    en: {
      name: "Cursed Merfolk",
      version: "Ursula's Handiwork",
      text: [
        {
          title: "POOR SOULS",
          description:
            "Whenever this character is challenged, each opponent chooses and discards a card.",
        },
      ],
    },
    de: {
      name: "Verfluchte Meerleute",
      version: "Ursulas Handwerkskunst",
      text: [
        {
          title: "ARME SEELEN",
          description:
            "Jedes Mal, wenn dieser Charakter herausgefordert wird, wählen alle gegnerischen Mitspielenden je 1 Karte aus ihrer Hand und werfen sie ab.",
        },
      ],
    },
    fr: {
      name: "Ondins ensorcelés",
      version: "Œuvre d'Ursula",
      text: [
        {
          title: "PAUVRES ÂMES",
          description:
            "Chaque fois que ce personnage est défié, chaque adversaire choisit une carte et la défausse.",
        },
      ],
    },
    it: {
      name: "Sventurata Gente del Mare",
      version: "Opera di Ursula",
      text: [
        {
          title: "POVERE ANIME",
          description:
            "Ogni volta che questo personaggio viene sfidato, ogni avversario sceglie e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Little Mermaid",
  set: "003",
  cardNumber: 70,
  rarity: "rare",
  cost: 1,
  strength: 0,
  willpower: 1,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_c571350ccb314e4aac4f3e79d9a29c87",
    tcgPlayer: 650013,
  },
  text: [
    {
      title: "POOR SOULS",
      description:
        "Whenever this character is challenged, each opponent chooses and discards a card.",
    },
  ],
  classifications: ["Storyborn"],
  missingTests: true,
  abilities: [
    {
      effect: {
        amount: 1,
        chosen: true,
        target: "EACH_OPPONENT",
        type: "discard",
      },
      id: "1pi-1",
      name: "POOR SOULS",
      text: "POOR SOULS Whenever this character is challenged, each opponent chooses and discards a card.",
      trigger: {
        event: "challenged",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
