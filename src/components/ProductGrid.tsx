"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export default function ProductGrid({
    products,
}: {
    products: Product[];
}) {
    const params = useSearchParams();
    const [sort, setSort] = useState("featured");

    const query = (params.get("q") || "").toLowerCase();
    const category = params.get("category") || "";

    const categories = useMemo(
        () => [...new Set(products.map((p) => p.category))].sort(),
        [products]
    );

    const visibleProducts = useMemo(() => {
        const filtered = products.filter((product) => {
            const matchesSearch =
                product.title.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query);

            const matchesCategory =
                !category || product.category === category;

            return matchesSearch && matchesCategory;
        });

        return [...filtered].sort((a, b) => {
            if (sort === "price-low") return a.price - b.price;
            if (sort === "price-high") return b.price - a.price;
            if (sort === "rating") return b.rating - a.rating;
            return 0;
        });
    }, [products, query, category, sort]);

    return (
        <section id="products" className="scroll-mt-40">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#BD243D]">
                        Shop your favourites
                    </p>
                    <h2 className="text-3xl font-extrabold text-[#132B46] sm:text-4xl">
                        Trending Products
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        {visibleProducts.length} products found
                    </p>
                </div>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#BD243D]"
                    aria-label="Sort products"
                >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>

            <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
                <a
                    href="/#products"
                    className="shrink-0 rounded-full bg-[#132B46] px-4 py-2 text-sm font-semibold text-white"
                >
                    All Products
                </a>

                {categories.map((item) => (
                    <a
                        key={item}
                        href={`/?category=${encodeURIComponent(item)}#products`}
                        className={`shrink-0 rounded-full border px-4 py-2 text-sm capitalize transition hover:border-[#BD243D] hover:text-[#BD243D] ${category === item
                            ? "border-[#BD243D] text-[#BD243D]"
                            : "border-gray-200 text-gray-600"
                            }`}
                    >
                        {item.replaceAll("-", " ")}
                    </a>
                ))}
            </div>

            {visibleProducts.length === 0 ? (
                <div className="rounded-2xl bg-white py-20 text-center">
                    <p className="text-lg font-semibold text-[#132B46]">
                        No products found
                    </p>
                    <p className="mt-2 text-gray-500">
                        Try another search or category.
                    </p>
                    <a
                        href="/#products"
                        className="mt-4 inline-block font-semibold text-[#BD243D]"
                    >
                        View all products
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>



            )}
        </section>
    );
}