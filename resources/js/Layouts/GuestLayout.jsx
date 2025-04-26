import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <nav className="bg-white border-b border-gold-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gold-800" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:flex sm:ml-10 sm:items-center">
                                <Link
                                    href="/shop"
                                    className="text-gray-700 hover:text-gold-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Shop
                                </Link>
                                <Link
                                    href="/categories"
                                    className="text-gray-700 hover:text-gold-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Categories
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-gray-700 hover:text-gold-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    About
                                </Link>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <Link
                                href="/login"
                                className="text-gray-700 hover:text-gold-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>

            <footer className="bg-white border-t border-gold-200">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">About Ecomus</h3>
                            <p className="mt-4 text-base text-gray-600">
                                Luxury clothing brand committed to sustainable fashion and timeless elegance.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Shop</h3>
                            <ul className="mt-4 space-y-4">
                                <li>
                                    <Link href="/new-arrivals" className="text-base text-gray-600 hover:text-gold-600">
                                        New Arrivals
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/bestsellers" className="text-base text-gray-600 hover:text-gold-600">
                                        Bestsellers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Support</h3>
                            <ul className="mt-4 space-y-4">
                                <li>
                                    <Link href="/contact" className="text-base text-gray-600 hover:text-gold-600">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/shipping" className="text-base text-gray-600 hover:text-gold-600">
                                        Shipping
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Legal</h3>
                            <ul className="mt-4 space-y-4">
                                <li>
                                    <Link href="/privacy" className="text-base text-gray-600 hover:text-gold-600">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-base text-gray-600 hover:text-gold-600">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gold-200 pt-8">
                        <p className="text-base text-gray-500 text-center">
                            © {new Date().getFullYear()} Ecomus. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
