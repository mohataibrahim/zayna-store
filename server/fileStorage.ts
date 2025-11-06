import fs from 'fs';
import path from 'path';
import { InsertProduct, Product } from '../drizzle/schema';

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');
const PRODUCTS_DIR = path.join(process.cwd(), 'client', 'public', 'products');

// Ensure directories exist
function ensureDirectoriesExist() {
  const dataDir = path.dirname(PRODUCTS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  }
}

// Read all products from JSON file
export function getAllProducts(): Product[] {
  try {
    ensureDirectoriesExist();
    if (!fs.existsSync(PRODUCTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data) || [];
  } catch (error) {
    console.error('[FileStorage] Error reading products:', error);
    return [];
  }
}

// Get product by ID
export function getProductById(id: number): Product | undefined {
  const products = getAllProducts();
  return products.find(p => p.id === id);
}

// Get next product ID
function getNextProductId(): number {
  const products = getAllProducts();
  if (products.length === 0) return 1;
  return Math.max(...products.map(p => p.id)) + 1;
}

// Save products to JSON file
function saveProducts(products: Product[]): void {
  try {
    ensureDirectoriesExist();
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    console.error('[FileStorage] Error saving products:', error);
    throw error;
  }
}

// Create new product
export function createProduct(product: Omit<InsertProduct, 'id' | 'createdAt' | 'updatedAt'>): Product {
  const products = getAllProducts();
  const now = new Date();
  
  const newProduct: Product = {
    id: getNextProductId(),
    productId: product.productId,
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    video: product.video || null,
    country: product.country,
    createdAt: now,
    updatedAt: now,
  };

  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

// Delete product
export function deleteProduct(id: number): boolean {
  const products = getAllProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return false;
  }

  const product = products[index];
  
  // Delete product image if it exists
  if (product.image.startsWith('/products/')) {
    const imagePath = path.join(PRODUCTS_DIR, path.basename(product.image));
    try {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    } catch (error) {
      console.error('[FileStorage] Error deleting image:', error);
    }
  }

  products.splice(index, 1);
  saveProducts(products);
  return true;
}

// Save uploaded image
export function saveProductImage(filename: string, buffer: Buffer): string {
  try {
    ensureDirectoriesExist();
    const filepath = path.join(PRODUCTS_DIR, filename);
    fs.writeFileSync(filepath, buffer);
    return `/products/${filename}`;
  } catch (error) {
    console.error('[FileStorage] Error saving image:', error);
    throw error;
  }
}
