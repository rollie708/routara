"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
import { navigation, telegramUrl, xUrl } from "@/lib/site";
import { useLaunchState } from "./launch-state";

export function FinalCTA({ initialLaunched }: { initialLaunched: boolean }) {
  const launched = useLaunchState(initialLaunched);
  return <section className="final-cta container"><div className="eyebrow"><span className="status-dot"/> {launched ? "LAUNCH LIVE" : "PRODUCT COMING SOON"}</div><h2>The next move across chains<br/><span>starts here.</span></h2><p>{launched ? "The official launch state is active. See the current ROUTARA product access status." : "Follow the development of ROUTARA and get ready for a more unified on-chain experience."}</p><Link className="button" href={launched ? "/#product" : "/#early-access"}>{launched ? "Open ROUTARA" : "Get Early Access"} <ArrowUpRight size={18}/></Link><div className="final-orbit" aria-hidden="true"/></section>;
}
export function Footer({ initialLaunched }: { initialLaunched: boolean }) {
  const launched = useLaunchState(initialLaunched);
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div><Link href="/" aria-label="ROUTARA home" className="brand-link"><Brand/></Link><p>A unified vision for cross-chain execution.<br/>One intent. More possibilities.</p></div>
      <nav aria-label="Footer navigation">{navigation.map(item => <Link key={item.label} href={item.href}>{item.label}</Link>)}<Link href="/#early-access">Early Access <ArrowUpRight size={13}/></Link></nav>
       <div className="footer-social"><span className="eyebrow">STAY IN THE LOOP</span>{xUrl && <a href={xUrl} target="_blank" rel="noopener noreferrer">Follow on X <ArrowUpRight size={15}/></a>}{telegramUrl && <a href={telegramUrl} target="_blank" rel="noopener noreferrer">Join Telegram <ArrowUpRight size={15}/></a>}{!xUrl && !telegramUrl && <span className="social-placeholder">Official social links coming soon.</span>}<span className="footer-status"><span className="status-dot"/> {launched ? "Launch live" : "In development"}</span></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} ROUTARA. All rights reserved.</span><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link><Link href="/#overview" className="back-top">Back to top ↑</Link></div></div>
     <p className="footer-disclaimer">ROUTARA&apos;s public launch state is active, while execution access and integrations remain subject to availability shown in the product interface. Planned features, networks, and integrations may change. Nothing on this website constitutes financial advice.</p>
  </div></footer>;
}
