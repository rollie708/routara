import { ArrowDownUp, ArrowRight, ArrowUpRight, Boxes, GitBranch, Layers3, MoveUpRight, Network, ScanLine, ShieldCheck, Waypoints, Zap, type LucideIcon } from "lucide-react";
import { SectionLabel } from "./section-heading";

function FeatureCard({ icon: Icon, title, children, index }: { icon: LucideIcon; title: string; children: string; index: string }) {
  return <article className="problem-card"><div className="problem-card-top"><div className="line-icon"><Icon size={27} strokeWidth={1.2}/></div><span>{index}</span></div><h3>{title}</h3><p>{children}</p></article>;
}

export function Problem() {
  return <section id="problem" className="section container">
    <SectionLabel number="01">THE CHALLENGE</SectionLabel>
    <div className="section-intro"><h2>Blockchain infrastructure is fragmented.<br/><span>The experience shouldn&apos;t be.</span></h2><p>More networks mean more possibilities.<br/>They shouldn&apos;t mean more complexity.</p></div>
    <div className="problem-grid">
      <FeatureCard index="01 /" icon={Boxes} title="Disconnected Networks">Assets and applications exist across separate blockchain ecosystems, making it difficult to move between them smoothly.</FeatureCard>
      <FeatureCard index="02 /" icon={Layers3} title="Too Many Steps">Users may need to manage networks, bridge assets, swap tokens, and prepare transactions separately to accomplish a single objective.</FeatureCard>
      <FeatureCard index="03 /" icon={GitBranch} title="Complex Execution">Finding suitable routes, understanding costs, and tracking transactions across chains can create unnecessary friction.</FeatureCard>
    </div>
  </section>;
}

const capabilities = [
  { icon: ArrowDownUp, name: "Bridge", copy: "Move supported assets between compatible blockchain networks using available routes." },
  { icon: Network, name: "Swap", copy: "Exchange supported assets as part of a cross-chain workflow when suitable liquidity and integrations exist." },
  { icon: Waypoints, name: "Route", copy: "Compare eligible paths by estimated output, cost, speed, and route reliability." },
  { icon: Zap, name: "Execute", copy: "Coordinate supported actions with clear transaction-status tracking, from initiation to completion." },
];

export function Solution() {
  return <section className="solution-wrap" id="solution"><div className="section container">
    <SectionLabel number="02">THE ROUTARA APPROACH</SectionLabel>
    <div className="solution-intro"><h2>One place to coordinate<br/><span>cross-chain execution.</span></h2><p>Start with what you want to do. ROUTARA is being designed around user intent, coordinating supported cross-chain operations through one unified experience.</p></div>
    <div className="capabilities">{capabilities.map(({ icon: Icon, name, copy }, index) => <article className="capability" key={name}><div className="capability-top"><Icon size={26} strokeWidth={1.3}/><span className="mini-badge">PLANNED</span></div><h3>{name}<ArrowUpRight size={20}/></h3><p>{copy}</p><div className="capability-base"><span>0{index + 1}</span><span className="capability-line"/></div></article>)}</div>
    <div className="solution-note"><span className="status-dot"/> One unified experience. Built step by step.<span>ALL CAPABILITIES IN DEVELOPMENT</span></div>
  </div></section>;
}

const differences = [
  { icon: ScanLine, title: "Intent-driven workflows", copy: "Start with the outcome you want to achieve, instead of piecing together individual transactions." },
  { icon: GitBranch, title: "Route intelligence", copy: "Compare available paths rather than relying on a single fixed route." },
  { icon: Layers3, title: "Unified execution", copy: "Work toward connecting supported bridging, swapping, and destination actions in one workflow." },
  { icon: ShieldCheck, title: "Transparent decisions", copy: "Make route details, estimated costs, and transaction progress easier to understand." },
  { icon: MoveUpRight, title: "Adaptive routing vision", copy: "Explore alternative valid paths when a direct route is unavailable, where supported infrastructure makes it possible." },
];

export function Differentiators() {
  return <section className="section container differences"><div className="differences-heading"><SectionLabel number="04">DESIGNED WITH INTENT</SectionLabel><h2>Built around outcomes,<br/><span>not isolated transactions.</span></h2><p>A more considered approach to moving across chains. Clearer choices. Connected steps. Your intent at the center.</p><a className="text-link" href="#roadmap">See what we&apos;re building <ArrowRight size={17}/></a><div className="intent-graphic" aria-hidden="true"><span className="intent-graphic-tag">YOUR INTENT</span><div className="intent-graphic-path"><i/><i/><i/></div><span className="intent-graphic-result"><ScanLine size={22}/> ONE OUTCOME</span></div></div><div className="difference-list">{differences.map(({ icon: Icon, title, copy }, i) => <article key={title}><div className="difference-icon"><Icon size={22} strokeWidth={1.3}/></div><div><h3>{title}</h3><p>{copy}</p></div><span className="difference-number">0{i + 1}</span></article>)}</div></section>;
}
