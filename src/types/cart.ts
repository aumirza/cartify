export interface CartItem {
  product: IProduct;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD_TO_CART"; product: IProduct }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "INCREMENT_QUANTITY"; productId: string }
  | { type: "DECREMENT_QUANTITY"; productId: string }
  | ({ type: "SYNC_STORAGE" } & CartState);
