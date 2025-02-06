"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { loadCartFromStorage, saveCartToStorage } from "@/utils/localStorage";

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_TO_CART"; product: IProduct }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "INCREMENT_QUANTITY"; productId: string }
  | { type: "DECREMENT_QUANTITY"; productId: string };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;

  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id
      );
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { product: action.product, quantity: 1 }],
        };
      }
      break;
    case "REMOVE_FROM_CART":
      newState = {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.productId
        ),
      };
      break;
    case "INCREMENT_QUANTITY":
      newState = {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
      break;
    case "DECREMENT_QUANTITY":
      newState = {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
      break;
    default:
      newState = state;
  }

  // Save to localStorage after state changes
  saveCartToStorage(newState || state);
  return newState || state;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, loadCartFromStorage());

  // Sync with localStorage when window is focused
  useEffect(() => {
    const handleFocus = () => {
      const storedCart = loadCartFromStorage();
      if (JSON.stringify(storedCart) !== JSON.stringify(state)) {
        dispatch({ type: "SYNC_STORAGE", ...storedCart });
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
