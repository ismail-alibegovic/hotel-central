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
    // Spins up an in-memory MongoDB and a full Payload instance; first run downloads the mongod binary.
    testTimeout: 60_000,
    hookTimeout: 180_000,
    fileParallelism: false,
  },
});
