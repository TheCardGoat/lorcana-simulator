import type { ItemCard } from "@tcg/lorcana-types";

export const darkwingsChairSet: ItemCard = {
  id: "TkX",
  canonicalId: "ci_TkX",
  reprints: ["set11-168"],
  cardType: "item",
  name: "Darkwing's Chair Set",
  i18n: {
    en: {
      name: "Darkwing's Chair Set",
      text: [
        {
          title: "SECRET ENTRANCE",
          description:
            "When you play this item, you may put the top card of your deck into your inkwell facedown and exerted.",
        },
        {
          title: "SUDDEN SPIN",
          description:
            "{E}, Banish this item — Remove up to 2 damage from chosen character. If a character named Darkwing Duck is chosen, remove up to 4 damage instead.",
        },
      ],
    },
    de: {
      name: "Darkwings Stuhl-Set",
      text: [
        {
          title: "GEHEIMER EINGANG",
          description:
            "Wenn du diesen Gegenstand ausspielst, darfst du die oberste Karte deines Decks verdeckt und erschöpft in deinen Tintenvorrat legen.",
        },
        {
          title: "PLÖTZLICHE DREHUNG,",
          description:
            "Verbanne diesen Gegenstand — Entferne bis zu 2 Schaden von einem Charakter deiner Wahl. Falls du einen Darkwing-Duck-Charakter gewählt hast, entferne stattdessen bis zu 4 Schaden.",
        },
      ],
    },
    fr: {
      name: "Fauteuils de Myster Mask",
      text: [
        {
          title: "ENTRÉE SECRÈTE",
          description:
            "Lorsque vous jouez cet objet, vous pouvez placer la carte du dessus de votre pioche dans votre réserve d'encre, face cachée et épuisée.",
        },
        {
          title: "ROTATION SOUDAINE,",
          description:
            "Bannissez cet objet — Choisissez un personnage et retirez-lui jusqu'à 2 dommages. Si vous choisissez un personnage Myster Mask ainsi, retirez-lui jusqu'à 4 dommages à la place.",
        },
      ],
    },
    it: {
      name: "Set di Sedie di Darkwing",
      text: [
        {
          title: "ENTRATA SEGRETA",
          description:
            "Quando giochi questo oggetto, puoi aggiungere la prima carta del tuo mazzo al tuo calamaio, a faccia in giù e impegnata.",
        },
        {
          title: "ROTAZIONE IMPROVVISA,",
          description:
            "esilia questo oggetto — Rimuovi fino a 2 danni da un personaggio a tua scelta. Se viene scelto un personaggio chiamato Darkwing Duck, rimuovi invece fino a 4 danni.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Darkwing Duck",
  set: "011",
  cardNumber: 168,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_2663ccb2084547c0a55220f63f46a36c",
    tcgPlayer: 676232,
  },
  text: [
    {
      title: "SECRET ENTRANCE",
      description:
        "When you play this item, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
    {
      title: "SUDDEN SPIN",
      description:
        "{E}, Banish this item — Remove up to 2 damage from chosen character. If a character named Darkwing Duck is chosen, remove up to 4 damage instead.",
    },
  ],
  abilities: [
    {
      id: "1lr-1",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          source: "top-of-deck",
          target: "CONTROLLER",
          type: "put-into-inkwell",
          exerted: true,
          facedown: true,
        },
        type: "optional",
      },
      name: "SECRET ENTRANCE",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "SECRET ENTRANCE When you play this item, you may put the top card of your deck into your inkwell facedown and exerted.",
    },
    {
      id: "1lr-2",
      name: "SUDDEN SPIN",
      type: "activated",
      cost: {
        exert: true,
        banishSelf: true,
      },
      effect: {
        amount: 2,
        selfReplacement: {
          condition: {
            type: "selected-target-name",
            name: "Darkwing Duck",
          },
          value: 4,
        },
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      text: "SUDDEN SPIN {E}, Banish this item — Remove up to 2 damage from chosen character. If a character named Darkwing Duck is chosen, remove up to 4 damage instead.",
    },
  ],
};
