import { createHmac } from "node:crypto";
import { getDb, isSignupConfigured } from "@/lib/db";
import { handleSignup } from "@/lib/signup-handler";
import { siteUrl } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleSignup(request, {
    configured: isSignupConfigured(),
    allowedOrigin: new URL(siteUrl).origin,
    async rateLimit(email, req) {
      const db = getDb();
      const now = Date.now();
      const window = Math.floor(now / 900000);
      const expiresAt = new Date((window + 1) * 900000);
      const identities = [{ value: `email:${email}`, limit: 5 }];
      const header = process.env.TRUSTED_IP_HEADER;
      const ip = header ? req.headers.get(header)?.split(",")[0]?.trim() : undefined;
      if (ip) identities.push({ value: `ip:${ip}`, limit: 20 });
      const results = await Promise.all(identities.map(async ({ value, limit }) => {
        const key = createHmac("sha256", process.env.RATE_LIMIT_SECRET!).update(`${window}:${value}`).digest("hex");
        const bucket = await db.rateLimit.upsert({ where: { key }, create: { key, expiresAt }, update: { count: { increment: 1 } } });
        return bucket.count <= limit;
      }));
      await db.rateLimit.deleteMany({ where: { expiresAt: { lt: new Date(now) } } });
      return results.every(Boolean);
    },
    async save(data) {
      // Empty update intentionally preserves consent and profile on duplicate requests.
      // A unique index makes concurrent submissions idempotent.
      try {
        await getDb().earlyAccess.upsert({
          where: { email: data.email },
          create: { email: data.email, xUsername: data.xUsername || null, projectUpdates: data.projectUpdates },
          update: {},
        });
      } catch (error) {
        // Concurrent insert can race with an empty-update upsert. Confirm persistence.
        if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
          if (await getDb().earlyAccess.findUnique({ where: { email: data.email }, select: { id: true } })) return;
        }
        throw error;
      }
    },
    reportError() { console.error("Early-access persistence failed. Check database connectivity and migrations."); },
  });
}
