const STORAGE_KEYS = {
  CART: "cartify-cart",
  WISHLIST: "cartify-wishlist",
} as const;

export const loadFromStorage = <T>(
  key: keyof typeof STORAGE_KEYS,
  defaultValue: T
): T => {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(STORAGE_KEYS[key]);
  return stored ? JSON.parse(stored) : defaultValue;
};

export const saveToStorage = <T>(
  key: keyof typeof STORAGE_KEYS,
  data: T
): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
};
