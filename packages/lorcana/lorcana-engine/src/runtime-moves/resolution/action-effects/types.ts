import type { CardInstanceId, MoveExecutionContext, MoveInput } from "#core";
import type { Amount, LorcanaCard } from "@tcg/lorcana-types";
import type {
  LorcanaG,
  PendingActionEffect,
  PendingActionEffectContinuation,
  ReplacementTriggerContext,
} from "../../../types";
import type { DynamicAmountEventSnapshot } from "../../../types/domain-events";
import type { TargetSelectionInput } from "../../../targeting/runtime";

type PlayCardExecutionContext = Pick<
  MoveExecutionContext<LorcanaG, LorcanaCard, MoveInput<unknown>>,
  "G" | "playerId" | "query" | "framework" | "cards"
>;

type ActionResolutionInput = {
  targets?: TargetSelectionInput;
  amount?: Amount;
  namedCard?: string;
  resolveOptional?: boolean;
  choiceIndex?: number;
  preventAutoResolveTriggeredEffects?: boolean;
  destinations?: { zone: string; cards: CardInstanceId | CardInstanceId[] }[];
  eventSnapshot?: DynamicAmountEventSnapshot;
  triggerContext?: ReplacementTriggerContext;
};

export type { ActionResolutionInput, PlayCardExecutionContext };

export type { CardPlayedPayload } from "../../../types";

type ResolvedActionEffect = {
  status: "resolved";
};

type SuspendedActionEffect = {
  status: "suspended";
  pendingEffect: PendingActionEffect;
};

type ActionResolutionResult = ResolvedActionEffect | SuspendedActionEffect;

type ActionEffectResolutionOptions = {
  continuation?: PendingActionEffectContinuation;
};

export type {
  ActionEffectResolutionOptions,
  ActionResolutionResult,
  PendingActionEffectContinuation,
};
