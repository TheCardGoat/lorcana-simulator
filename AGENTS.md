# AI Agent Setup Guide

- Prefer Clean Breaks over compatibility shims, deprecations or migrations. The project is in a very early stage, we can't afford to break things.
- To optimize token consumption prefer running individual tests, and type checks, only when they pass execute the repo side `bun run ci-check`, When `bun run ci-check` fails, read the reported log path, start with the printed tail, and only open more of the file if the tail is insufficient.
- Type Safety is non-negotiable. Do not rely on `any` or `unknown` types.
- Try your best to use components from ShadCN Svelte.
- Before writing custom CSS classes, use tailwind classes as much as possible
- If the nature of the changes are purely visual, skip the ci-checks
- Package boundary: `@tcg/lorcana-engine` must not import `@tcg/lorcana-cards` anywhere, including tests, because that creates a cyclic dependency. Engine tests must use mock cards; mixed engine-plus-real-card integration coverage belongs in `packages/lorcana/lorcana-simulator/src/testing/**`.

### Agent Files
``
- Commands: `.agents/commands/`
- Skills: `.agents/skills/`

## Design Context

### Users
Primary users are mobile-first players using a cellphone in portrait mode while actively playing a Disney Lorcana game. The interface should still work well on desktop, but mobile interaction quality is the main optimization target. Users need to understand game state quickly and perform simulator actions with minimal friction or ambiguity.

### Brand Personality
The brand personality is simplicity, ergonomy, and performance. The product should feel direct, efficient, and reliable rather than decorative or theatrical. Interaction design should reduce cognitive load and help players act with confidence during live gameplay.

### Aesthetic Direction
Use the existing premium TCG.online brand foundation already present in the codebase, but bias implementation choices toward clarity and interaction efficiency over visual flourish. Prefer ShadCN Svelte components as much as possible, then TailwindCSS utilities, and only write custom CSS when both alternatives have failed. Design and interaction patterns must consistently support both mobile and desktop, with special emphasis on portrait-mode mobile usability for simulator play.

### Design Principles
- Optimize for portrait-mode mobile play first, while keeping desktop fully usable.
- Make every simulator action easy to understand, easy to reach, and easy to execute.
- Prefer ShadCN Svelte components first, TailwindCSS helpers second, and custom CSS only as a last resort.
- Reduce cognitive overhead: clear hierarchy, obvious actions, minimal ambiguity, fast scanning.
- Preserve a simple, ergonomic, high-performance feel in both visuals and interactions.
