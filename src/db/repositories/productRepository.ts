// repositories/productRepository.ts
import db from "@/db/drizzle";
import {
  productInventory,
  products,
  productTypes,
} from "@/db/schemas/product.sql";
import { eq } from "drizzle-orm";

export const productRepository = {
  async findAll() {
    return db.select().from(products);
  },

  async findById(id: number) {
    return db.select().from(products).where(eq(products.id, id));
  },

  async create(data: {
    name: string;
    description?: string;
    price: string;
    thumbnailUrl?: string;
    stock?: number;
    isDigital: boolean;
  }) {
    const product = {
      ...data,
      type: data.isDigital ? productTypes.DIGITAL : productTypes.PHYSICAL,
    };
    const result = await db.insert(products).values(product).returning();
    return result[0];
  },

  async updateStock(productId: number, newStock: number) {
    await db
      .update(productInventory)
      .set({ stock: newStock })
      .where(eq(products.id, productId));
  },
};
