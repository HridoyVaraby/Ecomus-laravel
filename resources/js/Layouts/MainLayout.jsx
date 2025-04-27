import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaShoppingCart, FaUser, FaSearch, FaHeart } from 'react-icons/fa';

export default function MainLayout({ children, title = null }) {
  const { auth, cart } = usePage().props;
  const cartItemCount = cart ? Object.keys(cart).length : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-amber-700">ECOMUS</Link>
            
            {/* Search */}
            <div className="hidden md:flex items-center w-1/3 relative">
              <input 
                type="text" 
                placeholder="Search luxury products..." 
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <FaSearch className="absolute right-3 text-gray-400" />
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/categories" className="text-gray-700 hover:text-amber-600 transition">Categories</Link>
              <Link href="/products" className="text-gray-700 hover:text-amber-600 transition">Products</Link>
              <Link href="/about" className="text-gray-700 hover:text-amber-600 transition">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition">Contact</Link>
            </nav>
            
            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Link href="/wishlist" className="text-gray-700 hover:text-amber-600 transition">
                <FaHeart />
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-amber-600 transition relative">
                <FaShoppingCart />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {auth.user ? (
                <Link href="/dashboard" className="text-gray-700 hover:text-amber-600 transition">
                  <FaUser />
                </Link>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-amber-600 transition">
                  <FaUser />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Page Title */}
      {title && (
        <div className="bg-amber-700 text-white py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-amber-500 mb-4">ECOMUS</h3>
              <p className="text-gray-400">Luxury products for the discerning customer. Experience elegance and quality.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-amber-500 mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-gray-400 hover:text-amber-500 transition">All Products</Link></li>
                <li><Link href="/categories" className="text-gray-400 hover:text-amber-500 transition">Categories</Link></li>
                <li><Link href="/new-arrivals" className="text-gray-400 hover:text-amber-500 transition">New Arrivals</Link></li>
                <li><Link href="/sale" className="text-gray-400 hover:text-amber-500 transition">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-amber-500 mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-400 hover:text-amber-500 transition">Contact Us</Link></li>
                <li><Link href="/shipping" className="text-gray-400 hover:text-amber-500 transition">Shipping & Returns</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-amber-500 transition">FAQ</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-amber-500 transition">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-amber-500 mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to receive updates on new arrivals and special promotions.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-r-md transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ECOMUS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}