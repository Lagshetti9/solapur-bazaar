"use client";

import { useState } from "react";
import Link from "next/link";
import AddressForm from "@/components/auth/AddressForm";
import {
    Menu,
    X,
    Search,
    ShoppingCart,
    UserRound,
    Store,
    MapPin,
    ChevronRight,
    MapPinned,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState("");

    const { totalItems } = useCart();

    function submitSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const query = search.trim();

        if (!query) return;

        window.location.href = `/?q=${encodeURIComponent(query)}#products`;
        setMenuOpen(false);
    }

    function openAddressModal() {
        setMenuOpen(false);
        setAddressModalOpen(true);
    }

    return (
        <>
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                {/* Main Navbar */}
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4">

                    {/* Mobile Menu */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="shrink-0 rounded-lg p-2 text-[#132B46] hover:bg-gray-100 md:hidden"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={23} /> : <Menu size={23} />}
                    </button>

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-2"
                        aria-label="SolapurMart Home"
                    >
                        <span className="rounded-xl bg-[#BD243D] p-2 text-white shadow-sm sm:p-2.5">
                            <Store size={23} strokeWidth={2.2} />
                        </span>

                        <span className="leading-tight">
                            <span className="block text-lg font-extrabold tracking-tight sm:text-2xl">
                                <span className="text-[#132B46]">Solapur</span>
                                <span className="text-[#BD243D]">Mart</span>
                            </span>

                            <span className="hidden text-[9px] font-medium tracking-[0.13em] text-gray-500 sm:block sm:text-[10px]">
                                SOLAPURMART.SHOP
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Search */}
                    <form
                        onSubmit={submitSearch}
                        role="search"
                        className="mx-auto hidden max-w-2xl flex-1 items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-[#BD243D] focus-within:bg-white md:flex"
                    >
                        <Search
                            size={19}
                            className="ml-3 shrink-0 text-gray-400"
                        />

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
                            className="self-stretch bg-[#BD243D] px-4 text-sm font-semibold text-white transition hover:bg-[#9f1d32]"
                        >
                            Search
                        </button>
                    </form>

                    {/* Delivery Address */}
                    <button
                        type="button"
                        onClick={openAddressModal}
                        aria-label="Add or change delivery address"
                        className="hidden min-w-0 max-w-52 shrink-0 items-center gap-2 rounded-xl p-2 text-left transition hover:bg-gray-100 lg:flex"
                    >
                        <MapPin
                            size={22}
                            className="shrink-0 text-[#BD243D]"
                        />

                        <span className="min-w-0 flex-1 leading-tight">
                            <span className="block text-[11px] text-gray-500">
                                Deliver to
                            </span>

                            <span className="block truncate text-sm font-semibold text-[#132B46]">
                                {deliveryAddress || "Add your address"}
                            </span>

                            <span className="block text-[11px] text-gray-500">
                                Change address
                            </span>
                        </span>

                        <ChevronRight
                            size={16}
                            className="shrink-0 text-gray-400"
                        />
                    </button>

                    {/* Login */}
                    <Link
                        href="/login"
                        aria-label="Login to SolapurMart"
                        className="hidden shrink-0 items-center gap-2 rounded-xl p-2 text-[#132B46] transition hover:bg-gray-100 sm:flex"
                    >
                        <UserRound size={22} />
                        <span className="text-sm font-semibold">Login</span>
                    </Link>

                    {/* Cart */}
                    <Link
                        href="/cart"
                        aria-label={`Shopping cart, ${totalItems} items`}
                        className="relative ml-auto flex shrink-0 items-center gap-2 rounded-xl p-2 text-[#132B46] transition hover:bg-gray-100 sm:ml-0"
                    >
                        <span className="relative">
                            <ShoppingCart size={24} strokeWidth={1.9} />

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

                {/* Mobile Search */}
                <div className="px-3 pb-3 sm:px-4 md:hidden">
                    <form
                        onSubmit={submitSearch}
                        role="search"
                        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 transition focus-within:border-[#BD243D] focus-within:bg-white"
                    >
                        <Search
                            size={18}
                            className="shrink-0 text-gray-400"
                        />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            aria-label="Search products"
                            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-gray-800 outline-none"
                        />

                        <button
                            type="submit"
                            className="text-sm font-bold text-[#BD243D]"
                        >
                            Go
                        </button>
                    </form>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <nav className="border-t border-gray-100 bg-white px-3 py-3 shadow-lg md:hidden sm:px-4">
                        <button
                            type="button"
                            onClick={openAddressModal}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-[#132B46] transition hover:bg-rose-50"
                        >
                            <MapPinned
                                size={20}
                                className="text-[#BD243D]"
                            />

                            <span className="min-w-0 flex-1">
                                <span className="block">Delivery Address</span>
                                <span className="block truncate text-xs font-normal text-gray-500">
                                    {deliveryAddress || "Add your delivery address"}
                                </span>
                            </span>

                            <ChevronRight size={17} />
                        </button>

                        <Link
                            href="/login"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-[#132B46] transition hover:bg-rose-50"
                        >
                            <UserRound size={19} />
                            Login / Sign Up
                        </Link>

                        <Link
                            href="/cart"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-[#132B46] transition hover:bg-rose-50"
                        >
                            <ShoppingCart size={19} />
                            My Cart ({totalItems})
                        </Link>
                    </nav>
                )}
            </header>

            {/* Delivery Address Modal */}
            {addressModalOpen && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-3 sm:p-5"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            setAddressModalOpen(false);
                        }
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delivery-address-title"
                        className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:p-6"
                    >
                        <button
                            type="button"
                            onClick={() => setAddressModalOpen(false)}
                            aria-label="Close delivery address form"
                            className="absolute right-3 top-3 z-10 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                            <X size={21} />
                        </button>

                        <div className="mb-5 flex items-center gap-3 pr-8">
                            <span className="rounded-xl bg-rose-50 p-2.5 text-[#BD243D]">
                                <MapPin size={23} />
                            </span>

                            <div>
                                <h2
                                    id="delivery-address-title"
                                    className="text-lg font-bold text-[#132B46] sm:text-xl"
                                >
                                    Delivery Address
                                </h2>

                                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                    Enter your details for delivery.
                                </p>
                            </div>
                        </div>

                        <AddressForm
                            onComplete={() => {
                                return setAddressModalOpen(false);
                            }}
                        />
                    </section>
                </div>
            )}
        </>
    );
}
