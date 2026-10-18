import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ArrowLeft } from "lucide-react";
import { getProduct } from "@/lib/products";
import AddToCartButton from "../../components/AddToCartButton";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);

    return {
        title: product?.title ?? "Product Not Found",
        description: product?.description,
    };
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) notFound();

    const price =
        product.price * (1 - product.discountPercentage / 100);

    return (
        <main className="mx-auto max-w-7xl px-5 py-12">
            <Link
                href="/#products"
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#132B46]"
            >
                <ArrowLeft size={18} /> Back to products
            </Link>

            <div className="grid gap-10 md:grid-cols-2">
                <div className="relative min-h-80 overflow-hidden rounded-3xl bg-white md:min-h-120">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-8"
                    />
                </div>

                <div className="py-3">
                    <p className="mb-3 text-sm capitalize text-[#BD243D]">
                        {product.category.replaceAll("-", " ")}
                    </p>

                    <h1 className="text-3xl font-extrabold text-[#132B46] sm:text-4xl">
                        {product.title}
                    </h1>

                    <div className="mt-4 flex items-center gap-2 text-sm">
                        <Star
                            size={18}
                            fill="#F59E0B"
                            className="text-amber-500"
                        />
                        {product.rating} / 5
                        <span className="text-gray-400">
                            · {product.stock} available in sample data
                        </span>
                    </div>

                    <div className="mt-7 flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold text-[#BD243D]">
                            ${price.toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>

                    <p className="mt-7 leading-8 text-gray-600">
                        {product.description}
                    </p>

                    <div className="mt-8 max-w-xs">
                        <AddToCartButton product={product} />
                    </div>

                    <p className="mt-5 text-xs text-gray-500">
                        Demo product information and prices. Verify all details
                        before using real products for sale.
                    </p>
                </div>
            </div>
        </main>
    );
}