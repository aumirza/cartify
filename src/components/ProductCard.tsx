"use client";

import React from "react";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { QuantityControls } from "./QuantityControls";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product }: { product: IProduct }) {
  const {
    addToCart,
    removeFromCart,
    isInCart,
    incrementQuantity,
    decrementQuantity,
    cart,
  } = useCart();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (!isInCart(product.id)) {
      addToCart(product);
    }
  };

  return (
    <div className="w-full group flex flex-col gap-2">
      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 p-3">
        <WishlistButton
          productId={product.id}
          className="absolute top-4 right-4 z-10"
        />
        <Image
          src={product.image}
          alt={product.title}
          className="object-contain"
          fill
        />
      </div>

      <div className="flex-grow flex flex-col gap-1">
        <h3 className="flex-grow font-medium text-sm line-clamp-2">
          {product.title}
        </h3>
        <div className="">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">${product.price}</p>
            <div className="flex gap-0.5 items-center">
              <StarIcon className="fill-yellow-500 text-yellow-500 !size-4" />
              <span className="text-sm text-muted-foreground">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>

          {isInCart(product.id) ? (
            <QuantityControls
              onRemove={() => removeFromCart(product.id)}
              quantity={quantity}
              onIncrement={() => incrementQuantity(product.id)}
              onDecrement={() => decrementQuantity(product.id)}
              showTotal
              price={product.price}
            />
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 text-sm mt-1"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
