// lot of people out there having issue using prisma with nextjs
// following code from this website "https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client
// -dev-practices#solution" help to prevent errors

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export const db = prisma;
