import {
  cartItems,
  carts,
  orderItems,
  orders,
  products,
  users,
} from "@/db/schemas";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

// 🧑‍💻 User Types
export type IUser = InferSelectModel<typeof users>;
export type INewUser = InferInsertModel<typeof users>;

// 📦 Product Types
export type IProduct = InferSelectModel<typeof products>;
export type INewProduct = InferInsertModel<typeof products>;

// 🧾 Order Types
export type IOrder = InferSelectModel<typeof orders>;
export type INewOrder = InferInsertModel<typeof orders>;

// 🧾 OrderItem Types
export type IOrderItem = InferSelectModel<typeof orderItems>;
export type INewOrderItem = InferInsertModel<typeof orderItems>;

// 🛒 Cart Types
export type ICart = InferSelectModel<typeof carts>;
export type INewCart = InferInsertModel<typeof carts>;

// 🛍️ CartItem Types
export type ICartItem = InferSelectModel<typeof cartItems>;
export type ICartItemWithProduct = ICartItem & { product: IProduct };
export type INewCartItem = InferInsertModel<typeof cartItems>;
