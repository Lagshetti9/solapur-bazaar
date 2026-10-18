"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function AddToCartButton({
    product,
}: {
    product: Product;
}) {
    const { addToCart } = useCart();

    return (
        <button
            disabled={product.stock < 1}
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#BD243D] px-5 py-4 font-bold text-white hover:bg-[#9f1d32] disabled:opacity-50"
        >
            <ShoppingCart size={20} />
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
    );
}