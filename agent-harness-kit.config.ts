import { defineHarness } from "@cardor/agent-harness-kit";

export default defineHarness({
  project: {
    name: "lorcana-simulator",
    description:
      "A trading card game simulator for Disney Lorcana TCG, written in typescript. It contains the Tabletop Simulator (UI), Engine rules, and card definitions.",
    docsPath: "./docs",
  },

  provider: "opencode",

  agents: {
    lead: { instructionsPath: null },
    explorer: { instructionsPath: null, allowedPaths: ["./docs", "./src"] },
    builder: { instructionsPath: null, writablePaths: ["./src", "./tests"] },
    reviewer: { instructionsPath: null },
    custom: [],
  },

  // SQLite (default). Switch to postgres/mysql by changing database.type.
  // database: { type: 'postgres', connectionString: process.env.DATABASE_URL },
  // database: { type: 'mysql',    connectionString: process.env.DATABASE_URL },
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
    required: true,
  },

  tools: {
    mcp: { enabled: true, port: 3742 },
    scripts: { enabled: true, outputDir: "./.harness/scripts" },
  },
});
