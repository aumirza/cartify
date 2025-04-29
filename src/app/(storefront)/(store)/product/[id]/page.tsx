import { fetchProduct } from "@/services/api/fetchProducts";
import { ProductDetails } from "@/components/ProductDetails";
import { Breadcrumb } from "@/components/Breadcrumb";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product || !product.id) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: product.category, href: `/category/${product.category}` },
          { label: product.title },
        ]}
      />
      <ProductDetails product={product} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return {
      title: "Product Not Found - Cartify",
    };
  }

  return {
    title: `Cartify | ${product.title}`,
  };
}
