import { Prisma, PrismaClient } from "@prisma/client";

// Declare type of prisma
declare global {
    var prisma: PrismaClient | undefined;
};

const prismaService = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma = prismaService;

export default prismaService