"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CreditCard, ArrowLeft, ShieldCheck, ShoppingBag } from "lucide-react";
import AddressForm from "@/components/auth/AddressForm";
import { useCart } from "@/context/CartContext";

// PASTE YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL HERE:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxIFZUOx9sVU_zji8C95jw0hH_I_nWY0kFhXdx3EZ2bTu3PPifNVpLMrUET4cxGYzr6Tg/exec";

export default function CheckoutPage() {
    const { cart, totalAmount, clearCart } = useCart();

    const [savedAddress, setSavedAddress] = useState<any>(null);
    const [step, setStep] = useState<"loading" | "address" | "payment" | "success">("loading");
    const [paymentMode, setPaymentMode] = useState<string>("Cash on Delivery (COD)");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>("");

    useEffect(() => {
        const storedAddress = localStorage.getItem("deliveryAddress");
        if (storedAddress) {
            try {
                const parsed = JSON.parse(storedAddress);
                setSavedAddress(parsed);
                setStep("payment");
            } catch {
                setStep("address");
            }
        } else {
            setStep("address");
        }
    }, []);

    const handlePlaceOrder = async () => {
        if (!savedAddress) {
            setStep("address");
            return;
        }

        setIsSubmitting(true);
        const generatedOrderId = `ORD-${Date.now().toString().slice(-6)}`;
        setOrderId(generatedOrderId);

        const orderPayload = {
            orderId: generatedOrderId,
            address: savedAddress,
            items: cart && cart.length > 0 ? cart : [{ title: "Product", quantity: 1, price: totalAmount || 1299 }],
            totalAmount: totalAmount || 1299,
            paymentMode: paymentMode,
        };

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify(orderPayload),
            });

            if (clearCart) {
                clearCart();
            }

            setStep("success");
        } catch {
            alert("Something went wrong while placing your order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (step === "loading") {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#BD243D]" />
            </div>
        );
    }

    if (step === "success") {
        return (
            <main className="flex min-h-[80vh] items-center justify-center px-4 py-10">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 size={36} />
                    </div>

                    <h1 className="mt-4 text-2xl font-bold text-slate-900">Order Placed!</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Thank you for shopping with SolapurMart.
                    </p>

                    <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left text-xs leading-relaxed text-slate-600">
                        <p><strong className="text-slate-800">Order ID:</strong> {orderId}</p>
                        <p><strong className="text-slate-800">Payment:</strong> {paymentMode}</p>
                        <p><strong className="text-slate-800">Delivering to:</strong> {savedAddress?.fullName}, {savedAddress?.city} ({savedAddress?.pincode})</p>
                    </div>

                    <Link
                        href="/"
                        className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#BD243D] text-sm font-semibold text-white transition hover:bg-[#a51d33]"
                    >
                        <ShoppingBag size={16} /> Continue Shopping
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-6 sm:py-10">
            <div className="mx-auto max-w-4xl px-4">
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                        <ArrowLeft size={16} /> Back to Cart
                    </Link>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                        <ShieldCheck size={16} /> 100% Safe & Secure Checkout
                    </div>
                </div>

                {step === "address" && (
                    <div>
                        <AddressForm
                            initialData={savedAddress}
                            onSuccess={(address) => {
                                setSavedAddress(address);
                                setStep("payment");
                            }}
                        />
                    </div>
                )}

                {step === "payment" && (
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-4 md:col-span-2">
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <h2 className="font-bold text-slate-800">
                                            Delivery Address
                                        </h2>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setStep("address")}
                                        className="text-xs font-bold text-[#BD243D] hover:underline"
                                    >
                                        Change
                                    </button>
                                </div>

                                <div className="mt-3 pl-9 text-sm text-slate-600">
                                    <p className="font-semibold text-slate-800">
                                        {savedAddress?.fullName}{" "}
                                        <span className="ml-2 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                                            {savedAddress?.addressType || "Home"}
                                        </span>
                                    </p>
                                    <p className="mt-1">
                                        {savedAddress?.houseDetails}, {savedAddress?.streetDetails}
                                    </p>
                                    <p>
                                        {savedAddress?.landmark ? `${savedAddress.landmark}, ` : ""}
                                        {savedAddress?.city}, {savedAddress?.state} -{" "}
                                        <span className="font-medium text-slate-800">
                                            {savedAddress?.pincode}
                                        </span>
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Phone: +91 {savedAddress?.mobile}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                                    <CreditCard size={18} className="text-[#BD243D]" />
                                    <h2 className="font-bold text-slate-800">
                                        Choose Payment Method
                                    </h2>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <label
                                        onClick={() => setPaymentMode("Cash on Delivery (COD)")}
                                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${paymentMode === "Cash on Delivery (COD)"
                                            ? "border-[#BD243D] bg-red-50/20"
                                            : "border-slate-200 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="paymentMode"
                                                checked={paymentMode === "Cash on Delivery (COD)"}
                                                onChange={() => setPaymentMode("Cash on Delivery (COD)")}
                                                className="h-4 w-4 text-[#BD243D] focus:ring-[#BD243D]"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    Cash on Delivery (COD)
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    Pay cash or scan UPI when product arrives
                                                </p>
                                            </div>
                                        </div>
                                    </label>

                                    <label
                                        onClick={() => setPaymentMode("UPI / Online Payment")}
                                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${paymentMode === "UPI / Online Payment"
                                            ? "border-[#BD243D] bg-red-50/20"
                                            : "border-slate-200 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="paymentMode"
                                                checked={paymentMode === "UPI / Online Payment"}
                                                onChange={() => setPaymentMode("UPI / Online Payment")}
                                                className="h-4 w-4 text-[#BD243D] focus:ring-[#BD243D]"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    UPI / Google Pay / PhonePe / Cards
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    Instant and secure online payment
                                                </p>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={handlePlaceOrder}
                                    className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#FB641B] font-bold text-white shadow-md transition hover:bg-[#e85813] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSubmitting ? "Placing Order..." : "Confirm & Place Order"}
                                </button>
                            </div>
                        </div>

                        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h3 className="border-b border-slate-100 pb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
                                Price Details
                            </h3>

                            <div className="mt-4 space-y-2.5 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Total MRP</span>
                                    <span>₹{totalAmount || 1299}</span>
                                </div>
                                <div className="flex justify-between text-emerald-600">
                                    <span>Delivery Charges</span>
                                    <span className="font-semibold">FREE</span>
                                </div>
                                <div className="my-2 border-t border-dashed border-slate-200" />
                                <div className="flex justify-between text-base font-extrabold text-slate-900">
                                    <span>Total Payable</span>
                                    <span>₹{totalAmount || 1299}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}