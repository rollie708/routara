import { expect, test } from "@playwright/test";

test("navigation, FAQ, legal pages, and layout", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page).toHaveTitle("ROUTARA — Cross-Chain Execution, Reimagined");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("One Intent.Every Chain.Every Action.");
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Follow on X" })).toHaveAttribute("href", "https://x.com/routarachain");
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "Join Telegram" })).toHaveAttribute("href", "https://t.me/routarachain");
  if (testInfo.project.name === "mobile") {
    const menu = page.locator(".menu-toggle");
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "How It Works" }).click();
    await expect(page).toHaveURL(/#how-it-works$/);
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  } else {
    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Vision" }).click();
    await expect(page).toHaveURL(/#vision$/);
  }
  await page.locator("summary").filter({ hasText: "Is ROUTARA live?" }).click();
  await expect(page.locator("details[open]")).toContainText("Not yet.");
  await page.locator("summary").filter({ hasText: "Is early access free?" }).click();
  await expect(page.locator("details[open]")).toHaveCount(1);
  await expect(page.locator("details[open]")).toContainText("does not guarantee");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole("contentinfo").getByRole("link", { name: "Privacy Policy" }).click();
  await expect(page.getByRole("heading", { name: "Privacy Policy", exact: true })).toBeVisible();
  await page.getByRole("contentinfo").getByRole("link", { name: "Terms of Use" }).click();
  await expect(page.getByRole("heading", { name: "Terms of Use", exact: true })).toBeVisible();
});

test("unconfigured registration is honest and disabled", async ({ page, request }) => {
  await page.goto("/#early-access");
  await expect(page.getByText("Registration opens soon.", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Early Access" })).toBeDisabled();
  const response = await request.post("/api/early-access", { headers: { Origin: "http://localhost:3000" }, data: { email: "test@example.com" } });
  expect(response.status()).toBe(503);
  expect((await response.json()).message).toContain("configured");
});

test("reduced motion and metadata resources", async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator(".route-travel").first().evaluate(el => getComputedStyle(el).animationName)).toBe("none");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
  for (const path of ["/sitemap.xml", "/robots.txt", "/routara-symbol.svg", "/opengraph-image", "/twitter-image", "/apple-icon"]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
});
