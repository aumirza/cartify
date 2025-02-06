"use client";

import { useCartContext } from "@/context/CartContext";

export const useCart = () => {
  const { state, dispatch } = useCartContext();

  const addToCart = (product: IProduct) => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  };

  const incrementQuantity = (productId: string) => {
    dispatch({ type: "INCREMENT_QUANTITY", productId });
  };

  const decrementQuantity = (productId: string) => {
    dispatch({ type: "DECREMENT_QUANTITY", productId });
  };

  const isInCart = (productId: string) => {
    return state.items.some((item) => item.product.id === productId);
  };

  return {
    cart: state.items,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    isInCart,
  };
};
