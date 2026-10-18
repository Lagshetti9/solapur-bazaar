import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-5 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-[#132B46]">
        Product not found
      </h1>
      <p className="mt-4 text-gray-500">
        Sorry, this product could not be found.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-[#BD243D] px-5 py-3 font-bold text-white"
      >
        Return Home
      </Link>
    </main>
  );
}