import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@payload-config": path.resolve(__dirname, "src/payload.config.ts"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/int/**/*.int.spec.ts"],
    // Creates a throw-away PostgreSQL database (HC_TEST_PG_URL) and boots a full Payload instance on it.
    testTimeout: 60_000,
    hookTimeout: 180_000,
    fileParallelism: false,
  },
});
