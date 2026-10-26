import { describe, expect, it } from "vitest";
import { getLaunchCountdown, isLaunchActive, launchTimestamp } from "@/lib/launch";

describe("ROUTARA launch timing", () => {
  it("uses the exact UTC launch instant", () => {
    expect(launchTimestamp).toBe(Date.UTC(2026, 9, 26, 15, 0, 0));
  });

  it("counts down independently of the visitor timezone", () => {
    expect(getLaunchCountdown(launchTimestamp - (2 * 86_400 + 3 * 3_600 + 4 * 60 + 5) * 1000)).toMatchObject({ days: 2, hours: 3, minutes: 4, seconds: 5, launched: false });
  });

  it("activates at and after the launch instant", () => {
    expect(isLaunchActive(launchTimestamp - 1)).toBe(false);
    expect(isLaunchActive(launchTimestamp)).toBe(true);
    expect(getLaunchCountdown(launchTimestamp)).toMatchObject({ days: 0, hours: 0, minutes: 0, seconds: 0, launched: true });
  });
});
