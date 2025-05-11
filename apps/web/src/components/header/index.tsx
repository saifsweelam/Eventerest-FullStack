import { useState } from "react";
import { Link } from "react-router";
import Logo from "../logo";
import { useAuth } from "../../providers/authProvider";

export default function Header() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full pt-2 md:pt-5">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="relative flex h-14 items-center justify-between rounded-2xl bg-gray-900/90 px-3 shadow-lg backdrop-blur-md before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
                    {/* Left: Logo + Nav Links */}
                    <div className="flex items-center gap-6">
                        <Logo />

                        <nav className="hidden md:block">
                            <ul className="flex items-center gap-4">
                                {navLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className="relative px-3 py-2 text-gray-300 transition duration-300 ease-in-out group"
                                        >
                                            <span className="relative z-10">{link.label}</span>
                                            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Mobile toggle */}
                    <div className="md:hidden">
                        <button
                            className="text-gray-300 hover:text-white focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Right (Auth Buttons for Desktop) */}
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <>
                                <span className="text-gray-300 px-3">{user.name}</span>
                                <button
                                    onClick={logout}
                                    className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] px-3 text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="btn-sm relative bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
                        menuOpen ? 'max-h-[500px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
                    }`}
                >
                    <div className="flex flex-col items-start gap-4 bg-gray-900/95 px-4 py-4 backdrop-blur-md rounded-b-2xl shadow-inner">
                        <nav>
                            <ul className="flex flex-col gap-3 w-full">
                                {navLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            onClick={() => setMenuOpen(false)}
                                            className="relative block w-full px-3 py-2 text-gray-300 transition duration-300 ease-in-out group"
                                        >
                                            <span className="relative z-10">{link.label}</span>
                                            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="flex flex-col gap-3 w-full">
                            {user ? (
                                <>
                                    <span className="text-gray-300 px-3">{user.name}</span>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setMenuOpen(false);
                                        }}
                                        className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 py-[5px] px-3 text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setMenuOpen(false)}
                                        className="btn-sm relative bg-linear-to-b from-gray-800 to-gray-800/60 py-[5px] text-gray-300 hover:bg-[length:100%_150%]"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setMenuOpen(false)}
                                        className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 py-[5px] text-white hover:bg-[length:100%_150%]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
