import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Product, Currency } from './types';

const PRODUCTS_STORAGE_KEY = 'zayna_products';

// Default products
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ساعة فاخرة',
    price: '350',
    description: 'ساعة أنيقة بتصميم ذهبي فاخر مع حزام جلدي أصلي',
    image: '/placeholder-watch.jpg',
    video: 'https://example.com/watch.mp4',
  },
  {
    id: '2',
    name: 'عقد ذهبي',
    price: '450',
    description: 'عقد ذهبي عيار 18 بتصميم حديث وأنيق',
    image: '/placeholder-necklace.jpg',
  },
  {
    id: '3',
    name: 'خاتم الماس',
    price: '800',
    description: 'خاتم فاخر مرصع بحجر الماس الطبيعي',
    image: '/placeholder-ring.jpg',
  },
];

export function getProducts(): Product[] {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading products from localStorage:', error);
  }
  return DEFAULT_PRODUCTS;
}

export function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
  }
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function deleteProduct(id: string): void {
  const products = getProducts();
  const filtered = products.filter((p: Product) => p.id !== id);
  saveProducts(filtered);
}

export function updateProduct(id: string, updates: Partial<Product>): void {
  const products = getProducts();
  const index = products.findIndex((p: Product) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
  }
}

// Currency conversion rates (approximate, should be updated regularly)
const CONVERSION_RATES: Record<Currency, number> = {
  SAR: 1,      // Base currency
  EGP: 13.5,   // 1 SAR ≈ 13.5 EGP
  AED: 1.37,   // 1 SAR ≈ 1.37 AED
};

export function convertPrice(priceInSAR: number, toCurrency: Currency): string {
  const rate = CONVERSION_RATES[toCurrency];
  const converted = priceInSAR * rate;
  return converted.toFixed(2);
}

export function getCurrencySymbol(currency: Currency): string {
  const symbols: Record<Currency, string> = {
    SAR: 'ر.س',
    EGP: 'ج.م',
    AED: 'د.إ',
  };
  return symbols[currency];
}

export function getCurrencyName(currency: Currency): string {
  const names: Record<Currency, string> = {
    SAR: 'Saudi Riyal',
    EGP: 'Egyptian Pound',
    AED: 'UAE Dirham',
  };
  return names[currency];
}
