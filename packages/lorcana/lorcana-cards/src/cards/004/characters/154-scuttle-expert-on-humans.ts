import type { CharacterCard } from "@tcg/lorcana-types";

export const scuttleExpertOnHumans: CharacterCard = {
  id: "IaS",
  canonicalId: "ci_IaS",
  reprints: ["set4-154"],
  cardType: "character",
  name: "Scuttle",
  version: "Expert on Humans",
  i18n: {
    en: {
      name: "Scuttle",
      version: "Expert on Humans",
      text: [
        {
          title: "LET ME SEE",
          description:
            "When you play this character, look at the top 4 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.",
        },
      ],
    },
    de: {
      name: "Scuttle",
      version: "Experte für Menschen",
      text: [
        {
          title: "LASST MAL SEHEN",
          description:
            "Wenn du diesen Charakter ausspielst, schaue dir die obersten 4 Karten deines Decks an. Du darfst 1 Gegenstandskarte daraus aufdecken und auf deine Hand nehmen. Lege die restlichen Karten in beliebiger Reihenfolge unter dein Deck.",
        },
      ],
    },
    fr: {
      name: "Eurêka",
      version: "Expert en humains",
      text: [
        {
          title: "VOYONS VOIR",
          description:
            "Lorsque vous jouez ce personnage, regardez les 4 premières cartes de votre pioche. Vous pouvez révéler une carte Objet et l'ajouter à votre main. Remettez le reste sous votre pioche, dans l'ordre de votre choix.",
        },
      ],
    },
    it: {
      name: "Scuttle",
      version: "Esperto in Umani",
      text: [
        {
          title: "FATE UN PO' VEDERE",
          description:
            "Quando giochi questo personaggio, guarda le prime 4 carte del tuo mazzo. Puoi rivelare una carta oggetto e aggiungerla alla tua mano. Metti il resto in fondo al tuo mazzo in qualsiasi ordine.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 154,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3dcdfd3bf35341d7835d5b51893bd0cb",
    tcgPlayer: 549431,
  },
  text: [
    {
      title: "LET ME SEE",
      description:
        "When you play this character, look at the top 4 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          target: "CHOSEN_CHARACTER",
          type: "put-on-bottom",
        },
        type: "optional",
      },
      id: "dpt-1",
      name: "LET ME SEE",
      text: "LET ME SEE When you play this character, look at the top 4 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
