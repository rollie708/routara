# ROUTARA — Official project website

A responsive, custom-designed Next.js App Router website for ROUTARA, a cross-chain execution platform with an official launch state scheduled for October 26, 2026 at 15:00 UTC. Execution access remains clearly marked unavailable until real integrations are connected.

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4 and custom responsive design tokens/styles
- Self-hosted Manrope and Space Grotesk variable fonts; Lucide icons
- PostgreSQL with Prisma 7 and its PostgreSQL driver adapter, Zod 4 server/client validation
- Vitest submission tests and Playwright browser checks

## Run locally

Requires Node.js 22.12+ (Node 24 LTS recommended) and npm.

```bash
npm ci
npm run dev
```

Visit **http://localhost:3000**. No credentials are needed to browse. Without database/rate-limit configuration, registration shows an explicit setup notice and its submit button is disabled. The endpoint returns HTTP 503; it never pretends to save data.

## Enable real early-access registration

1. Provision a PostgreSQL database, locally or through a service such as Neon or Supabase.
2. Copy `.env.example` to `.env` and fill in the variables below. Do not commit `.env`.
3. Run `npm run db:migrate` to apply the checked-in migration.
4. Restart the server. Verify a registration in the database before opening registration publicly.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL URL used by the server. Prefer a pooler for serverless runtimes; require TLS in production. |
| `DIRECT_URL` | Direct PostgreSQL connection used by Prisma migrations. Can equal `DATABASE_URL` locally. |
| `RATE_LIMIT_SECRET` | Random secret at least 32 characters long, used to hash rate-limit identifiers. |
| `NEXT_PUBLIC_SITE_URL` | Exact canonical origin, e.g. `https://your-official-domain.com`. Used for same-origin submission checks, metadata, sitemap, and robots. Set at build time and runtime. |
| `TRUSTED_IP_HEADER` | Optional header overwritten by your hosting proxy. On Vercel use `x-vercel-forwarded-for`. Never use a client-controlled header. Without it, rate limiting is per email only. |
| `NEXT_PUBLIC_X_URL` | Optional verified official X link. Defaults to ROUTARA's official X account. |
| `NEXT_PUBLIC_TELEGRAM_URL` | Optional verified official `https://t.me/channel` link. Defaults to ROUTARA's official Telegram community. |
| `NEXT_PUBLIC_PRIVACY_EMAIL` | A monitored privacy contact; publish before accepting public registrations. |

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Persistence and security behavior

- `POST /api/early-access` accepts same-origin JSON only. There is **no public list/read endpoint**.
- Input is normalized and validated with Zod. Request body is limited to 4 KB, even without Content-Length.
- A hidden honeypot rejects obvious automated submissions. Database-backed atomic counters limit each normalized email to 5 attempts per 15-minute fixed window; a configured trusted proxy IP is limited to 20. Hashes expire at the window boundary; expired rows are deleted during later requests. A maintenance job may delete expired rate-limit records during long inactive periods.
- Email has a unique database index. Concurrent and repeated requests cannot create duplicate records. Existing-record submissions receive the same response as new registrations and do not change the existing consent/profile.
- Success is returned **only after a database save succeeds or existing persistence is confirmed**. Database/rate-limit errors fail closed. Error logs do not include submitted personal information.
- Marketing consent is optional and unchecked by default. Store consent separately from early-access interest. The stored privacy version identifies the policy acknowledged at signup.
- The frontend prevents in-flight double submits, announces errors/success, focuses invalid fields, and supports retries after network failures. The API remains authoritative.
- This implementation collects registrations. It does **not send email**, perform double opt-in, or operate a mailing campaign. Add a mail provider with unsubscribe handling before sending optional updates. Add a deployment-level firewall/CAPTCHA if public traffic warrants stronger distributed abuse controls.

To inspect registrations, use secure provider tooling or `npx prisma studio` locally with authorized credentials. Do not expose Prisma Studio publicly. Limit database access to authorized operators. Process deletion and opt-out requests through the configured privacy contact. The privacy policy describes retention; operators must review/delete records when the early-access program ends.

## Checks

```bash
npm run lint
npm run test
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

Vitest covers invalid/normalized input, optional consent, spam, bounded payloads, origins, rate-limit failures, save failures, and delayed persistence. Browser tests run desktop and mobile navigation, FAQ, legal pages, reduced motion, metadata/image endpoints, and the unconfigured signup state. An isolated server on port 3011 tests form validation, loading, duplicate-click prevention, error recovery, and success using explicitly mocked API responses. A separate browser test hits its deliberately unreachable database to verify real backend failure handling. The suite starts its own servers on ports 3010 and 3011 and runs without signup credentials; it intentionally asserts the honest setup state. Real PostgreSQL end-to-end persistence requires configured credentials and applied migrations.

## Deployment

Deploy the **`routara` directory** as the project root to a Node-compatible Next.js host (e.g. Vercel). This site requires a server runtime for signup and is not a static export.

1. Add production environment variables and provision the database.
2. Use a migration deployment job: `npm run db:migrate` (direct database URL).
3. Build with `npm run build` and start with `npm run start` on a Node host. Vercel auto-detects Next.js.
4. Set the canonical domain and redirect alternative hostnames to it; cross-origin signup is rejected by design. Preview deployments need their own `NEXT_PUBLIC_SITE_URL` if testing enabled signup.
5. Set a monitored privacy contact, verify the operator-specific legal text, and add only verified social links.
6. Verify a test registration persists, a duplicate remains one record, consent is accurate, and failed persistence produces an error. Remove test registrations afterward.

`NEXT_PUBLIC_*` variables are embedded at build time; rebuild when changing them. Database secrets stay server-side. Use private database permissions, TLS, backups, and your platform's standard secret management.

## Structure and design

```text
src/app/                  Pages, API endpoint, metadata images, sitemap, robots
src/components/           Navigation, hero, network illustration, sections, form, footer
src/lib/                  Signup schema/handler, database client, site configuration
prisma/                   Database schema and committed SQL migration
tests/                    Validation/submission tests and browser checks
public/routara-symbol.svg Scalable symbol/favicon rendition
```

The supplied raster reference was present in the request but not as a local source asset. `BrandMark` and the public favicon are a hand-traced SVG rendition of its interwoven geometric symbol. Replace both with an official production vector when supplied. No unrelated logo or invented account is used.

The site uses a custom SVG orbital routing concept, a UTC launch countdown, restrained animated route segments, native accessible FAQ disclosures, mobile navigation with Escape support, skip navigation, and reduced-motion overrides. Network names are explicitly planned until verified. There are no fabricated metrics, partners, balances, wallet connections, or live execution claims.

## Remaining external setup

- Provision PostgreSQL and apply migrations to actually collect registrations.
- Supply the canonical domain, secret, trusted proxy setting, official privacy contact, and verify the official social URLs.
- Confirm the official logo vector and legal operator details for a public launch.
- Configure an email provider separately if sending updates is desired; registration storage is independent of email delivery.
- Dependency audit: production dependencies have no reported vulnerabilities at delivery. The full audit reports a high-severity `braces` advisory through the Next.js ESLint tooling (5 affected development dependency entries). No fixed `braces` version was available in the registry; do not apply npm's suggested framework downgrade. This dependency processes local lint file patterns, not public signup input. Recheck upstream tooling updates before future releases.
