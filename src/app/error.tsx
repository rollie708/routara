"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <main id="main" className="container error-page"><span className="eyebrow">A MOMENTARY DETOUR</span><h1>Let&apos;s try that again.</h1><p>We couldn&apos;t load this page. Please try again in a moment.</p><button className="button" onClick={reset}>Try again ↗</button></main>; }
