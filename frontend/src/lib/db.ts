import { PrismaClient } from "@prisma/client";

/**
 * Prisma is instantiated once per process. In development Next.js clears the
 * module registry on every hot reload, so the instance is cached on
 * `globalThis` to avoid exhausting the PostgreSQL connection pool.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
