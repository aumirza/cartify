import React from "react";
import { ProductCard } from "./ProductCard";

export function ProductsGrid({ products }: { products: IProduct[] }) {
  return (
    <div className="w-full @container">
      <div className="grid grid-cols-1 @lg:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 gap-5 @3xl:gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
