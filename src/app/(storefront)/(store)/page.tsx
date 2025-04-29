// import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/services/api/fetchProducts";
import { fetchCategories } from "@/services/api/fetchCategories";
import { ProductsGrid } from "@/components/ProductsGrid";

export default async function Home() {
  const products = await fetchProducts(8);
  const categories = await fetchCategories();

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-8">
      <section className="w-full max-w-7xl">
        <h2 className="text-3xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category: string) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:opacity-90"
            >
              <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">{category}</h3>
              </div>
              {/* <Image
                src={category}
                alt={category}
                className="object-cover"
                fill
              /> */}
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full max-w-7xl">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <ProductsGrid products={products} />
      </section>
    </main>
  );
}
