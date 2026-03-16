# Lorcana Rule Evaluation Engine Architecture Audit

## Summary

This document provides a principal-engineer audit of `packages/lorcana/lorcana-engine/src`. It inventories the engine’s core concepts, maps their relationships, identifies architectural smells, and proposes a prioritized clean-break refactor roadmap.

The audit focuses on move orchestration, effect orchestration, targeting, condition evaluation, derived-card state, and effect lifecycle state. The recommendations optimize for readability, ownership clarity, and future rule velocity.

## Concept Map

### Core Concepts

| Concept               | Definition                                                  | Source of Truth               | Read/Write                   | Main Consumers                      | Dependencies                 |
| :-------------------- | :---------------------------------------------------------- | :---------------------------- | :--------------------------- | :---------------------------------- | :--------------------------- |
| **Move**              | A player action (e.g., Play Card, Quest).                   | `runtime-moves/*.ts`          | Write: Game State            | UI, AI, Network                     | Validation, Execution, State |
| **Action Effect**     | Immediate impact of a card/ability (e.g., Draw, Banish).    | `composed-effect-resolver.ts` | Write: Game State            | `play-card.ts`, Triggered Abilities | Targeting, State, Conditions |
| **Targeting**         | Selection of cards/players for effects.                     | Distributed (see Findings)    | Read: Game State             | Moves, Effects                      | State, Queries               |
| **Condition**         | Logic to check if an effect/move is valid.                  | Distributed (see Findings)    | Read: Game State             | Moves, Effects, Abilities           | State, Derived State         |
| **Static Ability**    | Continuous property/behavior (e.g., Evasive).               | `static-ability-utils.ts`     | Read: Card Def, State        | Derived State, Moves                | Conditions, Targeting        |
| **Derived State**     | Calculated card properties (Strength, Cost).                | `card-derived.ts`             | Read-Only                    | UI, Moves, Conditions               | Static Abilities, Modifiers  |
| **Continuous Effect** | Lasting global modifier (e.g., "All characters get +1/+1"). | `continuous-effects.ts`       | Write: `G.continuousEffects` | Derived State                       | Conditions, State            |
| **Temporary Effect**  | Turn-based modifier on specific objects.                    | `temporary-effects.ts`        | Write: Card Meta             | Derived State                       | State                        |
| **Pending Effect**    | Suspended effect waiting for input.                         | `pending-action-effects.ts`   | Write: `G.pendingEffects`    | UI, Move Execution                  | State                        |

## Correlation Map

### Runtime Flows

1.  **Play Card Flow**
    - **Input**: User selects card + options (targets, cost mode).
    - **Validation (`play-card.ts`)**:
      - Checks permissions (turn, zone).
      - **Redundant Logic**: Calculates effective cost (duplicating derived state logic).
      - **Redundant Logic**: Validates targets (duplicating targeting service logic).
    - **Execution (`play-card.ts`)**:
      - Pays costs.
      - Moves card to play.
      - **Split Pipeline**: Triggers `cardPlayed` event.
      - **Split Pipeline**: Calls `resolveActionEffect` for Action cards.
      - **Split Pipeline**: Manually handles "enters play" effects (damage, exertion).

2.  **Resolve Action Effect**
    - **Entry**: `composed-effect-resolver.ts` -> `resolveActionEffect`.
    - **Dispatch**: Switches on effect type (e.g., `banish`, `draw`).
    - **Targeting**: Calls `resolveEffectTargets` (part of targeting runtime).
    - **Execution**: Modifies state directly.
    - **Suspension**: If input needed, creates `PendingActionEffect` and suspends.

3.  **Condition Evaluation**
    - **Action Context**: `evaluateActionCondition` (`action-condition-evaluator.ts`) checks conditions for effects.
    - **Static Context**: `evaluateStaticCondition` (`static-ability-utils.ts`) checks conditions for continuous abilities.
    - **Continuous Context**: `matchesContinuousEffectCondition` (`continuous-effects.ts`) checks conditions for global effects.
    - **Observation**: Same logic (e.g., "if you have a character") is implemented 3+ times with different context shapes.

## Findings

### 1. Split Execution Pipeline

- **Smell**: **Scattered Concerns**
- **Description**: Rule execution is fragmented. `play-card.ts` handles "native" rules (shifting, singing, enters-tapped), while `composed-effect-resolver.ts` handles "effect" rules. Triggered abilities are a third path.
- **Affected Subsystems**: Move Handlers, Effect Resolution, Event System.
- **Danger**: Adding a new rule (e.g., "Ward" preventing choosing) requires checking multiple execution paths. Inconsistent behavior between "played" effects and "triggered" effects.
- **Recommendation**: Unify under a single **Rule Evaluation Core** that handles _all_ state mutations via standardized Effects.

### 2. Condition Evaluation Duplication

- **Smell**: **Duplicated Code / Divergent Logic**
- **Description**: `action-condition-evaluator.ts`, `static-ability-utils.ts`, and `continuous-effects.ts` all implement overlapping condition logic (`and`, `or`, `turn-metric`, `target-query`).
- **Affected Subsystems**: Condition Evaluation.
- **Danger**: Fixing a bug in "Count Characters" condition in one place leaves it broken in others. New conditions must be implemented 3 times.
- **Recommendation**: Create a **Condition Service** with a single `evaluate(condition, context)` API. Adapters can normalize the context.

### 3. Targeting Duplication

