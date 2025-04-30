import db from "@/db/drizzle";
import { carts, cartItems } from "@/db/schemas/cart.sql";
import { CartItem } from "@/types/cart";
import { ICart } from "@/types/models";
import { eq, and } from "drizzle-orm";

// Only valid column names
type ICartColumn = keyof ICart;

export const cartRepository = {
  async getCartPlucked<const T extends ICartColumn[]>(
    userId: number,
    columns: T
  ): Promise<Pick<ICart, T[number]> | null> {
    const columnMap = Object.fromEntries(
      columns.map((col) => [col, true])
    ) as Record<T[number], true>;

    const result = await db.query.carts.findFirst({
      where: (carts, { eq }) => eq(carts.userId, userId),
      columns: columnMap as Record<T[number], true>,
    });

    return result as unknown as Pick<ICart, T[number]> | null;
  },

  async getOrCreateCart(userId: number) {
    let cart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
    });

    if (!cart) {
      const result = await db.insert(carts).values({ userId }).returning();
      cart = result[0];
    }

    return cart;
  },

  async addItemToCart(userId: number, productId: number, quantity = 1) {
    const cart = await this.getOrCreateCart(userId);

    const existing = await db.query.cartItems.findFirst({
      where: and(
        eq(cartItems.cartId, cart.id),
        eq(cartItems.productId, productId)
      ),
    });

    if (existing) {
      await db
        .update(cartItems)
        .set({ quantity: existing.quantity + quantity })
        .where(eq(cartItems.id, existing.id));
    } else {
      await db.insert(cartItems).values({
        cartId: cart.id,
        productId,
        quantity,
      });
    }
  },

  async removeItem(userId: number, productId: number) {
    const cart = await this.getOrCreateCart(userId);
    await db
      .delete(cartItems)
      .where(
        and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId))
      );
  },

  async clearCart(userId: number) {
    const cart = await this.getOrCreateCart(userId);
    await db.delete(cartItems).where(eq(cartItems.cartId, cart.id));
  },

  async updateOrCreateCart(userId: number, cartItems: CartItem[]) {
    const existingCart = await this.getOrCreateCart(userId);

    console.log(cartItems);
    // cartItems.forEach
    // set cart and items

    // return await db.update(carts).set(cart).where(eq(carts.id, existingCart.id));
    return existingCart;
  },

  async getFullCart(cartId: number) {
    const cart = await db.query.cartItems.findFirst({
      where: eq(cartItems.cartId, cartId),
      with: {
        cart: {
          with: {
            product: true,
          },
        },
      },
    });
    return cart?.cart;
  },
};
