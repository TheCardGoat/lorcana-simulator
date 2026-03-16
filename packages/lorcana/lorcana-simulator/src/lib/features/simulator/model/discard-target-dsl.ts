import type {
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
} from "@/features/simulator/model/contracts.js";
import {
  type LorcanaCardTarget,
  type LorcanaContext,
  type LorcanaFilter,
} from "@tcg/lorcana-engine";

export type CardTargetContext = LorcanaContext & {
  viewerSide?: LorcanaPlayerSide;
};

export interface CardTargetUnsupportedFilter {
  filter: LorcanaFilter;
  path: string;
  reason: string;
}

export interface CardTargetEvaluation {
  matchedCards: LorcanaCardSnapshot[];
  unsupportedFilters: CardTargetUnsupportedFilter[];
}

export interface TargetBadge {
  id: string;
  label: string;
  variant: "default" | "warning";
}

type NumericLorcanaFilter =
  | Extract<LorcanaFilter, { type: "strength" }>
  | Extract<LorcanaFilter, { type: "willpower" }>
  | Extract<LorcanaFilter, { type: "cost" }>
  | Extract<LorcanaFilter, { type: "lore-value" }>
  | Extract<LorcanaFilter, { type: "move-cost" }>;

function isNumericFilterType(
  type: LorcanaFilter["type"],
): type is "strength" | "willpower" | "cost" | "lore-value" | "move-cost" {
  return (
    type === "strength" ||
    type === "willpower" ||
    type === "cost" ||
    type === "lore-value" ||
    type === "move-cost"
  );
}

function isNumericFilter(filter: LorcanaFilter): filter is NumericLorcanaFilter {
  return isNumericFilterType(filter.type);
}

function isComparisonWithParentsTarget(
  filter: LorcanaFilter,
): filter is Extract<LorcanaFilter, { compareWithParentsTarget: true }> {
  return "compareWithParentsTarget" in filter && filter.compareWithParentsTarget === true;
}

function isNameFilterWithEquals(
  filter: LorcanaFilter,
): filter is Extract<LorcanaFilter, { type: "name"; equals: string }> {
  return filter.type === "name" && "equals" in filter;
}

function isNameFilterWithContains(
  filter: LorcanaFilter,
): filter is Extract<LorcanaFilter, { type: "name"; contains: string }> {
  return filter.type === "name" && "contains" in filter;
}

function isFilterSupported(filter: LorcanaFilter): boolean {
  if (filter.type === "at-location") {
    return false;
  }

  if (isNumericFilter(filter)) {
    if (filter.value === "target" || isComparisonWithParentsTarget(filter)) {
      return false;
    }
  }

  return true;
}

function collectUnsupportedFilters(
  filter: LorcanaFilter | undefined,
  path: string,
  unsupported: CardTargetUnsupportedFilter[],
): void {
  if (!filter) {
    return;
  }

  if (filter.type === "and" || filter.type === "or") {
    filter.filters.forEach((childFilter, index) => {
      collectUnsupportedFilters(childFilter, `${path}.filters[${index}]`, unsupported);
    });
    return;
  }

  if (filter.type === "not") {
    collectUnsupportedFilters(filter.filter, `${path}.filter`, unsupported);
    return;
  }

  if (!isFilterSupported(filter)) {
    let reason = "Unsupported filter behavior is not available in target inspection.";

    if (filter.type === "at-location") {
      reason = "Location-aware filters are not supported for target inspection.";
    }

    if (isNumericFilterType(filter.type)) {
      reason = "Context-targeted numeric comparisons are not yet supported.";
    }

    unsupported.push({ filter, path, reason });
  }
}

function compareNumeric(actual: number | undefined, expected: number, comparison: string): boolean {
  if (typeof actual !== "number") {
    return false;
  }

  switch (comparison) {
    case "eq":
      return actual === expected;
    case "ne":
      return actual !== expected;
    case "gt":
      return actual > expected;
    case "gte":
      return actual >= expected;
    case "lt":
      return actual < expected;
    case "lte":
      return actual <= expected;
    default:
      return false;
  }
}

function resolveCardNumericValue(
  card: LorcanaCardSnapshot,
  filterType: LorcanaFilter["type"],
): number | undefined {
  switch (filterType) {
    case "strength":
      return card.strength;
    case "willpower":
      return card.willpower;
    case "cost":
      return card.cost;
    case "lore-value":
      return card.loreValue;
    case "move-cost":
      return card.moveCost;
    default:
      return undefined;
  }
}

function evaluateNumericFilter(
  card: LorcanaCardSnapshot,
  filter: NumericLorcanaFilter,
): { matches: boolean; supported: boolean } {
  if (!isFilterSupported(filter)) {
    return {
      matches: true,
      supported: false,
    };
  }

  if (typeof filter.value !== "number") {
    return {
      matches: false,
      supported: false,
    };
  }

  const cardValue = resolveCardNumericValue(card, filter.type);
  return {
    matches: compareNumeric(cardValue, filter.value, filter.comparison),
    supported: true,
  };
}

