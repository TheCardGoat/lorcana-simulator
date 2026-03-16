import type { CharacterCard } from "@tcg/lorcana-types";

export const scarFinallyKing: CharacterCard = {
  id: "mUj",
  canonicalId: "ci_rq5",
  reprints: ["set9-175"],
  cardType: "character",
  name: "Scar",
  version: "Finally King",
  i18n: {
    en: {
      name: "Scar",
      version: "Finally King",
      text: [
        {
          title: "BE GRATEFUL",
          description: "Your Ally characters get +1 {S}.",
        },
        {
          title: "STICK WITH ME",
          description:
            "At the end of your turn, if this character is exerted, you may draw cards equal to the {S} of chosen Ally character of yours. If you do, choose and discard 2 cards and banish that character.",
        },
      ],
    },
    de: {
      name: "Scar",
      version: "Endlich König",
      text: [
        {
          title: "SEID DANKBAR",
          description: "Deine Verbündeten erhalten +1.",
        },
        {
          title: "HALTET ZU MIR",
          description:
            "Am Ende deines Zuges, wenn dieser Charakter erschöpft ist, darfst du einen deiner Verbündeten wählen und so viele Karten ziehen, wie dieser hat. Wenn du dies tust, wähle 2 Karten aus deiner Hand und wirf sie ab und verbanne den gewählten Charakter.",
        },
      ],
    },
    fr: {
      name: "Scar",
      version: "Enfin roi",
      text: [
        {
          title: "SOYEZ RECONNAISSANTES",
          description: "Vos personnages Allié gagnent +1.",
        },
        {
          title: "SUIVEZ-MOI À",
          description:
            "la fin de votre tour, si ce personnage est épuisé, vous pouvez choisir l'un de vos personnages Allié et piocher autant de cartes que sa. Si vous le faites, défaussez 2 cartes et bannissez le personnage choisi de cette façon.",
        },
      ],
    },
    it: {
      name: "Scar",
      version: "Finalmente Re",
      text: [
        {
          title: "SIATE GRATI I",
          description: "tuoi personaggi Alleato ricevono +1.",
        },
        {
          title: "SEGUITEMI",
          description:
            "Alla fine del tuo turno, se questo personaggio è impegnato, puoi pescare carte pari alla di un tuo personaggio Alleato a tua scelta. Se lo fai, scegli e scarta 2 carte ed esilia quel personaggio.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lion King",
  set: "009",
  cardNumber: 175,
  rarity: "legendary",
  cost: 5,
  strength: 5,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_3d02b1019aa34f70b5e0da64191d9326",
    tcgPlayer: 651108,
  },
  text: [
    {
      title: "BE GRATEFUL",
      description: "Your Ally characters get +1 {S}.",
    },
    {
      title: "STICK WITH ME",
      description:
        "At the end of your turn, if this character is exerted, you may draw cards equal to the {S} of chosen Ally character of yours. If you do, choose and discard 2 cards and banish that character.",
    },
  ],
  classifications: ["Storyborn", "Villain", "King"],
  abilities: [
    {
      id: "1vp-1",
      effect: {
        modifier: 1,
        stat: "strength",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      type: "static",
      name: "BE GRATEFUL Your Ally",
      text: "BE GRATEFUL Your Ally characters get +1 {S}.",
    },
    {
      id: "1vp-2",
      effect: {
        amount: 2,
        chosen: false,
        target: "CONTROLLER",
        type: "discard",
      },
      type: "action",
      text: "STICK WITH ME At the end of your turn, if this character is exerted, you may draw cards equal to the {S} of chosen Ally character of yours. If you do, choose and discard 2 cards and banish that character.",
    },
  ],
};
