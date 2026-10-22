import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./section-heading";

const phases = [
  { name: "Foundation", status: "In Development", items: ["Core platform architecture", "Initial network and asset support", "Route discovery and comparison", "Early-access community"] },
  { name: "Cross-Chain Execution", status: "Planned", items: ["Supported bridge and swap workflows", "Transaction lifecycle tracking", "Improved route selection and execution visibility"] },
  { name: "Advanced Execution", status: "Planned", items: ["More network and provider integrations", "More complex multi-step workflows", "Further route optimization and recovery capabilities"] },
];
export function Roadmap() {
  return <section className="roadmap-wrap" id="roadmap"><div className="section container"><SectionLabel number="05">WHAT WE ARE BUILDING</SectionLabel><div className="section-intro"><h2>A foundation for a more<br/><span>connected on-chain experience.</span></h2><p>Thoughtfully built.<br/>One meaningful step at a time.</p></div><div className="roadmap-grid">{phases.map((phase, i) => <article className={`roadmap-phase ${i === 0 ? "active" : ""}`} key={phase.name}><div className="phase-track"><span/><div/></div><div className="phase-meta"><span>PHASE 0{i + 1}</span><ArrowUpRight size={17}/></div><h3>{phase.name}</h3><span className={`phase-status ${i === 0 ? "current" : ""}`}>{i === 0 && <span className="status-dot"/>}{phase.status}</span><ul>{phase.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div><p className="roadmap-note">Our direction, not a delivery promise. Development stages and planned features may evolve. No launch dates have been announced.</p></div></section>;
}
