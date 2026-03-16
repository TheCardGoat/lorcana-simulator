import type { ItemCard } from "@tcg/lorcana-types";

export const fairyGodmothersWand: ItemCard = {
  id: "yp6",
  canonicalId: "ci_yp6",
  reprints: ["set10-168"],
  cardType: "item",
  name: "Fairy Godmother's Wand",
  i18n: {
    en: {
      name: "Fairy Godmother's Wand",
      text: [
        {
          title: "ONLY TILL MIDNIGHT",
          description:
            "During your turn, whenever you put a card into your inkwell, chosen Princess character of yours gains Ward until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Zauberstab der guten Fee",
      text: [
        {
          title: "NUR BIS MITTERNACHT",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, wähle eine deiner Prinzessinnen. Sie erhält bis zu Beginn deines nächsten Zuges Behütet. (Gegnerische Mitspielende können die Prinzessin nicht auswählen, außer um sie herauszufordern.)",
        },
      ],
    },
    fr: {
      name: "Baguette de la bonne fée",
      text: [
        {
          title: "DÈS QUE MINUIT SONNERA",
          description:
            "Durant votre tour, chaque fois que vous placez une carte dans votre réserve d'encre, choisissez l'un de vos personnages Princesse qui gagne Hors d'atteinte jusqu'au début de votre prochain tour. (Les adversaires ne peuvent pas choisir ces personnages, hormis pour un défi.)",
        },
      ],
    },
    it: {
      name: "Bacchetta della Fata Smemorina",
      text: [
        {
          title: "SOLO FINO A MEZZANOTTE",
          description:
            "Durante il tuo turno, ogni volta che aggiungi una carta al tuo calamaio, un tuo personaggio Principessa a tua scelta ottiene Protetto fino all'inizio del tuo prossimo turno. (Gli avversari non possono sceglierlo se non per sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Cinderella",
  set: "010",
  cardNumber: 168,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_ddf2f3b6243d46b693fa4c08113e8930",
    tcgPlayer: 658786,
  },
  text: [
    {
      title: "ONLY TILL MIDNIGHT",
      description:
        "During your turn, whenever you put a card into your inkwell, chosen Princess character of yours gains Ward until the start of your next turn.",
    },
  ],
  abilities: [
    {
      effect: {
        duration: "until-start-of-next-turn",
        keyword: "Ward",
        target: {
          selector: "chosen",
          count: 1,
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "has-classification",
              classification: "Princess",
            },
          ],
        },
        type: "gain-keyword",
      },
      id: "1y8-1",
      name: "ONLY TILL MIDNIGHT",
      text: "ONLY TILL MIDNIGHT During your turn, whenever you put a card into your inkwell, chosen Princess character of yours gains Ward until the start of your next turn.",
      trigger: {
        event: "ink",
        on: "CONTROLLER",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
