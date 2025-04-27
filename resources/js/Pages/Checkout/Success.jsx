import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

export default function CheckoutSuccess() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-green-500 text-7xl mb-6">
            <FaCheckCircle className="mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your order has been placed successfully. We've sent a confirmation email with your order details.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Information</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="text-gray-900 font-medium">#ECO-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date:</span>
              <span className="text-gray-900 font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Payment Method:</span>
              <span className="text-gray-900 font-medium">Credit Card</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping Method:</span>
              <span className="text-gray-900 font-medium">Standard Shipping</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/"
              className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-md inline-flex items-center justify-center transition"
            >
              Continue Shopping <FaArrowRight className="ml-2" />
            </Link>
            <Link
              href="/dashboard"
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-md inline-flex items-center justify-center transition"
            >
              View My Account
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}