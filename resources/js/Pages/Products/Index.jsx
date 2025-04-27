import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { FaFilter, FaTimes, FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function ProductsIndex({ products, categories, filters }) {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: filters.min_price || '',
    max: filters.max_price || ''
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange({
      ...priceRange,
      [name]: value
    });
  };

  const clearFilters = () => {
    window.location.href = '/products';
  };

  const applyFilters = () => {
    let url = '/products?';
    const params = new URLSearchParams();
    
    if (filters.category) {
      params.append('category', filters.category);
    }
    
    if (priceRange.min) {
      params.append('min_price', priceRange.min);
    }
    
    if (priceRange.max) {
      params.append('max_price', priceRange.max);
    }
    
    if (filters.new) {
      params.append('new', 'true');
    }
    
    if (filters.sale) {
      params.append('sale', 'true');
    }
    
    if (filters.sort) {
      params.append('sort', filters.sort);
      params.append('order', filters.order || 'desc');
    }
    
    window.location.href = url + params.toString();
  };

  const getSortUrl = (field) => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.get('sort') === field && params.get('order') === 'asc') {
      params.set('order', 'desc');
    } else if (params.get('sort') === field && params.get('order') === 'desc') {
      params.delete('sort');
      params.delete('order');
    } else {
      params.set('sort', field);
      params.set('order', 'asc');
    }
    
    return `/products?${params.toString()}`;
  };

  const getSortIcon = (field) => {
    if (filters.sort === field) {
      return filters.order === 'asc' ? <FaArrowUp className="ml-1" /> : <FaArrowDown className="ml-1" />;
    }
    return null;
  };

  return (
    <MainLayout title="Products">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={toggleFilters}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition"
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`w-full md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
                >
                  <FaTimes className="mr-1" /> Clear All
                </button>
              </div>

              {/* Categories Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        value={category.slug}
                        checked={filters.category === category.slug}
                        onChange={() => {
                          window.location.href = `/products?category=${category.slug}`;
                        }}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="min" className="sr-only">Min Price</label>
                    <input
                      type="number"
                      id="min"
                      name="min"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={handlePriceChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="max" className="sr-only">Max Price</label>
                    <input
                      type="number"
                      id="max"
                      name="max"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={handlePriceChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Product Status Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Product Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="new-arrivals"
                      name="new"
                      checked={filters.new === 'true'}
                      onChange={() => {
                        const params = new URLSearchParams(window.location.search);
                        if (params.get('new') === 'true') {
                          params.delete('new');
                        } else {
                          params.set('new', 'true');
                        }
                        window.location.href = `/products?${params.toString()}`;
                      }}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                    />
                    <label htmlFor="new-arrivals" className="ml-2 text-sm text-gray-700">
                      New Arrivals
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="on-sale"
                      name="sale"
                      checked={filters.sale === 'true'}
                      onChange={() => {
                        const params = new URLSearchParams(window.location.search);
                        if (params.get('sale') === 'true') {
                          params.delete('sale');
                        } else {
                          params.set('sale', 'true');
                        }
                        window.location.href = `/products?${params.toString()}`;
                      }}
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500"
                    />
                    <label htmlFor="on-sale" className="ml-2 text-sm text-gray-700">
                      On Sale
                    </label>
                  </div>
                </div>
              </div>

              {/* Apply Filters Button - Mobile */}
              <div className="md:hidden">
                <button
                  onClick={applyFilters}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {products.data.length} of {products.total} products
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <div className="flex space-x-4">
                  <Link
                    href={getSortUrl('name')}
                    className={`text-sm flex items-center ${filters.sort === 'name' ? 'text-amber-600 font-medium' : 'text-gray-700'}`}
                  >
                    Name {getSortIcon('name')}
                  </Link>
                  <Link
                    href={getSortUrl('price')}
                    className={`text-sm flex items-center ${filters.sort === 'price' ? 'text-amber-600 font-medium' : 'text-gray-700'}`}
                  >
                    Price {getSortIcon('price')}
                  </Link>
                  <Link
                    href={getSortUrl('created_at')}
                    className={`text-sm flex items-center ${filters.sort === 'created_at' || !filters.sort ? 'text-amber-600 font-medium' : 'text-gray-700'}`}
                  >
                    Newest {getSortIcon('created_at')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Products */}
            {products.data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.data.map((product) => (
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
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
                <button
                  onClick={clearFilters}
                  className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-md transition"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {products.links && products.links.length > 3 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-1">
                  {products.links.map((link, index) => {
                    // Skip the "&laquo; Previous" and "Next &raquo;" links
                    if (index === 0 || index === products.links.length - 1) {
                      return null;
                    }
                    
                    return (
                      <Link
                        key={index}
                        href={link.url || '#'}
                        className={`px-4 py-2 rounded-md ${link.active ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    );
                  })}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}