import type { CharacterCard } from "@tcg/lorcana-types";

export const nickWildeSoggyFox: CharacterCard = {
  id: "ZEt",
  canonicalId: "ci_ZEt",
  reprints: ["set6-148"],
  cardType: "character",
  name: "Nick Wilde",
  version: "Soggy Fox",
  i18n: {
    en: {
      name: "Nick Wilde",
      version: "Soggy Fox",
      text: [
        {
          title: "NICE TO HAVE A PARTNER",
          description:
            "While you have another character with Support in play, this character gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Nick Wilde",
      version: "Durchnässter Fuchs",
      text: [
        {
          title: "SCHÖN, EINEN PARTNER ZU HABEN",
          description:
            "Solange du mindestens einen weiteren Charakter mit Unterstützen im Spiel hast, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Nick Wilde",
      version: "Renard détrempé",
      text: [
        {
          title: "CHOUETTE DE T'AVOIR POUR ÉQUIPIER",
          description:
            "Tant qu'un autre de vos personnages en jeu a Soutien, ce personnage-ci gagne +2.",
        },
      ],
    },
    it: {
      name: "Nick Wilde",
      version: "Volpe Inzuppata",
      text: [
        {
          title: "SAREBBE BELLO SE AVESSI UN COLLEGA",
          description:
            "Mentre hai in gioco un altro personaggio con Aiutante, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Zootropolis",
  set: "006",
  cardNumber: 148,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_cbd38ca5b3b04da382b8aa2b3da66adb",
    tcgPlayer: 579927,
  },
  text: [
    {
      title: "NICE TO HAVE A PARTNER",
      description:
        "While you have another character with Support in play, this character gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "10j-1",
      text: "NICE TO HAVE A PARTNER While you have another character with Support in play, this character gets +2 {S}.",
      type: "action",
    },
  ],
};
