import type { CharacterCard } from "@tcg/lorcana-types";

export const peteWrestlingChamp: CharacterCard = {
  id: "tEN",
  canonicalId: "ci_tEN",
  reprints: ["set5-187"],
  cardType: "character",
  name: "Pete",
  version: "Wrestling Champ",
  i18n: {
    en: {
      name: "Pete",
      version: "Wrestling Champ",
      text: [
        {
          title: "RE-PETE",
          description:
            "{E} — Reveal the top card of your deck. If it's a character card named Pete, you may play it for free.",
        },
      ],
    },
    de: {
      name: "Kater Karlo",
      version: "Wrestling-Champion",
      text: [
        {
          title: "ABGEKATERTES SPIEL",
          description:
            "— Decke die oberste Karte deines Decks auf. Falls sie eine Kater-Karlo-Charakterkarte ist, darfst du sie kostenlos ausspielen.",
        },
      ],
    },
    fr: {
      name: "Pat",
      version: "Champion de lutte",
      text: [
        {
          title: "RÉ-PAT-ITION",
          description:
            "— Révélez la carte du dessus de votre pioche. Si c'est un personnage Pat, vous pouvez le jouer gratuitement.",
        },
      ],
    },
    it: {
      name: "Gambadilegno",
      version: "Campione di Wrestling",
      text: [
        {
          title: "RADDOPPIETRO",
          description:
            "— Rivela la prima carta del tuo mazzo. Se è una carta personaggio chiamata Gambadilegno, puoi giocarla gratis.",
        },
      ],
    },
  },
  inkType: ["steel"],
  set: "005",
  cardNumber: 187,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_77a41111eb054ad3acd73de5f7f800e7",
    tcgPlayer: 559085,
  },
  text: [
    {
      title: "RE-PETE",
      description:
        "{E} — Reveal the top card of your deck. If it's a character card named Pete, you may play it for free.",
    },
  ],
  classifications: ["Dreamborn", "Villain"],
  abilities: [
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            reference: "revealed-first",
            filters: [
              {
                type: "card-type",
                value: "character",
              },
              {
                type: "name",
                equals: "Pete",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          cost: "free",
          from: "hand",
          type: "play-card",
        },
        type: "conditional",
      },
      id: "pvv-1",
      text: "RE-PETE {E} - Reveal the top card of your deck. If it's a character card named Pete, you may play it for free.",
      type: "action",
    },
  ],
};
