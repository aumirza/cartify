"use client";

import React from "react";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

export function CartButton() {
  const { cart } = useCart();

  return (
    <Link href="/cart">
      <div className="flex items-center  relative  rounded-full size-8">
        <ShoppingCartIcon className="w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cart.length}
          </span>
        )}
      </div>
    </Link>
  );
}
