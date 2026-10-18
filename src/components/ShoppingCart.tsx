"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ShoppingCart() {
    const {
        items,
        ready,
        updateQuantity,
        removeFromCart,
        totalPrice,
    } = useCart();

    if (!ready) {
        return (
            <div className="py-24 text-center text-gray-500">
                Loading your cart...
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-24 text-center">
                <ShoppingBag
                    size={64}
                    className="mx-auto mb-5 text-gray-300"
                />
                <h1 className="text-3xl font-extrabold text-[#132B46]">
                    Your cart is empty
                </h1>
                <p className="mt-3 text-gray-500">
                    Discover something you love at SolapurMart.
                </p>
                <Link
                    href="/#products"
                    className="mt-7 inline-block rounded-xl bg-[#BD243D] px-6 py-3 font-bold text-white hover:bg-[#9f1d32]"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-12">
            <h1 className="mb-8 text-3xl font-extrabold text-[#132B46] sm:text-4xl">
                Shopping Cart ({items.length})
            </h1>

            <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
                <div className="space-y-4">
                    {items.map(({ product, quantity }) => (
                        <article
                            key={product.id}
                            className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:flex-row sm:items-center"
                        >
                            <div className="relative h-28 w-full shrink-0 rounded-xl bg-gray-50 sm:w-28">
                                <Image
                                    src={product.thumbnail}
                                    alt={product.title}
                                    fill
                                    sizes="112px"
                                    className="object-contain p-2"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <Link
                                    href={`/products/${product.id}`}
                                    className="font-bold text-[#132B46] hover:text-[#BD243D]"
                                >
                                    {product.title}
                                </Link>

                                <p className="mt-2 font-semibold text-[#BD243D]">
                                    ${product.price.toFixed(2)} each
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                    <div className="flex items-center rounded-lg border">
                                        <button
                                            aria-label="Decrease quantity"
                                            onClick={() =>
                                                updateQuantity(product.id, quantity - 1)
                                            }
                                            className="p-2 hover:bg-gray-100"
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <span className="min-w-9 text-center text-sm font-semibold">
                                            {quantity}
                                        </span>

                                        <button
                                            aria-label="Increase quantity"
                                            disabled={quantity >= product.stock}
                                            onClick={() =>
                                                updateQuantity(product.id, quantity + 1)
                                            }
                                            className="p-2 hover:bg-gray-100 disabled:opacity-30"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(product.id)}
                                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={16} />
                                        Remove
                                    </button>
                                </div>
                            </div>

                            <p className="text-lg font-extrabold text-[#132B46]">
                                ${(product.price * quantity).toFixed(2)}
                            </p>
                        </article>
                    ))}
                </div>

                <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-[#132B46]">
                        Order Summary
                    </h2>

                    <div className="mt-6 flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="mt-4 flex justify-between text-sm text-gray-600">
                        <span>Shipping</span>
                        <span className="font-semibold text-green-600">
                            Free
                        </span>
                    </div>

                    <div className="my-5 border-t" />

                    <div className="flex justify-between gap-3 text-lg font-extrabold text-[#132B46]">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <p className="mt-3 text-xs text-gray-500">
                        Sample prices are displayed in USD. Taxes are not included.
                    </p>

                    <button
                        disabled
                        title="Connect a backend and payment gateway to enable checkout"
                        className="mt-6 w-full cursor-not-allowed rounded-xl bg-gray-300 px-5 py-3 font-bold text-gray-600"
                    >
                        Checkout (Demo Only)
                    </button>

                    <Link
                        href="/#products"
                        className="mt-4 block text-center text-sm font-semibold text-[#BD243D]"
                    >
                        Continue Shopping
                    </Link>
                </aside>
            </div>
        </section>
    );
}