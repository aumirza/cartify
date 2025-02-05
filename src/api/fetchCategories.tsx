export async function fetchCategories() {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const raw = await res.json();
    return raw;
  } catch (error) {
    console.error(error);
    return error;
  }
}
