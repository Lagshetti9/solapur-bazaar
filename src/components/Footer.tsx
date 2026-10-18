import Link from "next/link";
import { Store, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="mt-20 bg-[#132B46] text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <span className="rounded-lg bg-[#BD243D] p-2">
                            <Store size={23} />
                        </span>
                        <span className="text-2xl font-extrabold">
                            Solapur<span className="text-rose-400">Mart</span>
                        </span>
                    </Link>

                    <p className="mt-4 max-w-xs text-sm leading-7 text-gray-300">
                        A smarter way to discover products and enjoy online shopping.
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 font-bold">Quick Links</h3>
                    <div className="space-y-3 text-sm text-gray-300">
                        <Link className="block hover:text-white" href="/">
                            Home
                        </Link>
                        <Link className="block hover:text-white" href="/#products">
                            Products
                        </Link>
                        <Link className="block hover:text-white" href="/cart">
                            Shopping Cart
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="mb-4 font-bold">Customer Support</h3>
                    <div className="space-y-3 text-sm text-gray-300">
                        <p>Contact Us</p>
                        <p>Shipping Information</p>
                        <p>Returns and Refunds</p>
                        <p>Privacy Policy</p>
                    </div>
                </div>

                <div>
                    <h3 className="mb-4 font-bold">Contact</h3>
                    <div className="space-y-4 text-sm text-gray-300">
                        <p className="flex items-start gap-3">
                            <MapPin size={18} className="shrink-0" />
                            Solapur, Maharashtra, India
                        </p>
                        <p className="flex items-center gap-3">
                            <Mail size={18} />
                            support@solapurmart.shop
                        </p>
                        <p className="flex items-center gap-3">
                            <Phone size={18} />
                            Contact details coming soon
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-gray-300">
                © {new Date().getFullYear()} SolapurMart.shop. All rights reserved.
                <p className="mt-1">Demo storefront using sample product data.</p>
            </div>
        </footer>
    );
}