import { fetchProducts } from "@/services/api/fetchProducts";
import { ProductsWithFilter } from "@/components/ProductsWithFilter";

export default async function ProductsPage() {
  const products = await fetchProducts();
  return (
    <div className="flex flex-col gap-10 justify-center items-center bg-background">
      <div className="text-3xl font-semibold pb-2 border-b-2 border-primary">
        All products
      </div>
      <ProductsWithFilter products={products} />
    </div>
  );
}
