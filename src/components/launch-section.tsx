"use client";

import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import type { ReactNode } from "react";
import { type LaunchCountdown } from "@/lib/launch";
import { Countdown, useLaunchState } from "./launch-state";

const launchDate = "Monday, October 26, 2026";

function LaunchDetail({ label, children }: { label: string; children: ReactNode }) {
  return <div className="launch-detail"><span>{label}</span><strong>{children}</strong></div>;
}

function ProductInterface() {
  return <section className="product-section section container" id="product" aria-labelledby="product-heading">
    <div className="section-label"><span>02</span><span className="label-line"/>ROUTARA PRODUCT</div>
    <div className="product-heading"><div><h2 id="product-heading">The execution layer<br/><span>is taking shape.</span></h2><p>This is the official ROUTARA product entry point. Execution access is not connected in this build yet, so no balances, routes, quotes, or transaction results are shown.</p></div><span className="live-pill"><span className="status-dot"/> LAUNCH LIVE</span></div>
    <div className="product-interface">
      <div className="product-interface-top"><div><span className="interface-kicker">CROSS-CHAIN EXECUTION</span><h3>Start with an intent</h3></div><span className="interface-status"><LockKeyhole size={13}/> Access coming soon</span></div>
      <div className="product-fields">
        <label><span>FROM NETWORK</span><select disabled defaultValue=""><option value="">Select a supported network</option></select></label>
        <label><span>TO NETWORK</span><select disabled defaultValue=""><option value="">Select a supported network</option></select></label>
        <label><span>ASSET</span><select disabled defaultValue=""><option value="">Select an asset</option></select></label>
      </div>
      <div className="product-interface-foot"><p><span className="status-dot"/> No verified routes are available yet.</p><button className="button button-small" disabled>Review route <ArrowUpRight size={15}/></button></div>
    </div>
    <div className="product-scope"><div><Check size={16}/><span>Public launch state</span><small>Active automatically at the official launch time</small></div><div><Check size={16}/><span>Ethereum · Base · Arbitrum</span><small>Initial scope; availability remains unverified</small></div><div><LockKeyhole size={16}/><span>Wallet and execution</span><small>Unavailable until safely integrated</small></div></div>
  </section>;
}

export function LaunchSection({ initialLaunched, initialCountdown }: { initialLaunched: boolean; initialCountdown: LaunchCountdown }) {
  const launched = useLaunchState(initialLaunched);

  return <>
    <section className="launch-section section container" id="launch" aria-labelledby="launch-heading">
      <div className="launch-intro"><div><div className="section-label"><span>01</span><span className="label-line"/>OFFICIAL LAUNCH</div><h2 id="launch-heading">One layer.<br/><span>Live on launch day.</span></h2></div><p>ROUTARA launches with Robinhood Chain as its launch ecosystem and PONS.FAMILY as its launch platform. Follow the official channels for access updates.</p></div>
      <div className="launch-layout">
        <div className="launch-status-card">
          <div className="launch-status-top"><span className="eyebrow"><span className="status-dot"/> {launched ? "LIVE" : "LAUNCH COUNTDOWN"}</span><span className="launch-time">15:00 UTC</span></div>
          {launched ? <div className="launch-live"><h3>ROUTARA is <span>LIVE.</span></h3><p>The official launch state is active. Open the product entry point to see the current execution-access status.</p><a className="button button-small" href="#product">Open ROUTARA <ArrowUpRight size={16}/></a></div> : <div className="launch-countdown"><h3>Launching in</h3><Countdown initialLaunched={initialLaunched} initialCountdown={initialCountdown}/><p>Monday, October 26, 2026 · 15:00 UTC</p></div>}
        </div>
        <div className="launch-details"><LaunchDetail label="Project">ROUTARA</LaunchDetail><LaunchDetail label="Launch date">{launchDate}</LaunchDetail><LaunchDetail label="Ecosystem">Robinhood Chain</LaunchDetail><LaunchDetail label="Platform">PONS.FAMILY</LaunchDetail><LaunchDetail label="Website"><a href="https://routarachain.xyz" target="_blank" rel="noopener noreferrer">routarachain.xyz <ArrowUpRight size={13}/></a></LaunchDetail><LaunchDetail label="Telegram"><a href="https://t.me/routarachain" target="_blank" rel="noopener noreferrer">@routarachain <ArrowUpRight size={13}/></a></LaunchDetail></div>
      </div>
    </section>
    {launched && <ProductInterface/>}
  </>;
}
