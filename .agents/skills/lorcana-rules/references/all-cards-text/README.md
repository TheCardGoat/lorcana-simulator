# Lorcana Card Text Pattern Analysis

This directory contains tools for generating and analyzing Lorcana card-text patterns.

## Components

1. `generate.ts` - extracts normalized card texts
2. `extract-patterns.ts` - builds pattern frequency/categorization data
3. `index.ts` - orchestrates the workflow

## Working Directory

Run commands from:

```bash
cd .agents/skills/lorcana-rules/references/all-cards-text
```

## Usage

```bash
bun run index.ts all
bun run index.ts generate
bun run index.ts extract
bun run index.ts report
bun run index.ts export-json
bun run index.ts export-ts
```

## Output

Files are written to `output/`:

- `pattern-analysis-report.md`
- `patterns.json`
- `patterns.generated.ts`

## Notes

- `generate.ts` reads card data from `packages/lorcana/lorcana-cards/src/cards/index`.
- Keep this tooling focused on analysis support; do not couple it to deprecated paths.
