import { ArrowDown, ArrowUpRight } from "lucide-react";
import { NetworkVisual } from "./network-visual";

export function Hero() {
  return <section className="hero" id="overview" aria-labelledby="hero-heading">
    <div className="hero-grid container">
      <div className="hero-copy">
        <div className="eyebrow hero-eyebrow"><span className="status-dot"/> CROSS-CHAIN EXECUTION <span className="eyebrow-divider"/> IN DEVELOPMENT</div>
        <h1 id="hero-heading">One Intent.<br/>Every Chain.<br/><span>Every Action.</span></h1>
        <p>ROUTARA is building a unified cross-chain execution platform designed to simplify how users move assets, swap tokens, and carry out actions across blockchain networks.</p>
        <div className="hero-actions"><a href="#early-access" className="button">Get Early Access <ArrowUpRight size={18}/></a><a href="#vision" className="text-link">Explore the Vision <ArrowUpRight size={16}/></a></div>
        <div className="coming-soon"><span className="status-dot"/> Product Coming Soon <span className="fine-separator"/> Built with intention.</div>
      </div>
      <NetworkVisual />
    </div>
    <div className="hero-bottom container"><span>A more connected on-chain experience.</span><a href="#problem">DISCOVER THE POSSIBILITIES <ArrowDown size={14}/></a><span className="hero-bottom-right">MANY NETWORKS. ONE DIRECTION.</span></div>
  </section>;
}
