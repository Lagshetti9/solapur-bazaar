"use client";

import { useState } from "react";
import Link from "next/link";
import {
    MapPin,
    User,
    Phone,
    Home,
    Building2,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";

export interface AddressData {
    fullName: string;
    mobile: string;
    pincode: string;
    houseDetails: string;
    streetDetails: string;
    landmark: string;
    city: string;
    state: string;
    addressType: "Home" | "Work";
}

interface AddressFormProps {
    onSuccess?: (address: AddressData) => void;
    initialData?: AddressData | null;
}

export default function AddressForm({ onSuccess, initialData }: AddressFormProps) {
    const [formData, setFormData] = useState<AddressData>(
        initialData ?? {
            fullName: "",
            mobile: "",
            pincode: "413001",
            houseDetails: "",
            streetDetails: "",
            landmark: "",
            city: "Solapur",
            state: "Maharashtra",
            addressType: "Home",
        }
    );

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (formData.fullName.trim().length < 3) {
            setError("Please enter a valid full name.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
            setError("Enter a valid 10-digit delivery contact number.");
            return;
        }

        if (!/^\d{6}$/.test(formData.pincode)) {
            setError("Enter a valid 6-digit postal pincode.");
            return;
        }

        if (formData.houseDetails.trim().length < 3) {
            setError("Please specify house/flat/building details.");
            return;
        }

        if (formData.streetDetails.trim().length < 3) {
            setError("Please specify street or locality details.");
            return;
        }

        setLoading(true);

        try {
            localStorage.setItem("deliveryAddress", JSON.stringify(formData));
            if (onSuccess) {
                onSuccess(formData);
            } else {
                window.location.href = "/checkout";
            }
        } catch {
            setError("Failed to save delivery address. Please try again.");
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-dvh items-start justify-center bg-white px-0 py-0 sm:items-center sm:bg-slate-100 sm:px-4 sm:py-8">
            <div className="w-full max-w-xl overflow-hidden bg-white sm:rounded-2xl sm:border sm:border-slate-200 sm:shadow-sm lg:max-w-6xl">
                <div className="border-b border-slate-100 px-5 py-4 sm:px-8">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/cart"
                            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 sm:hidden"
                            aria-label="Go back"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                                Delivery Address
                            </h1>
                            <p className="text-xs text-slate-500 sm:text-sm">
                                Enter your complete shipping address for accurate delivery
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-5 sm:p-8">
                    {error && (
                        <div
                            role="alert"
                            className="mb-6 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-600 sm:text-sm"
                        >
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <div>
                            <label
                                htmlFor="fullName"
                                className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                            >
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="flex h-11 items-center gap-2.5 rounded-lg border border-slate-300 bg-white px-3 transition focus-within:border-[#234a70] focus-within:ring-2 focus-within:ring-blue-100">
                                <User size={17} className="shrink-0 text-slate-400" />
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    placeholder="e.g. Ramesh Patil"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="mobile"
                                className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                            >
                                Contact Number <span className="text-red-500">*</span>
                            </label>
                            <div className="flex h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 transition focus-within:border-[#234a70] focus-within:ring-2 focus-within:ring-blue-100">
                                <Phone size={17} className="shrink-0 text-slate-400" />
                                <span className="text-xs font-medium text-slate-500">+91</span>
                                <input
                                    id="mobile"
                                    name="mobile"
                                    type="tel"
                                    inputMode="numeric"
                                    required
                                    maxLength={10}
                                    placeholder="10-digit number"
                                    value={formData.mobile}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                                        }))
                                    }
                                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="houseDetails"
                                className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                            >
                                Flat, House No., Building <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="houseDetails"
                                name="houseDetails"
                                type="text"
                                required
                                placeholder="e.g. Flat 302, Sai Residency"
                                value={formData.houseDetails}
                                onChange={handleChange}
                                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#234a70] focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="streetDetails"
                                className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                            >
                                Area, Street, Sector <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="streetDetails"
                                name="streetDetails"
                                type="text"
                                required
                                placeholder="e.g. Jule Solapur, Main Road"
                                value={formData.streetDetails}
                                onChange={handleChange}
                                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#234a70] focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="landmark"
                                className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                            >
                                Landmark <span className="text-xs font-normal text-slate-400">(Optional)</span>
                            </label>
                            <input
                                id="landmark"
                                name="landmark"
                                type="text"
                                placeholder="e.g. Near D-Mart / Water Tank"
                                value={formData.landmark}
                                onChange={handleChange}
                                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#234a70] focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="pincode"
                                className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                            >
                                Pincode <span className="text-red-500">*</span>
                            </label>
                            <div className="flex h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 transition focus-within:border-[#234a70] focus-within:ring-2 focus-within:ring-blue-100">
                                <MapPin size={17} className="shrink-0 text-slate-400" />
                                <input
                                    id="pincode"
                                    name="pincode"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    required
                                    placeholder="6 digits (e.g. 413001)"
                                    value={formData.pincode}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                                        }))
                                    }
                                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="city"
                                className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                            >
                                City / District
                            </label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#234a70] focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="state"
                                className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm"
                            >
                                State
                            </label>
                            <input
                                id="state"
                                name="state"
                                type="text"
                                required
                                value={formData.state}
                                onChange={handleChange}
                                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#234a70] focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div className="lg:col-span-2">
                            <span className="mb-2 block text-xs font-semibold text-slate-700 sm:text-sm">
                                Save address as
                            </span>
                            <div className="flex gap-3 sm:max-w-md">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((p) => ({ ...p, addressType: "Home" }))
                                    }
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-semibold transition ${formData.addressType === "Home"
                                            ? "border-[#BD243D] bg-red-50/50 text-[#BD243D]"
                                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    <Home size={15} />
                                    Home (All day delivery)
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData((p) => ({ ...p, addressType: "Work" }))
                                    }
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-semibold transition ${formData.addressType === "Work"
                                            ? "border-[#BD243D] bg-red-50/50 text-[#BD243D]"
                                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    <Building2 size={15} />
                                    Work (10 AM - 6 PM)
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#BD243D] px-8 font-semibold text-white transition hover:bg-[#a51d33] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {loading ? (
                                "Saving Address..."
                            ) : (
                                <>
                                    Deliver to this Address
                                    <ArrowRight size={17} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}