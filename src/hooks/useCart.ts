"use client";

import { useCartContext } from "@/contexts/CartContext";
import { IProduct } from "@/types/models";

export const useCart = () => {
  const { state, dispatch } = useCartContext();

  const addToCart = (product: IProduct) => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  const removeFromCart = (productId: IProduct["id"]) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  };

  const incrementQuantity = (productId: IProduct["id"]) => {
    dispatch({ type: "INCREMENT_QUANTITY", productId });
  };

  const decrementQuantity = (productId: IProduct["id"]) => {
    dispatch({ type: "DECREMENT_QUANTITY", productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const isInCart = (productId: IProduct["id"]) => {
    return state.items.some((item) => item.product.id === productId);
  };

  return {
    cart: state.items,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    isInCart,
  };
};
