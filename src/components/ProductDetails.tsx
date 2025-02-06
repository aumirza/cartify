"use client";

import Image from "next/image";
import { StarIcon, ShoppingCart, Tag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { QuantityControls } from "./QuantityControls";
import { WishlistButton } from "./WishlistButton";

export function ProductDetails({ product }: { product: IProduct }) {
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
    <div className="grid grid-cols-1 gap-5 md:grid-cols-5 p-5">
      <div className="md:col-span-2">
        <div className="relative aspect-square max-w-sm bg-secondary dark:bg-white rounded-lg p-4">
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
      </div>
      <div className="flex flex-col gap-6 md:col-span-3">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            <div className="flex items-center gap-1 bg-background px-2 py-1 rounded">
              <StarIcon className="fill-warning text-warning h-4 w-4" />
              <span className="text-sm">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
        </div>

        <div className="prose prose-sm">
          <p>{product.description}</p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Tag className="h-4 w-4" />
          <span className="capitalize">{product.category}</span>
        </div>

        <div className="mt-auto pt-6 border-t">
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
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
