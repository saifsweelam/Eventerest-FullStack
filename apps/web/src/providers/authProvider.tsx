import React, { useContext, createContext } from "react";
import { authClient } from "../lib/authClient";
import type { User, Session } from "better-auth";
import type { BetterFetchError } from "better-auth/react";

export type LoginPayload = {
    email: string;
    password: string;
};

export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
};

export type AuthProviderProps = {
    login: (payload: LoginPayload) => void;
    logout: () => void;
    register: (payload: RegisterPayload) => void;
    user?: User;
    session?: Session;
    isPending?: boolean;
    error: BetterFetchError | null;
};

const AuthContext = createContext<AuthProviderProps>({
    login: () => {},
    logout: () => {},
    register: () => {},
    error: null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, isPending, error } = authClient.useSession();

    const login = async (payload: LoginPayload) => {
        return await authClient.signIn.email(payload);
    };

    const logout = async () => {
        return await authClient.signOut();
    };

    const register = async (payload: RegisterPayload) => {
        return await authClient.signUp.email(payload);
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                register,
                user: data?.user,
                session: data?.session,
                isPending,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
