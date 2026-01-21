import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "../config";

const connectionString = config.databaseUrl;
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
//Create a Postgres Pool
const pool = new Pool({connectionString});
//Create a Prisma Adapter
const adapter = new PrismaPg(pool);
//Pass the adapter to the Prisma Client
export const prisma = globalForPrisma.prisma ?? new PrismaClient({adapter});

if (config.nodeEnv !== "production") {
  globalForPrisma.prisma = prisma;
}
