import nx from "@nx/eslint-plugin";
import tseslint from "typescript-eslint";

// Boundaries-only ESLint config. Code style/lint stays on oxlint via vp.
// We pull in @nx/eslint-plugin's flat/base (registers the plugin) and a
// TypeScript parser so import statements in .ts/.tsx parse correctly.
//
// Current scope (see `pnpm boundaries`): each package's entry `src/index.ts`.
// Broader rollout is blocked on:
//   1. @nx/eslint-plugin@22 crashes on `@tcg/lorcana-cards` subpath imports
//      (the package uses `exports` for ~40 subpaths; the rule's secondary-
//      entry-point detection returns null and TypeError-crashes).
//   2. Several existing relative-path cross-package imports in test files
//      (e.g. `../../lorcana-cards/...`) need to be rewritten to use the
//      `@tcg/*` scope — the rule will flag them once enabled there.

export default [
  ...nx.configs["flat/base"],
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/.svelte-kit/**",
      "**/.next/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/storybook-static/**",
      "**/src/lib/paraglide/**",
      "**/src/i18n/paraglide/**",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
    },
    linterOptions: {
      // Source files contain `eslint-disable @typescript-eslint/...` comments
      // for oxlint or other linters; don't fail on those when we only enforce
      // module-boundaries here.
      reportUnusedDisableDirectives: "off",
    },
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          allow: [],
          depConstraints: [
            { sourceTag: "independent", onlyDependOnLibsWithTags: ["independent"] },
            { sourceTag: "types", onlyDependOnLibsWithTags: ["types", "independent"] },
            {
              sourceTag: "foundation",
              onlyDependOnLibsWithTags: ["foundation", "types", "independent"],
            },
            {
              sourceTag: "game-engine",
              onlyDependOnLibsWithTags: [
                "game-engine",
                "foundation",
                "types",
                "independent",
              ],
            },
            {
              sourceTag: "card-data",
              onlyDependOnLibsWithTags: ["types", "game-engine", "independent"],
            },
            { sourceTag: "lorcana", onlyDependOnLibsWithTags: ["*"] },
          ],
        },
      ],
    },
  },
];
