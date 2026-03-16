import { m } from "$lib/paraglide/messages.js";
import type { CardInstanceId, CommandResult, PlayerId } from "@tcg/lorcana-engine";
import type { CardInput, LorcanaEngineBase, PlayCardExecutionOptions } from "@tcg/lorcana-engine";

import type {
  LorcanaSimulatorMoveId,
  LorcanaSimulatorMoveParams,
  SimulatorMoveError,
} from "@/features/simulator/model/contracts.js";

interface SimulatorActivateAbilityOptions {
  ability?: string;
  abilityIndex?: number;
  targets?: CardInput[];
  choiceIndex?: number;
  costs?: {
    exertCharacters?: CardInput[];
    discardCards?: CardInput[];
  };
}

function createMoveDispatchError(
  engine: LorcanaEngineBase,
  error: string,
  errorCode = "INVALID_MOVE_PARAMS",
): CommandResult {
  return {
    success: false,
    error,
    errorCode,
    currentStateID: engine.getStateID(),
  };
}

function getStringParam(params: Record<string, unknown>, key: string): string | undefined {
  const value = params[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function getNumberParam(params: Record<string, unknown>, key: string): number | undefined {
  const value = params[key];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function getBooleanParam(params: Record<string, unknown>, key: string): boolean | undefined {
  const value = params[key];
  return typeof value === "boolean" ? value : undefined;
}

function getStringArrayParam(params: Record<string, unknown>, key: string): string[] | undefined {
  const value = params[key];
  if (!Array.isArray(value)) {
    return undefined;
  }

  const entries = value.filter((entry): entry is string => typeof entry === "string");
  return entries.length === value.length ? entries : undefined;
}

function getDestinationsParam(
  params: Record<string, unknown>,
): PlayCardExecutionOptions["destinations"] | undefined {
  const value = params.destinations;
  if (!Array.isArray(value)) {
    return undefined;
  }

  const destinations = value.flatMap((entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      return [];
    }

    const zone = getStringParam(entry as Record<string, unknown>, "zone");
    const cards = getStringArrayParam(entry as Record<string, unknown>, "cards");
    if (!zone || !cards) {
      return [];
    }

    return [{ zone, cards: cards as CardInput[] }];
  });

  return destinations.length === value.length ? destinations : undefined;
}

export function dispatchSimulatorMove<K extends LorcanaSimulatorMoveId>(
  engine: LorcanaEngineBase,
  playerId: string,
  moveId: K,
  params: LorcanaSimulatorMoveParams[K],
): CommandResult {
  const paramsRecord = params as Record<string, unknown>;
  switch (moveId) {
    case "playCard": {
      const cardId = getStringParam(paramsRecord, "cardId");
      if (!cardId) {
        return createMoveDispatchError(engine, "playCard requires cardId.");
      }

      const cost = paramsRecord.cost as PlayCardExecutionOptions["cost"] | undefined;
      const targets = getStringArrayParam(paramsRecord, "targets");
      const amount = getNumberParam(paramsRecord, "amount");
      const namedCard = getStringParam(paramsRecord, "namedCard");
      const resolveOptional = getBooleanParam(paramsRecord, "resolveOptional");
      const choiceIndex = getNumberParam(paramsRecord, "choiceIndex");
      const preventAutoResolveTriggeredEffects = getBooleanParam(
        paramsRecord,
        "preventAutoResolveTriggeredEffects",
      );
      const destinations = getDestinationsParam(paramsRecord);
      const playerTargets = Array.isArray(paramsRecord.playerTargets)
        ? paramsRecord.playerTargets.filter((entry): entry is string => typeof entry === "string")
        : typeof paramsRecord.playerTargets === "string"
          ? paramsRecord.playerTargets
          : undefined;

      return engine.playCard(playerId, cardId as CardInput, {
        ...(cost !== undefined ? { cost } : {}),
        ...(targets !== undefined ? { targets: targets as CardInput[] } : {}),
        ...(playerTargets !== undefined
          ? {
              playerTargets: Array.isArray(playerTargets)
                ? (playerTargets as PlayerId[])
                : (playerTargets as PlayerId),
            }
          : {}),
        ...(amount !== undefined ? { amount } : {}),
        ...(namedCard !== undefined ? { namedCard } : {}),
        ...(resolveOptional !== undefined ? { resolveOptional } : {}),
        ...(choiceIndex !== undefined ? { choiceIndex } : {}),
        ...(preventAutoResolveTriggeredEffects !== undefined
          ? { preventAutoResolveTriggeredEffects }
          : {}),
        ...(destinations !== undefined ? { destinations } : {}),
      });
    }
    case "putCardIntoInkwell": {
      const cardId = getStringParam(paramsRecord, "cardId");
      return cardId
        ? engine.ink(playerId, cardId as CardInput)
        : createMoveDispatchError(engine, `${moveId} requires cardId.`);
    }
    case "quest": {
      const cardId = getStringParam(paramsRecord, "cardId");
      return cardId
        ? engine.quest(playerId, cardId as CardInput)
        : createMoveDispatchError(engine, "quest requires cardId.");
    }
    case "questWithAll":
      return engine.questWithAll(playerId);
    case "challenge": {
      const attackerId = getStringParam(paramsRecord, "attackerId");
      const defenderId = getStringParam(paramsRecord, "defenderId");
      if (!attackerId || !defenderId) {
        return createMoveDispatchError(engine, "challenge requires attackerId and defenderId.");
      }

      return engine.challenge(playerId, attackerId as CardInput, defenderId as CardInput);
    }
    case "moveCharacterToLocation": {
      const characterId = getStringParam(paramsRecord, "characterId");
      const locationId = getStringParam(paramsRecord, "locationId");
      if (!characterId || !locationId) {
        return createMoveDispatchError(
          engine,
          "moveCharacterToLocation requires characterId and locationId.",
        );
      }

      return engine.moveCharacterToLocation(
        playerId,
        characterId as CardInput,
        locationId as CardInput,
      );
    }
    case "activateAbility": {
      const cardId = getStringParam(paramsRecord, "cardId");
      if (!cardId) {
        return createMoveDispatchError(engine, "activateAbility requires cardId.");
      }

      const targets = getStringArrayParam(paramsRecord, "targets");
      const costsRecord =
        paramsRecord.costs &&
        typeof paramsRecord.costs === "object" &&
        !Array.isArray(paramsRecord.costs)
          ? (paramsRecord.costs as Record<string, unknown>)
          : undefined;
      const options: SimulatorActivateAbilityOptions = {
        ...(typeof paramsRecord.ability === "string" ? { ability: paramsRecord.ability } : {}),
        ...(typeof paramsRecord.abilityIndex === "number"
          ? { abilityIndex: paramsRecord.abilityIndex }
          : {}),
        ...(targets !== undefined ? { targets: targets as CardInput[] } : {}),
        ...(typeof paramsRecord.choiceIndex === "number"
          ? { choiceIndex: paramsRecord.choiceIndex }
          : {}),
        ...(costsRecord
          ? {
              costs: {
                ...(getStringArrayParam(costsRecord, "exertCharacters") !== undefined
                  ? {
                      exertCharacters: getStringArrayParam(
                        costsRecord,
                        "exertCharacters",
                      ) as CardInput[],
                    }
                  : {}),
                ...(getStringArrayParam(costsRecord, "discardCards") !== undefined
                  ? {
                      discardCards: getStringArrayParam(costsRecord, "discardCards") as CardInput[],
                    }
                  : {}),
              },
            }
          : {}),
      };

      return engine.activateAbility(playerId, cardId as CardInput, options);
    }
    case "chooseWhoGoesFirst": {
      const firstPlayerId = getStringParam(paramsRecord, "playerId");
      if (!firstPlayerId) {
        return createMoveDispatchError(engine, "chooseWhoGoesFirst requires playerId.");
      }

      return engine.chooseFirstPlayer(playerId, firstPlayerId);
    }
    case "alterHand": {
      const targetPlayerId = getStringParam(paramsRecord, "playerId");
      if (!targetPlayerId) {
        return createMoveDispatchError(engine, "alterHand requires playerId.");
      }

      const cardsToMulligan = getStringArrayParam(paramsRecord, "cardsToMulligan");
      if (!cardsToMulligan) {
        return createMoveDispatchError(engine, `${moveId} requires cardsToMulligan.`);
      }

      return engine.mulligan(targetPlayerId, cardsToMulligan as CardInput[]);
    }
    case "resolveBag": {
      const bagId = getStringParam(paramsRecord, "bagId");
      if (!bagId) {
        return createMoveDispatchError(engine, "resolveBag requires bagId.");
      }

      const nestedParams =
        paramsRecord.params &&
        typeof paramsRecord.params === "object" &&
        !Array.isArray(paramsRecord.params)
          ? (paramsRecord.params as Record<string, unknown>)
          : {};

      return engine.resolveBag(bagId, {
        ...(getStringArrayParam(nestedParams, "targets") !== undefined
          ? { targets: getStringArrayParam(nestedParams, "targets") as CardInput[] }
          : {}),
        ...(getNumberParam(nestedParams, "amount") !== undefined
          ? { amount: getNumberParam(nestedParams, "amount") }
          : {}),
        ...(getStringParam(nestedParams, "namedCard") !== undefined
          ? { namedCard: getStringParam(nestedParams, "namedCard") }
          : {}),
        ...(getBooleanParam(nestedParams, "resolveOptional") !== undefined
          ? { resolveOptional: getBooleanParam(nestedParams, "resolveOptional") }
          : {}),
        ...(getNumberParam(nestedParams, "choiceIndex") !== undefined
          ? { choiceIndex: getNumberParam(nestedParams, "choiceIndex") }
          : {}),
      });
    }
    case "resolveEffect": {
      const effectId = getStringParam(paramsRecord, "effectId");
      if (!effectId) {
        return createMoveDispatchError(engine, "resolveEffect requires effectId.");
      }

      const nestedParams =
        paramsRecord.params &&
        typeof paramsRecord.params === "object" &&
        !Array.isArray(paramsRecord.params)
          ? (paramsRecord.params as Record<string, unknown>)
          : {};

      return engine.resolveEffect(effectId, {
        ...(getStringArrayParam(nestedParams, "targets") !== undefined
          ? { targets: getStringArrayParam(nestedParams, "targets") as CardInput[] }
          : {}),
        ...(getNumberParam(nestedParams, "amount") !== undefined
          ? { amount: getNumberParam(nestedParams, "amount") }
          : {}),
        ...(getStringParam(nestedParams, "namedCard") !== undefined
          ? { namedCard: getStringParam(nestedParams, "namedCard") }
          : {}),
        ...(getBooleanParam(nestedParams, "resolveOptional") !== undefined
          ? { resolveOptional: getBooleanParam(nestedParams, "resolveOptional") }
          : {}),
        ...(getNumberParam(nestedParams, "choiceIndex") !== undefined
          ? { choiceIndex: getNumberParam(nestedParams, "choiceIndex") }
          : {}),
        ...(getDestinationsParam(nestedParams) !== undefined
          ? { destinations: getDestinationsParam(nestedParams) }
          : {}),
      });
    }
    case "passTurn":
      return engine.passTurn(playerId);
    case "concede":
      return engine.concede(playerId);
    default:
      return createMoveDispatchError(engine, `Unsupported move '${moveId}'.`, "MOVE_NOT_SUPPORTED");
  }
}

export function buildPendingMoveError(
  moveId: LorcanaSimulatorMoveId,
  params: Record<string, unknown>,
  reason?: string,
  code?: string,
): SimulatorMoveError {
  const normalizedReason = reason?.trim() ?? "";
  const lowerReason = normalizedReason.toLowerCase();

  let message = m["sim.errors.moveCannotExecute"]({});
  if (
    lowerReason.includes("candidate list") ||
    lowerReason.includes("no longer available") ||
    lowerReason.includes("not currently available")
  ) {
    message = m["sim.errors.execution.moveNoLongerLegal"]({});
  } else if (code === "INVALID_MOVE") {
    message = m["sim.errors.execution.invalidMove"]({});
  }

  return {
    code,
    message,
    moveId,
    params,
    rawReason: normalizedReason || undefined,
  };
}
