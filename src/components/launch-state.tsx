"use client";

import { useEffect, useState } from "react";
import { getLaunchCountdown, isLaunchActive, type LaunchCountdown } from "@/lib/launch";

export function useLaunchState(initialLaunched: boolean) {
  const [launched, setLaunched] = useState(initialLaunched);

  useEffect(() => {
    const update = () => setLaunched(isLaunchActive());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return launched;
}

export function Countdown({ initialLaunched, initialCountdown }: { initialLaunched: boolean; initialCountdown: LaunchCountdown }) {
  const [countdown, setCountdown] = useState<LaunchCountdown>(initialCountdown);

  useEffect(() => {
    const update = () => setCountdown(getLaunchCountdown());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (initialLaunched || countdown.launched) return null;

  return <div className="countdown-grid" aria-label="Countdown to the ROUTARA launch">
    {[[countdown.days, "days"], [countdown.hours, "hours"], [countdown.minutes, "minutes"], [countdown.seconds, "seconds"]].map(([value, label]) => <div className="countdown-unit" key={label}>
      <strong>{String(value).padStart(2, "0")}</strong><span>{label}</span>
    </div>)}
  </div>;
}
