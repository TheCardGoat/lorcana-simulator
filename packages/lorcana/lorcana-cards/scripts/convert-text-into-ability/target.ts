import type {
  CardTarget,
  CharacterFilter,
  ForEachCounter,
  ItemFilter,
  LocationFilter,
} from "@tcg/lorcana-types";
import type {
  SupportedCharacterTarget,
  SupportedCardTarget,
  SupportedItemTarget,
  SupportedLocationTarget,
  SupportedPlayerTarget,
  TargetMatch,
} from "./shared";

type StaticTargetPattern<TTarget> = {
  pattern: RegExp;
  target: TTarget;
};

type DynamicTargetPattern<TTarget> = {
  pattern: RegExp;
  buildTarget: () => TTarget;
};

const PLAYER_TARGET_PATTERNS: readonly StaticTargetPattern<SupportedPlayerTarget>[] = [
  { pattern: /^each opponent\b/i, target: "EACH_OPPONENT" },
  { pattern: /^each player\b/i, target: "EACH_PLAYER" },
  { pattern: /^all players\b/i, target: "ALL_PLAYERS" },
  { pattern: /^chosen player\b/i, target: "CHOSEN_PLAYER" },
  { pattern: /^your opponent\b/i, target: "OPPONENT" },
  { pattern: /^opponent\b/i, target: "OPPONENT" },
  { pattern: /^opponents\b/i, target: "OPPONENTS" },
  { pattern: /^that player\b/i, target: "THAT_PLAYER" },
  { pattern: /^challenger owner\b/i, target: "CHALLENGER_OWNER" },
  { pattern: /^challenging player\b/i, target: "CHALLENGING_PLAYER" },
  { pattern: /^card owner\b/i, target: "CARD_OWNER" },
  { pattern: /^current turn player\b/i, target: "CURRENT_TURN" },
  { pattern: /^you\b/i, target: "CONTROLLER" },
];

