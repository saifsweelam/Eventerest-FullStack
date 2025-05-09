import { Link } from "react-router";
import { useAuth } from "../../../providers/authProvider";

export default function LoginPage() {
    const authContext = useAuth();

    const login = async (formData: FormData) => {
        const email = formData.get("email");
        const password = formData.get("password");

        if (typeof email !== "string" || typeof password !== "string") {
            throw new Error("Invalid form data");
        }

        await authContext.login({ email, password });
    };

    return (
        <section>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="py-12 md:py-20">
                    {/* Section header */}
                    <div className="pb-12 text-center">
                        <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                            Welcome back
                        </h1>
                    </div>
                    {/* Contact form */}
                    <form action={login} className="mx-auto max-w-[400px]">
                        <div className="space-y-5">
                            <div>
                                <label
                                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="form-input w-full"
                                    placeholder="Your email"
                                />
                            </div>
                            <div>
                                <div className="mb-1 flex items-center justify-between gap-3">
                                    <label
                                        className="block text-sm font-medium text-indigo-200/65"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="form-input w-full"
                                    placeholder="Your password"
                                />
                            </div>
                        </div>
                        <div className="mt-6 space-y-5">
                            <button type="submit" className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]">
                                Sign in
                            </button>
                        </div>
                    </form>
                    {/* Bottom link */}
                    <div className="mt-6 text-center text-sm text-indigo-200/65">
                        Don't you have an account?{" "}
                        <Link
                            className="font-medium text-indigo-500"
                            to="/register"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
