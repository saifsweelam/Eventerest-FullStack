import { RequestHandler } from "express";
import { auth, isPermitted } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { Session, User } from "better-auth/types";
import { Permissions } from "../lib/roles";

export const embedUserMiddleware: RequestHandler = async (req, res, next) => {
    const sessionData = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    });

    req.sessionData = sessionData as { user: User; session: Session } | null;

    next();
};

export const requireAuth = <P, R, B, Q>(
    permissions?: Permissions,
): RequestHandler<P, R, B, Q> => {
    return async (req, res, next) => {
        if (!req.sessionData) {
            throw new Error("Unauthorized");
        }

        if (permissions) {
            if (!(await isPermitted(req.sessionData.user.id, permissions))) {
                throw new Error("Forbidden");
            }
        }

        next();
    };
};
