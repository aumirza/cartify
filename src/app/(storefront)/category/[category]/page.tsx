import { ProductsGrid } from "@/components/ProductsGrid";
import { fetchProductsByCategory } from "@/api/fetchProducts";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const products = await fetchProductsByCategory(params.category);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {params.category.replace(/-/g, " ")}
      </h1>
      <ProductsGrid products={products} />
    </main>
  );
}
