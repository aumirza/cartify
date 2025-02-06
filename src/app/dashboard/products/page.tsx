import { fetchProducts } from "@/api/fetchProducts";
import { DataTable } from "@/components/products/DataTable";
import { columns } from "@/components/products/columns";

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">Products</h2>
      <DataTable
        columns={columns}
        data={products}
        searchableColumns={[
          {
            id: "title",
            title: "Title",
          },
          {
            id: "category",
            title: "Category",
          },
        ]}
      />
    </div>
  );
}
