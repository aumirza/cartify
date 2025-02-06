"use client";
import React, { useState } from "react";
import { FilterControls } from "./FilterControls";
import { ProductsGrid } from "./ProductsGrid";

export function ProductsWithFilter({
  products: aProducts,
}: {
  products: IProduct[];
}) {
  const [products, setProducts] = useState<IProduct[]>(aProducts);

  return (
    <div className="w-full flex flex-col sm:flex-row gap-5">
      <div className="flex flex-col w-full sm:w-1/2 md:w-1/4">
        <FilterControls setProducts={setProducts} products={aProducts} />
      </div>
      <ProductsGrid products={products} />
    </div>
  );
}