function evaluateSingleFilter(
  card: LorcanaCardSnapshot,
  filter: LorcanaFilter,
  path: string,
): { matches: boolean; supported: boolean } {
  switch (filter.type) {
    case "and": {
      let hasSupportedFilters = false;
      let allSupportedMatches = true;

      for (const [index, childFilter] of filter.filters.entries()) {
        const child = evaluateSingleFilter(card, childFilter, `${path}.filters[${index}]`);
        if (child.supported) {
          hasSupportedFilters = true;
          if (!child.matches) {
            allSupportedMatches = false;
          }
        }
      }

      return {
        matches: hasSupportedFilters ? allSupportedMatches : true,
        supported: hasSupportedFilters,
      };
    }

    case "or": {
      let hasSupportedFilters = false;
      let hasSupportedMatch = false;

      for (const [index, childFilter] of filter.filters.entries()) {
        const child = evaluateSingleFilter(card, childFilter, `${path}.filters[${index}]`);
        if (child.supported) {
          hasSupportedFilters = true;
          if (child.matches) {
            hasSupportedMatch = true;
          }
        }
      }

      return {
        matches: hasSupportedFilters ? hasSupportedMatch : true,
        supported: hasSupportedFilters,
      };
    }

    case "not": {
      const child = evaluateSingleFilter(card, filter.filter, `${path}.filter`);
      if (!child.supported) {
        return {
          matches: true,
          supported: false,
        };
      }

      return {
        matches: !child.matches,
        supported: true,
      };
    }

    case "damaged":
      return {
        matches: (card.damage ?? 0) > 0,
        supported: isFilterSupported(filter),
      };

    case "undamaged":
      return {
        matches: (card.damage ?? 0) === 0,
        supported: isFilterSupported(filter),
      };

    case "exerted":
      return {
        matches: card.readyState === "exerted",
        supported: isFilterSupported(filter),
      };

    case "ready":
      return {
        matches: card.readyState === "ready",
        supported: isFilterSupported(filter),
      };

    case "dry":
      return {
        matches: card.isDrying === true,
        supported: isFilterSupported(filter),
      };

    case "has-keyword":
      return {
        matches: (card.keywords ?? []).includes(filter.keyword),
        supported: isFilterSupported(filter),
      };

    case "has-classification":
      return {
        matches: (card.classifications ?? []).includes(filter.classification),
        supported: isFilterSupported(filter),
      };

    case "inkable":
      return {
        matches: card.inkable === filter.value,
        supported: isFilterSupported(filter),
      };

    case "name": {
      if (isNameFilterWithEquals(filter)) {
        return {
          matches: (card.label ?? "").toLowerCase() === filter.equals.toLowerCase(),
          supported: isFilterSupported(filter),
        };
      }

      if (isNameFilterWithContains(filter)) {
        return {
          matches: (card.label ?? "").toLowerCase().includes(filter.contains.toLowerCase()),
          supported: isFilterSupported(filter),
        };
      }

      return {
        matches: true,
        supported: isFilterSupported(filter),
      };
    }

    case "card-type":
      return {
        matches: card.cardType === filter.value,
        supported: isFilterSupported(filter),
      };

    case "strength":
    case "willpower":
    case "cost":
    case "lore-value":
    case "move-cost":
      return evaluateNumericFilter(card, filter);

    case "at-location":
      return {
        matches: true,
        supported: false,
      };

    default:
      return {
        matches: true,
        supported: false,
      };
  }
}

function evaluateTargetFilters(
  card: LorcanaCardSnapshot,
  filters: readonly LorcanaFilter[] | undefined,
): { matches: boolean; supported: boolean } {
  if (!filters || filters.length === 0) {
    return { matches: true, supported: false };
  }

  let allSupportedMatch = true;
  let hasSupportedFilters = false;

  for (let index = 0; index < filters.length; index += 1) {
    const filter = filters[index];
    const result = evaluateSingleFilter(card, filter, `filters[${index}]`);

    if (result.supported) {
      hasSupportedFilters = true;
      if (!result.matches) {
        allSupportedMatch = false;
      }
    }
  }

  return {
    matches: hasSupportedFilters ? allSupportedMatch : true,
    supported: hasSupportedFilters,
  };
}

function evaluateOwnerFilter(
  cardOwnerSide: LorcanaPlayerSide,
  targetOwner: string | undefined,
  viewerSide: LorcanaPlayerSide | undefined,
): boolean {
  if (!targetOwner || targetOwner === "any") {
    return true;
  }

  if (targetOwner === "you") {
    if (!viewerSide) {
      return true;
    }
    return cardOwnerSide === viewerSide;
  }

  if (targetOwner === "opponent") {
    if (!viewerSide) {
      return true;
    }
    return cardOwnerSide !== viewerSide;
  }

  return true;
}

