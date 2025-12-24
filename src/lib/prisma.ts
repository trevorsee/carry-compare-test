import prismaPkg from "@prisma/client";
import type { PrismaClient as PrismaClientType } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const { PrismaClient } = prismaPkg as unknown as {
  PrismaClient: new (options: unknown) => PrismaClientType;
};

function sqliteFilePath(databaseUrl: string) {
  // DATABASE_URL example: file:./dev.db
  return databaseUrl.startsWith("file:") ? databaseUrl.replace(/^file:/, "") : databaseUrl;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
  sqliteAdapter: PrismaBetterSqlite3 | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter:
      globalForPrisma.sqliteAdapter ??
      (globalForPrisma.sqliteAdapter = new PrismaBetterSqlite3({
        url: sqliteFilePath(process.env.DATABASE_URL || "file:./dev.db"),
      })),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

