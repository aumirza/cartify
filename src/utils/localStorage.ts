import { CartItem } from "@/types/cart";

const CART_STORAGE_KEY = "cartify-cart";

export const loadCartFromStorage = () => {
  if (typeof window === "undefined") return { items: [] };
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : { items: [] };
};

export const saveCartToStorage = (cart: { items: CartItem[] }) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};
