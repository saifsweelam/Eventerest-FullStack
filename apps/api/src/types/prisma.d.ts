import { PrismaClient } from "../generated/prisma";

export {};

declare global {
    type PrismaClientInternalKeys =
        | "$connect"
        | "$disconnect"
        | "$on"
        | "$transaction"
        | "$use"
        | "$extends"
        | "$executeRaw"
        | "$executeRawUnsafe"
        | "$queryRaw"
        | "$queryRawUnsafe"
        | "$metrics";

    type ModelName = Exclude<
        keyof PrismaClient,
        PrismaClientInternalKeys | symbol
    >;
}
