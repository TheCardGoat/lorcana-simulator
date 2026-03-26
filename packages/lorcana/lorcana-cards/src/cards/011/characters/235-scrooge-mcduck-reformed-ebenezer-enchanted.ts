import type { CharacterCard } from "@tcg/lorcana-types";
import { scroogeMcduckReformedEbenezerEnchantedI18n } from "./235-scrooge-mcduck-reformed-ebenezer-enchanted.i18n";

export const scroogeMcduckReformedEbenezerEnchanted: CharacterCard = {
  id: "RUA",
  canonicalId: "ci_aqI",
  reprints: ["set11-152"],
  cardType: "character",
  name: "Scrooge McDuck",
  version: "Reformed Ebenezer",
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 235,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 6,
  strength: 4,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_b30562a95420404b911886bcfc9e7a9c",
    tcgPlayer: 677166,
  },
  text: [
    {
      title: "Shift 4 {I}",
    },
    {
      title: "SPREADING JOY",
      description:
        "When you play this character, you may put a card from the top of your deck facedown under each of your other characters. If you do, those characters gain Ward until the start of your next turn.",
    },
  ],
  classifications: ["Floodborn", "Hero"],
  abilities: [
    {
      id: "1yi-1",
      cost: {
        ink: 4,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 4 {I}",
    },
    {
      id: "1yi-2",
      effect: {
        keyword: "Ward",
        target: "YOUR_OTHER_CHARACTERS",
        duration: "until-start-of-next-turn",
        type: "gain-keyword",
      },
      name: "SPREADING JOY",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "SPREADING JOY When you play this character, you may put a card from the top of your deck facedown under each of your other characters. If you do, those characters gain Ward until the start of your next turn.",
    },
  ],
  i18n: scroogeMcduckReformedEbenezerEnchantedI18n,
};
