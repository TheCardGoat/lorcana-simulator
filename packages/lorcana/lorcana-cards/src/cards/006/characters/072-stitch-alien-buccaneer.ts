import type { CharacterCard } from "@tcg/lorcana-types";

export const stitchAlienBuccaneer: CharacterCard = {
  id: "z1V",
  canonicalId: "ci_z1V",
  reprints: ["set6-072"],
  cardType: "character",
  name: "Stitch",
  version: "Alien Buccaneer",
  i18n: {
    en: {
      name: "Stitch",
      version: "Alien Buccaneer",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "READY FOR ACTION",
          description:
            "When you play this character, if you used Shift to play him, you may put an action card from your discard on the top of your deck.",
        },
      ],
    },
    de: {
      name: "Stitch",
      version: "Alien-Seeräuber",
      text: "Gestaltwandel 3 BEREIT FÜR ACTION Wenn du diesen Charakter ausspielst, falls du Gestaltwandel benutzt hast, um diesen Charakter auszuspielen, darfst du 1 Aktionskarte aus deinem Ablagestapel wählen und als oberste Karte auf dein Deck legen.",
    },
    fr: {
      name: "Stitch",
      version: "Boucanier alien",
      text: "Alter 3 PARÉ POUR L'ACTION Si vous jouez ce personnage en utilisant sa capacité Alter, vous pouvez placer une carte Action de votre défausse sur votre pioche.",
    },
    it: {
      name: "Stitch",
      version: "Bucaniere Alieno",
      text: "Trasformazione 3 PRONTO ALL'AZIONE Quando giochi questo personaggio, se hai usato Trasformazione per giocarlo, puoi mettere in cima al tuo mazzo una carta azione dai tuoi scarti.",
    },
  },
  inkType: ["emerald"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 72,
  rarity: "rare",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_efcb250575354ffd8cdce9e8c45d52bf",
    tcgPlayer: 578176,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "READY FOR ACTION",
      description:
        "When you play this character, if you used Shift to play him, you may put an action card from your discard on the top of your deck.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Alien", "Pirate"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "19n-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        from: "discard",
        type: "play-card",
      },
      id: "19n-2",
      name: "READY FOR ACTION",
      text: "READY FOR ACTION When you play this character, if you used Shift to play him, you may put an action card from your discard on the top of your deck.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
