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

export const dynamic = "force-dynamic";
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return <main id="main"><Hero/><Problem/><Solution/><Workflow/><Differentiators/><Roadmap/><Vision/><EarlyAccess configured={isSignupConfigured()}/><FAQ/><FinalCTA/></main>;
}
