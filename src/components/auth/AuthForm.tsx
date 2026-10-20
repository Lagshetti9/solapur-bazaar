"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Phone,
    Mail,
    ShoppingBag,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";

export default function AuthForm() {
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            setError("Enter a valid 10-digit mobile number.");
            return;
        }

        if (
            email.trim() &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ) {
            setError("Enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            // DEMO ONLY: Replace with your backend-issued token.
            localStorage.setItem("mobileNumber", mobile);

            if (email.trim()) {
                localStorage.setItem("email", email.trim());
            } else {
                localStorage.removeItem("email");
            }

            localStorage.setItem("accessToken", "demo-token");

            window.location.href = "/";
        } catch {
            setError("Unable to save details. Please try again.");
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-dvh items-start justify-center bg-white px-0 py-0 sm:items-center sm:bg-slate-100 sm:px-4 sm:py-6">
            <div className="grid w-full max-w-5xl overflow-hidden bg-white sm:rounded-2xl sm:border sm:border-slate-200 sm:shadow-sm md:grid-cols-2">

                {/* Left brand panel (Desktop only) */}
                <section className="hidden flex-col justify-between bg-[#132B46] p-8 text-white md:flex">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#132B46]">
                            <ShoppingBag size={19} />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold">SolapurMart</h1>
                            <p className="text-[11px] text-slate-300">
                                Your local shopping destination
                            </p>
                        </div>
                    </Link>

                    <div className="py-8">
                        <span className="mb-3 inline-flex items-center gap-2 text-xs text-blue-200">
                            <ShieldCheck size={15} />
                            Simple and convenient shopping
                        </span>

                        <h2 className="text-3xl font-bold leading-snug">
                            Everything you need,
                            <span className="block text-blue-200">
                                just a tap away.
                            </span>
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-slate-300">
                            Discover products and enjoy a simple shopping experience
                            with SolapurMart.
                        </p>
                    </div>

                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} SolapurMart.shop
                    </p>
                </section>

                {/* Login form section */}
                <section className="flex w-full items-start justify-center px-5 pt-8 pb-10 sm:items-center sm:p-8 md:p-10">
                    <div className="w-full max-w-sm">

                        {/* Mobile Header / Logo */}
                        <div className="mb-6 flex items-center justify-between md:hidden">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#132B46] text-white">
                                    <ShoppingBag size={17} />
                                </div>
                                <span className="text-lg font-bold text-[#132B46]">
                                    SolapurMart
                                </span>
                            </Link>
                            <Link
                                href="/"
                                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                            >
                                Cancel
                            </Link>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#BD243D]">
                                Welcome
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                Login or Sign up
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Enter your mobile number to get started.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Mobile number */}
                            <div>
                                <label
                                    htmlFor="mobile"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Mobile number <span className="text-red-500">*</span>
                                </label>

                                <div className="flex h-11 overflow-hidden rounded-lg border border-slate-300 bg-white transition focus-within:border-[#234a70] focus-within:ring-2 focus-within:ring-blue-100">
                                    <div className="flex items-center gap-1.5 border-r border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-600">
                                        <Phone size={15} />
                                        <span>+91</span>
                                    </div>

                                    <input
                                        id="mobile"
                                        name="mobile"
                                        type="tel"
                                        inputMode="numeric"
                                        autoComplete="tel-national"
                                        placeholder="Enter 10-digit number"
                                        value={mobile}
                                        onChange={(e) =>
                                            setMobile(
                                                e.target.value.replace(/\D/g, "").slice(0, 10)
                                            )
                                        }
                                        maxLength={10}
                                        pattern="[6-9][0-9]{9}"
                                        required
                                        className="min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none placeholder:text-slate-400 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Optional email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-medium text-slate-700"
                                >
                                    Email address{" "}
                                    <span className="text-xs font-normal text-slate-400">
                                        (Optional)
                                    </span>
                                </label>

                                <div className="flex h-11 items-center gap-2.5 rounded-lg border border-slate-300 bg-white px-3 transition focus-within:border-[#234a70] focus-within:ring-2 focus-within:ring-blue-100">
                                    <Mail size={16} className="shrink-0 text-slate-400" />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600"
                                >
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#BD243D] px-4 text-sm font-semibold text-white transition hover:bg-[#a51d33] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Please wait..." : "Continue"}
                                {!loading && <ArrowRight size={16} />}
                            </button>

                            <p className="text-center text-xs leading-5 text-slate-500">
                                By continuing, you agree to our{" "}
                                <Link
                                    href="/terms"
                                    className="font-medium text-[#234a70] hover:underline"
                                >
                                    Terms
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/privacy"
                                    className="font-medium text-[#234a70] hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </form>

                        <div className="my-5 border-t border-slate-200" />

                        <Link
                            href="/"
                            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:bg-slate-100"
                        >
                            <ShoppingBag size={15} />
                            Continue shopping
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}