- **Smell**: **Leaky Abstraction / DRI (Don't Repeat Yourself) Violation**
- **Description**: `play-card.ts` contains ~1000 lines of target collection/normalization logic. This logic is also present in `composed-effect-resolver.ts` and `target-resolver.ts`.
- **Affected Subsystems**: Targeting, Moves.
- **Danger**: `play-card.ts` is tightly coupled to the shape of every possible effect target. Adding a new target selector requires modifying the move handler.
- **Recommendation**: Extract a **Targeting Service** that owns normalization, candidate resolution, and validation. Moves should just ask "Is this target valid?".

### 4. Derived-State Abstraction Leak

- **Smell**: **Feature Envy / Tight Coupling**
- **Description**: `card-derived.ts` calculates card properties. However, runtime code (`play-card.ts`, `static-ability-utils.ts`) often bypasses this or re-imports specific helpers (`getRulesEffectiveCardStrengthValue`) to recalculate values locally.
- **Affected Subsystems**: Projection, Runtime Rules.
- **Danger**: Runtime truth diverges from UI truth. "Projected" state is treated as "Read Model" but sometimes acts as "Write Model" source.
- **Recommendation**: Make **Derived Card State Service** the _only_ source of truth for effective stats. Runtime should query this service, not recalculate.

### 5. Lifecycle Model Fragmentation

- **Smell**: **Shotgun Surgery**
- **Description**: Different types of effects have different lifecycle managers:
  - `PendingActionEffect`: `pending-action-effects.ts`
  - `ContinuousEffect`: `continuous-effects.ts`
  - `TemporaryEffect`: `temporary-effects.ts`
  - `TriggeredAbility`: Triggered Ability Bag (implied).
- **Affected Subsystems**: State Management, Turn Lifecycle.
- **Danger**: "Clean up at end of turn" requires visiting 4 different state branches. Complex interactions (e.g., "While this is active...") are hard to coordinate.
- **Recommendation**: Unified **Effect Lifetime Registry** to manage all duration-based modifiers.

## Refactor Roadmap

### Phase 1: Unify Condition Evaluation (Completed)

- **Goal**: Single source of truth for `Condition` logic.
- **Steps**:
  1.  Create `packages/lorcana/lorcana-engine/src/rules/condition-evaluator.ts`. (Done)
  2.  Define a generic `EvaluationContext` interface. (Done)
  3.  Migrate logic from `action-condition-evaluator.ts` and `static-ability-utils.ts` into this service. (Done)
  4.  Refactor consumers to adapt their specific context (Move vs Static) to the generic context. (Done)
- **Risk**: Low. Pure logic refactor.

### Phase 2: Extract Targeting Service (Completed)

- **Goal**: Remove targeting logic from `play-card.ts`.
- **Steps**:
  1.  Create `packages/lorcana/lorcana-engine/src/targeting/targeting-service.ts`. (Done)
  2.  Move `collect...TargetDescriptors` and `resolve...Candidates` logic from `play-card.ts` to this service. (Done - removed dead code, logic exists in service)
  3.  Expose `validateTargets(query, selection, context)` and `resolveCandidates(query, context)`. (Done - exposed existing service methods)
  4.  Update `play-card.ts` to delegate to this service. (Done)
- **Risk**: Medium. Heavy logic movement; ensure tests cover all target types.

### Phase 3: Centralize Derived State (Completed)

- **Goal**: Ensure runtime and UI see the same card stats.
- **Steps**:
  1.  Promote `card-derived.ts` to a core Runtime Service (`src/rules/derived-state.ts`). (Done)
  2.  Refactor `static-ability-utils.ts` and `continuous-effects.ts` to _contribute_ to this service but not _bypass_ it. (Done)
  3.  Ensure `play-card.ts` queries this service for "Cost" and "Strength" instead of calculating locally. (Done)
- **Risk**: High. Circular dependencies are likely (Derived State depends on Static Abilities, which depend on Derived State). Needs careful layering (e.g., two-pass calculation). (Managed by careful function extraction)

### Phase 4: Unified Effect Registry (Completed)

- **Goal**: Consistent handling of effect durations.
- **Steps**:
  1.  Create `src/rules/effect-registry.ts`. (Done)
  2.  Define common `EffectInstance` type with `duration`, `expiry`, and `source`. (Done)
  3.  Migrate `ContinuousEffectState` and `Temporary...State` to use this common registry. (Done - Logic centralized)
  4.  Update `end-of-turn` logic to sweep the registry. (Done - using centralized `isEffectExpired` logic)
- **Risk**: Medium. State shape change requires migration if persistence is a concern (likely not for this engine stage).

## Public Interfaces / Architecture Boundaries

### 1. Rules Evaluation Core

- **Responsibility**: Entry point for checking if an action is valid and what it does.
- **API**: `evaluateRule(rule, context) -> Result`

### 2. Targeting Service

- **Responsibility**: Interprets Target DSL.
- **API**:
  - `getValidTargets(query, context) -> Candidate[]`
  - `validateSelection(query, selection, context) -> boolean`

### 3. Condition Service

- **Responsibility**: Boolean logic engine.
- **API**: `checkCondition(condition, context) -> boolean`

### 4. Derived Card State Service

- **Responsibility**: Computes "effective" card values.
- **API**: `getEffectiveCard(cardId, state) -> EffectiveCardSnapshot`

### 5. Effect Lifetime Registry

- **Responsibility**: Manages "active" effects.
- **API**:
  - `registerEffect(effect, duration)`
  - `cleanup(trigger)` (e.g., end of turn)
