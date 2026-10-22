import { signupSchema, successMessage, type SignupInput } from "./signup-schema";

export interface SignupDependencies {
  configured: boolean;
  allowedOrigin: string;
  rateLimit: (email: string, request: Request) => Promise<boolean>;
  save: (data: SignupInput) => Promise<void>;
  reportError?: (error: unknown) => void;
}

const json = (body: Record<string, unknown>, status: number, extraHeaders: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } });

export async function handleSignup(request: Request, dependencies: SignupDependencies) {
  if (request.headers.get("origin") !== dependencies.allowedOrigin) return json({ message: "Please submit the form from the ROUTARA website." }, 403);
  if (!dependencies.configured) return json({ message: "Registration is not open yet. Our signup service is being configured. Please check back soon." }, 503);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return json({ message: "Please submit a valid signup request." }, 415);
  // Read a bounded stream, including requests without Content-Length.
  let text = "";
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ message: "Please complete the form." }, 400);
    const decoder = new TextDecoder();
    let bytes = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 4096) { await reader.cancel(); return json({ message: "The submission is too large." }, 413); }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch { return json({ message: "We couldn't read your submission. Please try again." }, 400); }
  let body: unknown;
  try { body = JSON.parse(text); } catch { return json({ message: "Please submit a valid signup request." }, 400); }
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) return json({ message: parsed.error.issues[0]?.message || "Please check your details." }, 400);
  try {
    if (!await dependencies.rateLimit(parsed.data.email, request)) return json({ message: "Too many attempts. Please try again in 15 minutes." }, 429, { "Retry-After": "900" });
    await dependencies.save(parsed.data);
    return json({ message: successMessage }, 200);
  } catch (error) {
    dependencies.reportError?.(error);
    return json({ message: "We couldn't save your registration right now. Please try again shortly." }, 503);
  }
}
