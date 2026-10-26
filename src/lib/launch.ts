export const launchTimestamp = Date.UTC(2026, 9, 26, 15, 0, 0);

export type LaunchCountdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  launched: boolean;
};

export function isLaunchActive(now = Date.now()) {
  return now >= launchTimestamp;
}

export function getLaunchCountdown(now = Date.now()): LaunchCountdown {
  const remaining = Math.max(0, launchTimestamp - now);
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    launched: now >= launchTimestamp,
  };
}
