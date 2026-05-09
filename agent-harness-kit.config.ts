import { defineHarness } from "@cardor/agent-harness-kit";

export default defineHarness({
  project: {
    name: "lorcana-engine",
    description:
      "Disney Lorcana TCG engine and simulator: rules, card behavior, parser/generator, and multiplayer test harness. Consumed as a submodule by the-card-goat-online.",
    docsPath: "./docs",
  },

  provider: "opencode",

  agents: {
    lead: { instructionsPath: null },
    explorer: { instructionsPath: null, allowedPaths: ["./docs", "./packages"] },
    builder: { instructionsPath: null, writablePaths: ["./packages"] },
    reviewer: { instructionsPath: null },
    custom: [],
  },

  database: { type: "sqlite", path: ".harness/harness.db" },

  storage: {
    dir: ".harness",
    tasks: { adapter: "local" },
    sections: {
      toolsUsed: true,
      filesModified: true,
      result: true,
      blockers: true,
      nextSteps: false,
    },
    markdownFallback: { enabled: true, path: ".harness/current.md" },
  },

  health: {
    scriptPath: "./health.sh",
    required: false,
  },

  tools: {
    mcp: { enabled: true, port: 3742 },
    scripts: { enabled: true, outputDir: "./.harness/scripts" },
  },
});
