"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function ProductCard({
    product,
}: {
    product: Product;
}) {
    const { addToCart } = useCart();

    const discountedPrice =
        product.price * (1 - product.discountPercentage / 100);

    return (
        <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link
                href={`/products/${product.id}`}
                className="relative block aspect-square overflow-hidden bg-gray-50"
            >
                <span className="absolute left-3 top-3 z-10 rounded-full bg-[#BD243D] px-3 py-1 text-xs font-bold text-white">
                    -{Math.round(product.discountPercentage)}%
                </span>
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain"
                />
            </Link>

            <div className="p-4">
                <p className="mb-2 text-xs capitalize text-gray-500">
                    {product.category.replaceAll("-", " ")}
                </p>

                <Link href={`/products/${product.id}`}>
                    <h3 className="line-clamp-2 min-h-12 font-semibold text-[#132B46] hover:text-[#BD243D]">
                        {product.title}
                    </h3>
                </Link>

                <div className="my-3 flex items-center gap-1 text-sm">
                    <Star size={15} fill="#F59E0B" className="text-amber-500" />
                    <span>{product.rating.toFixed(1)}</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500">
                        {product.stock > 0 ? "In stock" : "Out of stock"}
                    </span>
                </div>

                <div className="mb-4 flex flex-wrap items-baseline gap-2">
                    <span className="text-xl font-extrabold text-[#132B46]">
                        ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <button
                    disabled={product.stock < 1}
                    onClick={() => addToCart(product)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#BD243D] px-3 py-3 text-sm font-bold text-white transition hover:bg-[#9f1d32] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ShoppingCart size={17} />
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
            </div>
        </article>
    );
}