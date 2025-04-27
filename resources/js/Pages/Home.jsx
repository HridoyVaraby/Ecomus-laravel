import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { FaArrowRight } from 'react-icons/fa';

export default function Home({ featuredProducts, featuredCategories }) {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 h-[600px] flex items-center">
          <div className="container mx-auto px-4 z-10 relative">
            <div className="max-w-xl">
              <h1 className="text-5xl font-bold text-white mb-4">
                <span className="text-amber-500">Luxury</span> Redefined
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Discover our exclusive collection of premium products crafted for the discerning customer.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="/products" 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md transition flex items-center"
                >
                  Shop Now <FaArrowRight className="ml-2" />
                </Link>
                <Link 
                  href="/categories" 
                  className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-md transition"
                >
                  Explore Categories
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('/img/hero-luxury.jpg')] bg-cover bg-center hidden lg:block"></div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Our <span className="text-amber-600">Collections</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Browse through our carefully curated categories of luxury products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories?.map((category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-lg shadow-lg h-64"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <div className="w-10 h-1 bg-amber-500 mb-3"></div>
                  <p className="text-sm text-gray-200 mb-2">{category.description}</p>
                  <span className="text-amber-400 text-sm font-medium flex items-center">
                    Explore <FaArrowRight className="ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured <span className="text-amber-600">Products</span></h2>
              <p className="text-gray-600">Discover our most exclusive and sought-after items</p>
            </div>
            <Link 
              href="/products" 
              className="text-amber-600 hover:text-amber-700 font-medium flex items-center"
            >
              View All <FaArrowRight className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product) => (
              <div key={product.id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <Link href={`/products/${product.slug}`} className="block relative h-64 overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.is_new && (
                    <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                  {product.is_on_sale && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      SALE
                    </span>
                  )}
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {product.sale_price ? (
                        <>
                          <span className="text-lg font-bold text-amber-600">${product.sale_price}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-amber-600">${product.price}</span>
                      )}
                    </div>
                    <button 
                      className="text-gray-700 hover:text-amber-600 transition"
                      onClick={() => {
                        // Add to cart functionality
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Experience Banner */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Experience <span className="text-amber-500">Luxury</span> Like Never Before</h2>
              <p className="text-gray-400 mb-6">Our products are crafted with the finest materials and attention to detail, ensuring an unparalleled luxury experience.</p>
              <Link 
                href="/about" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md transition inline-flex items-center"
              >
                Our Story <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-amber-800 p-6 rounded-lg">
                <div className="text-amber-400 text-4xl mb-2">100%</div>
                <h3 className="text-xl font-semibold mb-1">Authentic</h3>
                <p className="text-gray-400 text-sm">All our products are 100% authentic and verified</p>
              </div>
              <div className="bg-amber-800 p-6 rounded-lg">
                <div className="text-amber-400 text-4xl mb-2">24/7</div>
                <h3 className="text-xl font-semibold mb-1">Support</h3>
                <p className="text-gray-400 text-sm">Our customer support team is available 24/7</p>
              </div>
              <div className="bg-amber-800 p-6 rounded-lg">
                <div className="text-amber-400 text-4xl mb-2">Free</div>
                <h3 className="text-xl font-semibold mb-1">Shipping</h3>
                <p className="text-gray-400 text-sm">Free shipping on all orders over $100</p>
              </div>
              <div className="bg-amber-800 p-6 rounded-lg">
                <div className="text-amber-400 text-4xl mb-2">Easy</div>
                <h3 className="text-xl font-semibold mb-1">Returns</h3>
                <p className="text-gray-400 text-sm">30-day easy return policy on all products</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}