import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

export const statements = {
    ...defaultStatements,
    event: ["create", "read", "update", "delete"],
    booking: [
        "create",
        "read",
        "update",
        "delete",
        "read:own",
        "update:own",
        "delete:own",
    ],
} as const;

export type Permissions = {
    user?: (typeof statements.user)[number][];
    session?: (typeof statements.session)[number][];
    event?: (typeof statements.event)[number][];
    booking?: (typeof statements.booking)[number][];
};

export const accessControl = createAccessControl(statements);

export const admin = accessControl.newRole({
    ...adminAc.statements,
    event: ["create", "read", "update", "delete"],
    booking: ["read", "delete", "update"],
});

export const user = accessControl.newRole({
    event: ["read"],
    booking: ["create", "read:own", "update:own", "delete:own"],
});
