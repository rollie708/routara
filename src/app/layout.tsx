import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { siteUrl } from "@/lib/site";
import { isLaunchActive } from "@/lib/launch";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "ROUTARA — Cross-Chain Execution, Reimagined", template: "%s | ROUTARA" },
  description: "Discover ROUTARA, a cross-chain execution platform in development designed to simplify asset movement, swaps, and supported on-chain workflows.",
  applicationName: "ROUTARA",
  openGraph: { type: "website", siteName: "ROUTARA", title: "ROUTARA — One Intent. Every Chain. Every Action.", description: "A more connected on-chain experience. Discover the cross-chain execution platform in development.", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "ROUTARA — Cross-Chain Execution, Reimagined", description: "One Intent. Every Chain. Every Action. Product coming soon." },
  icons: { icon: "/routara-symbol.svg", apple: "/apple-icon" },
};
export const viewport: Viewport = { themeColor: "#080d15", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Navigation/>{children}<Footer initialLaunched={isLaunchActive()}/></body></html>;
}
