import { describe, expect, it, vi } from "vitest";
import { signupSchema, successMessage } from "../src/lib/signup-schema";
import { handleSignup, type SignupDependencies } from "../src/lib/signup-handler";

const origin = "https://routara.example";
const valid = { email: "user@example.com", xUsername: "@user", projectUpdates: true, website: "" };
function request(body: unknown = valid, headers: Record<string, string> = {}) { return new Request(`${origin}/api/early-access`, { method: "POST", headers: { origin, "content-type": "application/json", ...headers }, body: JSON.stringify(body) }); }
function deps(overrides: Partial<SignupDependencies> = {}): SignupDependencies { return { configured: true, allowedOrigin: origin, rateLimit: vi.fn(async () => true), save: vi.fn(async () => {}), ...overrides }; }

describe("signup validation", () => {
  it("normalizes email and an optional X username", () => { expect(signupSchema.parse({ ...valid, email: " User@Example.COM ", xUsername: " @user " })).toMatchObject({ email: "user@example.com", xUsername: "user" }); });
  it.each(["", "plain", "user@", "user@example.com\r\nInjected: header", "a".repeat(255) + "@example.com"])("rejects invalid email %s", email => { expect(signupSchema.safeParse({ email }).success).toBe(false); });
  it("permits registration without marketing consent or a username", () => { expect(signupSchema.parse({ email: valid.email })).toMatchObject({ projectUpdates: false, xUsername: "" }); });
  it.each(["@", "two words", "https://x.com/user", "a".repeat(16)])("rejects invalid handles %s", xUsername => { expect(signupSchema.safeParse({ ...valid, xUsername }).success).toBe(false); });
  it("rejects spam and incorrectly typed consent", () => { expect(signupSchema.safeParse({ ...valid, website: "bot" }).success).toBe(false); expect(signupSchema.safeParse({ ...valid, projectUpdates: "yes" }).success).toBe(false); });
});

describe("signup submission", () => {
  it("waits for persistence before returning success", async () => {
    let resolveSave!: () => void;
    const save = vi.fn(() => new Promise<void>(resolve => { resolveSave = resolve; }));
    let settled = false;
    const pending = handleSignup(request(), deps({ save })).then(response => { settled = true; return response; });
    await vi.waitFor(() => expect(save).toHaveBeenCalledOnce());
    expect(settled).toBe(false);
    resolveSave();
    const response = await pending;
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ message: successMessage });
    expect(save).toHaveBeenCalledWith({ ...valid, xUsername: "user" });
    expect(response.headers.get("cache-control")).toBe("no-store");
  });
  it("returns setup state without attempting persistence", async () => { const d = deps({ configured: false }); const response = await handleSignup(request(), d); expect(response.status).toBe(503); expect(d.save).not.toHaveBeenCalled(); expect((await response.json()).message).toContain("configured"); });
  it("never reports success when the database fails", async () => { const d = deps({ save: vi.fn(async () => { throw new Error("database credentials"); }) }); const response = await handleSignup(request(), d); expect(response.status).toBe(503); const body = await response.json(); expect(body.message).toContain("couldn't save"); expect(JSON.stringify(body)).not.toContain("credentials"); });
  it("fails closed when rate-limit storage fails", async () => { const d = deps({ rateLimit: vi.fn(async () => { throw new Error("offline"); }) }); expect((await handleSignup(request(), d)).status).toBe(503); expect(d.save).not.toHaveBeenCalled(); });
  it("rejects cross-origin requests", async () => { const d = deps(); expect((await handleSignup(request(valid, { origin: "https://other.example" }), d)).status).toBe(403); expect(d.save).not.toHaveBeenCalled(); });
  it("validates on the server before accessing storage", async () => { const d = deps(); expect((await handleSignup(request({ email: "invalid" }), d)).status).toBe(400); expect(d.rateLimit).not.toHaveBeenCalled(); expect(d.save).not.toHaveBeenCalled(); });
  it("rejects filled honeypots instead of faking success", async () => { const d = deps(); expect((await handleSignup(request({ ...valid, website: "spam" }), d)).status).toBe(400); expect(d.save).not.toHaveBeenCalled(); });
  it("returns rate limiting and a retry interval", async () => { const d = deps({ rateLimit: vi.fn(async () => false) }); const response = await handleSignup(request(), d); expect(response.status).toBe(429); expect(response.headers.get("retry-after")).toBe("900"); expect(d.save).not.toHaveBeenCalled(); });
  it("rejects oversized bodies even without content-length", async () => { const d = deps(); const response = await handleSignup(request({ email: "x".repeat(5000) }), d); expect(response.status).toBe(413); expect(d.save).not.toHaveBeenCalled(); });
  it("rejects malformed JSON and unsupported media types", async () => { const malformed = new Request(`${origin}/api/early-access`, { method: "POST", headers: { origin, "content-type": "application/json" }, body: "{" }); expect((await handleSignup(malformed, deps())).status).toBe(400); expect((await handleSignup(request(valid, { "content-type": "text/plain" }), deps())).status).toBe(415); });
});
