import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { FaArrowLeft, FaLock } from 'react-icons/fa';

export default function CheckoutIndex({ cartItems, total }) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  
  const { data, setData, post, processing, errors } = useForm({
    // Shipping Information
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
    // Payment Information
    card_number: '',
    card_name: '',
    expiry_month: '',
    expiry_year: '',
    cvv: '',
    // Order notes
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('checkout.process'));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <MainLayout title="Checkout">
      <div className="container mx-auto px-4 py-8">
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${step >= 1 ? 'text-amber-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className={`w-12 h-1 mx-2 ${step >= 2 ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-amber-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
            <div className={`w-12 h-1 mx-2 ${step >= 3 ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-amber-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          value={data.first_name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                        {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          value={data.last_name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                        {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={data.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                      <div className="col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={data.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={data.state}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                          type="text"
                          id="postal_code"
                          name="postal_code"
                          value={data.postal_code}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                        {errors.postal_code && <p className="text-red-500 text-sm mt-1">{errors.postal_code}</p>}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select
                        id="country"
                        name="country"
                        value={data.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                      </select>
                      {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Link
                        href="/cart"
                        className="text-amber-600 hover:text-amber-700 flex items-center text-sm font-medium"
                      >
                        <FaArrowLeft className="mr-1" /> Back to Cart
                      </Link>
                      
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-md transition"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Information</h2>
                    
                    <div className="mb-6">
                      <label htmlFor="card_number" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          id="card_number"
                          name="card_number"
                          value={data.card_number}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                        <div className="absolute right-3 top-2.5 text-gray-400">
                          <FaLock />
                        </div>
                      </div>
                      {errors.card_number && <p className="text-red-500 text-sm mt-1">{errors.card_number}</p>}
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="card_name" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        id="card_name"
                        name="card_name"
                        value={data.card_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                      {errors.card_name && <p className="text-red-500 text-sm mt-1">{errors.card_name}</p>}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div>
                        <label htmlFor="expiry_month" className="block text-sm font-medium text-gray-700 mb-1">Expiry Month</label>
                        <select
                          id="expiry_month"
                          name="expiry_month"
                          value={data.expiry_month}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => {
                            const month = i + 1;
                            return (
                              <option key={month} value={month.toString().padStart(2, '0')}>
                                {month.toString().padStart(2, '0')}
                              </option>
                            );
                          })}
                        </select>
                        {errors.expiry_month && <p className="text-red-500 text-sm mt-1">{errors.expiry_month}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="expiry_year" className="block text-sm font-medium text-gray-700 mb-1">Expiry Year</label>
                        <select
                          id="expiry_year"
                          name="expiry_year"
                          value={data.expiry_year}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                        {errors.expiry_year && <p className="text-red-500 text-sm mt-1">{errors.expiry_year}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={data.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                          required
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={data.notes}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="text-amber-600 hover:text-amber-700 flex items-center text-sm font-medium"
                      >
                        <FaArrowLeft className="mr-1" /> Back to Shipping
                      </button>
                      
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-md transition"
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Review Order */}
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Review Your Order</h2>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="mb-1">{data.first_name} {data.last_name}</p>
                        <p className="mb-1">{data.address}</p>
                        <p className="mb-1">{data.city}, {data.state} {data.postal_code}</p>
                        <p className="mb-1">{data.country}</p>
                        <p className="mb-1">{data.email}</p>
                        <p>{data.phone}</p>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="mb-1">Card: **** **** **** {data.card_number.slice(-4)}</p>
                        <p>Expiry: {data.expiry_month}/{data.expiry_year}</p>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Items</h3>
                      <div className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <div key={item.id} className="py-4 flex items-center">
                            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-center object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-500">
                                {item.size && <span className="mr-2">Size: {item.size}</span>}
                                {item.color && <span>Color: {item.color}</span>}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">${item.price} x {item.quantity}</p>
                              <p className="text-sm font-medium text-amber-600">${item.itemTotal}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="text-amber-600 hover:text-amber-700 flex items-center text-sm font-medium"
                      >
                        <FaArrowLeft className="mr-1" /> Back to Payment
                      </button>
                      
                      <button
                        type="submit"
                        disabled={processing}
                        className={`bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-md transition flex items-center ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {processing ? 'Processing...' : 'Place Order'}
                        {!processing && <FaLock className="ml-2" />}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                  <span className="text-gray-800 font-medium">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800 font-medium">$0.00</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800 font-medium">${(total * 0.1).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-amber-600">${(total + (total * 0.1)).toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 text-right">Including VAT</p>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Secure Checkout</h3>
                <p className="text-xs text-gray-600">Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}