"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, CircleAlert, LoaderCircle, LockKeyhole } from "lucide-react";
import { signupSchema, successMessage } from "@/lib/signup-schema";

export function EarlyAccessForm({ configured }: { configured: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || state === "success") return;
    const data = new FormData(event.currentTarget);
    const result = signupSchema.safeParse({ email: data.get("email"), xUsername: data.get("xUsername"), projectUpdates: data.get("projectUpdates") === "on", website: data.get("website") });
    setFieldErrors({}); setError("");
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach(issue => { errors[String(issue.path[0])] = issue.message; });
      setFieldErrors(errors);
      const field = formRef.current?.elements.namedItem(String(result.error.issues[0].path[0]));
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    inFlight.current = true;
    setState("loading");
    try {
      const response = await fetch("/api/early-access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result.data), signal: AbortSignal.timeout(15000) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || "We couldn't save your registration. Please try again.");
      setState("success");
    } catch (error) {
      setState("error");
      setError(error instanceof Error && error.name !== "TimeoutError" ? error.message : "The request timed out. Please try again; repeat requests won't create duplicate registrations.");
    } finally { inFlight.current = false; }
  }

  return <div className="signup-card">
    <div className="signup-card-heading"><span className="signup-icon"><ArrowUpRight size={20}/></span><span>YOUR NEXT CHAPTER STARTS HERE</span></div>
    <div aria-live="polite" aria-atomic="true">{state === "success" && <div className="signup-success"><span className="success-icon"><Check size={29}/></span><h3>You&apos;re on the list.</h3><p>{successMessage.replace("You're on the list. ", "")}</p><span className="mini-badge">WELCOME TO WHAT&apos;S NEXT</span></div>}</div>
    {state !== "success" && <form ref={formRef} onSubmit={submit} noValidate aria-busy={state === "loading"}>
      {!configured && <div className="setup-notice" role="status"><CircleAlert size={16}/><p><strong>Registration opens soon.</strong> Our signup service is being configured. Please check back to join the list.</p></div>}
      <div className="form-field"><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength={254} disabled={state === "loading"} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "email-error" : undefined}/>{fieldErrors.email && <span id="email-error" className="field-error">{fieldErrors.email}</span>}</div>
      <div className="form-field"><label htmlFor="xUsername">X username <span className="optional">Optional</span></label><input id="xUsername" name="xUsername" type="text" placeholder="@username" autoComplete="off" maxLength={16} disabled={state === "loading"} aria-invalid={Boolean(fieldErrors.xUsername)} aria-describedby={fieldErrors.xUsername ? "username-error" : undefined}/>{fieldErrors.xUsername && <span id="username-error" className="field-error">{fieldErrors.xUsername}</span>}</div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
      <label className="checkbox-label"><input name="projectUpdates" type="checkbox" disabled={state === "loading"}/><span>I&apos;d like to receive project updates and acknowledge the <Link href="/privacy">Privacy Policy</Link>. <span className="optional">(Optional)</span></span></label>
      <button type="submit" className="button signup-submit" disabled={!configured || state === "loading"}>{state === "loading" ? <><LoaderCircle size={18} className="spinner"/> Saving your request…</> : <>Request Early Access <ArrowUpRight size={18}/></>}</button>
      {state === "error" && <p role="alert" className="form-error"><CircleAlert size={17}/>{error}</p>}
      <p className="form-privacy"><LockKeyhole size={12}/><span>We use your details to manage early access, and send project updates only if you opt in. No wallet needed. <Link href="/privacy">Privacy notice</Link></span></p>
    </form>}
  </div>;
}
