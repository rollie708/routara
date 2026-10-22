import Link from "next/link";
export default function NotFound() { return <main id="main" className="container error-page"><span className="eyebrow">404 / ROUTE NOT FOUND</span><h1>A different route<br/>starts here.</h1><p>This page doesn&apos;t exist. Let&apos;s get you back to ROUTARA.</p><Link href="/" className="button">Back to the overview ↗</Link></main>; }
