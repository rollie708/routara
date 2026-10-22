import { BrandMark } from "./brand";

function Ethereum() { return <svg viewBox="0 0 32 44" fill="none" aria-hidden="true"><path d="m16 1 14 22-14 8L2 23 16 1Z" fill="#c4d2ed"/><path d="m16 1 14 22-14-6V1Z" fill="#8395b7"/><path d="m16 43 14-17-14 8L2 26l14 17Z" fill="#c4d2ed"/><path d="m16 17 14 6-14 8V17Z" fill="#657694"/></svg>; }
function Arbitrum() { return <svg viewBox="0 0 40 44" fill="none" aria-hidden="true"><path d="m20 2 17 10v20L20 42 3 32V12L20 2Z" stroke="#c0dbf6" strokeWidth="2"/><path d="m12 32 9-22h6l-9 26-6-4Z" fill="#d0e6ff"/><path d="m23 25 4-10 7 17-5 3-6-10Z" fill="#6faee5"/><path d="m6 29 8-19h5l-9 22-4-3Z" fill="#d0e6ff"/></svg>; }

export function NetworkVisual() {
  return <div className="network-visual" role="img" aria-label="Concept illustration: Ethereum, Base, and Arbitrum connect through the planned ROUTARA execution layer. All networks are planned, not live.">
    <div className="network-glow" />
    <svg className="network-lines" viewBox="0 0 640 600" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="route-gradient" x1="120" y1="100" x2="530" y2="540" gradientUnits="userSpaceOnUse"><stop stopColor="#6f9bba" stopOpacity=".12"/><stop offset=".5" stopColor="#b2e0ff" stopOpacity=".8"/><stop offset="1" stopColor="#537ea3" stopOpacity=".15"/></linearGradient>
        <radialGradient id="orb-glow"><stop stopColor="#a1d8ff" stopOpacity=".1"/><stop offset="1" stopColor="#a1d8ff" stopOpacity="0"/></radialGradient>
      </defs>
      <circle cx="325" cy="299" r="265" stroke="#6b95bb" strokeOpacity=".12" />
      <circle cx="325" cy="299" r="209" stroke="#6b95bb" strokeOpacity=".15" strokeDasharray="2 8" />
      <circle cx="325" cy="299" r="142" stroke="#6b95bb" strokeOpacity=".13" />
      <ellipse cx="325" cy="299" rx="280" ry="110" stroke="#7da6cd" strokeOpacity=".18" transform="rotate(-35 325 299)" />
      <ellipse cx="325" cy="299" rx="270" ry="105" stroke="#7da6cd" strokeOpacity=".14" transform="rotate(42 325 299)" />
      <path className="route-line" d="M194 125C194 223 325 208 325 299S457 390 457 473M325 299C396 299 422 239 524 239M325 299C215 299 216 427 116 427" stroke="url(#route-gradient)" strokeWidth="1.5" />
      <path className="route-travel route-travel-one" d="M194 125C194 223 325 208 325 299S457 390 457 473" stroke="#c0eaff" strokeWidth="2" strokeDasharray="4 410" />
      <path className="route-travel route-travel-two" d="M116 427C216 427 215 299 325 299S422 239 524 239" stroke="#c0eaff" strokeWidth="2" strokeDasharray="4 370" />
      <circle cx="325" cy="299" r="126" fill="url(#orb-glow)" />
      {[[72, 221], [333, 34], [583, 350], [271, 557], [154, 482], [457, 153]].map(([cx, cy], index) => <g key={index}><circle cx={cx} cy={cy} r="3" fill="#92b9d6" fillOpacity=".6"/><circle cx={cx} cy={cy} r="7" stroke="#6b95bb" strokeOpacity=".18"/></g>)}
      <path d="M41 298h10m-5-5v10M563 105h10m-5-5v10M485 556h10m-5-5v10" stroke="#7596b1" strokeOpacity=".5" />
    </svg>
    <div className="execution-core"><div className="core-symbol"><BrandMark /></div><span>ROUTARA</span><small>EXECUTION LAYER</small></div>
    <div className="chain-node ethereum"><div className="chain-icon"><Ethereum /></div><div><span>Ethereum</span><small>PLANNED</small></div></div>
    <div className="chain-node base"><div className="chain-icon"><span className="base-symbol" /></div><div><span>Base</span><small>PLANNED</small></div></div>
    <div className="chain-node arbitrum"><div className="chain-icon"><Arbitrum /></div><div><span>Arbitrum</span><small>PLANNED</small></div></div>
    <div className="intent-node"><span className="intent-dot"/><span>Your intent</span></div>
    <span className="visual-coordinate">01 / THE CONNECTED LAYER</span>
    <span className="visual-caption">Concept visualization · Planned integrations</span>
  </div>;
}
