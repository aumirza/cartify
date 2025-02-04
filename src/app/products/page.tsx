import { ProductsWithFilter } from "@/components/ProductsWithFilter";

export default async function ProductsPage() {
  let products: IProduct[] = [];
  try {
    console.log("fetching data");
    const res = await fetch("https://fakestoreapi.com/products");
    const raw = (await res.json()) as [];
    products = raw.map((p: Partial<IProduct>) => ({
      ...p,
      rating: {
        rate: Math.round(Math.random() * 5),
        count: Math.floor(Math.random() * 1000),
      },
    })) as IProduct[];
  } catch (error) {
    console.error(error);
  }
  return (
    <div className="flex flex-col gap-10 justify-center items-center bg-background">
      <div className="text-3xl font-semibold pb-2 border-b-2 border-primary">
        All products
      </div>
      <ProductsWithFilter products={products} />
    </div>
  );
}