const CHARACTER_TARGET_PATTERNS: readonly StaticTargetPattern<SupportedCharacterTarget>[] = [
  { pattern: /^this character\b/i, target: "THIS_CHARACTER" },
  { pattern: /^self\b/i, target: "SELF" },
  { pattern: /^your chosen damaged character\b/i, target: "YOUR_CHOSEN_DAMAGED_CHARACTER" },
  { pattern: /^chosen damaged character of yours\b/i, target: "YOUR_CHOSEN_DAMAGED_CHARACTER" },
  { pattern: /^your chosen villain(?: character)?\b/i, target: "YOUR_CHOSEN_VILLAIN" },
  { pattern: /^chosen villain(?: character)? of yours\b/i, target: "YOUR_CHOSEN_VILLAIN" },
  { pattern: /^your chosen character\b/i, target: "YOUR_CHOSEN_CHARACTER" },
  { pattern: /^chosen character of yours\b/i, target: "CHOSEN_CHARACTER_OF_YOURS" },
  { pattern: /^another chosen character of yours\b/i, target: "ANOTHER_CHOSEN_CHARACTER_OF_YOURS" },
  { pattern: /^chosen opposing deity character\b/i, target: "CHOSEN_OPPOSING_DEITY_CHARACTER" },
  {
    pattern: /^chosen opposing character with 3 \{S\} or less\b/i,
    target: "CHOSEN_OPPOSING_CHARACTER_3_STRENGTH_OR_LESS",
  },
  { pattern: /^chosen opposing damaged character\b/i, target: "CHOSEN_OPPOSING_DAMAGED_CHARACTER" },
  { pattern: /^chosen damaged opposing character\b/i, target: "CHOSEN_DAMAGED_OPPOSING_CHARACTER" },
  { pattern: /^chosen opposing character\b/i, target: "CHOSEN_OPPOSING_CHARACTER" },
  { pattern: /^opponent'?s chosen character\b/i, target: "OPPONENT_CHOSEN_CHARACTER" },
  { pattern: /^their chosen character\b/i, target: "THEIR_CHOSEN_CHARACTER" },
  { pattern: /^another chosen character\b/i, target: "ANOTHER_CHOSEN_CHARACTER" },
  { pattern: /^chosen other character\b/i, target: "CHOSEN_OTHER_CHARACTER" },
  { pattern: /^chosen challenged character\b/i, target: "CHOSEN_CHALLENGED_CHARACTER" },
  { pattern: /^chosen damaged character\b/i, target: "CHOSEN_DAMAGED_CHARACTER" },
  { pattern: /^chosen exerted character\b/i, target: "CHOSEN_EXERTED_CHARACTER" },
  { pattern: /^chosen villain character\b/i, target: "CHOSEN_VILLAIN_CHARACTER" },
  { pattern: /^chosen dragon character\b/i, target: "CHOSEN_DRAGON_CHARACTER" },
  { pattern: /^chosen detective character\b/i, target: "CHOSEN_DETECTIVE_CHARACTER" },
  { pattern: /^chosen te ka character\b/i, target: "CHOSEN_TE_KA_CHARACTER" },
  { pattern: /^chosen character in your discard\b/i, target: "CHOSEN_CHARACTER_IN_DISCARD" },
  { pattern: /^chosen character from your discard\b/i, target: "CHOSEN_CHARACTER_IN_DISCARD" },
  { pattern: /^chosen card in your discard\b/i, target: "CHOSEN_CARD_IN_DISCARD" },
  { pattern: /^chosen card from your discard\b/i, target: "CHOSEN_CARD_FROM_DISCARD" },
  { pattern: /^chosen character here\b/i, target: "CHOSEN_CHARACTER_HERE" },
  { pattern: /^chosen characters or locations\b/i, target: "CHOSEN_CHARACTERS_OR_LOCATIONS" },
  {
    pattern: /^chosen character(?:,)? item(?:,)? or location\b/i,
    target: "CHOSEN_CHARACTER_ITEM_OR_LOCATION",
  },
  { pattern: /^chosen character or location\b/i, target: "CHOSEN_CHARACTER_OR_LOCATION" },
  { pattern: /^chosen characters\b/i, target: "CHOSEN_CHARACTERS" },
  { pattern: /^chosen character\b/i, target: "CHOSEN_CHARACTER" },
  { pattern: /^all opposing characters\b/i, target: "ALL_OPPOSING_CHARACTERS" },
  { pattern: /^each opposing character\b/i, target: "ALL_OPPOSING_CHARACTERS" },
  { pattern: /^opposing evasive characters\b/i, target: "OPPOSING_EVASIVE_CHARACTERS" },
  { pattern: /^opposing characters\b/i, target: "OPPOSING_CHARACTERS" },
  {
    pattern: /^your characters or locations with card under\b/i,
    target: "YOUR_CHARACTERS_OR_LOCATIONS_WITH_CARD_UNDER",
  },
  { pattern: /^your characters or locations\b/i, target: "YOUR_CHARACTERS_OR_LOCATIONS" },
  {
    pattern: /^your other seven dwarfs characters\b/i,
    target: "YOUR_OTHER_SEVEN_DWARFS_CHARACTERS",
  },
  {
    pattern: /^your prince(?:,)? princess(?:,)? king(?:,)? queen characters\b/i,
    target: "YOUR_PRINCE_PRINCESS_KING_QUEEN_CHARACTERS",
  },
  { pattern: /^your exerted characters\b/i, target: "YOUR_EXERTED_CHARACTERS" },
  { pattern: /^your evasive characters\b/i, target: "YOUR_EVASIVE_CHARACTERS" },
  { pattern: /^your reckless characters\b/i, target: "YOUR_RECKLESS_CHARACTERS" },
  { pattern: /^your musketeer characters\b/i, target: "YOUR_MUSKETEER_CHARACTERS" },
  {
    pattern: /^your other musketeer characters\b/i,
    target: "YOUR_OTHER_MUSKETEER_CHARACTERS",
  },
  { pattern: /^your jetsam characters\b/i, target: "YOUR_JETSAM_CHARACTERS" },
  { pattern: /^your flotsam characters\b/i, target: "YOUR_FLOTSAM_CHARACTERS" },
  { pattern: /^your broom characters\b/i, target: "YOUR_BROOM_CHARACTERS" },
  { pattern: /^your peter pan characters\b/i, target: "YOUR_PETER_PAN_CHARACTERS" },
  { pattern: /^your bodyguard characters\b/i, target: "YOUR_BODYGUARD_CHARACTERS" },
  { pattern: /^your other steel characters\b/i, target: "YOUR_OTHER_STEEL_CHARACTERS" },
  { pattern: /^your deity characters\b/i, target: "YOUR_DEITY_CHARACTERS" },
  { pattern: /^your villain characters\b/i, target: "YOUR_VILLAIN_CHARACTERS" },
  { pattern: /^your alien characters\b/i, target: "YOUR_ALIEN_CHARACTERS" },
  { pattern: /^your other fairy characters\b/i, target: "YOUR_OTHER_FAIRY_CHARACTERS" },
  { pattern: /^your puppy characters\b/i, target: "YOUR_PUPPY_CHARACTERS" },
  { pattern: /^your other hero characters\b/i, target: "YOUR_OTHER_HERO_CHARACTERS" },
  { pattern: /^your ally characters\b/i, target: "YOUR_ALLY_CHARACTERS" },
  { pattern: /^your other amber characters\b/i, target: "YOUR_OTHER_AMBER_CHARACTERS" },
  { pattern: /^your other ruby characters\b/i, target: "YOUR_OTHER_RUBY_CHARACTERS" },
  {
    pattern: /^your other sapphire characters\b/i,
    target: "YOUR_OTHER_SAPPHIRE_CHARACTERS",
  },
  {
    pattern: /^your other emerald characters\b/i,
    target: "YOUR_OTHER_EMERALD_CHARACTERS",
  },
  { pattern: /^your detective characters\b/i, target: "YOUR_DETECTIVE_CHARACTERS" },
  { pattern: /^your pirate characters\b/i, target: "YOUR_PIRATE_CHARACTERS" },
  { pattern: /^your hero characters\b/i, target: "YOUR_HERO_CHARACTERS" },
  { pattern: /^your gargoyle characters\b/i, target: "YOUR_GARGOYLE_CHARACTERS" },
  { pattern: /^your demona characters\b/i, target: "YOUR_DEMONA_CHARACTERS" },
  {
    pattern: /^your other detective characters\b/i,
    target: "YOUR_OTHER_DETECTIVE_CHARACTERS",
  },
  {
    pattern: /^your other amethyst characters\b/i,
    target: "YOUR_OTHER_AMETHYST_CHARACTERS",
  },
  { pattern: /^your hand\b/i, target: "YOUR_HAND" },
  { pattern: /^your other characters\b/i, target: "YOUR_OTHER_CHARACTERS" },
  { pattern: /^each of your characters\b/i, target: "YOUR_CHARACTERS" },
  { pattern: /^all your characters\b/i, target: "YOUR_CHARACTERS" },
  { pattern: /^your characters\b/i, target: "YOUR_CHARACTERS" },
  { pattern: /^another of your characters\b/i, target: "YOUR_OTHER_CHARACTER" },
  { pattern: /^your other character\b/i, target: "YOUR_OTHER_CHARACTER" },
  { pattern: /^your other 2 characters\b/i, target: "YOUR_OTHER_2_CHARACTERS" },
  { pattern: /^2 other characters of yours\b/i, target: "YOUR_OTHER_2_CHARACTERS" },
  { pattern: /^up to 2 of your characters\b/i, target: "UP_TO_2_YOUR_CHARACTERS" },
  { pattern: /^up to 2 chosen characters\b/i, target: "UP_TO_2_CHOSEN_CHARACTERS" },
  { pattern: /^each character\b/i, target: "ALL_CHARACTERS" },
  {
    pattern: /^all characters with name in discard\b/i,
    target: "ALL_CHARACTERS_WITH_NAME_IN_DISCARD",
  },
  { pattern: /^all characters\b/i, target: "ALL_CHARACTERS" },
  { pattern: /^characters with support here\b/i, target: "CHARACTERS_WITH_SUPPORT_HERE" },
  { pattern: /^characters at (?:a|that) location\b/i, target: "CHARACTERS_AT_LOCATION" },
  { pattern: /^characters here\b/i, target: "CHARACTERS_HERE" },
  { pattern: /^character here\b/i, target: "CHARACTER_HERE" },
  { pattern: /^challenged character\b/i, target: "CHALLENGED_CHARACTER" },
  { pattern: /^challenging character\b/i, target: "CHALLENGING_CHARACTER" },
  { pattern: /^banished character\b/i, target: "BANISHED_CHARACTER" },
  { pattern: /^played card\b/i, target: "PLAYED_CARD" },
  { pattern: /^revealed card\b/i, target: "REVEALED_CARD" },
  { pattern: /^top of deck\b/i, target: "TOP_OF_DECK" },
  { pattern: /^triggering character\b/i, target: "TRIGGERING_CHARACTER" },
];

const LOCATION_TARGET_PATTERNS: readonly DynamicTargetPattern<SupportedLocationTarget>[] = [
  {
    pattern: /^chosen location of yours\b/i,
    buildTarget: () => buildChosenLocationQuery("you"),
  },
  {
    pattern: /^your chosen location\b/i,
    buildTarget: () => buildChosenLocationQuery("you"),
  },
  {
    pattern: /^chosen location\b/i,
    buildTarget: () => buildChosenLocationQuery(),
  },
  {
    pattern: /^(?:each of your|all your|your) locations?\b/i,
    buildTarget: () =>
      buildInPlayCardQuery({
        selector: "all",
        count: "all",
        owner: "you",
        cardTypes: ["location"],
      }),
  },
  {
    pattern: /^(?:each|all) locations?\b/i,
    buildTarget: () =>
      buildInPlayCardQuery({
        selector: "all",
        count: "all",
        owner: "any",
        cardTypes: ["location"],
      }),
  },
];

const ITEM_TARGET_PATTERNS: readonly DynamicTargetPattern<SupportedItemTarget>[] = [
  {
    pattern: /^chosen item of yours\b/i,
    buildTarget: () => buildChosenItemQuery("you"),
  },
  {
    pattern: /^your chosen item\b/i,
    buildTarget: () => buildChosenItemQuery("you"),
  },
  {
    pattern: /^chosen item\b/i,
    buildTarget: () => buildChosenItemQuery(),
  },
  {
    pattern: /^(?:each of your|all your|your) items?\b/i,
    buildTarget: () =>
      buildInPlayCardQuery({
        selector: "all",
        count: "all",
        owner: "you",
        cardTypes: ["item"],
      }),
  },
  {
    pattern: /^(?:each|all) items?\b/i,
    buildTarget: () =>
      buildInPlayCardQuery({
        selector: "all",
        count: "all",
        owner: "any",
        cardTypes: ["item"],
      }),
  },
];

type InPlayFilter = CharacterFilter[] | ItemFilter[] | LocationFilter[];
type InPlayCardType = "character" | "item" | "location" | "action";

export function buildInPlayCardQuery(params: {
  selector: "chosen" | "all";
  count: number | "all" | { upTo: number };
  owner: "you" | "opponent" | "any";
  cardTypes: InPlayCardType[];
  filter?: InPlayFilter;
}): CardTarget {
  return {
    selector: params.selector,
    count: params.count,
    owner: params.owner,
    zones: ["play"],
    cardTypes: params.cardTypes,
    ...(params.filter ? { filter: params.filter } : {}),
  } satisfies CardTarget;
}

export function buildChosenCharacterQuery(owner: "you" | "opponent" | "any" = "any"): CardTarget {
  return buildInPlayCardQuery({
    selector: "chosen",
    count: 1,
    owner,
    cardTypes: ["character"],
  });
}

export function buildChosenLocationQuery(owner: "you" | "opponent" | "any" = "any"): CardTarget {
  return buildInPlayCardQuery({
    selector: "chosen",
    count: 1,
    owner,
    cardTypes: ["location"],
  });
}

export function buildChosenItemQuery(owner: "you" | "opponent" | "any" = "any"): CardTarget {
  return buildInPlayCardQuery({
    selector: "chosen",
    count: 1,
    owner,
    cardTypes: ["item"],
  });
}

export function parseCardTypeWords(fragment: string): InPlayCardType[] | null {
  const normalized = fragment
    .trim()
    .toLowerCase()
    .replace(/\s+cards?$/i, "");

  if (normalized === "character") {
    return ["character"];
  }

  if (normalized === "item") {
    return ["item"];
  }

  if (normalized === "location") {
    return ["location"];
  }

  if (normalized === "action") {
    return ["action"];
  }

  if (normalized === "character or item" || normalized === "item or character") {
    return ["character", "item"];
  }

  if (normalized === "item or location" || normalized === "location or item") {
    return ["item", "location"];
  }

  if (normalized === "character or location" || normalized === "location or character") {
    return ["character", "location"];
  }

  return null;
}

function matchStaticTarget<TTarget>(
  fragment: string,
  patterns: readonly StaticTargetPattern<TTarget>[],
): TargetMatch<TTarget> | null {
  for (const { pattern, target } of patterns) {
    const match = fragment.match(pattern);
    if (!match) {
      continue;
    }

    return {
      consumed: match[0],
      target,
    };
  }

  return null;
}

function matchDynamicTarget<TTarget>(
  fragment: string,
  patterns: readonly DynamicTargetPattern<TTarget>[],
): TargetMatch<TTarget> | null {
  for (const { pattern, buildTarget } of patterns) {
    const match = fragment.match(pattern);
    if (!match) {
      continue;
    }

    return {
      consumed: match[0],
      target: buildTarget(),
    };
  }

  return null;
}

export function parsePlayerTarget(fragment: string): TargetMatch<SupportedPlayerTarget> | null {
  return matchStaticTarget(fragment, PLAYER_TARGET_PATTERNS);
}

export function parseCharacterTarget(
  fragment: string,
): TargetMatch<SupportedCharacterTarget> | null {
  return matchStaticTarget(fragment, CHARACTER_TARGET_PATTERNS);
}

export function parseLocationTarget(fragment: string): TargetMatch<SupportedLocationTarget> | null {
  return matchDynamicTarget(fragment.trim(), LOCATION_TARGET_PATTERNS);
}

export function parseItemTarget(fragment: string): TargetMatch<SupportedItemTarget> | null {
  return matchDynamicTarget(fragment.trim(), ITEM_TARGET_PATTERNS);
}

export function parseCardTarget(fragment: string): TargetMatch<SupportedCardTarget> | null {
  const normalized = fragment.trim();

  const anyNumberOfYourItemsMatch = normalized.match(/^any number of your items\b/i);
  if (anyNumberOfYourItemsMatch) {
    return {
      consumed: anyNumberOfYourItemsMatch[0],
      target: buildInPlayCardQuery({
        selector: "all",
        count: "all",
        owner: "you",
        cardTypes: ["item"],
      }),
    };
  }

  const anyNumberOfChosenCharactersMatch = normalized.match(/^any number of chosen characters\b/i);
  if (anyNumberOfChosenCharactersMatch) {
    return {
      consumed: anyNumberOfChosenCharactersMatch[0],
      target: buildInPlayCardQuery({
        selector: "chosen",
        count: 1,
        owner: "any",
        cardTypes: ["character"],
      }),
    };
  }

  const mixedLocationOrItemMatch = normalized.match(
    /^chosen (?:item or location|location or item)\b/i,
  );
  if (mixedLocationOrItemMatch) {
    return {
      consumed: mixedLocationOrItemMatch[0],
      target: buildInPlayCardQuery({
        selector: "chosen",
        count: 1,
        owner: "any",
        cardTypes: ["item", "location"],
      }),
    };
  }

  const mixedCharacterOrLocationMatch = normalized.match(
    /^chosen (?:character or location|location or character)\b/i,
  );
  if (mixedCharacterOrLocationMatch) {
    return {
      consumed: mixedCharacterOrLocationMatch[0],
      target: buildInPlayCardQuery({
        selector: "chosen",
        count: 1,
        owner: "any",
        cardTypes: ["character", "location"],
      }),
    };
  }

  const eachOfYourCharactersMatch = normalized.match(/^each of your characters\b/i);
  if (eachOfYourCharactersMatch) {
    return {
      consumed: eachOfYourCharactersMatch[0],
      target: buildInPlayCardQuery({
        selector: "all",
        count: "all",
        owner: "you",
        cardTypes: ["character"],
      }),
    };
  }

  const oneOfYourLocationsOrCharactersMatch = normalized.match(
    /^one of your (?:locations or characters|characters or locations)\b/i,
  );
  if (oneOfYourLocationsOrCharactersMatch) {
    return {
      consumed: oneOfYourLocationsOrCharactersMatch[0],
      target: buildInPlayCardQuery({
        selector: "chosen",
        count: 1,
        owner: "you",
        cardTypes: ["location", "character"],
      }),
    };
  }

  const upToStrengthMatch = normalized.match(
    /^up to (\d+) chosen characters with (\d+) \{S\} or less\b/i,
  );
  if (upToStrengthMatch) {
    return {
      consumed: upToStrengthMatch[0],
      target: buildInPlayCardQuery({
        selector: "chosen",
        count: { upTo: Number.parseInt(upToStrengthMatch[1], 10) },
        owner: "any",
        cardTypes: ["character"],
        filter: [
          {
            type: "strength-comparison",
            comparison: "less-or-equal",
            value: Number.parseInt(upToStrengthMatch[2], 10),
          },
        ],
      }),
    };
  }

  const keywordCharacterMatch = normalized.match(
    /^one of your characters with ([A-Za-z][A-Za-z ]+)\b/i,
  );
  if (keywordCharacterMatch) {
    return {
      consumed: keywordCharacterMatch[0],
      target: buildInPlayCardQuery({
        selector: "chosen",
        count: 1,
        owner: "you",
        cardTypes: ["character"],
        filter: [
          {
            type: "has-keyword",
            keyword: keywordCharacterMatch[1].trim(),
          },
        ],
      }),
    };
  }

  return (
    parseItemTarget(normalized) ??
    parseLocationTarget(normalized) ??
    parseCharacterTarget(normalized) ??
    parsePlayerTarget(normalized)
  );
}

export function parseForEachCounter(text: string): ForEachCounter | null {
  const normalized = text.trim().toLowerCase();

  if (/^damage on chosen character(?: of yours)?$/i.test(normalized)) {
    return { type: "damage-on-target" };
  }

  if (/^damage removed(?: this way)?$/i.test(normalized)) {
    return { type: "damage-removed" };
  }

  if (/^lore lost(?: this way)?$/i.test(normalized)) {
    return { type: "lore-lost" };
  }

  if (/^characters? you control$/i.test(normalized) || /^your characters$/i.test(normalized)) {
    return { type: "characters", controller: "you" };
  }

  if (/^characters?$/i.test(normalized)) {
    return { type: "characters", controller: "any" };
  }

  if (/^damaged characters?$/i.test(normalized)) {
    return { type: "damaged-characters", controller: "any" };
  }

  if (/^items? you control$/i.test(normalized) || /^your items$/i.test(normalized)) {
    return { type: "items", controller: "you" };
  }

  if (/^locations? you control$/i.test(normalized) || /^your locations$/i.test(normalized)) {
    return { type: "locations", controller: "you" };
  }

  if (/^cards? in your hand$/i.test(normalized)) {
    return { type: "cards-in-hand", controller: "you" };
  }

  if (/^cards? in their hand$/i.test(normalized)) {
    return { type: "cards-in-hand", controller: "opponent" };
  }

  if (/^cards? in your discard$/i.test(normalized)) {
    return { type: "cards-in-discard", controller: "you" };
  }

  if (/^characters? that sang this turn$/i.test(normalized)) {
    return { type: "characters-that-sang", thisTurn: true };
  }

  return null;
}
