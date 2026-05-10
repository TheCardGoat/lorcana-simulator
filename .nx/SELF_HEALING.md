# Self-Healing CI Configuration

## Repository Context

- This is a TypeScript Nx workspace for a Disney Lorcana TCG simulator.
- The primary CI command is `pnpm run ci-check-full:verbose`.
- When `scripts/ci-check.sh` reports a failure, start with the printed tail. Only open the full log path if the tail is insufficient.
- Prefer running the smallest relevant Nx target first, then broaden verification only after the targeted check passes.

## Fix Preferences

- Preserve type safety. Do not introduce `any` or broad `unknown` types.
- Prefer clean fixes over compatibility shims, deprecations, or migrations.
- For lint and formatting failures, use the existing repo scripts before editing by hand: `pnpm run lint:fix` and `pnpm run format:fix`.
- For type errors, fix the source types explicitly instead of suppressing diagnostics.
- For tests, keep changes scoped to the failing behavior and add focused coverage when the bug fix changes runtime behavior.

## Package Boundaries

- `@tcg/lorcana-engine` must not import `@tcg/lorcana-cards`, including in tests.
- Engine tests must use mock cards.
- Integration coverage that needs real card definitions belongs under `packages/lorcana/lorcana-simulator/src/testing/**`.

## Frontend Preferences

- Simulator UI changes should optimize mobile portrait usability first while keeping desktop usable.
- Prefer existing ShadCN Svelte components, then Tailwind utilities.
- Avoid custom CSS unless existing components and Tailwind utilities are insufficient.

## Off-Limits Areas

- Do not edit generated cache/output directories such as `.nx/cache`, `.nx/workspace-data`, `dist`, `.svelte-kit`, `coverage`, or `node_modules`.
- Do not change package-manager lockfiles unless the fix intentionally changes dependencies.
