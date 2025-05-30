"use client";
import React, { useMemo } from "react";
import { useCart } from "@/hooks/useCart";
import { QuantityControls } from "@/components/QuantityControls";
import Image from "next/image";
import { CheckoutButton } from "./CheckoutButton";
import { CURRENCY_SYMBOL } from "@/contants/currency";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCart();

  const total = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="bg-destructive text-destructive-foreground px-4 py-2 rounded hover:bg-destructive/90"
        >
          Empty Cart
        </button>
      </div>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 relative">
                <Image
                  src={item.product.image}
                  alt={item.product.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold">{item.product.title}</h3>
                <p className="text-gray-600">
                  {`${CURRENCY_SYMBOL} ${item.product.price}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <QuantityControls
                onRemove={() => removeFromCart(item.product.id)}
                quantity={item.quantity}
                onIncrement={() => incrementQuantity(item.product.id)}
                onDecrement={() => decrementQuantity(item.product.id)}
              />
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="bg-destructive text-destructive-foreground px-4 py-2 rounded hover:bg-destructive/90"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right space-y-4">
        <p className="text-xl font-bold">
          {`Total: ${CURRENCY_SYMBOL} ${total.toFixed(2)}`}
        </p>
        <CheckoutButton total={total} />
      </div>
    </div>
  );
}
