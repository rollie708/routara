import { ArrowRight, CircleCheck, GitBranch, ScanLine, SlidersHorizontal } from "lucide-react";
import { SectionLabel } from "./section-heading";

const steps = [
  { icon: ScanLine, title: "Define Your Intent", copy: "Specify the asset, destination, or supported outcome you want." },
  { icon: GitBranch, title: "Find a Route", copy: "ROUTARA is designed to identify and compare eligible execution paths across supported infrastructure." },
  { icon: SlidersHorizontal, title: "Review the Plan", copy: "Review estimated costs, expected output, route details, and relevant transaction requirements." },
  { icon: CircleCheck, title: "Execute and Track", copy: "Once available, authorize eligible transactions and follow their progress through completion." },
];
export function Workflow() {
  return <section className="section container workflow" id="how-it-works"><SectionLabel number="03">HOW IT WILL WORK</SectionLabel><div className="section-intro"><h2>From intent <span>to execution.</span></h2><p>A clear path from what you want<br/>to the steps that get you there.</p></div><ol className="workflow-steps">{steps.map(({ icon: Icon, title, copy }, i) => <li key={title}><div className="workflow-track"><div className="workflow-icon"><Icon size={25} strokeWidth={1.2}/></div>{i < 3 && <span className="workflow-connector"><ArrowRight size={15}/></span>}</div><span className="step-label">STEP 0{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol><p className="workflow-note">The planned experience. Actual execution depends on network support, liquidity, provider integrations, and the requirements of each route.</p></section>;
}
