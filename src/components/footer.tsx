import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
import { navigation, telegramUrl, xUrl } from "@/lib/site";

export function FinalCTA() {
  return <section className="final-cta container"><div className="eyebrow"><span className="status-dot"/> PRODUCT COMING SOON</div><h2>The next move across chains<br/><span>starts here.</span></h2><p>Follow the development of ROUTARA and get ready for a more unified on-chain experience.</p><Link className="button" href="/#early-access">Get Early Access <ArrowUpRight size={18}/></Link><div className="final-orbit" aria-hidden="true"/></section>;
}
export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top">
      <div><Link href="/" aria-label="ROUTARA home" className="brand-link"><Brand/></Link><p>A unified vision for cross-chain execution.<br/>One intent. More possibilities.</p></div>
      <nav aria-label="Footer navigation">{navigation.map(item => <Link key={item.label} href={item.href}>{item.label}</Link>)}<Link href="/#early-access">Early Access <ArrowUpRight size={13}/></Link></nav>
      <div className="footer-social"><span className="eyebrow">STAY IN THE LOOP</span>{xUrl && <a href={xUrl} target="_blank" rel="noopener noreferrer">Follow on X <ArrowUpRight size={15}/></a>}{telegramUrl && <a href={telegramUrl} target="_blank" rel="noopener noreferrer">Join Telegram <ArrowUpRight size={15}/></a>}{!xUrl && !telegramUrl && <span className="social-placeholder">Official social links coming soon.</span>}<span className="footer-status"><span className="status-dot"/> In development</span></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} ROUTARA. All rights reserved.</span><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link><Link href="/#overview" className="back-top">Back to top ↑</Link></div></div>
    <p className="footer-disclaimer">ROUTARA is in development. Planned features, networks, and integrations may change. This website is for informational purposes and does not represent a live execution service. Nothing on this website constitutes financial advice.</p>
  </div></footer>;
}
