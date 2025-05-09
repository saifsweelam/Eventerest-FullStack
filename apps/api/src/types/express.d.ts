import { Session, User } from "better-auth/types";

declare global {
    namespace Express {
        export interface Request {
            sessionData: {
                user: User,
                session: Session
            } | null;
        }
    }
}

export { };