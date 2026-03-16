import type { ItemCard } from "@tcg/lorcana-types";

export const potOfHoney: ItemCard = {
  id: "cBK",
  canonicalId: "ci_cBK",
  reprints: ["set11-067"],
  cardType: "item",
  name: "Pot of Honey",
  i18n: {
    en: {
      name: "Pot of Honey",
      text: [
        {
          title: "I'M STUCK!",
          description:
            "Banish this item — Chosen exerted character can't ready at the start of their next turn.",
        },
      ],
    },
    de: {
      name: "Honigtopf",
      text: [
        {
          title: "ICH SITZE FEST!",
          description:
            "Verbanne diesen Gegenstand — Wähle einen erschöpften Charakter. Er wird zu Beginn seines nächsten Zuges nicht bereit gemacht.",
        },
      ],
    },
    fr: {
      name: "Pot de miel",
      text: [
        {
          title: "JE SUIS",
          description:
            "COINCÉ! Bannissez cet objet — Choisissez un personnage épuisé qui ne se redresse pas au début de son prochain tour.",
        },
      ],
    },
    it: {
      name: "Vasetto di Miele",
      text: [
        {
          title: "SONO BLOCCATO!",
          description:
            "Esilia questo oggetto — Un personaggio impegnato a tua scelta non si può preparare all'inizio del suo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Winnie the Pooh",
  set: "011",
  cardNumber: 67,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9ab9a1951014457b824c8f11a3d0fdbc",
    tcgPlayer: 673417,
  },
  text: [
    {
      title: "I'M STUCK!",
      description:
        "Banish this item — Chosen exerted character can't ready at the start of their next turn.",
    },
  ],
  abilities: [
    {
      id: "1ai-1",
      name: "I'M STUCK!",
      type: "activated",
      cost: {
        banishSelf: true,
      },
      effect: {
        type: "restriction",
        restriction: "cant-ready",
        duration: "until-start-of-next-turn",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "exerted",
            },
          ],
        },
      },
      text: "I'M STUCK! Banish this item — Chosen exerted character can't ready at the start of their next turn.",
    },
  ],
};
