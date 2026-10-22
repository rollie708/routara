import { ImageResponse } from "next/og";
import { BrandMark } from "@/components/brand";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function Icon() { return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", background: "#080d15", padding: 36, color: "#f5f8fc" }}><BrandMark/></div>, size); }
