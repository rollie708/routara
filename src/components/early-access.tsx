import { ArrowUpRight, Check } from "lucide-react";
import { EarlyAccessForm } from "./early-access-form";
import { SectionLabel } from "./section-heading";

export function EarlyAccess({ configured }: { configured: boolean }) {
  return <section className="early-access-wrap" id="early-access"><div className="section container early-access"><div className="early-access-copy"><SectionLabel number="07">GET IN EARLY</SectionLabel><h2>Get Early Access<br/>to <span>ROUTARA.</span><ArrowUpRight className="early-arrow" strokeWidth={1}/></h2><p>Be among the first to follow ROUTARA as we build a simpler way to execute across chains. Join the early-access list for product updates, development milestones, and information about upcoming access opportunities.</p><div className="early-perks"><span><Check size={14}/> Free to join</span><span><Check size={14}/> No wallet required</span></div><div className="early-footnote"><span className="status-dot"/> BUILT FOR WHAT COMES NEXT.<br/><span>Early access does not guarantee immediate access or token allocations.</span></div></div><EarlyAccessForm configured={configured}/></div></section>;
}
