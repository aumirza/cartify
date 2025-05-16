import { DataTable } from "@/components/products/DataTable";
import { columns } from "@/components/products/columns";
import { Button } from "@/components/ui/button";
import { productRepository } from "@/db/repositories/productRepository";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await productRepository.findAll();

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button variant="secondary">
          <Link href="/dashboard/products/add">Add a New Product</Link>
          <PlusCircleIcon />
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={products}
        searchableColumns={[
          {
            id: "name",
            title: "Name",
          },
        ]}
      />
    </div>
  );
}
