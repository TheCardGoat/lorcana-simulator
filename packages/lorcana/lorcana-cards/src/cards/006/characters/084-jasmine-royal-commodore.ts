import type { CharacterCard } from "@tcg/lorcana-types";

export const jasmineRoyalCommodore: CharacterCard = {
  id: "J56",
  canonicalId: "ci_J56",
  reprints: ["set6-084"],
  cardType: "character",
  name: "Jasmine",
  version: "Royal Commodore",
  i18n: {
    en: {
      name: "Jasmine",
      version: "Royal Commodore",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "RULER OF THE SEAS",
          description:
            "When you play this character, if you used Shift to play her, return all other exerted characters to their players' hands.",
        },
      ],
    },
    de: {
      name: "Jasmin",
      version: "Königliche Kommodorin",
      text: "Gestaltwandel 5 HERRSCHERIN DER MEERE Falls du Gestaltwandel benutzt hast, um diesen Charakter auszuspielen, schicke alle anderen erschöpften Charaktere auf die zugehörigen Hände zurück.",
    },
    fr: {
      name: "Jasmine",
      version: "Commodore royale",
      text: "Alter 5 RÉGENTE DES MERS Si vous jouez ce personnage en utilisant sa capacité Alter, renvoyez tous les autres personnages épuisés dans la main de leur propriétaire.",
    },
    it: {
      name: "Jasmine",
      version: "Commodoro Reale",
      text: "Trasformazione 5 SOVRANA DEI MARI Quando giochi questo personaggio, se hai usato Trasformazione per giocarlo, fai riprendere in mano ai loro giocatori tutti gli altri personaggi impegnati.",
    },
  },
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "006",
  cardNumber: 84,
  rarity: "legendary",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ad218b44923244058918299a897f9e4c",
    tcgPlayer: 591116,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "RULER OF THE SEAS",
      description:
        "When you play this character, if you used Shift to play her, return all other exerted characters to their players' hands.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "8v1-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      effect: {
        from: "hand",
        type: "play-card",
      },
      id: "8v1-2",
      name: "RULER OF THE SEAS",
      text: "RULER OF THE SEAS When you play this character, if you used Shift to play her, return all other exerted characters to their players’ hands.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
