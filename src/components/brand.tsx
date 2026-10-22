export function BrandMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 110 120" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round"><path d="M54 45V9L101 36V91L68 72" /><path d="M8 29v54l48 28V77c0-18 4-25 19-34l26-15" /><path d="M8 29l32 19c12 7 16 16 16 29M8 83l29-17" /></g></svg>;
}
export function Brand({ className = "" }: { className?: string }) {
  return <span className={`brand ${className}`}><BrandMark /><span>ROUTARA</span></span>;
}
