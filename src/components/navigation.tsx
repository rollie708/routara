"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { navigation } from "@/lib/site";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    const resize = () => { if (window.innerWidth > 800) setOpen(false); };
    document.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => { document.removeEventListener("keydown", close); window.removeEventListener("resize", resize); };
  }, [open]);
  return <header className="site-header">
    <div className="container nav-inner">
      <Link href="/" className="brand-link" aria-label="ROUTARA home" onClick={() => setOpen(false)}><Brand /></Link>
      <nav aria-label="Main navigation" className="desktop-nav">{navigation.map(item => <Link key={item.label} href={item.href}>{item.label}</Link>)}</nav>
      <Link className="button button-small nav-cta" href="/#early-access">Get Early Access <ArrowUpRight size={15} /></Link>
      <button ref={toggle} type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X /> : <Menu />}</button>
    </div>
    <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>{navigation.map(item => <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={16} /></Link>)}<Link className="button" href="/#early-access" onClick={() => setOpen(false)}>Get Early Access <ArrowUpRight size={16} /></Link></nav>
  </header>;
}
