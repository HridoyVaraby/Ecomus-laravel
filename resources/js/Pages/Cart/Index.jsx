import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function CartIndex({ cartItems, total }) {
  const { delete: destroy } = useForm();
  const { data, setData, post, processing } = useForm({
    product_id: '',
    quantity: 1,
  });

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setData({
      product_id: productId,
      quantity: newQuantity,
    });
    
    post(route('cart.update'));
  };

  const handleRemoveItem = (productId) => {
    destroy(route('cart.remove', { product_id: productId }));
  };

  const handleClearCart = () => {
    destroy(route('cart.clear'));
  };

  return (
    <MainLayout title="Shopping Cart">
      <div className="container mx-auto px-4 py-8">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Your Cart ({cartItems.length})</h2>
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-6 flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden mr-6">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              <Link href={`/products/${item.slug}`} className="hover:text-amber-600">
                                {item.name}
                              </Link>
                            </h3>
                            <div className="mt-1 text-sm text-gray-500">
                              {item.size && <span className="mr-4">Size: {item.size}</span>}
                              {item.color && (
                                <span className="flex items-center">
                                  Color: 
                                  <span 
                                    className="ml-1 w-4 h-4 rounded-full inline-block border border-gray-300" 
                                    style={{ backgroundColor: item.color }}
                                  ></span>
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm font-medium text-amber-600">${item.price}</p>
                          </div>
                          
                          <div className="flex items-center">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="text-gray-500 focus:outline-none focus:text-gray-600 p-1"
                            >
                              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </button>
                            <span className="text-gray-700 mx-2">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="text-gray-500 focus:outline-none focus:text-gray-600 p-1"
                            >
                              <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <p className="text-sm text-gray-600">
                            Subtotal: <span className="font-medium">${item.itemTotal}</span>
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                          >
                            <FaTrash className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Link
                  href="/products"
                  className="text-amber-600 hover:text-amber-700 flex items-center text-sm font-medium"
                >
                  <FaArrowLeft className="mr-1" /> Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-medium">${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-800 font-medium">Calculated at checkout</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-800 font-medium">Calculated at checkout</span>
                  </div>
                  
                  <div className="border-t pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-lg font-bold text-amber-600">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link
                    href="/checkout"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-md flex items-center justify-center transition"
                  >
                    Proceed to Checkout <FaArrowRight className="ml-2" />
                  </Link>
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>We accept</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-amber-600 text-5xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link
              href="/products"
              className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-md inline-flex items-center transition"
            >
              Start Shopping <FaArrowRight className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}