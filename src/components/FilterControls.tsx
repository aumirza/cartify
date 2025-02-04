import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SortingControls } from "./SortingControls";
import RatingFilter from "./RatingFilter";

export function FilterControls({
  products,
  setProducts,
}: {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}) {
  const handleSort = (sortBy: keyof IProduct, sortOrder: "asc" | "desc") => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortBy === "category") {
        return sortOrder === "asc"
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      return 0;
    });
    setProducts(sortedProducts);
  };

  const handleFilter = (
    cb: (value: IProduct, index: number, array: IProduct[]) => unknown
  ) => {
    const filteredProducts = products.filter(cb);
    setProducts(filteredProducts);
  };

  const handleResetFilter = () => {
    setProducts(products);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> Sort & Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <SortingControls handleSort={handleSort} />
          <RatingFilter
            handleReset={handleResetFilter}
            handleFilter={handleFilter}
          />
        </div>
      </CardContent>
    </Card>
  );
}
