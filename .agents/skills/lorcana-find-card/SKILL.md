---
name: lorcana-find-card
description: Locate Lorcana cards in `packages/lorcana/lorcana-cards` and return deterministic, ranked similar-card references for implementation work. Use when a user asks to find a card by name/slug/set-number, needs definition/test file paths, or needs similar implementation examples.
---

``

````
# Lorcana Find Card
``
Resolve card identity and provide ranked implementation references.

## Required Memory Step

1. Read `memory/schema.md`.
2. Read the latest 5 entries in `memory/bank.md`.
3. Apply guardrails before returning results.

## Card Lookup

## Fast Path CLI (Preferred)

Run this first to avoid broad filesystem scans:

`bun packages/lorcana/lorcana-cards/src/cards/similarity.ts --query "<card name|id|set-number|set-number-slug>" --limit 8`

Interpret the JSON result:

- `status: "ok"`: Use returned `files` and `similarCards` directly.
- `status: "ambiguous"`: Show candidates and ask the user to choose one.
- `status: "not_found"`: Continue with manual deterministic lookup below.

Search canonical card files in:

- `packages/lorcana/lorcana-cards/src/cards/{SET}/characters/{NUM}-*.ts`
- `packages/lorcana/lorcana-cards/src/cards/{SET}/actions/{NUM}-*.ts`
- `packages/lorcana/lorcana-cards/src/cards/{SET}/items/{NUM}-*.ts`
- `packages/lorcana/lorcana-cards/src/cards/{SET}/locations/{NUM}-*.ts`

Use `rg --files` + name/slug filtering for deterministic results.

## Similarity Scoring (Deterministic)

Score each candidate with additive weights:

- `+40` same card type (`character`/`action`/`item`/`location`)
- `+25` shared effect verbs (`draw`, `banish`, `damage`, `discard`, `ready`, `exert`, `quest`, `move`)
- `+20` shared trigger family (`when played`, `whenever`, `start/end of turn`, `static while`)
- `+10` shared named-synergy or keyword family
- `+5` same ink color
- `+5` newer set tie-break preference

Tie-break order:
1. Higher score
2. Higher set number
3. Lexicographic card id

## Output Contract

Return normalized JSON:

```json
{
  "name": "string",
  "title": "string",
  "cardId": "set-number-slug",
  "set": "001",
  "number": 1,
  "type": "character",
  "files": {
    "definition": "packages/lorcana/lorcana-cards/src/cards/...",
    "test": "packages/lorcana/lorcana-cards/src/cards/...test.ts"
  },
  "similarCards": [
    {
      "cardId": "string",
      "score": 0,
      "reason": ["string"],
      "definition": "path",
      "test": "path"
    }
  ]
}
```

Return top 5 similar cards by default.

## Ambiguity Handling

If multiple cards match the lookup term, return candidates with:
- full name/title
- set/number
- definition path

Then ask for explicit selection.

## Post-Execution Memory Update

Append one entry to `memory/bank.md` using `memory/schema.md`.
- Capture bad matches or ranking mistakes.
- Add repeated mismatch patterns to guardrails.
````