function normalizeTargetFilters(target: LorcanaCardTarget): LorcanaFilter[] {
  if (Array.isArray(target.filters)) {
    return [...target.filters];
  }

  const legacyFilter = target.filter;
  if (Array.isArray(legacyFilter)) {
    return [...legacyFilter];
  }

  return legacyFilter ? [legacyFilter] : [];
}

export function evaluateCardTargetMatches(
  cards: LorcanaCardSnapshot[],
  target: LorcanaCardTarget,
  context: CardTargetContext = {},
): CardTargetEvaluation {
  const targetFilters = normalizeTargetFilters(target);

  const unsupportedFilters: CardTargetUnsupportedFilter[] = [];
  for (const [index, filter] of targetFilters.entries()) {
    collectUnsupportedFilters(filter, `filters[${index}]`, unsupportedFilters);
  }

  const supportedZoneIds = new Set<Exclude<LorcanaCardSnapshot["zoneId"], never>>(
    target.zones ?? [],
  );

  const matchedCards = cards.filter((card) => {
    if (target.zones?.length && !supportedZoneIds.has(card.zoneId)) {
      return false;
    }

    if (target.cardType && card.cardType !== target.cardType) {
      return false;
    }

    if (!evaluateOwnerFilter(card.ownerSide, target.owner, context.viewerSide)) {
      return false;
    }

    const filterResult = evaluateTargetFilters(card, targetFilters);
    return filterResult.matches;
  });

  return {
    matchedCards,
    unsupportedFilters,
  };
}

function describeFilter(filter: LorcanaFilter): string {
  if (filter.type === "and") {
    return `and(${filter.filters.map(describeFilter).join(", ")})`;
  }

  if (filter.type === "or") {
    return `or(${filter.filters.map(describeFilter).join(", ")})`;
  }

  if (filter.type === "not") {
    return `not(${describeFilter(filter.filter)})`;
  }

  switch (filter.type) {
    case "damaged":
      return "damaged";
    case "undamaged":
      return "undamaged";
    case "exerted":
      return "exerted";
    case "ready":
      return "ready";
    case "dry":
      return "dry";
    case "has-keyword":
      return `has-keyword(${filter.keyword})`;
    case "has-classification":
      return `has-classification(${filter.classification})`;
    case "inkable":
      return `inkable(${filter.value ? "yes" : "no"})`;
    case "strength":
    case "willpower":
    case "cost":
    case "lore-value":
    case "move-cost":
      return `${filter.type} ${filter.comparison} ${String(filter.value)}`;
    case "name":
      if (isNameFilterWithEquals(filter)) {
        return `name == "${filter.equals}"`;
      }
      if (isNameFilterWithContains(filter)) {
        return `name contains "${filter.contains}"`;
      }
      return "name";
    case "card-type":
      return `card-type(${filter.value})`;
    case "at-location":
      return `at-location(${filter.location ?? "any"})`;
    default:
      return "unsupported-filter";
  }
}

function collectFilterBadges(filter: LorcanaFilter, path: string, badged: TargetBadge[]): void {
  if (filter.type === "and" || filter.type === "or") {
    filter.filters.forEach((child, childIndex) => {
      collectFilterBadges(child, `${path}.filters[${childIndex}]`, badged);
    });
    return;
  }

  if (filter.type === "not") {
    collectFilterBadges(filter.filter, `${path}.filter`, badged);
    return;
  }

  badged.push({
    id: path,
    label: `filter: ${describeFilter(filter)}`,
    variant: "default",
  });
}

export function describeTargetBadges(
  target: LorcanaCardTarget,
  unsupported: CardTargetUnsupportedFilter[],
): TargetBadge[] {
  const badges: TargetBadge[] = [];

  badges.push({
    id: "selector",
    label: `selector: ${target.selector}`,
    variant: "default",
  });

  if (target.count !== undefined) {
    const value =
      target.count === "all"
        ? "all"
        : typeof target.count === "number"
          ? String(target.count)
          : JSON.stringify(target.count);
    badges.push({
      id: "count",
      label: `count: ${value}`,
      variant: "default",
    });
  }

  if (target.owner) {
    badges.push({
      id: "owner",
      label: `owner: ${target.owner}`,
      variant: "default",
    });
  }

  if (target.zones?.length) {
    badges.push({
      id: "zones",
      label: `zones: ${target.zones.join(", ")}`,
      variant: "default",
    });
  }

  if (target.cardType) {
    badges.push({
      id: "card-type",
      label: `cardType: ${target.cardType}`,
      variant: "default",
    });
  }

  const topFilters = normalizeTargetFilters(target);
  topFilters.forEach((filter, index) => {
    collectFilterBadges(filter, `filters[${index}]`, badges);
  });

  unsupported.forEach((unsupportedFilter, index) => {
    badges.push({
      id: `unsupported-${index}`,
      label: `unsupported filter: ${describeFilter(unsupportedFilter.filter)} (${unsupportedFilter.reason})`,
      variant: "warning",
    });
  });

  return badges;
}
