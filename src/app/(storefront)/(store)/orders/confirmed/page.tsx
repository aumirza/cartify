import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed and will
            be shipped soon.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-900">Order Details</h2>
            <div className="text-sm text-gray-600">
              <p>Order #: 123456789</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
              <p>Email: john.doe@example.com</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              Shipping Address
            </h3>
            <p className="text-sm text-gray-600">
              John Doe
              <br />
              123 Street Name
              <br />
              City, State 12345
              <br />
              Country
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            We'll send you shipping confirmation when your order is on the way.
          </p>

          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
