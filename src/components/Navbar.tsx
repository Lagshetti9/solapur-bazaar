
"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Menu,
    X,
    Search,
    ShoppingCart,
    UserRound,
    Store,
    MapPin,
    ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";




export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const { totalItems } = useCart();

    function submitSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const query = search.trim();

        if (!query) return;

        window.location.href = `/?q=${encodeURIComponent(query)}#products`;
        setMenuOpen(false);
    }

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">

            {/* Main header */}
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:gap-5">
                {/* Mobile menu */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="rounded-lg p-2 text-[#132B46] transition hover:bg-gray-100 md:hidden"
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={23} /> : <Menu size={23} />}
                </button>

                {/* Brand */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2"
                    aria-label="SolapurMart.shop home"
                >
                    <span className="rounded-xl bg-[#BD243D] p-2.5 text-white shadow-sm">
                        <Store size={24} strokeWidth={2.2} />
                    </span>

                    <span className="leading-tight">
                        <span className="block text-xl font-extrabold tracking-tight sm:text-2xl">
                            <span className="text-[#132B46]">Solapur</span>
                            <span className="text-[#BD243D]">Mart</span>
                        </span>
                        <span className="block text-[10px] font-medium tracking-[0.18em] text-gray-500 sm:text-xs">
                            SOLAPURMART.SHOP
                        </span>
                    </span>
                </Link>

                {/* Desktop search */}
                <form
                    onSubmit={submitSearch}
                    role="search"
                    className="mx-auto hidden max-w-2xl flex-1 items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-[#BD243D] focus-within:bg-white md:flex"
                >
                    <Search size={19} className="ml-4 shrink-0 text-gray-400" />

                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products, brands and more..."
                        aria-label="Search products"
                        className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    />

                    <button
                        type="submit"
                        className="self-stretch bg-[#BD243D] px-5 text-sm font-semibold text-white transition hover:bg-[#9f1d32]"
                    >
                        Search
                    </button>
                </form>

                {/* Delivery location - informational */}
                <div className="hidden items-center gap-2 text-gray-600 lg:flex">
                    <MapPin size={20} className="text-[#BD243D]" />
                    <div className="leading-tight">
                        <span className="block text-[11px] text-gray-500">
                            Shopping from
                        </span>
                        <span className="text-sm font-semibold text-[#132B46]">
                            Solapur
                        </span>
                    </div>
                </div>

                {/* Account */}
                <Link
                    href="/account"
                    aria-label="My account"
                    className="hidden items-center gap-2 rounded-xl p-2 text-[#132B46] transition hover:bg-gray-100 sm:flex"
                >
                    <UserRound size={23} />
                    <span className="hidden text-sm font-semibold lg:inline">
                        Account
                    </span>
                </Link>

                {/* Cart */}
                <Link
                    href="/cart"
                    className="relative ml-auto flex shrink-0 items-center gap-2 rounded-xl p-2 text-[#132B46] transition hover:bg-gray-100 sm:ml-0"
                    aria-label={`Shopping cart, ${totalItems} items`}
                >
                    <span className="relative">
                        <ShoppingCart size={25} strokeWidth={1.9} />

                        {totalItems > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#BD243D] px-1 text-[10px] font-bold text-white ring-2 ring-white">
                                {totalItems > 99 ? "99+" : totalItems}
                            </span>
                        )}
                    </span>

                    <span className="hidden text-sm font-semibold sm:inline">
                        Cart
                    </span>
                </Link>
            </div>

            {/* Mobile search */}
            <div className="px-4 pb-3 md:hidden">
                <form
                    onSubmit={submitSearch}
                    role="search"
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 focus-within:border-[#BD243D]"
                >
                    <Search size={19} className="shrink-0 text-gray-400" />

                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        aria-label="Search products"
                        className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
                    />

                    <button
                        type="submit"
                        className="text-sm font-bold text-[#BD243D]"
                    >
                        Go
                    </button>
                </form>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden border-t border-gray-100 md:block">
                <div className="mx-auto flex max-w-7xl items-center gap-8 px-4">




                </div>
            </nav>

            {/* Mobile navigation */}
            {menuOpen && (
                <nav className="border-t border-gray-100 bg-white px-4 py-3 shadow-lg md:hidden">




                    <Link
                        href="/account"
                        onClick={() => setMenuOpen(false)}
                        className="mt-1 flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-[#132B46] hover:bg-rose-50"
                    >
                        <UserRound size={18} />
                        My Account
                    </Link>
                </nav>
            )}
        </header>
    );
}
