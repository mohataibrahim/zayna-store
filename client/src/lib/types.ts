export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  video?: string;
  createdAt?: string;
}

export type Currency = 'SAR' | 'EGP' | 'AED';
