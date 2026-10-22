import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };
export default function Terms() {
  return <main id="main" className="container legal-page">
    <Link href="/" className="text-link">← Back to ROUTARA</Link><span className="eyebrow">A CLEAR UNDERSTANDING</span><h1>Terms of Use</h1><p className="legal-date">Last updated October 21, 2026</p>
    <h2>About this website</h2><p>This website provides information about ROUTARA, a cross-chain execution platform under development. It is not a live bridge, exchange, wallet, or execution service. Descriptions of intended functionality are statements of development direction, not promises of current availability.</p>
    <h2>Planned functionality</h2><p>Features, network support, providers, development stages, and the timing or availability of any release may change. ROUTARA does not guarantee connectivity to all networks or tokens, the cheapest routes, zero fees, instant settlement, or successful execution. Future product access will be subject to separate applicable terms.</p>
    <h2>Early-access requests</h2><p>Joining the list is free and expresses interest in the project. It does not guarantee an invitation, immediate product access, a launch date, financial benefits, or token allocations. You should submit an email address you control. Please do not submit another person&apos;s information without authorization.</p>
    <h2>Acceptable use</h2><p>You may use this website for lawful informational purposes. Do not interfere with its operation, attempt unauthorized access to stored information, submit spam, or misuse its forms. We may restrict abusive requests to protect availability.</p>
    <h2>No financial advice</h2><p>The content is provided for general information, not as financial, investment, legal, or tax advice. No token sale or investment offer is made through this website. Blockchain activity carries risks that should be independently evaluated.</p>
    <h2>Content and external links</h2><p>ROUTARA branding and original site content belong to their respective rights holders. Network names and symbols identify networks under consideration and do not imply a partnership or endorsement. External websites, when linked, operate under their own terms and policies.</p>
    <h2>Availability and responsibility</h2><p>We aim to keep information accurate and the website available, but provide this informational website as available without a guarantee of uninterrupted operation or completeness. Nothing in these terms excludes rights or responsibilities that cannot lawfully be excluded.</p>
    <h2>Your information</h2><p>Our <Link href="/privacy">Privacy Policy</Link> describes the information collected through early-access requests and how to contact the project about it.</p>
    <h2>Changes</h2><p>These terms may be updated as the project develops. The revision date above identifies the current version. Please review these terms when returning to the website.</p>
  </main>;
}
