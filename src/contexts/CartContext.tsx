"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "@/lib/localStorage";
import { IProduct } from "@/types/models";

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_TO_CART"; product: IProduct }
  | { type: "REMOVE_FROM_CART"; productId: IProduct["id"] }
  | { type: "INCREMENT_QUANTITY"; productId: IProduct["id"] }
  | { type: "DECREMENT_QUANTITY"; productId: IProduct["id"] }
  | { type: "CLEAR_CART" }
  | { type: "SYNC_STORAGE"; items: CartItem[] }
  | { type: "UPDATE_CART"; items: CartItem[] };

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
    case "CLEAR_CART":
      newState = {
        ...state,
        items: [],
      };
      break;
    case "SYNC_STORAGE":
      newState = {
        ...state,
        items: action.items,
      };
      break;

    case "UPDATE_CART":
      newState = {
        ...state,
        items: action.items,
      };
      break;
    default:
      newState = state;
  }

  // Save to localStorage after state changes
  saveToStorage("CART", newState || state);
  return newState || state;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    loadFromStorage("CART", { items: [] })
  );

  // Sync with localStorage when window is focused
  useEffect(() => {
    const handleFocus = () => {
      const storedCart = loadFromStorage("CART", { items: [] });
      if (JSON.stringify(storedCart) !== JSON.stringify(state)) {
        // Perform background merge
        dispatch({ type: "SYNC_STORAGE", ...storedCart });
        // syncCartWithServer(storedCart).then((mergedItems) => {
        //   dispatch({ type: "UPDATE_CART", items: mergedItems });
        // });
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
