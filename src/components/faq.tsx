import { Plus } from "lucide-react";
import { SectionLabel } from "./section-heading";

const questions = [
  ["What is ROUTARA?", "ROUTARA is a cross-chain execution platform in development, designed to simplify supported asset transfers, swaps, and on-chain workflows across blockchain networks."],
  ["Is ROUTARA live?", "The official public launch state activates on October 26, 2026 at 15:00 UTC. Execution access remains unavailable until the required integrations are connected and verified."],
  ["How will ROUTARA work?", "The platform aims to interpret a user's intended outcome, identify eligible routes, present execution details, and coordinate supported transactions."],
  ["Which networks will ROUTARA support?", "Ethereum, Base, and Arbitrum are the initial networks being considered for the first version. Actual availability will be confirmed as integrations are implemented and verified."],
  ["Will ROUTARA support every token and chain?", "No platform can guarantee every possible route. Support depends on compatible infrastructure, available liquidity, token configuration, and integrations."],
  ["Is early access free?", "Joining the early-access list is intended to be free. It does not guarantee immediate product access or token allocations."],
  ["When will the product launch?", "The official ROUTARA launch state activates on Monday, October 26, 2026 at 15:00 UTC. The launch state does not imply that cross-chain execution access is already connected; availability is shown honestly in the product interface."],
];
export function FAQ() {
  return <section className="section container faq" id="faq"><div><SectionLabel number="08">A LITTLE MORE CLARITY</SectionLabel><h2>Good questions.<br/><span>Clear answers.</span></h2><p>Everything you need to know<br/>about where we&apos;re headed.</p></div><div className="faq-list">{questions.map(([question, answer], i) => <details key={question} name="routara-faq"><summary><span className="faq-number">0{i + 1}</span><span>{question}</span><Plus size={19}/></summary><div className="faq-answer"><p>{answer}</p></div></details>)}</div></section>;
}
