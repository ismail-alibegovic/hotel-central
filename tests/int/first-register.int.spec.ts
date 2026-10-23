import { handleEndpoints } from "payload";
import { describe, expect, it } from "vitest";
import { boot, rand } from "./helpers";

const register = (payload: { config: never }) =>
  handleEndpoints({
    config: payload.config,
    request: new Request("http://localhost:3000/api/users/first-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: `intruder-${rand()}@example.test`, password: "Pw-" + rand() + rand() }),
    }),
  });

describe("first-user takeover window", () => {
  it("anonymous first-register is refused on an empty database (default)", async () => {
    const h = await boot({ ALLOW_FIRST_REGISTER: undefined });
    try {
      const res = await register(h.payload as never);
      expect(res.status).toBe(403);
      expect((await h.payload.count({ collection: "users", overrideAccess: true })).totalDocs).toBe(0);
    } finally {
      await h.stop();
    }
  });
});
