# Lorcana Action Migration Guide

Use these mappings when converting a legacy action card into the new engine:

- `resolution` chains -> one `action` ability with `effect: { type: "sequence", steps: [...] }`
  Example card: `src/cards/010/actions/029-the-horseman-strikes.ts`
  Example test: `src/cards/010/actions/029-the-horseman-strikes.test.ts`
- `optional: true` -> `type: "optional"`
  Example card: `src/cards/010/actions/029-the-horseman-strikes.ts`
  Example test: `src/cards/010/actions/029-the-horseman-strikes.test.ts`
- legacy `modal` -> `type: "choice"`
  Example card: `src/cards/010/actions/095-trust-in-me.ts`
  Example test: `src/cards/010/actions/095-trust-in-me.test.ts`
- generic `move` -> specific movement effect types like `return-to-hand`, `put-into-inkwell`, or `move-to-location`
  Example card: `src/cards/010/actions/061-begone.ts`
  Example test: `src/cards/010/actions/061-begone.test.ts`
- target-derived values -> `amount` or `modifier` from a target-aware source instead of a legacy layer builder
  Example card: `src/cards/010/actions/064-performance-review.ts`
  Example test: `src/cards/010/actions/064-performance-review.test.ts`
- responder-driven legacy stack flows -> pending effect resolution from the responding client
  Example card: `src/cards/010/actions/063-swooping-strike.ts`
  Example test: `src/cards/010/actions/063-swooping-strike.test.ts`
- duration buffs -> direct `modify-stat`, `gain-keyword`, or `restriction` with `duration`
  Example card: `src/cards/010/actions/198-the-games-afoot.ts`
  Example test: `src/cards/010/actions/198-the-games-afoot.test.ts`
- temporary "whenever one of your characters quests this turn" text -> `grant-ability` on
  `YOUR_CHARACTERS`, then consume that temporary ability from `quest`
  Example card: `src/cards/001/actions/097-steal-from-the-rich.ts`
  Example test: `src/cards/001/actions/097-steal-from-the-rich.test.ts`
- reuse-the-same-chosen-target -> `target: { ref: "previous-target" }` for follow-up effects, and
  `reference: "selected-first"` inside `target-query` conditions
  Example cards: `src/cards/010/actions/065-fragile-as-a-flower.ts`,
  `src/cards/010/actions/162-promising-lead.ts`,
  `src/cards/010/actions/129-next-stop-olympus.ts`

Implementation rules:

- Start from printed card text, then use legacy only to recover timing and branch semantics.
- Reuse one chosen target across later steps with `target: { ref: "previous-target" }`; use
  `reference: "selected-first"` when a conditional needs to inspect that earlier choice.
- For temporary quest-trigger actions, prefer a `grant-ability` layer over ad hoc action-card
  triggered abilities if the runtime already consumes that ability from `quest`.
- Prefer `playCardTo(...)`, `playCardWithChoice(...)`, `playCardOptional(...)`,
  `playCardWithDestinations(...)`, and `respondWith(...)` in tests before dropping to raw option payloads.
- Prefer specific effect types over generic movement or attribute layers.
- Mark cards as partial with `missingImplementation: true` when any printed paragraph still depends on missing runtime
  support.
