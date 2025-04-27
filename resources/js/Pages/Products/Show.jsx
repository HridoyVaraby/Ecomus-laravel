import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { FaArrowLeft, FaHeart, FaShoppingCart, FaCheck } from 'react-icons/fa';

export default function ProductShow({ product, relatedProducts }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    product_id: product.id,
    quantity: 1,
    size: selectedSize,
    color: selectedColor,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('cart.add'), {
      onSuccess: () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
      },
    });
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setData('quantity', newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setData('quantity', newQuantity);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setData('size', size);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setData('color', color);
  };

  return (
    <MainLayout title={product.name}>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-amber-600">Categories</Link>
          <span className="mx-2">/</span>
          <Link href={`/categories/${product.category.slug}`} className="hover:text-amber-600">{product.category.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-96">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`cursor-pointer border-2 rounded-md overflow-hidden h-20 ${selectedImage === image ? 'border-amber-500' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - Image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-4">Category: {product.category.name}</span>
              {product.is_new && (
                <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded mr-2">NEW</span>
              )}
              {product.is_on_sale && (
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">SALE</span>
              )}
            </div>

            <div className="mb-6">
              {product.sale_price ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-amber-600 mr-3">${product.sale_price}</span>
                  <span className="text-xl text-gray-500 line-through">${product.price}</span>
                  <span className="ml-3 bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                    {product.discount_percentage}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-amber-600">${product.price}</span>
              )}
            </div>

            <div className="prose prose-amber mb-6">
              <p>{product.description}</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`px-4 py-2 border ${selectedSize === size ? 'border-amber-600 bg-amber-50 text-amber-600' : 'border-gray-300 text-gray-700'} rounded-md focus:outline-none`}
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-amber-600' : 'border-transparent'} focus:outline-none`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(color)}
                      >
                        {selectedColor === color && (
                          <FaCheck className="text-white mx-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    type="button" 
                    className="w-10 h-10 bg-gray-200 rounded-l-md flex items-center justify-center hover:bg-gray-300 focus:outline-none"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    className="w-16 h-10 border-t border-b border-gray-300 text-center focus:outline-none"
                    value={quantity}
                    readOnly
                  />
                  <button 
                    type="button" 
                    className="w-10 h-10 bg-gray-200 rounded-r-md flex items-center justify-center hover:bg-gray-300 focus:outline-none"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? (
                    <span className="flex items-center">
                      <FaCheck className="mr-1" /> In Stock ({product.stock} available)
                    </span>
                  ) : (
                    'Out of Stock'
                  )}
                </p>
              </div>

              {/* Add to Cart Button */}
              <div className="flex space-x-4 mb-6">
                <button
                  type="submit"
                  disabled={processing || product.stock <= 0}
                  className={`flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-md flex items-center justify-center transition ${(processing || product.stock <= 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {processing ? (
                    'Adding...'
                  ) : addedToCart ? (
                    <>
                      <FaCheck className="mr-2" /> Added to Cart
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="mr-2" /> Add to Cart
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
                >
                  <FaHeart className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </form>

            {/* Product Meta */}
            <div className="border-t border-gray-200 pt-6">
              <div className="text-sm text-gray-600">
                <p><span className="font-medium">SKU:</span> {product.id}</p>
                <p><span className="font-medium">Category:</span> {product.category.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                  <Link href={`/products/${relatedProduct.slug}`} className="block relative h-64 overflow-hidden">
                    <img 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {relatedProduct.is_new && (
                      <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                        NEW
                      </span>
                    )}
                    {relatedProduct.is_on_sale && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        SALE
                      </span>
                    )}
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      <Link href={`/products/${relatedProduct.slug}`}>{relatedProduct.name}</Link>
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{relatedProduct.category.name}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {relatedProduct.sale_price ? (
                          <>
                            <span className="text-lg font-bold text-amber-600">${relatedProduct.sale_price}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">${relatedProduct.price}</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-amber-600">${relatedProduct.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}