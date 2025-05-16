import db from "@/db/drizzle";
import {
  IProductTypes,
  productInventory,
  products,
  productTypes,
} from "@/db/schemas/product.sql";
import { eq } from "drizzle-orm";

export const productRepository = {
  async findAll() {
    return db.select().from(products);
  },

  async getProductsPaginated(
    page: number = 1,
    pageSize: number = 8,
    searchQuery?: string,
    productType?: IProductTypes
  ) {
    const offset = (page - 1) * pageSize;
    const query = db.select().from(products).limit(pageSize).offset(offset);

    if (searchQuery) {
      query.where(
        eq(products.name, `%${searchQuery}%`) ||
          eq(products.description, `%${searchQuery}%`)
      );
    }

    if (productType) {
      query.where(eq(products.type, productType));
    }

    return query;
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
