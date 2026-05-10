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

# AGENTS.md — lorcana-simulator

> **Read this file first.** It is the navigation map for every AI agent working in this repository.

## Project

**lorcana-simulator** — A trading card game simulator for Disney Lorcana TCG, written in typescript. It contains the Tabletop Simulator (UI), Engine rules, and card definitions.

## Health check (run before starting)

```bash
bash health.sh
```

If it exits non-zero, stop and report the issue. Do not proceed with tasks until health is green.

## Harness data (source of truth)

| File                         | Purpose                                                    |
| ---------------------------- | ---------------------------------------------------------- |
| `.harness/harness.db`        | SQLite: all tasks, actions, file changes, tool calls       |
| `.harness/current.md`        | Markdown fallback — read this if MCP server is unavailable |
| `.harness/feature_list.json` | Human-editable task seed list                              |

## MCP tools (preferred)

The harness exposes tools via MCP server on port 3742. Use these instead of reading files directly.

```
actions.start        taskId agent                           → start an action, returns actionId
actions.write        actionId section text                  → record a section (result, blockers, ...)
actions.record_tool  actionId toolName [argsJson] [summary] → log a tool call to the Tools dashboard
actions.record_file  actionId filePath operation [notes]   → log a file touch to the Files dashboard
actions.complete     actionId summary                       → close the action
actions.get          taskId                                 → full action history for a task
tasks.add            title [slug] [description] [acceptance] → create a new task from natural language
tasks.get            [status]                               → list tasks (pending | in_progress | done | blocked)
tasks.claim          id                                     → atomically claim a pending task
tasks.update         id status                              → change task status
tasks.acceptance.update criterionId                        → mark an acceptance criterion as met
docs.search          query                                  → search ./docs for relevant content
```

## Workflow

```
1. INIT
   - Run health.sh → exit 1 means stop
   - tasks.get('in_progress') → resume if something is in progress
   - tasks.get('pending') → pick lowest id

2. WORK  (lead → explorer → builder → reviewer)
   - Each agent calls actions.start(taskId, agentName) → actionId
   - After EVERY tool call: actions.record_tool(actionId, toolName, args, summary)
   - After EVERY file change: actions.record_file(actionId, filePath, operation, notes)
   - Closes with actions.complete(actionId, summary)

3. CLOSE
   - tasks.update(taskId, 'done')
   - Run health.sh → must be green before closing
```

## Agent roles

| Agent    | Responsibility                                      |
| -------- | --------------------------------------------------- |
| lead     | Decomposes the task into a plan, assigns sub-agents |
| explorer | Reads and maps relevant code, never writes          |
| builder  | Implements the plan, writes files                   |
| reviewer | Verifies acceptance criteria, approves or blocks    |

## What to read

```
Always:         .harness/current.md (or MCP tasks.get)
If implementing: ./docs/
If orchestrating: Agent definition files in your provider's agents directory
```
