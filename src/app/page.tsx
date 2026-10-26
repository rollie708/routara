import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Problem, Solution, Differentiators } from "@/components/features";
import { Workflow } from "@/components/workflow";
import { Roadmap } from "@/components/roadmap";
import { Vision } from "@/components/vision";
import { EarlyAccess } from "@/components/early-access";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/footer";
import { isSignupConfigured } from "@/lib/db";
import { getLaunchCountdown, isLaunchActive } from "@/lib/launch";
import { LaunchSection } from "@/components/launch-section";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const launched = isLaunchActive();
  return <main id="main"><Hero initialLaunched={launched}/><LaunchSection initialLaunched={launched} initialCountdown={getLaunchCountdown()}/><Problem/><Solution/><Workflow/><Differentiators/><Roadmap/><Vision/><EarlyAccess configured={isSignupConfigured()}/><FAQ/><FinalCTA initialLaunched={launched}/></main>;
}
