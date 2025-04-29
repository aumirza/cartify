"use client";

import React from "react";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { QuantityControls } from "./QuantityControls";
import { WishlistButton } from "./WishlistButton";
import Link from "next/link";
import { CURRENCY_SYMBOL } from "@/contants/currency";

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
    <div className="w-full h-full group flex flex-col gap-2 shadow p-2 rounded-lg">
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-white p-3">
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
      </Link>

      <div className="flex-grow flex flex-col gap-2">
        <Link className="flex-grow" href={`/product/${product.id}`}>
          <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
        </Link>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">
              {`${CURRENCY_SYMBOL} ${product.price}`}
            </p>
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
              className="w-full bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 text-sm mt-1"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
