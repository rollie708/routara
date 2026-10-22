import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/brand";
export const alt = "ROUTARA. One Intent. Every Chain. Every Action. Cross-chain execution — in development.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "64px 78px", background: "radial-gradient(ellipse at 85% 60%, #163249 0%, #080d15 65%)", color: "#f3f6fa", fontFamily: "sans-serif" }}><div style={{ display: "flex", alignItems: "center", gap: 18 }}><div style={{ display: "flex", width: 39, height: 43 }}><BrandMark/></div><span style={{ fontSize: 28, letterSpacing: 7 }}>ROUTARA</span></div><div style={{ display: "flex", marginTop: 48, fontSize: 15, color: "#a5d8f5", letterSpacing: 4 }}>CROSS-CHAIN EXECUTION · IN DEVELOPMENT</div><div style={{ display: "flex", flexDirection: "column", fontSize: 76, letterSpacing: -4, fontWeight: 600, marginTop: 20, lineHeight: 1.08 }}><span>One Intent. Every Chain.</span><span style={{ color: "#a5d8f5" }}>Every Action.</span></div><div style={{ display: "flex", marginTop: "auto", justifyContent: "space-between", color: "#9faebd", fontSize: 19 }}><span>A more connected on-chain experience.</span><span>PRODUCT COMING SOON ↗</span></div></div>, size);
}
