"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { loadFromStorage, saveToStorage } from "@/lib/localStorage";

interface WishlistContextType {
  wishlist: IProductId[];
  isInWishlist: (productId: IProductId) => boolean;
  toggleWishlist: (productId: IProductId) => void;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<IProductId[]>([]);

  useEffect(() => {
    const stored = loadFromStorage("WISHLIST", []);
    setWishlist(stored);
  }, []);

  const addToWishlist = (productId: IProductId) => {
    const updated = [...wishlist, productId];
    setWishlist(updated);
    saveToStorage("WISHLIST", updated);
  };

  const removeFromWishlist = (productId: IProductId) => {
    const updated = wishlist.filter((id) => id !== productId);
    setWishlist(updated);
    saveToStorage("WISHLIST", updated);
  };

  const isInWishlist = (productId: IProductId) => wishlist.includes(productId);

  const toggleWishlist = (productId: IProductId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, isInWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
