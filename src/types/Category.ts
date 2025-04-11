export const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  electronics: 'Electronics',
  jewelery: 'Jewelry',
  "men's clothing": "Men's Clothing",
  "women's clothing": "Women's Clothing",
} as const;

export type Category = keyof typeof CATEGORY_DISPLAY_NAMES;
