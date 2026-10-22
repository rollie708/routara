CREATE TABLE "EarlyAccess" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "xUsername" TEXT,
  "projectUpdates" BOOLEAN NOT NULL DEFAULT false,
  "privacyVersion" TEXT NOT NULL DEFAULT '2026-10-21',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EarlyAccess_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "EarlyAccess_email_key" ON "EarlyAccess"("email");
CREATE TABLE "RateLimit" (
  "key" TEXT NOT NULL,
  "count" INTEGER NOT NULL DEFAULT 1,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "RateLimit_pkey" PRIMARY KEY ("key")
);
CREATE INDEX "RateLimit_expiresAt_idx" ON "RateLimit"("expiresAt");
