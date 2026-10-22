import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export function getDb() {
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL, max: 5, connectionTimeoutMillis: 5000 });
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  return globalForPrisma.prisma;
}

export function isSignupConfigured() {
  return Boolean(process.env.DATABASE_URL && process.env.RATE_LIMIT_SECRET && process.env.RATE_LIMIT_SECRET.length >= 32);
}
