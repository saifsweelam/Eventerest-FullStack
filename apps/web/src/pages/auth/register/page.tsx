import { Link } from "react-router";
import { useAuth } from "../../../providers/authProvider";

export default function RegisterPage() {
    const authContext = useAuth();

    const register = async (formData: FormData) => {
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            throw new Error("Invalid form data");
        }

        await authContext.register({ name, email, password });
    };

    return (
        <section>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="py-12 md:py-20">
                    {/* Section header */}
                    <div className="pb-12 text-center">
                        <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                            Create an account
                        </h1>
                    </div>
                    {/* Contact form */}
                    <form action={register} className="mx-auto max-w-[400px]">
                        <div className="space-y-5">
                            <div>
                                <label
                                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                                    htmlFor="name"
                                >
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="form-input w-full"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                                    htmlFor="email"
                                >
                                    Work Email{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="form-input w-full"
                                    placeholder="Your work email"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium text-indigo-200/65"
                                    htmlFor="password"
                                >
                                    Password{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="form-input w-full"
                                    placeholder="Password (at least 10 characters)"
                                />
                            </div>
                        </div>
                        <div className="mt-6 space-y-5">
                            <button
                                type="submit"
                                className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    {/* Bottom link */}
                    <div className="mt-6 text-center text-sm text-indigo-200/65">
                        Already have an account?{" "}
                        <Link
                            className="font-medium text-indigo-500"
                            to="/login"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
