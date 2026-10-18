
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  ShoppingBag,
} from "lucide-react";
import { Suspense } from "react";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const products = await getProducts();

  const benefits = [
    {
      Icon: Truck,
      title: "Convenient Shopping",
      subtitle: "Shop from anywhere",
    },
    {
      Icon: ShieldCheck,
      title: "Secure-Ready Design",
      subtitle: "A safer shopping experience",
    },
    {
      Icon: Headphones,
      title: "Customer Support",
      subtitle: "We're here to help",
    },
  ];

  const categories = [
    { name: "All Products", href: "#products" },
    { name: "Electronics", href: "/?category=smartphones#products" },
    { name: "Fashion", href: "/?category=mens-shirts#products" },
    { name: "Beauty", href: "/?category=beauty#products" },
    { name: "Furniture", href: "/?category=furniture#products" },
    { name: "Groceries", href: "/?category=groceries#products" },
  ];

  return (
    <main className="min-h-screen bg-[#EAEDED] text-[#132B46]">
      {/* Compact sliding category bar */}
      <nav
        aria-label="Shop categories"
        className="border-b border-gray-200 bg-white"
      >
        <div className="mx-auto flex max-w-[1500px] gap-2 overflow-x-auto px-3 py-2 sm:gap-3 sm:px-5">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${index === 0
                ? "border-[#132B46] bg-[#132B46] text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-[#BD243D] hover:text-[#BD243D]"
                }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Small, responsive hero */}
      <section className="mx-auto max-w-[1500px] px-3 pt-3 sm:px-5">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#132B46] to-[#315B80] text-white">
          <div className="flex min-h-[190px] items-center justify-between gap-4 px-5 py-6 sm:min-h-[220px] sm:px-8 md:px-10">
            <div className="max-w-2xl">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-300 sm:text-xs">
                Welcome to SolapurMart.shop
              </p>

              <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
                Great products.
                <span className="block text-rose-300">
                  Everyday value.
                </span>
              </h1>

              <p className="mt-2 max-w-lg text-xs leading-5 text-gray-200 sm:mt-3 sm:text-sm sm:leading-6">
                Discover electronics, fashion, beauty and everyday essentials
                at SolapurMart.shop.
              </p>

              <Link
                href="#products"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#BD243D] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#9f1d32] sm:text-sm"
              >
                Shop Now
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mr-2 hidden shrink-0 items-center justify-center sm:flex md:mr-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 md:h-36 md:w-36">
                <ShoppingBag
                  className="h-12 w-12 text-rose-300 md:h-16 md:w-16"
                  strokeWidth={1.3}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact benefits */}
      <section className="mx-auto grid max-w-[1500px] grid-cols-3 gap-2 px-3 py-3 sm:gap-3 sm:px-5">
        {benefits.map(({ Icon, title, subtitle }) => (
          <div
            key={title}
            className="flex items-center gap-2 rounded-lg border border-gray-100 bg-white p-2.5 sm:gap-3 sm:p-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-50 text-[#BD243D] sm:h-10 sm:w-10">
              <Icon size={18} />
            </span>

            <div className="min-w-0">
              <h2 className="text-[10px] font-bold leading-4 sm:text-xs md:text-sm">
                {title}
              </h2>
              <p className="hidden text-xs text-gray-500 md:block">
                {subtitle}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Product section — preserve your existing filters */}
      <section
        id="products"
        className="mx-auto max-w-[1500px] scroll-mt-4 px-3 pb-8 pt-1 sm:px-5"
      >
        <div className="mb-3 flex items-center justify-between rounded-lg border border-gray-100 bg-white px-3 py-3 sm:px-4">
          <div>
            <h2 className="text-base font-bold sm:text-lg">
              Discover Products
            </h2>
            <p className="mt-0.5 text-[11px] text-gray-500 sm:text-xs">
              Find something you’ll love
            </p>
          </div>

          <Link
            href="#products"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#BD243D] hover:underline sm:text-sm"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="rounded-lg bg-white py-10 text-center text-sm text-gray-500">
              Loading products...
            </div>
          }
        >
          <ProductGrid products={products} />
        </Suspense>
      </section>
    </main>
  );
}
