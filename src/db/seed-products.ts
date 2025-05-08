import "dotenv/config";
import { type NeonHttpDatabase } from "drizzle-orm/neon-http";
import {
  products,
  productFiles,
  productInventory,
  productTypes,
} from "./schemas/product.sql";
import { faker } from "@faker-js/faker";

export async function seedProducts(db: NeonHttpDatabase) {
  // Create 10 sample products
  for (let i = 0; i < 10; i++) {
    // const isDigital = Math.random() > 0.5;
    const isDigital = true;
    const productType = isDigital
      ? productTypes.DIGITAL
      : productTypes.PHYSICAL;
    const price = faker.commerce.price({ min: 10, max: 1000, dec: 2 });

    // Insert product
    const [product] = await db
      .insert(products)
      .values({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        type: productType,
        price: price,
        thumbnailUrl: faker.image.urlLoremFlickr({ category: "product" }),
        isPublished: true,
      })
      .returning();

    if (isDigital) {
      // Add digital product file
      await db.insert(productFiles).values({
        productId: product.id,
        fileUrl: faker.internet.url(),
      });
    } else {
      // Add physical product inventory
      await db.insert(productInventory).values({
        productId: product.id,
        stock: faker.number.int({ min: 0, max: 100 }),
      });
    }
  }

  console.log("Successfully seeded products!");
}
