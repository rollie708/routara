import { expect, test } from "@playwright/test";

// API responses are explicitly mocked here to test UI behavior, not persistence.
// The isolated server has an unreachable DB; no registration can be stored by this suite.
test("validation, loading, duplicate-click prevention, error recovery, and success", async ({ page }) => {
  let calls = 0;
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/api/early-access", async route => {
    calls++;
    const body = route.request().postDataJSON();
    expect(body).toMatchObject({ email: "person@example.com", xUsername: "person", projectUpdates: false });
    if (calls === 1) {
      await gate;
      await route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ message: "We couldn't save your registration right now. Please try again shortly." }) });
    } else {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ message: "Saved by the mocked test service" }) });
    }
  });
  await page.goto("/#early-access");
  const submit = page.getByRole("button", { name: "Request Early Access" });
  await expect(submit).toBeEnabled();
  await page.getByLabel("Email address").fill("invalid");
  await submit.click();
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  await expect(page.getByLabel("Email address")).toBeFocused();
  expect(calls).toBe(0);
  await page.getByLabel("Email address").fill("Person@Example.com");
  await page.getByLabel("X username").fill("@person");
  await submit.click();
  await expect(page.getByRole("button", { name: "Saving your request…" })).toBeDisabled();
  await page.locator("form").evaluate(form => form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  expect(calls).toBe(1);
  await expect(page.getByText("You're on the list.", { exact: true })).toHaveCount(0);
  release();
  await expect(page.locator("form").getByRole("alert")).toContainText("couldn't save");
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(page.getByRole("heading", { name: "You're on the list." })).toBeVisible();
  expect(calls).toBe(2);
  await expect(submit).toHaveCount(0);
});

test("an unreachable real database never produces signup success", async ({ page }) => {
  // Canonical origin is embedded by Next.js at build time. Match the local build
  // while exercising the isolated server on its separate test port.
  await page.route("**/api/early-access", route => route.continue({ headers: { ...route.request().headers(), origin: "http://localhost:3000" } }));
  await page.goto("/#early-access");
  await page.getByLabel("Email address").fill("database-check@example.com");
  await page.getByRole("button", { name: "Request Early Access" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("couldn't save", { timeout: 20000 });
  await expect(page.getByRole("heading", { name: "You're on the list." })).toHaveCount(0);
});
