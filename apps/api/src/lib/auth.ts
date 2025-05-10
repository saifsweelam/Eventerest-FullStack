import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma";
import { admin as adminPlugin } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { accessControl, admin, Permissions, user } from "./roles";

const client = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(client, {
        provider: "sqlite",
    }),
    appName: "api",
    plugins: [
        adminPlugin({
            ac: accessControl,
            roles: {
                admin,
                user,
            },
            defaultRole: "user",
        }),
    ],
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: ["http://localhost:5173"],
});

export const isPermitted = async (userId: string, permissions: Permissions) => {
    const response = await auth.api.userHasPermission({
        body: {
            userId,
            permissions,
        },
    });
    return response.success;
};
