import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: { "*": "vp check --fix" },
  lint: {
    options: { typeAware: false, typeCheck: false },
    rules: {
      "unicorn/no-empty-file": "off",
      "unicorn/no-thenable": "off",
      "eslint/no-unused-vars": "off",
    },
  },
  test: {
    exclude: ["**/node_modules/**", "**/dist/**", "**/e2e/**"],
  },
  run: {
    tasks: {
      build: {
        command: "vp run -r --cache build",
        input: [{ auto: true }, "!**/*.tsbuildinfo", "!**/dist/**", "!**/build/**", "!**/.vite/**"],
      },
    },
  },
});
