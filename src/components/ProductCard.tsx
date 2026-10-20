"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ShoppingCart,
    Zap,
    Star,
    X,
    ChevronLeft,
    ChevronRight,
    Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

// If prices from DummyJSON are in USD (< 1500), convert using a fixed conversion factor
const USD_TO_INR_RATE = 85;

function toRupees(price: number): number {
    // If the price is already in typical INR scale (> 1000 without decimal), leave it, otherwise convert USD to INR
    return price < 1500 ? Math.round(price * USD_TO_INR_RATE) : Math.round(price);
}

function formatINR(amount: number): string {
    return new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function ProductCard({ product }: { product: Product }) {
    const router = useRouter();
    const { addToCart } = useCart();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Collect all gallery images or fallback to thumbnail
    const galleryImages: string[] =
        product.images && product.images.length > 0
            ? product.images
            : [product.thumbnail];

    // Calculate Rupee Prices
    const originalPriceInRupees = toRupees(product.price);
    const discountedPriceInRupees = Math.round(
        originalPriceInRupees * (1 - product.discountPercentage / 100)
    );

    const handleBuyNow = () => {
        addToCart(product);
        setIsModalOpen(false);
        router.push("/checkout");
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex(
            (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
        );
    };

    return (
        <>
            <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Product Thumbnail / Click to preview */}
                <div>
                    <div
                        onClick={() => {
                            setSelectedImageIndex(0);
                            setIsModalOpen(true);
                        }}
                        className="relative block aspect-square cursor-zoom-in overflow-hidden bg-gray-50"
                        title="Click to zoom and view all images"
                    >
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#BD243D] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                            {Math.round(product.discountPercentage)}% OFF
                        </span>

                        <Image
                            src={product.thumbnail}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    <div className="p-4 pb-2">
                        <p className="mb-1 text-xs uppercase tracking-wider text-gray-400">
                            {product.category?.replaceAll("-", " ")}
                        </p>

                        <Link href={`/products/${product.id}`}>
                            <h3 className="line-clamp-2 min-h-11 text-sm font-semibold text-[#132B46] hover:text-[#BD243D]">
                                {product.title}
                            </h3>
                        </Link>

                        {/* Rating & Stock */}
                        <div className="my-2 flex items-center gap-1.5 text-xs">
                            <span className="flex items-center gap-1 rounded bg-green-700 px-1.5 py-0.5 font-bold text-white">
                                {product.rating?.toFixed(1) ?? "4.0"}
                                <Star size={11} fill="white" className="text-white" />
                            </span>
                            <span className="text-gray-400">|</span>
                            <span
                                className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"
                                    }`}
                            >
                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        {/* Price in INR */}
                        <div className="mb-3 flex flex-wrap items-baseline gap-2">
                            <span className="text-lg font-extrabold text-[#132B46]">
                                ₹{formatINR(discountedPriceInRupees)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                                ₹{formatINR(originalPriceInRupees)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Flipkart Style Buttons (Add to Cart & Buy Now) */}
                <div className="grid grid-cols-2 gap-2 border-t border-slate-100 p-3">
                    <button
                        type="button"
                        disabled={product.stock < 1}
                        onClick={() => addToCart(product)}
                        className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#FF9F00] px-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#f39700] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <ShoppingCart size={15} />
                        Add to Cart
                    </button>

                    <button
                        type="button"
                        disabled={product.stock < 1}
                        onClick={handleBuyNow}
                        className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#FB641B] px-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#e85813] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Zap size={15} fill="white" />
                        Buy Now
                    </button>
                </div>
            </article>

            {/* FULL-SCREEN IMAGE & DETAILS MODAL */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-6 backdrop-blur-sm"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                        {/* Left Side: Main Large Image & Gallery */}
                        <div className="flex flex-1 flex-col bg-slate-50 p-4 sm:p-6">
                            {/* Main Active Preview */}
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                                <Image
                                    src={galleryImages[selectedImageIndex]}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-4"
                                    priority
                                />

                                {galleryImages.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handlePrevImage}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow hover:bg-white"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleNextImage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow hover:bg-white"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail Selector */}
                            {galleryImages.length > 1 && (
                                <div className="mt-3 flex gap-2 overflow-x-auto py-1">
                                    {galleryImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition ${selectedImageIndex === idx
                                                ? "border-[#7e3a18] ring-2 ring-orange-900"
                                                : "border-slate-200 opacity-60 hover:opacity-100"
                                                }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`Thumbnail ${idx + 1}`}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Side: Product Details & Purchase Actions */}
                        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-6">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#BD243D]">
                                    {product.category?.replaceAll("-", " ")}
                                </span>

                                <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                                    {product.title}
                                </h2>

                                <div className="mt-3 flex items-center gap-2">
                                    <span className="flex items-center gap-1 rounded bg-green-700 px-2 py-0.5 text-xs font-bold text-white">
                                        {product.rating?.toFixed(1) ?? "4.0"}
                                        <Star size={12} fill="white" />
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {product.stock > 0
                                            ? `${product.stock} items available in stock`
                                            : "Currently unavailable"}
                                    </span>
                                </div>

                                {/* Price block */}
                                <div className="mt-4 flex items-baseline gap-3">
                                    <span className="text-3xl font-extrabold text-slate-900">
                                        ₹{formatINR(discountedPriceInRupees)}
                                    </span>
                                    <span className="text-sm text-slate-400 line-through">
                                        ₹{formatINR(originalPriceInRupees)}
                                    </span>
                                    <span className="text-sm font-bold text-green-600">
                                        {Math.round(product.discountPercentage)}% off
                                    </span>
                                </div>

                                {product.description && (
                                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                                        {product.description}
                                    </p>
                                )}

                                <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-xs text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <Check size={14} className="text-green-600" />
                                        <span>Eligible for Fast Delivery in Solapur</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check size={14} className="text-green-600" />
                                        <span>7-day Replacement Policy</span>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Action Buttons */}
                            <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    disabled={product.stock < 1}
                                    onClick={() => {
                                        addToCart(product);
                                        setIsModalOpen(false);
                                    }}
                                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#FF9F00] font-bold text-white shadow transition hover:bg-[#f39700] active:scale-[0.99] disabled:opacity-50"
                                >
                                    <ShoppingCart size={18} />
                                    Add to Cart
                                </button>

                                <button
                                    type="button"
                                    disabled={product.stock < 1}
                                    onClick={handleBuyNow}
                                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#FB641B] font-bold text-white shadow transition hover:bg-[#e85813] active:scale-[0.99] disabled:opacity-50"
                                >
                                    <Zap size={18} fill="white" />
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}