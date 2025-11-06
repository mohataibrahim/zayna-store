import { Country } from '@/contexts/CountryContext';

export interface Product {
  id: number;
  productId: string;
  name: string;
  price: string;
  description: string;
  image: string;
  video: string | null;
  country: Country;
  createdAt: Date;
  updatedAt: Date;
}

export type Currency = 'SAR' | 'EGP' | 'AED' | 'IQD';
