import { ProductsWithFilter } from "@/components/ProductsWithFilter";
import { productRepository } from "@/db/repositories/productRepository";

export default async function ProductsPage() {
  const products = await productRepository.findAll();
  return (
    <div className="flex flex-col gap-10 justify-center items-center bg-background">
      <div className="text-3xl font-semibold pb-2 border-b-2 border-primary">
        All products
      </div>
      <ProductsWithFilter products={products} />
    </div>
  );
}
