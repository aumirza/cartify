"use server";
export async function fetchProducts(limit?: number) {
  try {
    const url = `https://fakestoreapi.com/products${
      limit ? `?limit=${limit}` : ""
    }`;
    const res = await fetch(url);
    const raw = await res.json();
    return raw.map((p: Partial<IProduct>) => ({
      ...p,
      rating: {
        rate: Math.round(Math.random() * 5),
        count: Math.floor(Math.random() * 1000),
      },
    })) as IProduct[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchProductsByCategory(category: string) {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const raw = await res.json();
    return raw.map((p: Partial<IProduct>) => ({
      ...p,
      rating: {
        rate: Math.round(Math.random() * 5),
        count: Math.floor(Math.random() * 1000),
      },
    })) as IProduct[];
  } catch (error) {
    console.error(error);
    return [];
  }
}
