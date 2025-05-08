import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma";
import { betterAuth } from "better-auth";

const client = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(client, {
        provider: "sqlite",
    }),
    appName: "api",
    plugins: [],
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [
        "http://localhost:5173",
    ]
});
