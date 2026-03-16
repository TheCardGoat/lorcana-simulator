import type { ItemCard } from "@tcg/lorcana-types";

export const potionOfMalice: ItemCard = {
  id: "l7A",
  canonicalId: "ci_l7A",
  reprints: ["set10-098"],
  cardType: "item",
  name: "Potion of Malice",
  i18n: {
    en: {
      name: "Potion of Malice",
      text: [
        {
          title: "SUPPRESSED ANGER",
          description: "{E}, 1 {I} — Put 1 damage counter on chosen character.",
        },
        {
          title: "MINDLESS RAGE",
          description:
            "{E}, Banish this item — Each opposing damaged character gains Reckless until the start of your next turn. (They can't quest and must challenge if able.)",
        },
      ],
    },
    de: {
      name: "Trank des Unheils",
      text: [
        {
          title: "UNTERDRÜCKTE WUT,",
          description:
            "1 — Lege 1 Schadensmarker auf einen Charakter deiner Wahl. GEDANKENLOSER ZORN, Verbanne diesen Gegenstand — Gegnerische beschädigte Charaktere erhalten bis zu Beginn deines nächsten Zuges Impulsiv. (Sie können nicht erkunden und müssen herausfordern, wenn möglich.)",
        },
      ],
    },
    fr: {
      name: "Potion de malice",
      text: [
        {
          title: "COLÈRE CONTENUE,",
          description:
            "1 — Choisissez un personnage et placez 1 dommage sur lui. RAGE AVEUGLE, Bannissez cet objet — Chaque personnage adverse avec au moins un dommage sur lui gagne Combattant jusqu'au début de votre prochain tour. (Ces personnages ne peuvent pas être envoyés à l'aventure et doivent défier s'ils le peuvent.)",
        },
      ],
    },
    it: {
      name: "Pozione di Malizia",
      text: [
        {
          title: "COLLERA REPRESSA, 1",
          description:
            "— Metti 1 segnalino danno su un personaggio a tua scelta. RABBIA INCONTROLLATA, esilia questo oggetto — Ogni personaggio avversario danneggiato ottiene Attaccabrighe fino all'inizio del tuo prossimo turno. (Non può andare all'avventura e deve sfidare, se possibile.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "010",
  cardNumber: 98,
  rarity: "common",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_9df06512bc4c4b928c62b8d263e2bf51",
    tcgPlayer: 658785,
  },
  text: [
    {
      title: "SUPPRESSED ANGER",
      description: "{E}, 1 {I} — Put 1 damage counter on chosen character.",
    },
    {
      title: "MINDLESS RAGE",
      description:
        "{E}, Banish this item — Each opposing damaged character gains Reckless until the start of your next turn. (They can't quest and must challenge if able.)",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "put-damage",
      },
      id: "ifu-1",
      name: "SUPPRESSED ANGER",
      text: "SUPPRESSED ANGER {E}, 1 {I} — Put 1 damage counter on chosen character.",
      type: "activated",
    },
    {
      cost: {
        exert: true,
        banishSelf: true,
      },
      effect: {
        duration: "until-start-of-next-turn",
        keyword: "Reckless",
        target: {
          selector: "all",
          count: "all",
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "damaged",
            },
          ],
        },
        type: "gain-keyword",
      },
      id: "ifu-2",
      name: "MINDLESS RAGE",
      text: "MINDLESS RAGE {E}, Banish this item — Each opposing damaged character gains Reckless until the start of your next turn.",
      type: "activated",
    },
  ],
};
