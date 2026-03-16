import type { Draft } from "immer";
import type { MatchState } from "./types";
import type {
  AnyRuntimeCardWithDefinition,
  CardQueryAPI,
  RuntimeCardDefinitionOf,
  RuntimeCardDerivedOf,
  RuntimeCardMetaOf,
} from "./card-runtime";
import type {
  CardRuntimeAPIWithRuntimeCard,
  CardRuntimeReadAPIWithRuntimeCard,
  EventAPI,
  FrameworkReadAPIWithRuntimeCard,
  FrameworkStateSnapshot,
  FrameworkWriteAPIWithRuntimeCard,
  ProjectedLogEntry,
  RandomAPI,
  TimeOperationsAPI,
  TimeQueryAPI,
  ZoneOperationsAPI,
  ZoneQueryAPI,
} from "./match-runtime.types";
import type { PlayerId } from "../types";

export function createCardRuntimeAPI<
  G,
  TRuntimeCardWithDefinition extends AnyRuntimeCardWithDefinition = AnyRuntimeCardWithDefinition,
>(
  draft: Draft<MatchState<G>>,
  cardsApi: CardQueryAPI<
    RuntimeCardDefinitionOf<TRuntimeCardWithDefinition>,
    RuntimeCardMetaOf<TRuntimeCardWithDefinition>,
    RuntimeCardDerivedOf<TRuntimeCardWithDefinition>
  >,
): CardRuntimeAPIWithRuntimeCard<TRuntimeCardWithDefinition> {
  return {
    ...cardsApi,
    setMeta: (cardId, meta) => {
      draft.ctx.zones.private.cardMeta[cardId] = meta;
    },
    patchMeta: (cardId, patch) => {
      const current = (draft.ctx.zones.private.cardMeta[cardId] ??
        {}) as RuntimeCardMetaOf<TRuntimeCardWithDefinition>;
      const next = {
        ...(current as Record<string, unknown>),
        ...(patch as Record<string, unknown>),
      } as RuntimeCardMetaOf<TRuntimeCardWithDefinition>;
      draft.ctx.zones.private.cardMeta[cardId] = next;

      return next;
    },
    clearMeta: (cardId) => {
      delete draft.ctx.zones.private.cardMeta[cardId];
    },
    entriesMeta: () =>
      Object.entries(draft.ctx.zones.private.cardMeta).map(
        ([cardId, meta]) =>
          [cardId, (meta ?? {}) as RuntimeCardMetaOf<TRuntimeCardWithDefinition>] as const,
      ),
  };
}

export function createFrameworkReadAPI<
  TRuntimeCardWithDefinition extends AnyRuntimeCardWithDefinition = AnyRuntimeCardWithDefinition,
>(
  state: FrameworkStateSnapshot,
  zones: ZoneQueryAPI,
  time: TimeQueryAPI,
  cardsApi: CardQueryAPI<
    RuntimeCardDefinitionOf<TRuntimeCardWithDefinition>,
    RuntimeCardMetaOf<TRuntimeCardWithDefinition>,
    RuntimeCardDerivedOf<TRuntimeCardWithDefinition>
  >,
): FrameworkReadAPIWithRuntimeCard<TRuntimeCardWithDefinition> {
  return {
    state,
    zones,
    time,
    cards: cardsApi as CardRuntimeReadAPIWithRuntimeCard<TRuntimeCardWithDefinition>,
  };
}

export function createFrameworkWriteAPI<
  G,
  TRuntimeCardWithDefinition extends AnyRuntimeCardWithDefinition = AnyRuntimeCardWithDefinition,
>(
  draft: Draft<MatchState<G>>,
  state: FrameworkStateSnapshot,
  zones: ZoneOperationsAPI,
  time: TimeOperationsAPI,
  random: RandomAPI,
  events: EventAPI,
  cardsApi: CardRuntimeAPIWithRuntimeCard<TRuntimeCardWithDefinition>,
  onMoveLog?: (entries: readonly ProjectedLogEntry[]) => void,
): FrameworkWriteAPIWithRuntimeCard<TRuntimeCardWithDefinition> {
  return {
    state,
    zones,
    time,
    random,
    events,
    cards: cardsApi,
    status: {
      snapshot: draft.ctx.status,
      patch: (patch) => {
        Object.assign(draft.ctx.status, patch);
      },
      setPhase: (phase) => {
        draft.ctx.status.phase = phase;
      },
      setStep: (step) => {
        draft.ctx.status.step = step;
      },
      setGameSegment: (segment) => {
        draft.ctx.status.gameSegment = segment;
      },
      incrementTurn: (by = 1) => {
        draft.ctx.status.turn += by;
        return draft.ctx.status.turn;
      },
    },
    priority: {
      snapshot: draft.ctx.priority,
      patch: (patch) => {
        Object.assign(draft.ctx.priority, patch);
      },
      setHolder: (playerId) => {
        draft.ctx.priority.holder = playerId as string | undefined;
      },
      openWindow: (holder?: PlayerId) => {
        if (holder !== undefined) {
          draft.ctx.priority.holder = holder;
        }
        draft.ctx.priority.windowOpen = true;
      },
      closeWindow: () => {
        draft.ctx.priority.holder = undefined;
        draft.ctx.priority.windowOpen = false;
      },
      resetPasses: () => {
        draft.ctx.priority.passSequence = [];
      },
    },
    log: (entry) => {
      const entries = Array.isArray(entry) ? entry : [entry];
      if (!onMoveLog) {
        return;
      }
      onMoveLog(entries);
    },
    logPublicWithOverrides: (entry) => {
      const overrides = entry.overrides ?? {};
      const projected: ProjectedLogEntry = {
        category: entry.category,
        visibility: {
          mode: "PUBLIC_WITH_OVERRIDES",
          overrides,
        },
        defaultMessage: entry.defaultMessage,
      };
      if (!onMoveLog) {
        return;
      }
      onMoveLog([projected]);
    },
  };
}
