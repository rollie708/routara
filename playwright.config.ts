import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  use: { baseURL: "http://localhost:3010", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", testMatch: "site.spec.ts", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", testMatch: "site.spec.ts", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" } },
    { name: "signup-ui", testMatch: "signup-ui.spec.ts", use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:3011" } },
  ],
  webServer: [
    { command: "npm run start -- --port 3010", url: "http://localhost:3010", reuseExistingServer: false, timeout: 60000 },
    {
      command: "npm run start -- --port 3011",
      url: "http://localhost:3011",
      timeout: 60000,
      env: { DATABASE_URL: "postgresql://ui_test:ui_test@127.0.0.1:1/ui_test", RATE_LIMIT_SECRET: "isolated-ui-test-secret-not-for-production", NEXT_PUBLIC_SITE_URL: "http://localhost:3011" },
    },
  ],
});
